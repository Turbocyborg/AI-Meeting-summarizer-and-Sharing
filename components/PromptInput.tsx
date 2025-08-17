
import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="prompt" className="font-semibold text-slate-300">
        Custom Instruction / Prompt
      </label>
      <textarea
        id="prompt"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., 'Summarize in bullet points for executives' or 'Highlight only action items'"
        className="w-full p-4 bg-slate-900 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors resize-y"
        rows={3}
      />
    </div>
  );
};
