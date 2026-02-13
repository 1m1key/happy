
import React, { useState } from 'react';
import { VALENTINE_LETTER } from '../constants';

interface ValentineLetterProps {
  onComplete: () => void;
}

export const ValentineLetter: React.FC<ValentineLetterProps> = ({ onComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => setIsOpened(true), 1200); // Match animation duration
  };

  return (
    <div className="min-h-screen bg-[#fff5f5] flex items-center justify-center p-6 overflow-hidden relative">
      {/* Decorative background hearts */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 20}px`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            🌸
          </div>
        ))}
      </div>

      {!isOpened ? (
        <div className="relative w-full max-w-sm flex flex-col items-center">
          <div 
            onClick={handleOpen}
            className={`relative w-80 h-56 transition-all duration-1000 transform cursor-pointer
              ${isOpening ? 'scale-110 -translate-y-20' : 'hover:scale-105'}
            `}
          >
            {/* Envelope Back */}
            <div className="absolute inset-0 bg-[#f8d7da] rounded-xl shadow-2xl z-0"></div>
            
            {/* The Letter (Peeking out) */}
            <div className={`absolute left-4 right-4 h-48 bg-white z-1 transition-all duration-1000 border border-rose-50
              ${isOpening ? '-translate-y-32' : 'translate-y-2'}
            `}></div>

            {/* Envelope Bottom/Sides Flap */}
            <div className="absolute inset-0 z-10 overflow-hidden rounded-xl">
               <div className="absolute bottom-0 left-0 w-full h-full bg-[#fce4e6] clip-path-envelope shadow-inner"></div>
            </div>

            {/* Top Flap */}
            <div className={`absolute top-0 left-0 w-full h-full z-20 transition-all duration-700 origin-top transform
              ${isOpening ? '-rotate-x-180 opacity-0' : 'rotate-x-0'}
            `}>
              <div className="w-full h-full bg-[#f4cfd2] clip-path-flap rounded-t-xl border-b border-rose-200"></div>
            </div>

            {/* Seal */}
            {!isOpening && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 animate-bounce">
                <div className="bg-rose-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 border-white text-2xl">
                  💌
                </div>
              </div>
            )}
          </div>
          
          <p className={`mt-12 text-rose-400 font-bold tracking-widest transition-opacity duration-500
            ${isOpening ? 'opacity-0' : 'opacity-100'}
          `}>
             إضغطي لفتح الرسالة يا أميرة ✨
          </p>
        </div>
      ) : (
        <div className="max-w-md w-full bg-[#fffcf9] p-8 md:p-12 rounded-[2rem] shadow-[0_25px_60px_-15px_rgba(255,182,193,0.5)] border-t-[16px] border-rose-300 transform animate-letter-in relative overflow-hidden">
          {/* Paper texture and subtle lines */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
          
          {/* Floral Decoration */}
          <div className="absolute -top-6 -left-6 text-6xl opacity-10 rotate-45 select-none pointer-events-none">🌹</div>
          <div className="absolute -bottom-6 -right-6 text-6xl opacity-10 -rotate-12 select-none pointer-events-none">🌹</div>

          <header className="mb-8 border-b border-rose-100 pb-4">
            <h1 className="text-3xl font-serif-elegant font-bold text-rose-800 tracking-tight italic">
              {VALENTINE_LETTER.title}
            </h1>
          </header>
          
          <article className="relative mb-10">
            <p className="text-xl text-slate-700 leading-relaxed font-serif-elegant italic first-letter:text-4xl first-letter:text-rose-500 first-letter:mr-1">
              {VALENTINE_LETTER.body}
            </p>
          </article>
          
          <footer className="text-right pt-6 flex flex-col items-end">
             <div className="h-[1px] w-24 bg-rose-200 mb-4"></div>
             <p className="text-rose-600 font-bold text-2xl italic font-serif-elegant">{VALENTINE_LETTER.signature}</p>
          </footer>

          <button
            onClick={onComplete}
            className="w-full mt-12 py-5 bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-rose-200 transition-all active:scale-[0.97] flex items-center justify-center space-x-3 gap-2"
          >
            <span>نروحو نلعبو؟</span>
            <span className="text-2xl leading-none">🎮</span>
          </button>
        </div>
      )}

      <style>{`
        .clip-path-envelope {
          clip-path: polygon(0% 40%, 50% 100%, 100% 40%, 100% 100%, 0% 100%);
        }
        .clip-path-flap {
          clip-path: polygon(0% 0%, 50% 60%, 100% 0%);
        }
        @keyframes letter-in {
          0% { opacity: 0; transform: translateY(40px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-letter-in {
          animation: letter-in 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        .rotate-x-0 { transform: rotateX(0deg); }
        .-rotate-x-180 { transform: rotateX(-180deg); }
      `}</style>
    </div>
  );
};
