
import React, { useMemo } from 'react';
import { Slide, ChoiceKey } from '../types';
import { STICKERS } from '../constants';

interface GameSlideProps {
  slide: Slide;
  selectedChoice: ChoiceKey | null;
  onSelect: (choice: ChoiceKey) => void;
}

interface StickerPos {
  emoji: string;
  top: string;
  left: string;
  rotate: string;
  size: string;
}

const EMOJI_FONT_STACK = '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif';

export const GameSlide: React.FC<GameSlideProps> = ({ slide, selectedChoice, onSelect }) => {
  const backgroundStickers = useMemo(() => {
    const count = 8; 
    const result: StickerPos[] = [];
    for (let i = 0; i < count; i++) {
      const emojiIndex = Math.floor(Math.random() * STICKERS.length);
      result.push({
        emoji: STICKERS[emojiIndex],
        top: `${Math.random() * 90}%`,
        left: `${Math.random() * 90}%`,
        rotate: `${Math.random() * 80 - 40}deg`,
        size: `${20 + Math.random() * 20}px`
      });
    }
    return result;
  }, []);

  return (
    <div className="relative text-right min-h-[400px] flex flex-col">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {backgroundStickers.map((s, idx) => (
          <span
            key={idx}
            className="absolute animate-float opacity-10"
            style={{
              top: s.top,
              left: s.left,
              transform: `rotate(${s.rotate})`,
              fontSize: s.size,
              fontFamily: EMOJI_FONT_STACK,
              zIndex: 0
            }}
          >
            {s.emoji}
          </span>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center w-full h-full">
        <h2 className="text-3xl font-bold text-slate-800 mb-10 leading-relaxed w-full text-center">
          {slide.question}
        </h2>

        {/* Central Sticker Container */}
        <div className="mb-12 flex items-center justify-center">
          <div className="transform -rotate-2 animate-wiggle">
            <div className="relative bg-white p-8 rounded-[3rem] shadow-2xl border-[8px] border-white ring-2 ring-slate-100 flex items-center justify-center min-w-[140px] min-h-[140px]">
              <span className="text-8xl leading-none select-none block" style={{ fontFamily: EMOJI_FONT_STACK }}>
                {selectedChoice === 'A' ? "🤢" : (slide.memeSticker || "🤔")}
              </span>
              <div className="absolute top-0 right-0 w-10 h-10 bg-slate-50/80 rounded-bl-[2rem] border-b-2 border-l-2 border-white shadow-inner"></div>
            </div>
          </div>
        </div>

        <div className="space-y-4 w-full mt-auto">
          {/* CHOICE A */}
          <button
            onClick={() => onSelect('A')}
            className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-right text-xl font-bold relative overflow-hidden active:scale-[0.98] ${
              selectedChoice === 'A'
                ? 'border-red-400 bg-red-50 text-red-900 shadow-md'
                : 'border-slate-100 bg-slate-50 text-slate-700 hover:border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between pointer-events-none">
              <span className="z-10">{slide.choiceA}</span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedChoice === 'A' ? 'border-red-500 bg-red-500 scale-110' : 'border-slate-300'
              }`}>
                {selectedChoice === 'A' && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
            </div>
          </button>

          {/* CHOICE B - Visual Twin of Choice A but unselectable */}
          <button
            onClick={() => onSelect('B')}
            className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-right text-xl font-bold relative overflow-hidden active:scale-[0.98] ${
              selectedChoice === 'B'
                ? 'border-red-400 bg-red-50 text-red-900 shadow-md'
                : 'border-slate-100 bg-slate-50 text-slate-700 hover:border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between pointer-events-none">
              <span className="z-10">{slide.choiceB}</span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedChoice === 'B' ? 'border-red-500 bg-red-500 scale-110' : 'border-slate-300'
              }`}>
                {selectedChoice === 'B' && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
            </div>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(10deg); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-2deg) scale(1); }
          50% { transform: rotate(2deg) scale(1.05); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-wiggle { animation: wiggle 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
