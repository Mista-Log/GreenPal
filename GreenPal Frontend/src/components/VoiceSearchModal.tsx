"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { motion, AnimatePresence } from "framer-motion";

type VoiceSearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onResult: (transcript: string) => void;
};

export default function VoiceSearchModal({
  isOpen,
  onClose,
  onResult,
}: VoiceSearchModalProps) {
  const { t, i18n } = useTranslation();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [status, setStatus] = useState<"idle" | "listening" | "error">("idle");

  const getRecognitionLocale = useCallback((code: string) => {
    const localeMap: Record<string, string> = {
      en: "en-NG",
      ha: "ha-NG",
      yo: "yo-NG",
      ig: "ig-NG",
      pcm: "en-NG",
    };
    return localeMap[code] || "en-NG";
  }, []);

  const getLanguageDisplayName = useCallback((code: string) => {
    const names: Record<string, string> = {
      en: "English",
      ha: "Hausa",
      yo: "Yorùbá",
      ig: "Igbo",
      pcm: "Nigerian Pidgin",
    };
    return names[code] || names.en;
  }, []);

  const getLanguageGreeting = useCallback((code: string) => {
    const greetings: Record<string, string> = {
      en: "Listening...",
      ha: "Na sauraro...",
      yo: "Nti'le...",
      ig: "Anụrụ m ihe...",
      pcm: "I de listen...",
    };
    return greetings[code] || greetings.en;
  }, []);

  const startListening = useCallback(() => {
    resetTranscript();
    const locale = getRecognitionLocale(i18n.language);
    SpeechRecognition.startListening({
      continuous: true,
      language: locale,
    });
  }, [getRecognitionLocale, i18n.language, resetTranscript]);

  const stopListening = useCallback(() => {
    SpeechRecognition.stopListening();
  }, []);

  // Sync modal state with speech recognition API (external system)
  useEffect(() => {
    if (isOpen) {
      startListening();
    } else {
      stopListening();
    }
    return () => {
      stopListening();
    };
  }, [isOpen, startListening, stopListening]);

  // Handle results - process when listening stops (either manually or by timeout)
  useEffect(() => {
    if (transcript && !listening) {
      const finalTranscript = transcript.trim();
      if (finalTranscript) {
        onResult(finalTranscript);
        onClose();
      }
    }
  }, [transcript, listening, onResult, onClose]);

  useEffect(() => {
    if (listening) {
      setStatus("listening");
    }
  }, [listening]);

  const isCurrentlyListening = listening || status === "listening";

  // 2. Silence detection: If listening and we have some speech, stop after 2.5s of no new speech
  useEffect(() => {
    if (listening && transcript) {
      const silenceTimer = setTimeout(() => {
        SpeechRecognition.stopListening();
      }, 2500);

      return () => clearTimeout(silenceTimer);
    }
  }, [listening, transcript]);

  // 3. Initial timeout: If listening but NO speech at all, stop after 8s
  useEffect(() => {
    if (listening && !transcript) {
      const initialTimer = setTimeout(() => {
        setStatus("error");
        SpeechRecognition.stopListening();
      }, 8000);

      return () => clearTimeout(initialTimer);
    }
  }, [listening, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-sm overflow-hidden rounded-[40px] bg-surface-container-high p-8 text-center shadow-2xl border border-outline-variant/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Application Branding */}
            <div className="mb-12 flex justify-center">
              <span className="font-borel text-3xl font-normal tracking-tight text-primary">
                Greenpal
              </span>
            </div>

            {/* Mic Circle */}
            <div className="relative mb-10 flex justify-center">
              {isCurrentlyListening ? (
                <>
                  {/* Pulsing rings */}
                  <motion.div
                    animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeOut",
                    }}
                    className="absolute h-24 w-24 rounded-full bg-primary/20"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeOut",
                    }}
                    className="absolute h-24 w-24 rounded-full bg-primary/30"
                  />
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/20">
                    <span className="material-symbols-rounded text-4xl text-on-primary">
                      mic
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-outline-variant bg-transparent">
                  <span className="material-symbols-rounded text-4xl text-on-surface-variant">
                    mic_off
                  </span>
                </div>
              )}
            </div>

            {/* Instruction Text */}
            <div className="mb-8 min-h-[4rem] flex items-center justify-center">
              <h2 className="text-xl font-normal text-on-surface leading-snug">
                {isCurrentlyListening
                  ? transcript || getLanguageGreeting(i18n.language)
                  : t("voice.failed")}
              </h2>
            </div>

            {/* Error Actions */}
            {status === "error" && (
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={startListening}
                  className="rounded-full bg-primary-container px-8 py-3 text-sm font-semibold text-on-primary-container transition-all hover:bg-primary-container/80 active:scale-95"
                >
                  {t("voice.retry")}
                </button>
              </div>
            )}

            {/* Bottom Info */}
            <div className="mt-8 pt-6 border-t border-outline-variant/30">
              <p className="text-xs font-medium text-on-surface-variant flex items-center justify-center gap-2">
                <span className="material-symbols-rounded text-sm">
                  language
                </span>
                {t("voice.listening", {
                  language: getLanguageDisplayName(i18n.language),
                })}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
