import React from 'react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  CheckCircle2,
  Award,
  GraduationCap,
  CreditCard,
  Bell,
  School,
  Building2,
  ChevronRight,
  UserCheck,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { LanguageCode } from '../types/school';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  lang: LanguageCode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  lang,
}) => {
  const t = {
    en: {
      crestTitle: 'Premier Educational Complex',
      crestSubtitle: 'Bishkek · Kyrgyzstan',
      academicsGroup: 'GRADES 1–6 & ACADEMICS',
      dashboard: 'Executive Dashboard',
      roleCabinets: 'Role Cabinets (5 Personas)',
      students: 'Students (Grades 1–6)',
      timetable: 'Electronic Timetable',
      gradebook: 'Electronic Gradebook',
      attendance: 'Attendance Register',
      supervisionGroup: 'QUALITY & PROGRESS MONITORING',
      teacherControl: 'Teacher Work Control & KPIs',
      studentProgress: 'Student Individual Progress',
      adminGroup: 'ADMINISTRATION',
      bursar: 'Bursar & Tuition (KGS)',
      announcements: 'Campus Notices',
      statusOnline: 'Grades 1–6 Active',
      ministryAffiliation: 'Ministry of Ed & Science KR',
    },
    ky: {
      crestTitle: 'Премьер Билим Комплекси',
      crestSubtitle: 'Бишкек · Кыргызстан',
      academicsGroup: '1-6-КЛАССТАР ЖАНА ОКУУ',
      dashboard: 'Башкы панель',
      roleCabinets: 'Жеке кабинеттер (5 рол)',
      students: '1-6-класстардын окуучулары',
      timetable: 'Сабактардын расписаниеси',
      gradebook: 'Электрондук журнал',
      attendance: 'Катышуу журналы',
      supervisionGroup: 'КӨЗӨМӨЛ ЖАНА ӨСҮШ',
      teacherControl: 'Мугалимдерди көзөмөлдөө',
      studentProgress: 'Окуучулардын жеке өсүшү',
      adminGroup: 'БАШКАРУУ ЖАНА КАРЖЫ',
      bursar: 'Төлөмдөр жана каржы (сом)',
      announcements: 'Мектептин жарыялары',
      statusOnline: '1-6-класстар активдүү',
      ministryAffiliation: 'КР Билим берүү министрлиги',
    },
    ru: {
      crestTitle: 'Премьер Комплекс',
      crestSubtitle: 'Бишкек · Кыргызстан',
      academicsGroup: '1–6 КЛАССЫ И ОБУЧЕНИЕ',
      dashboard: 'Главная панель',
      roleCabinets: 'Личные кабинеты (5 ролей)',
      students: 'Учащиеся 1–6 классов',
      timetable: 'Электронное расписание',
      gradebook: 'Электронный журнал',
      attendance: 'Учет посещаемости',
      supervisionGroup: 'КОНТРОЛЬ И МОНИТОРИНГ',
      teacherControl: 'Контроль работы учителей',
      studentProgress: 'Мониторинг успеваемости',
      adminGroup: 'АДМИНИСТРАЦИЯ И ФИНАНСЫ',
      bursar: 'Бухгалтерия и оплата (сом)',
      announcements: 'Объявления комплекса',
      statusOnline: '1–6 классы активны',
      ministryAffiliation: 'МОиН Кыргызской Республики',
    },
  }[lang];

  const navItems = [
    {
      group: t.academicsGroup,
      items: [
        { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
        { id: 'cabinets', label: t.roleCabinets, icon: ShieldCheck },
        { id: 'students', label: t.students, icon: Users },
        { id: 'timetable', label: t.timetable, icon: Calendar },
        { id: 'gradebook', label: t.gradebook, icon: BookOpen },
        { id: 'attendance', label: t.attendance, icon: CheckCircle2 },
      ],
    },
    {
      group: t.supervisionGroup,
      items: [
        { id: 'teacher_control', label: t.teacherControl, icon: UserCheck },
        { id: 'student_progress', label: t.studentProgress, icon: TrendingUp },
      ],
    },
    {
      group: t.adminGroup,
      items: [
        { id: 'bursar', label: t.bursar, icon: CreditCard },
        { id: 'announcements', label: t.announcements, icon: Bell },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-stone-900 border-r border-stone-800 text-stone-300 flex flex-col justify-between shrink-0 h-screen sticky top-0 overflow-y-auto z-20">
      <div>
        {/* Brand Lockup */}
        <div className="p-5 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <School className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <h1 className="text-sm font-bold text-white tracking-tight leading-tight truncate">
                {t.crestTitle}
              </h1>
              <div className="text-[11px] text-stone-400 truncate mt-0.5 font-medium">
                {t.crestSubtitle}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="p-3 space-y-6">
          {navItems.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
                {section.group}
              </div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors text-left ${
                      isActive
                        ? 'bg-amber-400 text-stone-950 font-semibold shadow-xs'
                        : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-80" />}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Institutional Credentials Footer */}
      <div className="p-4 border-t border-stone-800 text-[11px] text-stone-400 bg-stone-950/40">
        <div className="flex items-center gap-2 text-stone-300 font-medium mb-1">
          <Building2 className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.ministryAffiliation}</span>
        </div>
        <div className="text-[10px] text-stone-400 leading-tight">
          Licensed Primary & Middle Complex · Bishkek
        </div>
      </div>
    </aside>
  );
};
