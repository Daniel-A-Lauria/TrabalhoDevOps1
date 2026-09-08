const { marked } = require("marked");

function convertMarkdownToHtml(markdownText) {
  if (typeof markdownText !== "string") {
    return "";
  }
  return marked.parse(markdownText).trim();
}

module.exports = { convertMarkdownToHtml };