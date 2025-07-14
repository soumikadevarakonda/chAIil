// src/components/voice-input-button.tsx
'use client';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';

type VoiceInputButtonProps = {
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
};

export function VoiceInputButton({ isListening, onStart, onStop }: VoiceInputButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="absolute bottom-2 right-2"
      onClick={isListening ? onStop : onStart}
    >
      {isListening ? <MicOff className="text-destructive" /> : <Mic />}
      <span className="sr-only">{isListening ? 'Stop listening' : 'Start listening'}</span>
    </Button>
  );
}
