import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 border-4 border-t-pink-400 border-white/30 rounded-full animate-spin"></div>
        <p className="text-slate-200">A IA está preparando seu material...</p>
    </div>
  );
};

export default Spinner;