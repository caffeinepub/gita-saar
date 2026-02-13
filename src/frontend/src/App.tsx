import { useState, useEffect } from 'react';
import { Home, BookOpen, MessageCircle, Compass } from 'lucide-react';
import HomePage from './pages/HomePage';
import ReadGitaPage from './pages/ReadGita/ReadGitaPage';
import TalkToKrishnaPage from './pages/TalkToKrishna/TalkToKrishnaPage';
import DiscoverPage from './pages/Discover/DiscoverPage';
import TopMenuBar from './components/layout/TopMenuBar';
import KrishnaLifeBackground from './components/decorations/KrishnaLifeBackground';
import { SessionProvider } from './state/sessionContext';
import { ThemeProvider } from 'next-themes';

// Developer note: See frontend/docs/APP_STRUCTURE_AND_FLOWS.md for architecture details

type TabId = 'home' | 'read' | 'chat' | 'discover';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');

  // Scroll to top whenever tab changes
  const handleTabChange = (newTab: TabId) => {
    setActiveTab(newTab);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <div className="relative min-h-screen bg-background pb-20">
          {/* Global Top Menu Bar - highest z-index for navigation */}
          <TopMenuBar activeTab={activeTab} onNavigate={handleTabChange} />

          {/* Krishna life background imagery - behind everything */}
          <KrishnaLifeBackground />

          {/* Tab content - explicitly above background with isolated stacking context */}
          <div className="relative z-10 pointer-events-auto">
            <div className={activeTab === 'home' ? 'block' : 'hidden'}>
              <HomePage onNavigate={handleTabChange} />
            </div>
            <div className={activeTab === 'read' ? 'block' : 'hidden'}>
              <ReadGitaPage isActive={activeTab === 'read'} />
            </div>
            <div className={activeTab === 'chat' ? 'block' : 'hidden'}>
              <TalkToKrishnaPage />
            </div>
            <div className={activeTab === 'discover' ? 'block' : 'hidden'}>
              <DiscoverPage onNavigate={handleTabChange} />
            </div>
          </div>

          {/* Fixed bottom navigation */}
          <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50 safe-area-bottom">
            <div className="flex items-center justify-around h-16 max-w-2xl mx-auto px-2">
              <TabButton
                icon={<Home className="w-5 h-5" />}
                label="Home"
                active={activeTab === 'home'}
                onClick={() => handleTabChange('home')}
              />
              <TabButton
                icon={<BookOpen className="w-5 h-5" />}
                label="Read Gita"
                active={activeTab === 'read'}
                onClick={() => handleTabChange('read')}
              />
              <TabButton
                icon={<MessageCircle className="w-5 h-5" />}
                label="Talk"
                active={activeTab === 'chat'}
                onClick={() => handleTabChange('chat')}
              />
              <TabButton
                icon={<Compass className="w-5 h-5" />}
                label="Discover"
                active={activeTab === 'discover'}
                onClick={() => handleTabChange('discover')}
              />
            </div>
          </nav>
        </div>
      </SessionProvider>
    </ThemeProvider>
  );
}

function TabButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 ${
        active
          ? 'text-primary bg-primary/15 scale-105 shadow-purple-glow'
          : 'text-muted-foreground hover:text-primary hover:bg-accent/50'
      }`}
    >
      <div className={`transition-transform ${active ? 'animate-gentle-bounce' : ''}`}>{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}
