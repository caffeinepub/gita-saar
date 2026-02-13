import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface MiniAskKrishnaWidgetProps {
  onSubmit: (message: string) => void;
}

export default function MiniAskKrishnaWidget({ onSubmit }: MiniAskKrishnaWidgetProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const textToSend = message.trim();
    if (textToSend) {
      onSubmit(textToSend);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="p-4 bg-card/90 backdrop-blur-sm border-primary/20 shadow-lg">
      <h3 className="text-sm font-semibold text-primary mb-3">Ask Krishna</h3>
      <div className="flex items-end gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="What's on your mind?"
          className="min-h-[48px] max-h-24 resize-none rounded-2xl text-sm"
          rows={1}
        />
        <Button
          onClick={handleSend}
          disabled={!message.trim()}
          className="rounded-full w-12 h-12 shrink-0"
          size="icon"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
}
