import axios from "axios";
import { NameData } from "./types";
export async function getNameData(name: string) {
  let dataFromApi: NameData = {
    name: "",
    gender: {
      gender: "",
      probability: 0,
    },
    nationality: [],
  };
  const countryRes = await axios.get(
    `https://api.nationalize.io/?name=${name}`
  );
  dataFromApi.nationality = countryRes.data.country;

  const genderRes = await axios.get(`https://api.genderize.io?name=${name}`);
  dataFromApi.gender.gender = genderRes.data.gender;
  dataFromApi.gender.probability = genderRes.data.probability;
  dataFromApi.name = genderRes.data.name;

  return dataFromApi;
}
