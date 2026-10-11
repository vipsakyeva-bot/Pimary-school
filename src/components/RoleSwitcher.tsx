import React from 'react';
import { UserRole, LanguageCode } from '../types/school';
import { ShieldAlert, BookOpenCheck, GraduationCap, Backpack, HeartHandshake } from 'lucide-react';

interface RoleSwitcherProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  lang: LanguageCode;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({
  currentRole,
  onSelectRole,
  lang,
}) => {
  const rolesConfig: Array<{
    role: UserRole;
    icon: React.ComponentType<{ className?: string }>;
    title: { en: string; ky: string; ru: string };
    desc: { en: string; ky: string; ru: string };
  }> = [
    {
      role: 'director',
      icon: ShieldAlert,
      title: { en: 'Principal / Director', ky: 'Мектептин Директору', ru: 'Директор комплекса' },
      desc: { en: 'School KPI, staff, budget', ky: 'Жалпы көзөмөл жана каржы', ru: 'Управление, кадры, бюджет' },
    },
    {
      role: 'vice_principal',
      icon: BookOpenCheck,
      title: { en: 'Vice Principal (Завуч)', ky: 'Окуу бөлүмүнүн башчысы (Завуч)', ru: 'Завуч по УВР' },
      desc: { en: 'Lesson plans, teacher audit', ky: 'Поурочные пландар жана сапат', ru: 'Контроль учителей и программ' },
    },
    {
      role: 'teacher',
      icon: GraduationCap,
      title: { en: 'Primary Teacher', ky: 'Башталгыч класс мугалими', ru: 'Учитель начальных классов' },
      desc: { en: 'Gradebook, homework, lessons', ky: 'Журнал, үй тапшырмалар', ru: 'Журнал, уроки, задания' },
    },
    {
      role: 'student',
      icon: Backpack,
      title: { en: 'Student (3-A Grade)', ky: 'Окуучу (3-А класс)', ru: 'Ученик (3-А класс)' },
      desc: { en: 'Diary, schedule, tasks', ky: 'Күндөлүк, сабактар, упайлар', ru: 'Электронный дневник' },
    },
    {
      role: 'parent',
      icon: HeartHandshake,
      title: { en: 'Parent Portal', ky: 'Ата-энелер кабинети', ru: 'Кабинет родителя' },
      desc: { en: 'Child marks & attendance', ky: 'Баланын өсүшү жана катышуусу', ru: 'Успеваемость и контроль' },
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 mb-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
            {lang === 'ky' ? 'Ролдор боюнча жеке кабинеттер' : lang === 'ru' ? 'Личные кабинеты по ролям' : 'Role-Based Personal Cabinets'}
          </span>
          <h2 className="text-sm font-bold text-stone-900">
            {lang === 'ky'
              ? 'Башкаруучу, мугалим, окуучу жана ата-эне профилин тандаңыз'
              : lang === 'ru'
              ? 'Переключение профиля: Директор, Завуч, Учитель, Ученик, Родитель'
              : 'Switch Persona: Director, Vice Principal, Teacher, Student, Parent'}
          </h2>
        </div>
        <div className="text-xs text-stone-500 font-medium">
          {lang === 'ky' ? 'Активдүү рол:' : lang === 'ru' ? 'Текущий кабинет:' : 'Active Persona:'}{' '}
          <span className="text-stone-900 font-bold capitalize">
            {currentRole.replace('_', ' ')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {rolesConfig.map((item) => {
          const Icon = item.icon;
          const isActive = currentRole === item.role;
          return (
            <button
              key={item.role}
              onClick={() => onSelectRole(item.role)}
              className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-stone-900 text-white border-stone-900 shadow-xs ring-2 ring-stone-900/20'
                  : 'bg-stone-50/70 border-stone-200 text-stone-800 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </div>
              <div>
                <div className="text-xs font-bold leading-snug">
                  {item.title[lang]}
                </div>
                <div className={`text-[10px] mt-0.5 leading-tight truncate ${isActive ? 'text-stone-300' : 'text-stone-500'}`}>
                  {item.desc[lang]}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
