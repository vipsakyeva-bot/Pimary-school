import React, { useState } from 'react';
import { SchedulePeriod, LanguageCode } from '../types/school';
import { Calendar, Clock, MapPin, User, Printer } from 'lucide-react';

interface TimetableScheduleProps {
  schedule: SchedulePeriod[];
  lang: LanguageCode;
}

export const TimetableSchedule: React.FC<TimetableScheduleProps> = ({
  schedule,
  lang,
}) => {
  const [activeDay, setActiveDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('Monday');
  const [activeClass, setActiveClass] = useState<string>('11-Olympiad');

  const t = {
    en: {
      title: 'Class Schedule & Lab Room Allocations',
      subtitle: 'Standardized 7-period schedule across campus wings, laboratories, and halls.',
      dayFilter: 'Day of the Week',
      classFilter: 'Class Section',
      periodCol: 'Period',
      timeCol: 'Time Interval',
      subjectCol: 'Subject & Academic Discipline',
      teacherCol: 'Assigned Instructor',
      roomCol: 'Classroom / Lab Suite',
      printBtn: 'Print Schedule',
      noLessons: 'No scheduled lessons recorded for this day and class section.',
    },
    ky: {
      title: 'Сабактардын жүгүртмөсү жана кабинеттер',
      subtitle: 'Окуу корпустары, лабораториялар жана залдар боюнча 7 паралык расписание.',
      dayFilter: 'Аптанын күнү',
      classFilter: 'Класс бөлүмү',
      periodCol: 'Пара',
      timeCol: 'Сабактын убактысы',
      subjectCol: 'Сабактын аталышы',
      teacherCol: 'Мугалим',
      roomCol: 'Кабинет / Лаборатория',
      printBtn: 'Расписаниены басып чыгаруу',
      noLessons: 'Бул күнү тандалган класс үчүн сабактар жок.',
    },
    ru: {
      title: 'Расписание уроков и распределение аудиторий',
      subtitle: 'Семиурочная сетка занятий по учебным корпусам, лабораториям и лекториям.',
      dayFilter: 'День недели',
      classFilter: 'Учебный класс',
      periodCol: 'Урок',
      timeCol: 'Время занятия',
      subjectCol: 'Предмет',
      teacherCol: 'Преподаватель',
      roomCol: 'Кабинет / Лаборатория',
      printBtn: 'Печать расписания',
      noLessons: 'На выбранный день уроков для этого класса не запланировано.',
    },
  }[lang];

  const days: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'> = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];

  const classesList = ['11-Olympiad', '10-A', '9-B', '11-A'];

  // All 7 standard school periods
  const standardPeriods = [
    { period: 1, time: '08:30 - 09:15' },
    { period: 2, time: '09:25 - 10:10' },
    { period: 3, time: '10:25 - 11:10' },
    { period: 4, time: '11:20 - 12:05' },
    { period: 5, time: '12:50 - 13:35' },
    { period: 6, time: '13:45 - 14:30' },
    { period: 7, time: '14:40 - 15:25' },
  ];

  const filteredLessons = schedule.filter(
    (s) => s.day === activeDay && (activeClass === 'All' || s.classGrade === activeClass)
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-stone-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-500" />
            <span>{t.title}</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">{t.subtitle}</p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-200 transition-colors shrink-0"
        >
          <Printer className="w-3.5 h-3.5 text-stone-600" />
          <span>{t.printBtn}</span>
        </button>
      </div>

      {/* Days & Class Section Filters */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs space-y-4">
        {/* Days segmented tabs */}
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

        {/* Class Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-stone-500 mr-1 shrink-0">{t.classFilter}:</span>
          {classesList.map((c) => (
            <button
              key={c}
              onClick={() => setActiveClass(c)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap border ${
                activeClass === c
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 w-20">{t.periodCol}</th>
                <th className="py-3 px-4 w-36">{t.timeCol}</th>
                <th className="py-3 px-4">{t.subjectCol}</th>
                <th className="py-3 px-4">{t.teacherCol}</th>
                <th className="py-3 px-4 pr-6">{t.roomCol}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {standardPeriods.map((sp) => {
                const lesson = filteredLessons.find((l) => l.period === sp.period);
                return (
                  <tr key={sp.period} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-stone-900 tabular-nums">
                      Period {sp.period}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-500 tabular-nums">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>{sp.time}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {lesson ? (
                        <div className="font-semibold text-stone-900 text-sm">
                          {lesson.subject}
                        </div>
                      ) : (
                        <span className="text-stone-400 italic">Self-Study / Activity Recess</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {lesson ? (
                        <div className="flex items-center gap-1.5 text-stone-800">
                          <User className="w-3.5 h-3.5 text-stone-400" />
                          <span>{lesson.teacher}</span>
                        </div>
                      ) : (
                        <span className="text-stone-300">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 pr-6">
                      {lesson ? (
                        <div className="flex items-center gap-1.5 text-amber-900 font-medium bg-amber-50/60 px-2.5 py-1 rounded-md border border-amber-200/60 w-fit">
                          <MapPin className="w-3.5 h-3.5 text-amber-600" />
                          <span>{lesson.classroom}</span>
                        </div>
                      ) : (
                        <span className="text-stone-300">—</span>
                      )}
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
