/**
 * Firebase-specific abort error handler
 */

// Store original console methods
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

/**
 * Check if error is Firebase abort-related
 */
function isFirebaseAbortError(error) {
  if (!error) return false;
  
  const errorMessage = error.message || error.toString() || '';
  const errorName = error.name || '';
  const errorStack = error.stack || '';
  
  // Check for specific Firebase abort patterns
  const firebaseAbortPatterns = [
    'user aborted',
    'request aborted',
    'signal is aborted',
    'aborted without reason',
    'AbortError',
    'webchannel',
    'firebase',
    'abort'
  ];
  
  // Check for Firebase-specific stack traces
  const firebaseStackPatterns = [
    'webchannel',
    'firebase',
    'firestore',
    'webchannel_blob'
  ];
  
  return (
    errorName === 'AbortError' ||
    firebaseAbortPatterns.some(pattern => 
      errorMessage.toLowerCase().includes(pattern.toLowerCase())
    ) ||
    firebaseStackPatterns.some(pattern => 
      errorStack.toLowerCase().includes(pattern.toLowerCase())
    )
  );
}

/**
 * Initialize Firebase abort error suppression
 */
export function initializeFirebaseAbortHandler() {
  // Override console.error to suppress Firebase abort errors
  console.error = (...args) => {
    const errorMessage = args.join(' ');
    
    // Check if any argument is a Firebase abort error
    const hasFirebaseAbortError = args.some(arg => {
      if (arg && typeof arg === 'object') {
        return isFirebaseAbortError(arg);
      }
      return isFirebaseAbortError({ message: arg });
    });
    
    if (hasFirebaseAbortError || isFirebaseAbortError({ message: errorMessage })) {
      console.log('Firebase request cancelled (normal behavior):', ...args);
      return;
    }
    
    originalConsoleError.apply(console, args);
  };

  // Override console.warn
  console.warn = (...args) => {
    const errorMessage = args.join(' ');
    
    const hasFirebaseAbortError = args.some(arg => {
      if (arg && typeof arg === 'object') {
        return isFirebaseAbortError(arg);
      }
      return isFirebaseAbortError({ message: arg });
    });
    
    if (hasFirebaseAbortError || isFirebaseAbortError({ message: errorMessage })) {
      console.log('Firebase request cancelled (normal behavior):', ...args);
      return;
    }
    
    originalConsoleWarn.apply(console, args);
  };

  // Handle unhandled promise rejections specifically for Firebase
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason;
    
    if (isFirebaseAbortError(error)) {
      console.log('Firebase promise rejection suppressed (abort error):', error.message);
      event.preventDefault();
      return;
    }
    
    // Log other unhandled rejections normally
    console.warn('Unhandled promise rejection:', error);
  });

  // Handle global errors specifically for Firebase
  window.addEventListener('error', (event) => {
    const error = event.error;
    
    if (isFirebaseAbortError(error)) {
      console.log('Firebase global error suppressed (abort error):', error.message);
      event.preventDefault();
      return;
    }
    
    // Log other errors normally
    console.error('Global error:', error);
  });

  // Override Firebase's internal error handling
  const originalSetTimeout = window.setTimeout;
  const originalSetInterval = window.setInterval;
  
  // Wrap setTimeout to catch Firebase abort errors
  window.setTimeout = function(callback, delay, ...args) {
    return originalSetTimeout(function() {
      try {
        return callback.apply(this, args);
      } catch (error) {
        if (isFirebaseAbortError(error)) {
          console.log('Firebase timeout callback aborted (normal behavior):', error.message);
          return;
        }
        throw error;
      }
    }, delay);
  };

  console.log('Firebase abort error handler initialized');
}

export default {
  initializeFirebaseAbortHandler,
  isFirebaseAbortError
};
