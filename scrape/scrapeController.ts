import puppeteer from "puppeteer";
import scrapeSeoData from "./scrapeSeoData";
import validatePageSeoData from "./validatePageSeoData";

export default async function scrapeController(url: string) {
  const browser = await puppeteer.launch({ headless: false });
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
