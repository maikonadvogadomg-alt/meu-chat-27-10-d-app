# 🧬 Receita para recriar: Meu Chat

_Gerada sem IA, lendo 39 arquivo(s). Serve para remontar este app como HTML modular — com qualquer IA, um arquivo por vez._

## 1. O que é

- **Nome:** Meu Chat
- **Partes de código:** 15 (2 tela, 12 logica, 0 servidor, 0 dados, 1 estilo)
- **Tem servidor (rotas /api):** não — dá para ser só HTML
- **Peças de fora (bibliotecas):** nenhuma

## 2. Estrutura modular proposta

```
index.html            ← a página; chama os módulos NA ORDEM
css/app.css           ← o visual
js/00-core.js         ← a "locomotiva": cria window.APP (registrar, guardar, avisar)
js/10-base.js         ← Meu Chat — 00-base.js: peças comuns (MC) (era js/00-base.js)
js/15-banco.js        ← Meu Chat — 10-banco.js: onde tudo fica guardado (IndexedDB do aparelho (era js/10-banco.js)
js/20-provedores.js   ← Meu Chat — 20-provedores.js: conversar com as IAs (Gemini, Groq, OpenR (era js/20-provedores.js)
js/25-memoria.js      ← Meu Chat — 30-memoria.js: 🧠 a memória que vai junto em TODA conversa. (era js/30-memoria.js)
js/30-voz.js          ← Meu Chat — 40-voz.js: 🎤 falar (ditado) e 🔊 ouvir a resposta em VOZ N (era js/40-voz.js)
js/35-internet.js     ← Meu Chat — 50-internet.js: 🌐 pesquisar e 🔗 ler links. - Gemini e Cla (era js/50-internet.js)
js/40-previa.js       ← Meu Chat — 60-previa.js: 👁 ver o código funcionando, na hora. - HTML: (era js/60-previa.js)
js/45-texto.js        ← Meu Chat — 70-texto.js: mostra a resposta da IA bonitinha (negrito, li (era js/70-texto.js)
js/50-chat.js         ← Meu Chat — 80-chat.js: a conversa (mensagens, fotos, mandar, parar, li (era js/80-chat.js)
js/55-config.js       ← Meu Chat — 85-config.js: ⚙️ chaves das IAs, modelo, busca, voz, instru (era js/85-config.js)
js/60-backup.js       ← Meu Chat — 90-backup.js: 💾 backup de tudo (conversas + memória + ajus (era js/90-backup.js)
js/65-hub.js          ← Meu-Chat-27-10-D — Meu-Chat-27-10-D (era hub.html)
js/70-inicio.js       ← Meu Chat (era index.html)
js/99-app.js          ← o último: monta a tela com o que embarcou
```

## 3. As partes, uma por uma

