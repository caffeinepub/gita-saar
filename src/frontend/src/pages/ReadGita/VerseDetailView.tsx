import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetVerse } from '@/hooks/useQueries';
import VerseCard from '@/components/verse/VerseCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function VerseDetailView({
  chapter,
  verse,
  onBack,
}: {
  chapter: number;
  verse: number;
  onBack: () => void;
}) {
  const { data: verseData, isLoading } = useGetVerse(chapter, verse);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-6 -ml-2 text-primary hover:text-primary">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {isLoading ? (
        <Skeleton className="h-96 rounded-3xl" />
      ) : verseData ? (
        <VerseCard verse={verseData} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Verse not found</p>
        </div>
      )}
    </div>
  );
}
