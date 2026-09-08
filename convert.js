import { marked } from "marked";

/**
 * Converte texto Markdown para HTML estruturado.
 * @param {string} markdownText
 * @returns {string}
 */
export function convertMarkdownToHtml(markdownText) {
  if (typeof markdownText !== "string" || !markdownText.trim()) {
    return "";
  }

  const html = typeof marked.parse === "function" 
    ? marked.parse(markdownText) 
    : marked(markdownText);

  return html.trim();
}