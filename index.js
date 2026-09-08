const markdownInput = document.getElementById("markdown-input");
const markdownPreview = document.getElementById("markdown-preview");

markdownInput.addEventListener("input", () => {
    const markdownText = markdownInput.value;
    markdownPreview.innerHTML = marked.parse(markdownText)
})

markdownPreview.innerHTML = marked.parse(markdownInput.value || "");
