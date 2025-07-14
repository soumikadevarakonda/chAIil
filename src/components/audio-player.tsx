// src/components/audio-player.tsx
'use client';
import { Button } from '@/components/ui/button';
import { Loader2, Volume2 } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

type AudioPlayerProps = {
  audioDataUri: string | null;
  onGetAudio: () => void;
  isLoading: boolean;
};

export function AudioPlayer({ audioDataUri, onGetAudio, isLoading }: AudioPlayerProps) {
  const { t } = useLanguage();

  if (audioDataUri) {
    return <audio controls src={audioDataUri} className="w-full" />;
  }

  return (
    <Button onClick={onGetAudio} disabled={isLoading} variant="outline" size="sm">
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Volume2 className="mr-2 h-4 w-4" />
      )}
      {t('audio_player_play_button')}
    </Button>
  );
}
