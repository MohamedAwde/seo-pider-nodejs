const puppeteer = require("puppeteer");
const scrapeSeoData = require("./scrapeSeoData");
const validatePageSeoData = require("./validatePageSeoData");

async function scrapeController(url) {
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(url);

    const seo_data = await scrapeSeoData(page);

    browser.close();

    return validatePageSeoData(seo_data);
  } catch (error) {
    console.log(error);
    browser.close();
    throw new Error("server is offline.");
  }
}

module.exports = scrapeController;
