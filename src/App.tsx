import { useState, useEffect } from 'react';
import {
  LanguageCode,
  UserRole,
  PrimaryStudent,
  TeacherWorkRecord,
  GradeEntry,
  SchoolAnnouncement,
} from './types/school';
import { PRIMARY_STUDENTS, TEACHER_WORK_RECORDS } from './data/grades1to6Data';
import { INITIAL_GRADES, INITIAL_ANNOUNCEMENTS, INITIAL_ATTENDANCE } from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { RoleSwitcher } from './components/RoleSwitcher';
import { DirectorCabinet } from './components/DirectorCabinet';
import { VicePrincipalCabinet } from './components/VicePrincipalCabinet';
import { TeacherCabinet } from './components/TeacherCabinet';
import { StudentCabinet } from './components/StudentCabinet';
import { ParentCabinet } from './components/ParentCabinet';
import { TeacherControlModule } from './components/TeacherControlModule';
import { StudentProgressMonitor } from './components/StudentProgressMonitor';
import { PrimaryTimetable } from './components/PrimaryTimetable';
import { ElectronicGradebook } from './components/ElectronicGradebook';
import { AttendanceTerminal } from './components/AttendanceTerminal';
import { BursarFinance } from './components/BursarFinance';
import { EnrollStudentModal } from './components/EnrollStudentModal';
import { AnnouncementsModal } from './components/AnnouncementsModal';
import { DashboardOverview } from './components/DashboardOverview';

