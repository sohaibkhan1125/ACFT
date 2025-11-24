/**
 * Specific override for Firebase WebChannel Blob errors
 * This targets the exact error patterns from webchannel_blob_es2018.js
 */

/**
 * Override Firebase WebChannel Blob error handling
 */
export function overrideWebchannelBlob() {
  // Override the specific Firebase WebChannel Blob error patterns
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  
  // Override console.error to catch webchannel_blob errors
  console.error = (...args) => {
    const message = args.join(' ');
    
    // Check for specific webchannel_blob error patterns
    if (
      (typeof message === 'string' && message.includes('user aborted')) ||
      (typeof message === 'string' && message.includes('request aborted')) ||
      (typeof message === 'string' && message.includes('signal is aborted')) ||
      (typeof message === 'string' && message.includes('AbortError')) ||
      (typeof message === 'string' && message.includes('webchannel')) ||
      (typeof message === 'string' && message.includes('webchannel_blob')) ||
      (typeof message === 'string' && message.includes('webchannel_blob_es2018')) ||
      args.some(arg => 
        arg && typeof arg === 'object' && (
          (arg.message && typeof arg.message === 'string' && arg.message.includes('user aborted')) ||
          (arg.message && typeof arg.message === 'string' && arg.message.includes('request aborted')) ||
          (arg.message && typeof arg.message === 'string' && arg.message.includes('signal is aborted')) ||
          arg.name === 'AbortError' ||
          (arg.stack && typeof arg.stack === 'string' && arg.stack.includes('webchannel')) ||
          (arg.stack && typeof arg.stack === 'string' && arg.stack.includes('webchannel_blob'))
        )
      )
    ) {
      console.log('Firebase WebChannel Blob error suppressed:', ...args);
      return;
    }
    
    originalConsoleError.apply(console, args);
  };

  // Override console.warn
  console.warn = (...args) => {
    const message = args.join(' ');
    
    if (
      (typeof message === 'string' && message.includes('user aborted')) ||
      (typeof message === 'string' && message.includes('request aborted')) ||
      (typeof message === 'string' && message.includes('signal is aborted')) ||
      (typeof message === 'string' && message.includes('AbortError')) ||
      (typeof message === 'string' && message.includes('webchannel')) ||
      (typeof message === 'string' && message.includes('webchannel_blob')) ||
      (typeof message === 'string' && message.includes('webchannel_blob_es2018')) ||
      args.some(arg => 
        arg && typeof arg === 'object' && (
          (arg.message && typeof arg.message === 'string' && arg.message.includes('user aborted')) ||
          (arg.message && typeof arg.message === 'string' && arg.message.includes('request aborted')) ||
          (arg.message && typeof arg.message === 'string' && arg.message.includes('signal is aborted')) ||
          arg.name === 'AbortError' ||
          (arg.stack && typeof arg.stack === 'string' && arg.stack.includes('webchannel')) ||
          (arg.stack && typeof arg.stack === 'string' && arg.stack.includes('webchannel_blob'))
        )
      )
    ) {
      console.log('Firebase WebChannel Blob warning suppressed:', ...args);
      return;
    }
    
    originalConsoleWarn.apply(console, args);
  };

  // Override window.onerror specifically for webchannel_blob
  const originalOnError = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    if (
      message && typeof message === 'string' && (
        message.includes('user aborted') ||
        message.includes('request aborted') ||
        message.includes('signal is aborted') ||
        message.includes('AbortError') ||
        message.includes('webchannel') ||
        message.includes('webchannel_blob') ||
        message.includes('webchannel_blob_es2018')
      )
    ) {
      console.log('Firebase WebChannel Blob window error suppressed:', message);
      return true;
    }
    
    if (originalOnError) {
      return originalOnError.call(this, message, source, lineno, colno, error);
    }
    
    return false;
  };

  // Override window.onunhandledrejection specifically for webchannel_blob
  const originalOnUnhandledRejection = window.onunhandledrejection;
  window.onunhandledrejection = function(event) {
    const error = event.reason;
    
    if (
      error && (
        (error.message && typeof error.message === 'string' && error.message.includes('user aborted')) ||
        (error.message && typeof error.message === 'string' && error.message.includes('request aborted')) ||
        (error.message && typeof error.message === 'string' && error.message.includes('signal is aborted')) ||
        error.name === 'AbortError' ||
        (error.stack && typeof error.stack === 'string' && error.stack.includes('webchannel')) ||
        (error.stack && typeof error.stack === 'string' && error.stack.includes('webchannel_blob'))
      )
    ) {
      console.log('Firebase WebChannel Blob unhandled rejection suppressed:', error.message);
      event.preventDefault();
      return;
    }
    
    if (originalOnUnhandledRejection) {
      return originalOnUnhandledRejection.call(this, event);
    }
  };

  // Override global error handler
  window.addEventListener('error', (event) => {
    const error = event.error;
    
    if (
      error && (
        (error.message && typeof error.message === 'string' && error.message.includes('user aborted')) ||
        (error.message && typeof error.message === 'string' && error.message.includes('request aborted')) ||
        (error.message && typeof error.message === 'string' && error.message.includes('signal is aborted')) ||
        error.name === 'AbortError' ||
        (error.stack && typeof error.stack === 'string' && error.stack.includes('webchannel')) ||
        (error.stack && typeof error.stack === 'string' && error.stack.includes('webchannel_blob'))
      )
    ) {
      console.log('Firebase WebChannel Blob global error suppressed:', error.message);
      event.preventDefault();
      return;
    }
  });

  // Override unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason;
    
    if (
      error && (
        (error.message && typeof error.message === 'string' && error.message.includes('user aborted')) ||
        (error.message && typeof error.message === 'string' && error.message.includes('request aborted')) ||
        (error.message && typeof error.message === 'string' && error.message.includes('signal is aborted')) ||
        error.name === 'AbortError' ||
        (error.stack && typeof error.stack === 'string' && error.stack.includes('webchannel')) ||
        (error.stack && typeof error.stack === 'string' && error.stack.includes('webchannel_blob'))
      )
    ) {
      console.log('Firebase WebChannel Blob promise rejection suppressed:', error.message);
      event.preventDefault();
      return;
    }
  });

  console.log('Firebase WebChannel Blob override initialized');
}

export default {
  overrideWebchannelBlob
};
