import React, { useState, useEffect } from 'react';
import { initializeTitleAndLogo, setupTitleLogoListeners } from '../utils/titleLogoService';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [websiteTitle, setWebsiteTitle] = useState('ACFT CALCULATOR');
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    // Initialize title and logo from localStorage
    initializeTitleAndLogo();
    setupTitleLogoListeners();

    // Load current values
    const savedTitle = localStorage.getItem('websiteTitle');
    const savedLogo = localStorage.getItem('websiteLogo');
    
    if (savedTitle) {
      setWebsiteTitle(savedTitle);
    }
    if (savedLogo) {
      setLogoUrl(savedLogo);
    }

    // Listen for updates
    const handleTitleUpdate = (e) => {
      setWebsiteTitle(e.detail.title || 'ACFT CALCULATOR');
    };

    const handleLogoUpdate = (e) => {
      setLogoUrl(e.detail.logoUrl || '');
    };

    window.addEventListener('titleUpdated', handleTitleUpdate);
    window.addEventListener('logoUpdated', handleLogoUpdate);

    return () => {
      window.removeEventListener('titleUpdated', handleTitleUpdate);
      window.removeEventListener('logoUpdated', handleLogoUpdate);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex-shrink-0 flex items-center">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Website Logo" 
                className="h-8 w-auto mr-3 navbar-logo"
                data-logo="navbar"
              />
            ) : null}
            <h1 className="text-xl font-bold text-yellow-400 navbar-title" data-title="navbar">
              {websiteTitle}
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('calculator')}
              className="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Calculator
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              How it Works
            </button>
            <button
              onClick={() => scrollToSection('standards')}
              className="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Standards
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-yellow-400 p-2"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 rounded-lg mt-2">
              <button
                onClick={() => scrollToSection('calculator')}
                className="text-gray-300 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Calculator
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-gray-300 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                How it Works
              </button>
              <button
                onClick={() => scrollToSection('standards')}
                className="text-gray-300 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Standards
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-gray-300 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                FAQ
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
