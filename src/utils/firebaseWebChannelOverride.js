/**
 * Override Firebase WebChannel to suppress abort errors
 */

/**
 * Override Firebase WebChannel abort handling
 */
export function overrideFirebaseWebChannel() {
  // Override the global error handler to catch Firebase WebChannel errors
  const originalOnError = window.onerror;
  
  window.onerror = function(message, source, lineno, colno, error) {
    // Check if it's a Firebase WebChannel abort error
    if (
      message && (
        message.includes('user aborted') ||
        message.includes('request aborted') ||
        message.includes('signal is aborted') ||
        message.includes('AbortError') ||
        message.includes('webchannel')
      )
    ) {
      console.log('Firebase WebChannel abort error suppressed:', message);
      return true; // Prevent default error handling
    }
    
    // Call original error handler for other errors
    if (originalOnError) {
      return originalOnError.call(this, message, source, lineno, colno, error);
    }
    
    return false;
  };

  // Override unhandled promise rejections specifically for Firebase
  const originalOnUnhandledRejection = window.onunhandledrejection;
  
  window.onunhandledrejection = function(event) {
    const error = event.reason;
    
    if (error && (
      error.message?.includes('user aborted') ||
      error.message?.includes('request aborted') ||
      error.message?.includes('signal is aborted') ||
      error.message?.includes('AbortError') ||
      error.name === 'AbortError' ||
      error.stack?.includes('webchannel')
    )) {
      console.log('Firebase WebChannel promise rejection suppressed:', error.message);
      event.preventDefault();
      return;
    }
    
    // Call original handler for other rejections
    if (originalOnUnhandledRejection) {
      return originalOnUnhandledRejection.call(this, event);
    }
  };

  // Override console.error to catch Firebase WebChannel errors
  const originalConsoleError = console.error;
  
  console.error = function(...args) {
    const message = args.join(' ');
    
    if (
      message.includes('user aborted') ||
      message.includes('request aborted') ||
      message.includes('signal is aborted') ||
      message.includes('AbortError') ||
      message.includes('webchannel')
    ) {
      console.log('Firebase WebChannel error suppressed:', ...args);
      return;
    }
    
    originalConsoleError.apply(console, args);
  };

  console.log('Firebase WebChannel override initialized');
}

export default {
  overrideFirebaseWebChannel
};
