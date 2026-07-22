'use strict';

/* ============================================================
   CONSTANTS & CONFIG
   ============================================================ */
const CONFIG = {
  version: '1.0.0',
  appName: 'LeadPilot',
  storagePrefix: 'lp_',
  defaultLang: 'en',
  debounceMs: 280,
  toastDuration: 3500,
  itemsPerPage: 8,
  aiScoreDelay: 1800,   // ms — simulates network latency
  emailGenDelay: 2000,
  // ⚡ BACKEND — swap these for real endpoints
  api: {
    base: '/api/v1',
    leads: '/api/v1/leads',
    campaigns: '/api/v1/campaigns',
    aiScore: '/api/v1/ai/score',
    aiEmail: '/api/v1/ai/email',
  },
};

/* ============================================================
   TRANSLATIONS (i18n)
   ============================================================ */
const TRANSLATIONS = {
  en: {
    dashboard: 'Dashboard',
    leads: 'Leads',
    campaigns: 'Campaigns',
    analytics: 'Analytics',
    settings: 'Settings',
    profile: 'Profile',
    billing: 'Billing',
    integrations: 'Integrations',
    'ai-search': 'AI Scoring',
    'email-gen': 'Email Generator',
    addLead: 'Add Lead',
    saveLead: 'Save Lead',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    save: 'Save Changes',
    generate: 'Generate Email',
    regenerate: '↺ Regenerate',
    copy: 'Copy',
    copied: 'Copied!',
    analyze: 'Analyze Lead',
    analyzing: 'Analyzing…',
    generating: 'Generating…',
    noResults: 'No results found.',
    confirmDelete: 'Are you sure you want to delete',
    leadSaved: 'Lead saved successfully.',
    leadDeleted: 'Lead deleted.',
    leadUpdated: 'Lead updated.',
    campaignCreated: 'Campaign created!',
    campaignDeleted: 'Campaign deleted.',
    campaignPaused: 'Campaign paused.',
    campaignResumed: 'Campaign resumed.',
    campaignLaunched: 'Campaign launched! 🚀',
    settingsSaved: 'Settings saved.',
    profileSaved: 'Profile updated.',
    passwordChanged: 'Password changed.',
    emailCopied: 'Email copied to clipboard!',
    apiKeyCopied: 'API key copied!',
    connected: 'Connected',
    disconnected: 'Disconnected',
    testEmailSent: 'Test email sent!',
    inviteSent: 'Invitation sent!',
    exportStarted: 'Export started…',
    importSuccess: (n) => `${n} leads imported successfully.`,
    scoreLabel: (n) => n >= 80 ? 'Excellent' : n >= 60 ? 'Good' : n >= 40 ? 'Average' : 'Low',
    scoreGrade: (n) => n >= 80 ? 'A' : n >= 60 ? 'B' : n >= 40 ? 'C' : 'D',
    greeting: (name) => {
      const h = new Date().getHours();
      return h < 12 ? `Good morning, ${name} 👋` : h < 17 ? `Good afternoon, ${name} 👋` : `Good evening, ${name} 👋`;
    },
  },
  cs: {
    dashboard: 'Přehled',
    leads: 'Leady',
    campaigns: 'Kampaně',
    analytics: 'Analytika',
    settings: 'Nastavení',
    profile: 'Profil',
    billing: 'Fakturace',
    integrations: 'Integrace',
    'ai-search': 'AI Hodnocení',
    'email-gen': 'AI Generátor E-mailů',
    addLead: 'Přidat Lead',
    saveLead: 'Uložit Lead',
    cancel: 'Zrušit',
    delete: 'Smazat',
    edit: 'Upravit',
    save: 'Uložit změny',
    generate: 'Generovat E-mail',
    regenerate: '↺ Znovu generovat',
    copy: 'Kopírovat',
    copied: 'Zkopírováno!',
    analyze: 'Analyzovat Lead',
    analyzing: 'Analyzuji…',
    generating: 'Generuji…',
    noResults: 'Žádné výsledky.',
    confirmDelete: 'Opravdu chcete smazat',
    leadSaved: 'Lead byl uložen.',
    leadDeleted: 'Lead byl smazán.',
    leadUpdated: 'Lead byl upraven.',
    campaignCreated: 'Kampaň vytvořena!',
    campaignDeleted: 'Kampaň smazána.',
    campaignPaused: 'Kampaň pozastavena.',
    campaignResumed: 'Kampaň obnovena.',
    campaignLaunched: 'Kampaň spuštěna! 🚀',
    settingsSaved: 'Nastavení uložena.',
    profileSaved: 'Profil aktualizován.',
    passwordChanged: 'Heslo změněno.',
    emailCopied: 'E-mail zkopírován!',
    apiKeyCopied: 'API klíč zkopírován!',
    connected: 'Připojeno',
    disconnected: 'Odpojeno',
    testEmailSent: 'Testovací e-mail odeslán!',
    inviteSent: 'Pozvánka odeslána!',
    exportStarted: 'Export zahájen…',
    importSuccess: (n) => `${n} leadů úspěšně importováno.`,
    scoreLabel: (n) => n >= 80 ? 'Výborný' : n >= 60 ? 'Dobrý' : n >= 40 ? 'Průměrný' : 'Nízký',
    scoreGrade: (n) => n >= 80 ? 'A' : n >= 60 ? 'B' : n >= 40 ? 'C' : 'D',
    greeting: (name) => {
      const h = new Date().getHours();
      return h < 12 ? `Dobré ráno, ${name} 👋` : h < 17 ? `Dobré odpoledne, ${name} 👋` : `Dobrý večer, ${name} 👋`;
    },
  },
  ru: {
    dashboard: 'Обзор',
    leads: 'Лиды',
    campaigns: 'Кампании',
    analytics: 'Аналитика',
    settings: 'Настройки',
    profile: 'Профиль',
    billing: 'Оплата',
    integrations: 'Интеграции',
    'ai-search': 'ИИ Оценка',
    'email-gen': 'ИИ Генератор писем',
    addLead: 'Добавить лид',
    saveLead: 'Сохранить лид',
    cancel: 'Отмена',
    delete: 'Удалить',
    edit: 'Редактировать',
    save: 'Сохранить',
    generate: 'Генерировать письмо',
    regenerate: '↺ Снова',
    copy: 'Копировать',
    copied: 'Скопировано!',
    analyze: 'Анализировать лид',
    analyzing: 'Анализирую…',
    generating: 'Генерирую…',
    noResults: 'Результатов не найдено.',
    confirmDelete: 'Вы уверены, что хотите удалить',
    leadSaved: 'Лид сохранён.',
    leadDeleted: 'Лид удалён.',
    leadUpdated: 'Лид обновлён.',
    campaignCreated: 'Кампания создана!',
    campaignDeleted: 'Кампания удалена.',
    campaignPaused: 'Кампания приостановлена.',
    campaignResumed: 'Кампания возобновлена.',
    campaignLaunched: 'Кампания запущена! 🚀',
    settingsSaved: 'Настройки сохранены.',
    profileSaved: 'Профиль обновлён.',
    passwordChanged: 'Пароль изменён.',
    emailCopied: 'Email скопирован!',
    apiKeyCopied: 'API ключ скопирован!',
    connected: 'Подключено',
    disconnected: 'Отключено',
    testEmailSent: 'Тестовое письмо отправлено!',
    inviteSent: 'Приглашение отправлено!',
    exportStarted: 'Экспорт начат…',
    importSuccess: (n) => `${n} лидов успешно импортировано.`,
    scoreLabel: (n) => n >= 80 ? 'Отлично' : n >= 60 ? 'Хорошо' : n >= 40 ? 'Средне' : 'Низко',
    scoreGrade: (n) => n >= 80 ? 'A' : n >= 60 ? 'B' : n >= 40 ? 'C' : 'D',
    greeting: (name) => {
      const h = new Date().getHours();
      return h < 12 ? `Доброе утро, ${name} 👋` : h < 17 ? `Добрый день, ${name} 👋` : `Добрый вечер, ${name} 👋`;
    },
  },
};

/* ============================================================
   MOCK DATA
   Structured to match a future Supabase/PostgreSQL schema.
   Each object mirrors a DB table row.
   ============================================================ */
const SEED_LEADS = [
  { id: 1, company: 'TechScale GmbH',  contact: 'Klaus Weber',   email: 'hello@techscale.de',      phone: '+49 30 1234567',   industry: 'SaaS',        country: 'Germany',        city: 'Berlin',    employees: '45',   website: 'techscale.de',    score: 92, status: 'new',       notes: '',  dateAdded: '2025-01-10' },
  { id: 2, company: 'LogiFlow s.r.o.', contact: 'Marek Novák',   email: 'info@logiflow.cz',        phone: '+420 222 333 444', industry: 'Logistics',   country: 'Czech Republic', city: 'Prague',    employees: '120',  website: 'logiflow.cz',     score: 78, status: 'contacted', notes: '',  dateAdded: '2025-01-05' },
  { id: 3, company: 'FinVault AG',     contact: 'Sarah Müller',  email: 'contact@finvault.ch',     phone: '+41 44 987 6543',  industry: 'Fintech',     country: 'Switzerland',    city: 'Zürich',    employees: '230',  website: 'finvault.ch',     score: 85, status: 'interested',notes: '',  dateAdded: '2024-12-20' },
  { id: 4, company: 'CloudBurst Inc',  contact: 'Mike Davis',    email: 'sales@cloudburst.io',     phone: '+1 512 555 0198',  industry: 'Cloud',       country: 'USA',            city: 'Austin',    employees: '89',   website: 'cloudburst.io',   score: 90, status: 'converted', notes: '',  dateAdded: '2024-12-01' },
  { id: 5, company: 'DataSynth Ltd',   contact: 'Emma Wilson',   email: 'hello@datasynth.co.uk',   phone: '+44 20 7946 0000', industry: 'Analytics',   country: 'UK',             city: 'London',    employees: '180',  website: 'datasynth.co.uk', score: 88, status: 'contacted', notes: '',  dateAdded: '2025-01-08' },
  { id: 6, company: 'MarketEdge',      contact: 'Anna Kowalski', email: 'hi@marketedge.pl',        phone: '+48 22 345 6789',  industry: 'Marketing',   country: 'Poland',         city: 'Warsaw',    employees: '32',   website: 'marketedge.pl',   score: 61, status: 'new',       notes: '',  dateAdded: '2025-01-14' },
  { id: 7, company: 'EcoShip BV',      contact: 'Jan de Vries',  email: 'info@ecoship.nl',         phone: '+31 20 456 7890',  industry: 'Logistics',   country: 'Netherlands',    city: 'Amsterdam', employees: '55',   website: 'ecoship.nl',      score: 55, status: 'rejected',  notes: '',  dateAdded: '2024-11-30' },
  { id: 8, company: 'GrowthBox SRL',   contact: 'Ion Popescu',   email: 'contact@growthbox.ro',    phone: '+40 21 123 4567',  industry: 'Consulting',  country: 'Romania',        city: 'Bucharest', employees: '24',   website: 'growthbox.ro',    score: 70, status: 'new',       notes: '',  dateAdded: '2025-01-12' },
  { id: 9, company: 'AutoTech Brno',   contact: 'Pavel Horák',   email: 'info@autotech.cz',        phone: '+420 541 234 567', industry: 'Manufacturing',country: 'Czech Republic', city: 'Brno',      employees: '320',  website: 'autotech.cz',     score: 67, status: 'new',       notes: '',  dateAdded: '2025-01-16' },
  { id:10, company: 'Rosemann & Co',   contact: 'Peter Rosemann',email: 'p.rosemann@rosemann.de',  phone: '+49 89 543 2100',  industry: 'Consulting',  country: 'Germany',        city: 'Munich',    employees: '90',   website: 'rosemann.de',     score: 81, status: 'contacted', notes: '',  dateAdded: '2025-01-17' },
];

const SEED_CAMPAIGNS = [
  { id: 1, name: 'Germany SaaS Q1',       status: 'active',    leads: 145, sent: 89,  opened: 67,  replied: 31, meetings: 8,  created: '2025-01-10' },
  { id: 2, name: 'Prague Logistics',      status: 'paused',    leads: 52,  sent: 52,  opened: 34,  replied: 12, meetings: 3,  created: '2025-01-05' },
  { id: 3, name: 'UK Fintech',            status: 'draft',     leads: 78,  sent: 0,   opened: 0,   replied: 0,  meetings: 0,  created: '2025-01-15' },
  { id: 4, name: 'EU E-commerce Outreach',status: 'completed', leads: 200, sent: 200, opened: 162, replied: 58, meetings: 19, created: '2024-12-01' },
];

const SEED_SETTINGS = {
  language: 'en',
  notifications: { replies: true, campaigns: true, leads: false, digest: true, credits: true },
  workspace: { name: 'Acme Inc.', url: '' },
  smtp: { host: '', port: 587, user: '', pass: '', from: 'Alex Johnson' },
  dateFormat: 'DD/MM/YYYY',
  timezone: 'Europe/Prague',
};

