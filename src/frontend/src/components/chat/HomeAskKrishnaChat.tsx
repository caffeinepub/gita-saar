import { useState, useRef, useEffect } from 'react';
import { X, Info, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ChatThread from './ChatThread';
import ChatComposer from './ChatComposer';
import ChatSafetyModal from './ChatSafetyModal';
import { useSession } from '@/state/sessionContext';
import { useChatbotResponse } from '@/hooks/useQueries';
import { Verse, Mood } from '@/backend';
import QueryErrorState from '@/components/common/QueryErrorState';

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

export default function HomeAskKrishnaChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState<string>('');
  const [errorState, setErrorState] = useState<string | null>(null);
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

  // Auto-consume pending message from mini widget on mount
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
    if (!text.trim() || isPending) return;

    // Clear any previous error
    setErrorState(null);

    // Expand on first message
    if (messages.length === 0) {
      setIsExpanded(true);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    addToHistory(text);
    setLastUserMessage(text);

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
        onError: (error) => {
          setErrorState(
            error instanceof Error 
              ? error.message 
              : 'Failed to get a response from Krishna. Please try again.'
          );
        },
      }
    );
  };

  const handleRetry = () => {
    if (lastUserMessage) {
      handleSendMessage(lastUserMessage);
    }
  };

  const handleFollowUpClick = (question: string) => {
    handleSendMessage(question);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setMessages([]);
    setErrorState(null);
  };

  // Compact mode - show mini widget
  if (!isExpanded) {
    return (
      <Card className="p-4 bg-card/90 backdrop-blur-sm border-primary/20 shadow-lg">
        <h3 className="text-sm font-semibold text-primary mb-3">Ask Krishna</h3>
        <ChatComposer onSend={handleSendMessage} disabled={isPending} />
      </Card>
    );
  }

  // Expanded mode - show full chat
  return (
    <Card className="bg-card/95 backdrop-blur-lg border-primary/20 shadow-2xl flex flex-col max-h-[70vh] md:max-h-[75vh]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-primary">Ask Krishna</h3>
          {mood && (
            <span className="text-xs text-muted-foreground">
              · <span className="text-primary font-medium">{moodLabels[mood]}</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => setShowSafetyModal(true)}>
            <Info className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable chat thread */}
      <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
        {messages.length === 0 ? (
          <div className="text-center py-8 space-y-3">
            <p className="text-sm text-muted-foreground">
              I'm here to listen and guide you. What's on your mind?
            </p>
          </div>
        ) : (
          <>
            <ChatThread messages={messages} onFollowUpClick={handleFollowUpClick} />
            {isPending && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Krishna is thinking...</span>
              </div>
            )}
            {errorState && (
              <div className="mt-4">
                <QueryErrorState message={errorState} onRetry={handleRetry} />
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Composer */}
      <div className="px-4 py-3 border-t border-border/50 shrink-0">
        <ChatComposer onSend={handleSendMessage} disabled={isPending} />
        {isPending && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Sending your message...
          </p>
        )}
      </div>

      {/* Safety Modal */}
      <ChatSafetyModal open={showSafetyModal} onOpenChange={setShowSafetyModal} />
    </Card>
  );
}
