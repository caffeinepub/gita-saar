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
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import QueryErrorState from '@/components/common/QueryErrorState';

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
  const { data: verses, isLoading, isError, error, refetch } = useGetVersesByChapter(chapterNumber);

  const chapter = chapters?.find((c) => Number(c.number) === chapterNumber);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
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

      {/* Error State */}
      {isError && (
        <QueryErrorState
          message={error instanceof Error ? error.message : 'Failed to load verses for this chapter. Please try again.'}
          onRetry={() => refetch()}
        />
      )}

      {/* Verse Table - Equal width 5 columns on desktop, scrollable on mobile */}
      {!isError && (
        <div className="relative border border-border/50 rounded-2xl overflow-hidden bg-card/80 backdrop-blur-sm shadow-lg">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-lg" />
              ))}
            </div>
          ) : (
            <>
              {/* Desktop: Equal width columns, no scroll */}
              <div className="hidden md:block overflow-x-auto">
                <Table className="table-fixed w-full">
                  <TableHeader>
                    <TableRow className="bg-primary/5 hover:bg-primary/5">
                      <TableHead className="font-semibold text-primary w-[20%]">
                        Ch:Verse
                      </TableHead>
                      <TableHead className="font-semibold text-primary w-[20%]">Sanskrit</TableHead>
                      <TableHead className="font-semibold text-primary w-[20%]">Literal English</TableHead>
                      <TableHead className="font-semibold text-primary w-[20%]">
                        Gen-Z Interpretation
                      </TableHead>
                      <TableHead className="font-semibold text-primary w-[20%]">
                        Action Step
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {verses && verses.length > 0 ? (
                      verses.map((verse) => (
                        <TableRow
                          key={`${verse.chapter}-${verse.verse}`}
                          className="cursor-pointer hover:bg-primary/5 transition-colors"
                          onClick={() => onVerseSelect(Number(verse.chapter), Number(verse.verse))}
                        >
                          <TableCell className="font-medium text-primary align-top">
                            <span className="text-sm font-bold">
                              {verse.chapter.toString()}:{verse.verse.toString()}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-foreground align-top">
                            <p className="leading-relaxed font-serif whitespace-normal break-words">{verse.sanskrit || '—'}</p>
                          </TableCell>
                          <TableCell className="text-sm text-foreground align-top">
                            <p className="leading-relaxed whitespace-normal break-words">{verse.englishMeaning || '—'}</p>
                          </TableCell>
                          <TableCell className="text-sm text-foreground align-top">
                            <p className="leading-relaxed font-medium text-primary/90 whitespace-normal break-words">
                              {verse.genZKrishnaInterpretation?.trim() || '—'}
                            </p>
                          </TableCell>
                          <TableCell className="text-sm text-foreground align-top">
                            <p className="leading-relaxed whitespace-normal break-words">
                              {verse.actionStep?.trim() || '—'}
                            </p>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          No verses available for this chapter yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile: Scrollable with sticky first column */}
              <ScrollArea className="w-full md:hidden">
                <div className="min-w-[640px]">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-primary/5 hover:bg-primary/5">
                        <TableHead className="font-semibold text-primary w-[80px] sticky left-0 bg-primary/5 z-10">
                          Ch:Verse
                        </TableHead>
                        <TableHead className="font-semibold text-primary w-[180px]">Sanskrit</TableHead>
                        <TableHead className="font-semibold text-primary w-[140px]">Literal English</TableHead>
                        <TableHead className="font-semibold text-primary w-[180px]">
                          Gen-Z Interpretation
                        </TableHead>
                        <TableHead className="font-semibold text-primary w-[160px]">
                          Action Step
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {verses && verses.length > 0 ? (
                        verses.map((verse) => (
                          <TableRow
                            key={`${verse.chapter}-${verse.verse}`}
                            className="cursor-pointer hover:bg-primary/5 transition-colors"
                            onClick={() => onVerseSelect(Number(verse.chapter), Number(verse.verse))}
                          >
                            <TableCell className="font-medium text-primary align-top sticky left-0 bg-card/80 backdrop-blur-sm z-10">
                              <span className="text-sm font-bold whitespace-nowrap">
                                {verse.chapter.toString()}:{verse.verse.toString()}
                              </span>
                            </TableCell>
                            <TableCell className="text-sm text-foreground align-top">
                              <p className="leading-relaxed font-serif whitespace-normal break-words">{verse.sanskrit || '—'}</p>
                            </TableCell>
                            <TableCell className="text-sm text-foreground align-top">
                              <p className="leading-relaxed whitespace-normal break-words">{verse.englishMeaning || '—'}</p>
                            </TableCell>
                            <TableCell className="text-sm text-foreground align-top">
                              <p className="leading-relaxed font-medium text-primary/90 whitespace-normal break-words">
                                {verse.genZKrishnaInterpretation?.trim() || '—'}
                              </p>
                            </TableCell>
                            <TableCell className="text-sm text-foreground align-top">
                              <p className="leading-relaxed whitespace-normal break-words">
                                {verse.actionStep?.trim() || '—'}
                              </p>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                            No verses available for this chapter yet.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </>
          )}
        </div>
      )}
    </div>
  );
}
