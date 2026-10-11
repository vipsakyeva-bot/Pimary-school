import React from 'react';
import { TeacherWorkRecord, PrimaryStudent, LanguageCode } from '../types/school';
import { ShieldCheck, TrendingUp, Users, Building, FileSpreadsheet, Award, CheckCircle, AlertCircle } from 'lucide-react';

interface DirectorCabinetProps {
  students: PrimaryStudent[];
  teachers: TeacherWorkRecord[];
  lang: LanguageCode;
  onNavigateTab: (tab: string) => void;
}

export const DirectorCabinet: React.FC<DirectorCabinetProps> = ({
  students,
  teachers,
  lang,
  onNavigateTab,
}) => {
  const t = {
    en: {
      roleTitle: 'Director’s Executive Command Room',
      subtitle: 'Strategic leadership, quality assurance, accreditation, and administrative oversight for Grades 1–6.',
      kpiQuality: 'Quality of Education (СОУ)',
      kpiSuccess: 'Academic Attainment Rate',
      kpiAttendance: 'Overall Primary Attendance',
      kpiStaffing: 'Teacher KPI Index',
      classesOverview: 'Primary & Junior School Sections (Grades 1–6)',
      teacherRanking: 'Faculty KPI & Evaluation Leaderboard',
      colTeacher: 'Teacher & Department',
      colSyllabus: 'Curriculum Completion',
      colPlan: 'Lesson Plan Compliance',
      colObservation: 'Zavuch Audit Score',
      colKpi: 'Rating Status',
      actionDirectives: 'Issue Director Directive',
      actionReport: 'Download Ministry Report (KR-Edu)',
      pedCouncil: 'Convene Pedagogical Council (Педсовет)',
    },
    ky: {
      roleTitle: 'Мектептин Директорунун кабинети',
      subtitle: '1-6-класстардын окуу сапатын, мугалимдерди жана мектептин стратегиялык өнүгүүсүн көзөмөлдөө.',
      kpiQuality: 'Билим сапаты (СОУ)',
      kpiSuccess: 'Жетишүү көрсөткүчү',
      kpiAttendance: 'Башталгыч класстардын катышуусу',
      kpiStaffing: 'Мугалимдердин KPI индекси',
      classesOverview: '1-6-класстардын бөлүмдөрү',
      teacherRanking: 'Мугалимдердин ишмердүүлүгү жана баалоо рейтинги',
      colTeacher: 'Мугалим жана кафедра',
      colSyllabus: 'Программаны аткаруу',
      colPlan: 'Поурочный пландын сапаты',
      colObservation: 'Завучтун текшерүү балы',
      colKpi: 'Рейтинг баасы',
      actionDirectives: 'Директордун буйругун чыгаруу',
      actionReport: 'Министрликтин отчетун жүктөө',
      pedCouncil: 'Педагогикалык кеңешти чакыруу',
    },
    ru: {
      roleTitle: 'Личный кабинет директора комплекса',
      subtitle: 'Стратегическое управление начальной и средней школой (1–6 классы), кадровый контроль и аккредитация.',
      kpiQuality: 'Качество знаний (СОУ)',
      kpiSuccess: 'Абсолютная успеваемость',
      kpiAttendance: 'Посещаемость 1–6 классов',
      kpiStaffing: 'Индекс эффективности учителей',
      classesOverview: 'Классы начального звена (1–6 классы)',
      teacherRanking: 'Рейтинг эффективности преподавательского состава',
      colTeacher: 'Преподаватель и кафедра',
      colSyllabus: 'Выполнение программы',
      colPlan: 'Поурочные планы',
      colObservation: 'Оценка завуча',
      colKpi: 'Статус KPI',
      actionDirectives: 'Издать приказ по комплексу',
      actionReport: 'Отчет для МОиН КР (Excel)',
      pedCouncil: 'Созвать Педагогический совет',
    },
  }[lang];

  return (
    <div className="space-y-6">
      {/* Executive Header Banner */}
      <div className="bg-stone-900 rounded-xl p-6 text-white border border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Premier Educational Complex · Director Cabinet</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {t.roleTitle}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <button
            onClick={() => alert('Director Directive #14/26 registered in Electronic Chancellery of KR.')}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 transition-colors shadow-xs"
          >
            {t.actionDirectives}
          </button>
          <button
            onClick={() => onNavigateTab('teachers')}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors border border-stone-700"
          >
            {t.pedCouncil}
          </button>
        </div>
      </div>

      {/* Director KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{t.kpiQuality}</div>
          <div className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums mt-1">84.6%</div>
          <div className="text-[10px] text-emerald-700 font-medium mt-1">▲ +3.2% vs. 1st Quarter Target</div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{t.kpiSuccess}</div>
          <div className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums mt-1">99.4%</div>
          <div className="text-[10px] text-stone-500 mt-1">No failing students (2-grade)</div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{t.kpiAttendance}</div>
          <div className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums mt-1">97.8%</div>
          <div className="text-[10px] text-stone-500 mt-1">348 primary students active</div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{t.kpiStaffing}</div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-700 tabular-nums mt-1">96.2 / 100</div>
          <div className="text-[10px] text-stone-500 mt-1">All teachers certified in KR</div>
        </div>
      </div>

      {/* Classes 1-6 Matrix Grid */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
          <h3 className="text-sm font-bold text-stone-900 tracking-tight">{t.classesOverview}</h3>
          <span className="text-xs text-stone-500 font-mono">12 Classes · 348 Students</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { grade: '1-A', count: 28, teacher: 'Nadezhda Ivanova', avg: 4.95 },
            { grade: '1-B', count: 27, teacher: 'Nadezhda Ivanova', avg: 4.88 },
            { grade: '2-A', count: 29, teacher: 'Cholpon Asanova', avg: 4.82 },
            { grade: '2-B', count: 28, teacher: 'Cholpon Asanova', avg: 4.76 },
            { grade: '3-A', count: 30, teacher: 'Aizada Beishenalieva', avg: 4.90 },
            { grade: '3-B', count: 29, teacher: 'Aizada Beishenalieva', avg: 4.84 },
            { grade: '4-A', count: 30, teacher: 'Gulzat Omurova', avg: 4.86 },
            { grade: '4-B', count: 29, teacher: 'Gulzat Omurova', avg: 4.80 },
            { grade: '5-A', count: 30, teacher: 'Marat Sultanov', avg: 4.78 },
            { grade: '5-B', count: 28, teacher: 'Marat Sultanov', avg: 4.74 },
            { grade: '6-A', count: 30, teacher: 'Samat Dzhumabaev', avg: 4.92 },
            { grade: '6-B', count: 29, teacher: 'Samat Dzhumabaev', avg: 4.82 },
          ].map((c) => (
            <div key={c.grade} className="p-3 rounded-lg border border-stone-200 bg-stone-50/50 hover:bg-stone-100 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-stone-900">{c.grade}</span>
                <span className="text-[11px] font-mono font-semibold text-emerald-800">{c.avg} GPA</span>
              </div>
              <div className="text-[10px] text-stone-500 mt-1 truncate">{c.teacher}</div>
              <div className="text-[10px] text-stone-400 mt-0.5">{c.count} students</div>
            </div>
          ))}
        </div>
      </div>

      {/* Teacher Monitoring & Evaluation Ranking */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-6 pb-3 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-stone-900 tracking-tight">{t.teacherRanking}</h3>
            <p className="text-xs text-stone-500 mt-0.5">Audited quarterly by Academic Vice Principal (Завуч по УВР).</p>
          </div>
          <button
            onClick={() => onNavigateTab('teachers')}
            className="text-xs text-stone-700 hover:text-stone-900 font-semibold"
          >
            Inspect Full Profiles →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">{t.colTeacher}</th>
                <th className="py-3 px-4 text-right">{t.colSyllabus}</th>
                <th className="py-3 px-4 text-right">{t.colPlan}</th>
                <th className="py-3 px-4 text-right">{t.colObservation}</th>
                <th className="py-3 px-4 pr-6 text-right">{t.colKpi}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {teachers.map((tch) => (
                <tr key={tch.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-stone-900">{tch.teacherName}</div>
                    <div className="text-[10px] text-stone-500">{tch.department} · {tch.assignedClasses.join(', ')}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-stone-800">
                    {tch.syllabusCompletionRate}%
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-stone-800">
                    {tch.lessonPlanCompliance}%
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums font-bold text-amber-700">
                    {tch.observationScore} / 100
                  </td>
                  <td className="py-3.5 px-4 text-right pr-6">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                      tch.kpiRating === 'Exemplary'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-sky-100 text-sky-800'
                    }`}>
                      {tch.kpiRating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