const SEED_USER = {
  id: 'usr_1',
  firstName: 'Alex',
  lastName: 'Johnson',
  email: 'alex@company.com',
  jobTitle: 'VP Sales',
  company: 'Acme Inc.',
  phone: '',
  plan: 'pro',
  credits: 820,
  maxCredits: 1000,
  avatarInitials: 'AJ',
};

/* ============================================================
   STORE — localStorage wrapper
   ⚡ BACKEND: replace get/set with Supabase calls or fetch()
   ============================================================ */
const Store = (() => {
  const key = (name) => `${CONFIG.storagePrefix}${name}`;

  function get(name, fallback = null) {
    try {
      const raw = localStorage.getItem(key(name));
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  }

  function set(name, value) {
    try {
      localStorage.setItem(key(name), JSON.stringify(value));
      return true;
    } catch { return false; }
  }

  function remove(name) {
    localStorage.removeItem(key(name));
  }

  function clear() {
    Object.keys(localStorage)
      .filter(k => k.startsWith(CONFIG.storagePrefix))
      .forEach(k => localStorage.removeItem(k));
  }

  // Initialise seed data if first load
  function seed() {
    if (!get('initialised')) {
      set('leads', SEED_LEADS);
      set('campaigns', SEED_CAMPAIGNS);
      set('settings', SEED_SETTINGS);
      set('user', SEED_USER);
      set('ai_history', []);
      set('email_history', []);
      set('integrations', {
        hubspot: true, salesforce: false, apollo: true,
        linkedin: false, gsheets: true, openai: true,
        zapier: false, slack: true,
      });
      set('initialised', true);
    }
  }

  return { get, set, remove, clear, seed };
})();

/* ============================================================
   I18n — translation engine
   ============================================================ */
const I18n = (() => {
  let lang = Store.get('settings')?.language || CONFIG.defaultLang;

  function t(key, ...args) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    const val = dict[key] ?? TRANSLATIONS.en[key] ?? key;
    return typeof val === 'function' ? val(...args) : val;
  }

  function setLang(newLang) {
    if (!TRANSLATIONS[newLang]) return;
    lang = newLang;
    const s = Store.get('settings') || SEED_SETTINGS;
    s.language = newLang;
    Store.set('settings', s);
    applyPageTranslations();
    Toast.show(t('settingsSaved'), 'success');
  }

  function getLang() { return lang; }

  function applyPageTranslations() {
    // Update nav item labels
    document.querySelectorAll('[data-nav]').forEach(el => {
      const page = el.dataset.nav;
      const label = t(page);
      if (label && label !== page) {
        // only update text node, keep badge HTML intact
        const firstText = [...el.childNodes].find(n => n.nodeType === 3);
        if (firstText) firstText.textContent = label + ' ';
      }
    });
    // Update greeting
    const greetingEl = document.querySelector('.lp-page-title[id="page-dashboard-title"]');
    if (greetingEl) {
      const user = Store.get('user') || SEED_USER;
      greetingEl.textContent = t('greeting', user.firstName);
    }
    // Update generate button
    const genBtn = document.getElementById('btn-generate-email');
    if (genBtn && !genBtn.classList.contains('btn-loading')) {
      genBtn.textContent = t('generate');
    }
  }

  return { t, setLang, getLang, applyPageTranslations };
})();

/* ============================================================
   UI HELPERS
   ============================================================ */
const UI = {
  $: (sel, ctx = document) => ctx.querySelector(sel),
  $$: (sel, ctx = document) => [...ctx.querySelectorAll(sel)],

  show(el) { if (el) el.hidden = false; },
  hide(el) { if (el) el.hidden = true; },
  toggle(el, force) { if (el) el.hidden = force !== undefined ? !force : !el.hidden; },

  setText(sel, text) {
    const el = typeof sel === 'string' ? document.querySelector(sel) : sel;
    if (el) el.textContent = text;
  },

  setHTML(sel, html) {
    const el = typeof sel === 'string' ? document.querySelector(sel) : sel;
    if (el) el.innerHTML = html;
  },

  addClass(el, cls) { el?.classList.add(cls); },
  removeClass(el, cls) { el?.classList.remove(cls); },
  toggleClass(el, cls, force) { el?.classList.toggle(cls, force); },

  // Announce to screen readers
  announce(msg, politeness = 'polite') {
    const r = document.createElement('div');
    r.setAttribute('aria-live', politeness);
    r.setAttribute('aria-atomic', 'true');
    r.className = 'sr-only';
    r.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden';
    r.textContent = msg;
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 3000);
  },

  // Debounce helper
  debounce(fn, ms = CONFIG.debounceMs) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  },

  // Format a date string
  formatDate(dateStr) {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch { return dateStr; }
  },

  // Escape HTML
  escape(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  },

  // Copy text to clipboard
  async copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px';
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    }
  },

  // Score → colour
  scoreColor(n) {
    return n >= 80 ? 'var(--green)' : n >= 60 ? 'var(--blue)' : n >= 40 ? 'var(--yellow)' : 'var(--red)';
  },

  // Score → badge class
  scoreBadgeClass(n) {
    return n >= 80 ? 'score-A' : n >= 60 ? 'score-B' : n >= 40 ? 'score-C' : 'score-D';
  },

  // Status → badge class
  statusBadgeClass(status) {
    const map = {
      new: 'status-new', contacted: 'status-contacted',
      interested: 'status-interested', converted: 'status-converted',
      rejected: 'status-rejected',
    };
    return map[status] || 'status-new';
  },

  // Capitalise first letter
  cap(str) { return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''; },

  // Generate unique ID
  uid() { return `id_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`; },

  // Next integer ID for array
  nextId(arr) { return arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1; },
};

/* ============================================================
   TOAST NOTIFICATION SYSTEM
   ============================================================ */
const Toast = (() => {
  const container = () => document.getElementById('lp-toast-root');

  function show(message, type = 'info', duration = CONFIG.toastDuration) {
    const icons = { success: '✓', error: '✕', warn: '⚠', info: 'ℹ' };
    const toast = document.createElement('div');
    toast.className = `lp-toast lp-toast-${type}`;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `
      <span class="lp-toast-icon" aria-hidden="true">${icons[type] || icons.info}</span>
      <span>${UI.escape(message)}</span>
      <button type="button" class="lp-toast-close" aria-label="Dismiss notification">✕</button>`;

    toast.querySelector('.lp-toast-close').addEventListener('click', () => dismiss(toast));
    container().appendChild(toast);

    const timer = setTimeout(() => dismiss(toast), duration);
    toast.dataset.timer = timer;

    UI.announce(message);
    return toast;
  }

  function dismiss(toast) {
    clearTimeout(toast.dataset.timer);
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }

  return { show };
})();

/* ============================================================
   MODAL SYSTEM
   ============================================================ */
const Modal = (() => {
  const root = () => document.getElementById('lp-modal-root');
  let _onConfirm = null;

  function open(html, opts = {}) {
    const large = opts.large ? 'lp-modal-lg' : '';
    root().innerHTML = `
      <div class="lp-modal-bg" id="active-modal-bg" role="dialog" aria-modal="true">
        <div class="lp-modal ${large}">${html}</div>
      </div>`;
    root().hidden = false;
    root().querySelector('.lp-modal-bg').addEventListener('mousedown', (e) => {
      if (e.target.id === 'active-modal-bg') close();
    });
    // Focus first focusable element
    setTimeout(() => {
      const first = root().querySelector('input, select, textarea, button:not([disabled])');
      if (first) first.focus();
    }, 50);
  }

  function openFromTemplate(templateId, opts = {}) {
    const tpl = document.getElementById(templateId);
    if (!tpl) return;
    const html = tpl.content.cloneNode(true);
    const div = document.createElement('div');
    div.appendChild(html);
    const modal = div.querySelector('.lp-modal');
    const inner = modal ? modal.innerHTML : '';
    open(inner, opts);
    // Wire close buttons inside
    root().querySelectorAll('[id$="-close"],[id$="-cancel"]').forEach(btn => {
      btn.addEventListener('click', close);
    });
  }

  function close() {
    root().innerHTML = '';
    root().hidden = true;
    _onConfirm = null;
  }

  function confirm(message, title = 'Confirm', onConfirm = null) {
    _onConfirm = onConfirm;
    open(`
      <div class="lp-modal-header">
        <h2 class="lp-modal-title">${UI.escape(title)}</h2>
        <button type="button" class="btn btn-ghost btn-sm btn-icon" id="conf-close" aria-label="Close">✕</button>
      </div>
      <div class="lp-modal-body">
        <p style="font-size:13px;color:var(--gray-600)">${UI.escape(message)}</p>
      </div>
      <div class="lp-modal-footer">
        <button type="button" class="btn btn-secondary" id="conf-cancel">Cancel</button>
        <button type="button" class="btn btn-danger" id="conf-ok">Delete</button>
      </div>`);
    UI.$('#conf-close')?.addEventListener('click', close);
    UI.$('#conf-cancel')?.addEventListener('click', close);
    UI.$('#conf-ok')?.addEventListener('click', () => { close(); _onConfirm?.(); });
  }

  return { open, openFromTemplate, close, confirm };
})();

/* ============================================================
   DROPDOWN SYSTEM
   ============================================================ */
const Dropdown = (() => {
  function open(menuId) {
    closeAll();
    const menu = document.getElementById(menuId);
    if (menu) {
      menu.classList.add('open');
      const btn = document.querySelector(`[data-dropdown="${menuId}"]`);
      btn?.setAttribute('aria-expanded', 'true');
    }
  }

  function close(menuId) {
    const menu = document.getElementById(menuId);
    if (menu) {
      menu.classList.remove('open');
      const btn = document.querySelector(`[data-dropdown="${menuId}"]`);
      btn?.setAttribute('aria-expanded', 'false');
    }
  }

  function closeAll() {
    document.querySelectorAll('.lp-dropdown-menu.open').forEach(m => {
      m.classList.remove('open');
      const btn = document.querySelector(`[data-dropdown="${m.id}"]`);
      btn?.setAttribute('aria-expanded', 'false');
    });
    // Sidebar user menu
    const sidebarMenu = document.getElementById('sidebar-user-menu');
    sidebarMenu?.classList.remove('open');
    // Language & notification menus
    ['lang-menu','notif-menu','topbar-user-menu'].forEach(id => {
      document.getElementById(id)?.classList.remove('open');
    });
  }

  function toggle(menuId) {
    const menu = document.getElementById(menuId);
    if (!menu) return;
    menu.classList.contains('open') ? close(menuId) : open(menuId);
  }

  return { open, close, closeAll, toggle };
})();

/* ============================================================
   ROUTER — SPA page switching
   ============================================================ */
const Router = (() => {
  let current = 'dashboard';

  function go(page) {
    if (!page) return;
    // Hide all pages
    document.querySelectorAll('.lp-page').forEach(p => p.classList.remove('active'));
    // Show target
    const target = document.getElementById(`page-${page}`);
    if (target) {
      target.classList.add('active');
      current = page;
    }
    // Update nav items
    document.querySelectorAll('.lp-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.nav === page);
      item.setAttribute('aria-current', item.dataset.nav === page ? 'page' : 'false');
    });
    // Update page title
    document.title = `${UI.cap(I18n.t(page))} — ${CONFIG.appName}`;
    // Update hash (lightweight URL tracking, no need for pushState)
    history.replaceState(null, '', `#${page}`);
    // Close any open dropdowns
    Dropdown.closeAll();
    // Scroll to top
    document.getElementById('lp-content')?.scrollTo(0, 0);
    // Run page-specific init
    PageControllers[page]?.onEnter?.();
  }

  function getCurrent() { return current; }

  function initFromHash() {
    const hash = location.hash.replace('#', '');
    const valid = ['dashboard','leads','ai-search','email-gen','campaigns','analytics','integrations','billing','settings','profile'];
    go(valid.includes(hash) ? hash : 'dashboard');
  }

  return { go, getCurrent, initFromHash };
})();

/* ============================================================
   AUTH — session simulation
   ⚡ BACKEND: swap with Supabase Auth or NextAuth
   ============================================================ */
