import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { db, doc, getDoc, setDoc, onSnapshot } from '../../firebase/firebase';

const HomePageContactManagement = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Firebase document reference
  const contactDocRef = doc(db, 'homepage', 'contactContent');

  useEffect(() => {
    // Load existing content
    const loadContent = async () => {
      try {
        const docSnap = await getDoc(contactDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContent(data.content || '');
          setIsVisible(data.isVisible !== false); // Default to true if not set
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading contact content:', error);
        setMessage('Error loading content. Please try again.');
        setLoading(false);
      }
    };

    loadContent();

    // Set up real-time listener for changes
    const unsubscribe = onSnapshot(contactDocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setContent(data.content || '');
        setIsVisible(data.isVisible !== false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      setSaving(false);
      setMessage('Save operation timed out. Please try again.');
      setTimeout(() => setMessage(''), 5000);
    }, 10000); // 10 second timeout

    try {
      // First, try to save to Firebase (primary storage)
      await setDoc(contactDocRef, {
        content: content,
        isVisible: isVisible,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin'
      }, { merge: true });

      console.log('Firebase save successful');

      // Also try to save to backend API if available
      try {
        const controller = new AbortController();
        const timeoutId2 = setTimeout(() => controller.abort(), 5000); // 5 second timeout for API

        const response = await fetch('/api/save-homepage-content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: content,
            isVisible: isVisible,
            lastUpdated: new Date().toISOString(),
            updatedBy: 'admin'
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId2);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Backend save successful:', result);
      } catch (apiError) {
        if (apiError.name === 'AbortError') {
          console.warn('Backend API request timed out, using Firebase only');
        } else {
          console.warn('Backend API not available, using Firebase only:', apiError.message);
        }
        // Continue with Firebase save even if API fails
      }

      clearTimeout(timeoutId);
      setMessage('Content saved successfully!');
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('Error saving content:', error);
      
      let errorMessage = 'Failed to save content. Please try again.';
      if (error.code === 'permission-denied') {
        errorMessage = 'Permission denied. Please check your Firebase permissions.';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Service temporarily unavailable. Please try again later.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please try again.';
      }
      
      setMessage(errorMessage);
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setSaving(false);
    }
  };

  const handleContentChange = (content) => {
    setContent(content);
    setHasUnsavedChanges(true);
  };

  const handleVisibilityToggle = () => {
    setIsVisible(!isVisible);
  };

  const handleClearEditor = () => {
    if (content && hasUnsavedChanges) {
      const confirmed = window.confirm(
        'Are you sure you want to clear the editor? All unsaved changes will be lost.'
      );
      if (!confirmed) return;
    }
    setContent('');
    setHasUnsavedChanges(false);
    setMessage('Editor cleared.');
    setTimeout(() => setMessage(''), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">HomePage Contact Management</h2>
            <p className="text-gray-600">
              Manage the contact content that appears on the homepage above the FAQ section.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {lastSaved && (
              <div className="text-sm text-gray-500">
                Last saved: {lastSaved.toLocaleTimeString()}
              </div>
            )}
            {hasUnsavedChanges && (
              <div className="flex items-center space-x-1 text-orange-600 text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Unsaved changes</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Visibility Toggle */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Content Visibility</h3>
            <p className="text-sm text-gray-600">
              Toggle whether the contact content is displayed on the homepage
            </p>
          </div>
          <button
            onClick={handleVisibilityToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isVisible ? 'bg-yellow-500' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isVisible ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <div className="mt-2">
          <span className={`text-sm font-medium ${isVisible ? 'text-green-600' : 'text-gray-500'}`}>
            {isVisible ? 'Content is visible on homepage' : 'Content is hidden from homepage'}
          </span>
        </div>
      </div>

      {/* Rich Text Editor */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Content Editor</h3>
        <p className="text-sm text-gray-600 mb-4">
          Use the editor below to create and format your contact content. This content will appear above the FAQ section on the homepage.
        </p>
        
        <div className="rounded-lg border bg-white p-2">
          <Editor
            apiKey='f08kw0ml5k8dqbktq0eeba9walbjg5fs9vwobqtcgwzcant5'
            value={content}
            onEditorChange={handleContentChange}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker',
                'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions',
                'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss',
                'markdown', 'importword', 'exportword', 'exportpdf'
              ],
              toolbar:
                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject('See docs to implement AI Assistant')
                ),
              uploadcare_public_key: '194afd35149e4476304d',
            }}
            initialValue="Welcome to TinyMCE!"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSave}
              disabled={saving || !hasUnsavedChanges}
              className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                saving
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : hasUnsavedChanges
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {saving && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              <span>
                {saving 
                  ? 'Saving...' 
                  : hasUnsavedChanges 
                  ? 'Save Content' 
                  : 'No changes to save'
                }
              </span>
            </button>
            
            <button
              onClick={handleClearEditor}
              disabled={saving}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear Editor
            </button>
          </div>

          {message && (
            <div className={`flex items-center space-x-2 text-sm font-medium ${
              message.includes('Error') || message.includes('Failed') ? 'text-red-600' : 'text-green-600'
            }`}>
              {message.includes('Error') || message.includes('Failed') ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              <span>{message}</span>
            </div>
          )}
        </div>
      </div>

      {/* Preview Section */}
      {content && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Preview</h3>
          <p className="text-sm text-gray-600 mb-4">
            This is how your content will appear on the homepage:
          </p>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Instructions</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use the rich text editor to format your contact content</li>
          <li>• The content will appear above the FAQ section on the homepage</li>
          <li>• Changes are saved automatically to the database</li>
          <li>• Use the visibility toggle to show/hide the content</li>
          <li>• You can include links, images, and formatted text</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePageContactManagement;
