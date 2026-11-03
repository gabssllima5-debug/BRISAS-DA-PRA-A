/* Brisas da Praça Patriarca — interações da landing page */

/* ===== CONFIGURAÇÃO =====
   whatsapp: número com DDI + DDD, só dígitos (ex.: '5511999999999').
             Se vazio, o botão flutuante leva ao formulário de contato.
   formEndpoint: URL que recebe os leads via POST (JSON). Ex.: webhook do CRM,
             RD Station, Zapier/Make, Formspree. Se vazio e houver WhatsApp,
             o formulário abre o WhatsApp com os dados preenchidos. */
const CONFIG = {
  whatsapp: '5511995141464',
  whatsappMensagem: 'Olá! Tenho interesse no Brisas da Praça Patriarca.',
  formEndpoint: ''
};

const PLANTAS = {
  tipo: [
    { img: 'tipo-2d-42', dorms: '2 dorms', m2: 42, suite: false, finais: 'Finais 11, 12, 13 e 14' },
    { img: 'tipo-2d-45-suite-f04', dorms: '2 dorms', m2: 45, suite: true, finais: 'Final 04' },
    { img: 'tipo-2d-45-suite-f15', dorms: '2 dorms', m2: 45, suite: true, finais: 'Finais 15 e 16' },
    { img: 'tipo-2d-45-suite-f03', dorms: '2 dorms', m2: 45, suite: true, finais: 'Finais 03, 17 e 18' },
    { img: 'tipo-2d-46-suite', dorms: '2 dorms', m2: 46, suite: true, finais: 'Final 06' },
    { img: 'tipo-2d-48', dorms: '2 dorms', m2: 48, suite: false, finais: 'Final 01' },
    { img: 'tipo-2d-54-suite-f02', dorms: '2 dorms', m2: 54, suite: true, finais: 'Final 02' },
    { img: 'tipo-2d-54-suite-f09', dorms: '2 dorms', m2: 54, suite: true, finais: 'Finais 09 e 10' },
    { img: 'tipo-2d-55-suite', dorms: '2 dorms', m2: 55, suite: true, finais: 'Finais 07 e 08' },
    { img: 'tipo-3d-64-suite', dorms: '3 dorms', m2: 64, suite: true, finais: 'Finais 19 e 20' },
    { img: 'tipo-3d-73-suite', dorms: '3 dorms', m2: 73, suite: true, finais: 'Final 05' }
  ],
  garden: [
    { img: 'garden-2d-56', dorms: '2 dorms', m2: 56, suite: false, finais: 'Finais 13 e 14 · Térreo' },
    { img: 'garden-2d-58-suite', dorms: '2 dorms', m2: 58, suite: true, finais: 'Finais 17 e 18 · Térreo' },
    { img: 'garden-2d-62-suite', dorms: '2 dorms', m2: 62, suite: true, finais: 'Finais 15 e 16 · Térreo' },
    { img: 'garden-3d-83-suite', dorms: '3 dorms', m2: 83, suite: true, finais: 'Final 20 · Térreo' },
    { img: 'garden-3d-113-suite', dorms: '3 dorms', m2: 113, suite: true, finais: 'Final 19 · Térreo' }
  ],
  cobertura: [
    { img: 'cobertura-3d-103-suite', dorms: '3 dorms', m2: 103, suite: true, finais: 'Final 02 · 22º pavimento' }
  ],
  pavimento: [
    { img: '../implantacao/tipologia-terreo', titulo: 'Térreo', sub: 'Gardens · 8 unidades', finais: 'Finais 13 a 20' },
    { img: '../implantacao/tipologia-1-11', titulo: '1º ao 11º', sub: 'Pavimentos · 20 unid./andar', finais: 'Finais 01 a 20' },
    { img: '../implantacao/tipologia-12', titulo: '12º', sub: 'Pavimento · rooftop', finais: 'Finais 01 a 10' },
    { img: '../implantacao/tipologia-13-21', titulo: '13º ao 21º', sub: 'Pavimentos · 10 unid./andar', finais: 'Finais 01 a 10' },
    { img: '../implantacao/tipologia-22', titulo: '22º', sub: 'Pavimento · com cobertura', finais: '9 unidades' }
  ]
};

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const ZOOM = '<span class="zoom-ico"><svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="6"/><path d="M15 15l5 5M10 7v6M7 10h6"/></svg></span>';

