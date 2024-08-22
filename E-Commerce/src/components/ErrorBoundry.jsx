import React from "react";
import { Helmet } from "react-helmet";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Helmet>
            <title>Govind Hub - Error</title>
            <meta
              name="description"
              content="An error has occurred on Govind Hub. Please try again later or contact support if the issue persists."
            />
            <meta
              name="keywords"
              content="Govind Hub, error, page not found, technical issue, support"
            />
          </Helmet>

          <div className="flex flex-col items-center justify-center h-screen bg-amber-100 text-center -mt-20">
            <h1 className="text-4xl font-bold text-red-500">
              Something went wrong.
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              We apologize for the inconvenience.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