export default function App() {
  const [lang, setLang] = useState<LanguageCode>('ru'); // Default to Russian as requested by user prompt, switchable to KY/EN
  const [currentTab, setCurrentTab] = useState<string>('cabinets');
  const [currentRole, setCurrentRole] = useState<UserRole>('director');

  // Primary students state
  const [students, setStudents] = useState<PrimaryStudent[]>(() => {
    const saved = localStorage.getItem('premier_primary_students');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return PRIMARY_STUDENTS;
  });

  // Teachers state
  const [teachers, setTeachers] = useState<TeacherWorkRecord[]>(() => {
    const saved = localStorage.getItem('premier_primary_teachers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return TEACHER_WORK_RECORDS;
  });

  // Grades state
  const [grades, setGrades] = useState<GradeEntry[]>(INITIAL_GRADES);

  // Announcements
  const [announcements] = useState<SchoolAnnouncement[]>(INITIAL_ANNOUNCEMENTS);

  // Modals
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isAnnouncementsModalOpen, setIsAnnouncementsModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('premier_primary_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('premier_primary_teachers', JSON.stringify(teachers));
  }, [teachers]);

  const handleEnrollStudent = (newStudent: PrimaryStudent) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  const handleUpdateGrade = (updated: GradeEntry) => {
    setGrades((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
  };

  const activeStudent = students.find((s) => s.grade === '3-A') || students[0];

  return (
    <div className="flex min-h-screen bg-stone-50 text-stone-900 font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        lang={lang}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <Header
          currentTab={currentTab}
          lang={lang}
          onLanguageChange={setLang}
          onOpenEnrollModal={() => setIsEnrollModalOpen(true)}
          onOpenAnnouncements={() => setIsAnnouncementsModalOpen(true)}
          announcementCount={announcements.length}
        />

        {/* Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Always available Role Switcher when in cabinets view or on top */}
          {currentTab === 'cabinets' && (
            <RoleSwitcher
              currentRole={currentRole}
              onSelectRole={setCurrentRole}
              lang={lang}
            />
          )}

          {/* Tab 1: Executive Dashboard */}
          {currentTab === 'dashboard' && (
            <DashboardOverview
              students={students as any}
              teachers={teachers as any}
              announcements={announcements}
              lang={lang}
              onNavigate={setCurrentTab}
            />
          )}

          {/* Tab 2: Role Cabinets */}
          {currentTab === 'cabinets' && (
            <div>
              {currentRole === 'director' && (
                <DirectorCabinet
                  students={students}
                  teachers={teachers}
                  lang={lang}
                  onNavigateTab={setCurrentTab}
                />
              )}

              {currentRole === 'vice_principal' && (
                <VicePrincipalCabinet
                  teachers={teachers}
                  lang={lang}
                />
              )}

              {currentRole === 'teacher' && (
                <TeacherCabinet
                  students={students}
                  lang={lang}
                  onNavigateTab={setCurrentTab}
                />
              )}

              {currentRole === 'student' && (
                <StudentCabinet
                  student={activeStudent}
                  lang={lang}
                />
              )}

              {currentRole === 'parent' && (
                <ParentCabinet
                  student={activeStudent}
                  lang={lang}
                />
              )}
            </div>
          )}

          {/* Tab 3: Students Directory (Grades 1–6) */}
          {currentTab === 'students' && (
            <StudentProgressMonitor
              students={students}
              lang={lang}
            />
          )}

          {/* Tab 4: Electronic Timetable & Bell Schedule */}
          {currentTab === 'timetable' && (
            <PrimaryTimetable
              lang={lang}
            />
          )}

          {/* Tab 5: Electronic Gradebook */}
          {currentTab === 'gradebook' && (
            <ElectronicGradebook
              grades={grades}
              lang={lang}
              onUpdateGrade={handleUpdateGrade}
            />
          )}

          {/* Tab 6: Daily Attendance Terminal */}
          {currentTab === 'attendance' && (
            <AttendanceTerminal
              initialAttendance={INITIAL_ATTENDANCE}
              lang={lang}
            />
          )}

          {/* Tab 7: Teacher Performance Control */}
          {currentTab === 'teacher_control' && (
            <TeacherControlModule
              teachers={teachers}
              lang={lang}
            />
          )}

          {/* Tab 8: Student Individual Progress & Reading Fluency */}
          {currentTab === 'student_progress' && (
            <StudentProgressMonitor
              students={students}
              lang={lang}
            />
          )}

          {/* Tab 9: Bursar & Tuition Accounts */}
          {currentTab === 'bursar' && (
            <BursarFinance
              lang={lang}
            />
          )}

          {/* Tab 10: Announcements */}
          {currentTab === 'announcements' && (
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-stone-900">
                {lang === 'ky' ? 'Мектептин жарыялары' : lang === 'ru' ? 'Объявления комплекса' : 'Campus Bulletins'}
              </h2>
              <div className="space-y-3">
                {announcements.map((ann) => (
                  <div key={ann.id} className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
                    <div className="flex justify-between text-xs text-stone-500 font-mono">
                      <span className="font-semibold text-stone-800">{ann.category}</span>
                      <span>{ann.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-stone-900">
                      {lang === 'ky' ? ann.titleKg : ann.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{ann.summary}</p>
                    <div className="text-[11px] text-stone-400">Authorized by: {ann.author}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-stone-200 bg-white py-4 px-6 text-xs text-stone-500 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-900">Premier Educational Complex</span>
              <span aria-hidden="true">·</span>
              <span>Bishkek, Kyrgyzstan</span>
              <span aria-hidden="true">·</span>
              <span>Grades 1–6 Primary & Middle School System</span>
            </div>
            <div className="text-stone-400 text-[11px]">
              Ready for Vercel & GitHub deployment · Licensed by Ministry of Education & Science KR
            </div>
          </div>
        </footer>
      </div>

      {/* Enroll Student Modal */}
      {isEnrollModalOpen && (
        <EnrollStudentModal
          onClose={() => setIsEnrollModalOpen(false)}
          onEnroll={handleEnrollStudent}
          lang={lang}
        />
      )}

      {/* Announcements Modal */}
      {isAnnouncementsModalOpen && (
        <AnnouncementsModal
          announcements={announcements}
          lang={lang}
          onClose={() => setIsAnnouncementsModalOpen(false)}
        />
      )}
    </div>
  );
}
