import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
const PORT = 4000;
dotenv.config();
const url = process.env.MONGO_DB_URI;
import { expressServer } from "..";
import { NameData } from "../types";
import { dataModal } from "./models";
export function initMongoose() {
  mongoose
    .connect(url!, {
      dbName: "names_data",
    })
    .then(async () => {
      console.log("MongoDB Connection successful");
      return (await expressServer()).listen(PORT, () =>
        console.log(`start listening on port : ${PORT}`)
      );
    })
    .then((res) => {
      console.log(`Server running at ${res}`);
    });
}

export async function saveNameData(data: NameData) {
  const isExist = await dataModal.count({
    name: data.name,
  });
  if (!isExist) {
    const res = await dataModal.insertMany([data]);
    if (res) {
      return { success: true, message: "data inserted successfully" };
    }
  } else
    return { success: false, message: "name already exists in mongo server" };
  return { success: false, message: "failed to insert data to mongo server" };
}
export async function getAllHistory() {
  const res: NameData[] = await dataModal.find({});
  if (res) {
    return res;
  } else return { success: false, message: "couldn't get data from database" };
}
