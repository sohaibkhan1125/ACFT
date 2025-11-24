import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Check if error is abort-related
  isAbortError(error) {
    const errorMessage = error?.message || error?.toString() || '';
    
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
    
    return (
      error?.name === 'AbortError' ||
      error?.code === 'cancelled' ||
      error?.code === 'aborted' ||
      abortPatterns.some(pattern => 
        errorMessage.toLowerCase().includes(pattern.toLowerCase())
      )
    );
  }

  static getDerivedStateFromError(error) {
    // Check if it's an abort error - if so, don't show error boundary
    const errorMessage = error?.message || error?.toString() || '';
    
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
    
    const isAbortError = (
      error?.name === 'AbortError' ||
      error?.code === 'cancelled' ||
      error?.code === 'aborted' ||
      abortPatterns.some(pattern => 
        errorMessage.toLowerCase().includes(pattern.toLowerCase())
      )
    );
    
    if (isAbortError) {
      console.log('ErrorBoundary: Abort error suppressed:', errorMessage);
      return { hasError: false, error: null };
    }
    
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    const errorMessage = error?.message || error?.toString() || '';
    
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
    
    const isAbortError = (
      error?.name === 'AbortError' ||
      error?.code === 'cancelled' ||
      error?.code === 'aborted' ||
      abortPatterns.some(pattern => 
        errorMessage.toLowerCase().includes(pattern.toLowerCase())
      )
    );
    
    // Suppress abort errors
    if (isAbortError) {
      console.log('ErrorBoundary: Abort error caught and suppressed:', errorMessage);
      return;
    }
    
    // Log other errors
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">
              Something went wrong
            </h1>
            
            <p className="text-gray-300 mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-yellow-400 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
              >
                Refresh Page
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full border border-yellow-400 text-yellow-400 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-400 hover:text-gray-900 transition-colors"
              >
                Go Home
              </button>
            </div>
            
            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-400">
                If this problem persists, please contact support.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
