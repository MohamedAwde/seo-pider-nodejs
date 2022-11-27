import scrapeController from "./scrape/scrapeController";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const app = express();

dotenv.config();
const PORT = 8080;

app.use(express());
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req: any, res: any) => {
  const { url } = req.body;
  try {
    const result = await scrapeController(url);
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

app.get("/", async (_req: any, res: any) => {
  res.send("the server is runing.");
});

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
