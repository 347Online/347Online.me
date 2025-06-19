export default (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addGlobalData("layout", "layout/base.njk");

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
