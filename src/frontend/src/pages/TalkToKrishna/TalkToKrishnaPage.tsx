import { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatThread from '@/components/chat/ChatThread';
import ChatComposer from '@/components/chat/ChatComposer';
import ChatSafetyModal from '@/components/chat/ChatSafetyModal';
import SafeImage from '@/components/common/SafeImage';
import { useSession } from '@/state/sessionContext';
import { useChatbotResponse } from '@/hooks/useQueries';
import { Verse, Mood } from '@/backend';

type Message = {
  id: string;
  role: 'user' | 'krishna';
  content: string;
  verse?: Verse;
  followUpQuestions?: string[];
  actionStep?: string;
};

const moodLabels: Record<Mood, string> = {
  [Mood.anxious]: 'Anxious',
  [Mood.lost]: 'Lost',
  [Mood.angry]: 'Angry',
  [Mood.sad]: 'Sad',
  [Mood.motivated]: 'Motivated',
  [Mood.calm]: 'Calm',
};

export default function TalkToKrishnaPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const { mood, sessionHistory, addToHistory, consumePendingMessage } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasConsumedPending = useRef(false);

  const { mutate: sendMessage, isPending } = useChatbotResponse();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-send pending message from Home on mount
  useEffect(() => {
    if (!hasConsumedPending.current) {
      const pending = consumePendingMessage();
      if (pending) {
        handleSendMessage(pending);
      }
      hasConsumedPending.current = true;
    }
  }, [consumePendingMessage]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    addToHistory(text);

    sendMessage(
      { userMessage: text, mood: mood || null, sessionHistory },
      {
        onSuccess: (response) => {
          // Guard against empty/undefined values and ensure safe display
          const supportiveMessage = response.supportiveMessage?.trim() || 
            "I'm here to help you navigate through this. Let's explore the wisdom of the Gita together.";
          
          const actionStep = response.actionStep?.trim() || 
            "Take a moment to reflect on your feelings and know that guidance is always available.";
          
          const followUpQuestions = Array.isArray(response.followUpQuestions) && response.followUpQuestions.length > 0
            ? response.followUpQuestions
            : ["What's been on your mind lately?", "How are you feeling right now?", "What would help you most today?"];

          const krishnaMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'krishna',
            content: supportiveMessage,
            verse: response.selectedVerse || undefined,
            followUpQuestions: followUpQuestions,
            actionStep: actionStep,
          };
          setMessages((prev) => [...prev, krishnaMessage]);
        },
      }
    );
  };

  const handleFollowUpClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-var(--top-menu-height)-4rem)]">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-lg border-b border-border/50 px-4 py-3 shrink-0">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SafeImage
              src="/assets/generated/lord-krishna-portrait.dim_1024x1024.png"
              alt="Krishna"
              className="w-10 h-10 rounded-full border-2 border-primary/20"
            />
            <div>
              <h1 className="text-lg font-semibold text-primary">Talk to Krishna</h1>
              {mood && (
                <p className="text-xs text-muted-foreground">
                  Mood: <span className="text-primary font-medium">{moodLabels[mood]}</span>
                </p>
              )}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowSafetyModal(true)}>
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Scrollable chat thread */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <SafeImage
                src="/assets/generated/lord-krishna-portrait.dim_1024x1024.png"
                alt="Krishna"
                className="w-24 h-24 rounded-full mx-auto border-4 border-primary/20 shadow-lg"
              />
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">Hey there! 👋</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  I'm here to listen and guide you. Share what's on your mind, and let's figure it out together.
                </p>
              </div>
            </div>
          ) : (
            <>
              <ChatThread messages={messages} onFollowUpClick={handleFollowUpClick} />
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Fixed composer at bottom */}
      <div className="shrink-0 bg-card/95 backdrop-blur-lg border-t border-border/50 px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <ChatComposer onSend={handleSendMessage} disabled={isPending} />
        </div>
      </div>

      <ChatSafetyModal open={showSafetyModal} onOpenChange={setShowSafetyModal} />
    </div>
  );
}
