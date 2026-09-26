/**
 * DAWN SMOLLEN FOR PARK BOARD AREA 2 - MAIN CONTROLLER (LIGHT MODE EXCLUSIVE)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTabsFromHash();
});

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

  // Update URL Hash or Clean Root
  const rootPath = window.location.pathname.replace(/index\.html$/, '');
  if (tabName === 'about') {
    if (history.pushState) {
      history.pushState(null, document.title, rootPath || '/');
    } else {
      location.hash = '';
    }
  } else {
    if (history.pushState) {
      history.pushState(null, null, '#' + tabName);
    } else {
      location.hash = '#' + tabName;
    }
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
 * Go to Site Root / (clears hash from URL and resets to home view)
 * @param {Event} e
 */
function goToRoot(e) {
  if (e) {
    e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }

  // Hide all tab panes
  const allPanes = document.querySelectorAll('.tab-pane');
  allPanes.forEach(pane => pane.classList.remove('active'));

  // Deactivate all nav tab buttons
  const allTabs = document.querySelectorAll('.nav-tab');
  allTabs.forEach(btn => btn.classList.remove('active'));

  // Activate About pane & nav button
  const aboutPane = document.getElementById('aboutTab');
  if (aboutPane) aboutPane.classList.add('active');
  
  const aboutBtn = document.querySelector('.nav-tab[data-tab="about"]');
  if (aboutBtn) aboutBtn.classList.add('active');

  // Set URL strictly to clean site root '/'
  const rootPath = window.location.pathname.replace(/index\.html$/, '');
  if (window.history.pushState) {
    window.history.pushState(null, document.title, rootPath || '/');
  } else {
    window.location.hash = '';
  }

  // Scroll smoothly to top of page
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile nav if open
  const navMenu = document.getElementById('navMenu');
  if (navMenu && navMenu.classList.contains('mobile-open')) {
    navMenu.classList.remove('mobile-open');
  }

  return false;
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