const Auth = (() => {
  function getUser() {
    return Store.get('user') || SEED_USER;
  }

  function updateUser(data) {
    const user = { ...getUser(), ...data };
    Store.set('user', user);
    refreshUserUI(user);
    return user;
  }

  function refreshUserUI(user) {
    // Sidebar
    UI.setText('#sidebar-user-name', `${user.firstName} ${user.lastName}`);
    UI.setText('#sidebar-user-email', user.email);
    UI.$$('#sidebar-avatar, #topbar-avatar-btn, #profile-avatar').forEach(el => {
      if (el) el.textContent = `${user.firstName[0]}${user.lastName[0]}`;
    });
    UI.setText('#topbar-plan-badge', `⚡ ${UI.cap(user.plan)}`);
    // Dashboard greeting
    const greeting = document.getElementById('page-dashboard-title');
    if (greeting) greeting.textContent = I18n.t('greeting', user.firstName);
    // Dashboard subtitle date
    const dateEl = document.getElementById('dashboard-date');
    if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
    // Credits
    UI.setText('#kpi-credits-value', user.credits.toLocaleString());
    const fill = document.getElementById('credits-fill');
    const pct = Math.round((user.credits / user.maxCredits) * 100);
    if (fill) {
      fill.style.width = `${pct}%`;
      fill.style.background = pct > 30 ? 'var(--green)' : pct > 15 ? 'var(--yellow)' : 'var(--red)';
    }
    // Profile form
    const f = { 'profile-first-name': user.firstName, 'profile-last-name': user.lastName, 'profile-email': user.email, 'profile-job-title': user.jobTitle || '', 'profile-company': user.company || '', 'profile-phone': user.phone || '' };
    Object.entries(f).forEach(([id, val]) => { const el = document.getElementById(id); if (el) el.value = val; });
  }

  function logout() {
    // ⚡ BACKEND: call supabase.auth.signOut()
    Store.clear();
    window.location.href = 'index.html';
  }

  return { getUser, updateUser, refreshUserUI, logout };
})();

/* ============================================================
   AI ENGINE — mock responses
   ⚡ BACKEND: replace each function body with fetch() to
              your OpenAI proxy endpoint at /api/v1/ai/*
   ============================================================ */
const AI = (() => {

  // Simulate AI scoring
  async function scoreLeadAI(data) {
    await delay(CONFIG.aiScoreDelay);
    // Deterministic-ish score based on input string hash
    const base = simHash(data.company + data.industry);
    const score = 45 + (base % 50);
    const reply = 15 + (base % 55);
    const interest = 30 + (base % 60);
    const budget = 20 + (base % 70);
    const timing = 25 + (base % 65);

    const actions = [
      'Send a personalised cold email referencing their recent LinkedIn activity.',
      'Connect on LinkedIn first, then follow up with an email 2 days later.',
      'Call directly — decision-maker is likely reachable before 10 AM.',
      'Offer a short case study from a similar company in your first email.',
      'Invite to a free webinar relevant to their industry pain point.',
    ];

    return {
      score: Math.min(score, 99),
      replyPct: Math.min(reply, 85),
      interestPct: Math.min(interest, 90),
      budgetPct: Math.min(budget, 95),
      timingPct: Math.min(timing, 80),
      nextAction: actions[base % actions.length],
      company: data.company,
      generatedAt: new Date().toISOString(),
    };
  }

  // Simulate email generation
  async function generateEmailAI(data) {
    await delay(CONFIG.emailGenDelay);

    const tones = {
      professional: { open: 'I hope this message finds you well.', close: 'I look forward to hearing from you.' },
      friendly:     { open: 'Hope your week is going great!', close: 'Would love to chat soon.' },
      direct:       { open: 'I\'ll get straight to the point.', close: 'Does a quick call work this week?' },
      casual:       { open: 'Hey!', close: 'Let me know what you think 😊' },
      formal:       { open: 'I am writing to you regarding a business opportunity.', close: 'I await your reply at your earliest convenience.' },
    };

    const tone = tones[data.tone] || tones.professional;
    const goals = {
      'book-call': 'book a 15-minute discovery call',
      demo: 'schedule a quick product demo',
      partnership: 'explore a potential partnership',
      feedback: 'get your honest feedback',
      referral: 'see if you know anyone who might benefit',
    };
    const goalText = goals[data.goal] || 'connect with you';
    const contact = data.contactName ? ` ${data.contactName.split(' ')[0]}` : '';

    const subjects = [
      `Quick question about ${data.company}'s ${data.painPoint.split(' ').slice(0,3).join(' ')}`,
      `Idea for ${data.company} — worth 5 minutes?`,
      `${data.company} + ${CONFIG.appName} — a natural fit?`,
      `How similar ${data.industry} companies solved ${data.painPoint.split(' ').slice(0,2).join(' ')}`,
    ];
    const hash = simHash(data.company + data.painPoint);

    const cold = {
      subject: subjects[hash % subjects.length],
      body: `Hi${contact},\n\n${tone.open}\n\nI noticed ${data.company} is focused on ${data.industry.toLowerCase()} — a space where ${data.painPoint.toLowerCase()} is often a real challenge.\n\nWe help ${data.industry} companies like yours solve exactly this using AI-powered outreach. One of our recent clients saw a 3× increase in qualified meetings within 60 days.\n\nI'd love to ${goalText} with you. Would that be possible this week?\n\n${tone.close}\n\nAlex Johnson\n${CONFIG.appName}`,
    };

    const fu1 = {
      subject: `Re: ${subjects[hash % subjects.length]}`,
      body: `Hi${contact},\n\nJust wanted to follow up on my previous message. I know you're busy, so I'll keep this short.\n\nDid you have a chance to read my last email? I genuinely think there's a fit here for ${data.company}.\n\n${tone.close}\n\nAlex`,
    };

    const fu2 = {
      subject: `Last try — ${data.company} + ${CONFIG.appName}`,
      body: `Hi${contact},\n\nI'll keep this as my final follow-up — I promise!\n\nIf the timing isn't right, that's completely fine. But if ${data.painPoint.toLowerCase()} ever becomes a priority, I'd love to be your first call.\n\nEither way, feel free to reach out anytime.\n\nBest,\nAlex`,
    };

    const linkedin = {
      subject: 'LinkedIn Message',
      body: `Hi${contact}, I came across ${data.company} and was really impressed by what you're doing in ${data.industry}. I help companies solve ${data.painPoint.split(' ').slice(0,3).join(' ')} — would love to connect and share an idea. 🚀`,
    };

    return { cold, fu1, fu2, linkedin, generatedAt: new Date().toISOString() };
  }

  // Simple deterministic hash for mock variation
  function simHash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
    return Math.abs(h);
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return { scoreLeadAI, generateEmailAI };
})();

/* ============================================================
   CHARTS — SVG bar chart renderer
   ⚡ BACKEND: swap chart-placeholder divs with
              Chart.js / Recharts canvas elements
   ============================================================ */
const Charts = (() => {

  function renderBar(containerId, data, opts = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const { labels = [], values = [], color = 'var(--blue)', height = 120 } = opts;
    const max = Math.max(...values, 1);
    const barW = Math.floor(100 / values.length);

    const bars = values.map((v, i) => {
      const h = Math.round((v / max) * (height - 24));
      const isLast = i === values.length - 1;
      return `
        <div style="display:flex;flex-direction:column;align-items:center;flex:1;gap:4px">
          <div style="font-size:9px;color:var(--gray-500);font-weight:500">${v}</div>
          <div style="width:100%;height:${h}px;background:${isLast ? color : color + '55'};border-radius:4px 4px 0 0;transition:height 0.6s ease"></div>
          <div style="font-size:9px;color:var(--gray-400)">${labels[i] || ''}</div>
        </div>`;
    }).join('');

    container.style.cssText = `height:${height}px;display:flex;align-items:flex-end;gap:6px;padding:4px 0`;
    container.innerHTML = bars;
    container.removeAttribute('aria-hidden');
  }

  function renderSparklines() {
    // Render all sparkline containers in KPI cards
    document.querySelectorAll('.lp-sparkline[data-sparkline]').forEach(el => {
      const values = el.dataset.sparkline.split(',').map(Number);
      const max = Math.max(...values, 1);
      const color = el.closest('.lp-kpi')?.querySelector('.lp-kpi-icon')?.style.color || 'var(--blue)';
      el.innerHTML = values.map((v, i) => {
        const h = Math.round((v / max) * 100);
        const isLast = i === values.length - 1;
        return `<div class="lp-spark-bar" style="height:${h}%;background:${color};${isLast ? 'opacity:1' : ''}"></div>`;
      }).join('');
    });
  }

  function initDashboardCharts() {
    // Lead Growth bar chart
    renderBar('chart-lead-growth-canvas', {}, {
      labels: ['Aug','Sep','Oct','Nov','Dec','Jan'],
      values: [120, 185, 210, 290, 340, 420],
      color: 'var(--blue)', height: 140,
    });
    // Revenue bar chart
    renderBar('chart-revenue-canvas', {}, {
      labels: ['Aug','Sep','Oct','Nov','Dec','Jan'],
      values: [8200, 11400, 14700, 18900, 21300, 24800],
      color: 'var(--green)', height: 140,
    });
    // Email performance grouped
    renderBar('chart-email-canvas', {}, {
      labels: ['W1','W2','W3','W4'],
      values: [28, 31, 33, 34],
      color: 'var(--blue)', height: 140,
    });
    renderSparklines();
  }

  function initAnalyticsCharts() {
    renderBar('analytics-chart-leads', {}, {
      labels: ['Aug','Sep','Oct','Nov','Dec','Jan'],
      values: [120, 185, 210, 290, 340, 420],
      color: 'var(--blue)', height: 200,
    });
    renderBar('analytics-chart-email-trend', {}, {
      labels: ['Aug','Sep','Oct','Nov','Dec','Jan'],
      values: [28, 31, 29, 34, 33, 34],
      color: 'var(--cyan)', height: 160,
    });
    renderBar('analytics-chart-campaigns', {}, {
      labels: ['DE SaaS','PH Log','UK Fin','EU Eco'],
      values: [35, 23, 0, 29],
      color: 'var(--purple)', height: 160,
    });
    renderSparklines();
  }

  return { renderBar, initDashboardCharts, initAnalyticsCharts };
})();

/* ============================================================
   LEADS PAGE CONTROLLER
   ============================================================ */
