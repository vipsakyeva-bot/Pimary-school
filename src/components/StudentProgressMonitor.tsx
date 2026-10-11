import React, { useState } from 'react';
import { PrimaryStudent, LanguageCode } from '../types/school';
import { TrendingUp, Sparkles, BookOpen, Calculator, Award, CheckCircle2, AlertCircle, Search, User } from 'lucide-react';

interface StudentProgressMonitorProps {
  students: PrimaryStudent[];
  lang: LanguageCode;
}

export const StudentProgressMonitor: React.FC<StudentProgressMonitorProps> = ({
  students,
  lang,
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || 'STU-P-101');
  const [search, setSearch] = useState('');

  const t = {
    en: {
      title: 'Student Academic Progress & Individual Trajectory Monitor',
      subtitle: 'Longitudinal performance analytics across reading fluency, mathematics problem solving, and developmental growth areas.',
      selectStudent: 'Select Student Profile',
      currentGPA: 'Overall GPA',
      readingSpeed: 'Reading Fluency (WPM)',
      targetLabel: 'Grade Target',
      mathIndex: 'Math Problem-Solving Index',
      hwConsistency: 'Homework Submission Rate',
      trajectoryTitle: 'Quarterly Trajectory & Progress Dynamics',
      strengthsTitle: 'Demonstrated Cognitive Strengths',
      growthTitle: 'Targeted Pedagogical Growth Areas',
      recommendationsTitle: 'Individual Learning Recommendations (ИОТ)',
    },
    ky: {
      title: 'Окуучулардын жеке өнүгүүсү жана билим сапатынын мониторинги',
      subtitle: 'Окуу ылдамдыгы (техника чтения), математикалык ой жүгүртүү жана чейректик өсүш динамикасы.',
      selectStudent: 'Окуучуну тандоо',
      currentGPA: 'Жалпы GPA',
      readingSpeed: 'Окуу ылдамдыгы (сөз/мүн)',
      targetLabel: 'Норма',
      mathIndex: 'Математика индекси',
      hwConsistency: 'Үй тапшырманы аткаруу',
      trajectoryTitle: 'Чейректик өсүү динамикасы',
      strengthsTitle: 'Күчтүү жактары жана шыктары',
      growthTitle: 'Көңүл бурууну талап кылган багыттар',
      recommendationsTitle: 'Жеке билим берүү траекториясы (ИОТ)',
    },
    ru: {
      title: 'Мониторинг успеваемости и индивидуального прогресса учеников',
      subtitle: 'Лонгитюдный анализ динамики техники чтения, математической грамотности и зон развития.',
      selectStudent: 'Выбор учащегося',
      currentGPA: 'Итоговый GPA',
      readingSpeed: 'Техника чтения (слов/мин)',
      targetLabel: 'Норматив класса',
      mathIndex: 'Индекс математики',
      hwConsistency: 'Сдача домашних заданий',
      trajectoryTitle: 'Динамика успеваемости по четвертям (I - IV)',
      strengthsTitle: 'Выявленные сильные стороны',
      growthTitle: 'Зоны ближайшего развития',
      recommendationsTitle: 'Индивидуальная образовательная траектория (ИОТ)',
    },
  }[lang];

  const currentStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  const filteredList = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.grade.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
          <TrendingUp className="w-4 h-4 text-amber-600" />
          <span>Formative & Summative Diagnostics (Grades 1–6)</span>
        </div>
        <h2 className="text-xl font-bold text-stone-900 tracking-tight">{t.title}</h2>
        <p className="text-xs text-stone-500 mt-0.5">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Student Selector List (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">{t.selectStudent}</h3>
            <span className="text-xs text-stone-400 font-mono">{students.length} Total</span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search by student or grade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>

          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
            {filteredList.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStudentId(st.id)}
                className={`w-full p-3 rounded-lg text-left transition-all border ${
                  selectedStudentId === st.id
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-stone-50/50 border-stone-200/80 text-stone-800 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-xs leading-snug">{st.fullName}</div>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    selectedStudentId === st.id ? 'bg-stone-800 text-amber-300' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {st.grade}
                  </span>
                </div>
                <div className={`text-[11px] mt-1 flex items-center justify-between ${
                  selectedStudentId === st.id ? 'text-stone-300' : 'text-stone-500'
                }`}>
                  <span>Reading: {st.readingSpeedWpm} wpm</span>
                  <span className="font-mono tabular-nums font-bold">GPA: {st.gpa.toFixed(2)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Diagnostic Dashboard (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Student Overview Dossier Card */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
              <div>
                <h3 className="text-lg font-bold text-stone-900">{currentStudent.fullName}</h3>
                <div className="text-xs text-stone-500 mt-0.5">
                  Class: <strong className="text-stone-800">{currentStudent.grade}</strong> · Homeroom Teacher: {currentStudent.homeroomTeacher}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">Attendance</div>
                <div className="text-xl font-bold font-mono text-emerald-700 tabular-nums">
                  {currentStudent.attendanceRate}%
                </div>
              </div>
            </div>

            {/* Core Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
                <div className="text-[11px] text-stone-500">{t.currentGPA}</div>
                <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums mt-0.5">
                  {currentStudent.gpa.toFixed(2)}
                </div>
                <div className="text-[10px] text-emerald-700 font-medium mt-1">Excellent / 5.0 scale</div>
              </div>

              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
                <div className="text-[11px] text-stone-500">{t.readingSpeed}</div>
                <div className="text-2xl font-bold font-mono text-emerald-800 tabular-nums mt-0.5">
                  {currentStudent.readingSpeedWpm}
                </div>
                <div className="text-[10px] text-stone-500 mt-1">{t.targetLabel}: {currentStudent.readingSpeedTarget} wpm</div>
              </div>

              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
                <div className="text-[11px] text-stone-500">{t.mathIndex}</div>
                <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums mt-0.5">
                  {currentStudent.mathProficiencyIndex}%
                </div>
                <div className="text-[10px] text-stone-500 mt-1">Mental Arithmetic benchmark</div>
              </div>

              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200">
                <div className="text-[11px] text-stone-500">{t.hwConsistency}</div>
                <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums mt-0.5">
                  {currentStudent.homeworkCompletionRate}%
                </div>
                <div className="text-[10px] text-stone-500 mt-1">On-time submission</div>
              </div>
            </div>

            {/* Reading Speed Gauge Bar */}
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  <span>Reading Speed Technique Mastery Gauge</span>
                </span>
                <span className="font-mono text-emerald-800 font-bold">
                  {currentStudent.readingSpeedWpm} wpm (+{currentStudent.readingSpeedWpm - currentStudent.readingSpeedTarget} over target)
                </span>
              </div>
              <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, (currentStudent.readingSpeedWpm / (currentStudent.readingSpeedTarget * 1.4)) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Strengths & Growth Areas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t.strengthsTitle}</span>
              </h4>
              <ul className="space-y-2">
                {currentStudent.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-stone-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>{t.growthTitle}</span>
              </h4>
              <ul className="space-y-2">
                {currentStudent.growthAreas.map((gr, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-stone-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{gr}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Individual Learning Trajectory Guidance */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t.recommendationsTitle}</span>
            </h4>
            <p className="text-xs text-stone-700 leading-relaxed">
              Continue supporting advanced mental calculation. Allocate 10 minutes daily for geometric drawing exercises. Ready for participation in the Bishkek Elementary Olympiad selection round in spring.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
