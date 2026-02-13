
import React, { useState, useEffect } from 'react';
import { SLIDES, FINAL_MESSAGE } from './constants';
import { GameState, ChoiceKey } from './types';
import { GameSlide } from './components/GameSlide';
import { FinalSlide } from './components/FinalSlide';
import { ValentineLetter } from './components/ValentineLetter';

const STORAGE_KEY = 'darja_prank_game_v2';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed.isFinished === 'boolean') return parsed;
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
    return {
      currentSlideIndex: 0,
      isLocked: false,
      isPermanentlyLocked: false,
      attempts: 0,
      isFinished: false,
      hasSeenLetter: false,
    };
  });

  const [selectedChoice, setSelectedChoice] = useState<ChoiceKey | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  const handleChoice = (choice: ChoiceKey) => {
    // PRANK LOGIC: Only Choice A is actually selectable
    if (choice === 'A') {
      setSelectedChoice(choice);
    }
    // If choice is 'B', we do nothing, making it look broken/ignored
  };

  const handleNext = () => {
    if (selectedChoice === 'A') {
      setGameState(prev => ({ ...prev, isFinished: true }));
    }
  };

  const resetGame = () => {
    const newState = {
      currentSlideIndex: 0,
      isLocked: false,
      isPermanentlyLocked: false,
      attempts: 0,
      isFinished: false,
      hasSeenLetter: false,
    };
    setGameState(newState);
    setSelectedChoice(null);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  };

  const completeLetter = () => {
    setGameState(prev => ({ ...prev, hasSeenLetter: true }));
  };

  if (!gameState.hasSeenLetter) {
    return <ValentineLetter onComplete={completeLetter} />;
  }

  if (gameState.isFinished) {
    return <FinalSlide message={FINAL_MESSAGE} onReset={resetGame} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 relative overflow-hidden">
        {/* Progress Bar Trick: Always shows 1 / 20 */}
        <div className="mb-8 flex justify-between items-center text-slate-400 font-bold">
          <span className="text-sm">السؤال 1 / 20</span>
          <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: '5%' }} />
          </div>
        </div>
        
        <GameSlide 
          slide={SLIDES[0]} 
          selectedChoice={selectedChoice} 
          onSelect={handleChoice} 
        />

        <button
          onClick={handleNext}
          disabled={!selectedChoice}
          className={`w-full mt-8 py-4 rounded-2xl font-bold text-xl transition-all active:scale-95 ${
            selectedChoice 
              ? 'bg-slate-900 text-white shadow-lg' 
              : 'bg-slate-100 text-slate-300 cursor-not-allowed'
          }`}
        >
          التالي
        </button>
      </div>
      
      <p className="mt-6 text-slate-300 text-[10px] tracking-[0.2em] uppercase font-black opacity-50">Amira & Dinosaur Edition</p>
    </div>
  );
};

export default App;
