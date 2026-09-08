/**
 * Converte Markdown para HTML estruturado
 * @param {string} markdownText 
 * @returns {string}
 */
export function convertMarkdownToHtml(markdownText) {
  if (typeof markdownText !== "string" || !markdownText.trim()) {
    return "";
  }

  // No navegador pega do window.marked (CDN). No Jest/Node importa do pacote.
  const lib = typeof window !== "undefined" && window.marked 
    ? window.marked 
    : awaitImportMarked();

  const parseFn = typeof lib.parse === "function" ? lib.parse : lib;
  return parseFn(markdownText).trim();
}

// Fallback para o ambiente Node/Jest
let nodeMarked = null;
function awaitImportMarked() {
  if (!nodeMarked) {
    // Carrega o marked no Jest de forma síncrona/cacheada
    const { marked } = await import("marked").catch(() => ({ marked: globalThis.marked }));
    nodeMarked = marked;
  }
  return nodeMarked;
}
if (typeof window !== "undefined") {
  window.convertMarkdownToHtml = convertMarkdownToHtml;
}