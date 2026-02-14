import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface QueryErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export default function QueryErrorState({ message, onRetry }: QueryErrorStateProps) {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between gap-4 flex-wrap">
        <span className="flex-1 min-w-0">
          {message || 'Something went wrong. Please check your connection and try again.'}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="shrink-0"
        >
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  );
}
