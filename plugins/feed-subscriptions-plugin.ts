import { EleventyConfig } from "11ty.ts";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

const config = {
  collection: {
    name: "releasedPosts",
    limit: 0, // 0 means no limit
  },
  metadata: {
    language: "en",
    title: "Katie's Place | 347Online.me",
    base: "https://347online.me/blog/",
    author: {
      name: "Katie Janzen",
      email: "katiejanzen@347online.me",
    },
  },
} as const;

export const feedSubscriptionsPlugin = (cfg: EleventyConfig) => {
  cfg.addPlugin(feedPlugin, {
    ...config,
    type: "atom",
    outputPath: "/blog/feed.xml",
  });
  cfg.addPlugin(feedPlugin, {
    ...config,
    type: "rss",
    outputPath: "/blog/rss.xml",
  });
};