const LeadsPage = (() => {
  let leads = [];
  let filtered = [];
  let currentPage = 1;
  let sortCol = 'dateAdded';
  let sortDir = 'desc';
  let selectedIds = new Set();

  // Filters state
  let filters = { search: '', industry: '', country: '', status: '', score: '', size: '' };

  function load() {
    leads = Store.get('leads') || SEED_LEADS;
    filtered = [...leads];
    applyFilters();
  }

  function applyFilters() {
    const { search, industry, country, status, score, size } = filters;
    filtered = leads.filter(l => {
      if (search && !l.company.toLowerCase().includes(search) && !l.contact.toLowerCase().includes(search) && !l.email.toLowerCase().includes(search)) return false;
      if (industry && l.industry !== industry) return false;
      if (country && l.country !== country) return false;
      if (status && l.status !== status) return false;
      if (score) {
        const g = I18n.t('scoreGrade', l.score);
        if (g !== score) return false;
      }
      if (size) {
        const emp = parseInt(l.employees);
        const ranges = { '1-10': [1,10], '11-50': [11,50], '51-200': [51,200], '201-1000': [201,1000], '1000+': [1000, Infinity] };
        const r = ranges[size];
        if (r && (emp < r[0] || emp > r[1])) return false;
      }
      return true;
    });
    sortFiltered();
    currentPage = 1;
    renderTable();
    updateCounts();
  }

  function sortFiltered() {
    filtered.sort((a, b) => {
      let av = a[sortCol] ?? '';
      let bv = b[sortCol] ?? '';
      if (sortCol === 'score') { av = Number(av); bv = Number(bv); }
      else { av = String(av).toLowerCase(); bv = String(bv).toLowerCase(); }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }

  function renderTable() {
    const tbody = document.getElementById('leads-tbody');
    if (!tbody) return;

    const start = (currentPage - 1) * CONFIG.itemsPerPage;
    const page = filtered.slice(start, start + CONFIG.itemsPerPage);

    if (page.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9"><div class="lp-empty"><div class="lp-empty-icon">🔍</div><div class="lp-empty-title">${I18n.t('noResults')}</div><div class="lp-empty-desc">Try adjusting your filters.</div></div></td></tr>`;
      return;
    }

    tbody.innerHTML = page.map(l => {
      const gradeClass = UI.scoreBadgeClass(l.score);
      const statusClass = UI.statusBadgeClass(l.status);
      const checked = selectedIds.has(l.id) ? 'checked' : '';
      const initials = (l.company[0] || '?').toUpperCase();
      const avatarBg = UI.scoreColor(l.score);
      return `
      <tr data-lead-id="${l.id}" data-company="${UI.escape(l.company)}" data-status="${l.status}">
        <td class="col-check" style="padding-left:16px">
          <input type="checkbox" class="lp-checkbox lead-row-check" data-lead-id="${l.id}" aria-label="Select ${UI.escape(l.company)}" ${checked} />
        </td>
        <td>
          <div class="lp-flex-center lp-gap-2">
            <div class="lp-avatar" style="width:28px;height:28px;font-size:10px;background:${avatarBg}" aria-hidden="true">${initials}</div>
            <div>
              <div style="font-weight:600;font-size:13px;color:var(--gray-900)">${UI.escape(l.company)}</div>
              <div class="lp-text-xs lp-text-muted">${UI.escape(l.website || '')}</div>
            </div>
          </div>
        </td>
        <td><span class="lp-badge lp-badge-gray">${UI.escape(l.industry)}</span></td>
        <td>${UI.escape(l.country)}${l.city ? `<br><span class="lp-text-xs lp-text-muted">${UI.escape(l.city)}</span>` : ''}</td>
        <td><span class="lp-score-badge ${gradeClass}" aria-label="Score ${l.score}">${l.score}</span></td>
        <td>
          <div style="font-size:12px;font-weight:500">${UI.escape(l.contact)}</div>
          <div class="lp-text-xs lp-text-muted">${UI.escape(l.email)}</div>
        </td>
        <td><span class="lp-badge ${statusClass}">${UI.cap(l.status)}</span></td>
        <td class="lp-text-muted lp-text-xs"><time datetime="${l.dateAdded}">${UI.formatDate(l.dateAdded)}</time></td>
        <td class="col-actions">
          <div class="lp-flex lp-gap-2">
            <button type="button" class="btn btn-secondary btn-sm" data-action="analyze-lead" data-lead-id="${l.id}">Score</button>
            <button type="button" class="btn btn-secondary btn-sm" data-action="generate-email" data-lead-id="${l.id}">Email</button>
            <div class="lp-dropdown" id="lmenu-${l.id}">
              <button type="button" class="btn btn-ghost btn-sm btn-icon" data-dropdown="lmenu-${l.id}-dd" aria-haspopup="true" aria-expanded="false" aria-label="More actions">•••</button>
              <div class="lp-dropdown-menu" id="lmenu-${l.id}-dd" role="menu">
                <button type="button" class="lp-dropdown-item" role="menuitem" data-action="edit-lead" data-lead-id="${l.id}">Edit</button>
                <button type="button" class="lp-dropdown-item" role="menuitem" data-action="add-to-campaign" data-lead-id="${l.id}">Add to Campaign</button>
                <div class="lp-dropdown-divider"></div>
                <button type="button" class="lp-dropdown-item danger" role="menuitem" data-action="delete-lead" data-lead-id="${l.id}">Delete</button>
              </div>
            </div>
          </div>
        </td>
      </tr>`;
    }).join('');

    renderPagination();
    updateBulkBar();
  }

  function renderPagination() {
    const totalPages = Math.max(1, Math.ceil(filtered.length / CONFIG.itemsPerPage));
    UI.setText('#current-page', currentPage);
    UI.setText('#total-pages', totalPages);
    const prev = document.getElementById('btn-prev-page');
    const next = document.getElementById('btn-next-page');
    if (prev) prev.disabled = currentPage <= 1;
    if (next) next.disabled = currentPage >= totalPages;
  }

  function updateCounts() {
    UI.setText('#leads-shown', Math.min(filtered.length, CONFIG.itemsPerPage));
    UI.setText('#leads-total', leads.length.toLocaleString());
    // Update nav badge
    UI.setText('#nav-leads-count', leads.length);
  }

  function updateBulkBar() {
    const bar = document.getElementById('bulk-action-bar');
    if (!bar) return;
    if (selectedIds.size > 0) {
      bar.hidden = false;
      UI.setText('#bulk-selected-count', `${selectedIds.size} selected`);
    } else {
      bar.hidden = true;
    }
  }

  // Add or edit lead
  function openLeadModal(leadId = null) {
    const isEdit = leadId !== null;
    const lead = isEdit ? leads.find(l => l.id === leadId) : null;

    Modal.open(`
      <div class="lp-modal-header">
        <h2 class="lp-modal-title">${isEdit ? 'Edit Lead' : I18n.t('addLead')}</h2>
        <button type="button" class="btn btn-ghost btn-sm btn-icon" id="modal-lead-close" aria-label="Close">✕</button>
      </div>
      <div class="lp-modal-body">
        <form id="modal-lead-form" name="lead-form" novalidate>
          <div class="lp-form-row">
            <div class="lp-form-group">
              <label class="lp-label" for="ml-company">Company Name *</label>
              <input type="text" id="ml-company" name="company" class="lp-input" value="${UI.escape(lead?.company || '')}" required maxlength="100" />
              <div class="lp-field-error" id="ml-company-error" role="alert" hidden></div>
            </div>
            <div class="lp-form-group">
              <label class="lp-label" for="ml-contact">Contact Person</label>
              <input type="text" id="ml-contact" name="contact" class="lp-input" value="${UI.escape(lead?.contact || '')}" maxlength="80" />
            </div>
          </div>
          <div class="lp-form-row">
            <div class="lp-form-group">
              <label class="lp-label" for="ml-email">Email *</label>
              <input type="email" id="ml-email" name="email" class="lp-input" value="${UI.escape(lead?.email || '')}" required />
              <div class="lp-field-error" id="ml-email-error" role="alert" hidden></div>
            </div>
            <div class="lp-form-group">
              <label class="lp-label" for="ml-phone">Phone</label>
              <input type="tel" id="ml-phone" name="phone" class="lp-input" value="${UI.escape(lead?.phone || '')}" />
            </div>
          </div>
          <div class="lp-form-row">
            <div class="lp-form-group">
              <label class="lp-label" for="ml-industry">Industry</label>
              <select id="ml-industry" name="industry" class="lp-input lp-select">
                ${['SaaS','Logistics','Fintech','Healthcare','Manufacturing','Marketing','Consulting','E-commerce','Other'].map(ind =>
                  `<option value="${ind}" ${lead?.industry === ind ? 'selected' : ''}>${ind}</option>`).join('')}
              </select>
            </div>
            <div class="lp-form-group">
              <label class="lp-label" for="ml-status">Status</label>
              <select id="ml-status" name="status" class="lp-input lp-select">
                ${['new','contacted','interested','converted','rejected'].map(s =>
                  `<option value="${s}" ${lead?.status === s ? 'selected' : ''}>${UI.cap(s)}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="lp-form-row">
            <div class="lp-form-group">
              <label class="lp-label" for="ml-website">Website</label>
              <input type="text" id="ml-website" name="website" class="lp-input" value="${UI.escape(lead?.website || '')}" placeholder="company.com" />
            </div>
            <div class="lp-form-group">
              <label class="lp-label" for="ml-country">Country</label>
              <input type="text" id="ml-country" name="country" class="lp-input" value="${UI.escape(lead?.country || '')}" maxlength="60" />
            </div>
          </div>
          <div class="lp-form-group">
            <label class="lp-label" for="ml-notes">Notes</label>
            <textarea id="ml-notes" name="notes" class="lp-input" rows="3" maxlength="500" placeholder="Any relevant notes…">${UI.escape(lead?.notes || '')}</textarea>
          </div>
          <input type="hidden" id="ml-lead-id" value="${leadId || ''}" />
        </form>
      </div>
      <div class="lp-modal-footer">
        <button type="button" class="btn btn-secondary" id="modal-lead-cancel">Cancel</button>
        <button type="button" class="btn btn-primary" id="modal-lead-save">${isEdit ? 'Save Changes' : I18n.t('saveLead')}</button>
      </div>`);

    document.getElementById('modal-lead-close')?.addEventListener('click', Modal.close);
    document.getElementById('modal-lead-cancel')?.addEventListener('click', Modal.close);
    document.getElementById('modal-lead-save')?.addEventListener('click', () => saveLead(leadId));
  }

  function saveLead(leadId = null) {
    const company = document.getElementById('ml-company')?.value.trim();
    const email   = document.getElementById('ml-email')?.value.trim();
    let valid = true;

    // Validation
    if (!company) {
      UI.show(document.getElementById('ml-company-error'));
      document.getElementById('ml-company-error').textContent = 'Company name is required.';
      document.getElementById('ml-company').classList.add('error');
      valid = false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      UI.show(document.getElementById('ml-email-error'));
      document.getElementById('ml-email-error').textContent = 'Valid email is required.';
      document.getElementById('ml-email').classList.add('error');
      valid = false;
    }
    if (!valid) return;

    const record = {
      company,
      contact: document.getElementById('ml-contact')?.value.trim() || '',
      email,
      phone:   document.getElementById('ml-phone')?.value.trim() || '',
      industry:document.getElementById('ml-industry')?.value || 'Other',
      status:  document.getElementById('ml-status')?.value || 'new',
      website: document.getElementById('ml-website')?.value.trim() || '',
      country: document.getElementById('ml-country')?.value.trim() || '',
      notes:   document.getElementById('ml-notes')?.value.trim() || '',
      score:   leadId ? (leads.find(l => l.id === leadId)?.score || 50) : 50,
      dateAdded: leadId ? (leads.find(l => l.id === leadId)?.dateAdded || today()) : today(),
    };

    if (leadId) {
      leads = leads.map(l => l.id === leadId ? { ...l, ...record } : l);
      Toast.show(I18n.t('leadUpdated'), 'success');
    } else {
      record.id = UI.nextId(leads);
      leads.unshift(record);
      Toast.show(I18n.t('leadSaved'), 'success');
    }

    Store.set('leads', leads);
    Modal.close();
    applyFilters();
  }

  function deleteLead(leadId) {
    const lead = leads.find(l => l.id === leadId);
    Modal.confirm(
      `${I18n.t('confirmDelete')} "${lead?.company}"? This cannot be undone.`,
      'Delete Lead',
      () => {
        leads = leads.filter(l => l.id !== leadId);
        selectedIds.delete(leadId);
        Store.set('leads', leads);
        applyFilters();
        Toast.show(I18n.t('leadDeleted'), 'success');
      }
    );
  }

  function deleteSelected() {
    if (selectedIds.size === 0) return;
    Modal.confirm(
      `Delete ${selectedIds.size} selected lead(s)? This cannot be undone.`,
      'Delete Leads',
      () => {
        leads = leads.filter(l => !selectedIds.has(l.id));
        selectedIds.clear();
        Store.set('leads', leads);
        applyFilters();
        Toast.show(`${selectedIds.size} leads deleted.`, 'success');
      }
    );
  }

  function exportCSV() {
    const headers = ['id','company','contact','email','phone','industry','country','city','score','status','dateAdded'];
    const rows = filtered.map(l => headers.map(h => `"${String(l[h] || '').replace(/"/g,'""')}"`).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), { href: url, download: 'leadpilot_leads.csv' });
    a.click();
    URL.revokeObjectURL(url);
    Toast.show(I18n.t('exportStarted'), 'success');
  }

  function today() {
    return new Date().toISOString().split('T')[0];
  }

  function onEnter() {
    load();
  }

  // Wire filter form
  function wireFilters() {
    const form = document.getElementById('leads-filter-form');
    if (!form) return;

    const debouncedSearch = UI.debounce((val) => {
      filters.search = val.toLowerCase();
      applyFilters();
    });

    form.addEventListener('input', e => {
      if (e.target.id === 'leads-search') debouncedSearch(e.target.value);
      else if (e.target.id === 'filter-industry') { filters.industry = e.target.value; applyFilters(); }
      else if (e.target.id === 'filter-country')  { filters.country  = e.target.value; applyFilters(); }
      else if (e.target.id === 'filter-status')   { filters.status   = e.target.value; applyFilters(); }
      else if (e.target.id === 'filter-score')    { filters.score    = e.target.value; applyFilters(); }
      else if (e.target.id === 'filter-size')     { filters.size     = e.target.value; applyFilters(); }
    });

    form.addEventListener('reset', () => {
      filters = { search: '', industry: '', country: '', status: '', score: '', size: '' };
      setTimeout(applyFilters, 0);
    });

    // Column sort
    document.querySelectorAll('#leads-table th[data-sort]').forEach(th => {
      th.addEventListener('click', () => {
        const col = th.dataset.sort;
        if (sortCol === col) sortDir = sortDir === 'asc' ? 'desc' : 'asc';
        else { sortCol = col; sortDir = 'asc'; }
        document.querySelectorAll('#leads-table th').forEach(t => t.classList.remove('sort-asc','sort-desc'));
        th.classList.add(sortDir === 'asc' ? 'sort-asc' : 'sort-desc');
        sortFiltered();
        renderTable();
      });
    });

    // Select all
    document.getElementById('select-all-leads')?.addEventListener('change', e => {
      const page = filtered.slice((currentPage-1)*CONFIG.itemsPerPage, currentPage*CONFIG.itemsPerPage);
      page.forEach(l => { if (e.target.checked) selectedIds.add(l.id); else selectedIds.delete(l.id); });
      document.querySelectorAll('.lead-row-check').forEach(cb => cb.checked = e.target.checked);
      updateBulkBar();
    });

    // Pagination
    document.getElementById('btn-prev-page')?.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderTable(); }});
    document.getElementById('btn-next-page')?.addEventListener('click', () => {
      const total = Math.ceil(filtered.length / CONFIG.itemsPerPage);
      if (currentPage < total) { currentPage++; renderTable(); }
    });
  }

  return { onEnter, openLeadModal, saveLead, deleteLead, deleteSelected, exportCSV, wireFilters, getLeads: () => leads };
})();

/* ============================================================
   AI SCORING PAGE CONTROLLER
   ============================================================ */
