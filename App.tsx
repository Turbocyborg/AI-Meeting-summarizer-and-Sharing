
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { TranscriptInput } from './components/TranscriptInput';
import { PromptInput } from './components/PromptInput';
import { SummaryOutput } from './components/SummaryOutput';
import { ShareForm } from './components/ShareForm';
import { Button } from './components/Button';
import { Loader } from './components/Loader';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { generateSummary } from './services/geminiService';
import { Analytics } from "@vercel/analytics/next"

const App: React.FC = () => {
  const [transcript, setTranscript] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState<string>('Summarize in bullet points for executives');
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = useCallback(async () => {
    if (!transcript.trim() || !customPrompt.trim()) {
      setError('Please provide both a transcript and a custom prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSummary('');

    try {
      const result = await generateSummary(transcript, customPrompt);
      setSummary(result);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [transcript, customPrompt]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Section */}
          <div className="flex flex-col gap-6 bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-cyan-400">1. Input</h2>
            <TranscriptInput value={transcript} onChange={setTranscript} />
            <PromptInput value={customPrompt} onChange={setCustomPrompt} />
            <Button 
              onClick={handleGenerateSummary} 
              disabled={isLoading || !transcript || !customPrompt}
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              {isLoading ? 'Generating...' : 'Generate Summary'}
            </Button>
          </div>

          {/* Output Section */}
          <div className="flex flex-col gap-6 bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-cyan-400">2. Output</h2>
            {isLoading && <Loader />}
            {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}
            
            {summary && !isLoading && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <SummaryOutput summary={summary} onSummaryChange={setSummary} />
                <ShareForm summaryText={summary} />
              </div>
            )}

            {!isLoading && !summary && !error && (
              <div className="flex items-center justify-center h-full text-slate-500 text-center p-8 border-2 border-dashed border-slate-700 rounded-lg">
                <p>Your generated summary will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
