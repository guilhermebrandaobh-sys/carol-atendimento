import { supabase, signInWithGoogle, signOut, getSession } from './lib/supabase.js'
import { PUBLICOS, FECHAMENTO_STEPS, SERVICES } from './data.js'

// ── ALLOWED EMAILS (whitelist) ──────────────────────────────
// Add the Google emails that are allowed to access the system
const ALLOWED_EMAILS = [
  // 'seuemail@gmail.com',   ← add authorized emails here
]
// If ALLOWED_EMAILS is empty, any Google login is accepted.
// ────────────────────────────────────────────────────────────

const $ = id => document.getElementById(id)
const app = $('app')

// ── RENDER AUTH SCREEN ──────────────────────────────────────
function renderAuth(errorMsg = '') {
  app.innerHTML = `
  <div id="auth-screen">
    <div class="auth-card">
      <div class="auth-logo">Carol</div>
      <div class="auth-sub">Sistema de Atendimento<br>Taís Madureira Makeup</div>
      ${errorMsg ? `<div style="background:#FCEBEB;color:#A32D2D;border-radius:8px;padding:10px 12px;font-size:12.5px;margin-bottom:1rem;line-height:1.5">${errorMsg}</div>` : ''}
      <button class="btn-google" id="btn-login">
        <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#fff" d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"/><path fill="#fff" d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"/><path fill="#fff" d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"/><path fill="#fff" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"/></svg>
        Entrar com Google
      </button>
      <div class="auth-notice">
        🔒 Acesso restrito à equipe autorizada.<br>
        Seus dados de login são protegidos pelo Google OAuth e nunca armazenamos sua senha.
      </div>
    </div>
  </div>`
  $('btn-login').addEventListener('click', signInWithGoogle)
}

// ── RENDER APP SHELL ─────────────────────────────────────────
function renderApp(user) {
  const tabs = [
    { id: 'tabela', label: 'Serviços' },
    ...PUBLICOS.map(p => ({ id: p.id, label: p.label })),
    { id: 'fechamento', label: 'Fechamento' }
  ]

  const initials = user.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : user.email[0].toUpperCase()
  const avatar = user.user_metadata?.avatar_url

  app.innerHTML = `
  <div id="app-shell" class="visible">
    <header class="site-header">
      <div class="logo">Carol <span>· Taís Madureira</span></div>
      <nav class="nav-scroll">
        ${tabs.map((t, i) => `<button class="nav-btn${i === 0 ? ' active' : ''}" data-panel="${t.id}">${t.label}</button>`).join('')}
      </nav>
      <div class="user-area">
        <div class="user-avatar" title="${user.email}">
          ${avatar ? `<img src="${avatar}" alt="">` : initials}
        </div>
        <button class="btn-signout" id="btn-out">Sair</button>
      </div>
    </header>
    <main class="main" id="main-content"></main>
  </div>`

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      renderPanel(btn.dataset.panel)
    })
  })

  $('btn-out').addEventListener('click', async () => {
    await signOut()
    renderAuth()
  })

  renderPanel('tabela')
}

// ── PANEL ROUTER ────────────────────────────────────────────
function renderPanel(id) {
  const el = $('main-content')
  if (id === 'tabela') { el.innerHTML = renderTabela(); return }
  if (id === 'fechamento') { el.innerHTML = renderStepList({ steps: FECHAMENTO_STEPS, icon: '🥂', title: 'Fechamento — Padrão para todos os públicos', desc: 'Após a cliente confirmar. Substituir [campos] pelos dados reais. Remover linha de deslocamento se for no Espaço Tupi.' }); return }
  const pub = PUBLICOS.find(p => p.id === id)
  if (pub) { el.innerHTML = renderPublico(pub); return }
}

