import express from "express";
import { Request, Response } from "express";
import axios from "axios";
const PORT = 5000,
  app = express();
app.use(express.json());
app.get("/api/v1", (req: Request, res: Response) => {
  res.send("hello !!!!");
});
app.post("/api/v1/checkName", async (req: Request, res: Response) => {
  console.log(req.body);
  let dataFromApi = {
    name: "",
    gender: "",
    nationality: [],
    probability: 0,
  };
  await axios
    .get(`https://api.nationalize.io/?name=${req.body.newName}`)
    .then((apiRes) => (dataFromApi.nationality = apiRes.data.country))
    .catch((err) => {
      console.error(err);
    });
    await axios
      .get(`https://api.nationalize.io/?name=${req.body.newName}`)
      .then((apiRes) => (dataFromApi.nationality = apiRes.data.country))
      .catch((err) => {
        console.error(err);
      });
});

app.listen(PORT, () => console.log(`start listening on port : ${PORT}`));
