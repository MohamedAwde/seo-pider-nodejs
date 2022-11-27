export default async function scrapeSeoData(page: any) {
  const page_title = await PageData.getPageTitle(page);
  const page_decrpotion = await PageData.getPageDecrpotion(page);
  const h1_count = await PageData.getPageHeading(page);
  const word_count = await PageData.getPageWordCount(page);
  const links = await PageData.getPageLinks(page);
  const ssl = await PageData.getPageSSL(page);

  return {
    title_count: page_title,
    description_count: page_decrpotion,
    h1_count,
    word_count,
    internal_links_count: links.internal_links.length,
    external_links_count: links.external_links.length,
    isSSL: ssl,
  };
}

const PageData = {
  getPageTitle: async (page: any) =>
    await page.evaluate(() => document.title.length),
  getPageDecrpotion: async (page: any) =>
    await page.evaluate(() => {
      const des = document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content");
      return des ? des.length : 0;
    }),
  getPageHeading: async (page: any) =>
    await page.evaluate(() => document.querySelectorAll("h1").length),
  getPageWordCount: async (page: any) =>
    await page.evaluate(() => {
      let sum = 0;
      document.querySelectorAll("p").forEach((p) => {
        sum += p.innerText.split(" ").length;
      });
      return sum;
    }),
  getPageLinks: async (page: any) =>
    await page.evaluate(() => {
      const internal_links: string[] = [];
      const external_links: string[] = [];
      document.querySelectorAll("p a").forEach((link) => {
        const href = link?.getAttribute("href")?.toString() || "";
        const origin = document.location.origin;

        if (href === origin) return;

        if (href.indexOf(origin) >= 0 || href.startsWith("/")) {
          // those are intenral links

          if (internal_links.length === 0) {
            internal_links.push(href);
          } else {
            if (internal_links[internal_links.length - 1] !== href) {
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
    }),
  getPageSSL: async (page: any) =>
    await page.evaluate(() =>
      document.location.origin.toString().startsWith("https") ? true : false
    ),
};
