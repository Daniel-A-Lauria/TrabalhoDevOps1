/**
 * Converte texto Markdown para HTML estruturado
 * @param {string} markdownText 
 * @returns {string}
 */
export function convertMarkdownToHtml(markdownText) {
  if (typeof markdownText !== "string" || !markdownText.trim()) {
    return "";
  }

  // No navegador pega do window.marked (da CDN).
  // Nos testes Jest pega da variável injetada globalmente.
  const lib = typeof window !== "undefined" && window.marked 
    ? window.marked 
    : globalThis.marked;

  if (!lib) {
    return markdownText;
  }

  const parseFn = typeof lib.parse === "function" ? lib.parse.bind(lib) : lib;
  return parseFn(markdownText).trim();
}

// Expõe na janela global do navegador para o index.js enxergar diretamente
if (typeof window !== "undefined") {
  window.convertMarkdownToHtml = convertMarkdownToHtml;
}
