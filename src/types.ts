export interface SlideContent {
  id: string;
  sectionNumber: string;
  chapterNumber?: 4 | 5;
  chapter?: 4 | 5;
  title: string;
  subtitle: string;
  bulletPoints: string[];
  keyFormula?: string;
  exampleProblem: {
    title: string;
    problemStatement: string;
    steps: string[];
    finalAnswer: string;
  };
  examplePosition?: {
    title: string;
    problemStatement: string;
    steps: string[];
    finalAnswer: string;
  };
  codeSnippet?: string;
  diagramType?: 'datapath' | 'pipeline' | 'cache' | 'virtual_memory' | 'branch' | 'hierarchy';
  notes: string;
}

export interface SectionData {
  sectionNumber: string;
  title: string;
  chapter: 4 | 5;
  slides: SlideContent[];
}

export type PresentationTheme = 'academic' | 'modern_dark' | 'slate_blue' | 'emerald_tech';
