async function validatePageSeoData({
  title_count,
  description_count,
  h1_count,
  word_count,
  isSSL,
  internal_links_count,
  external_links_count,
}) {
  const validateResults = {};

  validateResults.pageTitleVaildateResults = validateItemLength(
    50,
    60,
    "title",
    title_count,
    "characters"
  );

  validateResults.pageDescriptionVaildateResults = validateItemLength(
    156,
    160,
    "description",
    description_count
  );

  validateResults.pageContentVaildateResults = validateContentLength(
    500,
    2400,
    word_count
  );

  validateResults.pageMainHeaderVaildateResults =
    validateMainPageHeader(h1_count);

  validateResults.websiteSSLVaildateResults = validateSSL(isSSL);

  validateResults.pagelinksVaildateResults = validateLinks({
    internal_links_count,
    external_links_count,
  });

  console.log(validateResults);
}

function validateContentLength(min, max, item) {
  console.log(item);
  // no item
  if (item === 0)
    return {
      rating: "bad",
      header: `No ${item_name}!`,
      description: `the page must have a ${item_name}.`,
    };
  // very short item
  if (item < min)
    return {
      rating: "bad",
      header: `Page blog content is short!`,
      description: `The recommended length of the page blog content should between ${min}-${max} words, try to increase the length of the page's blog content.`,
    };
  // perfect item length
  if (item >= min && item <= max)
    return {
      rating: "excellent",
      header: `Page blog content length is perfect!`,
      description: `excellent job the page blog content be is between ${min}–${max} words, keep up the good work.`,
    };
  // very long item length
  if (item > max)
    return {
      rating: "good",
      header: `Page ${item_name} length is long!`,
      description: `the page ${item_name} should be between ${min}–${max} words, your current page content is ${item} words}.`,
    };
}

function validateItemLength(min, max, item_name, item) {
  // no item
  if (item === 0 || item === null || item === undefined)
    return {
      rating: "bad",
      header: `No ${item_name}!`,
      description: `the page must have a ${item_name}.`,
    };
  // very short item
  if (item < min)
    return {
      rating: "bad",
      header: `Page ${item_name} is short!`,
      description: `The recommended length of the page ${item_name} should between ${min}-${max} characters, try to increase the length of the page's ${item_name}. the cerrent lengh is ${item} characters (${
        min - item
      } characters to go!)`,
    };
  // perfect item length
  if (item >= min && item <= max)
    return {
      rating: "excellent",
      header: `Page ${item_name} length is perfect!`,
      description: `excellent job the page ${item_name} be is between ${min}–${max} characters, keep up the good work.`,
    };
  // very long item length
  if (item > max)
    return {
      rating: "good",
      header: `Page ${item_name} length is long!`,
      description: `the page ${item_name} should be between ${min}–${max} characters, your current page ${item_name} is ${item} characters.`,
    };
}

function validateMainPageHeader(h1_count) {
  if (h1_count === null || h1_count === undefined)
    return {
      rating: "bad",
      header: `No H1 tag!`,
      description: `the page must have at least one h1 tage describing the main content of the page.`,
    };
  if (h1_count === 0)
    return {
      rating: "bad",
      header: "No H1 header",
      description:
        "The page must contain at least one h1 element identifying and describing the main content of the page.",
    };
  if (h1_count === 1)
    return {
      rating: "excellent",
      header: "Main h1 header found!",
      description: `The page contain one h1 element, excellent job!.`,
    };
  if (h1_count > 1)
    return {
      rating: "good",
      header: "More than h1 header found!",
      description: `The page should contain only one h1 element, try to use h2 altho multiple H1 tags on the page are perfectly fine in SEO but it is not recommended to confuse the reader with multiple h1s`,
    };
}

function validateSSL(ssl) {
  if (ssl)
    return {
      rating: "excellent",
      header: "Your website is secure!",
      description:
        "your website is using SSL which keep customer information private and secure. In short: SSL keeps internet connections secure and prevents criminals from reading or modifying information transferred between two systems.",
    };
  else
    return {
      rating: "bad",
      header: "Your website is not secure!",
      description:
        "your website is not using SSL which keep customer information private and secure. In short: SSL keeps internet connections secure and prevents criminals from reading or modifying information transferred between two systems.",
    };
}

function validateLinks(links) {
  const { internal_links_count, external_links_count } = links;
  const result = {};
  if (internal_links_count === 0)
    result.internal_links_count = {
      rating: "bad",
      header: `No internal links was found!`,
      description: `Internal links are important because they can help Google understand and rank your website better. By giving Google links to follow along with descriptive anchor text, you can indicate to Google which pages of your site are important, as well as what they are about, try to add some`,
    };
  else
    result.internal_links_count = {
      rating: "excellent",
      header: `${internal_links_count} internal links was found!`,
      description: `Internal links are important because they can help Google understand and rank your website better. By giving Google links to follow along with descriptive anchor text, you can indicate to Google which pages of your site are important, as well as what they are about, you crrently have ${internal_links_count} links on this page! try to add more, the more the better!`,
    };

  if (external_links_count === 0)
    result.external_links_count = {
      rating: "bad",
      header: `No external links was found!`,
      description: `If the content of a page makes someone talk, it indicates authority, credibility, and/or trustworthiness. Thus, links on pages are like votes of trust, credibility, and authority. The more links a page gets, the more votes they are getting, which can improve their ranking, you crrently have eno extenral links on this page! try to add some!`,
    };
  else
    result.external_links_count = {
      rating: "excellent",
      header: `${external_links_count} external links was found!`,
      description: `If the content of a page makes someone talk, it indicates authority, credibility, and/or trustworthiness. Thus, links on pages are like votes of trust, credibility, and authority. The more links a page gets, the more votes they are getting, which can improve their ranking, you crrently have ${external_links_count} links on this page! try to add more, the more the better!`,
    };
  return result;
}

module.exports = validatePageSeoData;
