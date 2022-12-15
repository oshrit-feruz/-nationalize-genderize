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

// app.get("/", (req, res) => {
//   res.send("hello from api");
// });

// import { Request, Response } from "express";
// import axios from "axios";
// app.use(express.json());
// app.get("/api/v1", (req: Request, res: Response) => {
//   res.send("hello !!!!");
// });
// app.post("/api/v1/checkName", async (req: Request, res: Response) => {
//   console.log(req.body);
//   let dataFromApi = {
//     name: "",
//     gender: {
//       gender: "",
//       probability: 0,
//     },
//     nationality: [],
//   };
//   await axios
//     .get(`https://api.nationalize.io/?name=${req.body.newName}`)
//     .then((apiRes) => (dataFromApi.nationality = apiRes.data.country))
//     .catch((err) => {
//       console.error(err);
//     });
//   await axios
//     .get(`https://api.genderize.io?name=${req.body.newName}`)
//     .then((apiRes) => {
//       (dataFromApi.gender.gender = apiRes.data.gender),
//         (dataFromApi.gender.probability = apiRes.data.probability),
//         (dataFromApi.name = apiRes.data.name);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
//   console.log(dataFromApi);

//   res.json(dataFromApi);
// });
