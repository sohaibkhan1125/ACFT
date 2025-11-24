/**
 * Global error handler to suppress abort errors and other expected errors
 */

// Store original console.error
const originalConsoleError = console.error;

// Override console.error to filter out abort errors
console.error = (...args) => {
  const errorMessage = args.join(' ');
  
  // Suppress abort-related errors
  if (
    errorMessage.includes('aborted') ||
    errorMessage.includes('cancelled') ||
    errorMessage.includes('AbortError') ||
    errorMessage.includes('user aborted') ||
    errorMessage.includes('request aborted')
  ) {
    // Log as info instead of error for debugging
    console.log('Request cancelled (this is normal):', ...args);
    return;
  }
  
  // Log other errors normally
  originalConsoleError.apply(console, args);
};

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  const error = event.reason;
  
  // Suppress abort errors
  if (
    error?.name === 'AbortError' ||
    error?.message?.includes('aborted') ||
    error?.message?.includes('cancelled') ||
    error?.code === 'cancelled' ||
    error?.code === 'aborted'
  ) {
    console.log('Promise rejection suppressed (abort error):', error.message);
    event.preventDefault(); // Prevent the error from being logged
    return;
  }
  
  // Log other unhandled rejections
  console.warn('Unhandled promise rejection:', error);
});

// Global error handler for general errors
window.addEventListener('error', (event) => {
  const error = event.error;
  
  // Suppress abort errors
  if (
    error?.name === 'AbortError' ||
    error?.message?.includes('aborted') ||
    error?.message?.includes('cancelled') ||
    error?.code === 'cancelled' ||
    error?.code === 'aborted'
  ) {
    console.log('Global error suppressed (abort error):', error.message);
    event.preventDefault(); // Prevent the error from being logged
    return;
  }
  
  // Log other errors normally
  console.error('Global error:', error);
});

export default {
  isAbortError: (error) => {
    return (
      error?.name === 'AbortError' ||
      error?.message?.includes('aborted') ||
      error?.message?.includes('cancelled') ||
      error?.code === 'cancelled' ||
      error?.code === 'aborted'
    );
  }
};
