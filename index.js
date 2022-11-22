const scrapeController = require("./scrapeController");

(async () =>
  await scrapeController(
    "https://integrio.net/blog/recruiting-agency-vs-outstaff-company"
  ))();
