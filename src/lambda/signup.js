import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { MongoClient } from "mongodb";

const DAYS_UNTIL_JWT_EXPIRES = 100;
const dbName = "jwt-authentication-example";

export async function handler(event, context) {
  const mongoClient = new MongoClient(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0-k4kqg.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  try {
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    const users = db.collection("users");

    const { email, password } = JSON.parse(event.body);

    const r = await users.findOne({ email });
    if (r !== null) {
      throw new Error(`A user already exists with the email: ${email}`);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const { insertedId } = await users.insertOne({
      email,
      password: passwordHash
    });

    const secretKey = `-----BEGIN RSA PRIVATE KEY-----${"\n"}${
      process.env.JWT_SECRET_KEY
    }${"\n"}-----END RSA PRIVATE KEY-----`;

    const exp =
      Math.round(Date.now() / 1000) + DAYS_UNTIL_JWT_EXPIRES * 24 * 60 * 60;
    const jwtPayload = { userId: insertedId, exp };

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
      body: JSON.stringify({ id: insertedId, email })
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
