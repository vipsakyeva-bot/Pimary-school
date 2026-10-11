export type LanguageCode = 'en' | 'ky' | 'ru';

export type UserRole = 'director' | 'vice_principal' | 'teacher' | 'student' | 'parent';

export type PrimaryGradeLevel =
  | '1-A'
  | '1-B'
  | '2-A'
  | '2-B'
  | '3-A'
  | '3-B'
  | '4-A'
  | '4-B'
  | '5-A'
  | '5-B'
  | '6-A'
  | '6-B';

export type AcademicTrack = 'Trilingual Excellence (EN-KG-RU)' | 'Cambridge IGCSE / A-Levels' | 'National Lyceum STEM';

export interface Student {
  id: string;
  fullName: string;
  fullNameKg?: string;
  grade: string;
  track: AcademicTrack;
  gpa: number;
  attendancePercent: number;
  tuitionStatus: 'Paid' | 'Pending' | 'Overdue';
  scholarshipPercent: number;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  enrolledDate: string;
  ortMockScore?: number;
  olympiadSubject?: string;
  olympiadMedal?: string;
  dormitory: boolean;
}

export interface PrimaryStudent {
  id: string;
  fullName: string;
  fullNameKg?: string;
  grade: PrimaryGradeLevel;
  birthYear: number;
  homeroomTeacher: string;
  gpa: number;
  attendanceRate: number;
  readingSpeedWpm: number;
  readingSpeedTarget: number;
  mathProficiencyIndex: number;
  homeworkCompletionRate: number;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  tuitionStatus: 'Paid' | 'Pending' | 'Overdue';
  avatarColor: string;
  strengths: string[];
  growthAreas: string[];
  badges: string[];
}

export interface Teacher {
  id: string;
  fullName: string;
  department: 'STEM & Robotics' | 'Languages (KG/EN/RU)' | 'Natural Sciences' | 'Humanities & History' | 'Athletics & Arts';
  role: string;
  qualification: string;
  email: string;
  phone: string;
  weeklyHours: number;
  assignedClasses: string[];
}

export interface TeacherWorkRecord {
  id: string;
  teacherId: string;
  teacherName: string;
  department: string;
  assignedClasses: string[];
  syllabusCompletionRate: number;
  lessonPlanCompliance: number;
  averageStudentPerformance: number;
  qualityOfKnowledgePercent: number;
  observationScore: number;
  lastObservedDate: string;
  observationNotes: string;
  kpiRating: 'Exemplary' | 'Proficient' | 'Needs Coaching';
  awards: string[];
}

export interface GradeEntry {
  id: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  subject: string;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  scores: number[];
  examScore: number;
  finalGrade: number;
}

export interface SchedulePeriod {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  period: number;
  timeSlot: string;
  subject: string;
  teacher: string;
  classroom: string;
  classGrade: string;
}

export interface LessonPeriod {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  periodNumber: number;
  timeSlot: string;
  subject: string;
  teacher: string;
  room: string;
  classGrade: PrimaryGradeLevel;
}

export interface TuitionInvoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  termName: string;
  tuitionFeeKGS: number;
  scholarshipDiscountKGS: number;
  finalAmountKGS: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  paymentDate?: string;
  paymentMethod?: string;
}

export interface ORTRecord {
  id: string;
  studentId: string;
  studentName: string;
  classGrade: string;
  mainTest: number;
  mathSection: number;
  englishSection: number;
  kyrgyzSection: number;
  chemBioSection?: number;
  compositeTotal: number;
  badgeStatus: 'Golden Certificate Track (220+)' | 'High Honors (200-219)' | 'Competitive (175-199)';
  targetUniversity: string;
}

export interface AttendanceItem {
  studentId: string;
  studentName: string;
  classGrade: string;
  status: 'Present' | 'Late' | 'Absent' | 'Excused';
  timestamp: string;
  note?: string;
}

export interface SchoolAnnouncement {
  id: string;
  title: string;
  titleKg: string;
  date: string;
  category: 'Olympiad' | 'Academic' | 'ORT Preparation' | 'Administration';
  author: string;
  summary: string;
  isPinned: boolean;
}

export interface HomeworkAssignment {
  id: string;
  classGrade: PrimaryGradeLevel;
  subject: string;
  dueDate: string;
  title: string;
  description: string;
  assignedBy: string;
  completedByStudent?: boolean;
}

export interface InspectionObservation {
  id: string;
  date: string;
  teacherName: string;
  classGrade: PrimaryGradeLevel;
  subject: string;
  topic: string;
  observedBy: string;
  score: number;
  criteria: {
    pedagogicalMethods: number;
    studentEngagement: number;
    curriculumStandards: number;
    digitalToolsUsage: number;
  };
  recommendations: string;
  status: 'Approved' | 'Action Plan Required';
}
