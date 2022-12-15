import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import init from "./graphql";
import bodyParser from "body-parser";
const PORT = 4000;
(async () => {
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

  app.listen(PORT, () => console.log(`start listening on port : ${PORT}`));
})();