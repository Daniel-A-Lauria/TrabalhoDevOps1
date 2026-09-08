document.addEventListener("DOMContentLoaded", () => {
  const markdownInput = document.getElementById("markdown-input");
  const markdownPreview = document.getElementById("markdown-preview");

  if (!markdownInput || !markdownPreview) {
    return;
  }

  function render() {
    if (typeof convertMarkdownToHtml === "function") {
      markdownPreview.innerHTML = convertMarkdownToHtml(markdownInput.value);
    }
  }

  markdownInput.addEventListener("input", render);
  render();
});