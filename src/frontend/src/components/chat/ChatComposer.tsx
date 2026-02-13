import { useState } from 'react';
import { Send, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSpeechToText } from '@/hooks/useSpeechToText';

const placeholders = ['Bol, kya chal raha hai dimaag mein?', 'Jo feel ho raha hai, bol de…'];

export default function ChatComposer({ onSend, disabled }: { onSend: (message: string) => void; disabled?: boolean }) {
  const [message, setMessage] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const { isListening, startListening, stopListening, transcript } = useSpeechToText();

  const handleSend = () => {
    const textToSend = message.trim() || transcript.trim();
    if (textToSend && !disabled) {
      onSend(textToSend);
      setMessage('');
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
      if (transcript) {
        setMessage(transcript);
      }
    } else {
      startListening();
    }
  };

  const displayText = message || (isListening ? transcript : '');

  return (
    <div className="flex items-end gap-2">
      <div className="flex-1 relative">
        <Textarea
          value={displayText}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={placeholders[placeholderIndex]}
          disabled={disabled || isListening}
          className="min-h-[48px] max-h-32 resize-none rounded-3xl pr-12 text-sm"
          rows={1}
        />
      </div>
      <Button
        variant={isListening ? 'destructive' : 'outline'}
        size="icon"
        onClick={handleVoiceToggle}
        disabled={disabled}
        className="rounded-full w-12 h-12 flex-shrink-0"
      >
        <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
      </Button>
      <Button
        onClick={handleSend}
        disabled={disabled || (!message.trim() && !transcript.trim())}
        className="rounded-full w-12 h-12 flex-shrink-0"
        size="icon"
      >
        <Send className="w-5 h-5" />
      </Button>
    </div>
  );
}
