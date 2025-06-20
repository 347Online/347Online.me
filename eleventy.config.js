// @ts-check
import { DateTime } from "luxon";
const TIME_ZONE = "America/Chicago";

const extraceExcerpt = ({ templateContent = "" }) => {
  const end = templateContent.indexOf("</p>");

  if (end > 0) return templateContent.substring(0, end + 4);

  return templateContent;
};

function parseDate(dateValue) {
  let localDate;
  if (dateValue instanceof Date) {
    // and YAML
    localDate = DateTime.fromJSDate(dateValue, { zone: "utc" }).setZone(
      TIME_ZONE,
      { keepLocalTime: true },
    );
  } else if (typeof dateValue === "string") {
    localDate = DateTime.fromISO(dateValue, { zone: TIME_ZONE });
  }
  if (localDate?.isValid === false) {
    throw new Error(
      `Invalid \`date\` value (${dateValue}) is invalid for ${this.page.inputPath}: ${localDate.invalidReason}`,
    );
  }
  return localDate;
}

const postDateFilter = (dateObj) =>
  DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);

/** @param {any} eleventyConfig */
export default (eleventyConfig) => {
  eleventyConfig.addShortcode("excerpt", extraceExcerpt);
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addGlobalData("layout", "layout/base.njk");
  eleventyConfig.addDateParsing(parseDate);
  eleventyConfig.addFilter("postDate", postDateFilter);

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
