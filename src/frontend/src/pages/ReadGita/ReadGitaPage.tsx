import { useState } from 'react';
import ChapterListView from './ChapterListView';
import ChapterDetailView from './ChapterDetailView';
import VerseDetailView from './VerseDetailView';
import TodaysWisdomCard from '@/components/today/TodaysWisdomCard';

type View = 'chapters' | 'today' | 'chapter-detail' | 'verse-detail';

export default function ReadGitaPage() {
  const [view, setView] = useState<View>('chapters');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<{ chapter: number; verse: number } | null>(null);

  const handleChapterSelect = (chapterNumber: number) => {
    setSelectedChapter(chapterNumber);
    setView('chapter-detail');
  };

  const handleVerseSelect = (chapter: number, verse: number) => {
    setSelectedVerse({ chapter, verse });
    setView('verse-detail');
  };

  const handleBack = () => {
    if (view === 'verse-detail') {
      setView('chapter-detail');
      setSelectedVerse(null);
    } else if (view === 'chapter-detail') {
      setView('chapters');
      setSelectedChapter(null);
    } else if (view === 'today') {
      setView('chapters');
    }
  };

  const showTodaysWisdom = () => {
    setView('today');
  };

  return (
    <div className="min-h-screen">
      {view === 'chapters' && <ChapterListView onChapterSelect={handleChapterSelect} onShowToday={showTodaysWisdom} />}
      {view === 'today' && <TodaysWisdomCard onBack={handleBack} />}
      {view === 'chapter-detail' && selectedChapter && (
        <ChapterDetailView chapterNumber={selectedChapter} onVerseSelect={handleVerseSelect} onBack={handleBack} />
      )}
      {view === 'verse-detail' && selectedVerse && (
        <VerseDetailView chapter={selectedVerse.chapter} verse={selectedVerse.verse} onBack={handleBack} />
      )}
    </div>
  );
}
