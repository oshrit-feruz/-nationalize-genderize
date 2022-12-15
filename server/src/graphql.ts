import { gql } from "apollo-server";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getNameData } from "./api";
export default function init() {
  const typeDefs = gql`
    input NationalityInput {
      country_id: String
      probability: Float
    }
    input GenderInput {
      gender: String
      probability: Float
    }
    input NameDataInput {
      name: String
      gender: GenderInput
      nationality: [NationalityInput]
    }
    type Gender {
      gender: String
      probability: Float
    }
    type Nationality {
      country_id: String
      probability: Float
    }
    type NameData {
      name: String
      gender: Gender
      nationality: [Nationality]
    }
    type Success {
      success: Boolean
      message: String
    }

    type Query {
      namesData: [NameData]
    }
    type Query {
      nameData(name: String!): NameData
    }
    type Mutation {
      createNameData(data: NameDataInput): Success
    }
  `;
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
    // introspection: false,
    typeDefs,
    resolvers,
  });
  //   const { url } = await startStandaloneServer(server, {
  //     return : { port: 4000 },
  //   });
  return server;
  //   console.log(`🚀  Server ready at: ${url}`);
}
