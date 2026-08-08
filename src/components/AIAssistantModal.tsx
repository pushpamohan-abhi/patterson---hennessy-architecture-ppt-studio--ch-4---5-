import React, { useState } from 'react';
import { Sparkles, X, Loader2, Send, BookOpen } from 'lucide-react';
import Markdown from 'react-markdown';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSectionNumber: string;
  currentTitle: string;
}

export const AIAssistantModal: React.FC<AIModalProps> = ({ isOpen, onClose, currentSectionNumber, currentTitle }) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async (promptText?: string) => {
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/generate-example', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionId: currentSectionNumber,
          topicTitle: currentTitle,
          customPrompt: promptText || customPrompt,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate');
      setResponse(data.content);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 relative flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-purple-200" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">AI Study Assistant</h3>
            <p className="text-xs text-slate-500">
              Section {currentSectionNumber}: {currentTitle}
            </p>
          </div>
        </div>

        {/* Quick prompt suggestions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            'Generate a hard exam question with full solution',
            'Explain core concept using a real-world analogy',
            'Give Python pseudocode simulation for this section',
          ].map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setCustomPrompt(preset);
                handleGenerate(preset);
              }}
              className="text-xs bg-purple-50 text-purple-700 hover:bg-purple-100 font-medium py-1.5 px-3 rounded-lg border border-purple-200 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Custom prompt input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="Ask anything about this section..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600"
          />
          <button
            onClick={() => handleGenerate()}
            disabled={loading || !customPrompt.trim()}
            className="px-4 py-2.5 bg-purple-600 text-white rounded-xl font-medium text-xs shadow-md shadow-purple-500/20 hover:bg-purple-700 disabled:opacity-50 transition-all flex items-center gap-1.5"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>Ask</span>
          </button>
        </div>

        {/* Response box */}
        <div className="flex-1 overflow-y-auto bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-700 space-y-3">
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600 mb-2" />
              <p>Gemini is reasoning through Patterson & Hennessy architecture principles...</p>
            </div>
          )}

          {error && <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700">{error}</div>}

          {!loading && !response && !error && (
            <div className="text-center py-12 text-slate-400">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Select a preset prompt above or ask a custom question to get AI-powered study insights.</p>
            </div>
          )}

          {response && (
            <div className="prose prose-sm max-w-none text-slate-800">
              <Markdown>{response}</Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
