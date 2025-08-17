
import React from 'react';

interface SummaryOutputProps {
  summary: string;
  onSummaryChange: (value: string) => void;
}

export const SummaryOutput: React.FC<SummaryOutputProps> = ({ summary, onSummaryChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="summary" className="font-semibold text-slate-300">
        Generated Summary (Editable)
      </label>
      <textarea
        id="summary"
        value={summary}
        onChange={(e) => onSummaryChange(e.target.value)}
        className="w-full h-72 p-4 bg-slate-900 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-y"
      />
    </div>
  );
};
