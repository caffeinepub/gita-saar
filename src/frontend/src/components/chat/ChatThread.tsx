import VerseCard from '@/components/verse/VerseCard';
import FollowUpQuestions from './FollowUpQuestions';
import type { Verse } from '@/backend';
import { Lightbulb } from 'lucide-react';

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
              {/* Krishna's supportive message */}
              <div className="px-4 py-3 rounded-2xl bg-card/80 border border-border/50 shadow-sm backdrop-blur-sm">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{message.content}</p>
              </div>

              {/* Verse card if available */}
              {message.verse && (
                <div className="mt-4">
                  <VerseCard verse={message.verse} />
                </div>
              )}

              {/* No verse hint - only show when there's no verse but we have content */}
              {!message.verse && message.content && (
                <div className="px-3 py-2 rounded-lg bg-muted/50 border border-border/30">
                  <p className="text-xs text-muted-foreground italic">
                    Guidance based on Gita wisdom, with specific verses coming as the knowledge base grows.
                  </p>
                </div>
              )}

              {/* Action Step - always display when present */}
              {message.actionStep && (
                <div className="px-4 py-3 rounded-xl bg-primary/5 border border-primary/20 shadow-sm">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-primary mb-1">Action Step</p>
                      <p className="text-sm text-foreground leading-relaxed">{message.actionStep}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Follow-up questions */}
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
