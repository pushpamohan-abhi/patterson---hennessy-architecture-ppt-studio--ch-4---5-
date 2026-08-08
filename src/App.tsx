import React, { useState } from 'react';
import { chaptersData } from './data/chaptersData';
import { ChapterSidebar } from './components/ChapterSidebar';
import { Navbar } from './components/Navbar';
import { SlideViewer } from './components/SlideViewer';
import { ExportModal } from './components/ExportModal';
import { AIAssistantModal } from './components/AIAssistantModal';

export default function App() {
  const [currentSectionNumber, setCurrentSectionNumber] = useState<string>('4.1');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);

  const currentSection = chaptersData.find((s) => s.sectionNumber === currentSectionNumber) || chaptersData[0];

  // All section IDs in order
  const allSectionIds = chaptersData.map((s) => s.sectionNumber);
  const currentIndex = allSectionIds.indexOf(currentSectionNumber);

  const handleNextSection = () => {
    if (currentIndex < allSectionIds.length - 1) {
      setCurrentSectionNumber(allSectionIds[currentIndex + 1]);
    }
  };

  const handlePrevSection = () => {
    if (currentIndex > 0) {
      setCurrentSectionNumber(allSectionIds[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenAIModal={() => setIsAIModalOpen(true)}
        currentSectionNumber={currentSectionNumber}
        onNextSection={handleNextSection}
        onPrevSection={handlePrevSection}
      />

      <div className="flex-1 flex overflow-hidden">
        <ChapterSidebar
          chapters={chaptersData}
          currentSectionId={currentSectionNumber}
          onSelectSection={(secId) => setCurrentSectionNumber(secId)}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <SlideViewer
          section={currentSection}
          onNextSection={handleNextSection}
          onPrevSection={handlePrevSection}
        />
      </div>

      <ExportModal
        chapters={chaptersData}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        currentSectionNumber={currentSectionNumber}
        currentTitle={currentSection.title}
      />
    </div>
  );
}
