import defineConfig from "11ty.ts";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import redirectPlugin from "eleventy-plugin-redirects";
import embedYouTube from "eleventy-plugin-youtube-embed";
import { jsxToString } from "jsx-async-runtime";
import "tsx/esm";
import { datePlugin } from "./plugins/date-plugin";
import { feedSubscriptionsPlugin } from "./plugins/feed-subscriptions-plugin";
import { markdownPlugin } from "./plugins/markdown-plugin";
import { syntaxPlugin } from "./plugins/syntax-highlight";

const extractExcerpt = ({ templateContent = "" }) => {
  const end = templateContent.indexOf("</p>");

  if (end > 0) return templateContent.substring(0, end + 4);

  return templateContent;
};

export default defineConfig((eleventyConfig) => {
  // Copy these files unmodified directly into the output
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("**/*.pdf");

  // Custom Plugins
  eleventyConfig.addPlugin(datePlugin);
  eleventyConfig.addPlugin(markdownPlugin);
  eleventyConfig.addPlugin(feedSubscriptionsPlugin);

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

  eleventyConfig.addPlugin(embedYouTube);
  eleventyConfig.addPlugin(syntaxPlugin);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
  eleventyConfig.addPlugin(redirectPlugin, { template: "clientSide" });

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
