import { EleventyConfig } from "11ty.ts";
import MarkdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import footnote_plugin from "markdown-it-footnote";
import MarkdownItGitHubAlerts from "markdown-it-github-alerts";

const md = MarkdownIt({
  html: true,
  linkify: true,
})
  .use(footnote_plugin)
  .use(MarkdownItGitHubAlerts)
  .use(markdownItAttrs);

// Encode identifying information about the post itself into the anchors so that footnotes still work on the blogroll
md.renderer.rules.footnote_anchor_name = (tokens, idx, _options, env) =>
  `_${typeof env.docId === "string" ? env.docId : env.page.fileSlug}_${tokens[idx].meta.label ?? tokens[idx].meta.id}`;

export const markdownPlugin = (cfg: EleventyConfig) => cfg.setLibrary("md", md);
