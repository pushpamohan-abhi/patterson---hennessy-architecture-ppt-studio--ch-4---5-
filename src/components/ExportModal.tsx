import React, { useState } from 'react';
import { SectionData } from '../types';
import { Download, X, Presentation, CheckCircle, Loader2 } from 'lucide-react';
import PptxGenJS from 'pptxgenjs';
import confetti from 'canvas-confetti';

interface ExportModalProps {
  chapters: SectionData[];
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ chapters, isOpen, onClose }) => {
  const [theme, setTheme] = useState<'academic' | 'modern_dark' | 'slate_blue'>('academic');
  const [selectedChapter, setSelectedChapter] = useState<'all' | 4 | 5>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleGeneratePPTX = async () => {
    setIsExporting(true);
    setSuccess(false);

    try {
      const pres = new PptxGenJS();
      pres.layout = 'LAYOUT_16x9';

      // Define color schemes
      const themes = {
        academic: { bg: 'FFFFFF', header: '1E293B', accent: '4F46E5', text: '334155', cardBg: 'F8FAFC' },
        modern_dark: { bg: '0F172A', header: 'F8FAFC', accent: '6366F1', text: 'CBD5E1', cardBg: '1E293B' },
        slate_blue: { bg: 'F0F4F8', header: '102A43', accent: '3B82F6', text: '243B53', cardBg: 'FFFFFF' },
      };

      const t = themes[theme];

      // Filter sections
      const sectionsToExport = chapters.filter(
        (sec) => selectedChapter === 'all' || sec.chapter === selectedChapter
      );

      // Title Slide
      const titleSlide = pres.addSlide();
      titleSlide.background = { color: t.bg };
      titleSlide.addText('Computer Organization and Design', {
        x: 1,
        y: 1.5,
        w: '80%',
        h: 1,
        fontSize: 32,
        bold: true,
        color: t.header,
        align: 'center',
      });
      titleSlide.addText(
        selectedChapter === 'all'
          ? 'Complete Presentation: Chapters 4 (Processor) & 5 (Memory Hierarchy)'
          : selectedChapter === 4
          ? 'Chapter 4: The Processor (Sections 4.1 to 4.9)'
          : 'Chapter 5: Memory Hierarchy (Sections 5.1 to 5.9)',
        {
          x: 1,
          y: 2.6,
          w: '80%',
          h: 0.8,
          fontSize: 18,
          color: t.accent,
          align: 'center',
        }
      );
      titleSlide.addText('David A. Patterson & John L. Hennessy | RISC-V Edition', {
        x: 1,
        y: 4.0,
        w: '80%',
        h: 0.5,
        fontSize: 14,
        color: t.text,
        align: 'center',
      });

      // Generate slides for each section
      sectionsToExport.forEach((sec) => {
        sec.slides.forEach((slide) => {
          const s = pres.addSlide();
          s.background = { color: t.bg };

          // Header banner
          s.addText(`Section ${slide.sectionNumber}: ${slide.title}`, {
            x: 0.8,
            y: 0.5,
            w: '85%',
            h: 0.8,
            fontSize: 22,
            bold: true,
            color: t.header,
          });

          s.addText(slide.subtitle, {
            x: 0.8,
            y: 1.2,
            w: '85%',
            h: 0.4,
            fontSize: 13,
            color: t.accent,
          });

          // Bullet points (left column)
          const bulletTexts = slide.bulletPoints.map((bp) => ({ text: bp, options: { bullet: true, fontSize: 13, color: t.text, spaceAfter: 8 } }));
          s.addText(bulletTexts, {
            x: 0.8,
            y: 1.8,
            w: '52%',
            h: 3.2,
          });

          // Example problem card (right column)
          s.addShape(pres.ShapeType.roundRect, {
            x: 6.3,
            y: 1.8,
            w: '6.2%', // Wait, w needs to be in inches or % string like '5.8'
            // Let's use proper inches: x=6.4, y=1.8, w=6.0, h=4.5
          });

          // Correct shape parameters for pptxgenjs
          s.addShape(pres.ShapeType.roundRect, {
            x: 6.4,
            y: 1.8,
            w: 6.0,
            h: 4.8,
            fill: { color: t.cardBg },
            line: { color: t.accent, width: 1 },
          });

          s.addText(`Example: ${slide.exampleProblem.title}`, {
            x: 6.6,
            y: 2.0,
            w: 5.6,
            h: 0.4,
            fontSize: 13,
            bold: true,
            color: t.header,
          });

          const stepsText = slide.exampleProblem.steps.map((step, idx) => ({
            text: `${idx + 1}. ${step}`,
            options: { fontSize: 11, color: t.text, spaceAfter: 4 },
          }));

          s.addText(stepsText, {
            x: 6.6,
            y: 2.5,
            w: 5.6,
            h: 3.2,
          });

          s.addText(`Answer: ${slide.exampleProblem.finalAnswer}`, {
            x: 6.6,
            y: 5.8,
            w: 5.6,
            h: 0.5,
            fontSize: 11,
            bold: true,
            color: t.accent,
          });
        });
      });

      // Save file
      const filename = selectedChapter === 'all' 
        ? 'Patterson_Hennessy_Ch4_Ch5_Presentation.pptx'
        : `Patterson_Hennessy_Chapter_${selectedChapter}.pptx`;

      await pres.writeFile({ fileName: filename });
      setIsExporting(false);
      setSuccess(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (err) {
      console.error(err);
      setIsExporting(false);
      alert('Failed to generate PowerPoint file. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Export Presentation (.pptx)</h3>
            <p className="text-xs text-slate-500">Download PowerPoint slides for Chapters 4 & 5</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Select Chapters to Export
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'all', label: 'All (Ch 4 & 5)' },
                { id: 4, label: 'Chapter 4 Only' },
                { id: 5, label: 'Chapter 5 Only' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedChapter(opt.id as any)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                    selectedChapter === opt.id
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-700 font-bold'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Presentation Theme Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'academic', label: 'Academic Light', bg: 'bg-white border-slate-300 text-slate-800' },
                { id: 'modern_dark', label: 'Modern Dark', bg: 'bg-slate-900 border-slate-700 text-white' },
                { id: 'slate_blue', label: 'Slate Blue', bg: 'bg-blue-50 border-blue-200 text-blue-900' },
              ].map((th) => (
                <button
                  key={th.id}
                  onClick={() => setTheme(th.id as any)}
                  className={`p-3 rounded-xl text-xs font-medium border flex flex-col items-center gap-1.5 transition-all ${th.bg} ${
                    theme === th.id ? 'ring-2 ring-indigo-600 ring-offset-2' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  <span className="font-bold">{th.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {success && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-medium">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Presentation exported successfully! Check your downloads folder.</span>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 font-medium text-xs hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGeneratePPTX}
            disabled={isExporting}
            className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 text-white font-medium text-xs shadow-md shadow-indigo-500/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating PPTX...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download .pptx File</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
