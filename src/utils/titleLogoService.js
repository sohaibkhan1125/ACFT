/**
 * Title and Logo Service
 * Manages website title and logo updates across all components
 */

const TITLE_KEY = 'websiteTitle';
const LOGO_KEY = 'websiteLogo';

/**
 * Initialize title and logo from localStorage on page load
 */
export const initializeTitleAndLogo = () => {
  try {
    // Load and apply title
    const savedTitle = localStorage.getItem(TITLE_KEY);
    if (savedTitle) {
      document.title = savedTitle;
    }

    // Load and apply logo
    const savedLogo = localStorage.getItem(LOGO_KEY);
    if (savedLogo) {
      updateLogoInDOM(savedLogo);
    }
  } catch (error) {
    console.warn('Error initializing title and logo:', error);
  }
};

/**
 * Update logo in all DOM elements
 */
export const updateLogoInDOM = (logoUrl) => {
  try {
    // Update navbar logo
    const navbarLogo = document.querySelector('.navbar-logo, .header-logo, [data-logo="navbar"]');
    if (navbarLogo) {
      navbarLogo.src = logoUrl;
      navbarLogo.style.display = logoUrl ? 'block' : 'none';
    }

    // Update footer logo
    const footerLogo = document.querySelector('.footer-logo, [data-logo="footer"]');
    if (footerLogo) {
      footerLogo.src = logoUrl;
      footerLogo.style.display = logoUrl ? 'block' : 'none';
    }

    // Update any other logo elements
    const allLogos = document.querySelectorAll('[data-logo]');
    allLogos.forEach(logo => {
      logo.src = logoUrl;
      logo.style.display = logoUrl ? 'block' : 'none';
    });
  } catch (error) {
    console.warn('Error updating logo in DOM:', error);
  }
};

/**
 * Update title in all DOM elements
 */
export const updateTitleInDOM = (title) => {
  try {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update navbar title
    const navbarTitle = document.querySelector('.navbar-title, .header-title, [data-title="navbar"]');
    if (navbarTitle) {
      navbarTitle.textContent = title;
    }

    // Update footer title
    const footerTitle = document.querySelector('.footer-title, [data-title="footer"]');
    if (footerTitle) {
      footerTitle.textContent = title;
    }

    // Update any other title elements
    const allTitles = document.querySelectorAll('[data-title]');
    allTitles.forEach(titleElement => {
      titleElement.textContent = title;
    });
  } catch (error) {
    console.warn('Error updating title in DOM:', error);
  }
};

/**
 * Set up event listeners for real-time updates
 */
export const setupTitleLogoListeners = () => {
  // Listen for custom events (same-tab updates)
  window.addEventListener('titleUpdated', (e) => {
    updateTitleInDOM(e.detail.title);
  });

  window.addEventListener('logoUpdated', (e) => {
    updateLogoInDOM(e.detail.logoUrl);
  });

  // Listen for storage changes (cross-tab updates)
  window.addEventListener('storage', (e) => {
    if (e.key === TITLE_KEY && e.newValue) {
      updateTitleInDOM(e.newValue);
    }
    if (e.key === LOGO_KEY) {
      updateLogoInDOM(e.newValue);
    }
  });
};

/**
 * Get current title from localStorage
 */
export const getCurrentTitle = () => {
  try {
    return localStorage.getItem(TITLE_KEY) || '';
  } catch (error) {
    console.warn('Error getting current title:', error);
    return '';
  }
};

/**
 * Get current logo from localStorage
 */
export const getCurrentLogo = () => {
  try {
    return localStorage.getItem(LOGO_KEY) || '';
  } catch (error) {
    console.warn('Error getting current logo:', error);
    return '';
  }
};

export default {
  initializeTitleAndLogo,
  updateLogoInDOM,
  updateTitleInDOM,
  setupTitleLogoListeners,
  getCurrentTitle,
  getCurrentLogo
};
