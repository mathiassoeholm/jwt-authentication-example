import cookie from "cookie";
import { publicKey } from "./publickey";
import jwt from "jsonwebtoken";

export async function handler(event) {
  const cookies = event.headers.cookie && cookie.parse(event.headers.cookie);
  console.log("user 1");

  if (!cookies || !cookies.jwt) {
    console.log("user 2", cookies);
    return {
      statusCode: 401,
      body: JSON.stringify({
        msg: "There is no jwt cookie, so the request is unauthorized"
      })
    };
  }
  console.log("user 3");

  try {
    const payload = jwt.verify(cookies.jwt, publicKey);
    console.log("user 4", payload);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: payload
    };
  } catch (err) {
    console.log("user 5", err);
    return {
      statusCode: 401,
      body: JSON.stringify({ msg: err.message })
    };
  }
}
