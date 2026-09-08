import { convertMarkdownToHtml } from "./convert.js";

const markdownInput = document.getElementById("markdown-input");
const markdownPreview = document.getElementById("markdown-preview");

if (markdownInput && markdownPreview) {
  markdownInput.addEventListener("input", () => {
    markdownPreview.innerHTML = convertMarkdownToHtml(markdownInput.value);
  });

  markdownPreview.innerHTML = convertMarkdownToHtml(markdownInput.value);
}