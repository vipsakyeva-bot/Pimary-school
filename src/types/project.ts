export type SubjectCategory = 'science' | 'biology' | 'physics' | 'history' | 'math' | 'environmental';

export interface ProjectSlide {
  id: string;
  title: string;
  subtitle?: string;
  bulletPoints: string[];
  keyHighlight?: string;
  speakerNotes?: string;
}

export interface CitationItem {
  id: string;
  type: 'book' | 'website' | 'journal';
  authors: string;
  title: string;
  publicationOrPublisher: string;
  year: string;
  url?: string;
}

export interface RubricCriterion {
  id: string;
  name: string;
  maxPoints: number;
  currentPoints: number;
  description: string;
}

export interface MilestoneItem {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  notes: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SchoolProject {
  id: string;
  title: string;
  subject: string;
  category: SubjectCategory;
  gradeLevel: string;
  studentName: string;
  schoolName: string;
  teacherName: string;
  dueDate: string;
  status: 'In Progress' | 'Review Ready' | 'Completed';
  abstract: string;
  hypothesis: string;
  materials: string[];
  methodology: string[];
  keyFindings: string[];
  conclusion: string;
  simulatorType?: 'energy' | 'photosynthesis' | 'gravity';
  slides: ProjectSlide[];
  citations: CitationItem[];
  milestones: MilestoneItem[];
  rubric: RubricCriterion[];
  quizQuestions: QuizQuestion[];
}
