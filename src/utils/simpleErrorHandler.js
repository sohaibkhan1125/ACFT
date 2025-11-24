/**
 * Simple, robust error handler to suppress abort errors
 */

// Store original console methods
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

/**
 * Check if error message indicates an abort/cancellation
 */
function isAbortError(message) {
  if (typeof message !== 'string') return false;
  
  const abortPatterns = [
    'user aborted',
    'request aborted',
    'aborted',
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
 * Initialize simple error suppression
 */
export function initializeSimpleErrorSuppression() {
  // Override console.error
  console.error = (...args) => {
    const message = args.join(' ');
    
    if (isAbortError(message)) {
      // Log as info instead of error
      console.log('Request cancelled (normal behavior):', ...args);
      return;
    }
    
    originalConsoleError.apply(console, args);
  };

  // Override console.warn
  console.warn = (...args) => {
    const message = args.join(' ');
    
    if (isAbortError(message)) {
      console.log('Request cancelled (normal behavior):', ...args);
      return;
    }
    
    originalConsoleWarn.apply(console, args);
  };

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason;
    const errorMessage = error?.message || error?.toString() || '';
    
    if (isAbortError(errorMessage) || 
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

  // Handle global errors
  window.addEventListener('error', (event) => {
    const error = event.error;
    const errorMessage = error?.message || error?.toString() || '';
    
    if (isAbortError(errorMessage) || 
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

  console.log('Simple error suppression initialized');
}

export default {
  initializeSimpleErrorSuppression,
  isAbortError
};
