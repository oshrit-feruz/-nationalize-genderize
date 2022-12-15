import express from "express";
import cors from "cors";
import { initMongoose } from "./db/mongoDb";
import { expressMiddleware } from "@apollo/server/express4";
import init from "./graphql";
import bodyParser from "body-parser";
//  Initialize the express Server options.
export async function expressServer() {
  const server = init();
  const app = express();
  app.use(cors());
  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server)
  );

  return app;
}
initMongoose();
