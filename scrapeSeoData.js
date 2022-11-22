async function scrapeSeoData(page) {
  const page_title = await page.evaluate(() => document.title);
  const page_decrpotion = await page.evaluate(
    () => document.querySelector('meta[name="description"]')?.content
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

  const ssl = await page.evaluate(() =>
    document.location.origin.toString().startsWith("https") ? true : false
  );
  return {
    title: page_title,
    description: page_decrpotion,
    h1_count,
    word_count,
    links,
    ssl,
  };
}

module.exports = scrapeSeoData;
