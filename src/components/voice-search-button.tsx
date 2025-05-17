
import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVoiceSearch } from '@/hooks/use-voice-search';
import { cn } from '@/lib/utils';

interface VoiceSearchButtonProps {
  className?: string;
  onSearchResult?: (text: string) => void;
}

export function VoiceSearchButton({ 
  className,
  onSearchResult 
}: VoiceSearchButtonProps) {
  const { 
    isListening, 
    startListening, 
    stopListening, 
    transcript, 
    hasRecognitionSupport 
  } = useVoiceSearch({
    onResult: (text) => {
      if (onSearchResult) {
        onSearchResult(text);
      }
    }
  });

  if (!hasRecognitionSupport) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      className={cn(
        "rounded-full transition-all duration-200", 
        isListening ? "bg-red-100 text-red-500 dark:bg-red-900/30 animate-pulse" : "",
        className
      )}
      onClick={isListening ? stopListening : startListening}
      aria-label={isListening ? "Stop voice search" : "Start voice search"}
    >
      {isListening ? (
        <MicOff className="h-4 w-4" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  );
}
