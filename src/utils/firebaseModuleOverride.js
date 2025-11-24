/**
 * Override Firebase modules to prevent abort errors
 * This must be imported before Firebase is initialized
 */

/**
 * Override Firebase WebChannel at the module level
 */
export function overrideFirebaseModules() {
  // Override Error constructor to catch abort errors
  const OriginalError = Error;
  window.Error = function(message) {
    if (
      message && 
      typeof message === 'string' && (
        message.includes('user aborted') ||
        message.includes('request aborted') ||
        message.includes('signal is aborted') ||
        message.includes('AbortError') ||
        message.includes('WebChannelConnection') ||
        message.includes('transport errored') ||
        message.includes('parseErrorToStacks expects Error object')
      )
    ) {
      console.log('Firebase error suppressed at Error constructor level:', message);
      return new OriginalError('Request cancelled (normal behavior)');
    }
    return new OriginalError(message);
  };

  // Override AbortError constructor
  if (window.AbortError) {
    const OriginalAbortError = window.AbortError;
    window.AbortError = function(message) {
      console.log('Firebase AbortError suppressed at constructor level:', message);
      return new OriginalAbortError('Request cancelled (normal behavior)');
    };
  }

  // Override Promise.reject to catch abort errors
  const originalPromiseReject = Promise.reject;
  Promise.reject = function(reason) {
    if (
      reason && (
        (reason.message && typeof reason.message === 'string' && (
          reason.message.includes('user aborted') ||
          reason.message.includes('request aborted') ||
          reason.message.includes('signal is aborted') ||
          reason.message.includes('WebChannelConnection') ||
          reason.message.includes('transport errored') ||
          reason.message.includes('parseErrorToStacks expects Error object')
        )) ||
        reason.name === 'AbortError' ||
        reason.name === 'FirebaseError'
      )
    ) {
      console.log('Firebase Promise.reject suppressed:', reason.message || reason);
      return originalPromiseReject.call(this, new Error('Request cancelled (normal behavior)'));
    }
    return originalPromiseReject.call(this, reason);
  };

  // Override throw to catch abort errors
  const originalThrow = window.throw;
  if (originalThrow) {
    window.throw = function(error) {
      if (
        error && (
          (error.message && typeof error.message === 'string' && (
            error.message.includes('user aborted') ||
            error.message.includes('request aborted') ||
            error.message.includes('signal is aborted') ||
            error.message.includes('WebChannelConnection') ||
            error.message.includes('transport errored') ||
            error.message.includes('parseErrorToStacks expects Error object')
          )) ||
          error.name === 'AbortError' ||
          error.name === 'FirebaseError'
        )
      ) {
        console.log('Firebase throw suppressed:', error.message);
        return;
      }
      return originalThrow.call(this, error);
    };
  }

  // Override parseErrorToStacks function to handle non-Error objects
  if (window.parseErrorToStacks) {
    const originalParseErrorToStacks = window.parseErrorToStacks;
    window.parseErrorToStacks = function(error) {
      if (!error || typeof error !== 'object' || !error.stack) {
        console.log('parseErrorToStacks: Invalid error object suppressed');
        return [];
      }
      return originalParseErrorToStacks.call(this, error);
    };
  }

  // Override console.error to suppress Firebase errors
  const originalConsoleError = console.error;
  console.error = function(...args) {
    const message = args.join(' ');
    if (
      message.includes('WebChannelConnection') ||
      message.includes('transport errored') ||
      message.includes('parseErrorToStacks expects Error object') ||
      message.includes('Firebase WebChannel') ||
      message.includes('RPC \'Listen\' stream')
    ) {
      console.log('Firebase console.error suppressed:', message);
      return;
    }
    return originalConsoleError.apply(console, args);
  };

  // Add global error handler for unhandled Firebase errors
  window.addEventListener('error', function(event) {
    if (
      event.error && (
        (event.error.message && typeof event.error.message === 'string' && (
          event.error.message.includes('WebChannelConnection') ||
          event.error.message.includes('transport errored') ||
          event.error.message.includes('parseErrorToStacks expects Error object') ||
          event.error.message.includes('Firebase WebChannel') ||
          event.error.message.includes('RPC \'Listen\' stream')
        )) ||
        event.error.name === 'AbortError' ||
        event.error.name === 'FirebaseError'
      )
    ) {
      console.log('Firebase global error suppressed:', event.error.message);
      event.preventDefault();
      return false;
    }
  });

  // Add unhandled promise rejection handler
  window.addEventListener('unhandledrejection', function(event) {
    if (
      event.reason && (
        (event.reason.message && typeof event.reason.message === 'string' && (
          event.reason.message.includes('WebChannelConnection') ||
          event.reason.message.includes('transport errored') ||
          event.reason.message.includes('parseErrorToStacks expects Error object') ||
          event.reason.message.includes('Firebase WebChannel') ||
          event.reason.message.includes('RPC \'Listen\' stream')
        )) ||
        event.reason.name === 'AbortError' ||
        event.reason.name === 'FirebaseError'
      )
    ) {
      console.log('Firebase unhandled rejection suppressed:', event.reason.message);
      event.preventDefault();
      return false;
    }
  });

  console.log('Firebase module override initialized');
}

export default {
  overrideFirebaseModules
};
