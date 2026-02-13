import { AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function ChatSafetyModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-primary" />
            </div>
            <DialogTitle className="text-xl">Important to Know</DialogTitle>
          </div>
          <DialogDescription className="text-left space-y-3 pt-2">
            <p className="text-sm leading-relaxed">
              This chat is designed to help you reflect and find emotional clarity through the wisdom of the Bhagavad Gita.
            </p>
            <p className="text-sm leading-relaxed font-medium">
              <strong>This is not therapy or medical advice.</strong> If you're experiencing a mental health crisis or need
              professional support, please reach out to a qualified therapist or counselor.
            </p>
            <p className="text-sm leading-relaxed">
              Think of Krishna as a wise friend who helps you think more clearly—not as a replacement for professional care.
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
