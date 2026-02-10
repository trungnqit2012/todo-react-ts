import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: unknown) {
    // 👉 sau này có thể gửi Sentry / LogRocket
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-100">
            <h1 className="text-xl font-semibold text-slate-800">
              Something went wrong 😵
            </h1>
            <p className="text-sm text-slate-600">
              Please refresh the page or try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
            >
              Reload
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
