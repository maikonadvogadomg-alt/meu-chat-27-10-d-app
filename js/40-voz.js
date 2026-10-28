/* Meu Chat — 40-voz.js: 🎤 falar (ditado) e 🔊 ouvir a resposta em VOZ NATURAL (a do Gemini, não a de robô).
   - Ditado: o reconhecimento de voz do Chrome (no app instalado pelo Chrome funciona).
     No APK, se ele trouxer a "ponte de voz" (window.AndroidVoz), usa a do Android.
   - Voz: o Gemini fala (vozes Kore, Puck, Charon…). A voz do aparelho só se você ligar em ⚙️. */
(function (MC) {
  'use strict';
  const VOZES = ['Kore', 'Aoede', 'Leda', 'Zephyr', 'Puck', 'Charon', 'Fenrir', 'Orus', 'Despina', 'Achird', 'Algieba', 'Sulafat'];
  let rec = null, ouvindo = false, audio = null, falando = false, filaTok = 0;

  // ── 🎤 ditado ──
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function podeOuvir() { return !!(window.AndroidVoz || SR); }
  function ouvir(aoFim) {
    if (ouvindo) { parar(); return; }
    pararFala();
    if (window.AndroidVoz && window.AndroidVoz.ouvir) { // ponte nativa (APK)
      window.__vozResultado = (t) => { ouvindo = false; marcar(); const e = MC.$('#entrada'); if (t) { e.value = t; e.dispatchEvent(new Event('input')); } aoFim && aoFim(String(t || '')); };
      window.__vozErro = (m) => { ouvindo = false; marcar(); MC.aviso('🎤 ' + m, 'erro'); };
      const ent = MC.$('#entrada'), antes = ent.value ? ent.value.replace(/\s*$/, ' ') : '';
      window.__vozParcial = (t) => { ent.value = antes + t; ent.dispatchEvent(new Event('input')); };
      ouvindo = true; marcar(); window.AndroidVoz.ouvir('pt-BR'); return;
    }
    if (!SR) { MC.aviso('🎤 Aqui não tem ditado por voz. Use o app instalado pelo Chrome (menu ⋮ → Instalar app), ou o teclado com microfone do Google.', 'erro'); return; }
    rec = new SR(); rec.lang = 'pt-BR'; rec.interimResults = true; rec.continuous = false; rec.maxAlternatives = 1;
    const ent = MC.$('#entrada'), antes = ent.value ? ent.value.replace(/\s*$/, ' ') : '';
    let final = '';
    rec.onresult = (e) => { let parcial = ''; for (let i = e.resultIndex; i < e.results.length; i++) { const t = e.results[i][0].transcript; if (e.results[i].isFinal) final += t; else parcial += t; } ent.value = antes + final + parcial; ent.dispatchEvent(new Event('input')); };
    rec.onerror = (e) => { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') MC.aviso('🎤 Sem permissão de microfone. Toque no cadeado ao lado do endereço → Microfone → Permitir.', 'erro'); else if (e.error !== 'no-speech' && e.error !== 'aborted') MC.aviso('🎤 ' + e.error, 'erro'); };
    rec.onend = () => { ouvindo = false; marcar(); rec = null; if (aoFim) aoFim((antes + final).trim()); };
    try { rec.start(); ouvindo = true; marcar(); } catch (e) { MC.aviso('🎤 ' + e.message, 'erro'); }
  }
  function parar() { try { rec && rec.stop(); } catch {} try { window.AndroidVoz && window.AndroidVoz.parar && window.AndroidVoz.parar(); } catch {} ouvindo = false; marcar(); }
  function marcar() { const b = MC.$('#bt-mic'); if (b) { b.classList.toggle('ouvindo', ouvindo || falando); b.textContent = falando ? '⏹' : '🎤'; b.title = falando ? 'Parar a voz' : ouvindo ? 'Ouvindo… toque para parar' : 'Falar'; } }

  // ── 🔊 voz natural (Gemini) ──
  function paraFala(t) {
    return String(t || '').replace(/```[\s\S]*?```/g, ' (o código está na tela) ').replace(/`([^`]+)`/g, '$1')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/https?:\/\/\S+/g, ' link ')
      .replace(/[*_#>|]+/g, ' ').replace(/^\s*[-•]\s+/gm, '').replace(/\s+\n/g, '\n').replace(/[ \t]{2,}/g, ' ').trim();
  }
  function pedacos(t, max) {
    const frases = t.split(/(?<=[.!?…:;])\s+|\n+/); const out = []; let a = '';
    for (const f of frases) { if ((a + ' ' + f).length > max && a) { out.push(a.trim()); a = ''; } a += ' ' + f; }
    if (a.trim()) out.push(a.trim()); return out;
  }
  function wav(pcm, taxa) { // PCM 16 bits mono → arquivo WAV que o celular toca
    const h = new ArrayBuffer(44), v = new DataView(h), w = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    w(0, 'RIFF'); v.setUint32(4, 36 + pcm.length, true); w(8, 'WAVE'); w(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, taxa, true); v.setUint32(28, taxa * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, 'data'); v.setUint32(40, pcm.length, true);
    return new Blob([h, pcm], { type: 'audio/wav' });
  }
  const b64bytes = (b) => Uint8Array.from(atob(b), (c) => c.charCodeAt(0));
  async function chaveGemini() { const l = await MC.ia.chaves(); return l.filter((c) => c.provedor === 'gemini'); }
  async function modeloTTS(chave) {
    const guardado = MC.pref.get('modeloTTS', ''); if (guardado) return guardado;
    try {
      const r = await fetch(MC.ia.P.gemini.base + '/models?pageSize=200&key=' + encodeURIComponent(chave)); const j = await r.json();
      const l = (j.models || []).map((m) => m.name.replace(/^models\//, '')).filter((n) => /tts/.test(n));
      const ponto = (n) => (parseFloat((n.match(/(\d+(?:\.\d+)?)/) || [])[1]) || 0) * 10 + (/flash/.test(n) ? 3 : 0) - (/lite/.test(n) ? 1 : 0) - (/preview/.test(n) ? 0.5 : 0);
      l.sort((a, b) => ponto(b) - ponto(a)); if (l[0]) { MC.pref.set('modeloTTS', l[0]); return l[0]; }
    } catch {}
    return 'gemini-2.5-flash-preview-tts';
  }
  async function sintetizar(texto, chave) {
    const voz = MC.pref.get('voz', 'Kore'), modelo = await modeloTTS(chave), base = MC.ia.P.gemini.base;
    const estilo = MC.pref.get('estiloVoz', 'Fale em português do Brasil, com voz natural, calma e clara');
    let r = await fetch(base + '/models/' + modelo + ':generateContent?key=' + encodeURIComponent(chave), { method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: estilo + ': ' + texto }] }], generationConfig: { responseModalities: ['AUDIO'], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voz } } } } }) });
    let j = await r.json().catch(() => ({}));
    let dados = null;
    try { dados = j.candidates[0].content.parts.find((p) => p.inlineData || p.inline_data); dados = (dados.inlineData || dados.inline_data).data; } catch { dados = null; }
    if (!dados) { // o jeito novo do Google (Interactions)
      r = await fetch(base + '/interactions', { method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': chave },
        body: JSON.stringify({ model: modelo, input: [{ type: 'user_input', content: [{ type: 'text', text: texto, annotations: [{ type: 'speech_metadata', style: estilo }] }] }], response_format: { type: 'audio' }, generation_config: { speech_config: [{ voice: voz }] } }) });
      j = await r.json().catch(() => ({}));
      try { for (const s of j.steps || []) for (const c of s.content || []) if (c.data) { dados = c.data; break; } } catch {}
    }
    if (!dados) throw new Error((r.status === 429 ? 'LIMITE da voz ' : 'voz: ') + ((j.error && j.error.message) || r.status));
    const bytes = b64bytes(dados);
    const ehWav = bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46;
    return ehWav ? new Blob([bytes], { type: 'audio/wav' }) : wav(bytes, 24000);
  }
  function tocar(blob) {
    return new Promise((ok) => { audio = new Audio(URL.createObjectURL(blob)); audio.onended = audio.onerror = () => ok(); audio.play().catch(() => ok()); });
  }
  async function falar(texto, aoFim) {
    pararFala(); const meu = ++filaTok;
    const t = paraFala(texto); if (!t) { aoFim && aoFim(); return; }
    const ks = await chaveGemini();
    falando = true; marcar();
    try {
      if (ks.length) {
        const partes = pedacos(t, 700); let k = 0, prox = null;
        const gerar = async (p) => { for (let i = 0; i < ks.length; i++) { try { return await sintetizar(p, ks[(k + i) % ks.length].chave); } catch (e) { if (i === ks.length - 1) throw e; k++; } } };
        for (let i = 0; i < partes.length && meu === filaTok; i++) {
          const atual = prox ? await prox : await gerar(partes[i]);
          prox = i + 1 < partes.length ? gerar(partes[i + 1]) : null; // já prepara o próximo pedaço enquanto fala este
          if (meu !== filaTok) break; await tocar(atual);
        }
      } else if (MC.pref.get('vozAparelho', false) && window.speechSynthesis) {
        await new Promise((ok) => { const u = new SpeechSynthesisUtterance(t); u.lang = 'pt-BR'; u.onend = u.onerror = ok; speechSynthesis.speak(u); });
      } else MC.aviso('🔊 Para a voz natural, ponha uma chave do Gemini em ⚙️.', 'erro');
    } catch (e) { MC.aviso('🔊 Não consegui falar: ' + e.message, 'erro'); }
    if (meu === filaTok) { falando = false; marcar(); aoFim && aoFim(); }
  }
  function pararFala() { filaTok++; try { audio && audio.pause(); } catch {} try { window.speechSynthesis && speechSynthesis.cancel(); } catch {} falando = false; marcar(); }
  MC.voz = { VOZES, ouvir, parar, falar, pararFala, podeOuvir, get falando() { return falando; }, get ouvindo() { return ouvindo; }, paraFala, sintetizar };
})(window.MC);
