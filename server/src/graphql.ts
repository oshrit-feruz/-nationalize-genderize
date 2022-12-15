import { ApolloServer } from "@apollo/server";
import { getNameData } from "./api";
import { typeDefs } from "./types";
export default function init() {
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
  const resolvers = {
    Query: {
      namesData: async () => namesData,
      nameData: async (parent: any, args: any) => {
        console.log(args.name);

        const data = await getNameData(args.name);
        return data;
      },
    },
    Mutation: {
      createNameData: async (parent: any, { data }: any) => {
        console.log(data);
      },
    },
  };
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  return server;
}
