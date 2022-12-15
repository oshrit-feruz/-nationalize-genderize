import { ApolloServer } from "@apollo/server";
import { getNameData } from "./api";
import { typeDefs } from "./types";
import { resolvers } from "./db/resolvers";
export default function init() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  return server;
}
