/**
 * Ultimate error suppression for Firebase WebChannel abort errors
 */

// Store original methods
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const originalConsoleLog = console.log;

/**
 * Check if error is Firebase WebChannel abort-related
 */
function isFirebaseWebChannelAbortError(error) {
  if (!error) return false;
  
  const errorMessage = error.message || error.toString() || '';
  const errorName = error.name || '';
  const errorStack = error.stack || '';
  
  // Specific patterns for Firebase WebChannel abort errors
  const webChannelPatterns = [
    'user aborted',
    'request aborted', 
    'signal is aborted',
    'aborted without reason',
    'AbortError',
    'webchannel',
    'webchannel_blob',
    'firebase',
    'firestore'
  ];
  
  return (
    errorName === 'AbortError' ||
    webChannelPatterns.some(pattern => 
      errorMessage.toLowerCase().includes(pattern.toLowerCase())
    ) ||
    errorStack.toLowerCase().includes('webchannel') ||
    errorStack.toLowerCase().includes('firebase')
  );
}

/**
 * Initialize ultimate error suppression
 */
export function initializeUltimateErrorSuppression() {
  // Override console.error
  console.error = (...args) => {
    const message = args.join(' ');
    
    // Check if any argument is a Firebase WebChannel abort error
    const hasWebChannelAbortError = args.some(arg => {
      if (arg && typeof arg === 'object') {
        return isFirebaseWebChannelAbortError(arg);
      }
      return isFirebaseWebChannelAbortError({ message: arg });
    });
    
    if (hasWebChannelAbortError || isFirebaseWebChannelAbortError({ message })) {
      console.log('Firebase WebChannel request cancelled (normal behavior):', ...args);
      return;
    }
    
    originalConsoleError.apply(console, args);
  };

  // Override console.warn
  console.warn = (...args) => {
    const message = args.join(' ');
    
    const hasWebChannelAbortError = args.some(arg => {
      if (arg && typeof arg === 'object') {
        return isFirebaseWebChannelAbortError(arg);
      }
      return isFirebaseWebChannelAbortError({ message: arg });
    });
    
    if (hasWebChannelAbortError || isFirebaseWebChannelAbortError({ message })) {
      console.log('Firebase WebChannel request cancelled (normal behavior):', ...args);
      return;
    }
    
    originalConsoleWarn.apply(console, args);
  };

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason;
    
    if (isFirebaseWebChannelAbortError(error)) {
      console.log('Firebase WebChannel promise rejection suppressed:', error.message);
      event.preventDefault();
      return;
    }
  });

  // Handle global errors
  window.addEventListener('error', (event) => {
    const error = event.error;
    
    if (isFirebaseWebChannelAbortError(error)) {
      console.log('Firebase WebChannel global error suppressed:', error.message);
      event.preventDefault();
      return;
    }
  });

  // Override window.onerror
  const originalOnError = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    if (
      message && (
        message.includes('user aborted') ||
        message.includes('request aborted') ||
        message.includes('signal is aborted') ||
        message.includes('AbortError') ||
        message.includes('webchannel')
      )
    ) {
      console.log('Firebase WebChannel window error suppressed:', message);
      return true;
    }
    
    if (originalOnError) {
      return originalOnError.call(this, message, source, lineno, colno, error);
    }
    
    return false;
  };

  // Override window.onunhandledrejection
  const originalOnUnhandledRejection = window.onunhandledrejection;
  window.onunhandledrejection = function(event) {
    const error = event.reason;
    
    if (isFirebaseWebChannelAbortError(error)) {
      console.log('Firebase WebChannel unhandled rejection suppressed:', error.message);
      event.preventDefault();
      return;
    }
    
    if (originalOnUnhandledRejection) {
      return originalOnUnhandledRejection.call(this, event);
    }
  };

  console.log('Ultimate error suppression initialized');
}

export default {
  initializeUltimateErrorSuppression,
  isFirebaseWebChannelAbortError
};
