import React, { useState } from 'react';
import { SectionData } from '../types';
import { InteractiveSimulators } from './InteractiveSimulators';
import { BookOpen, Lightbulb, CheckCircle2, ChevronLeft, ChevronRight, Calculator, FileText, Cpu, Layout } from 'lucide-react';

interface SlideViewerProps {
  section: SectionData;
  onNextSection: () => void;
  onPrevSection: () => void;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({ section, onNextSection, onPrevSection }) => {
  const [activeTab, setActiveTab] = useState<'slides' | 'diagram' | 'simulator' | 'notes'>('slides');

  const slide = section.slides[0];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto bg-slate-200 p-4 sm:p-8 items-center justify-start">
      <div className="max-w-5xl w-full flex-1 flex flex-col space-y-6 pb-12">
        
        {/* Breadcrumb & Section Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-sm shadow-sm border border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded-sm font-mono text-xs font-bold text-white ${section.chapter === 4 ? 'bg-indigo-600' : 'bg-amber-600'}`}>
                Chapter {section.chapter}
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Section {section.sectionNumber}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">{section.title}</h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrevSection}
              className="px-3 py-1.5 rounded-sm border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs uppercase tracking-tighter flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>
            <button
              onClick={onNextSection}
              className="px-3 py-1.5 rounded-sm bg-indigo-600 text-white hover:bg-indigo-700 font-bold text-xs uppercase tracking-tighter flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'slides', label: 'Presentation Slide', icon: FileText },
            { id: 'diagram', label: 'Textbook Architecture Diagram', icon: Layout },
            { id: 'simulator', label: 'Interactive Simulator', icon: Calculator },
            { id: 'notes', label: 'Instructor Notes', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-4 rounded-sm text-xs font-bold uppercase tracking-tighter flex items-center gap-2 transition-all border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Card (Slide aspect container) */}
        {activeTab === 'slides' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white shadow-2xl relative border-l-[12px] border-indigo-600 p-6 sm:p-12 flex flex-col justify-between rounded-sm">
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-1 bg-indigo-600"></div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-[0.2em]">
                    Section {section.sectionNumber} // {slide.subtitle}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight">
                  {slide.title}
                </h2>
              </div>

              {/* Grid: Bullet points & Formula */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-6 pt-6 border-t border-slate-100">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-200 pb-2">
                    Core Concepts
                  </h3>
                  <ul className="space-y-3">
                    {slide.bulletPoints.map((bp, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-slate-700 text-sm leading-relaxed">
                        <span className="mr-2 text-indigo-600 font-bold">•</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  {slide.keyFormula && (
                    <div className="bg-slate-50 border border-slate-200 rounded-sm p-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-700 block mb-1.5">
                        Key Architectural Formula
                      </span>
                      <div className="font-mono text-xs sm:text-sm font-bold text-slate-900 bg-white p-3 rounded-sm border border-slate-200">
                        {slide.keyFormula}
                      </div>
                    </div>
                  )}

                  {/* Example Problem Summary */}
                  <div className="bg-slate-50 border border-slate-200 rounded-sm p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                        Example: {slide.exampleProblem.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {slide.exampleProblem.problemStatement}
                    </p>
                    <div className="bg-white border border-slate-200 p-3 rounded-sm space-y-1.5 max-h-48 overflow-y-auto">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Solution Steps</span>
                      {slide.exampleProblem.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <span className="font-mono font-bold text-indigo-600">{idx + 1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-sm flex items-center justify-between text-xs font-semibold text-emerald-900">
                      <span>Final Answer:</span>
                      <span className="font-mono text-emerald-700 bg-white px-2 py-0.5 rounded-sm border border-emerald-200">
                        {slide.exampleProblem.finalAnswer}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                <span>Patterson & Hennessy / RISC-V Edition</span>
                <span>Slide {section.sectionNumber}</span>
              </div>

            </div>
          </div>
        )}

        {/* Textbook Architecture Diagram Tab */}
        {activeTab === 'diagram' && (
          <div className="bg-white p-8 rounded-sm shadow-xl border border-slate-200 space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block mb-1">Textbook Reference Schematic</span>
                <h3 className="text-xl font-bold text-slate-900">Figure {section.sectionNumber}: Patterson & Hennessy Architecture Diagram</h3>
              </div>
              <span className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-xs font-bold rounded-sm">
                RISC-V ISA Spec
              </span>
            </div>

            <div className="bg-slate-900 p-8 rounded-sm border border-slate-800 flex flex-col items-center justify-center min-h-[380px] text-white">
              {section.chapter === 4 ? (
                <div className="w-full space-y-6 text-center">
                  <div className="font-mono text-xs text-indigo-400 uppercase tracking-widest mb-4">
                    // Chapter 4 Processor Datapath & Control Architecture ({section.sectionNumber})
                  </div>
                  <div className="grid grid-cols-5 gap-3 max-w-3xl mx-auto">
                    {['Instruction Fetch (IF)', 'Instruction Decode (ID)', 'Execution (EX)', 'Memory Access (MEM)', 'Writeback (WB)'].map((stage, i) => (
                      <div key={i} className="bg-slate-800 border border-slate-700 p-4 rounded-sm flex flex-col items-center justify-center text-center shadow-md">
                        <div className="w-8 h-8 rounded-sm bg-indigo-600/30 border border-indigo-500 text-indigo-300 font-bold flex items-center justify-center text-sm mb-2">
                          {i + 1}
                        </div>
                        <span className="text-xs font-bold text-slate-200">{stage}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-6 max-w-xl mx-auto leading-relaxed">
                    This schematic models the hardware datapath components and control lines specified in Patterson & Hennessy Chapter 4 for Section {section.sectionNumber}. Use the Interactive Simulator tab to test runtime signals.
                  </p>
                </div>
              ) : (
                <div className="w-full space-y-6 text-center">
                  <div className="font-mono text-xs text-amber-400 uppercase tracking-widest mb-4">
                    // Chapter 5 Memory Hierarchy & Cache Architecture ({section.sectionNumber})
                  </div>
                  <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                    {['L1 Cache (SRAM)', 'L2 Cache (SRAM)', 'Main Memory (DRAM)', 'Virtual Memory (Disk / SSD)'].map((level, i) => (
                      <div key={i} className="bg-slate-800 border border-slate-700 p-4 rounded-sm flex flex-col items-center justify-center text-center shadow-md">
                        <div className="w-8 h-8 rounded-sm bg-amber-600/30 border border-amber-500 text-amber-300 font-bold flex items-center justify-center text-sm mb-2">
                          {i + 1}
                        </div>
                        <span className="text-xs font-bold text-slate-200">{level}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-6 max-w-xl mx-auto leading-relaxed">
                    This schematic models the memory hierarchy levels, cache line organization, and AMAT latency trade-offs specified in Chapter 5 for Section {section.sectionNumber}.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="animate-in fade-in duration-200 bg-white p-6 rounded-sm shadow-md border border-slate-200">
            <InteractiveSimulators sectionNumber={section.sectionNumber} />
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="bg-white rounded-sm p-8 shadow-md border border-slate-200 space-y-4 animate-in fade-in duration-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Instructor Teaching Notes & Discussion Guide</span>
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-sm border border-slate-200 font-mono">
              {slide.notes}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

