import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetVerse } from '@/hooks/useQueries';
import VerseCard from '@/components/verse/VerseCard';
import { Skeleton } from '@/components/ui/skeleton';
import QueryErrorState from '@/components/common/QueryErrorState';

export default function VerseDetailView({
  chapter,
  verse,
  onBack,
}: {
  chapter: number;
  verse: number;
  onBack: () => void;
}) {
  const { data: verseData, isLoading, isError, error, refetch } = useGetVerse(chapter, verse);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-6 -ml-2 text-primary hover:text-primary">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Chapter
      </Button>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : isError ? (
        <QueryErrorState
          message={error instanceof Error ? error.message : 'Failed to load this verse. Please try again.'}
          onRetry={() => refetch()}
        />
      ) : verseData ? (
        <VerseCard verse={verseData} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Verse not found.</p>
          <Button variant="outline" onClick={onBack} className="mt-4">
            Go Back
          </Button>
        </div>
      )}
    </div>
  );
}
