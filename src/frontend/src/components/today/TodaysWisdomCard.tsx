import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetTodaysVerse } from '@/hooks/useQueries';
import VerseCard from '@/components/verse/VerseCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function TodaysWisdomCard({ onBack }: { onBack: () => void }) {
  const { data: verse, isLoading } = useGetTodaysVerse();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-4 -ml-2">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Chapters
      </Button>

      <header className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Today's Wisdom</h1>
        </div>
        <p className="text-muted-foreground">Your daily dose of clarity from the Gita</p>
      </header>

      {isLoading ? (
        <Skeleton className="h-96 rounded-3xl" />
      ) : verse ? (
        <VerseCard verse={verse} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No verse available today</p>
        </div>
      )}
    </div>
  );
}