const AIScorePage = (() => {
  let history = [];
  let lastResult = null;

  function onEnter() {
    history = Store.get('ai_history') || [];
    renderHistory();
  }

  async function runScore() {
    const company  = document.getElementById('ai-company-name')?.value.trim();
    const industry = document.getElementById('ai-industry')?.value;
    const employees= document.getElementById('ai-employees')?.value;
    const website  = document.getElementById('ai-website')?.value.trim();
    const context  = document.getElementById('ai-context')?.value.trim();

    // Validate
    const nameErr = document.getElementById('ai-company-name-error');
    if (!company) {
      nameErr && (nameErr.hidden = false, nameErr.textContent = 'Company name is required.');
      document.getElementById('ai-company-name')?.classList.add('error');
      return;
    }
    nameErr && (nameErr.hidden = true);
    document.getElementById('ai-company-name')?.classList.remove('error');

    // Show thinking state
    const btn = document.getElementById('btn-ai-analyze');
    btn.classList.add('btn-loading');
    btn.textContent = I18n.t('analyzing');
    btn.disabled = true;
    UI.show(document.getElementById('ai-thinking-indicator'));
    UI.hide(document.getElementById('ai-score-output'));
    UI.hide(document.getElementById('btn-save-ai-result'));

    try {
      // ⚡ BACKEND: const result = await fetch('/api/v1/ai/score', { method:'POST', body: JSON.stringify({company, industry, employees, website, context}) })
      const result = await AI.scoreLeadAI({ company, industry, employees, website, context });
      lastResult = result;
      renderResult(result);

      // Save to history
      history.unshift({ ...result, id: UI.uid() });
      if (history.length > 20) history.pop();
      Store.set('ai_history', history);
      renderHistory();
    } catch (err) {
      Toast.show('AI analysis failed. Please try again.', 'error');
    } finally {
      btn.classList.remove('btn-loading');
      btn.textContent = I18n.t('analyze');
      btn.disabled = false;
      UI.hide(document.getElementById('ai-thinking-indicator'));
    }
  }

  function renderResult(r) {
    UI.show(document.getElementById('ai-score-output'));
    UI.hide(document.getElementById('ai-score-placeholder'));
    UI.show(document.getElementById('btn-save-ai-result'));

    const scoreEl = document.getElementById('ai-result-score');
    if (scoreEl) {
      scoreEl.textContent = r.score;
      scoreEl.style.background = `linear-gradient(135deg, ${UI.scoreColor(r.score)}, var(--purple))`;
      scoreEl.style.webkitBackgroundClip = 'text';
      scoreEl.style.webkitTextFillColor = 'transparent';
    }

    const setMetric = (id, pct, label, meter) => {
      UI.setText(id, `${pct}%`);
      UI.setText(label, I18n.t('scoreLabel', pct));
      const m = document.getElementById(meter);
      if (m) { m.style.width = `${pct}%`; }
    };

    setMetric('ai-reply-pct', r.replyPct, 'ai-reply-label', 'ai-reply-meter');
    setMetric('ai-interest-val', r.interestPct, 'ai-interest-label', 'ai-interest-meter');
    setMetric('ai-budget-val', r.budgetPct, 'ai-budget-label', 'ai-budget-meter');
    setMetric('ai-timing-val', r.timingPct, 'ai-timing-label', 'ai-timing-meter');
    UI.setText('#ai-next-action-text', r.nextAction);
  }

  function renderHistory() {
    const list = document.getElementById('ai-score-history-list');
    if (!list) return;
    if (history.length === 0) {
      list.innerHTML = '<div class="lp-empty"><div class="lp-empty-icon" aria-hidden="true">📋</div><div class="lp-empty-title">No recent analyses</div><div class="lp-empty-desc">Analyzed leads will appear here.</div></div>';
      return;
    }
    list.innerHTML = history.slice(0, 10).map(h => `
      <div class="lp-flex-center lp-gap-2" style="padding:9px 0;border-bottom:1px solid var(--gray-50)">
        <div>
          <div style="font-size:12px;font-weight:600;color:var(--gray-800)">${UI.escape(h.company)}</div>
          <div class="lp-text-xs lp-text-muted">${new Date(h.generatedAt).toLocaleString()}</div>
        </div>
        <span class="lp-score-badge ${UI.scoreBadgeClass(h.score)}" style="margin-left:auto">${h.score}</span>
      </div>`).join('');
  }

  function saveToLeads() {
    if (!lastResult) return;
    const leads = Store.get('leads') || [];
    const existing = leads.find(l => l.company.toLowerCase() === lastResult.company.toLowerCase());
    if (existing) {
      existing.score = lastResult.score;
      Store.set('leads', leads);
      Toast.show(`Score updated for ${lastResult.company}`, 'success');
    } else {
      Toast.show('Score saved — add this company as a lead to store it.', 'info');
    }
  }

  return { onEnter, runScore, saveToLeads };
})();

/* ============================================================
   EMAIL GENERATOR PAGE CONTROLLER
   ============================================================ */
const EmailGenPage = (() => {
  let history = [];
  let generated = null; // { cold, fu1, fu2, linkedin }
  let activeType = 'cold';

  function onEnter() {
    history = Store.get('email_history') || [];
    renderHistory();
  }

  async function generate() {
    const company     = document.getElementById('eg-company')?.value.trim();
    const industry    = document.getElementById('eg-industry')?.value;
    const painPoint   = document.getElementById('eg-pain-point')?.value.trim();
    const tone        = document.getElementById('eg-tone')?.value || 'professional';
    const goal        = document.getElementById('eg-goal')?.value || 'book-call';
    const length      = document.getElementById('eg-length')?.value || 'medium';
    const language    = document.getElementById('eg-language')?.value || 'en';
    const contactName = document.getElementById('eg-contact-name')?.value.trim();

    let valid = true;
    if (!company)   { showFieldErr('eg-company-error', 'Company name is required.'); valid = false; }
    if (!painPoint) { showFieldErr('eg-pain-error', 'Pain point is required.'); valid = false; }
    if (!valid) return;

    clearFieldErrs();

    const btn = document.getElementById('btn-generate-email');
    btn.classList.add('btn-loading');
    btn.textContent = I18n.t('generating');
    btn.disabled = true;

    // Hide placeholder
    UI.hide(document.getElementById('email-preview-placeholder'));
    UI.hide(document.getElementById('email-body-text'));
    UI.hide(document.getElementById('btn-copy-email'));
    UI.hide(document.getElementById('email-actions'));
    UI.hide(document.getElementById('email-subject-output'));

    try {
      // ⚡ BACKEND: const result = await fetch('/api/v1/ai/email', { method:'POST', body: JSON.stringify({...}) }).then(r => r.json())
      const result = await AI.generateEmailAI({ company, industry, painPoint, tone, goal, length, language, contactName });
      generated = result;
      showEmail('cold');
      UI.show(document.getElementById('btn-regenerate-email'));

      // Save history
      history.unshift({ company, industry, subject: result.cold.subject, generatedAt: result.generatedAt, id: UI.uid() });
      if (history.length > 20) history.pop();
      Store.set('email_history', history);
      renderHistory();
    } catch {
      Toast.show('Email generation failed. Please try again.', 'error');
      UI.show(document.getElementById('email-preview-placeholder'));
    } finally {
      btn.classList.remove('btn-loading');
      btn.textContent = I18n.t('generate');
      btn.disabled = false;
    }
  }

  function showEmail(type) {
    if (!generated) return;
    activeType = type;
    const map = { cold: generated.cold, followup1: generated.fu1, followup2: generated.fu2, linkedin: generated.linkedin };
    const email = map[type];
    if (!email) return;

    const subjectEl = document.getElementById('email-subject-output');
    const textEl    = document.getElementById('email-body-text');
    const placeholder = document.getElementById('email-preview-placeholder');
    const copyBtn   = document.getElementById('btn-copy-email');
    const actions   = document.getElementById('email-actions');

    if (subjectEl) {
      subjectEl.hidden = false;
      UI.setText('#email-subject-text', email.subject);
    }
    if (textEl) {
      textEl.hidden = false;
      textEl.style.whiteSpace = 'pre-wrap';
      textEl.textContent = email.body;
    }
    UI.hide(placeholder);
    UI.show(copyBtn);
    UI.show(actions);

    // Highlight active tab
    document.querySelectorAll('.email-type-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.emailType === type);
      t.setAttribute('aria-selected', t.dataset.emailType === type);
    });
  }

  async function copyEmail() {
    if (!generated) return;
    const map = { cold: generated.cold, followup1: generated.fu1, followup2: generated.fu2, linkedin: generated.linkedin };
    const email = map[activeType];
    const text = `Subject: ${email.subject}\n\n${email.body}`;
    const ok = await UI.copyText(text);
    Toast.show(ok ? I18n.t('emailCopied') : 'Copy failed.', ok ? 'success' : 'error');
    const btn = document.getElementById('btn-copy-email');
    if (btn && ok) {
      btn.textContent = I18n.t('copied');
      setTimeout(() => btn.textContent = I18n.t('copy'), 2000);
    }
  }

  function renderHistory() {
    const list = document.getElementById('email-gen-history-list');
    if (!list) return;
    if (history.length === 0) {
      list.innerHTML = '<div class="lp-text-xs lp-text-muted" style="padding:8px 0">No emails generated yet.</div>';
      return;
    }
    list.innerHTML = history.slice(0, 8).map(h => `
      <div class="lp-flex-center lp-gap-2" style="padding:8px 0;border-bottom:1px solid var(--gray-50)" role="listitem">
        <div style="flex:1;min-width:0">
          <div class="lp-truncate" style="font-size:12px;font-weight:600;color:var(--gray-800)">${UI.escape(h.company)}</div>
          <div class="lp-truncate lp-text-xs lp-text-muted">${UI.escape(h.subject)}</div>
        </div>
        <div class="lp-text-xs lp-text-muted" style="flex-shrink:0">${new Date(h.generatedAt).toLocaleDateString()}</div>
      </div>`).join('');
  }

  function showFieldErr(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.textContent = msg; el.hidden = false; }
  }

  function clearFieldErrs() {
    ['eg-company-error','eg-pain-error'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.hidden = true;
    });
  }

  return { onEnter, generate, showEmail, copyEmail };
})();

/* ============================================================
   CAMPAIGNS PAGE CONTROLLER
   ============================================================ */
