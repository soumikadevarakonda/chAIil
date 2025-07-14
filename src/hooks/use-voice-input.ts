// src/hooks/use-voice-input.ts
'use client';
import { useState, useEffect, useRef } from 'react';

type UseVoiceInputOptions = {
  onTranscript: (transcript: string) => void;
};

export function useVoiceInput({ onTranscript }: UseVoiceInputOptions) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(interimTranscript);
      if (finalTranscript) {
        onTranscript(finalTranscript + ' '); // Add space for better sentence separation
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
    }

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [onTranscript]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setTranscript('');
      } catch (error) {
          console.error("Could not start recognition", error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return { isListening, transcript, startListening, stopListening };
}
