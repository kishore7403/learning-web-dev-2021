const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://localhost:27017";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    const database = client.db('fruitsDB');
    const movies = database.collection('fruits');

    // Query for a movie that has the title 'Back to the Future'
    const query = { name:"kiwi",taste:"kinda sour",review:"great" };
    const result = await movies.insertOne(query);

    console.log(result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);