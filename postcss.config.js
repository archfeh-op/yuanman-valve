const removeNewlines = (string) => string.replace(/\n$/g, "");

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: [

    "./hugo_stats.json",

    "../../hugo_stats.json",

    "./exampleSite/hugo_stats.json",
  ],
  defaultExtractor: (content) => {
    let els = JSON.parse(content).htmlElements;

    return els.tags.concat(els.classes, els.ids).map(removeNewlines);
  },
});

module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
    ...(process.env.HUGO_ENVIRONMENT === "production" ? [purgecss] : []),
  ],
};
