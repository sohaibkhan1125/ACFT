/**
 * Ultimate Error Boundary with comprehensive error handling
 */

import React from 'react';

class UltimateErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: 0
    };
  }

  /**
   * Check if error is abort-related and should be suppressed
   */
  isAbortError(error) {
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

  static getDerivedStateFromError(error) {
    // Check if it's an abort error
    const errorMessage = error?.message || error?.toString() || '';
    const errorName = error?.name || '';
    const errorStack = error?.stack || '';
    
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
    
    const isAbortError = (
      errorName === 'AbortError' ||
      abortPatterns.some(pattern => 
        errorMessage.toLowerCase().includes(pattern.toLowerCase())
      ) ||
      errorStack.toLowerCase().includes('webchannel') ||
      errorStack.toLowerCase().includes('firebase') ||
      errorStack.toLowerCase().includes('webchannel_blob')
    );
    
    if (isAbortError) {
      console.log('ErrorBoundary: Abort error suppressed:', errorMessage);
      return { hasError: false, error: null, errorInfo: null };
    }
    
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Check if it's an abort error
    if (this.isAbortError(error)) {
      console.log('ErrorBoundary: Abort error caught and suppressed:', error.message);
      return;
    }
    
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
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
              We're sorry, but something unexpected happened. Please try one of the options below.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={this.handleRetry}
                className="w-full bg-yellow-400 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
              >
                Try Again
              </button>
              
              <button
                onClick={this.handleReload}
                className="w-full border border-yellow-400 text-yellow-400 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-400 hover:text-gray-900 transition-colors"
              >
                Refresh Page
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full border border-gray-400 text-gray-400 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 hover:text-gray-900 transition-colors"
              >
                Go Home
              </button>
            </div>
            
            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-400">
                If this problem persists, please contact support.
              </p>
              {this.state.retryCount > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  Retry attempts: {this.state.retryCount}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default UltimateErrorBoundary;
