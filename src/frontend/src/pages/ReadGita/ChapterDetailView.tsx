import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetVersesByChapter, useGetAllChapters } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    <div className="max-w-6xl mx-auto px-4 py-6">
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

      {/* Verse Table */}
      <div className="border border-border/50 rounded-2xl overflow-hidden bg-card/80 backdrop-blur-sm shadow-lg">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-lg" />
            ))}
          </div>
        ) : (
          <ScrollArea className="w-full">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/5 hover:bg-primary/5">
                    <TableHead className="font-semibold text-primary w-[100px]">Verse</TableHead>
                    <TableHead className="font-semibold text-primary min-w-[200px]">Hindi Meaning</TableHead>
                    <TableHead className="font-semibold text-primary min-w-[200px]">English Meaning</TableHead>
                    <TableHead className="font-semibold text-primary min-w-[200px]">Gen Z Interpretation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verses?.map((verse) => (
                    <TableRow
                      key={`${verse.chapter}-${verse.verse}`}
                      className="cursor-pointer hover:bg-primary/5 transition-colors"
                      onClick={() => onVerseSelect(Number(verse.chapter), Number(verse.verse))}
                    >
                      <TableCell className="font-medium text-primary align-top">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold">{verse.verse.toString()}</span>
                          <span className="text-xs text-muted-foreground italic line-clamp-2">{verse.sanskrit}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-foreground align-top">
                        <p className="leading-relaxed">{verse.hindiMeaning}</p>
                      </TableCell>
                      <TableCell className="text-sm text-foreground align-top">
                        <p className="leading-relaxed">{verse.englishMeaning}</p>
                      </TableCell>
                      <TableCell className="text-sm text-foreground align-top">
                        <p className="leading-relaxed font-medium text-primary/90">{verse.genZKrishnaInterpretation}</p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        )}
      </div>

      {/* Mobile-friendly note */}
      <p className="text-xs text-muted-foreground text-center mt-4 px-4">
        💡 Tip: Scroll horizontally on mobile to view all columns. Tap any verse to see full details.
      </p>
    </div>
  );
}