const CampaignsPage = (() => {
  let campaigns = [];

  function onEnter() {
    campaigns = Store.get('campaigns') || SEED_CAMPAIGNS;
    updateNavBadge();
  }

  function updateNavBadge() {
    const active = campaigns.filter(c => c.status === 'active').length;
    UI.setText('#nav-campaigns-count', active);
  }

  function pauseCampaign(id) {
    campaigns = campaigns.map(c => c.id === id ? { ...c, status: 'paused' } : c);
    Store.set('campaigns', campaigns);
    updateCardStatus(id, 'paused');
    updateNavBadge();
    Toast.show(I18n.t('campaignPaused'), 'success');
  }

  function resumeCampaign(id) {
    campaigns = campaigns.map(c => c.id === id ? { ...c, status: 'active' } : c);
    Store.set('campaigns', campaigns);
    updateCardStatus(id, 'active');
    updateNavBadge();
    Toast.show(I18n.t('campaignResumed'), 'success');
  }

  function launchCampaign(id) {
    campaigns = campaigns.map(c => c.id === id ? { ...c, status: 'active' } : c);
    Store.set('campaigns', campaigns);
    updateCardStatus(id, 'active');
    updateNavBadge();
    Toast.show(I18n.t('campaignLaunched'), 'success');
  }

  function deleteCampaign(id) {
    const c = campaigns.find(x => x.id === id);
    Modal.confirm(`Delete campaign "${c?.name}"? This cannot be undone.`, 'Delete Campaign', () => {
      campaigns = campaigns.filter(x => x.id !== id);
      Store.set('campaigns', campaigns);
      document.getElementById(`campaign-${id}`)?.remove();
      updateNavBadge();
      Toast.show(I18n.t('campaignDeleted'), 'success');
    });
  }

  function updateCardStatus(id, status) {
    const card = document.getElementById(`campaign-${id}`);
    if (!card) return;
    const badge = card.querySelector('.lp-badge[role="status"]');
    if (badge) {
      badge.className = `lp-badge ${status === 'active' ? 'lp-badge-green' : status === 'paused' ? 'lp-badge-yellow' : 'lp-badge-blue'}`;
      badge.textContent = UI.cap(status);
    }
    card.dataset.status = status;
  }

  function openNewCampaignModal() {
    Modal.open(`
      <div class="lp-modal-header">
        <h2 class="lp-modal-title">Create New Campaign</h2>
        <button type="button" class="btn btn-ghost btn-sm btn-icon" id="camp-close" aria-label="Close">✕</button>
      </div>
      <div class="lp-modal-body">
        <form id="camp-form" name="campaign-form" novalidate>
          <div class="lp-form-group">
            <label class="lp-label" for="mc-name">Campaign Name *</label>
            <input type="text" id="mc-name" name="campaign-name" class="lp-input" placeholder="e.g. Germany SaaS Q2" required maxlength="80" />
            <div class="lp-field-error" id="mc-name-error" role="alert" hidden></div>
          </div>
          <div class="lp-form-row">
            <div class="lp-form-group">
              <label class="lp-label" for="mc-goal">Goal</label>
              <select id="mc-goal" name="goal" class="lp-input lp-select">
                <option value="book-call">Book a discovery call</option>
                <option value="demo">Schedule a demo</option>
                <option value="partnership">Partnership outreach</option>
              </select>
            </div>
            <div class="lp-form-group">
              <label class="lp-label" for="mc-language">Language</label>
              <select id="mc-language" name="language" class="lp-input lp-select">
                <option value="en">English</option><option value="de">German</option>
                <option value="cs">Czech</option><option value="ru">Russian</option>
              </select>
            </div>
          </div>
          <div class="lp-form-group">
            <label class="lp-label" for="mc-leads">Lead List</label>
            <select id="mc-leads" name="leads" class="lp-input lp-select">
              <option value="all-new">All new leads (89)</option>
              <option value="germany">Germany leads (34)</option>
              <option value="fintech">Fintech leads (18)</option>
            </select>
          </div>
          <div class="lp-form-row">
            <div class="lp-form-group">
              <label class="lp-label" for="mc-start-date">Start Date</label>
              <input type="date" id="mc-start-date" name="start-date" class="lp-input" />
            </div>
            <div class="lp-form-group">
              <label class="lp-label" for="mc-send-time">Send Time</label>
              <select id="mc-send-time" name="send-time" class="lp-input lp-select">
                <option>9:00 AM</option><option>10:00 AM</option><option>11:00 AM</option><option>2:00 PM</option>
              </select>
            </div>
          </div>
          <div style="background:var(--blue-light);border:1px solid var(--blue-mid);border-radius:var(--r-sm);padding:12px;font-size:12px;color:var(--blue)">
            ✨ AI will automatically generate personalized emails for each lead.
          </div>
        </form>
      </div>
      <div class="lp-modal-footer">
        <button type="button" class="btn btn-secondary" id="camp-cancel">Cancel</button>
        <button type="button" class="btn btn-secondary" id="camp-draft" data-action="camp-draft">Save Draft</button>
        <button type="button" class="btn btn-primary" id="camp-launch" data-action="camp-launch">Launch Campaign</button>
      </div>`);

    document.getElementById('camp-close')?.addEventListener('click', Modal.close);
    document.getElementById('camp-cancel')?.addEventListener('click', Modal.close);
    document.getElementById('camp-draft')?.addEventListener('click', () => createCampaign('draft'));
    document.getElementById('camp-launch')?.addEventListener('click', () => createCampaign('active'));
  }

  function createCampaign(status) {
    const name = document.getElementById('mc-name')?.value.trim();
    if (!name) {
      const err = document.getElementById('mc-name-error');
      if (err) { err.hidden = false; err.textContent = 'Campaign name is required.'; }
      return;
    }
    const newC = {
      id: UI.nextId(campaigns),
      name, status,
      leads: 0, sent: 0, opened: 0, replied: 0, meetings: 0,
      created: new Date().toISOString().split('T')[0],
    };
    campaigns.unshift(newC);
    Store.set('campaigns', campaigns);
    Modal.close();
    updateNavBadge();
    // Re-render by navigating to campaigns
    Router.go('campaigns');
    Toast.show(status === 'active' ? I18n.t('campaignLaunched') : I18n.t('campaignCreated'), 'success');
  }

  function viewCampaign(id) {
    const c = campaigns.find(x => x.id === id);
    if (!c) return;
    const openRate = c.sent ? Math.round(c.opened / c.sent * 100) : 0;
    const replyRate = c.sent ? Math.round(c.replied / c.sent * 100) : 0;
    Modal.open(`
      <div class="lp-modal-header">
        <h2 class="lp-modal-title">${UI.escape(c.name)}</h2>
        <button type="button" class="btn btn-ghost btn-sm btn-icon" id="cv-close">✕</button>
      </div>
      <div class="lp-modal-body">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px">
          ${[['Sent', c.sent],['Open Rate', openRate+'%'],['Reply Rate', replyRate+'%'],['Meetings', c.meetings]].map(([k,v])=>`
          <div style="background:var(--gray-50);border-radius:var(--r);padding:12px;text-align:center">
            <div style="font-size:22px;font-weight:700">${v}</div>
            <div class="lp-text-xs lp-text-muted">${k}</div>
          </div>`).join('')}
        </div>
        <div style="font-size:13px;font-weight:600;margin-bottom:10px">Recent Activity</div>
        ${['Klaus Weber opened the email','Sarah Müller replied — interested!','Mike Davis clicked the CTA link'].map((a,i)=>`
        <div class="lp-flex-center lp-gap-2" style="padding:9px 0;border-bottom:1px solid var(--gray-100)">
          <span style="font-size:16px">${['📧','💬','🖱️'][i]}</span>
          <div style="flex:1;font-size:13px">${a}</div>
          <div class="lp-text-xs lp-text-muted">${['2m','15m','1h'][i]} ago</div>
        </div>`).join('')}
      </div>
      <div class="lp-modal-footer">
        <button type="button" class="btn btn-secondary" id="cv-close2">Close</button>
        <button type="button" class="btn btn-primary" data-action="export-campaign-report" data-id="${id}">Export Report</button>
      </div>`, { large: true });

    document.getElementById('cv-close')?.addEventListener('click', Modal.close);
    document.getElementById('cv-close2')?.addEventListener('click', Modal.close);
  }

  return { onEnter, pauseCampaign, resumeCampaign, launchCampaign, deleteCampaign, openNewCampaignModal, viewCampaign };
})();

/* ============================================================
   SETTINGS PAGE CONTROLLER
   ============================================================ */
const SettingsPage = (() => {
  function onEnter() {
    const s = Store.get('settings') || SEED_SETTINGS;
    // Populate notification toggles
    Object.entries(s.notifications || {}).forEach(([k, v]) => {
      const el = document.getElementById(`notif-${k}`);
      if (el) el.checked = v;
    });
    // Language
    const langEl = document.getElementById('settings-language');
    if (langEl) langEl.value = s.language || 'en';
    // Workspace
    const wsEl = document.getElementById('settings-workspace-name');
    if (wsEl) wsEl.value = s.workspace?.name || '';
    // SMTP
    const fields = ['smtp-host','smtp-port','smtp-user','smtp-from'];
    fields.forEach(f => {
      const el = document.getElementById(`settings-${f}`);
      if (el) el.value = s.smtp?.[f.replace('smtp-','').replace('-','_')] || '';
    });
  }

  function switchTab(tabId) {
    document.querySelectorAll('[data-settings-panel]').forEach(p => p.hidden = true);
    document.querySelectorAll('.settings-nav-item').forEach(btn => btn.classList.remove('active'));
    const panel = document.querySelector(`[data-settings-panel="${tabId}"]`);
    if (panel) panel.hidden = false;
    const btn = document.querySelector(`[data-settings-tab="${tabId}"]`);
    if (btn) btn.classList.add('active');
  }

  function saveNotifications() {
    const s = Store.get('settings') || SEED_SETTINGS;
    s.notifications = {
      replies:   document.getElementById('notif-replies')?.checked ?? true,
      campaigns: document.getElementById('notif-campaigns')?.checked ?? true,
      leads:     document.getElementById('notif-leads')?.checked ?? false,
      digest:    document.getElementById('notif-digest')?.checked ?? true,
      credits:   document.getElementById('notif-credits')?.checked ?? true,
    };
    Store.set('settings', s);
    Toast.show(I18n.t('settingsSaved'), 'success');
  }

  function saveLanguage() {
    const lang = document.getElementById('settings-language')?.value || 'en';
    I18n.setLang(lang);
  }

  function saveWorkspace() {
    const s = Store.get('settings') || SEED_SETTINGS;
    s.workspace = s.workspace || {};
    s.workspace.name = document.getElementById('settings-workspace-name')?.value.trim() || '';
    s.workspace.url  = document.getElementById('settings-workspace-url')?.value.trim()  || '';
    Store.set('settings', s);
    Toast.show(I18n.t('settingsSaved'), 'success');
  }

  function saveApiKeys() {
    const openaiKey = document.getElementById('openai-api-key')?.value.trim();
    const s = Store.get('settings') || SEED_SETTINGS;
    if (!s.api) s.api = {};
    s.api.openaiKey = openaiKey;
    Store.set('settings', s);
    Toast.show(I18n.t('settingsSaved'), 'success');
  }

  function saveSMTP() {
    const s = Store.get('settings') || SEED_SETTINGS;
    s.smtp = {
      host: document.getElementById('smtp-host')?.value.trim()    || '',
      port: parseInt(document.getElementById('smtp-port')?.value) || 587,
      user: document.getElementById('smtp-user')?.value.trim()    || '',
      pass: document.getElementById('smtp-pass')?.value           || '',
      from: document.getElementById('smtp-from')?.value.trim()    || '',
    };
    Store.set('settings', s);
    Toast.show(I18n.t('settingsSaved'), 'success');
  }

  function testSMTP() {
    const host = document.getElementById('smtp-host')?.value.trim();
    if (!host) { Toast.show('Enter SMTP host first.', 'warn'); return; }
    Toast.show(I18n.t('testEmailSent'), 'success');
  }

  return { onEnter, switchTab, saveNotifications, saveLanguage, saveWorkspace, saveApiKeys, saveSMTP, testSMTP };
})();

/* ============================================================
   PROFILE PAGE CONTROLLER
   ============================================================ */
