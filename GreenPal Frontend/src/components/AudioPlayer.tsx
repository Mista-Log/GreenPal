"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AudioPlayerProps {
  duration: number; // in minutes
  title: string;
}

export default function AudioPlayer({ duration: durationInMins, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [phase, setPhase] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const durationInSeconds = durationInMins * 60;

  // Sync state with real (simulated/hidden) audio
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Simulate progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + (1 / durationInSeconds) * 100, 100));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress, durationInSeconds]);

  // Animate phase for running waves
  useEffect(() => {
    let animationFrame: number;
    if (isPlaying) {
      const animate = () => {
        setPhase((prev) => (prev + 0.1) % (Math.PI * 2));
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentTime = (progress / 100) * durationInSeconds;

  const generateWavyPath = (percent: number, phaseShift: number) => {
    const width = 400; // Match ViewBox
    const p = (percent / 100) * width;
    let d = "M 0 12";
    const step = 2; // High resolution for smooth sine wave
    
    for (let x = 1; x <= p; x += step) {
      // Pure sine wave for the expressive look
      const y = 12 + Math.sin((x / 12) + phaseShift) * 4;
      d += ` L ${x} ${y}`;
    }
    return d;
  };

  return (
    <div className="flex flex-col gap-6 rounded-[40px] bg-surface-container p-6">
      {/* Audio Title */}
      <div className="px-2">
        <h3 className="font-urbanist text-lg font-semibold text-on-surface">
          {title}
        </h3>
        <p className="text-xs font-medium text-on-surface-variant">
          Environmental Audio Tip
        </p>
      </div>

      {/* Expressive Squiggely Seek Bar */}
      <div className="flex flex-col gap-3">
        <div 
          className="relative h-12 w-full cursor-pointer flex items-center"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            setProgress((x / rect.width) * 100);
          }}
        >
          <svg viewBox="0 0 400 24" className="h-full w-full overflow-visible">
            {/* Background Track (Straight) */}
            <line
              x1="0"
              y1="12"
              x2="400"
              y2="12"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="text-on-surface/10"
            />
            

            {/* Completed Progress (Wavy Part) */}
            <motion.path
              d={generateWavyPath(progress, isPlaying ? phase : 0)}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="text-primary"
              animate={{
                d: generateWavyPath(progress, isPlaying ? phase : 0)
              }}
              transition={{ duration: 0.1, ease: "linear" }}
            />

            {/* Remaining Duration (Straight Thin Line) */}
            <line
              x1={progress * 4}
              y1="12"
              x2="400"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-on-surface/20"
            />

            {/* Thumb Control */}
            <motion.circle
              cx={progress * 4}
              cy="12"
              r="8"
              className="fill-primary"
              animate={{ 
                cx: progress * 4,
                scale: isPlaying ? 1.2 : 1
              }}
              transition={{ type: "spring", bounce: 0.3 }}
            />
          </svg>
        </div>

        {/* Time Info */}
        <div className="flex justify-between px-1">
          <span className="font-roboto text-xs font-medium text-on-surface-variant">
            {formatTime(currentTime)}
          </span>
          <span className="font-roboto text-xs font-medium text-on-surface-variant">
            {formatTime(durationInSeconds)}
          </span>
        </div>
      </div>

      {/* Controls Container (Big & Expressive - Theme Adaptive) */}
      <div className="flex items-center justify-center gap-2 mt-4 px-2">
        {/* Previous Button Container */}
        <button
          onClick={() => setProgress(0)}
          className="flex h-16 w-24 items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant transition-all hover:bg-on-surface/8 active:scale-95"
          aria-label="Previous"
        >
          <span className="material-symbols-rounded text-3xl">skip_previous</span>
        </button>

        {/* Play/Pause Button (Primary Expressive Center - Morphing Pill) */}
        <motion.button
          onClick={togglePlay}
          initial={false}
          animate={{
            width: isPlaying ? "112px" : "140px",
            backgroundColor: isPlaying ? "var(--md-sys-color-primary-container)" : "var(--md-sys-color-primary)",
            borderRadius: isPlaying ? "28px" : "40px",
          }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          className="flex h-18 items-center justify-center transition-all active:scale-90"
          style={{ 
            color: isPlaying ? "var(--md-sys-color-on-primary-container)" : "var(--md-sys-color-on-primary)"
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={isPlaying ? "pause" : "play"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="material-symbols-rounded text-4xl leading-none"
            >
              {isPlaying ? "pause" : "play_arrow"}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        {/* Next Button Container */}
        <button
          onClick={() => setProgress(100)}
          className="flex h-16 w-24 items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant transition-all hover:bg-on-surface/8 active:scale-95"
          aria-label="Next"
        >
          <span className="material-symbols-rounded text-3xl">skip_next</span>
        </button>
      </div>

      {/* Hidden Audio for State Management (Placeholder track) */}
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
    </div>
  );
}
