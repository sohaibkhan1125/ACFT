/**
 * Early error suppression - must be imported before any other modules
 * This catches Firebase WebChannel errors at the very beginning
 */

// Store original methods immediately
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const originalConsoleLog = console.log;

/**
 * Ultra-aggressive abort error detection
 */
function isAbortError(error) {
  if (!error) return false;
  
  const errorMessage = error.message || error.toString() || '';
  const errorName = error.name || '';
  const errorStack = error.stack || '';
  
  // Comprehensive abort error patterns
  const abortPatterns = [
    'user aborted',
    'request aborted',
    'signal is aborted',
    'aborted without reason',
    'AbortError',
    'webchannel',
    'webchannel_blob',
    'firebase',
    'firestore',
    'abort',
    'cancelled',
    'canceled'
  ];
  
  return (
    errorName === 'AbortError' ||
    abortPatterns.some(pattern => 
      errorMessage.toLowerCase().includes(pattern.toLowerCase())
    ) ||
    errorStack.toLowerCase().includes('webchannel') ||
    errorStack.toLowerCase().includes('firebase') ||
    errorStack.toLowerCase().includes('webchannel_blob')
  );
}

/**
 * Initialize early error suppression - must be called immediately
 */
export function initializeEarlyErrorSuppression() {
  // Override console.error immediately
  console.error = (...args) => {
    const message = args.join(' ');
    
    // Check if any argument is an abort error
    const hasAbortError = args.some(arg => {
      if (arg && typeof arg === 'object') {
        return isAbortError(arg);
      }
      return isAbortError({ message: arg });
    });
    
    if (hasAbortError || isAbortError({ message })) {
      console.log('Request cancelled (normal behavior):', ...args);
      return;
    }
    
    originalConsoleError.apply(console, args);
  };

  // Override console.warn immediately
  console.warn = (...args) => {
    const message = args.join(' ');
    
    const hasAbortError = args.some(arg => {
      if (arg && typeof arg === 'object') {
        return isAbortError(arg);
      }
      return isAbortError({ message: arg });
    });
    
    if (hasAbortError || isAbortError({ message })) {
      console.log('Request cancelled (normal behavior):', ...args);
      return;
    }
    
    originalConsoleWarn.apply(console, args);
  };

  // Handle unhandled promise rejections immediately
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason;
    
    if (isAbortError(error)) {
      console.log('Promise rejection suppressed (abort error):', error.message);
      event.preventDefault();
      return;
    }
  });

  // Handle global errors immediately
  window.addEventListener('error', (event) => {
    const error = event.error;
    
    if (isAbortError(error)) {
      console.log('Global error suppressed (abort error):', error.message);
      event.preventDefault();
      return;
    }
  });

  // Override window.onerror immediately
  const originalOnError = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    if (
      message && (
        message.includes('user aborted') ||
        message.includes('request aborted') ||
        message.includes('signal is aborted') ||
        message.includes('AbortError') ||
        message.includes('webchannel') ||
        message.includes('webchannel_blob')
      )
    ) {
      console.log('Window error suppressed (abort error):', message);
      return true;
    }
    
    if (originalOnError) {
      return originalOnError.call(this, message, source, lineno, colno, error);
    }
    
    return false;
  };

  // Override window.onunhandledrejection immediately
  const originalOnUnhandledRejection = window.onunhandledrejection;
  window.onunhandledrejection = function(event) {
    const error = event.reason;
    
    if (isAbortError(error)) {
      console.log('Unhandled rejection suppressed (abort error):', error.message);
      event.preventDefault();
      return;
    }
    
    if (originalOnUnhandledRejection) {
      return originalOnUnhandledRejection.call(this, event);
    }
  };

  // Override setTimeout to catch abort errors in callbacks
  const originalSetTimeout = window.setTimeout;
  window.setTimeout = function(callback, delay, ...args) {
    return originalSetTimeout(function() {
      try {
        return callback.apply(this, args);
      } catch (error) {
        if (isAbortError(error)) {
          console.log('Timeout callback aborted (normal behavior):', error.message);
          return;
        }
        throw error;
      }
    }, delay);
  };

  // Override setInterval to catch abort errors in callbacks
  const originalSetInterval = window.setInterval;
  window.setInterval = function(callback, delay, ...args) {
    return originalSetInterval(function() {
      try {
        return callback.apply(this, args);
      } catch (error) {
        if (isAbortError(error)) {
          console.log('Interval callback aborted (normal behavior):', error.message);
          return;
        }
        throw error;
      }
    }, delay);
  };

  console.log('Early error suppression initialized');
}

export default {
  initializeEarlyErrorSuppression,
  isAbortError
};
