"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useSpeech } from "@/hooks/useSpeech";
import M3IconButton from "@/components/M3IconButton";
import M3Button from "@/components/M3Button";
import M3ProgressIndicator from "@/components/M3ProgressIndicator";
import PoweredByNvidia from "@/components/PoweredByNvidia";
import diagnosisService, { PlantDiagnosis } from "@/lib/NvidiaDiagnosisService";

// Result Sheet for M3 implementation
const ScanResultSheet = ({ 
  result, 
  onClose, 
  onReset 
}: { 
  result: PlantDiagnosis; 
  onClose: () => void;
  onReset: () => void;
}) => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<"diagnosis" | "treatment" | "prevention">("diagnosis");
  const { speak, stop, isSpeaking } = useSpeech();

  // Stop speaking on close
  React.useEffect(() => {
    return () => stop();
  }, [stop]);

  const handleReadAloud = () => {
    if (isSpeaking) {
      stop();
      return;
    }

    const textToRead = `
      ${result.disease_name}. 
      ${t("scan.results.sections.symptoms")}: ${result.symptoms.join(", ")}. 
      ${t("scan.results.sections.organic")}: ${result.treatment_plan.organic.join(". ")}.
      ${result.localized_advice}
    `;
    speak(textToRead, i18n.language);
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-x-0 bottom-0 z-50 flex flex-col w-full max-w-2xl mx-auto max-h-[85vh] bg-background rounded-t-4xl md:rounded-3xl shadow-2xl border border-outline-variant transition-all pb-safe md:bottom-10"
    >
      {/* Handle */}
      <div className="flex justify-center p-3">
        <div className="w-10 h-1 bg-outline-variant rounded-full" />
      </div>

      {/* Header */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-on-surface">{result.disease_name}</h2>
          <M3IconButton icon="close" onClick={onClose} variant="standard" />
        </div>
        <div className="flex items-center gap-2 mt-2">
           <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm ${
             result.disease_name === "Wrong Object" ? "bg-surface-container-highest text-on-surface-variant" :
            result.severity === "high" ? "bg-error text-on-error" :
            result.severity === "medium" || (result.severity as string) === "moderate" ? "bg-[#C47D1C] text-white" :
            "bg-primary text-on-primary"
           }`}>
             {result.disease_name === "Wrong Object" ? "Wrong Object" : t(`scan.results.severity.${result.severity}`)}
           </span>
           <span className="text-sm text-on-surface font-medium opacity-90">
             {Math.round(result.confidence_score * 100)}% {t("home.confidence", { value: "" }).split("%")[1]}
           </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-outline-variant px-2">
        {["diagnosis", "treatment", "prevention"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "diagnosis" | "treatment" | "prevention")}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab ? "text-primary" : "text-on-surface-variant"
            }`}
          >
            {t(`scan.results.tabs.${tab}`)}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {activeTab === "diagnosis" && (
          <div className="space-y-4">
            <section>
              <h3 className="text-sm font-bold text-primary mb-2 uppercase tracking-wider">
                {t("scan.results.sections.symptoms")}
              </h3>
              <ul className="space-y-2">
                {result.symptoms.map((s, i) => (
                  <li key={i} className="flex gap-3 text-on-surface">
                    <span className="material-symbols-rounded text-primary text-sm mt-1">fiber_manual_record</span>
                    {s}
                  </li>
                ))}
              </ul>
            </section>
            <section className="bg-secondary-container p-4 rounded-xl">
               <div className="flex gap-3">
                 <span className="material-symbols-rounded text-on-secondary-container">info</span>
                 <p className="text-on-secondary-container text-sm leading-relaxed italic">
                   {result.localized_advice}
                 </p>
               </div>
            </section>
          </div>
        )}

        {activeTab === "treatment" && (
          <div className="space-y-6">
            <section>
              <h3 className="text-sm font-bold text-primary mb-3 uppercase tracking-wider">
                {t("scan.results.sections.organic")}
              </h3>
              {result.treatment_plan.organic.map((t, i) => (
                <div key={i} className="mb-3 p-3 bg-surface-container rounded-lg border border-outline-variant flex gap-3">
                   <div className="shrink-0 w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold">
                     {i+1}
                   </div>
                   <p className="text-on-surface text-sm">{t}</p>
                </div>
              ))}
            </section>
            <section>
              <h3 className="text-sm font-bold text-primary mb-3 uppercase tracking-wider">
                {t("scan.results.sections.chemical")}
              </h3>
              {result.treatment_plan.chemical.map((t, i) => (
                <div key={i} className="mb-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant-light flex gap-3">
                   <span className="material-symbols-rounded text-error text-[20px]">science</span>
                   <p className="text-on-surface text-sm">{t}</p>
                </div>
              ))}
            </section>
          </div>
        )}

        {activeTab === "prevention" && (
          <section>
            <h3 className="text-sm font-bold text-primary mb-3 uppercase tracking-wider">
              {t("scan.results.sections.prevention_tips")}
            </h3>
            <div className="space-y-3">
              {result.prevention_strategies.map((p, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-surface-container-high rounded-xl">
                  <span className="material-symbols-rounded text-primary text-[20px]">verified</span>
                  <p className="text-on-surface text-sm leading-relaxed">{p}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        <PoweredByNvidia className="mt-4 opacity-50 justify-center" variant="small" />
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-outline-variant flex gap-3 bg-surface">
        <M3Button variant="tonal" className="flex-1" onClick={() => { onReset(); onClose(); }}>
          {t("scan.viewfinder.capture")} Again
        </M3Button>
        <M3Button 
          variant="filled" 
          className="flex-1" 
          icon={isSpeaking ? "stop" : "volume_up"}
          onClick={handleReadAloud}
        >
          {isSpeaking ? t("scan.results.stop") || "Stop" : t("scan.results.read_aloud")}
        </M3Button>
      </div>
    </motion.div>
  );
};

export default function ScanPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);
  
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PlantDiagnosis | null>(null);
  const [flashOn, setFlashOn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hardware Torch (Flash) Control
  const toggleTorch = useCallback(async (on: boolean) => {
    try {
      const videoElement = webcamRef.current?.video;
      if (!videoElement) return;

      const stream = videoElement.srcObject as MediaStream;
      if (!stream) return;

      const track = stream.getVideoTracks()[0];
      if (!track) return;

      // Ensure capabilities are checked
      const capabilities = track.getCapabilities() as MediaTrackCapabilities & { torch?: boolean };
      if (capabilities && capabilities.torch) {
        await track.applyConstraints({
          advanced: [{ torch: on }]
        } as unknown as MediaTrackConstraints);
      }
    } catch (err) {
      console.warn("Torch control error:", err);
    }
  }, [webcamRef]);

  React.useEffect(() => {
    toggleTorch(flashOn);
  }, [flashOn, toggleTorch]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
      handleAnalyze(imageSrc);
    }
  }, [webcamRef]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImgSrc(result);
        handleAnalyze(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async (image: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      // Remove data:image/jpeg;base64, prefix
      const base64 = image.split(",")[1];
      const diagnosis = await diagnosisService.diagnosePlant(base64, i18n.language);
      setResult(diagnosis);
    } catch (err) {
      setError(t("scan.errors.api"));
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-black text-white overflow-hidden">
      {/* Top Bar */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between p-4 bg-linear-to-b from-black/60 to-transparent pt-safe">
        <M3IconButton 
          icon="arrow_back" 
          onClick={() => {
            // Check if we can go back, otherwise go home
            if (typeof window !== "undefined" && window.history.length > 2) {
              router.back();
            } else {
              router.push("/");
            }
          }}
          style={{ backgroundColor: 'rgba(0,0,0,0.3)', color: 'white' }} 
        />
        <div className="bg-black/30 backdrop-blur px-4 py-1 rounded-full border border-white/10 uppercase tracking-widest text-[10px] font-bold">
          Ai Diagnostic Engine
        </div>
        <M3IconButton 
          icon={flashOn ? "flash_on" : "flash_off"} 
          onClick={() => setFlashOn(!flashOn)}
          style={{ backgroundColor: 'rgba(0,0,0,0.3)', color: 'white' }} 
        />
      </div>

      {/* Viewfinder (Fills space) */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {!imgSrc ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ 
                facingMode: { exact: "environment" },
                width: { min: 1280, ideal: 1920, max: 2560 },
                height: { min: 720, ideal: 1080, max: 1440 },
                aspectRatio: 1.333333 // Strict 4:3 for primary sensor
              }}
              onUserMedia={() => {
                if (flashOn) toggleTorch(true);
              }}
              onUserMediaError={(err) => {
                console.error("Camera access error:", err);
                setError(t("scan.errors.camera_access") || "Camera access denied or device not found");
              }}
              className="h-full w-full object-cover max-w-(--app-shell-max) mx-auto"
            />
            {/* Target Reticle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 border-2 border-white/30 rounded-3xl relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />
              </div>
            </div>
            
            <div className="absolute bottom-8 inset-x-0 text-center px-8">
               <p className="text-white/80 text-sm drop-shadow-md">
                 {t("scan.instructions.ready")}
               </p>
            </div>
          </>
        ) : (
          <Image 
            src={imgSrc} 
            alt="Captured leaf" 
            fill 
            unoptimized 
            className="h-full w-full object-cover max-w-(--app-shell-max) mx-auto" 
          />
        )}

        {/* Loading Overlay */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-6"
            >
              <M3ProgressIndicator variant="circular" size={64} progress={0} className="animate-spin" />
              <div className="text-center space-y-2">
                <p className="text-xl font-medium tracking-wide">{t("scan.instructions.analyzing")}</p>
                <PoweredByNvidia className="justify-center opacity-60" variant="small" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Control Bar (Fixed Bottom) */}
      <div className="h-28 bg-black flex items-center justify-center gap-12 px-8 pb-safe shadow-[0_-1px_0_rgba(255,255,255,0.1)]">
        <div className="relative">
          <M3IconButton 
            icon="image" 
            size="sm" 
            variant="standard" 
            style={{ color: 'white' }} 
            onClick={() => document.getElementById('gallery-input')?.click()}
          />
          <input 
            id="gallery-input"
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileUpload} 
          />
        </div>
        
        <button 
          onClick={capture}
          disabled={isAnalyzing}
          className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center active:scale-95 transition-transform"
        >
          <div className="w-16 h-16 rounded-full bg-white transition-all scale-100 group-hover:scale-90" />
        </button>

        <M3IconButton icon="history" size="sm" variant="standard" style={{ color: 'white' }} />
      </div>

      {/* Results Bottom Sheet */}
      <AnimatePresence>
        {result && (
          <>
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]"
               onClick={() => setResult(null)}
             />
             <ScanResultSheet 
               result={result} 
               onClose={() => setResult(null)} 
               onReset={() => setImgSrc(null)} 
             />
          </>
        )}
      </AnimatePresence>

      {/* Error Toast */}
      {error && (
        <div className="absolute bottom-36 left-1/2 -translate-x-1/2 bg-error text-on-error px-6 py-3 rounded-full flex items-center gap-3 shadow-lg z-50">
          <span className="material-symbols-rounded">error</span>
          <p className="font-medium">{error}</p>
          <button onClick={() => handleAnalyze(imgSrc!)} className="ml-2 font-bold underline">RETRY</button>
        </div>
      )}
    </div>
  );
}
