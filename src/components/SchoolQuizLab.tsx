import React, { useState } from 'react';
import { QuizQuestion } from '../types/project';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw } from 'lucide-react';

interface SchoolQuizLabProps {
  questions: QuizQuestion[];
  projectTitle: string;
}

export const SchoolQuizLab: React.FC<SchoolQuizLabProps> = ({
  questions,
  projectTitle,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-stone-200 p-8 text-center text-stone-500">
        No defense practice questions available for this project yet.
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-stone-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-stone-600" />
            <span>Oral Defense & Science Fair Q&A Practice</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Prepare for questions from your teacher and examination panel on {projectTitle}.
          </p>
        </div>

        <div className="text-xs font-mono font-semibold text-stone-500 tabular-nums">
          Question {currentIndex + 1} of {questions.length}
        </div>
      </div>

      {!completed ? (
        <div className="bg-white rounded-xl border border-stone-200 p-8 shadow-xs space-y-6">
          {/* Question Text */}
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Teacher Query #{currentIndex + 1}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              let optStyle = 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100';

              if (isSubmitted) {
                if (idx === currentQ.correctIndex) {
                  optStyle = 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold';
                } else if (idx === selectedOption) {
                  optStyle = 'bg-rose-50 border-rose-300 text-rose-950';
                } else {
                  optStyle = 'bg-stone-50/50 border-stone-200 text-stone-400 opacity-60';
                }
              } else if (selectedOption === idx) {
                optStyle = 'bg-stone-900 text-white border-stone-900 shadow-xs';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm flex items-center justify-between ${optStyle}`}
                >
                  <span>{opt}</span>
                  {isSubmitted && idx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                  )}
                  {isSubmitted && idx === selectedOption && idx !== currentQ.correctIndex && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isSubmitted && (
            <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <span className="font-bold text-stone-900 mr-1">Scientific Rationale:</span>
              {currentQ.explanation}
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100">
            <div className="text-xs text-stone-500 font-mono tabular-nums">
              Score: {score} / {questions.length}
            </div>

            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="px-5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-semibold transition-colors"
              >
                {currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="bg-white rounded-xl border border-stone-200 p-8 shadow-xs text-center space-y-4">
          <div className="text-4xl font-bold text-stone-900 tabular-nums">
            {score} / {questions.length}
          </div>
          <h3 className="text-lg font-bold text-stone-900">
            {score === questions.length ? 'Perfect Defense Mastery!' : 'Defense Practice Completed'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            You are ready to confidently field examiner questions and articulate your methodology!
          </p>
          <div className="pt-4">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Defense Drill</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
