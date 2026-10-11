import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2, Minimize2, MessageSquare } from 'lucide-react';
import { ProjectSlide } from '../types/project';

interface PresentationModeProps {
  slides: ProjectSlide[];
  projectTitle: string;
  studentName: string;
  onClose: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  slides,
  projectTitle,
  studentName,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(true);

  const currentSlide = slides[currentIndex] || slides[0];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, slides.length]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950 text-white flex flex-col justify-between overflow-hidden">
      {/* Top Deck Navigation Bar */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-stone-800 bg-stone-900/60 backdrop-blur-md">
        <div className="flex items-center gap-4 text-xs text-stone-400">
          <span className="font-semibold text-white tracking-wide">{projectTitle}</span>
          <span aria-hidden="true">·</span>
          <span>Presenter: {studentName}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums text-amber-400 font-semibold">
            Slide {currentIndex + 1} / {slides.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              showNotes ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Speaker Notes</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            title="Exit Presentation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full px-8 py-10">
        <div className="space-y-6">
          {/* Slide Kicker / Subtitle */}
          {currentSlide?.subtitle && (
            <p className="text-sm font-semibold tracking-wide uppercase text-amber-400">
              {currentSlide.subtitle}
            </p>
          )}

          {/* Slide Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {currentSlide?.title}
          </h1>

          {/* Slide Bullet Points */}
          <div className="space-y-4 pt-4">
            {currentSlide?.bulletPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3.5 text-lg text-stone-200">
                <span className="w-2 h-2 rounded-full bg-amber-400 mt-2.5 shrink-0" />
                <p className="leading-relaxed">{point}</p>
              </div>
            ))}
          </div>

          {/* Key Highlight Banner */}
          {currentSlide?.keyHighlight && (
            <div className="mt-8 p-5 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider font-semibold text-stone-400">Key Scientific Takeaway</div>
                <div className="text-xl font-bold text-amber-300 mt-1">{currentSlide.keyHighlight}</div>
              </div>
              <div className="text-xs font-mono text-stone-500">EXHIBIT A</div>
            </div>
          )}
        </div>
      </div>

      {/* Collapsible Speaker Notes Tray */}
      {showNotes && currentSlide?.speakerNotes && (
        <div className="max-w-5xl mx-auto w-full px-8 pb-4">
          <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 text-stone-300 text-xs sm:text-sm">
            <span className="font-semibold text-amber-400 mr-2">Speaker Cue:</span>
            {currentSlide.speakerNotes}
          </div>
        </div>
      )}

      {/* Bottom Slide Controller Strip */}
      <div className="px-8 py-4 border-t border-stone-800 bg-stone-900/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx ? 'w-8 bg-amber-400' : 'w-2 bg-stone-700 hover:bg-stone-500'
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === slides.length - 1}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <span>Next Slide</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
