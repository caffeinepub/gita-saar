import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/settings/ThemeToggle';

type TabId = 'home' | 'read' | 'chat' | 'discover';

interface TopMenuBarProps {
  activeTab: TabId;
  onNavigate: (tab: TabId) => void;
}

export default function TopMenuBar({ activeTab, onNavigate }: TopMenuBarProps) {
  const handleHomeClick = () => {
    if (activeTab === 'home') {
      // Only scroll if window is defined (browser environment)
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      onNavigate('home');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleHomeClick}
            className={`font-medium ${
              activeTab === 'home'
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
            }`}
          >
            Home
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('read')}
            className={`font-medium ${
              activeTab === 'read'
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
            }`}
          >
            Read Gita
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('discover')}
            className={`font-medium ${
              activeTab === 'discover'
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
            }`}
          >
            Discover
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('chat')}
            className={`font-medium ${
              activeTab === 'chat'
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
            }`}
          >
            Ask Krishna
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
