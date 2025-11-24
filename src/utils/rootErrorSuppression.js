/**
 * Root-level error suppression that catches all errors before they reach React
 */

/**
 * Initialize root-level error suppression
 */
export function initializeRootErrorSuppression() {
  // Override all possible error sources
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  const originalConsoleLog = console.log;

  // Ultra-aggressive console.error override
  console.error = (...args) => {
    const message = args.join(' ');
    
    // Check for any abort-related patterns
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
          (arg.stack && typeof arg.stack === 'string' && arg.stack.includes('webchannel_blob')) ||
          (arg.stack && typeof arg.stack === 'string' && arg.stack.includes('webchannel_blob_es2018'))
        )
      )
    ) {
      console.log('Root-level abort error suppressed:', ...args);
      return;
    }
    
    originalConsoleError.apply(console, args);
  };

  // Ultra-aggressive console.warn override
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
          (arg.stack && typeof arg.stack === 'string' && arg.stack.includes('webchannel_blob')) ||
          (arg.stack && typeof arg.stack === 'string' && arg.stack.includes('webchannel_blob_es2018'))
        )
      )
    ) {
      console.log('Root-level abort warning suppressed:', ...args);
      return;
    }
    
    originalConsoleWarn.apply(console, args);
  };

  // Override all error handlers
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
      console.log('Root-level window error suppressed:', message);
      return true;
    }
    
    if (originalOnError) {
      return originalOnError.call(this, message, source, lineno, colno, error);
    }
    
    return false;
  };

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
        (error.stack && typeof error.stack === 'string' && error.stack.includes('webchannel_blob')) ||
        (error.stack && typeof error.stack === 'string' && error.stack.includes('webchannel_blob_es2018'))
      )
    ) {
      console.log('Root-level unhandled rejection suppressed:', error.message);
      event.preventDefault();
      return;
    }
    
    if (originalOnUnhandledRejection) {
      return originalOnUnhandledRejection.call(this, event);
    }
  };

  // Override all event listeners
  window.addEventListener('error', (event) => {
    const error = event.error;
    
    if (
      error && (
        (error.message && typeof error.message === 'string' && error.message.includes('user aborted')) ||
        (error.message && typeof error.message === 'string' && error.message.includes('request aborted')) ||
        (error.message && typeof error.message === 'string' && error.message.includes('signal is aborted')) ||
        error.name === 'AbortError' ||
        (error.stack && typeof error.stack === 'string' && error.stack.includes('webchannel')) ||
        (error.stack && typeof error.stack === 'string' && error.stack.includes('webchannel_blob')) ||
        (error.stack && typeof error.stack === 'string' && error.stack.includes('webchannel_blob_es2018'))
      )
    ) {
      console.log('Root-level error event suppressed:', error.message);
      event.preventDefault();
      return;
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason;
    
    if (
      error && (
        (error.message && typeof error.message === 'string' && error.message.includes('user aborted')) ||
        (error.message && typeof error.message === 'string' && error.message.includes('request aborted')) ||
        (error.message && typeof error.message === 'string' && error.message.includes('signal is aborted')) ||
        error.name === 'AbortError' ||
        (error.stack && typeof error.stack === 'string' && error.stack.includes('webchannel')) ||
        (error.stack && typeof error.stack === 'string' && error.stack.includes('webchannel_blob')) ||
        (error.stack && typeof error.stack === 'string' && error.stack.includes('webchannel_blob_es2018'))
      )
    ) {
      console.log('Root-level unhandled rejection event suppressed:', error.message);
      event.preventDefault();
      return;
    }
  });

  console.log('Root-level error suppression initialized');
}

export default {
  initializeRootErrorSuppression
};
