// You will need to install and run Node.js prior to setting up
import puppeteer from "puppeteer";

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const page_title = await page.evaluate(() => document.title);
  const page_decrpotion = await page.evaluate(
    () => document.querySelector('meta[name="description"]').content
  );
  const h1_count = await page.evaluate(
    () => document.querySelectorAll("h1").length
  );
  const word_count = await page.evaluate(() => {
    let sum = 0;
    document.querySelectorAll("p").forEach((p) => {
      sum += p.innerText.split(" ").length;
    });
    return sum;
  });
  const links = await page.evaluate(() => {
    const internal_links = [];
    const external_links = [];
    document.querySelectorAll("p a").forEach((link) => {
      const href = link.getAttribute("href");
      const origin = document.location.origin;

      if (href === origin) return;

      if (href.indexOf(origin) >= 0 || href.startsWith("/")) {
        // those are intenral links

        if (internal_links.length === 0) {
          internal_links.push(href);
        } else {
          if (internal_links[internal_links.length - 1]?.href !== href) {
            internal_links.push(href);
          }
        }
      } else {
        // those are extenral links
        if (href.startsWith("#") === false) {
          external_links.push(href);
        }
      }
    });
    return { internal_links, external_links };
  });

  console.log({
    title: page_title,
    description: page_decrpotion,
    h1_count,
    word_count,
    links,
  });

  browser.close();
}
const url_1 = "https://seoanalyzer.me/";
const url_2 =
  "https://www.amazon.com/Business-Microphone-Upgraded-NexiGo-Computer/dp/B08BHX7GYY/?_encoding=UTF8&smid=A1HNC035CZ2MR5&pd_rd_w=GsaOJ&pf_rd_p=45f0d3b0-8ddc-4840-9ac2-c26f2608345f&pf_rd_r=A1TQ15FXBKJH1JWYXXAD&pd_rd_r=82f7f31d-db1c-4831-96a3-bb110b1133f9&pd_rd_wg=urW4C&ref_=pd_gw_unk";
const url_3 =
  "https://mohamedawde.com/%D9%83%D9%8A%D9%81-%D8%AA%D8%AD%D9%82%D9%82-%D8%A7%D9%87%D8%AF%D8%A7%D9%81%D9%83-%D8%A7%D9%84%D8%AA%D9%8A-%D8%B7%D8%A7%D9%84-%D8%A7%D9%86%D8%AA%D8%B8%D8%A7%D8%B1%D9%87%D8%A7/";

scrapeProduct(
  "https://integrio.net/blog/recruiting-agency-vs-outstaff-company"
);
