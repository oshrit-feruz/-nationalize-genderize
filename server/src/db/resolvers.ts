import { getNameData } from "../api";
import { dataModal } from "./models";
import { getAllHistory, saveNameData } from "./mongoDb";
// The query and the mutation states managing.
export const resolvers = {
  Query: {
    namesData: async () => {
      const prevData = await getAllHistory();
      return prevData;
    },
    // Function that return the data from the external API
    nameData: async (parent: any, args: any) => {
      const data = await getNameData(args.name);

      // Function that saving the name data into the Database
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
