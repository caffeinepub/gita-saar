import { ArrowLeft, BookText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGetVersesByChapter, useGetAllChapters } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function ChapterDetailView({
  chapterNumber,
  onVerseSelect,
  onBack,
}: {
  chapterNumber: number;
  onVerseSelect: (chapter: number, verse: number) => void;
  onBack: () => void;
}) {
  const { data: chapters } = useGetAllChapters();
  const { data: verses, isLoading } = useGetVersesByChapter(chapterNumber);

  const chapter = chapters?.find((c) => Number(c.number) === chapterNumber);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <header className="mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-4 -ml-2 text-primary hover:text-primary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Chapters
        </Button>
        {chapter && (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shadow-sm">
                <span className="text-lg font-bold text-primary">{chapter.number.toString()}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary font-serif">{chapter.englishTitle}</h1>
                <p className="text-sm text-muted-foreground italic">{chapter.sanskritSubtitle}</p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Verse List */}
      <div className="space-y-3">
        {isLoading ? (
          <>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
          </>
        ) : (
          verses?.map((verse) => (
            <Card
              key={`${verse.chapter}-${verse.verse}`}
              className="p-4 cursor-pointer hover:shadow-lg hover:shadow-purple-glow/20 transition-all duration-300 hover:scale-[1.01] border-border/50 bg-card/80 backdrop-blur-sm"
              onClick={() => onVerseSelect(Number(verse.chapter), Number(verse.verse))}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                  <BookText className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-primary mb-1">Verse {verse.verse.toString()}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{verse.englishMeaning}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
