import { useState, useEffect } from 'react';
import ChapterListView from './ChapterListView';
import ChapterDetailView from './ChapterDetailView';
import VerseDetailView from './VerseDetailView';
import TodaysWisdomCard from '@/components/today/TodaysWisdomCard';
import { useSession } from '@/state/sessionContext';

type View = 'chapters' | 'today' | 'chapter-detail' | 'verse-detail';

export default function ReadGitaPage({ isActive }: { isActive: boolean }) {
  const [view, setView] = useState<View>('chapters');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<{ chapter: number; verse: number } | null>(null);
  const { consumeReadGitaIntent } = useSession();

  // Consume navigation intent when tab becomes active
  useEffect(() => {
    if (isActive) {
      const intent = consumeReadGitaIntent();
      if (intent === 'today') {
        setView('today');
      } else if (intent === 'chapters') {
        // Reset to chapter list view
        setView('chapters');
        setSelectedChapter(null);
        setSelectedVerse(null);
      }
    }
  }, [isActive, consumeReadGitaIntent]);

  // Scroll to top whenever view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

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