| # | Era | Vira | Tipo | O que faz | Usa |
|---|---|---|---|---|---|
| 1 | `js/00-base.js` | `js/10-base.js` | logica | Meu Chat — 00-base.js: peças comuns (MC) | — |
| 2 | `js/10-banco.js` | `js/15-banco.js` | logica | Meu Chat — 10-banco.js: onde tudo fica guardado (IndexedDB do aparelho — não some ao fecha | — |
| 3 | `js/20-provedores.js` | `js/20-provedores.js` | logica | Meu Chat — 20-provedores.js: conversar com as IAs (Gemini, Groq, OpenRouter, OpenAI, DeepS | — |
| 4 | `js/30-memoria.js` | `js/25-memoria.js` | logica | Meu Chat — 30-memoria.js: 🧠 a memória que vai junto em TODA conversa. A IA guarda sozinha | — |
| 5 | `js/40-voz.js` | `js/30-voz.js` | logica | Meu Chat — 40-voz.js: 🎤 falar (ditado) e 🔊 ouvir a resposta em VOZ NATURAL (a do Gemini, | — |
| 6 | `js/50-internet.js` | `js/35-internet.js` | logica | Meu Chat — 50-internet.js: 🌐 pesquisar e 🔗 ler links. - Gemini e Claude pesquisam sozinh | — |
| 7 | `js/60-previa.js` | `js/40-previa.js` | logica | Meu Chat — 60-previa.js: 👁 ver o código funcionando, na hora. - HTML: abre a página como  | — |
| 8 | `js/70-texto.js` | `js/45-texto.js` | logica | Meu Chat — 70-texto.js: mostra a resposta da IA bonitinha (negrito, listas, links, blocos  | — |
| 9 | `js/80-chat.js` | `js/50-chat.js` | logica | Meu Chat — 80-chat.js: a conversa (mensagens, fotos, mandar, parar, lista de conversas). C | — |
| 10 | `js/85-config.js` | `js/55-config.js` | logica | Meu Chat — 85-config.js: ⚙️ chaves das IAs, modelo, busca, voz, instruções, tema | — |
| 11 | `js/90-backup.js` | `js/60-backup.js` | logica | Meu Chat — 90-backup.js: 💾 backup de tudo (conversas + memória + ajustes) e restaurar SEM | — |
| 12 | `js/99-app.js` | css/app.css | logica | Meu Chat — 99-app.js: liga tudo quando abre | — |
| 13 | `hub.html` | `js/65-hub.js` | tela | Meu-Chat-27-10-D — Meu-Chat-27-10-D | hub.webmanifest, favicon.ico, icon.svg, apple-touch-icon.png |
| 14 | `css/app.css` | css/app.css | estilo | — | — |
| 15 | `index.html` | `js/70-inicio.js` | tela | Meu Chat | app.css, manifest.json, favicon.ico, icon.svg |

## 4. Montar passo a passo (cada bloco é um pedido pronto: 📋 Copiar → colar na IA)

### Passo 0 — combinar as regras com a IA

```text
Vamos recriar o app "Meu Chat" como HTML MODULAR, que abre pelo index.html, sem servidor e sem nada da Replit.
Regras: (1) index.html chama os arquivos js/ na ordem, antes do </body>; (2) js/00-core.js cria window.APP com APP.registrar(modulo), APP.guardar(chave, valor) em IndexedDB/localStorage e APP.avisar(texto); (3) cada arquivo js/NN-nome.js cuida de UM assunto, começa com (function (APP) { e termina com })(window.APP); (4) js/99-app.js vem por último e monta a tela com os módulos registrados; (5) textos em português do Brasil.
Vou pedir UM arquivo por vez. Responda só com o arquivo completo, sem cortar nada. Primeiro: crie index.html, css/app.css e js/00-core.js.
```

### Passo 1 — `js/10-base.js` (era `js/00-base.js`, 38 linhas)

```text
Crie js/10-base.js. Ele faz: Meu Chat — 00-base.js: peças comuns (MC).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 2 — `js/15-banco.js` (era `js/10-banco.js`, 26 linhas)

```text
Crie js/15-banco.js. Ele faz: Meu Chat — 10-banco.js: onde tudo fica guardado (IndexedDB do aparelho — não some ao fechar).
No app original ele tinha estas funções/partes: abrir, req, loja.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 3 — `js/20-provedores.js` (era `js/20-provedores.js`, 203 linhas)

```text
Crie js/20-provedores.js. Ele faz: Meu Chat — 20-provedores.js: conversar com as IAs (Gemini, Groq, OpenRouter, OpenAI, DeepSeek, Claude). - Várias chaves; quando uma acaba (limite/cota), passa sozinho para a próxima ("revezar"). - Busca a lista de modelos de verdade na hora de testar a chave (nada de nome velho chumbado). - As chaves ficam SÓ neste aparelho.
No app original ele tinha estas funções/partes: detectar, procurarOllama, chaves, salvarChaves, pontoGemini, listarModelos, modeloDe, testarChave, erroLegivel, ehLimite, cabAnthropic, lerSSE, pedir, parcial, conversar.
Ele chamava estes endereços: http://127.0.0.1:11434/api/tags. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 4 — `js/25-memoria.js` (era `js/30-memoria.js`, 52 linhas)

```text
Crie js/25-memoria.js. Ele faz: Meu Chat — 30-memoria.js: 🧠 a memória que vai junto em TODA conversa. A IA guarda sozinha o que for importante escrevendo [[lembrar: …]] no fim da resposta (o app tira isso do texto, guarda e mostra "🧠 guardei"). [[esquecer: …]] apaga.
No app original ele tinha estas funções/partes: texto, salvar, lembrar, esquecer, aplicarMarcas, sistema, abrir.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 5 — `js/30-voz.js` (era `js/40-voz.js`, 109 linhas)

```text
Crie js/30-voz.js. Ele faz: Meu Chat — 40-voz.js: 🎤 falar (ditado) e 🔊 ouvir a resposta em VOZ NATURAL (a do Gemini, não a de robô). - Ditado: o reconhecimento de voz do Chrome (no app instalado pelo Chrome funciona). No APK, se ele trouxer a "ponte de voz" (window.AndroidVoz), usa a do Android. - Voz: o Gemini fala (vozes Kore, Puck, Charon…). A voz do aparelho só se você ligar em ⚙️.
No app original ele tinha estas funções/partes: podeOuvir, ouvir, parar, marcar, paraFala, pedacos, wav, b64bytes, chaveGemini, modeloTTS, ponto, sintetizar, tocar, falar, gerar, pararFala.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 6 — `js/35-internet.js` (era `js/50-internet.js`, 58 linhas)

```text
Crie js/35-internet.js. Ele faz: Meu Chat — 50-internet.js: 🌐 pesquisar e 🔗 ler links. - Gemini e Claude pesquisam sozinhos (a busca vem embutida neles). - As outras IAs: usa a SUA chave de busca (Serper, Tavily ou Brave), se tiver, e manda os resultados junto. - Link na mensagem: o app lê a página (pelo leitor r.jina.ai, grátis) e manda o texto para a IA.
No app original ele tinha estas funções/partes: buscar, lerLink, preparar.
Ele chamava estes endereços: https://google.serper.dev/search, https://api.tavily.com/search, https://api.search.brave.com/res/v1/web/search?count=8&country=BR&search_lang=pt-br&q=, https://r.jina.ai/. Em HTML, ligue cada um à função equivalente do módulo certo.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 7 — `js/40-previa.js` (era `js/60-previa.js`, 72 linhas)

```text
Crie js/40-previa.js. Ele faz: Meu Chat — 60-previa.js: 👁 ver o código funcionando, na hora. - HTML: abre a página como ela é. - TSX / JSX (React): monta com React + Babel + Tailwind (pela internet) e mostra o componente. Os erros aparecem embaixo, em vermelho.
No app original ele tinha estas funções/partes: paginaHTML, paginaReact, falha, req, App, tipoDe, abrir.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 8 — `js/45-texto.js` (era `js/70-texto.js`, 45 linhas)

```text
Crie js/45-texto.js. Ele faz: Meu Chat — 70-texto.js: mostra a resposta da IA bonitinha (negrito, listas, links, blocos de código com 📋 copiar, ⤓ baixar e 👁 ver funcionando).
No app original ele tinha estas funções/partes: inline, render, ligar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 9 — `js/50-chat.js` (era `js/80-chat.js`, 154 linhas)

```text
Crie js/50-chat.js. Ele faz: Meu Chat — 80-chat.js: a conversa (mensagens, fotos, mandar, parar, lista de conversas). Cada conversa fica guardada no aparelho. Vai para a IA: a memória + as últimas mensagens.
No app original ele tinha estas funções/partes: nova, abrirConversa, guardar, reduzir, anexar, pintarAnexos, htmlMsg, dedup, hora, pintar, mandar, responder, ouvirEMandar, acao, pintarLista, cliqueLista.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 10 — `js/55-config.js` (era `js/85-config.js`, 79 linhas)

```text
Crie js/55-config.js. Ele faz: Meu Chat — 85-config.js: ⚙️ chaves das IAs, modelo, busca, voz, instruções, tema.
No app original ele tinha estas funções/partes: pintar, clique, mudou, aplicarTema, abrir.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 11 — `js/60-backup.js` (era `js/90-backup.js`, 44 linhas)

```text
Crie js/60-backup.js. Ele faz: Meu Chat — 90-backup.js: 💾 backup de tudo (conversas + memória + ajustes) e restaurar SEM APAGAR NADA.
No app original ele tinha estas funções/partes: gerar, baixar, restaurar.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 12 — `js/65-hub.js` (era `hub.html`, 81 linhas)

```text
Crie js/65-hub.js. Ele faz: Meu-Chat-27-10-D — Meu-Chat-27-10-D.
No app original ele tinha estas funções/partes: rec, esc, card, show.
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 13 — `js/70-inicio.js` (era `index.html`, 99 linhas)

```text
Crie js/70-inicio.js. Ele faz: Meu Chat.
Ele usa o que já foi criado em: js/10-base.js, js/15-banco.js, js/20-provedores.js, js/25-memoria.js, js/30-voz.js, js/35-internet.js, js/40-previa.js, js/45-texto.js, js/50-chat.js, js/55-config.js, js/60-backup.js (pelo APP).
Registre com APP.registrar({ nome, icone, abrir }). Devolva só o arquivo completo.
```

### Passo 14 — `js/99-app.js` e conferir

```text
Crie js/99-app.js: ele olha APP.modulos e monta o menu/abas com um botão para cada módulo. Depois, me mande o index.html atualizado com todos os <script src="js/…"> na ordem certa: js/00-core.js, js/10-base.js, js/15-banco.js, js/20-provedores.js, js/25-memoria.js, js/30-voz.js, js/35-internet.js, js/40-previa.js, js/45-texto.js, js/50-chat.js, js/55-config.js, js/60-backup.js, js/65-hub.js, js/70-inicio.js, js/99-app.js.
```

## 5. Conferir no final

- [ ] Abrir o index.html na prévia: aparece a tela sem erro (▤ console vazio)?
- [ ] Cada botão abre a sua parte?
- [ ] Fechar e abrir de novo: os dados continuam?
- [ ] Nada com "replit", "REPL_", "@workspace" no código (🏗️ Preparar confere).
- [ ] 📱 PWA → deixar instalável; 📦 APK ou 🖥️ .exe.
