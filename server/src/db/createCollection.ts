import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
const url = process.env.MONGO_DB_URI;
// One time script to create Collection
async function main() {
  const client = new MongoClient(url!);

  try {
    // Connect to the MongoDB cluster
    const db = await client.connect();
    let dbo = db.db("mydb");
    // Make the appropriate DB calls
    await dbo.createCollection("dataName");
    console.log("done");

    db.close;
  } catch (e) {
    console.error(e);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}

main().catch(console.error);
