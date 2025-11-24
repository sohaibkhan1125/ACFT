/**
 * Global error suppression system to eliminate all abort errors
 */

// Store original console methods
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const originalConsoleLog = console.log;

// Track if suppression is already active
let suppressionActive = false;

/**
 * Check if an error message indicates an abort/cancellation
 */
function isAbortRelated(message) {
  if (typeof message !== 'string') return false;
  
  const abortPatterns = [
    'user aborted',
    'request aborted',
    'aborted',
    'cancelled',
    'cancelled',
    'abort',
    'AbortError',
    'operation aborted',
    'request cancelled',
    'fetch aborted',
    'network request aborted',
    'connection aborted',
    'timeout aborted'
  ];
  
  return abortPatterns.some(pattern => 
    message.toLowerCase().includes(pattern.toLowerCase())
  );
}

/**
 * Suppress abort-related console errors
 */
function suppressAbortErrors() {
  if (suppressionActive) return;
  suppressionActive = true;

  // Override console.error
  console.error = (...args) => {
    const message = args.join(' ');
    
    if (isAbortRelated(message)) {
      // Log as debug info instead of error
      originalConsoleLog('Request cancelled (normal behavior):', ...args);
      return;
    }
    
    originalConsoleError.apply(console, args);
  };

  // Override console.warn
  console.warn = (...args) => {
    const message = args.join(' ');
    
    if (isAbortRelated(message)) {
      originalConsoleLog('Request cancelled (normal behavior):', ...args);
      return;
    }
    
    originalConsoleWarn.apply(console, args);
  };
}

/**
 * Global unhandled promise rejection handler
 */
function handleUnhandledRejections() {
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason;
    const errorMessage = error?.message || error?.toString() || '';
    
    if (isAbortRelated(errorMessage) || 
        error?.name === 'AbortError' ||
        error?.code === 'cancelled' ||
        error?.code === 'aborted') {
      
      console.log('Promise rejection suppressed (abort error):', errorMessage);
      event.preventDefault();
      return;
    }
    
    // Log other unhandled rejections normally
    console.warn('Unhandled promise rejection:', error);
  });
}

/**
 * Global error handler
 */
function handleGlobalErrors() {
  window.addEventListener('error', (event) => {
    const error = event.error;
    const errorMessage = error?.message || error?.toString() || '';
    
    if (isAbortRelated(errorMessage) || 
        error?.name === 'AbortError' ||
        error?.code === 'cancelled' ||
        error?.code === 'aborted') {
      
      console.log('Global error suppressed (abort error):', errorMessage);
      event.preventDefault();
      return;
    }
    
    // Log other errors normally
    console.error('Global error:', error);
  });
}

/**
 * Initialize global error suppression
 */
export function initializeGlobalErrorSuppression() {
  suppressAbortErrors();
  handleUnhandledRejections();
  handleGlobalErrors();
  
  console.log('Global error suppression initialized');
}

/**
 * Create a safe async wrapper that suppresses abort errors
 */
export function createSafeAsyncWrapper(asyncFunction, functionName = 'unknown') {
  return async (...args) => {
    try {
      return await asyncFunction(...args);
    } catch (error) {
      const errorMessage = error?.message || error?.toString() || '';
      
      if (isAbortRelated(errorMessage) || 
          error?.name === 'AbortError' ||
          error?.code === 'cancelled' ||
          error?.code === 'aborted') {
        
        console.log(`${functionName} was cancelled (normal behavior)`);
        return null;
      }
      
      console.warn(`Error in ${functionName}:`, error.message);
      return null;
    }
  };
}

/**
 * Safe state update wrapper for React components
 */
export function safeStateUpdate(updateFunction, isMounted = true) {
  if (!isMounted) return;
  
  try {
    updateFunction();
  } catch (error) {
    const errorMessage = error?.message || error?.toString() || '';
    
    if (!isAbortRelated(errorMessage) && 
        error?.name !== 'AbortError' &&
        error?.code !== 'cancelled' &&
        error?.code !== 'aborted') {
      console.warn('State update error:', error.message);
    }
  }
}

/**
 * Safe event listener wrapper
 */
export function safeEventListener(listener) {
  return (...args) => {
    try {
      return listener(...args);
    } catch (error) {
      const errorMessage = error?.message || error?.toString() || '';
      
      if (!isAbortRelated(errorMessage) && 
          error?.name !== 'AbortError' &&
          error?.code !== 'cancelled' &&
          error?.code !== 'aborted') {
        console.warn('Event listener error:', error.message);
      }
    }
  };
}

export {
  isAbortRelated
};

export default {
  initializeGlobalErrorSuppression,
  createSafeAsyncWrapper,
  safeStateUpdate,
  safeEventListener,
  isAbortRelated
};
