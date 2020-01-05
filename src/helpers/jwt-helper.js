import jwt from "jsonwebtoken";
import cookie from "cookie";

function createJwtCookie(userId) {
  const secretKey = `-----BEGIN RSA PRIVATE KEY-----${"\n"}${
    process.env.JWT_SECRET_KEY
  }${"\n"}-----END RSA PRIVATE KEY-----`;

  const token = jwt.sign({ userId }, secretKey, {
    algorithm: "RS256",
    expiresIn: "100 days"
  });

  const jwtCookie = cookie.serialize("jwt", token, {
    secure: true,
    httpOnly: true
  });

  return jwtCookie;
}

export { createJwtCookie };
