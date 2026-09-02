# Samuel Quirino Advocacia — site institucional

Site institucional *one-page* do escritório **Samuel Quirino Advocacia**, construído em
HTML, CSS e JavaScript puros — sem framework, sem build e sem banco de dados.

O site apresenta três frentes de trabalho:

1. **Direito Empresarial e Tributário** — empresas, sócios e gestão da carga tributária
2. **Direito Imobiliário** — compra e venda, locação, regularização e incorporação
3. **Legaltech** — desenvolvimento de software sob medida para escritórios de advocacia

---

## Sumário

- [Recursos](#recursos)
- [Stack](#stack)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Como rodar localmente](#como-rodar-localmente)
- [Como personalizar](#como-personalizar)
- [Publicar no GitHub Pages](#publicar-no-github-pages)
- [Antes de subir o repositório](#antes-de-subir-o-repositório)
- [Conformidade com a OAB](#conformidade-com-a-oab)
- [Acessibilidade](#acessibilidade)
- [Licença](#licença)

---

## Recursos

- **One-page responsivo**, mobile-first (breakpoints em 640px, 900px e 1200px)
- **Modo claro e escuro**, com detecção da preferência do sistema e escolha manual salva
  no navegador — sem piscar branco ao carregar
- **Dados centralizados** em um único arquivo (`js/config.js`): telefone, e-mail, OAB,
  endereço e redes sociais ficam em um lugar só
- **Links de WhatsApp com mensagem pré-preenchida** por área de interesse
- **Menu mobile acessível**, com fechamento por `Esc`, clique fora e trava de rolagem
- **Navegação com destaque da seção atual** (scroll-spy via `IntersectionObserver`)
- **FAQ em acordeão nativo** (`<details>`/`<summary>`), operável por teclado
- **Animação de entrada** que se desativa sozinha sob `prefers-reduced-motion`
- **SEO**: meta tags, Open Graph, dados estruturados `LegalService` (JSON-LD),
  `robots.txt` e `sitemap.xml`
- **Zero dependências de JavaScript** — nada de jQuery, Bootstrap ou bibliotecas externas

---

## Stack

| Camada | Tecnologia |
|---|---|
| Marcação | HTML5 semântico |
| Estilo | CSS3 (custom properties, Grid, Flexbox) |
| Comportamento | JavaScript ES6+ (vanilla) |
| Tipografia | Google Fonts — Lora (títulos) e Inter (corpo) |
| Ícones | SVG inline |
| Hospedagem | GitHub Pages (ou qualquer servidor estático) |

Sem etapa de build: os arquivos do repositório são exatamente os que vão para produção.

---

## Estrutura de pastas

```
SITE/
├── index.html              # A página inteira — todo o conteúdo textual está aqui
├── css/
│   ├── reset.css           # Normalização entre navegadores
│   ├── variables.css       # Design tokens: cores, tipografia, espaçamento (claro/escuro)
│   └── style.css           # Layout e componentes
├── js/
│   ├── config.js           # >>> SEUS DADOS: OAB, WhatsApp, e-mail, endereço, redes <<<
│   └── main.js             # Tema, menu, scroll-spy, animações e links de WhatsApp
├── assets/
│   ├── icons/
│   │   └── favicon.svg     # Ícone da aba do navegador
│   └── img/                # Fotos e imagem de compartilhamento (og-image.jpg)
├── robots.txt
├── sitemap.xml
├── .gitignore
├── LICENSE
└── README.md
```

---

## Como rodar localmente

**Opção 1 — abrir direto.** Dê um duplo clique em `index.html`. Funciona para conferir
layout e textos.

**Opção 2 — servidor local (recomendado).** Alguns comportamentos de navegador só se
manifestam sob `http://`. Dentro da pasta `SITE/`:

```bash
python -m http.server 8000
```

Depois acesse <http://localhost:8000>.

Alternativas equivalentes, se preferir:

```bash
npx serve .
```

No VS Code, a extensão **Live Server** também resolve, com recarga automática.

---

## Como personalizar

### 1. Seus dados de contato — `js/config.js`

Este é **o único arquivo que você precisa editar** para colocar o site no ar. Tudo que
estiver entre `[[colchetes duplos]]` é um espaço reservado esperando o valor real:

```js
const CONFIG = {
  razaoSocial: 'Samuel Quirino Advocacia',
  oab: '[[OAB/UF 000.000]]',            // obrigatório — ver seção sobre a OAB
  whatsapp: '[[5511999999999]]',        // só dígitos, com 55 e DDD
  telefoneExibicao: '[[(11) 99999-9999]]',
  email: '[[contato@samuelquirino.adv.br]]',
  endereco: '[[Rua Exemplo, 123 — Cidade/UF]]',
  instagram: '',                        // deixe vazio para ocultar o link
  linkedin: ''
};
```

Campos deixados como `''` simplesmente não aparecem na página. Enquanto um campo
continuar com o placeholder `[[...]]`, o site ignora aquele valor em vez de exibi-lo —
então nada de `[[5511999999999]]` vazando para o visitante.

### 2. Cores e tipografia — `css/variables.css`

Toda a identidade visual está em variáveis CSS no topo do arquivo. Para trocar a cor
principal, por exemplo, basta alterar `--brand` (e a versão correspondente no bloco
`[data-theme="dark"]`, logo abaixo).

### 3. Textos, áreas de atuação e equipe — `index.html`

O conteúdo é escrito diretamente no HTML, com comentários marcando cada seção
(`HERO`, `SOBRE`, `ÁREAS DE ATUAÇÃO`, `LEGALTECH`, `EQUIPE`, `DÚVIDAS`, `CONTATO`).

### 4. Fotos da equipe

Sem foto, cada membro aparece com as iniciais em um círculo — é o comportamento padrão e
funciona bem. Para usar fotos, coloque os arquivos em `assets/img/` e substitua o
`<span class="membro__avatar">` por uma `<img>` com `alt` descritivo.

### 5. Imagem de compartilhamento

Salve uma imagem de **1200×630px** como `assets/img/og-image.jpg`. É ela que aparece
quando alguém compartilha o link no WhatsApp ou no LinkedIn.

### 6. Domínio próprio

Se for usar um domínio diferente de `samuelquirino.adv.br`, atualize as URLs em três
pontos: as meta tags `canonical` e `og:` no `index.html`, o `sitemap.xml` e o
`robots.txt`.

---

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `site-samuel-quirino`).

2. Na pasta do projeto:

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Site institucional Samuel Quirino Advocacia"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
```

```bash
git push -u origin main
```

3. No GitHub, abra **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`,
   e salve. Em poucos minutos o site estará em
   `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`.

4. Para usar domínio próprio, aponte o DNS para o GitHub e informe o domínio no mesmo
   painel de **Pages**.

> **Atenção:** o `index.html` precisa estar na raiz da branch publicada. Se você versionar
> a pasta `CLAUDE_SAMUEL` inteira em vez de `SITE`, o GitHub Pages não encontrará a página —
> nesse caso, inicialize o repositório dentro de `SITE/`.

---

## Antes de subir o repositório

O `.gitignore` já bloqueia arquivos de sistema, pastas de editor e — deliberadamente —
extensões de documento (`*.pdf`, `*.docx`, `*.xlsx`) e pastas como `/clientes/` e
`/privado/`. **O repositório é público: nenhum documento de cliente pode entrar nele.**

Antes do primeiro `push`, confirme o que será enviado:

```bash
git status --short
```

Se precisar versionar um PDF genuinamente público (uma política de privacidade, por
exemplo), libere-o de forma explícita no `.gitignore`:

```
!assets/docs/politica-de-privacidade.pdf
```

---

## Conformidade com a OAB

O conteúdo do site foi redigido observando o **Código de Ética e Disciplina da OAB** e o
**Provimento n.º 205/2021** do Conselho Federal, que regem a publicidade na advocacia.
Na prática, isso significa que o site **não contém**:

- promessa ou garantia de resultado
- superlativos e comparações ("o melhor escritório", "líder em...")
- tabela de honorários, preços ou promoções
- depoimentos de clientes ou menção a casos identificáveis
- chamadas de captação mercantilista ("contrate já", "consulta grátis")

E **contém**, por exigência regulamentar:

- o número de inscrição na OAB, exibido no rodapé (preencha em `js/config.js`)
- aviso de que o conteúdo é informativo e não constitui consulta jurídica

Ao editar os textos, mantenha o tom informativo. Em caso de dúvida sobre uma redação
específica, a Comissão de Fiscalização da sua seccional é a fonte oficial.

---

## Acessibilidade

O site foi construído com HTML semântico, hierarquia de títulos consistente, link de
"pular para o conteúdo", foco sempre visível, contraste mínimo AA em ambos os temas e
navegação completa por teclado. As animações de entrada são desligadas automaticamente
para quem ativou `prefers-reduced-motion` no sistema.

Se o JavaScript estiver desativado, a página continua legível: nada de conteúdo preso em
animação que nunca dispara.

---

## Licença

O **código-fonte** deste projeto está sob a [Licença MIT](LICENSE).

A marca, o logotipo, as fotografias e os textos institucionais da Samuel Quirino
Advocacia **não** estão cobertos pela licença — todos os direitos reservados.

---

## Contato

**Samuel Quirino Advocacia**
Direito Empresarial e Tributário · Direito Imobiliário · Legaltech
