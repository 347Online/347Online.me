import defineConfig from "11ty.ts";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import redirectPlugin from "eleventy-plugin-redirects";
import embedYouTube from "eleventy-plugin-youtube-embed";
import { DateTime } from "luxon";
import MarkdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import footnote_plugin from "markdown-it-footnote";
import MarkdownItGitHubAlerts from "markdown-it-github-alerts";

const TIME_ZONE = "America/Chicago";

const extractExcerpt = ({ templateContent = "" }) => {
  const end = templateContent.indexOf("</p>");

  if (end > 0) return templateContent.substring(0, end + 4);

  return templateContent;
};

function parseDate(dateValue: string | Date) {
  let localDate: DateTime<true | false> | undefined;
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

const postDateFilter = (dateObj: Date) =>
  DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);

const feedConfig = {
  type: "atom",
  outputPath: "/blog/feed.xml",
  collection: {
    name: "releasedPosts",
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
} as const;

export default defineConfig((eleventyConfig) => {
  eleventyConfig.addShortcode("excerpt", extractExcerpt);
  eleventyConfig.addGlobalData("layout", "layout/base.njk");
  eleventyConfig.addDateParsing(parseDate);
  eleventyConfig.addFilter("postDate", postDateFilter);
  eleventyConfig.setLibrary(
    "md",
    MarkdownIt({
      html: true,
      linkify: true,
    })
      .use(footnote_plugin)
      .use(MarkdownItGitHubAlerts)
      .use(markdownItAttrs),
  );
  eleventyConfig.addCollection("releasedPosts", (api) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return api
      .getFilteredByTag("blog")
      .filter((x) => tomorrow.getTime() >= x.date.getTime());
  });

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("**/*.pdf");

  eleventyConfig.addPlugin(embedYouTube);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
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
});
