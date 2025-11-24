/**
 * TinyMCE Configuration
 * Handles TinyMCE editor configuration and API key management
 */

// TinyMCE API Key - You can get a free API key from https://www.tiny.cloud/
// For development, you can use 'no-api-key' but with limitations
const TINYMCE_API_KEY = process.env.REACT_APP_TINYMCE_API_KEY || 'no-api-key';

export const getTinyMCEConfig = () => ({
  apiKey: TINYMCE_API_KEY,
  init: {
    height: 400,
    menubar: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | blocks | ' +
      'bold italic forecolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | help',
    content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; }',
    branding: false,
    promotion: false,
    // Additional configuration for better UX
    setup: (editor) => {
      editor.on('change', () => {
        // Auto-save functionality can be added here
      });
    }
  }
});

export default TINYMCE_API_KEY;
