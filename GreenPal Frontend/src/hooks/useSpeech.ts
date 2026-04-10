"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface SpeechState {
  isSpeaking: boolean;
  isPaused: boolean;
}

export function useSpeech() {
  const [state, setState] = useState<SpeechState>({
    isSpeaking: false,
    isPaused: false,
  });
  
  const synth = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synth.current = window.speechSynthesis;
    }
    return () => {
      if (synth.current) synth.current.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    if (synth.current) {
      synth.current.cancel();
      setState({ isSpeaking: false, isPaused: false });
    }
  }, []);

  const pause = useCallback(() => {
    if (synth.current && state.isSpeaking) {
      synth.current.pause();
      setState(prev => ({ ...prev, isPaused: true }));
    }
  }, [state.isSpeaking]);

  const resume = useCallback(() => {
    if (synth.current && state.isPaused) {
      synth.current.resume();
      setState(prev => ({ ...prev, isPaused: false }));
    }
  }, [state.isPaused]);

  const speak = useCallback((text: string, lang: string = "en") => {
    if (!synth.current) return;

    // Stop any current speech
    synth.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt to find a matching voice
    const voices = synth.current.getVoices();
    
    // Helper to find regional variants if available
    const findVoice = (langCode: string) => {
      return voices.find(v => v.lang.startsWith(langCode)) || 
             voices.find(v => v.lang.slice(0, 2) === langCode.slice(0, 2));
    };

    const voice = findVoice(lang);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.lang = lang;
    utterance.rate = 0.9; // Slightly slower for better clarity
    utterance.pitch = 1.0;

    utterance.onstart = () => setState({ isSpeaking: true, isPaused: false });
    utterance.onend = () => setState({ isSpeaking: false, isPaused: false });
    utterance.onerror = () => setState({ isSpeaking: false, isPaused: false });

    utteranceRef.current = utterance;
    synth.current.speak(utterance);
  }, []);

  return {
    ...state,
    speak,
    stop,
    pause,
    resume
  };
}
