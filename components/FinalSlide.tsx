
import React from 'react';

interface FinalSlideProps {
  message: string;
  onReset: () => void;
}

export const FinalSlide: React.FC<FinalSlideProps> = ({ message, onReset }) => {
  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-emerald-100">
        <div className="mb-8 flex justify-center">
          <div className="bg-emerald-100 p-6 rounded-full animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-4">مبروك! 🎉</h1>
        <p className="text-xl text-slate-600 leading-relaxed mb-10 font-medium">{message}</p>
        <button
          onClick={onReset}
          className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-200"
        >
          عاود من الأول
        </button>
      </div>
    </div>
  );
};
