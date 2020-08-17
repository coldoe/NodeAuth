const { MongoClient } = require("mongodb");
const { uri } = require("./env");

// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    const db = client.db("AppNode");

    console.log("Connected successfully to server");

    let doc = {
      name: "kamil",
      email: "test@test.pl",
      password: "passwd",
      subscriptionTill: "2020-08-19T22:00:00.000+00:00",
    };
    db.collection("TestCollection").insertOne(doc);
  } catch (error) {
    console.log(error);
  }
}

run();
