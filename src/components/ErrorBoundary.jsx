import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
              <p className="text-gray-600 mb-6">We're sorry, but there was an error loading this page.</p>
              <div className="mb-4">
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Refresh the page
                </button>
              </div>
              <button 
                onClick={() => window.history.back()} 
                className="text-blue-600 hover:underline"
              >
                Go back to previous page
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 p-4 bg-gray-100 rounded overflow-auto text-xs">
                <p className="font-bold mb-2">Error details (visible in development only):</p>
                <p className="text-red-500">{this.state.error && this.state.error.toString()}</p>
                <p className="mt-2 whitespace-pre-wrap">
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 