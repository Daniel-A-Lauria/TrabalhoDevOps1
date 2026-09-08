import { marked } from "marked";

/**
 * Converte Markdown para HTML estruturado.
 * Usa a biblioteca importada (Jest/Node) ou a global window.marked (Navegador).
 * @param {string} markdownText 
 * @returns {string}
 */
export function convertMarkdownToHtml(markdownText) {
  if (typeof markdownText !== "string" || !markdownText.trim()) {
    return "";
  }

  // Prioriza o marked disponível no ambiente (global ou importado)
  const lib = typeof window !== "undefined" && window.marked 
    ? window.marked 
    : marked;

  const parseFn = typeof lib.parse === "function" ? lib.parse : lib;
  return parseFn(markdownText).trim();
}

if (typeof window !== "undefined") {
  window.convertMarkdownToHtml = convertMarkdownToHtml;
}