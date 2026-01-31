import { EleventyConfig } from "11ty.ts";
import MarkdownIt from "markdown-it";
import { BundledLanguage, BundledTheme, createHighlighter } from "shiki";

interface Options {
  theme: BundledTheme;
  themes: BundledTheme[];
  langs: BundledLanguage[];
}

const shikiPlugin = async (config: EleventyConfig, options: Options) => {
  const highlighter = await createHighlighter(options as never);
  config.amendLibrary("md", (md: MarkdownIt) =>
    md.set({
      highlight: (code, lang) =>
        highlighter.codeToHtml(code, { lang, theme: options.theme }),
    }),
  );
};

export const syntaxPlugin = (config: EleventyConfig) =>
  config.addPlugin(shikiPlugin, {
    theme: "github-dark-default",
    themes: ["github-dark-default"],
    langs: [
      "go",
      "python",
      "rust",

      // Shell
      "bash",
      "sh",

      // Web
      "css",
      "html",
      "javascript",
      "typescript",

      "jsx",
      "tsx",

      // Config
      "json",
      "toml",
    ],
  });
