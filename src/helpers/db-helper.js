import { MongoClient } from "mongodb";

const dbName = "jwt-authentication-example";

function createClient() {
  const client = new MongoClient(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0-k4kqg.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  client.usersCollection = () => {
    return client.db(dbName).collection("users");
  };

  return client;
}

export { createClient };
