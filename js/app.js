'use strict';

/**
 * ProspectorAI - Landing Page & Main App Logic
 * Handles navigation, modals, dropdowns, language switching
 */

// ============================================================
// LANGUAGE TRANSLATIONS
// ============================================================
const TRANSLATIONS = {
  en: {
    features: 'Features',
    pricing: 'Pricing',
    faq: 'FAQ',
    demoTitle: 'Watch Demo',
    demoBody: 'Demo video will be available soon!',
    close: 'Close',
  },
  cs: {
    features: 'Funkce',
    pricing: 'Ceník',
    faq: 'FAQ',
    demoTitle: 'Sledovat demo',
    demoBody: 'Video demo bude brzy k dispozici!',
    close: 'Zavřít',
  },
  ru: {
    features: 'Функции',
    pricing: 'Цены',
    faq: 'FAQ',
    demoTitle: 'Смотреть демо',
    demoBody: 'Видео демо будет доступно скоро!',
    close: 'Закрыть',
  },
};

let currentLang = localStorage.getItem('lp_lang') || 'en';

// ============================================================
// TRANSLATE FUNCTION
// ============================================================
function t(key) {
  return (TRANSLATIONS[currentLang] || TRANSLATIONS.en)[key] || key;
}

// ============================================================
// PAGE NAVIGATION
// ============================================================
function showPage(pageName) {
  // Hide all pages
  const pages = document.querySelectorAll('[id^="page-"]');
  pages.forEach(page => page.classList.add('hidden'));

  // Show target page
  const targetPage = document.getElementById(`page-${pageName}`);
  if (targetPage) {
    targetPage.classList.remove('hidden');
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

// ============================================================
// SCROLL TO SECTION
// ============================================================
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ============================================================
// MODAL SYSTEM
// ============================================================
function showDemoModal() {
  const html = `
    <div class="modal-bg" id="demo-modal-bg" onclick="if(event.target.id === 'demo-modal-bg') closeDemoModal()">
      <div class="modal">
        <div class="modal-header">
          <h2 class="modal-title">${t('demoTitle')}</h2>
          <button class="btn btn-ghost btn-sm" onclick="closeDemoModal()" style="padding:6px 8px">✕</button>
        </div>
        <div class="modal-body" style="text-align:center;padding:40px">
          <div style="font-size:48px;margin-bottom:16px">🎬</div>
          <p style="color:var(--gray-600);font-size:14px">${t('demoBody')}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" onclick="closeDemoModal();">${t('close')}</button>
        </div>
      </div>
    </div>
  `;

  const container = document.getElementById('modal-container') || document.body;
  container.insertAdjacentHTML('beforeend', html);
  document.getElementById('demo-modal-bg').focus();
}

function closeDemoModal() {
  const modal = document.getElementById('demo-modal-bg');
  if (modal) {
    modal.style.transition = 'opacity 0.2s ease';
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 200);
  }
}

// ============================================================
// DROPDOWN TOGGLE
// ============================================================
function toggleDropdown(dropdownId) {
  const menu = document.getElementById(dropdownId);
  if (!menu) return;

  // Close all other dropdowns
  document.querySelectorAll('[id$="-dd"]').forEach(el => {
    if (el.id !== dropdownId && el.classList.contains('open')) {
      el.classList.remove('open');
    }
  });

  // Toggle current dropdown
  menu.classList.toggle('open');
}

// Close dropdowns when clicking outside
document.addEventListener('click', e => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('[id$="-dd"]').forEach(el => {
      el.classList.remove('open');
    });
  }
});

// ============================================================
// LANGUAGE SWITCHING
// ============================================================
function setLang(lang) {
  if (!TRANSLATIONS[lang]) return;
  
  currentLang = lang;
  localStorage.setItem('lp_lang', lang);
  
  // Update language label
  const langLabel = document.getElementById('lang-label');
  if (langLabel) {
    langLabel.textContent = lang.toUpperCase();
  }
  
  // Update current language in topbar
  const langBtnApp = document.getElementById('btn-lang');
  if (langBtnApp) {
    langBtnApp.textContent = `🌐 ${lang.toUpperCase()}`;
  }
  
  // Close dropdown
  const langDd = document.getElementById('lang-dd');
  if (langDd) langDd.classList.remove('open');
  
  // Show toast
  showToast('Language changed!', 'success');
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container') || document.body;
  
  const icons = {
    success: '✓',
    error: '✕',
    warn: '⚠',
    info: 'ℹ'
  };
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============================================================
// FAQ ACCORDION
// ============================================================
function toggleFaq(element) {
  const faqItem = element.closest('.faq-item');
  if (!faqItem) return;

  // Close other FAQ items
  document.querySelectorAll('.faq-item.open').forEach(item => {
    if (item !== faqItem) {
      item.classList.remove('open');
    }
  });

  // Toggle current item
  faqItem.classList.toggle('open');
}

// ============================================================
// NAVIGATION - LANDING PAGE BUTTONS
// ============================================================
function goToDashboard() {
  window.location.href = 'dashboard.html';
}

function goToLogin() {
  window.location.href = "login.html";
}

function goToRegister() {
  window.location.href = "register.html";
}

// ============================================================
// INITIALIZE ON PAGE LOAD
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Set initial language
  const langLabel = document.getElementById('lang-label');
  if (langLabel) {
    langLabel.textContent = currentLang.toUpperCase();
  }

  // Show landing page by default
  showPage('landing');

  console.log('% ProspectorAI App loaded', 'color:#2563EB;font-weight:700;font-size:14px');
});

// ============================================================
// HELPER: HTML ESCAPE
// ============================================================
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
function goToLogin() {
  window.location.href = "login.html";
}
function goToRegister() {
  window.location.href = "register.html";
}
