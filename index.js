const scrapeController = require("./scrape/scrapeController.js");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
const PORT = process.env.PORT | 8080;

var whitelist = ["https://mohamedawde.github.io/"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(express());
app.use(cors(corsOptions));
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
