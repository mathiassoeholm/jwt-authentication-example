import { clearCookie } from "../helpers/jwt-helper";

export async function handler() {
  return {
    statusCode: 200,
    headers: {
      "Set-Cookie": clearCookie(),
      "Content-Type": "text/plain"
    },
    body: "Logged out succesfully"
  };
}
