import { Button } from '@/components/ui/button';

export default function FollowUpQuestions({
  questions,
  onQuestionClick,
}: {
  questions: string[];
  onQuestionClick: (question: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-primary font-medium">You might want to explore:</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onQuestionClick(question)}
            className="rounded-full text-xs border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-all"
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
}
