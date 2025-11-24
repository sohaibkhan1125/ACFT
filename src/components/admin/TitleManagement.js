import React, { useState, useEffect } from 'react';

const TitleManagement = () => {
  const [websiteTitle, setWebsiteTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load existing title from localStorage
    const loadSettings = () => {
      try {
        const savedTitle = localStorage.getItem('websiteTitle');
        if (savedTitle) {
          setWebsiteTitle(savedTitle);
        }
      } catch (error) {
        console.warn('Error loading settings from localStorage:', error);
      }
    };

    loadSettings();

    // Listen for storage changes from other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'websiteTitle') {
        setWebsiteTitle(e.newValue || '');
        setMessage('Title updated from another tab ✅');
        setTimeout(() => setMessage(''), 3000);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Empty dependency array to run only once

  const handleSaveTitle = async () => {
    try {
      setSaving(true);
      setMessage('');

      // Save to localStorage
      localStorage.setItem('websiteTitle', websiteTitle);
      
      // Update document title
      if (websiteTitle) {
        document.title = websiteTitle;
      }
      
      // Update DOM elements directly
      const navbarTitles = document.querySelectorAll('.navbar-title, [data-title="navbar"]');
      const footerTitles = document.querySelectorAll('.footer-title, [data-title="footer"]');
      
      navbarTitles.forEach(element => {
        element.textContent = websiteTitle;
      });
      
      footerTitles.forEach(element => {
        element.textContent = websiteTitle;
      });
      
      // Dispatch custom event for same-tab updates
      window.dispatchEvent(new CustomEvent('titleUpdated', {
        detail: { title: websiteTitle }
      }));

      setMessage('✅ Title saved successfully! Changes applied instantly.');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.warn('Error saving title:', error);
      setMessage('❌ Error saving title. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Title Management</h2>
        <p className="text-gray-600">Manage your website title across all pages.</p>
      </div>

      {/* Title Management Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Website Title</h3>
          <p className="text-sm text-gray-600">
            Update your website title that appears in the browser tab and navigation.
          </p>
        </div>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website Title
          </label>
          <div className="relative">
            <input
              type="text"
              value={websiteTitle}
              onChange={(e) => setWebsiteTitle(e.target.value)}
              onInput={(e) => setWebsiteTitle(e.target.value)}
              placeholder="Enter your website title..."
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
              autoComplete="off"
              spellCheck="false"
            />
            {websiteTitle && (
              <button
                type="button"
                onClick={() => setWebsiteTitle('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Clear title"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Current Title Display */}
        {websiteTitle && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Current Title:</h4>
            <p className="text-sm text-gray-600">"{websiteTitle}"</p>
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSaveTitle}
          disabled={saving}
          className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            saving
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:shadow-md'
          }`}
        >
          {saving ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
              Saving...
            </div>
          ) : (
            'Save Title'
          )}
        </button>
      </div>

      {/* Status Messages */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('Error') || message.includes('❌')
            ? 'bg-red-50 border border-red-200 text-red-700'
            : 'bg-green-50 border border-green-200 text-green-700'
        }`}>
          <div className="flex">
            <div className="flex-shrink-0">
              <span className={message.includes('Error') || message.includes('❌') ? 'text-red-400' : 'text-green-400'}>
                {message.includes('Error') || message.includes('❌') ? '❌' : '✅'}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm">{message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Information Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-blue-400 text-xl">ℹ️</span>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blue-800">
              About Title Management
            </h4>
            <div className="text-sm text-blue-700 mt-2 space-y-1">
              <p>• Title changes update the browser tab and navigation</p>
              <p>• All changes are saved to localStorage for persistence</p>
              <p>• Updates sync automatically across all open tabs</p>
              <p>• Changes appear instantly without page refresh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleManagement;
