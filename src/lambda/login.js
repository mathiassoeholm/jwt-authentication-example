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
    if (existingUser == null) {
      // TODO: Don't return 500
      throw new Error(`Invalid password or email`);
    }

    const matches = await bcrypt.compare(password, existingUser.password);

    if (!matches) {
      // TODO: Don't return 500
      throw new Error(`Invalid password or email`);
    }

    const userId = existingUser._id;

    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": createJwtCookie(userId, email),
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
    dbClient.close();
  }
}
