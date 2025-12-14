import defineConfig from "11ty.ts";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import redirectPlugin from "eleventy-plugin-redirects";
import embedYouTube from "eleventy-plugin-youtube-embed";
import { DateTime, DateTimeMaybeValid } from "luxon";
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

class InvalidDateError extends Error {
  constructor(dateValue: string, localDate: DateTime<false>) {
    super(
      `Invalid \`date\` value (${dateValue}) is invalid for ${global.page.inputPath}: ${localDate.invalidReason}`,
    );
  }
}

const validateDate = (date: DateTimeMaybeValid, repr: string) => {
  if (!date.isValid) throw new InvalidDateError(repr, date);

  return date;
};

const parseDate = (date: unknown) => {
  if (date instanceof Date)
    return validateDate(
      DateTime.fromJSDate(date, { zone: "utc" }).setZone(TIME_ZONE, {
        keepLocalTime: true,
      }),
      date.toString(),
    );

  if (typeof date === "string")
    return validateDate(DateTime.fromISO(date, { zone: TIME_ZONE }), date);
};

const postDateFilter = (date: Date) =>
  DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED);

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
