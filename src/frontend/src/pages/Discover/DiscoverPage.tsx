import { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';
import { Card } from '@/components/ui/card';
import MoodDetailView from './MoodDetailView';
import { useSession } from '@/state/sessionContext';
import { Mood } from '@/backend';

type TabId = 'home' | 'read' | 'chat' | 'discover';

const moods: Array<{ mood: Mood; label: string; tagline: string; emoji: string }> = [
  { mood: Mood.anxious, label: 'Anxious', tagline: 'Dimaag ruk hi nahi raha', emoji: '😰' },
  { mood: Mood.lost, label: 'Lost', tagline: 'Samajh nahi aa raha kya karoon', emoji: '😕' },
  { mood: Mood.angry, label: 'Angry', tagline: 'Gussa control ke bahar', emoji: '😡' },
  { mood: Mood.sad, label: 'Sad', tagline: 'Dil heavy lag raha hai', emoji: '😔' },
  { mood: Mood.motivated, label: 'Motivated', tagline: 'Kuch kar dikhana hai', emoji: '🔥' },
  { mood: Mood.calm, label: 'Calm', tagline: 'Peace maintain karni hai', emoji: '🧘' },
];

export default function DiscoverPage({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const { setMood } = useSession();

  // Scroll to top when switching between mood grid and detail view
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedMood]);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleBack = () => {
    setSelectedMood(null);
  };

  const handleTalkToKrishna = (mood: Mood) => {
    setMood(mood);
    onNavigate('chat');
  };

  if (selectedMood) {
    return (
      <MoodDetailView mood={selectedMood} onBack={handleBack} onTalkToKrishna={() => handleTalkToKrishna(selectedMood)} />
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Compass className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary font-serif">What brings you here today?</h1>
        </div>
        <p className="text-muted-foreground">Choose what resonates. The Gita will meet you where you are.</p>
      </header>

      {/* Mood Cards */}
      <div className="grid grid-cols-2 gap-3">
        {moods.map(({ mood, label, tagline, emoji }) => (
          <Card
            key={mood}
            className="p-5 cursor-pointer hover:shadow-lg hover:shadow-purple-glow/20 transition-all duration-300 hover:scale-[1.02] border-border/50 bg-card/80 backdrop-blur-sm"
            onClick={() => handleMoodSelect(mood)}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">{emoji}</div>
              <h3 className="text-lg font-semibold text-primary mb-1">{label}</h3>
              <p className="text-xs text-muted-foreground italic">"{tagline}"</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
