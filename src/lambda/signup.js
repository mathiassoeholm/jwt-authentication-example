import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { MongoClient } from "mongodb";

const SECONDS_UNTIL_JWT_EXPIRES = 100 * 24 * 60 * 60;
const dbName = "jwt-authentication-example";

export async function handler(event, context) {
  const mongoClient = new MongoClient(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0-k4kqg.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  try {
    const { email, password } = JSON.parse(event.body);
    // TODO: Check if there's already a user with the same email and fail if there is

    const passwordHash = await bcrypt.hash(password, 10);
    console.log("The passwordHash is", passwordHash);

    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    let result = await db.collection("users").insertOne({
      email,
      password: passwordHash
    });

    const userId = result.insertedId;

    const secretKey = `-----BEGIN RSA PRIVATE KEY-----${"\n"}${
      process.env.JWT_SECRET_KEY
    }${"\n"}-----END RSA PRIVATE KEY-----`;

    const exp = Math.round(Date.now() / 1000) + SECONDS_UNTIL_JWT_EXPIRES;
    const jwtPayload = { userId, exp };

    const token = jwt.sign(jwtPayload, secretKey, {
      algorithm: "RS256"
    });

    const jwtCookie = cookie.serialize("jwt", token, {
      secure: true,
      httpOnly: true
    });

    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": jwtCookie,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: userId, email })
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    };
  } finally {
    mongoClient.close();
  }
}
