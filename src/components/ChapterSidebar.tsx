import React from 'react';
import { SectionData } from '../types';
import { BookOpen, Cpu, HardDrive, CheckCircle2 } from 'lucide-react';

interface SidebarProps {
  chapters: SectionData[];
  currentSectionId: string;
  onSelectSection: (sectionNumber: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ChapterSidebar: React.FC<SidebarProps> = ({
  chapters,
  currentSectionId,
  onSelectSection,
  isOpen,
  onClose,
}) => {
  const chapter4Sections = chapters.filter((c) => c.chapter === 4);
  const chapter5Sections = chapters.filter((c) => c.chapter === 5);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-full w-72 bg-slate-50 border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-white">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Slide Navigator</span>
        </div>

        {/* Section List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Chapter 4 */}
          <div>
            <div className="flex items-center gap-2 px-2 mb-3 text-indigo-700 font-bold text-xs uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>Chapter 4: The Processor</span>
            </div>
            <div className="space-y-2">
              {chapter4Sections.map((sec) => {
                const isActive = sec.sectionNumber === currentSectionId;
                return (
                  <button
                    key={sec.sectionNumber}
                    onClick={() => {
                      onSelectSection(sec.sectionNumber);
                      onClose();
                    }}
                    className={`w-full text-left p-3 rounded-sm transition-all relative border ${
                      isActive
                        ? 'bg-white border-indigo-200 shadow-sm'
                        : 'bg-slate-100 border-transparent opacity-80 hover:opacity-100 hover:bg-white'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-indigo-600 mb-1">
                      SLIDE {sec.sectionNumber}
                    </div>
                    <div className="text-xs font-semibold text-slate-800 truncate">
                      {sec.title}
                    </div>
                    {isActive && <div className="absolute right-2 top-2 w-1.5 h-1.5 bg-indigo-600 rounded-full" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chapter 5 */}
          <div>
            <div className="flex items-center gap-2 px-2 mb-3 text-amber-700 font-bold text-xs uppercase tracking-wider">
              <HardDrive className="w-4 h-4" />
              <span>Chapter 5: Memory Hierarchy</span>
            </div>
            <div className="space-y-2">
              {chapter5Sections.map((sec) => {
                const isActive = sec.sectionNumber === currentSectionId;
                return (
                  <button
                    key={sec.sectionNumber}
                    onClick={() => {
                      onSelectSection(sec.sectionNumber);
                      onClose();
                    }}
                    className={`w-full text-left p-3 rounded-sm transition-all relative border ${
                      isActive
                        ? 'bg-white border-amber-300 shadow-sm'
                        : 'bg-slate-100 border-transparent opacity-80 hover:opacity-100 hover:bg-white'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-amber-600 mb-1">
                      SLIDE {sec.sectionNumber}
                    </div>
                    <div className="text-xs font-semibold text-slate-800 truncate">
                      {sec.title}
                    </div>
                    {isActive && <div className="absolute right-2 top-2 w-1.5 h-1.5 bg-amber-600 rounded-full" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-200 text-center bg-white">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">18 Total Sections Identified</span>
        </div>
      </aside>
    </>
  );
};
