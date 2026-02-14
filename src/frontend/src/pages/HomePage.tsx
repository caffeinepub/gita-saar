import { Sparkles, BookHeart, Compass, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SiX, SiInstagram } from 'react-icons/si';
import HomeAskKrishnaChat from '@/components/chat/HomeAskKrishnaChat';
import SafeImage from '@/components/common/SafeImage';
import { useSession } from '@/state/sessionContext';

type TabId = 'home' | 'read' | 'chat' | 'discover';

export default function HomePage({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'gita-saar'
  );
  const { setReadGitaIntent } = useSession();

  const handleOpenTodaysWisdom = () => {
    setReadGitaIntent('today');
    onNavigate('read');
  };

  const handleReadGita = () => {
    setReadGitaIntent('chapters');
    onNavigate('read');
  };

  return (
    <div className="min-h-screen">
      {/* Pinned top section - Krishna portrait + chat widget */}
      <div className="sticky top-[var(--top-menu-height)] z-40 bg-background/95 backdrop-blur-lg border-b border-border/50 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
            {/* Krishna portrait */}
            <SafeImage
              src="/assets/generated/lord-krishna-portrait.dim_1024x1024.png"
              alt="Lord Krishna"
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-lg border-4 border-primary/20 shrink-0"
            />
            
            {/* Home Ask Krishna Chat - inline chat with expansion */}
            <div className="flex-1 w-full">
              <HomeAskKrishnaChat />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="relative">
        {/* Header with logo */}
        <header className="bg-background/90 backdrop-blur-lg border-b border-border/50">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <SafeImage 
                src="/assets/generated/gita-saar-logo.dim_512x512.png" 
                alt="Gita Saar" 
                className="w-8 h-8" 
              />
              <h1 className="text-lg font-semibold text-primary">Gita Saar</h1>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="relative max-w-2xl mx-auto px-6 py-12 text-center">
            <div className="animate-fade-in mb-6">
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-3 leading-tight font-serif">
                When life gets confusing,<br />
                <span className="text-foreground">Krishna still has answers.</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
                The Bhagavad Gita — decoded for overthinkers, anxious minds, and curious Gen-Z souls.
              </p>
            </div>

            {/* Primary CTAs - side by side */}
            <div className="flex flex-wrap gap-3 justify-center mb-8 animate-slide-up">
              <Button
                size="lg"
                className="rounded-full text-sm md:text-base font-medium shadow-lg hover:shadow-purple-glow transition-all duration-300 hover:scale-105 px-6"
                onClick={handleOpenTodaysWisdom}
              >
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Open today's wisdom
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full text-sm md:text-base font-medium border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 px-6"
                onClick={() => onNavigate('discover')}
              >
                <Compass className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Find by mood
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-2xl mx-auto px-6 py-12">
          <div className="grid gap-4">
            <FeatureCard
              icon={<BookHeart className="w-6 h-6" />}
              title="Read the Gita"
              description="All 18 chapters, decoded in simple English, Hindi, and Gen-Z Hinglish"
              onClick={handleReadGita}
            />
            <FeatureCard
              icon={<MessageCircle className="w-6 h-6" />}
              title="Chat with Krishna"
              description="Your wise best friend who listens first, then guides with clarity"
              onClick={() => onNavigate('chat')}
            />
            <FeatureCard
              icon={<Compass className="w-6 h-6" />}
              title="Discover by Mood"
              description="Feeling anxious, lost, or motivated? Find verses that speak to you"
              onClick={() => onNavigate('discover')}
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="max-w-2xl mx-auto px-6 py-8 mt-12 border-t border-border/50">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Built with <span className="text-red-500">♥</span> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Follow us on X (Twitter)"
              >
                <SiX className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Follow us on Instagram"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">© {currentYear} Gita Saar. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <Card
      className="p-6 cursor-pointer hover:shadow-lg hover:shadow-purple-glow/20 transition-all duration-300 hover:scale-[1.02] border-border/50 bg-card/80 backdrop-blur-sm"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-primary/15 text-primary shadow-sm">{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-primary mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
}