// ── TABELA DE SERVIÇOS ───────────────────────────────────────
function renderTabela() {
  const section = (label, items) => `
    <div class="svc-section-lbl">${label}</div>
    ${items.map(s => `
      <div class="svc-card${s.highlight ? ' hi' : ''}${s.full ? ' full' : ''}${s.special ? ' full' : ''}">
        <div class="svc-name">${s.name}</div>
        <div class="svc-price">${s.priceText || 'R$ ' + s.price?.toLocaleString('pt-BR')}</div>
        <div class="svc-time">${s.time}</div>
        ${s.desc ? `<div class="svc-desc">${s.desc}</div>` : ''}
      </div>`).join('')}`

  return `
    <div class="pub-header"><div class="pub-icon">💄</div><div>
      <h2>Tabela de Serviços</h2>
      <p>Valores atualizados. Deslocamento calculado por endereço — sempre solicitar antes de fechar o orçamento.</p>
    </div></div>
    <div class="svc-grid">
      ${section('Maquiagem', SERVICES.maquiagem)}
      ${section('Cabelo', SERVICES.cabelo)}
      <div class="svc-section-lbl">Outros</div>
      ${SERVICES.outros.filter(s => !s.special).map(s => `
        <div class="svc-card"><div class="svc-name">${s.name}</div><div class="svc-price">R$ ${s.price}</div><div class="svc-time">${s.time}</div></div>`).join('')}
      <div class="desl-banner">
        <div class="di">🚗</div>
        <div><div class="dt">Atendimento Externo — a partir de R$ 60</div>
        <div class="ds">Solicitar endereço completo antes de calcular e informar o valor</div></div>
      </div>
      ${section('Combos', SERVICES.combos)}
      ${section('Planos Noiva', SERVICES.planos)}
    </div>
    <div class="privacy-box">
      <h3>Proteção de Dados — LGPD</h3>
      <p>Este sistema armazena <strong>apenas o e-mail e nome</strong> da conta Google utilizada no login. Nenhum dado de cliente é salvo automaticamente.</p>
      <p>Os dados inseridos manualmente nas mensagens (nome, data, endereço, valores) trafegam exclusivamente pelo WhatsApp e são de responsabilidade da operadora do sistema.</p>
      <p>O login é processado pelo <strong>Google OAuth 2.0</strong> via Supabase. Nenhuma senha é armazenada. Os dados ficam em servidores da Supabase (região configurável). Em caso de dúvidas, entre em contato com a administradora do sistema.</p>
    </div>`
}

// ── PÚBLICO ──────────────────────────────────────────────────
function renderPublico(pub) {
  return `
    <div class="pub-header">
      <div class="pub-icon">${pub.icon}</div>
      <div><h2>${pub.label}</h2><p>${pub.desc}</p></div>
    </div>
    ${renderStepList(pub)}`
}

function renderStepList({ steps, icon, title, desc }) {
  if (title) {
    return `
      <div class="pub-header">
        <div class="pub-icon">${icon}</div>
        <div><h2>${title}</h2><p>${desc}</p></div>
      </div>
      <div class="steps">${steps.map(renderStep).join('')}</div>`
  }
  return `<div class="steps">${steps.map(renderStep).join('')}</div>`
}

function renderStep(step) {
  const badges = (step.badges || []).map(b => `<span class="badge b-${b}">${b}</span>`).join('')
  const msgs = (step.msgs || []).map(renderMsg).join('')
  return `
    <div class="step${step.special ? ' special' : ''}">
      <div class="step-hd" onclick="toggleStep(this)">
        <div class="step-num">${step.num}</div>
        <div class="step-meta">
          <div class="t">${step.title}</div>
          <div class="s">${step.sub || ''}</div>
          ${badges ? `<div class="badges">${badges}</div>` : ''}
        </div>
        <span class="chev">▾</span>
      </div>
      <div class="step-body">
        ${msgs}
      </div>
    </div>`
}

function renderMsg(msg) {
  const clean = (msg.text || '').replace(/\*/g, '')
  return `
    <div class="msg-block">
      ${msg.label ? `<div class="msg-lbl">${msg.label}</div>` : ''}
      <div class="msg-txt" id="msg-${msg.id}">${escHtml(msg.text || '')}</div>
      <button class="copy-btn" onclick="copyMsg('msg-${msg.id}', this)">⎘ Copiar</button>
      ${msg.tip ? `<div class="msg-tip">${msg.tip}</div>` : ''}
    </div>`
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
          .replace(/\*(.*?)\*/g,'<strong>$1</strong>')
}

// ── GLOBAL HELPERS (called from inline onclick) ───────────────
window.toggleStep = function(hd) {
  const body = hd.nextElementSibling
  const chev = hd.querySelector('.chev')
  const open = body.classList.contains('open')
  body.classList.toggle('open', !open)
  chev.style.transform = open ? '' : 'rotate(180deg)'
}

window.copyMsg = function(id, btn) {
  const el = document.getElementById(id)
  if (!el) return
  const text = el.innerText
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ Copiado'
    btn.classList.add('copied')
    setTimeout(() => { btn.textContent = '⎘ Copiar'; btn.classList.remove('copied') }, 2000)
  })
}

// ── BOOT ─────────────────────────────────────────────────────
async function boot() {
  renderAuth()

  const session = await getSession()
  if (session?.user) {
    const user = session.user
    if (ALLOWED_EMAILS.length && !ALLOWED_EMAILS.includes(user.email)) {
      await signOut()
      renderAuth('Este e-mail não tem permissão de acesso. Entre em contato com a administradora.')
      return
    }
    renderApp(user)
  }

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      const user = session.user
      if (ALLOWED_EMAILS.length && !ALLOWED_EMAILS.includes(user.email)) {
        await signOut()
        renderAuth('Este e-mail não tem permissão de acesso. Entre em contato com a administradora.')
        return
      }
      renderApp(user)
    }
    if (event === 'SIGNED_OUT') {
      renderAuth()
    }
  })
}

boot()
