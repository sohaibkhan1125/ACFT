# TinyMCE Setup Instructions

## Getting a TinyMCE API Key

To use the rich text editor in the HomePage Contact Management section, you need to get a free TinyMCE API key.

### Steps:

1. Go to [https://www.tiny.cloud/](https://www.tiny.cloud/)
2. Sign up for a free account
3. Create a new app/project
4. Get your API key from the dashboard
5. Add the API key to your environment variables

### Environment Setup:

Create a `.env` file in the root of your project (same level as package.json) and add:

```
REACT_APP_TINYMCE_API_KEY=your_api_key_here
```

### Alternative (Development Only):

If you don't want to set up an API key for development, the editor will work with limitations using the 'no-api-key' mode. However, for production, you should use a proper API key.

### Features Available:

- Rich text formatting (bold, italic, colors)
- Lists (bulleted and numbered)
- Links and images
- Tables
- Code blocks
- Full-screen editing
- Word count
- And more!

The editor is configured to be user-friendly with a clean interface and all necessary formatting tools for creating professional contact content.
