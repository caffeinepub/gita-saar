import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetCuratedVersesByMood } from '@/hooks/useQueries';
import VerseCard from '@/components/verse/VerseCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Mood } from '@/backend';

const moodLabels: Record<Mood, string> = {
  [Mood.anxious]: 'Anxious',
  [Mood.lost]: 'Lost',
  [Mood.angry]: 'Angry',
  [Mood.sad]: 'Sad',
  [Mood.motivated]: 'Motivated',
  [Mood.calm]: 'Calm',
};

export default function MoodDetailView({
  mood,
  onBack,
  onTalkToKrishna,
}: {
  mood: Mood;
  onBack: () => void;
  onTalkToKrishna: () => void;
}) {
  const { data: verses, isLoading } = useGetCuratedVersesByMood(mood);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-4 -ml-2 text-primary hover:text-primary">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Moods
      </Button>

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary font-serif mb-2">Feeling {moodLabels[mood]}</h1>
        <p className="text-muted-foreground mb-4">Here are some verses that might help</p>
        <Button
          size="lg"
          className="w-full rounded-full shadow-md hover:shadow-purple-glow transition-all duration-300 hover:scale-[1.02]"
          onClick={onTalkToKrishna}
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Talk to Krishna about this
        </Button>
      </header>

      <div className="space-y-6">
        {isLoading ? (
          <>
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-3xl" />
            ))}
          </>
        ) : verses && verses.length > 0 ? (
          verses.map((verse) => <VerseCard key={`${verse.chapter}-${verse.verse}`} verse={verse} />)
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No verses found for this mood</p>
          </div>
        )}
      </div>
    </div>
  );
}