/* ===== NAV ===== */
const nav = $('#nav');
const onScroll = () => nav.classList.toggle('is-solid', window.scrollY > window.innerHeight * 0.6);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const menu = $('#menu'), menuBtn = $('#menuBtn');
const setMenu = open => {
  menu.classList.toggle('is-open', open);
  menuBtn.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
};
menuBtn.addEventListener('click', () => setMenu(true));
$('#menuClose').addEventListener('click', () => setMenu(false));
$$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));

/* ===== ABAS ===== */
$$('[data-tabs]').forEach(box => {
  const tabs = $$(':scope > .tabs > .tab', box);
  const select = tab => {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', e => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      const n = tabs[(i + d + tabs.length) % tabs.length];
      n.focus(); select(n);
    });
  });
});

/* ===== PLANTAS ===== */
$$('[data-plantas]').forEach(box => {
  const lista = PLANTAS[box.dataset.plantas];
  const isPav = box.dataset.plantas === 'pavimento';
  box.innerHTML = `
    <div class="plantas__lista" role="group" aria-label="Escolha a planta"></div>
    <div class="planta-view">
      <div class="planta-view__head"><h3 class="h3"></h3><span class="planta-view__meta"></span></div>
      <figure>${ZOOM}<img alt="" loading="lazy"></figure>
      <p class="legenda">Imagem ilustrativa sujeita a alteração sem aviso prévio.</p>
    </div>`;
  const ul = $('.plantas__lista', box), h = $('.h3', box), meta = $('.planta-view__meta', box), img = $('img', box), fig = $('figure', box);
  const show = (p, btn) => {
    $$('.planta-btn', ul).forEach(b => b.setAttribute('aria-pressed', b === btn));
    if (isPav) {
      h.innerHTML = `Tipologia <em>${p.titulo}</em>`;
      meta.textContent = p.sub;
    } else {
      h.innerHTML = `${p.dorms} <em>| ${p.m2} m²</em>`;
      meta.textContent = `${p.suite ? 'Com suíte · ' : ''}${p.finais}`;
    }
    img.style.opacity = 0;
    const src = `assets/img/plantas/${p.img}.webp`;
    const pre = new Image();
    pre.onload = () => { img.src = src; img.style.opacity = 1; };
    pre.src = src;
    img.alt = isPav ? `Tipologia do pavimento ${p.titulo}` : `Planta ${p.dorms} ${p.m2} m² ${p.suite ? 'com suíte' : ''} — ${p.finais}`;
    fig.dataset.src = src;
    fig.dataset.caption = isPav ? `Tipologia · ${p.titulo}` : `${p.dorms} · ${p.m2} m²${p.suite ? ' · com suíte' : ''} · ${p.finais}`;
  };
  lista.forEach((p, i) => {
    const b = document.createElement('button');
    b.className = 'planta-btn';
    b.type = 'button';
    b.innerHTML = isPav
      ? `<strong>${p.titulo}</strong><span>pav.</span><small>${p.sub}</small>`
      : `<strong>${p.m2} m²</strong><span>${p.dorms}${p.suite ? ' · suíte' : ''}</span><small>${p.finais}</small>`;
    b.addEventListener('click', () => show(p, b));
    ul.appendChild(b);
    if (i === 0) show(p, b);
  });
  fig.addEventListener('click', () => openLightbox([{ src: fig.dataset.src, cap: fig.dataset.caption }], 0, true));
});

