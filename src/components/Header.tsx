import React from 'react';
import { LanguageCode } from '../types/school';
import { Globe, UserPlus, Bell } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  lang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onOpenEnrollModal: () => void;
  onOpenAnnouncements: () => void;
  announcementCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  lang,
  onLanguageChange,
  onOpenEnrollModal,
  onOpenAnnouncements,
  announcementCount,
}) => {
  const pageTitles: Record<string, { en: string; ky: string; ru: string }> = {
    dashboard: { en: 'Executive Dashboard (Grades 1–6)', ky: 'Башкы башкаруу панели (1-6-класстар)', ru: 'Главная панель управления (1–6 классы)' },
    cabinets: { en: 'Role Personal Cabinets (5 Personas)', ky: 'Жеке кабинеттер (Директор, Завуч, Мугалим, Окуучу, Ата-эне)', ru: 'Личные кабинеты (Директор, Завуч, Учитель, Ученик, Родитель)' },
    students: { en: 'Students Directory (Grades 1–6)', ky: '1-6-класстардын окуучулары', ru: 'Реестр учащихся (1–6 классы)' },
    gradebook: { en: 'Electronic Gradebook & Journal', ky: 'Электрондук класс журналы', ru: 'Электронный классный журнал' },
    timetable: { en: 'Electronic Timetable & Bell Schedule', ky: 'Сабактардын расписаниеси', ru: 'Электронное расписание уроков' },
    attendance: { en: 'Daily Campus Attendance Terminal', ky: 'Катышуу журналы', ru: 'Учет посещаемости' },
    teacher_control: { en: 'Teacher Performance Control & Progress', ky: 'Мугалимдерди көзөмөлдөө жана KPI', ru: 'Контроль работы учителей и мониторинг KPI' },
    student_progress: { en: 'Individual Student Progress & Reading Fluency', ky: 'Окуучулардын жеке өсүшү жана техника чтения', ru: 'Мониторинг успеваемости и техника чтения' },
    bursar: { en: 'Bursar Office & Tuition Accounts (KGS)', ky: 'Каржы жана төлөмдөр (сом)', ru: 'Бухгалтерия и оплата за обучение' },
    announcements: { en: 'Campus Bulletins & Official Notices', ky: 'Мектептин жарыялары', ru: 'Объявления комплекса' },
  };

  const currentTitle = pageTitles[currentTab]?.[lang] || 'School Management';

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-stone-200 px-6 py-3.5 flex items-center justify-between gap-6 shadow-xs">
      {/* Zone 1: Breadcrumb Trail (Single line) */}
      <div className="flex items-center gap-2 text-xs text-stone-500 whitespace-nowrap shrink-0 overflow-hidden">
        <span className="font-semibold text-stone-900">Premier Complex</span>
        <span aria-hidden="true">/</span>
        <span className="text-stone-700 font-medium truncate">{currentTitle}</span>
      </div>

      {/* Zone 2: Language Selector & Academic Session Metadata */}
      <div className="hidden sm:flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5 text-stone-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-medium text-stone-700">2026–2027 Academic Year</span>
          <span aria-hidden="true">·</span>
          <span>Grades 1–6 Focus</span>
        </div>

        {/* Trilingual Switcher (Functional buttons) */}
        <div className="flex items-center gap-1 p-0.5 bg-stone-100 rounded-lg border border-stone-200">
          <Globe className="w-3.5 h-3.5 ml-2 mr-1 text-stone-500" />
          {(['en', 'ky', 'ru'] as const).map((l) => (
            <button
              key={l}
              onClick={() => onLanguageChange(l)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                lang === l
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {l === 'en' ? 'ENG' : l === 'ky' ? 'КЫР' : 'РУС'}
            </button>
          ))}
        </div>
      </div>

      {/* Zone 3: Primary Action Controls */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onOpenAnnouncements}
          className="relative p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors border border-stone-200"
          title="Announcements"
        >
          <Bell className="w-4 h-4" />
          {announcementCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-[10px] font-bold text-white flex items-center justify-center tabular-nums">
              {announcementCount}
            </span>
          )}
        </button>

        <button
          onClick={onOpenEnrollModal}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white transition-colors shadow-xs"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Enroll Student (Grades 1-6)</span>
          <span className="sm:hidden">Enroll</span>
        </button>
      </div>
    </header>
  );
};
