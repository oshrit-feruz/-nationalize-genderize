import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const { MONGO_DB_URI } = process.env;
async function main() {
  const client = new MongoClient(MONGO_DB_URI!);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}

main().catch(console.error);

/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */
async function listDatabases(client: MongoClient): Promise<void> {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db: { name: any; }) => console.log(` - ${db.name}`));
}