/* ===== LIGHTBOX ===== */
const lb = $('#lightbox'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
let lbItems = [], lbIndex = 0, lbLast = null;
function renderLb() {
  const it = lbItems[lbIndex];
  lbImg.src = it.src; lbImg.alt = it.cap; lbCap.textContent = it.cap;
  const multi = lbItems.length > 1;
  $('#lbPrev').hidden = $('#lbNext').hidden = !multi;
}
function openLightbox(items, i, whiteBg) {
  lbLast = document.activeElement;
  lbItems = items; lbIndex = i;
  lbImg.classList.toggle('dark-bg', !whiteBg);
  renderLb();
  lb.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  $('#lbClose').focus();
}
function closeLightbox() {
  lb.classList.remove('is-open');
  document.body.style.overflow = '';
  if (lbLast) lbLast.focus();
}
const step = d => { lbIndex = (lbIndex + d + lbItems.length) % lbItems.length; renderLb(); };
$('#lbClose').addEventListener('click', closeLightbox);
$('#lbPrev').addEventListener('click', () => step(-1));
$('#lbNext').addEventListener('click', () => step(1));
lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if (lb.classList.contains('is-open')) closeLightbox(); else setMenu(false); }
  if (!lb.classList.contains('is-open')) return;
  if (e.key === 'ArrowRight') step(1);
  if (e.key === 'ArrowLeft') step(-1);
});

const groups = {};
$$('[data-lightbox]').forEach(el => {
  const g = el.dataset.lightbox;
  (groups[g] = groups[g] || []).push(el);
});
Object.entries(groups).forEach(([g, els]) => {
  const items = els.map(el => ({ src: el.getAttribute('href') || $('img', el).getAttribute('src'), cap: el.dataset.caption || '' }));
  els.forEach((el, i) => {
    if (el.tagName !== 'A') { el.tabIndex = 0; el.setAttribute('role', 'button'); }
    const open = e => { e.preventDefault(); openLightbox(items, i, g === 'implant'); };
    el.addEventListener('click', open);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(e); });
  });
});

/* ===== REVEAL + PARALLAX ===== */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduce) {
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => io.observe(el));
} else {
  $$('.reveal').forEach(el => el.classList.add('is-in'));
}
const par = $$('[data-parallax]');
if (par.length && !reduce) {
  let ticking = false;
  const upd = () => {
    par.forEach(img => {
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      img.style.transform = `translateY(${Math.max(-8, Math.min(8, p * -8))}%)`;
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
  upd();
}

/* ===== WHATSAPP ===== */
const waLink = (msg = CONFIG.whatsappMensagem) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
if (CONFIG.whatsapp) {
  const w = $('#whats');
  w.href = waLink(); w.target = '_blank'; w.rel = 'noopener';
}

/* ===== FORMULÁRIOS ===== */
const maskTel = v => {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};
$$('input[type="tel"]').forEach(i => i.addEventListener('input', () => { i.value = maskTel(i.value); }));

$$('.js-lead').forEach(form => {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    let ok = true;
    $$('[required]', form).forEach(f => {
      let valid = f.value.trim() !== '';
      if (f.type === 'email') valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim());
      if (f.type === 'tel') valid = f.value.replace(/\D/g, '').length >= 10;
      f.setAttribute('aria-invalid', !valid);
      f.style.borderBottomColor = valid ? '' : '#c0392b';
      if (!valid && ok) { f.focus(); ok = false; }
    });
    if (!ok) return;

    const data = Object.fromEntries(new FormData(form));
    data.origem = form.dataset.origem;
    data.empreendimento = 'Brisas da Praça Patriarca';
    data.pagina = location.href;
    const btn = $('button[type="submit"]', form);
    btn.disabled = true;

    try {
      if (CONFIG.formEndpoint) {
        const r = await fetch(CONFIG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (!r.ok) throw new Error(r.status);
      } else if (CONFIG.whatsapp) {
        const msg = `${CONFIG.whatsappMensagem}\nNome: ${data.nome}\nE-mail: ${data.email}\nCelular: ${data.telefone}${data.preferencia ? `\nPrefiro contato por: ${data.preferencia}` : ''}`;
        window.open(waLink(msg), '_blank', 'noopener');
      } else {
        console.warn('[Brisas] Configure CONFIG.formEndpoint ou CONFIG.whatsapp em assets/js/main.js para receber os leads.', data);
      }
      form.classList.add('is-sent');
      if (window.dataLayer) window.dataLayer.push({ event: 'lead', origem: data.origem });
    } catch (err) {
      btn.disabled = false;
      alert('Não foi possível enviar agora. Tente novamente em instantes.');
    }
  });
});
