import { convertMarkdownToHtml } from "./convert.js";

describe("Suíte de Testes Automatizados - Editor Markdown", () => {
  describe("Testes Unitários da Função de Conversão", () => {
    test("deve converter cabeçalho (# Título) em <h1>", () => {
      const input = "# Título Principal";
      const output = convertMarkdownToHtml(input);
      // Valida que foi gerada uma tag h1 e que contém o texto esperado
      expect(output).toMatch(/<h1.*?>Título Principal<\/h1>/);
    });

    test("deve converter negrito (**texto**) em <strong>", () => {
      const input = "**Texto em Negrito**";
      const output = convertMarkdownToHtml(input);
      expect(output).toContain("<strong>Texto em Negrito</strong>");
    });

    test("deve converter itálico (*texto*) em <em>", () => {
      const input = "*Texto em Itálico*";
      const output = convertMarkdownToHtml(input);
      expect(output).toContain("<em>Texto em Itálico</em>");
    });

    test("deve retornar string vazia caso o input seja nulo ou indefinido", () => {
      expect(convertMarkdownToHtml(null)).toBe("");
      expect(convertMarkdownToHtml(undefined)).toBe("");
      expect(convertMarkdownToHtml("   ")).toBe("");
    });
  });

  describe("Teste de Integração com o DOM", () => {
    test("deve preencher o preview com o HTML gerado a partir do textarea", () => {
      document.body.innerHTML = `
        <textarea id="markdown-input"># Teste de Integração</textarea>
        <div id="markdown-preview"></div>
      `;

      const inputEl = document.getElementById("markdown-input");
      const previewEl = document.getElementById("markdown-preview");

      previewEl.innerHTML = convertMarkdownToHtml(inputEl.value);
      
      const h1El = previewEl.querySelector("h1");
      expect(h1El).not.toBeNull();
      expect(h1El.textContent).toBe("Teste de Integração");
    });
  });
});