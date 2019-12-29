import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const temporaryRsaSecretKeyForTesting = `
-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQDL5vyrVGm/JtF9IAxZMfVGP5q7J1i1NuJ1XXXNk2eHgY0qXcut
oVoMeqeqAqHf1rybjULLJHSMARb+2WFSKS+HIt+KEoFoWt7SgR8uK6N6bf2ttJbk
bK7JmUVETG54TZoaGk3zXMQ/Eelwyw/7Bp3Q6TBofm9MTeRLEFDd6AvPBQIDAQAB
AoGAAQhuhz+qOXms3gFnjpweLfjsg74zSNe6VfXfPudcQud5G5nWCk8i8aU9bDMP
Nt8TnYYdrIHGxV7MCwZ247+pqfdEBUy2sfG3QD0ifvjw8Miydtp/bXX1t6JjbPR/
zqaLSIwLaKy+lZE+2uIEcVpe4lmKrVhdPx7sC0SV+sOuXxECQQD7F5uwQtypY9oz
wyAVT2Vsopll0VM+G0fFnFrlZkITQw7sX6xQgdbSCqzLxiU/CPibOVYmWAXo+5/s
aHspj30DAkEAz+NBGDlpct8+8c4XxjPoj9ChcgZew0IVyyG1BtRvBGpAIaCdSoR6
4wOtu/P1ibY3lzKIScFPhGVwDVsB2V5xVwJAYiOND2xisLY9X8PhM1MP8lDvIdOZ
9IlXGQ6OnGDGbJ7mI08Vm3XUD85qUU8F2chY2tqjKGN5E+HdVNpVYR4bHwJAJYDa
6nLZCicqJNdIRLJynxdFONvbVqBibB3tmYjTall8rlRaa+oQfUnZmtG9FxXvW3B7
U8ry/HCMUWx8nelCywJAe90XykJDp6vzT/tAlRDiHWyVN/NTQ9TqS9WbI2LZY621
vJCggfNnlAIonXnisj0mC3FV+ZgKZJBPr5mQYKOLfw==
-----END RSA PRIVATE KEY-----
`;

const temporaryRsaPublicKeyForTesting = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDL5vyrVGm/JtF9IAxZMfVGP5q7
J1i1NuJ1XXXNk2eHgY0qXcutoVoMeqeqAqHf1rybjULLJHSMARb+2WFSKS+HIt+K
EoFoWt7SgR8uK6N6bf2ttJbkbK7JmUVETG54TZoaGk3zXMQ/Eelwyw/7Bp3Q6TBo
fm9MTeRLEFDd6AvPBQIDAQAB
-----END PUBLIC KEY-----
`;

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
    const secretKey =
      process.env.JWT_SECRET_KEY || temporaryRsaSecretKeyForTesting;
    console.log("The secret key is", secretKey);
    const token = jwt.sign({ userId }, secretKey, { algorithm: "RS256" });
    console.log("The JWT key is", token);

    // 5. Create cookie with the JWT
    //     https://github.com/jshttp/cookie

    // 6. Respond with user id and cookie
    //     https://github.com/DavidWells/netlify-functions-workshop/blob/master/lessons-code-complete/use-cases/4-setting-cookies/functions/set-cookie.js
    return {
      statusCode: 200,
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
