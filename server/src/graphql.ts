import { ApolloServer } from "@apollo/server";
import { getNameData } from "./api";
import { typeDefs } from "./types";
import { resolvers } from "./db/resolvers";
// Serve the graphQL from Apollo server

export default function init() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  return server;
}
