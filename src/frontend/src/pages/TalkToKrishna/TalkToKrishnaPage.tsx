import { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatThread from '@/components/chat/ChatThread';
import ChatComposer from '@/components/chat/ChatComposer';
import ChatSafetyModal from '@/components/chat/ChatSafetyModal';
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
  const { mood, sessionHistory, addToHistory } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { mutate: sendMessage, isPending } = useChatbotResponse();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    addToHistory(content);

    sendMessage(
      {
        userMessage: content,
        mood: mood || null,
        sessionHistory,
      },
      {
        onSuccess: (response) => {
          const krishnaMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'krishna',
            content: response.supportiveMessage,
            verse: response.selectedVerse,
            followUpQuestions: response.followUpQuestions,
            actionStep: response.actionStep,
          };
          setMessages((prev) => [...prev, krishnaMessage]);
        },
      }
    );
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      {/* Header */}
      <header className="bg-background/90 backdrop-blur-lg border-b border-border/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary font-serif">Talk to Krishna</h1>
            {mood && (
              <p className="text-xs text-muted-foreground">
                Current mood: <span className="capitalize text-primary">{moodLabels[mood]}</span>
              </p>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={() => setShowSafetyModal(true)} className="text-primary hover:text-primary hover:bg-primary/10">
            <Info className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Chat Thread */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mb-4 shadow-sm">
              <img src="/assets/generated/gita-saar-logo.dim_512x512.png" alt="Krishna" className="w-12 h-12" />
            </div>
            <h2 className="text-xl font-semibold text-primary mb-2">Hey, I'm here for you</h2>
            <p className="text-muted-foreground mb-6">
              Whatever's on your mind, just share it. No judgment, only clarity.
            </p>
          </div>
        ) : (
          <ChatThread messages={messages} onFollowUpClick={handleSendMessage} />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Composer */}
      <div className="sticky bottom-0 bg-background/90 backdrop-blur-lg border-t border-border/50 px-4 py-4">
        <ChatComposer onSend={handleSendMessage} disabled={isPending} />
      </div>

      {/* Safety Modal */}
      <ChatSafetyModal open={showSafetyModal} onOpenChange={setShowSafetyModal} />
    </div>
  );
}
