import { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Verse } from '@/backend';

export default function VerseCard({ verse }: { verse: Verse }) {
  const [showSanskrit, setShowSanskrit] = useState(false);

  return (
    <Card className="p-6 space-y-6 border-border/50 bg-card/80 backdrop-blur-sm shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shadow-sm">
            <span className="text-sm font-bold text-primary">{verse.chapter.toString()}</span>
          </div>
          <h3 className="text-lg font-semibold text-primary">
            Chapter {verse.chapter.toString()}, Verse {verse.verse.toString()}
          </h3>
        </div>
      </div>

      {/* Sanskrit (collapsible) */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSanskrit(!showSanskrit)}
          className="mb-2 -ml-2 text-primary hover:text-primary hover:bg-primary/10"
        >
          {showSanskrit ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
          <span className="font-medium">Sanskrit (Original Verse)</span>
        </Button>
        {showSanskrit && (
          <div className="p-4 rounded-2xl bg-accent/30 border border-border/30">
            <p className="text-sm text-foreground font-serif italic leading-relaxed">{verse.sanskrit}</p>
          </div>
        )}
      </div>

      {/* Responsive Layout for 4 parts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Literal Hindi Translation */}
        <div className="p-4 rounded-2xl bg-secondary/40 border border-border/30">
          <h4 className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
            Literal Hindi Translation
          </h4>
          <p className="text-sm text-foreground leading-relaxed">{verse.hindiMeaning}</p>
        </div>

        {/* Literal English Translation */}
        <div className="p-4 rounded-2xl bg-accent/30 border border-border/30">
          <h4 className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
            Literal English Translation
          </h4>
          <p className="text-sm text-foreground leading-relaxed">{verse.englishMeaning}</p>
        </div>

        {/* Gen-Z Interpretation (full width on mobile, spans both columns on larger screens) */}
        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 md:col-span-2">
          <h4 className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">Gen Z Interpretation</h4>
          <p className="text-sm text-foreground leading-relaxed font-medium">{verse.genZKrishnaInterpretation}</p>
        </div>
      </div>

      {/* Action Step - Always visible and distinct */}
      <div className="pt-4 border-t border-border/50">
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 shadow-sm">
          <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Action Step</h4>
            <p className="text-sm text-foreground leading-relaxed font-medium">{verse.actionStep}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
