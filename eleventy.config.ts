import defineConfig from "11ty.ts";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import redirectPlugin from "eleventy-plugin-redirects";
import embedYouTube from "eleventy-plugin-youtube-embed";
import { jsxToString } from "jsx-async-runtime";
import "tsx/esm";
import { datePlugin } from "./plugins/date-plugin";
import { markdownPlugin } from "./plugins/markdown-plugin";
import { syntaxPlugin } from "./plugins/syntax-highlight";

const extractExcerpt = ({ templateContent = "" }) => {
  const end = templateContent.indexOf("</p>");

  if (end > 0) return templateContent.substring(0, end + 4);

  return templateContent;
};

const atomFeedConfig = {
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

const rssFeedConfig = {
  ...atomFeedConfig,
  type: "rss",
  outputPath: "/blog/rss.xml",
} as const;

const jsonFeedConfig = {
  ...atomFeedConfig,
  type: "json",
  outputPath: "/blog/feed.json",
} as const;

export default defineConfig((eleventyConfig) => {
  eleventyConfig.addPlugin(datePlugin);
  eleventyConfig.addPlugin(markdownPlugin);

  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
    compile: () =>
      async function render(data: unknown) {
        const content = await this.defaultRenderer(data);
        return jsxToString(content);
      },
  });

  eleventyConfig.addTemplateFormats(["11ty.jsx", "11ty.ts", "11ty.tsx"]);

  eleventyConfig.addShortcode("excerpt", extractExcerpt);
  eleventyConfig.addGlobalData("layout", "layout/base.njk");

  eleventyConfig.addCollection("releasedPosts", (api) =>
    api
      .getFilteredByTag("blog")
      .filter((x) => new Date().getTime() >= x.date.getTime()),
  );

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("**/*.pdf");

  eleventyConfig.addPlugin(embedYouTube);
  eleventyConfig.addPlugin(syntaxPlugin);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
  eleventyConfig.addPlugin(redirectPlugin, { template: "clientSide" });

  eleventyConfig.addPlugin(feedPlugin, atomFeedConfig);
  eleventyConfig.addPlugin(feedPlugin, jsonFeedConfig);
  eleventyConfig.addPlugin(feedPlugin, rssFeedConfig);

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
