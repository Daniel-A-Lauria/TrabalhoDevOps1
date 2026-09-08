const { convertMarkdownToHtml } = require("./converter");

describe("Suíte de Testes Automatizados - Editor Markdown", () => {

  test("deve converter cabeçalho (# Titulo) em tag <h1>", () => {
    const input = "# Olá Mundo";
    const output = convertMarkdownToHtml(input);
    expect(output).toContain("<h1>Olá Mundo</h1>");
  });

  test("deve converter texto em negrito (**texto**) em <strong>", () => {
    const input = "**DevOps**";
    const output = convertMarkdownToHtml(input);
    expect(output).toContain("<strong>DevOps</strong>");
  });

  test("deve retornar string vazia caso o input seja nulo ou indefinido", () => {
    expect(convertMarkdownToHtml(null)).toBe("");
    expect(convertMarkdownToHtml(undefined)).toBe("");
  });

  test("deve atualizar o innerHTML do elemento de preview corretamente", () => {
    document.body.innerHTML = `
      <textarea id="markdown-input"># Teste DOM</textarea>
      <div id="markdown-preview"></div>
    `;

    const inputEl = document.getElementById("markdown-input");
    const previewEl = document.getElementById("markdown-preview");

    previewEl.innerHTML = convertMarkdownToHtml(inputEl.value);

    expect(previewEl.innerHTML).toBe("<h1>Teste DOM</h1>");
  });
});