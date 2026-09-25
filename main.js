/**
 * DAWN SMOLLEN FOR PARK BOARD AREA 2 - MAIN CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initTabsFromHash();
});

const SUN_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`;
const MOON_SVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;

/**
 * Switch Active Tab Pane
 * @param {string} tabName - 'about' | 'priorities' | 'news' | 'support' | 'map'
 */
function switchTab(tabName) {
  const targetPane = document.getElementById(tabName + 'Tab');
  if (!targetPane) return;

  // Hide all tab panes
  const allPanes = document.querySelectorAll('.tab-pane');
  allPanes.forEach(pane => pane.classList.remove('active'));

  // Deactivate all nav tab buttons
  const allTabs = document.querySelectorAll('.nav-tab');
  allTabs.forEach(btn => btn.classList.remove('active'));

  // Activate selected pane & nav button
  targetPane.classList.add('active');
  
  const activeBtn = document.querySelector(`.nav-tab[data-tab="${tabName}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  // Update URL Hash
  if (history.pushState) {
    history.pushState(null, null, '#' + tabName);
  } else {
    location.hash = '#' + tabName;
  }

  // Close mobile nav if open
  const navMenu = document.getElementById('navMenu');
  if (navMenu && navMenu.classList.contains('mobile-open')) {
    navMenu.classList.remove('mobile-open');
  }

  // Scroll smoothly to top of main content
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    const yOffset = -90; 
    const y = mainContent.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

/**
 * Handle initial hash navigation on page load
 */
function initTabsFromHash() {
  const hash = window.location.hash.replace('#', '');
  const validTabs = ['about', 'priorities', 'news', 'support', 'map'];
  
  if (hash && validTabs.includes(hash)) {
    switchTab(hash);
  }
}

/**
 * Theme Toggle (Dark / Light Mode)
 */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggleBtn) themeToggleBtn.innerHTML = SUN_SVG;
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggleBtn) themeToggleBtn.innerHTML = MOON_SVG;
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      themeToggleBtn.innerHTML = newTheme === 'dark' ? SUN_SVG : MOON_SVG;
    });
  }
}

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });
  }
}
