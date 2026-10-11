import React from 'react';
import {
  Users,
  Award,
  CheckCircle2,
  CreditCard,
  Calendar,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  School,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Student, Teacher, SchoolAnnouncement, LanguageCode } from '../types/school';

interface DashboardOverviewProps {
  students: Student[];
  teachers: Teacher[];
  announcements: SchoolAnnouncement[];
  lang: LanguageCode;
  onNavigate: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  students,
  teachers,
  announcements,
  lang,
  onNavigate,
}) => {
  const t = {
    en: {
      kpiStudents: 'Total Enrolled Students',
      kpiAttendance: 'Daily Attendance Rate',
      kpiGPA: 'Complex-Wide Mean GPA',
      kpiORT: 'ORT Golden Cert Track',
      kpiTuition: 'Term II Tuition Inflow',
      kpiTuitionSub: '94.2% collection rate',
      activePeriodTitle: 'Live Campus Timetable (Period 2 in Progress)',
      announcementsTitle: 'Academic Notices & Ministry Directives',
      quickActionsTitle: 'Priority Administrative Workflows',
      deptOverview: 'Department Academic Standing',
      stemTitle: 'STEM, Robotics & Coding',
      languagesTitle: 'Trilingual Dept (KG · EN · RU)',
      humanitiesTitle: 'History & Humanities',
      viewAllAnnouncements: 'View all bulletins',
      presentToday: 'Present on campus today',
      targetORT: 'Target: ≥ 220 Composite Score',
    },
    ky: {
      kpiStudents: 'Жалпы окуучулардын саны',
      kpiAttendance: 'Бүгүнкү катышуу көрсөткүчү',
      kpiGPA: 'Орточо баалоо баллы (GPA)',
      kpiORT: 'ЖРТ "Алтын сертификат" талапкерлери',
      kpiTuition: 'II чейректин төлөм кирешеси',
      kpiTuitionSub: '94.2% төлөндү',
      activePeriodTitle: 'Учурдагы сабактардын графиги (2-пара жүрүүдө)',
      announcementsTitle: 'Академиялык жарыялар жана буйруктар',
      quickActionsTitle: 'Негизги башкаруу аракеттери',
      deptOverview: 'Кафедралардын жетишкендиктери',
      stemTitle: 'STEM, Робототехника жана IT',
      languagesTitle: 'Үч тилдүү кафедра (КГ · АНГ · РУС)',
      humanitiesTitle: 'Тарых жана гуманитардык багыт',
      viewAllAnnouncements: 'Баардык жарыяларды көрүү',
      presentToday: 'Бүгүн мектепте келгендер',
      targetORT: 'Максат: ≥ 220 балл',
    },
    ru: {
      kpiStudents: 'Всего учащихся в комплексе',
      kpiAttendance: 'Посещаемость за сегодня',
      kpiGPA: 'Средний балл комплекса (GPA)',
      kpiORT: 'Претенденты на "Золотой сертификат" ОРТ',
      kpiTuition: 'Сбор за обучение (II четверть)',
      kpiTuitionSub: '94.2% собрано',
      activePeriodTitle: 'Текущие уроки (Идет 2-я пара)',
      announcementsTitle: 'Академические объявления и приказы',
      quickActionsTitle: 'Быстрые действия администрации',
      deptOverview: 'Успеваемость по кафедрам',
      stemTitle: 'STEM, Робототехника и IT',
      languagesTitle: 'Кафедра языков (КГ · АНГЛ · РУС)',
      humanitiesTitle: 'История и гуманитарные науки',
      viewAllAnnouncements: 'Все объявления',
      presentToday: 'Присутствуют на занятиях',
      targetORT: 'Цель: ≥ 220 баллов ОРТ',
    },
  }[lang];

  // Calculate live stats
  const totalStudents = 1420; // Expanded school campus total
  const avgGpa = (students.reduce((acc, s) => acc + s.gpa, 0) / (students.length || 1)).toFixed(2);
  const goldenCertCount = students.filter((s) => (s.ortMockScore || 0) >= 220).length + 14;

  return (
    <div className="space-y-8">
      {/* Institutional Banner */}
      <div className="bg-stone-900 rounded-xl p-6 sm:p-8 text-white border border-stone-800 relative overflow-hidden shadow-xs">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold tracking-wide uppercase">
            <School className="w-4 h-4" />
            <span>Premier Educational Complex · Bishkek, Kyrgyzstan</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
            Academic Excellence & Trilingual Leadership
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Unified management terminal overseeing Primary, Gymnasium, and Senior Lyceum Olympiad Wings.
            Integrated with Ministry of Education of the Kyrgyz Republic standards and Cambridge Assessment International Education.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-400">
            <span>Faculty: <strong className="text-white">{teachers.length + 112} Instructors</strong></span>
            <span aria-hidden="true">·</span>
            <span>Accredited Labs: <strong className="text-white">14 STEM Suites</strong></span>
            <span aria-hidden="true">·</span>
            <span>Campus: <strong className="text-white">Tokombaev St · South Gate Bishkek</strong></span>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Enrolled Students */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t.kpiStudents}</span>
            <Users className="w-4 h-4 text-stone-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
            {totalStudents.toLocaleString()}
          </div>
          <div className="text-[11px] text-stone-500 mt-2 flex items-center justify-between">
            <span>Lyceum: 480 · Gymnasium: 560</span>
            <span className="text-emerald-700 font-medium">100% Capacity</span>
          </div>
        </div>

        {/* KPI 2: Daily Attendance */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t.kpiAttendance}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
            96.8%
          </div>
          <div className="text-[11px] text-stone-500 mt-2 flex items-center justify-between">
            <span>1,374 {t.presentToday}</span>
            <span className="text-stone-400 font-mono">RFID Gate v3</span>
          </div>
        </div>

        {/* KPI 3: ORT Golden Cert Candidates */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t.kpiORT}</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
            {goldenCertCount} <span className="text-xs font-normal text-stone-400">candidates</span>
          </div>
          <div className="text-[11px] text-stone-500 mt-2 flex items-center justify-between">
            <span>{t.targetORT}</span>
            <span className="text-amber-700 font-medium">Rank #1 Bishkek</span>
          </div>
        </div>

        {/* KPI 4: Tuition Inflow */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t.kpiTuition}</span>
            <CreditCard className="w-4 h-4 text-stone-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
            42,850,000 <span className="text-xs font-normal text-stone-500">сом (KGS)</span>
          </div>
          <div className="text-[11px] text-stone-500 mt-2 flex items-center justify-between">
            <span>{t.kpiTuitionSub}</span>
            <span className="text-emerald-700 font-medium">MBank · Optima</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Timetable & Bulletins */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Live Timetable & Quick Actions (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Period Timetable Snapshot */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <div>
                <h2 className="text-sm font-bold text-stone-900 tracking-tight flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>{t.activePeriodTitle}</span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">Time: 09:25 - 10:10 · Academic Wing Active</p>
              </div>
              <button
                onClick={() => onNavigate('timetable')}
                className="text-xs text-stone-600 hover:text-stone-900 font-semibold flex items-center gap-1"
              >
                <span>Full Timetable</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-stone-900">Grade 11-Olympiad · Olympiad Informatics (C++)</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Instructor: Ulan Sadyrbekov · <span className="font-medium text-stone-700">Lab 204 · Turing Lab</span>
                  </div>
                </div>
                <span className="text-xs font-mono tabular-nums text-stone-500">09:25 - 10:10</span>
              </div>

              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-stone-900">Grade 10-A · Algebra & Analytic Geometry</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Instructor: Dr. Kanatbek Osmonov · <span className="font-medium text-stone-700">Room 301 · Euler Hall</span>
                  </div>
                </div>
                <span className="text-xs font-mono tabular-nums text-stone-500">09:25 - 10:10</span>
              </div>

              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-stone-900">Grade 9-B · History of Kyrgyzstan (Кыргызстан тарыхы)</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Instructor: Bakytbek Isaev · <span className="font-medium text-stone-700">Aitmatov Hall 215</span>
                  </div>
                </div>
                <span className="text-xs font-mono tabular-nums text-stone-500">09:25 - 10:10</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Shortcuts */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
              {t.quickActionsTitle}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => onNavigate('gradebook')}
                className="p-3 rounded-lg border border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-800 text-left transition-colors"
              >
                <BookOpen className="w-4 h-4 text-stone-700 mb-1.5" />
                <div className="text-xs font-bold">Grade Journal</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Post Q2 Marks</div>
              </button>

              <button
                onClick={() => onNavigate('attendance')}
                className="p-3 rounded-lg border border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-800 text-left transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mb-1.5" />
                <div className="text-xs font-bold">Take Attendance</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Daily Registry</div>
              </button>

              <button
                onClick={() => onNavigate('ort')}
                className="p-3 rounded-lg border border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-800 text-left transition-colors"
              >
                <Award className="w-4 h-4 text-amber-500 mb-1.5" />
                <div className="text-xs font-bold">ORT / ЖРТ Scores</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Mock Test #3</div>
              </button>

              <button
                onClick={() => onNavigate('bursar')}
                className="p-3 rounded-lg border border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-800 text-left transition-colors"
              >
                <CreditCard className="w-4 h-4 text-stone-700 mb-1.5" />
                <div className="text-xs font-bold">Bursar Office</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Tuition Invoices</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Campus Bulletins & Department Standing (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Announcements Card */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h2 className="text-sm font-bold text-stone-900 tracking-tight flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t.announcementsTitle}</span>
              </h2>
              <button
                onClick={() => onNavigate('announcements')}
                className="text-xs text-stone-600 hover:text-stone-900 font-semibold"
              >
                {t.viewAllAnnouncements}
              </button>
            </div>

            <div className="space-y-3.5">
              {announcements.slice(0, 3).map((ann) => (
                <div key={ann.id} className="p-3 rounded-lg bg-stone-50/60 border border-stone-200/80 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span className="font-semibold text-stone-700">{ann.category}</span>
                    <span className="font-mono tabular-nums">{ann.date}</span>
                  </div>
                  <h3 className="text-xs font-bold text-stone-900 leading-snug">
                    {lang === 'ky' ? ann.titleKg : ann.title}
                  </h3>
                  <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                    {ann.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Department Standing */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
              {t.deptOverview}
            </h2>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/80">
                <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                  <span>{t.stemTitle}</span>
                  <span className="tabular-nums text-emerald-700">4.92 / 5.0 GPA</span>
                </div>
                <div className="text-[11px] text-stone-500 mt-1">
                  Lead Coach: Dr. Kanatbek Osmonov · 8 Republic Olympiad Medals
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/80">
                <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                  <span>{t.languagesTitle}</span>
                  <span className="tabular-nums text-emerald-700">4.84 / 5.0 GPA</span>
                </div>
                <div className="text-[11px] text-stone-500 mt-1">
                  Kyrgyz, English (Cambridge IGCSE), Russian Academic Tracks
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/80">
                <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                  <span>{t.humanitiesTitle}</span>
                  <span className="tabular-nums text-emerald-700">4.78 / 5.0 GPA</span>
                </div>
                <div className="text-[11px] text-stone-500 mt-1">
                  History of Kyrgyzstan, World History, Social Geography
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
