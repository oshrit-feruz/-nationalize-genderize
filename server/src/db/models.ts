import { model, Schema } from "mongoose";
//  Name Data Schema providing to the Database to verify the types
const NameDataSchema = new Schema({
  name: String,
  gender: {
    gender: String,
    probability: Number,
  },
  nationality: [
    {
      country_id: String,
      probability: Number,
    },
  ],
});
export const dataModal = model("NameData", NameDataSchema);
// The list of all names is an Array Schema

const NamesDataSchema = new Schema({
  dataElement: [NameDataSchema],
});
export const prevDataModal = model("PrevNamesData", NamesDataSchema);
