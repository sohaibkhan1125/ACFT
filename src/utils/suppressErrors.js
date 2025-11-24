/**
 * Utility functions to suppress and handle various types of errors
 */

/**
 * Wrap async functions to suppress abort errors
 * @param {Function} asyncFunction - The async function to wrap
 * @param {string} functionName - Name of the function for logging
 * @returns {Function} Wrapped function that suppresses abort errors
 */
export function suppressAbortErrors(asyncFunction, functionName = 'unknown') {
  return async (...args) => {
    try {
      return await asyncFunction(...args);
    } catch (error) {
      // Suppress abort errors completely
      if (isAbortError(error)) {
        console.log(`${functionName} was cancelled (this is normal)`);
        return null;
      }
      
      // Log other errors but don't throw them
      console.warn(`Error in ${functionName}:`, error.message);
      return null;
    }
  };
}

/**
 * Check if an error is an abort error that should be suppressed
 * @param {Error} error - The error to check
 * @returns {boolean} Whether the error should be suppressed
 */
export function isAbortError(error) {
  return (
    error?.name === 'AbortError' ||
    error?.message?.includes('aborted') ||
    error?.message?.includes('cancelled') ||
    error?.message?.includes('user aborted') ||
    error?.message?.includes('request aborted') ||
    error?.code === 'cancelled' ||
    error?.code === 'aborted' ||
    error?.code === 'abort'
  );
}

/**
 * Safe wrapper for Firebase operations
 * @param {Function} operation - Firebase operation to execute
 * @param {string} operationName - Name of the operation
 * @returns {Promise<any>} Result or null if failed
 */
export async function safeFirebaseOperation(operation, operationName) {
  try {
    return await operation();
  } catch (error) {
    if (isAbortError(error)) {
      console.log(`Firebase operation ${operationName} was cancelled (this is normal)`);
      return null;
    }
    
    console.warn(`Firebase operation ${operationName} failed:`, error.message);
    return null;
  }
}

/**
 * Safe wrapper for React state updates
 * @param {Function} stateUpdater - State update function
 * @param {boolean} isMounted - Whether component is mounted
 */
export function safeStateUpdate(stateUpdater, isMounted = true) {
  if (!isMounted) return;
  
  try {
    stateUpdater();
  } catch (error) {
    if (!isAbortError(error)) {
      console.warn('State update failed:', error.message);
    }
  }
}

/**
 * Safe wrapper for event listeners
 * @param {Function} listener - Event listener function
 * @returns {Function} Safe event listener
 */
export function safeEventListener(listener) {
  return (...args) => {
    try {
      return listener(...args);
    } catch (error) {
      if (!isAbortError(error)) {
        console.warn('Event listener error:', error.message);
      }
    }
  };
}

/**
 * Suppress console errors for abort-related messages
 */
export function suppressConsoleAbortErrors() {
  const originalError = console.error;
  const originalWarn = console.warn;
  
  console.error = (...args) => {
    const message = args.join(' ');
    if (isAbortError({ message })) {
      console.log('Request cancelled (this is normal):', ...args);
      return;
    }
    originalError.apply(console, args);
  };
  
  console.warn = (...args) => {
    const message = args.join(' ');
    if (isAbortError({ message })) {
      console.log('Request cancelled (this is normal):', ...args);
      return;
    }
    originalWarn.apply(console, args);
  };
}

export default {
  suppressAbortErrors,
  isAbortError,
  safeFirebaseOperation,
  safeStateUpdate,
  safeEventListener,
  suppressConsoleAbortErrors
};
