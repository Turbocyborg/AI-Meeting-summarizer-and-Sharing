
import React, { useRef, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface TranscriptInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const TranscriptInput: React.FC<TranscriptInputProps> = ({ value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        onChange(text);
      };
      reader.readAsText(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
     if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        onChange(text);
      };
      reader.readAsText(file);
    }
  }, [onChange]);


  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="transcript" className="font-semibold text-slate-300">
        Meeting Transcript
      </label>
      <div onDragOver={onDragOver} onDrop={onDrop} className="relative group">
        <textarea
          id="transcript"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your meeting transcript here, or upload a .txt file..."
          className="w-full h-48 p-4 bg-slate-900 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors resize-y"
        />
        <div className="absolute inset-0 bg-slate-900/50 flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <p className="text-slate-400 font-semibold">Drop a .txt file here</p>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".txt"
        className="hidden"
      />
      <button
        onClick={handleButtonClick}
        className="mt-2 text-sm text-cyan-400 hover:text-cyan-300 self-start flex items-center gap-2"
      >
        <UploadIcon className="w-4 h-4" />
        or Upload .txt file
      </button>
    </div>
  );
};
