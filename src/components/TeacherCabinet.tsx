import React, { useState } from 'react';
import { PrimaryStudent, HomeworkAssignment, LanguageCode } from '../types/school';
import { HOMEWORK_ASSIGNMENTS } from '../data/grades1to6Data';
import { GraduationCap, Calendar, CheckCircle2, Plus, Sparkles, BookOpen, Send, Clock } from 'lucide-react';

interface TeacherCabinetProps {
  students: PrimaryStudent[];
  lang: LanguageCode;
  onNavigateTab: (tab: string) => void;
}

export const TeacherCabinet: React.FC<TeacherCabinetProps> = ({
  students,
  lang,
  onNavigateTab,
}) => {
  const [homeworks, setHomeworks] = useState<HomeworkAssignment[]>(HOMEWORK_ASSIGNMENTS);
  const [showHomeworkModal, setShowHomeworkModal] = useState(false);
  const [hwSubject, setHwSubject] = useState('Mental Arithmetic & Math');
  const [hwTitle, setHwTitle] = useState('');
  const [hwDesc, setHwDesc] = useState('');
  const [hwDate, setHwDate] = useState('2026-10-15');

  const t = {
    en: {
      roleTitle: 'Teacher Workspace: Aizada Beishenalieva',
      subtitle: 'Homeroom Lead for Grade 3-A · Certified Primary Singapore Math & Kyrgyz Language Pedagogy.',
      todaySchedule: 'My Today’s Lesson Schedule (Monday)',
      quickGrade: 'Quick Mark Entry for 3-A Cohort',
      homeworksTitle: 'Assigned Homework & Reading Practice',
      createHomeworkBtn: 'Post New Homework',
      colStudent: 'Student',
      colReading: 'Reading Speed (WPM)',
      colMath: 'Math Index',
      colGradeInput: 'Add Today’s Mark',
      modalTitle: 'Assign Homework to 3-A Class',
      modalBtn: 'Publish to Student Diaries',
    },
    ky: {
      roleTitle: 'Мугалимдин иш бөлмөсү: Айзада Бейшеналиева',
      subtitle: '3-А классынын жетекчиси · Башталгыч класстар боюнча мыкты педагог.',
      todaySchedule: 'Бүгүнкү сабактарым (Дүйшөмбү)',
      quickGrade: '3-А классына баа коюу журналы',
      homeworksTitle: 'Берилген үй тапшырмалар',
      createHomeworkBtn: 'Жаңы үй тапшырма берүү',
      colStudent: 'Окуучу',
      colReading: 'Окуу ылдамдыгы (сөз/мүнөт)',
      colMath: 'Математика индекси',
      colGradeInput: 'Бүгүнкү баа',
      modalTitle: '3-А классына үй тапшырма берүү',
      modalBtn: 'Окуучулардын күндөлүгүнө жөнөтүү',
    },
    ru: {
      roleTitle: 'Рабочий кабинет учителя: Айзада Бейшеналиева',
      subtitle: 'Классный руководитель 3-А класса · Учитель начальных классов высшей категории.',
      todaySchedule: 'Мое расписание уроков на сегодня (Понедельник)',
      quickGrade: 'Экспресс-выставление оценок за урок (3-А класс)',
      homeworksTitle: 'Заданные домашние задания и техника чтения',
      createHomeworkBtn: 'Задать домашнее задание',
      colStudent: 'Ученик',
      colReading: 'Техника чтения (слов/мин)',
      colMath: 'Индекс математики',
      colGradeInput: 'Оценка за урок',
      modalTitle: 'Задать домашнее задание для 3-А класса',
      modalBtn: 'Опубликовать в электронных дневниках',
    },
  }[lang];

  const handlePostHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwTitle.trim()) return;
    const newHw: HomeworkAssignment = {
      id: `HW-${Date.now()}`,
      classGrade: '3-A',
      subject: hwSubject,
      dueDate: hwDate,
      title: hwTitle.trim(),
      description: hwDesc.trim() || 'Complete exercises as demonstrated in class.',
      assignedBy: 'Aizada Beishenalieva',
    };
    setHomeworks((prev) => [newHw, ...prev]);
    setShowHomeworkModal(false);
    setHwTitle('');
    setHwDesc('');
  };

  const myClassStudents = students.filter((s) => s.grade === '3-A');

  return (
    <div className="space-y-6">
      {/* Teacher Profile Lockup */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>Primary Department · Homeroom Educator</span>
          </div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">{t.roleTitle}</h2>
          <p className="text-xs text-stone-500 mt-0.5">{t.subtitle}</p>
        </div>

        <button
          onClick={() => setShowHomeworkModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white transition-colors shrink-0 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{t.createHomeworkBtn}</span>
        </button>
      </div>

      {/* Today's Lessons Schedule */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-stone-900 tracking-tight mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-500" />
          <span>{t.todaySchedule}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200/80">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
              <span>Period 1: Mental Arithmetic</span>
              <span className="font-mono text-emerald-700">08:30 - 09:15</span>
            </div>
            <div className="text-[11px] text-emerald-800 mt-1">Class 3-A · Room 104 · Topic: Two-digit multiplication</div>
          </div>

          <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200/80">
            <div className="flex items-center justify-between text-xs font-bold text-stone-900">
              <span>Period 2: Literary Reading</span>
              <span className="font-mono text-stone-500">09:25 - 10:10</span>
            </div>
            <div className="text-[11px] text-stone-600 mt-1">Class 3-A · Room 104 · Expressive reading drill</div>
          </div>

          <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200/80">
            <div className="flex items-center justify-between text-xs font-bold text-stone-900">
              <span>Period 4: Calligraphy</span>
              <span className="font-mono text-stone-500">11:20 - 12:05</span>
            </div>
            <div className="text-[11px] text-stone-600 mt-1">Class 3-B · Room 106 · Cursive penmanship</div>
          </div>
        </div>
      </div>

      {/* Quick Grading Desk for Homeroom Students */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-6 pb-3 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-stone-900 tracking-tight">{t.quickGrade}</h3>
            <p className="text-xs text-stone-500 mt-0.5">Click any mark to immediately log into the electronic gradebook.</p>
          </div>
          <button
            onClick={() => onNavigateTab('gradebook')}
            className="text-xs text-stone-700 hover:text-stone-900 font-semibold"
          >
            Full Class Journal →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">{t.colStudent}</th>
                <th className="py-3 px-4 text-right">{t.colReading}</th>
                <th className="py-3 px-4 text-right">{t.colMath}</th>
                <th className="py-3 px-4 text-center pr-6">{t.colGradeInput}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {myClassStudents.map((st) => (
                <tr key={st.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-stone-900">
                    {st.fullName}
                    <div className="text-[10px] text-stone-400 font-normal">{st.fullNameKg}</div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums font-semibold text-stone-800">
                    {st.readingSpeedWpm} wpm
                    <span className="text-[10px] text-emerald-700 ml-1">✓ Goal met</span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums font-semibold text-stone-800">
                    {st.mathProficiencyIndex}%
                  </td>
                  <td className="py-3 px-4 text-center pr-6">
                    <div className="inline-flex items-center gap-1">
                      {[5, 4, 3].map((m) => (
                        <button
                          key={m}
                          onClick={() => alert(`Mark ${m} successfully recorded for ${st.fullName} in Mental Arithmetic!`)}
                          className={`w-7 h-7 rounded font-mono font-bold text-xs transition-transform active:scale-90 border ${
                            m === 5
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200'
                              : m === 4
                              ? 'bg-sky-100 text-sky-900 border-sky-300 hover:bg-sky-200'
                              : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Homework Assignments Posted */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-stone-900 tracking-tight mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-stone-600" />
          <span>{t.homeworksTitle} ({homeworks.length})</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {homeworks.map((hw) => (
            <div key={hw.id} className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-800">{hw.subject}</span>
                <span className="font-mono text-stone-500 tabular-nums">Due {hw.dueDate}</span>
              </div>
              <h4 className="text-xs font-bold text-stone-900">{hw.title}</h4>
              <p className="text-[11px] text-stone-600 leading-relaxed">{hw.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Post Homework Modal */}
      {showHomeworkModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-xl border border-stone-200 shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="text-base font-bold text-stone-900">{t.modalTitle}</h3>
              <p className="text-xs text-stone-500 mt-0.5">Assigned tasks will appear directly in student digital diaries and parent portals.</p>
            </div>

            <form onSubmit={handlePostHomework} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Subject</label>
                <select
                  value={hwSubject}
                  onChange={(e) => setHwSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-stone-50"
                >
                  <option value="Mental Arithmetic & Math">Mental Arithmetic & Math</option>
                  <option value="Literary Reading & Calligraphy">Literary Reading & Calligraphy</option>
                  <option value="Kyrgyz Language (Кыргыз тили)">Kyrgyz Language (Кыргыз тили)</option>
                  <option value="Cambridge Primary English">Cambridge Primary English</option>
                  <option value="Robotics & Scratch Coding">Robotics & Scratch Coding</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Assignment Title</label>
                <input
                  type="text"
                  placeholder="e.g. Page 58, Problem 3 & Expressive Reading"
                  value={hwTitle}
                  onChange={(e) => setHwTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={hwDate}
                  onChange={(e) => setHwDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Instructions & Guidance</label>
                <textarea
                  rows={3}
                  placeholder="Instructions for students and what parents should check..."
                  value={hwDesc}
                  onChange={(e) => setHwDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowHomeworkModal(false)}
                  className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white"
                >
                  {t.modalBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