const ProfilePage = (() => {
  function onEnter() {
    Auth.refreshUserUI(Auth.getUser());
  }

  function saveProfile() {
    const first = document.getElementById('profile-first-name')?.value.trim();
    const last  = document.getElementById('profile-last-name')?.value.trim();
    const email = document.getElementById('profile-email')?.value.trim();
    if (!first || !last || !email) {
      Toast.show('Please fill in all required fields.', 'error');
      return;
    }
    Auth.updateUser({
      firstName: first, lastName: last, email,
      jobTitle: document.getElementById('profile-job-title')?.value.trim() || '',
      company:  document.getElementById('profile-company')?.value.trim()   || '',
      phone:    document.getElementById('profile-phone')?.value.trim()     || '',
    });
    Toast.show(I18n.t('profileSaved'), 'success');
  }

  function changePassword() {
    const current = document.getElementById('profile-current-pass')?.value;
    const newPass  = document.getElementById('profile-new-pass')?.value;
    const confirm  = document.getElementById('profile-confirm-pass')?.value;
    const errEl    = document.getElementById('password-match-error');

    if (!current || !newPass || !confirm) {
      Toast.show('Please fill in all password fields.', 'error');
      return;
    }
    if (newPass !== confirm) {
      if (errEl) { errEl.hidden = false; errEl.textContent = 'Passwords do not match.'; }
      return;
    }
    if (newPass.length < 8) {
      if (errEl) { errEl.hidden = false; errEl.textContent = 'Password must be at least 8 characters.'; }
      return;
    }
    if (errEl) errEl.hidden = true;
    // ⚡ BACKEND: await supabase.auth.updateUser({ password: newPass })
    ['profile-current-pass','profile-new-pass','profile-confirm-pass'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    Toast.show(I18n.t('passwordChanged'), 'success');
  }

  function deleteAccount() {
    Modal.confirm(
      'This will permanently delete your account and all data. There is no way to undo this.',
      'Delete Account',
      () => {
        Store.clear();
        Toast.show('Account deleted. Redirecting…', 'info');
        setTimeout(() => { window.location.href = 'index.html'; }, 2000);
      }
    );
    // Override OK button to show correct label
    const ok = document.getElementById('conf-ok');
    if (ok) ok.textContent = 'Delete My Account';
  }

  return { onEnter, saveProfile, changePassword, deleteAccount };
})();

/* ============================================================
   INTEGRATIONS PAGE CONTROLLER
   ============================================================ */
const IntegrationsPage = (() => {
  function onEnter() {
    const state = Store.get('integrations') || {};
    Object.entries(state).forEach(([name, connected]) => {
      const statusEl = document.getElementById(`${name}-status`);
      if (statusEl) {
        statusEl.textContent = connected ? I18n.t('connected') : 'Not connected';
        statusEl.className = `lp-badge ${connected ? 'lp-badge-green' : 'lp-badge-gray'}`;
      }
    });
  }

  function connect(name) {
    // ⚡ BACKEND: OAuth flow or API key dialog
    Modal.open(`
      <div class="lp-modal-header">
        <h2 class="lp-modal-title">Connect ${UI.cap(name)}</h2>
        <button type="button" class="btn btn-ghost btn-sm btn-icon" id="int-close">✕</button>
      </div>
      <div class="lp-modal-body">
        <div class="lp-form-group">
          <label class="lp-label" for="int-api-key">${UI.cap(name)} API Key</label>
          <input type="password" id="int-api-key" name="api-key" class="lp-input" placeholder="Paste your API key…" autocomplete="off" />
        </div>
        <div style="font-size:12px;color:var(--gray-500);margin-top:8px">
          Your key is stored securely and never shared.
        </div>
      </div>
      <div class="lp-modal-footer">
        <button type="button" class="btn btn-secondary" id="int-cancel">Cancel</button>
        <button type="button" class="btn btn-primary" id="int-confirm">Connect</button>
      </div>`);

    document.getElementById('int-close')?.addEventListener('click', Modal.close);
    document.getElementById('int-cancel')?.addEventListener('click', Modal.close);
    document.getElementById('int-confirm')?.addEventListener('click', () => {
      const s = Store.get('integrations') || {};
      s[name] = true;
      Store.set('integrations', s);
      Modal.close();
      onEnter();
      Toast.show(`${UI.cap(name)} connected!`, 'success');
    });
  }

  function disconnect(name) {
    Modal.confirm(`Disconnect ${UI.cap(name)}?`, 'Disconnect Integration', () => {
      const s = Store.get('integrations') || {};
      s[name] = false;
      Store.set('integrations', s);
      onEnter();
      Toast.show(`${UI.cap(name)} disconnected.`, 'info');
    });
  }

  function settings(name) {
    Toast.show(`Opening ${UI.cap(name)} settings…`, 'info');
  }

  return { onEnter, connect, disconnect, settings };
})();

/* ============================================================
   BILLING PAGE CONTROLLER
   ============================================================ */
const BillingPage = (() => {
  function onEnter() {
    const user = Auth.getUser();
    UI.setText('#billing-credits-used', `${1000 - user.credits} / 1,000`);
  }

  function downloadInvoice(invoiceId) {
    Toast.show(`Downloading ${invoiceId}.pdf…`, 'info');
  }

  function selectPlan(plan) {
    if (plan === 'starter') {
      Modal.confirm('Downgrade to Starter plan? You will lose access to advanced features.', 'Downgrade Plan', () => {
        Auth.updateUser({ plan: 'starter' });
        Toast.show('Plan downgraded to Starter.', 'info');
      });
    } else if (plan === 'agency') {
      Modal.open(`
        <div class="lp-modal-header">
          <h2 class="lp-modal-title">Upgrade to Agency — €99/mo</h2>
          <button type="button" class="btn btn-ghost btn-sm btn-icon" id="pay-close">✕</button>
        </div>
        <div class="lp-modal-body">
          <div class="lp-form-group">
            <label class="lp-label" for="pay-card">Card Number</label>
            <input type="text" id="pay-card" name="card" class="lp-input" value="4242 4242 4242 4242" maxlength="19" />
          </div>
          <div class="lp-form-row">
            <div class="lp-form-group">
              <label class="lp-label" for="pay-expiry">Expiry</label>
              <input type="text" id="pay-expiry" name="expiry" class="lp-input" value="12/27" maxlength="5" />
            </div>
            <div class="lp-form-group">
              <label class="lp-label" for="pay-cvc">CVC</label>
              <input type="text" id="pay-cvc" name="cvc" class="lp-input" value="123" maxlength="4" />
            </div>
          </div>
          <div style="font-size:11px;color:var(--gray-400);text-align:center;margin-top:6px">🔒 Secured by Stripe. Cancel anytime.</div>
        </div>
        <div class="lp-modal-footer">
          <button type="button" class="btn btn-secondary" id="pay-cancel">Cancel</button>
          <button type="button" class="btn btn-primary" id="pay-confirm">Pay €99.00</button>
        </div>`);
      document.getElementById('pay-close')?.addEventListener('click', Modal.close);
      document.getElementById('pay-cancel')?.addEventListener('click', Modal.close);
      document.getElementById('pay-confirm')?.addEventListener('click', () => {
        processPayment('agency', '€99.00');
      });
    }
  }

  function processPayment(plan, amount) {
    const btn = document.getElementById('pay-confirm');
    if (btn) { btn.classList.add('btn-loading'); btn.disabled = true; }
    setTimeout(() => {
      Modal.close();
      Auth.updateUser({ plan });
      Toast.show(`Payment of ${amount} successful! You are now on Agency. 🎉`, 'success');
    }, 2000);
  }

  return { onEnter, downloadInvoice, selectPlan };
})();

/* ============================================================
   PAGE CONTROLLERS MAP
   ============================================================ */
const PageControllers = {
  dashboard:    { onEnter: () => { Charts.initDashboardCharts(); } },
  leads:        LeadsPage,
  'ai-search':  AIScorePage,
  'email-gen':  EmailGenPage,
  campaigns:    CampaignsPage,
  analytics:    { onEnter: () => { Charts.initAnalyticsCharts(); } },
  integrations: IntegrationsPage,
  billing:      BillingPage,
  settings:     SettingsPage,
  profile:      ProfilePage,
};

/* ============================================================
   GLOBAL EVENT DELEGATION
   Central click/change handler — keeps JS modular.
   Every interactive element declares data-action.
   ============================================================ */
function attachGlobalEvents() {

  // ── Sidebar nav ──
  document.getElementById('lp-nav')?.addEventListener('click', e => {
    const item = e.target.closest('[data-nav]');
    if (item) Router.go(item.dataset.nav);
  });

  document.getElementById('lp-logo')?.addEventListener('click', e => {
    e.preventDefault();
    Router.go('dashboard');
  });

  // ── Topbar dropdowns ──
  document.getElementById('btn-notifications')?.addEventListener('click', e => {
    e.stopPropagation();
    const menu = document.getElementById('notif-menu');
    menu?.classList.toggle('open');
    // Hide dot when opened
    UI.hide(document.getElementById('notif-dot'));
  });

  document.getElementById('btn-lang')?.addEventListener('click', e => {
    e.stopPropagation();
    document.getElementById('lang-menu')?.classList.toggle('open');
  });

  document.getElementById('topbar-avatar-btn')?.addEventListener('click', e => {
    e.stopPropagation();
    document.getElementById('topbar-user-menu')?.classList.toggle('open');
  });

  document.getElementById('sidebar-user-btn')?.addEventListener('click', e => {
    e.stopPropagation();
    document.getElementById('sidebar-user-menu')?.classList.toggle('open');
  });

  // ── Global delegated click ──
  document.addEventListener('click', e => {
    // Close dropdowns on outside click
    if (!e.target.closest('.lp-dropdown') && !e.target.closest('#notif-dropdown') && !e.target.closest('#lang-dropdown')) {
      Dropdown.closeAll();
      document.getElementById('notif-menu')?.classList.remove('open');
      document.getElementById('lang-menu')?.classList.remove('open');
      document.getElementById('topbar-user-menu')?.classList.remove('open');
      document.getElementById('sidebar-user-menu')?.classList.remove('open');
    }

    const target = e.target.closest('[data-action]');
    if (!target) return;
    const action = target.dataset.action;

    // ── ROUTER ──
    if (action === 'goto-profile')   { Router.go('profile'); return; }
    if (action === 'goto-settings')  { Router.go('settings'); return; }
    if (action === 'goto-billing')   { Router.go('billing'); return; }
    if (action === 'goto-crm')       { Router.go('leads'); return; }

    // ── AUTH ──
    if (action === 'logout') { Auth.logout(); return; }

    // ── LANGUAGE ──
    if (action === 'set-lang') { I18n.setLang(target.dataset.lang); return; }

    // ── THEME ──
    if (action === 'toggle-theme') {
      const html = document.documentElement;
      const dark = html.dataset.theme === 'dark';
      html.dataset.theme = dark ? 'light' : 'dark';
      target.setAttribute('aria-pressed', String(!dark));
      return;
    }

    // ── LEADS ──
    if (action === 'open-add-lead-modal') { LeadsPage.openLeadModal(); return; }
    if (action === 'edit-lead')           { LeadsPage.openLeadModal(parseInt(target.dataset.leadId)); return; }
    if (action === 'delete-lead')         { LeadsPage.deleteLead(parseInt(target.dataset.leadId)); return; }
    if (action === 'export-leads')        { LeadsPage.exportCSV(); return; }
    if (action === 'reset-filters')       { /* handled by form reset event */ return; }
    if (action === 'select-all-leads')    { /* handled inline */ return; }
    if (action === 'clear-bulk-selection') {
      document.querySelectorAll('.lead-row-check').forEach(cb => cb.checked = false);
      document.getElementById('select-all-leads') && (document.getElementById('select-all-leads').checked = false);
      LeadsPage.wireFilters && null; // selection state managed inside LeadsPage
      document.getElementById('bulk-action-bar').hidden = true;
      return;
    }
    if (action === 'analyze-lead') {
      const id = parseInt(target.dataset.leadId);
      const lead = LeadsPage.getLeads().find(l => l.id === id);
      if (lead) {
        Router.go('ai-search');
        setTimeout(() => {
          const nameEl = document.getElementById('ai-company-name');
          const indEl  = document.getElementById('ai-industry');
          if (nameEl) nameEl.value = lead.company;
          if (indEl)  indEl.value  = lead.industry || '';
        }, 100);
      }
      return;
    }
    if (action === 'generate-email') {
      const id = parseInt(target.dataset.leadId);
      const lead = LeadsPage.getLeads().find(l => l.id === id);
      if (lead) {
        Router.go('email-gen');
        setTimeout(() => {
          const coEl = document.getElementById('eg-company');
          const indEl= document.getElementById('eg-industry');
          const nameEl=document.getElementById('eg-contact-name');
          if (coEl)   coEl.value  = lead.company;
          if (indEl)  indEl.value = lead.industry || '';
          if (nameEl) nameEl.value= lead.contact  || '';
        }, 100);
      }
      return;
    }
    if (action === 'add-to-campaign') {
      Toast.show(`Lead added to campaign!`, 'success');
      return;
    }
    if (action === 'import-leads') {
      openImportModal();
      return;
    }
    if (action === 'prev-page') { /* handled inside LeadsPage */ return; }
    if (action === 'next-page') { /* handled inside LeadsPage */ return; }

    // ── BULK ACTIONS ──
    if (action === 'bulk-delete' || target.dataset.bulkAction === 'delete-selected') {
      LeadsPage.deleteSelected();
      return;
    }
    if (target.dataset.bulkAction === 'score-selected') {
      Toast.show('AI scoring all selected leads…', 'info');
      return;
    }
    if (target.dataset.bulkAction === 'generate-emails') {
      Toast.show('Generating emails for selected leads…', 'info');
      return;
    }

    // ── AI SCORE ──
    if (action === 'run-ai-score') {
      e.preventDefault();
      AIScorePage.runScore();
      return;
    }
    if (action === 'save-ai-result') {
      AIScorePage.saveToLeads();
      return;
    }
    if (action === 'generate-email-from-score') {
      Router.go('email-gen');
      return;
    }
    if (action === 'clear-score-history') {
      Store.set('ai_history', []);
      AIScorePage.onEnter();
      Toast.show('History cleared.', 'info');
      return;
    }

    // ── EMAIL GEN ──
    if (action === 'run-email-gen') {
      e.preventDefault();
      EmailGenPage.generate();
      return;
    }
    if (action === 'regenerate-email') { EmailGenPage.generate(); return; }
    if (action === 'copy-email')       { EmailGenPage.copyEmail(); return; }
    if (action === 'save-email-draft') { Toast.show('Saved to drafts.', 'success'); return; }
    if (action === 'add-email-to-campaign') { Toast.show('Email added to campaign!', 'success'); return; }

    // ── CAMPAIGNS ──
    if (action === 'open-new-campaign-modal') { CampaignsPage.openNewCampaignModal(); return; }
    if (action === 'view-campaign')   { CampaignsPage.viewCampaign(parseInt(target.dataset.campaignId)); return; }
    if (action === 'pause-campaign')  { CampaignsPage.pauseCampaign(parseInt(target.dataset.campaignId)); return; }
    if (action === 'resume-campaign') { CampaignsPage.resumeCampaign(parseInt(target.dataset.campaignId)); return; }
    if (action === 'launch-campaign') { CampaignsPage.launchCampaign(parseInt(target.dataset.campaignId)); return; }
    if (action === 'delete-campaign') { CampaignsPage.deleteCampaign(parseInt(target.dataset.campaignId)); return; }
    if (action === 'export-campaign-report') { Toast.show('Campaign report exported.', 'success'); Modal.close(); return; }

    // ── SETTINGS ──
    if (action === 'save-language-settings')  { SettingsPage.saveLanguage(); return; }
    if (action === 'save-workspace-settings') { SettingsPage.saveWorkspace(); return; }
    if (action === 'save-api-keys')           { SettingsPage.saveApiKeys(); return; }
    if (action === 'save-smtp-settings')      { SettingsPage.saveSMTP(); return; }
    if (action === 'test-smtp')               { SettingsPage.testSMTP(); return; }
    if (action === 'invite-team-member')      { Toast.show(I18n.t('inviteSent'), 'success'); return; }
    if (action === 'remove-team-member')      {
      Modal.confirm('Remove this team member?', 'Remove Member', () => {
        target.closest('.settings-row')?.remove();
        Toast.show('Member removed.', 'info');
      });
      return;
    }

    // ── PROFILE ──
    if (action === 'save-profile')    { ProfilePage.saveProfile(); return; }
    if (action === 'change-password') { ProfilePage.changePassword(); return; }
    if (action === 'delete-account')  { ProfilePage.deleteAccount(); return; }
    if (action === 'enable-2fa')      { Toast.show('Two-factor authentication coming soon.', 'info'); return; }
    if (action === 'change-avatar')   { Toast.show('Avatar upload coming soon.', 'info'); return; }

    // ── BILLING ──
    if (action === 'select-plan')          { BillingPage.selectPlan(target.dataset.plan); return; }
    if (action === 'open-upgrade-modal')   { BillingPage.selectPlan('agency'); return; }
    if (action === 'manage-subscription')  { Toast.show('Opening billing portal…', 'info'); return; }
    if (action === 'download-invoice')     { BillingPage.downloadInvoice(target.dataset.invoice); return; }

    // ── INTEGRATIONS ──
    if (action === 'connect-integration')    { IntegrationsPage.connect(target.dataset.integration); return; }
    if (action === 'disconnect-integration') { IntegrationsPage.disconnect(target.dataset.integration); return; }
    if (action === 'integration-settings')   { IntegrationsPage.settings(target.dataset.integration); return; }

    // ── MISC ──
    if (action === 'export-report')           { Toast.show(I18n.t('exportStarted'), 'info'); return; }
    if (action === 'open-find-leads')         { Router.go('ai-search'); return; }
    if (action === 'copy-api-key')            { UI.copyText('lp_live_sk_8f2a9b3c4d5e6f7g8h9i0j...').then(() => Toast.show(I18n.t('apiKeyCopied'), 'success')); return; }
    if (action === 'regenerate-api-key')      { Toast.show('New API key generated.', 'success'); return; }
    if (action === 'mark-all-read')           { UI.hide(document.getElementById('notif-dot')); Toast.show('All notifications read.', 'info'); document.getElementById('notif-menu')?.classList.remove('open'); return; }
    if (action === 'view-all-notifications')  { Toast.show('Notification centre coming soon.', 'info'); return; }
    if (action === 'view-all-activity')       { Toast.show('Full activity log coming soon.', 'info'); return; }
    if (action === 'open-lead')               { Router.go('leads'); return; }
    if (action === 'change-analytics-range')  { Charts.initAnalyticsCharts(); return; }
    if (action === 'export-analytics')        { Toast.show(I18n.t('exportStarted'), 'info'); return; }
    if (action === 'export-email-chart')      { Toast.show(I18n.t('exportStarted'), 'info'); return; }
    if (action === 'open-docs')               { window.open('https://docs.leadpilot.io', '_blank', 'noopener'); return; }
    if (action === 'open-support')            { Router.go('settings'); return; }
    if (action === 'open-privacy')            { Toast.show('Opening privacy policy…', 'info'); return; }
    if (action === 'open-terms')              { Toast.show('Opening terms of service…', 'info'); return; }
    if (action === 'export-campaign-draft')   { Toast.show('Draft saved.', 'success'); return; }

    // ── DROPDOWN TRIGGERS ──
    const ddId = target.dataset.dropdown;
    if (ddId) {
      e.stopPropagation();
      Dropdown.toggle(ddId);
      return;
    }
  });

  // ── Lead row checkbox delegation ──
  document.addEventListener('change', e => {
    // Notification toggles
    if (e.target.closest('#settings-tab-notifications')) {
      SettingsPage.saveNotifications();
      return;
    }
    // Team role changes
    if (e.target.dataset.action === 'change-member-role') {
      Toast.show('Role updated.', 'success');
      return;
    }
    // Lead row checkbox
    if (e.target.classList.contains('lead-row-check')) {
      const id = parseInt(e.target.dataset.leadId);
      // We need selectedIds from LeadsPage — expose via window for simplicity
      // In a real app, use an event bus
      return;
    }
    // Analytics range
    if (e.target.id === 'analytics-date-range') {
      Charts.initAnalyticsCharts();
      return;
    }
  });

  // ── Settings tab nav ──
  document.querySelector('.settings-nav-panel')?.addEventListener('click', e => {
    const item = e.target.closest('[data-settings-tab]');
    if (item) SettingsPage.switchTab(item.dataset.settingsTab);
  });

  // ── Email type tabs ──
  document.getElementById('email-type-tabs')?.addEventListener('click', e => {
    const tab = e.target.closest('[data-email-type]');
    if (tab) EmailGenPage.showEmail(tab.dataset.emailType);
  });

  // ── Chart range tabs ──
  document.getElementById('chart-range-tabs')?.addEventListener('click', e => {
    const tab = e.target.closest('[data-range]');
    if (!tab) return;
    document.querySelectorAll('#chart-range-tabs .lp-tab').forEach(t => {
      t.classList.toggle('active', t === tab);
      t.setAttribute('aria-selected', String(t === tab));
    });
    const range = tab.dataset.range;
    const dataMap = {
      '7d':  { labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], values:[38,52,45,67,58,29,43]  },
      '30d': { labels:['W1','W2','W3','W4'],                       values:[210,290,340,420]        },
      '90d': { labels:['Aug','Sep','Oct','Nov','Dec','Jan'],        values:[120,185,210,290,340,420]},
    };
    const d = dataMap[range] || dataMap['7d'];
    Charts.renderBar('chart-lead-growth-canvas', {}, { ...d, color:'var(--blue)', height:140 });
  });

  // ── Profile form submit ──
  document.getElementById('profile-form')?.addEventListener('submit', e => {
    e.preventDefault();
    ProfilePage.saveProfile();
  });

  // ── Password form submit ──
  document.getElementById('password-form')?.addEventListener('submit', e => {
    e.preventDefault();
    ProfilePage.changePassword();
  });

  // ── AI score form submit ──
  document.getElementById('ai-score-form')?.addEventListener('submit', e => {
    e.preventDefault();
    AIScorePage.runScore();
  });

  // ── Email gen form submit ──
  document.getElementById('email-gen-form')?.addEventListener('submit', e => {
    e.preventDefault();
    EmailGenPage.generate();
  });

  // ── Global search ──
  document.getElementById('global-search')?.addEventListener('input', UI.debounce(e => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) return;
    // Minimal inline search suggestion
    const leads = Store.get('leads') || [];
    const results = leads.filter(l => l.company.toLowerCase().includes(q) || l.email.toLowerCase().includes(q)).slice(0, 5);
    const dd = document.getElementById('search-results-dropdown');
    if (!dd) return;
    if (results.length === 0) { dd.hidden = true; return; }
    dd.innerHTML = results.map(l => `
      <button type="button" class="lp-dropdown-item" data-action="analyze-lead" data-lead-id="${l.id}" style="flex-direction:column;align-items:flex-start;gap:1px">
        <span style="font-weight:600;font-size:12px">${UI.escape(l.company)}</span>
        <span class="lp-text-xs lp-text-muted">${UI.escape(l.industry)} · ${UI.escape(l.country)}</span>
      </button>`).join('');
    dd.hidden = false;
  }));

  document.getElementById('global-search')?.addEventListener('blur', () => {
    setTimeout(() => {
      const dd = document.getElementById('search-results-dropdown');
      if (dd) dd.hidden = true;
    }, 200);
  });

  // ── Keyboard navigation ──
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      Modal.close();
      Dropdown.closeAll();
    }
    // Ctrl/Cmd + K — focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('global-search')?.focus();
    }
    // Ctrl/Cmd + / — open AI search
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      Router.go('ai-search');
    }
  });

  // ── Mobile sidebar ──
  document.getElementById('btn-mobile-menu')?.addEventListener('click', () => {
    const sidebar = document.getElementById('lp-sidebar');
    sidebar?.classList.toggle('open');
  });

  document.getElementById('lp-sidebar-overlay')?.addEventListener('click', () => {
    document.getElementById('lp-sidebar')?.classList.remove('open');
  });

  // ── Leads page: wire filter form once leads page is active ──
  LeadsPage.wireFilters();
}

