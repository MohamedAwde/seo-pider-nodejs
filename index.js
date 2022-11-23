const scrapeController = require("./scrape/scrapeController");
const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");

app.use(express());
app.use(cors({ origin: "http://localhost:3000/" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  const { url } = req.body;
  try {
    const result = await scrapeController(url);
    console.log("no error");
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
