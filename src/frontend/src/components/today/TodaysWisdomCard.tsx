import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetTodaysVerse } from '@/hooks/useQueries';
import VerseCard from '@/components/verse/VerseCard';
import { Skeleton } from '@/components/ui/skeleton';
import QueryErrorState from '@/components/common/QueryErrorState';

export default function TodaysWisdomCard({ onBack }: { onBack: () => void }) {
  const { data: verse, isLoading, isError, error, refetch } = useGetTodaysVerse();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-6 -ml-2 text-primary hover:text-primary">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Chapters
      </Button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary font-serif mb-2">Today's Wisdom</h1>
        <p className="text-muted-foreground">
          A verse chosen just for you today. Let Krishna's wisdom guide your day.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : isError ? (
        <QueryErrorState
          message={error instanceof Error ? error.message : 'Failed to load today\'s wisdom. Please try again.'}
          onRetry={() => refetch()}
        />
      ) : verse ? (
        <VerseCard verse={verse} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No verse available today. Please check back later.</p>
          <Button variant="outline" onClick={() => refetch()} className="mt-4">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
