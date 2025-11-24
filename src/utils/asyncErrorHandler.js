/**
 * Comprehensive async error handler
 * Handles all async operations with proper abort error suppression
 */

/**
 * Safe async wrapper that handles all possible async errors
 */
export function safeAsyncWrapper(asyncFunction, errorMessage = 'Operation failed') {
  return async (...args) => {
    try {
      const result = await asyncFunction(...args);
      return { success: true, data: result, error: null };
    } catch (error) {
      // Check if it's an abort error
      if (isAbortError(error)) {
        console.log('Async operation was cancelled (normal behavior):', error.message);
        return { success: false, data: null, error: null };
      }
      
      // Log other errors but don't throw
      console.warn(`${errorMessage}:`, error.message);
      return { success: false, data: null, error: error.message };
    }
  };
}

/**
 * Safe async wrapper with timeout
 */
export function safeAsyncWrapperWithTimeout(asyncFunction, timeoutMs = 10000, errorMessage = 'Operation failed') {
  return async (...args) => {
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Operation timeout')), timeoutMs)
      );
      
      const result = await Promise.race([
        asyncFunction(...args),
        timeoutPromise
      ]);
      
      return { success: true, data: result, error: null };
    } catch (error) {
      // Check if it's an abort error
      if (isAbortError(error)) {
        console.log('Async operation was cancelled (normal behavior):', error.message);
        return { success: false, data: null, error: null };
      }
      
      // Handle timeout
      if (error.message === 'Operation timeout') {
        console.warn(`${errorMessage} - timeout after ${timeoutMs}ms`);
        return { success: false, data: null, error: 'Operation timeout' };
      }
      
      // Log other errors but don't throw
      console.warn(`${errorMessage}:`, error.message);
      return { success: false, data: null, error: error.message };
    }
  };
}

/**
 * Safe async wrapper with retry logic
 */
export function safeAsyncWrapperWithRetry(asyncFunction, maxRetries = 3, delayMs = 1000, errorMessage = 'Operation failed') {
  return async (...args) => {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await asyncFunction(...args);
        return { success: true, data: result, error: null };
      } catch (error) {
        lastError = error;
        
        // Check if it's an abort error
        if (isAbortError(error)) {
          console.log('Async operation was cancelled (normal behavior):', error.message);
          return { success: false, data: null, error: null };
        }
        
        // If it's the last attempt, return the error
        if (attempt === maxRetries) {
          console.warn(`${errorMessage} - failed after ${maxRetries} attempts:`, error.message);
          return { success: false, data: null, error: error.message };
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
      }
    }
    
    return { success: false, data: null, error: lastError?.message || 'Unknown error' };
  };
}

/**
 * Safe async wrapper with abort controller
 */
export function safeAsyncWrapperWithAbortController(asyncFunction, errorMessage = 'Operation failed') {
  return async (...args) => {
    const abortController = new AbortController();
    
    try {
      const result = await asyncFunction(...args, abortController.signal);
      return { success: true, data: result, error: null };
    } catch (error) {
      // Check if it's an abort error
      if (isAbortError(error)) {
        console.log('Async operation was cancelled (normal behavior):', error.message);
        return { success: false, data: null, error: null };
      }
      
      // Log other errors but don't throw
      console.warn(`${errorMessage}:`, error.message);
      return { success: false, data: null, error: error.message };
    }
  };
}

/**
 * Check if error is abort-related
 */
function isAbortError(error) {
  if (!error) return false;
  
  const errorMessage = error.message || error.toString() || '';
  const errorName = error.name || '';
  const errorStack = error.stack || '';
  
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
 * Safe state update wrapper
 */
export function safeStateUpdate(setStateFunction, errorMessage = 'State update failed') {
  return (newState) => {
    try {
      setStateFunction(newState);
    } catch (error) {
      if (isAbortError(error)) {
        console.log('State update was cancelled (normal behavior):', error.message);
        return;
      }
      
      console.warn(`${errorMessage}:`, error.message);
    }
  };
}

/**
 * Safe event listener wrapper
 */
export function safeEventListener(eventType, handler, errorMessage = 'Event listener failed') {
  const safeHandler = (event) => {
    try {
      handler(event);
    } catch (error) {
      if (isAbortError(error)) {
        console.log('Event handler was cancelled (normal behavior):', error.message);
        return;
      }
      
      console.warn(`${errorMessage}:`, error.message);
    }
  };
  
  window.addEventListener(eventType, safeHandler);
  
  return () => {
    try {
      window.removeEventListener(eventType, safeHandler);
    } catch (error) {
      if (isAbortError(error)) {
        console.log('Event listener removal was cancelled (normal behavior):', error.message);
        return;
      }
      
      console.warn('Error removing event listener:', error.message);
    }
  };
}

export default {
  safeAsyncWrapper,
  safeAsyncWrapperWithTimeout,
  safeAsyncWrapperWithRetry,
  safeAsyncWrapperWithAbortController,
  safeStateUpdate,
  safeEventListener
};
