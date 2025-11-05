// @ts-check

import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import redirectPlugin from "eleventy-plugin-redirects";
import embedYouTube from "eleventy-plugin-youtube-embed";
import { DateTime } from "luxon";
const TIME_ZONE = "America/Chicago";

const extractExcerpt = ({ templateContent = "" }) => {
  const end = templateContent.indexOf("</p>");

  if (end > 0) return templateContent.substring(0, end + 4);

  return templateContent;
};

/**
 * @param {string | Date} dateValue
 */
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

const feedConfig = {
  type: "atom",
  outputPath: "/blog/feed.xml",
  collection: {
    name: "blog",
    limit: 0, // 0 means no limit
  },
  metadata: {
    language: "en",
    title: "Katie's Place | 347Online.me",
    subtitle: "",
    base: "https://347online.me/blog/",
    author: {
      name: "Katie Janzen",
      email: "katiejanzen@347online.me",
    },
  },
};

/** @param {any} eleventyConfig */
export default (eleventyConfig) => {
  eleventyConfig.addShortcode("excerpt", extractExcerpt);
  eleventyConfig.addGlobalData("layout", "layout/base.njk");
  eleventyConfig.addDateParsing(parseDate);
  eleventyConfig.addFilter("postDate", postDateFilter);

  eleventyConfig.addCollection("releasedPosts", (api) =>
    api
      .getFilteredByTag("blog")
      .filter((x) => new Date().getTime() >= x.date.getTime()),
  );

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("**/*.pdf");

  eleventyConfig.addPlugin(embedYouTube);
  eleventyConfig.addPlugin(redirectPlugin, { template: "clientSide" });
  eleventyConfig.addPlugin(feedPlugin, feedConfig);
  eleventyConfig.addPlugin(feedPlugin, {
    ...feedConfig,
    type: "json",
    outputPath: "/blog/feed.json",
  });
  eleventyConfig.addPlugin(feedPlugin, {
    ...feedConfig,
    type: "rss",
    outputPath: "/blog/rss.xml",
  });

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
