const scrapeController = require("./scrape/scrapeController");
const express = require("express");
const app = express();
const PORT = process.env.PORT | 8080;
const cors = require("cors");

app.use(express());
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  const { url } = req.body;
  try {
    const result = await scrapeController(url);
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

app.get("/", async (_req, res) => {
  res.send("the server is runing.");
});

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
