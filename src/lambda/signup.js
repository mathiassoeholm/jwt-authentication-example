import bcrypt from "bcryptjs";
import { createClient } from "../helpers/db-helper";
import { createJwtCookie } from "../helpers/jwt-helper";

export async function handler(event) {
  const dbClient = createClient();

  try {
    await dbClient.connect();
    const users = dbClient.usersCollection();

    const { email, password } = JSON.parse(event.body);

    const existingUser = await users.findOne({ email });
    if (existingUser !== null) {
      console.log(existingUser);
      // TODO: Don't return 500
      throw new Error(`A user already exists with the email: ${email}`);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const { insertedId } = await users.insertOne({
      email,
      password: passwordHash
    });

    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": createJwtCookie(insertedId, email),
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
    dbClient.close();
  }
}
