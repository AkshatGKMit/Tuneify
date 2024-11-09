import { Component, ErrorInfo } from 'react';
import ErrorScreen from '@screens/errorScreen/ErrorScreen';
import { ErrorBoundaryErrors } from '@constants';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(err: Error): ErrorBoundaryState {
    return { hasError: true, error: err.message };
  }

  componentDidCatch({ message }: Error) {
    this.setState({
      error:
        message === ErrorBoundaryErrors.noInternetConnection
          ? message
          : ErrorBoundaryErrors.unexpected,
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: '' });
  };

  render() {
    const { error, hasError } = this.state;

    if (hasError) {
      return (
        <ErrorScreen
          error={error}
          onRetry={this.handleRetry}
        />
      );
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
