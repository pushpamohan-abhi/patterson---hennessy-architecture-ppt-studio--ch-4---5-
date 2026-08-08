import React from 'react';
import { Presentation, Sparkles, Download, Menu, ArrowLeft, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onToggleSidebar: () => void;
  onOpenExportModal: () => void;
  onOpenAIModal: () => void;
  currentSectionNumber: string;
  onNextSection: () => void;
  onPrevSection: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  onOpenExportModal,
  onOpenAIModal,
  currentSectionNumber,
  onNextSection,
  onPrevSection,
}) => {
  return (
    <header className="h-16 border-b border-slate-200 bg-slate-50 sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-sm text-slate-600 hover:bg-slate-200 transition-colors"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center text-white font-bold rounded-sm text-sm shadow-sm">
            {currentSectionNumber}
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold tracking-tight text-slate-800 uppercase">
              SlideArchitect // Patterson & Hennessy
            </h2>
            <p className="text-[10px] text-slate-400 font-mono hidden sm:block uppercase tracking-widest">
              Computer Organization & Design (Ch 4 & 5)
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Prev / Next section */}
        <div className="hidden md:flex items-center bg-slate-200/60 rounded-sm p-1 gap-1 border border-slate-300">
          <button
            onClick={onPrevSection}
            className="px-2.5 py-1 rounded-sm text-slate-700 hover:bg-white hover:text-slate-900 transition-all text-xs font-bold uppercase tracking-tighter flex items-center gap-1"
            title="Previous Section"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>
          <span className="text-slate-400 text-xs px-0.5">|</span>
          <button
            onClick={onNextSection}
            className="px-2.5 py-1 rounded-sm text-slate-700 hover:bg-white hover:text-slate-900 transition-all text-xs font-bold uppercase tracking-tighter flex items-center gap-1"
            title="Next Section"
          >
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* AI Assistant button */}
        <button
          onClick={onOpenAIModal}
          className="px-3.5 py-2 rounded-sm bg-slate-900 text-white font-bold text-xs uppercase tracking-tighter hover:bg-slate-800 transition-all flex items-center gap-2 border border-slate-800"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          <span className="hidden sm:inline">AI Study Assistant</span>
          <span className="sm:hidden">AI</span>
        </button>

        {/* Export PPTX button */}
        <button
          onClick={onOpenExportModal}
          className="px-4 py-2 rounded-sm bg-indigo-600 text-white font-bold text-xs uppercase tracking-tighter shadow-sm hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export PPTX</span>
        </button>
      </div>
    </header>
  );
};
