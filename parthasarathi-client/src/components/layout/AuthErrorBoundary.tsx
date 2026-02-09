import React, { ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface AuthErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface AuthErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class AuthErrorBoundary extends React.Component<
  AuthErrorBoundaryProps,
  AuthErrorBoundaryState
> {
  constructor(props: AuthErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): AuthErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Auth Error Boundary caught an error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error!, this.resetError);
      }

      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl border border-red-200 shadow-lg p-8 text-center">
              <div className="size-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="size-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-red-900 mb-2">
                Authentication Error
              </h1>
              <p className="text-red-700/70 mb-6">
                An unexpected error occurred during authentication. Please try
                again or contact support.
              </p>
              <details className="text-left mb-8">
                <summary className="cursor-pointer text-sm font-bold text-red-600 hover:text-red-700">
                  Error Details
                </summary>
                <pre className="mt-4 p-3 bg-red-50 rounded text-xs text-red-800 overflow-auto max-h-32">
                  {this.state.error?.toString()}
                </pre>
              </details>
              <div className="space-y-3">
                <button
                  onClick={this.resetError}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold primary transition-colors"
                >
                  <RefreshCw className="size-5" />
                  Try Again
                </button>
                <a
                  href="/login"
                  className="block text-center px-4 py-3 bg-white border border-red-200 text-red-600 hover:text-red-700 rounded-xl font-bold transition-colors"
                >
                  Back to Login
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
