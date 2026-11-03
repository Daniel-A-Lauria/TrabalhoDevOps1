Fiz um convertor de texto Markdown em HTML/CSS/JavaScript baseado em um tutorial que vi no youtube. Adicionei css próprio com base no estilo do meu site pessoal e implementei o que foi requisitado pro trabalho.
Foi utilizada assistência do Gemini para a implementação de testes.

O site: https://daniel-a-lauria.github.io/TrabalhoDevOps1/

## Versionamento Semântico e Rollback

### 1. Padrão de Versionamento Semântico (SemVer)
O projeto adota o padrão `MAJOR.MINOR.PATCH` (ex: `v1.0.0`) associado a tags do Git:
- **MAJOR (`v1.x.x`):** Modificações que quebram compatibilidade retroativa.
- **MINOR (`vx.1.x`):** Novas funcionalidades retrocompatíveis.
- **PATCH (`vx.x.1`):** Correções de falhas e bugs retrocompatíveis.

As tags criadas disparam automaticamente o pipeline de CD no GitHub Actions, gerando imagens imutáveis no GitHub Container Registry (GHCR) com as devidas tags de versão (`:v1.0.0`, `:v1.0`, `:latest`).

---

### 2. Simulação de Cenário de Falha e Procedimento de Rollback

#### Cenário de Falha Simulado
1. Foi publicada a versão `v1.0.0` estável em ambiente de homologação/produção.
2. Foi efetuada uma nova entrega com a tag `v1.0.1`, contendo alterações no renderizador de Markdown.
3. Após o deploy automatizado, a monitorização detetou um erro crítico que inviabilizou a conversão de cabeçalhos na interface web.

#### Procedimento de Rollback Operacional (Via Contentores)
Para restabelecer o serviço de imediato sem esperar por uma nova compilação de código, aponta-se o serviço em execução para a última imagem estável conhecida (`v1.0.0`):

1. **Atualizar o serviço para a versão anterior estável:**

# Alterar a tag da imagem no docker-compose.prod.yml ou via variável de ambiente:
   `export APP_VERSION=v1.0.0`
   `docker compose pull web`
   `docker compose up -d --no-deps web`

2. **Verificação do Estado:**

# Validação de que o contentor está ativo na versão estável anterior
`docker ps --filter "name=editor_markdown_app"`
`curl -I http://localhost:8080`

# Reversão no Controle de Versão (Git)

Para manter o histórico do repositório auditável e coerente:
1. **Reverter o commit**

`git revert HEAD --no-edit`

2. **Publicar um Rollback**

`git tag -a v1.0.2 -m "Rollback para 1.0"`
`git push origin main --tags`
