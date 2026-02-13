import { useState } from 'react';
import { BookOpen, Sparkles, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetAllChapters } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function ChapterListView({
  onChapterSelect,
  onShowToday,
}: {
  onChapterSelect: (chapterNumber: number) => void;
  onShowToday: () => void;
}) {
  const { data: chapters, isLoading } = useGetAllChapters();
  const [searchQuery, setSearchQuery] = useState('');

  // Sort chapters by number and filter by search query
  const sortedChapters = chapters
    ? [...chapters].sort((a, b) => Number(a.number) - Number(b.number))
    : [];

  const filteredChapters = sortedChapters.filter((chapter) => {
    const query = searchQuery.toLowerCase();
    return (
      chapter.englishTitle.toLowerCase().includes(query) ||
      chapter.sanskritSubtitle.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary font-serif">Read the Bhagavad Gita</h1>
        </div>
        <p className="text-muted-foreground">18 chapters. One conversation that changed everything.</p>
      </header>

      {/* Today's Wisdom CTA */}
      <Button
        size="lg"
        className="w-full mb-6 rounded-full shadow-md hover:shadow-purple-glow transition-all duration-300 hover:scale-[1.02]"
        onClick={onShowToday}
      >
        <Sparkles className="w-5 h-5 mr-2" />
        Today's Wisdom
      </Button>

      {/* Search Input */}
      <div className="mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search chapters or topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 rounded-full border-border/50 bg-card/80 backdrop-blur-sm focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Chapter List */}
      <div className="space-y-3">
        {isLoading ? (
          <>
            {[...Array(18)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </>
        ) : filteredChapters && filteredChapters.length > 0 ? (
          filteredChapters.map((chapter) => (
            <Card
              key={chapter.number}
              className="p-5 cursor-pointer hover:shadow-lg hover:shadow-purple-glow/20 transition-all duration-300 hover:scale-[1.02] border-border/50 bg-card/80 backdrop-blur-sm"
              onClick={() => onChapterSelect(Number(chapter.number))}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center shadow-sm">
                  <span className="text-lg font-bold text-primary">{chapter.number.toString()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-primary mb-1">{chapter.englishTitle}</h3>
                  <p className="text-sm text-muted-foreground mb-2 italic">{chapter.sanskritSubtitle}</p>
                  <p className="text-xs text-muted-foreground">({chapter.verseCount.toString()})</p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No chapters found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
