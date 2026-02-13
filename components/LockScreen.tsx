
import React, { useState } from 'react';

interface LockScreenProps {
  attempts: number;
  maxAttempts: number;
  onUnlock: (code: string) => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ attempts, maxAttempts, onUnlock }) => {
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    onUnlock(inputCode);
    setInputCode('');
    setError(true);
    setTimeout(() => setError(false), 1000);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-right">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border-4 border-slate-700">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">حبست هنا!</h2>
        <p className="text-slate-500 text-center mb-8">درت خطأ كبير. دخل الكود باش تكمل.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">الكود السري:</label>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="####"
              className={`w-full p-4 text-center text-2xl font-mono tracking-widest rounded-xl border-2 outline-none ${error ? 'border-red-500 bg-red-50 animate-shake' : 'border-slate-200'}`}
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-red-600">
              مازالك {maxAttempts - attempts} محاولة.
            </p>
          </div>
          <button type="submit" className="w-full py-4 bg-slate-800 text-white rounded-xl font-bold shadow-lg">افتح الباب</button>
        </form>
        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400 italic">
          تلميح: العام الجاي... (DZ2024)
        </div>
      </div>
      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
    </div>
  );
};
