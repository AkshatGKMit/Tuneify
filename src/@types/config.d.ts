interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: string;
}

type ErrorScreenProps = {
  error: string;
  onRetry: () => void;
};
