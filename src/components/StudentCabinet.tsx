import React, { useState } from 'react';
import { PrimaryStudent, HomeworkAssignment, LanguageCode } from '../types/school';
import { HOMEWORK_ASSIGNMENTS, PRIMARY_SCHEDULE } from '../data/grades1to6Data';
import { Backpack, CheckCircle, Clock, BookOpen, Star, Award, Sparkles, CheckSquare, Square } from 'lucide-react';

interface StudentCabinetProps {
  student: PrimaryStudent;
  lang: LanguageCode;
}

export const StudentCabinet: React.FC<StudentCabinetProps> = ({
  student,
  lang,
}) => {
  const [tasks, setTasks] = useState<HomeworkAssignment[]>(HOMEWORK_ASSIGNMENTS);

  const t = {
    en: {
      roleTitle: 'Student Digital Diary (Күндөлүк)',
      greeting: `Welcome back, ${student.fullName}!`,
      classInfo: `Grade ${student.grade} · Homeroom Teacher: ${student.homeroomTeacher}`,
      scheduleTitle: 'Today’s Lessons (Monday)',
      homeworkTitle: 'Homework Tasks to Complete',
      marksTitle: 'Recent Academic Marks',
      readingTitle: 'Technique of Reading Progress',
      readingTarget: 'Exceeding Grade 3 standard (95 wpm)',
      badgesTitle: 'My Achievements & Gold Stars',
      completed: 'Completed',
    },
    ky: {
      roleTitle: 'Окуучунун электрондук күндөлүгү',
      greeting: `Кош келдиң, ${student.fullName}!`,
      classInfo: `${student.grade} класс · Класс жетекчиси: ${student.homeroomTeacher}`,
      scheduleTitle: 'Бүгүнкү сабактарым (Дүйшөмбү)',
      homeworkTitle: 'Үй тапшырмаларым',
      marksTitle: 'Акыркы алган бааларым',
      readingTitle: 'Окуу ылдамдыгынын көрсөткүчү',
      readingTarget: '3-класстын нормасынан жогору (95 сөз/мүнөт)',
      badgesTitle: 'Менин медалдарым жана сыйлыктарым',
      completed: 'Аткарылды',
    },
    ru: {
      roleTitle: 'Электронный дневник ученика',
      greeting: `Добро пожаловать, ${student.fullName}!`,
      classInfo: `${student.grade} класс · Классный руководитель: ${student.homeroomTeacher}`,
      scheduleTitle: 'Мое расписание на сегодня (Понедельник)',
      homeworkTitle: 'Домашние задания',
      marksTitle: 'Недавние оценки в журнале',
      readingTitle: 'Техника чтения (слов в минуту)',
      readingTarget: 'Опережает норму 3-го класса (95 слов/мин)',
      badgesTitle: 'Мои достижения и золотые звезды',
      completed: 'Выполнено',
    },
  }[lang];

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completedByStudent: !t.completedByStudent } : t))
    );
  };

  const todayLessons = PRIMARY_SCHEDULE.filter((s) => s.day === 'Monday' && s.classGrade === student.grade);

  return (
    <div className="space-y-6">
      {/* Student Welcome Header Card */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-xl p-6 text-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-100 font-semibold">
            <Backpack className="w-4 h-4" />
            <span>{t.roleTitle}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">{t.greeting}</h2>
          <p className="text-xs text-amber-100 font-medium">{t.classInfo}</p>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20">
          <Star className="w-6 h-6 text-amber-200 fill-amber-200" />
          <div>
            <div className="text-[11px] text-amber-100 uppercase tracking-wider">Current GPA</div>
            <div className="text-xl font-bold font-mono tabular-nums">{student.gpa.toFixed(2)} / 5.00</div>
          </div>
        </div>
      </div>

      {/* Grid: Timetable & Homework */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Timetable (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>{t.scheduleTitle}</span>
            </h3>
            <span className="text-xs text-stone-500 font-mono">5 Periods Today</span>
          </div>

          <div className="space-y-2.5">
            {todayLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="p-3 rounded-lg border border-stone-200/80 bg-stone-50/50 hover:bg-stone-50 flex items-center justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                    <span className="w-5 h-5 rounded bg-amber-100 text-amber-900 flex items-center justify-center font-mono text-[11px]">
                      {lesson.periodNumber}
                    </span>
                    <span>{lesson.subject}</span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5 ml-7">
                    {lesson.teacher} · <span className="font-medium text-stone-700">{lesson.room}</span>
                  </div>
                </div>
                <span className="text-xs font-mono tabular-nums text-stone-600 font-medium">
                  {lesson.timeSlot}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Homework Checklist (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-stone-600" />
              <span>{t.homeworkTitle}</span>
            </h3>
            <span className="text-xs text-stone-500 font-mono">
              {tasks.filter((x) => x.completedByStudent).length}/{tasks.length} Done
            </span>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleToggleTask(task.id)}
                className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                  task.completedByStudent
                    ? 'bg-emerald-50/40 border-emerald-200 text-stone-500'
                    : 'bg-white border-stone-200 text-stone-900 hover:border-amber-400'
                }`}
              >
                <button type="button" className="mt-0.5 text-stone-500 hover:text-stone-900">
                  {task.completedByStudent ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-stone-400" />
                  )}
                </button>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-stone-500 uppercase">{task.subject}</span>
                    <span className="text-[10px] font-mono text-stone-400">Due {task.dueDate}</span>
                  </div>
                  <h4 className={`text-xs font-bold ${task.completedByStudent ? 'line-through text-stone-500' : 'text-stone-900'}`}>
                    {task.title}
                  </h4>
                  <p className="text-[11px] text-stone-600 leading-tight">{task.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reading Progress & Digital Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Technique of Reading (Техника чтения) */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t.readingTitle}</span>
            </h3>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {t.readingTarget}
            </span>
          </div>

          <div className="flex items-baseline gap-3 pt-2">
            <span className="text-4xl font-bold font-mono text-stone-900 tabular-nums">
              {student.readingSpeedWpm}
            </span>
            <span className="text-xs text-stone-500">words per minute (Target: {student.readingSpeedTarget} wpm)</span>
          </div>

          <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, (student.readingSpeedWpm / 130) * 100)}%` }}
            />
          </div>

          <p className="text-[11px] text-stone-500">
            Assessed by homeroom teacher during October oral reading inspection. Pronunciation: fluent and expressive.
          </p>
        </div>

        {/* Digital Gold Badges */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-stone-900 tracking-tight flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            <span>{t.badgesTitle}</span>
          </h3>

          <div className="flex flex-wrap gap-2 pt-2">
            {student.badges.map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold"
              >
                <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