/* ============================================================
   IMPORT MODAL
   ============================================================ */
function openImportModal() {
  Modal.open(`
    <div class="lp-modal-header">
      <h2 class="lp-modal-title">Import Leads</h2>
      <button type="button" class="btn btn-ghost btn-sm btn-icon" id="imp-close">✕</button>
    </div>
    <div class="lp-modal-body">
      <div id="imp-drop" style="border:2px dashed var(--gray-200);border-radius:var(--r);padding:40px;text-align:center;cursor:pointer;transition:all 0.15s" tabindex="0" role="button" aria-label="Drop CSV file here">
        <div style="font-size:36px;margin-bottom:12px" aria-hidden="true">📁</div>
        <div style="font-weight:600;margin-bottom:4px">Drop your CSV file here</div>
        <div class="lp-text-sm lp-text-muted">or click to browse — supports CSV, XLSX</div>
        <input type="file" id="imp-file" accept=".csv,.xlsx,.xls" style="display:none" aria-label="Select file to import" />
      </div>
      <div class="lp-text-xs lp-text-muted lp-mt-2">
        Required columns: <strong>company, email</strong> — Optional: contact, phone, industry, country, website
      </div>
    </div>
    <div class="lp-modal-footer">
      <button type="button" class="btn btn-secondary" id="imp-cancel">Cancel</button>
      <button type="button" class="btn btn-primary" id="imp-confirm">Import</button>
    </div>`);

  document.getElementById('imp-close')?.addEventListener('click', Modal.close);
  document.getElementById('imp-cancel')?.addEventListener('click', Modal.close);

  const drop = document.getElementById('imp-drop');
  const fileInput = document.getElementById('imp-file');

  drop?.addEventListener('click', () => fileInput?.click());
  drop?.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') fileInput?.click(); });
  drop?.addEventListener('dragover', e => { e.preventDefault(); drop.style.borderColor = 'var(--blue)'; drop.style.background = 'var(--blue-light)'; });
  drop?.addEventListener('dragleave', () => { drop.style.borderColor = ''; drop.style.background = ''; });
  drop?.addEventListener('drop', e => { e.preventDefault(); handleImportFile(e.dataTransfer.files[0]); });
  fileInput?.addEventListener('change', () => handleImportFile(fileInput.files[0]));

  document.getElementById('imp-confirm')?.addEventListener('click', () => {
    // Simulate import of 47 leads
    simulateImport(47);
  });
}

function handleImportFile(file) {
  if (!file) return;
  // ⚡ BACKEND: parse CSV server-side and return lead objects
  const ext = file.name.split('.').pop().toLowerCase();
  if (!['csv','xlsx','xls'].includes(ext)) {
    Toast.show('Please upload a CSV or Excel file.', 'error');
    return;
  }
  const n = Math.floor(Math.random() * 150) + 20;
  simulateImport(n);
}

function simulateImport(count) {
  Modal.close();
  Toast.show(I18n.t('importSuccess', count), 'success');
  // Update total count display
  const totalEl = document.getElementById('leads-total');
  if (totalEl) totalEl.textContent = (parseInt(totalEl.textContent.replace(/,/g,'')) + count).toLocaleString();
  UI.setText('#nav-leads-count', count + (Store.get('leads')?.length || 0));
}

/* ============================================================
   RESPONSIVE — mobile menu visibility
   ============================================================ */
function handleResponsive() {
  const mobileBtn = document.getElementById('btn-mobile-menu');
  if (!mobileBtn) return;
  const check = () => {
    const isMobile = window.innerWidth <= 900;
    mobileBtn.style.display = isMobile ? 'flex' : 'none';
    const overlay = document.getElementById('lp-sidebar-overlay');
    if (overlay) overlay.hidden = !isMobile;
  };
  check();
  window.addEventListener('resize', UI.debounce(check, 100));
}

/* ============================================================
   FOOTER
   ============================================================ */
function initFooter() {
  UI.setText('#footer-version', `${CONFIG.appName} v${CONFIG.version}`);
}

/* ============================================================
   INITIALISE — entry point
   ============================================================ */
function init() {
  // 1. Seed localStorage with demo data
  Store.seed();

  // 2. Load user and reflect in UI
  Auth.refreshUserUI(Auth.getUser());

  // 3. Apply saved language
  const savedLang = Store.get('settings')?.language || CONFIG.defaultLang;
  if (savedLang !== CONFIG.defaultLang) I18n.setLang(savedLang);

  // 4. Wire all global events
  attachGlobalEvents();

  // 5. Responsive handler
  handleResponsive();

  // 6. Footer
  initFooter();

  // 7. Route to correct page (from URL hash)
  Router.initFromHash();

  // 8. Log to console (remove in production)
  console.log(`%c${CONFIG.appName} v${CONFIG.version} loaded.`, 'color:#2563EB;font-weight:700;font-size:14px');
  console.log('localStorage keys:', Object.keys(localStorage).filter(k => k.startsWith(CONFIG.storagePrefix)));
}

// Boot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
