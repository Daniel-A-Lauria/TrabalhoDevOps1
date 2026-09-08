function initEditor() {
  const markdownInput = document.getElementById("markdown-input");
  const markdownPreview = document.getElementById("markdown-preview");

  if (!markdownInput || !markdownPreview) return;

  function render() {
    if (typeof window.convertMarkdownToHtml === "function") {
      markdownPreview.innerHTML = window.convertMarkdownToHtml(markdownInput.value);
    } else if (typeof marked !== "undefined") {
      const parseFn = typeof marked.parse === "function" ? marked.parse.bind(marked) : marked;
      markdownPreview.innerHTML = parseFn(markdownInput.value);
    }
  }

  markdownInput.addEventListener("input", render);
  render();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initEditor);
} else {
  initEditor();
}