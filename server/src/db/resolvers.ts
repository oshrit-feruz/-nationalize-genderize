import { getNameData } from "../api";
import { dataModal } from "./models";
import { getAllHistory, saveNameData } from "./mongoDb";
const namesData = [
  {
    name: "",
    gender: {
      gender: "",
      probability: 0,
    },
    nationality: [],
  },
];
export const resolvers = {
  Query: {
    namesData: async () => {
      const prevData = await getAllHistory();
      return prevData;
    },
    nameData: async (parent: any, args: any) => {
      const data = await getNameData(args.name);

      saveNameData(data).catch((error) => {
        console.log(error);
      });
      return data;
    },
  },
  Mutation: {
    createNameData: async (parent: any, { data }: any) => {
      const createData = new dataModal({
        name: data.name,
        gender: {
          gender: data.gender,
          probability: data.gender.probability,
        },
        nationality: data.nationality,
      });
      const res = await createData.save();
      console.log(res);
      return {
        id: res.id,
      };
    },
  },
};
