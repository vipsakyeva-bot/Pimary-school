import React, { useState } from 'react';
import { LessonPeriod, PrimaryGradeLevel, LanguageCode } from '../types/school';
import { PRIMARY_SCHEDULE } from '../data/grades1to6Data';
import { Calendar, Clock, MapPin, User, Printer } from 'lucide-react';

interface PrimaryTimetableProps {
  lang: LanguageCode;
}

export const PrimaryTimetable: React.FC<PrimaryTimetableProps> = ({
  lang,
}) => {
  const [activeDay, setActiveDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('Monday');
  const [selectedGrade, setSelectedGrade] = useState<PrimaryGradeLevel>('3-A');

  const t = {
    en: {
      title: 'Electronic Timetable & Bell Schedule (Grades 1–6)',
      subtitle: 'Official lesson scheduling with pedagogical room allocations, breaks, and teacher shifts.',
      dayFilter: 'Day of Week',
      gradeFilter: 'Class Section',
      colPeriod: 'Period',
      colTime: 'Time Slot',
      colSubject: 'Subject & Academic Activity',
      colTeacher: 'Teacher',
      colRoom: 'Room / Suite',
      printBtn: 'Print Schedule',
      recess: 'Nutrition Break & Guided Physical Recess (Түшкү тамактануу / Прогулка)',
    },
    ky: {
      title: '1-6-класстардын сабактарынын жүгүртмөсү',
      subtitle: 'Расписание, коңгуроолор графиги, кабинеттер жана мугалимдердин бөлүштүрүлүшү.',
      dayFilter: 'Аптанын күнү',
      gradeFilter: 'Класс бөлүмү',
      colPeriod: 'Пара',
      colTime: 'Убактысы',
      colSubject: 'Сабактын аталышы',
      colTeacher: 'Мугалим',
      colRoom: 'Кабинет',
      printBtn: 'Басып чыгаруу',
      recess: 'Түшкү тамактануу жана эс алуу убактысы',
    },
    ru: {
      title: 'Электронное расписание уроков и звонков (1–6 классы)',
      subtitle: 'Сетка уроков начальной школы с учетом санитарных норм и динамических пауз.',
      dayFilter: 'День недели',
      gradeFilter: 'Класс',
      colPeriod: 'Урок',
      colTime: 'Время урока',
      colSubject: 'Учебный предмет',
      colTeacher: 'Преподаватель',
      colRoom: 'Кабинет',
      printBtn: 'Печать расписания',
      recess: 'Горячий обед и динамическая прогулка на свежем воздухе',
    },
  }[lang];

  const days: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'> = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];

  const gradesList: PrimaryGradeLevel[] = [
    '1-A', '1-B', '2-A', '2-B', '3-A', '3-B',
    '4-A', '4-B', '5-A', '5-B', '6-A', '6-B'
  ];

  const dayLessons = PRIMARY_SCHEDULE.filter(
    (l) => l.day === activeDay && l.classGrade === selectedGrade
  );

  // Bell schedule for primary grades 1-6
  const bellSlots = [
    { num: 1, time: '08:30 - 09:15', defaultSubject: 'Mental Arithmetic & Math' },
    { num: 2, time: '09:25 - 10:10', defaultSubject: 'Literary Reading & Calligraphy' },
    { num: 3, time: '10:25 - 11:10', defaultSubject: 'Kyrgyz Language (Кыргыз тили)' },
    { num: 4, time: '11:20 - 12:05', defaultSubject: 'Cambridge Primary English' },
    { isBreak: true, time: '12:05 - 12:50', label: t.recess },
    { num: 5, time: '12:50 - 13:35', defaultSubject: 'Robotics & Scratch Coding' },
    { num: 6, time: '13:45 - 14:30', defaultSubject: 'Chess & Logic Development' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-stone-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-500" />
            <span>{t.title}</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">{t.subtitle}</p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-200 transition-colors shrink-0"
        >
          <Printer className="w-3.5 h-3.5 text-stone-600" />
          <span>{t.printBtn}</span>
        </button>
      </div>

      {/* Selectors */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">{t.dayFilter}</label>
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200 overflow-x-auto">
            {days.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  activeDay === d ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">{t.gradeFilter}</label>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {gradesList.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap border ${
                  selectedGrade === g
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 w-20">{t.colPeriod}</th>
                <th className="py-3 px-4 w-36">{t.colTime}</th>
                <th className="py-3 px-4">{t.colSubject}</th>
                <th className="py-3 px-4">{t.colTeacher}</th>
                <th className="py-3 px-4 pr-6">{t.colRoom}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {bellSlots.map((slot, sIdx) => {
                if (slot.isBreak) {
                  return (
                    <tr key={sIdx} className="bg-amber-50/50">
                      <td colSpan={5} className="py-2.5 px-4 text-center font-semibold text-amber-900 text-xs">
                        🍴 {slot.time} · {slot.label}
                      </td>
                    </tr>
                  );
                }

                const specific = dayLessons.find((l) => l.periodNumber === slot.num);
                const subjectName = specific ? specific.subject : slot.defaultSubject;
                const teacherName = specific ? specific.teacher : 'Aizada Beishenalieva';
                const roomName = specific ? specific.room : 'Room 104 · Junior STEM Hall';

                return (
                  <tr key={sIdx} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-stone-900 tabular-nums">
                      Period {slot.num}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-500 tabular-nums">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>{slot.time}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-stone-900">
                      {subjectName}
                    </td>
                    <td className="py-3.5 px-4 text-stone-700">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-stone-400" />
                        <span>{teacherName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 pr-6">
                      <div className="flex items-center gap-1.5 text-amber-900 font-medium bg-amber-50/60 px-2.5 py-1 rounded-md border border-amber-200/60 w-fit">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        <span>{roomName}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
