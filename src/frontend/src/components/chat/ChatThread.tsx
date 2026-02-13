import VerseCard from '@/components/verse/VerseCard';
import FollowUpQuestions from './FollowUpQuestions';
import type { Verse } from '@/backend';

type Message = {
  id: string;
  role: 'user' | 'krishna';
  content: string;
  verse?: Verse;
  followUpQuestions?: string[];
  actionStep?: string;
};

export default function ChatThread({
  messages,
  onFollowUpClick,
}: {
  messages: Message[];
  onFollowUpClick: (question: string) => void;
}) {
  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          {message.role === 'user' ? (
            <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-primary/15 border border-primary/20 shadow-sm">
              <p className="text-sm text-foreground">{message.content}</p>
            </div>
          ) : (
            <div className="max-w-full space-y-4">
              <div className="px-4 py-3 rounded-2xl bg-card/80 border border-border/50 shadow-sm backdrop-blur-sm">
                <p className="text-sm text-foreground leading-relaxed">{message.content}</p>
              </div>
              {message.verse && (
                <div className="mt-4">
                  <VerseCard verse={message.verse} />
                </div>
              )}
              {message.followUpQuestions && message.followUpQuestions.length > 0 && (
                <div className="mt-4">
                  <FollowUpQuestions questions={message.followUpQuestions} onQuestionClick={onFollowUpClick} />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
