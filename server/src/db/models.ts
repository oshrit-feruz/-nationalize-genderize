import { model, Schema } from "mongoose";

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
const NamesDataSchema = new Schema({
  dataElement: [NameDataSchema],
});
export const prevDataModal = model("PrevNamesData", NamesDataSchema);
