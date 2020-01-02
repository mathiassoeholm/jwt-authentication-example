import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const SECONDS_UNTIL_JWT_EXPIRES = 100 * 24 * 60 * 60;

export async function handler(event, context) {
  try {
    // 1. Get email and password from the request body
    const { email, password } = JSON.parse(event.body);

    // 2. Create a hash of the password
    const passwordHash = bcrypt.hash(password, 10);
    console.log("The passwordHash is", passwordHash);

    // 3. Create new user in Prisma db with username and hashed password, graphql mutation with fetch
    const userId = 1234;

    // 4. Generate JWT using private key from env
    const secretKey = `-----BEGIN RSA PRIVATE KEY-----${"\n"}${
      process.env.JWT_SECRET_KEY
    }${"\n"}-----END RSA PRIVATE KEY-----`;

    const exp = Math.round(Date.now() / 1000) + SECONDS_UNTIL_JWT_EXPIRES;
    const jwtPayload = { userId, exp };

    const token = jwt.sign(jwtPayload, secretKey, {
      algorithm: "RS256"
    });
    console.log("The JWT key is", token);

    // 5. Create cookie with the JWT
    const jwtCookie = cookie.serialize("jwt", token, {
      secure: true,
      httpOnly: true
    });

    // 6. Respond with user id and cookie
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
  }
}
