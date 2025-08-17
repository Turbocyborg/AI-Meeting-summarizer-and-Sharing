
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 md:px-8 border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
          AI Meeting Summarizer
        </h1>
        <p className="mt-1 text-slate-400">
          Transform your meeting transcripts into clear summaries instantly.
        </p>
      </div>
    </header>
  );
};
