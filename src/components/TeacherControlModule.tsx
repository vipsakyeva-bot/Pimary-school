import React, { useState } from 'react';
import { TeacherWorkRecord, LanguageCode } from '../types/school';
import { TEACHER_WORK_RECORDS } from '../data/grades1to6Data';
import { Award, CheckCircle2, TrendingUp, Search, UserCheck, ShieldAlert, Sparkles } from 'lucide-react';

interface TeacherControlModuleProps {
  teachers: TeacherWorkRecord[];
  lang: LanguageCode;
}

export const TeacherControlModule: React.FC<TeacherControlModuleProps> = ({
  teachers,
  lang,
}) => {
  const [search, setSearch] = useState('');
  const [filterRating, setFilterRating] = useState<string>('All');

  const t = {
    en: {
      title: 'Teacher Performance Control & Progress Monitoring',
      subtitle: 'Systematic pedagogical oversight tracking syllabus completion, lesson plan quality, and student outcome indices.',
      searchPlaceholder: 'Search teacher by name or department...',
      avgSyllabus: 'Syllabus Fulfillment',
      avgPlanCompliance: 'Plan Compliance',
      avgObservation: 'Mean Observation Score',
      totalExemplary: 'Exemplary Rating Teachers',
      colTeacher: 'Educator & Dept',
      colClasses: 'Classes 1–6',
      colSyllabus: 'Syllabus %',
      colPlans: 'Lesson Plans',
      colStudentGPA: 'Student Mean GPA',
      colKnowledgeQuality: 'Quality Index (СОУ)',
      colAuditScore: 'Inspection Score',
      colKpi: 'KPI Tier',
      notesTitle: 'Vice Principal Observation Commentary',
    },
    ky: {
      title: 'Мугалимдердин ишмердүүлүгүн жана өсүшүн көзөмөлдөө',
      subtitle: 'Окуу программасынын аткарылышы, поурочный пландардын сапаты жана окуучулардын билим сапатынын мониторинги.',
      searchPlaceholder: 'Мугалимди аты же кафедрасы боюнча издөө...',
      avgSyllabus: 'Программаны аткаруу',
      avgPlanCompliance: 'Пландардын бекитилиши',
      avgObservation: 'Орточо баалоо балы',
      totalExemplary: 'Мыкты мугалимдердин саны',
      colTeacher: 'Мугалим жана кафедра',
      colClasses: '1-6-класстар',
      colSyllabus: 'Программа %',
      colPlans: 'Поурочный план',
      colStudentGPA: 'Окуучулардын GPA',
      colKnowledgeQuality: 'Билим сапаты (СОУ)',
      colAuditScore: 'Текшерүү балы',
      colKpi: 'KPI баасы',
      notesTitle: 'Завучтун сабак боюнча корутундусу',
    },
    ru: {
      title: 'Контроль работы учителей и отслеживание их прогресса',
      subtitle: 'Систематический мониторинг выполнения учебных программ, поурочных планов и динамики обученности учащихся.',
      searchPlaceholder: 'Поиск преподавателя по ФИО или кафедре...',
      avgSyllabus: 'Выполнение программы',
      avgPlanCompliance: 'Сдача поурочных планов',
      avgObservation: 'Средний балл посещений',
      totalExemplary: 'Высшая категория KPI',
      colTeacher: 'Преподаватель и кафедра',
      colClasses: '1–6 классы',
      colSyllabus: 'Программа %',
      colPlans: 'Поурочные планы',
      colStudentGPA: 'Средний балл детей',
      colKnowledgeQuality: 'Качество знаний (СОУ)',
      colAuditScore: 'Оценка завуча',
      colKpi: 'Статус KPI',
      notesTitle: 'Аналитическая записка завуча по итогам посещения',
    },
  }[lang];

  const filtered = teachers.filter((tch) => {
    const matchesSearch =
      tch.teacherName.toLowerCase().includes(search.toLowerCase()) ||
      tch.department.toLowerCase().includes(search.toLowerCase());
    const matchesRating = filterRating === 'All' || tch.kpiRating === filterRating;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="space-y-6">
      {/* Top Title Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
          <UserCheck className="w-4 h-4 text-amber-600" />
          <span>Faculty Quality Assurance Framework</span>
        </div>
        <h2 className="text-xl font-bold text-stone-900 tracking-tight">{t.title}</h2>
        <p className="text-xs text-stone-500 mt-0.5">{t.subtitle}</p>
      </div>

      {/* Aggregate Performance KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{t.avgSyllabus}</div>
          <div className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums mt-1">96.4%</div>
          <div className="text-[10px] text-emerald-700 font-medium mt-1">Compliant with State Standard</div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{t.avgPlanCompliance}</div>
          <div className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums mt-1">97.3%</div>
          <div className="text-[10px] text-stone-500 mt-1">Verified weekly by Завуч</div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{t.avgObservation}</div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-700 tabular-nums mt-1">95.0 / 100</div>
          <div className="text-[10px] text-stone-500 mt-1">Lesson inspections</div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{t.totalExemplary}</div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-700 tabular-nums mt-1">
            {teachers.filter((x) => x.kpiRating === 'Exemplary').length} / {teachers.length}
          </div>
          <div className="text-[10px] text-stone-500 mt-1">Eligible for bonus stipend</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'Exemplary', 'Proficient'].map((r) => (
            <button
              key={r}
              onClick={() => setFilterRating(r)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap border ${
                filterRating === r
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Teachers Detail Dossiers */}
      <div className="space-y-4">
        {filtered.map((tch) => (
          <div
            key={tch.id}
            className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-stone-900">{tch.teacherName}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    tch.kpiRating === 'Exemplary' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                  }`}>
                    {tch.kpiRating}
                  </span>
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  {tch.department} · Assigned Classes: <span className="font-semibold text-stone-700">{tch.assignedClasses.join(', ')}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] text-stone-400 font-semibold uppercase">Inspection Rating</div>
                <div className="text-xl font-bold font-mono text-amber-700 tabular-nums">
                  {tch.observationScore} <span className="text-xs font-normal text-stone-400">/ 100</span>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/80">
                <div className="text-[11px] text-stone-500">Syllabus Completion</div>
                <div className="text-base font-bold font-mono text-stone-900 tabular-nums mt-0.5">
                  {tch.syllabusCompletionRate}%
                </div>
                <div className="w-full bg-stone-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-stone-900 h-full rounded-full"
                    style={{ width: `${tch.syllabusCompletionRate}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/80">
                <div className="text-[11px] text-stone-500">Lesson Plan Approval</div>
                <div className="text-base font-bold font-mono text-stone-900 tabular-nums mt-0.5">
                  {tch.lessonPlanCompliance}%
                </div>
                <div className="w-full bg-stone-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${tch.lessonPlanCompliance}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/80">
                <div className="text-[11px] text-stone-500">Student Mean GPA</div>
                <div className="text-base font-bold font-mono text-stone-900 tabular-nums mt-0.5">
                  {tch.averageStudentPerformance} / 5.0
                </div>
                <div className="text-[10px] text-emerald-700 mt-1 font-medium">99% Retention</div>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/80">
                <div className="text-[11px] text-stone-500">Quality Index (СОУ)</div>
                <div className="text-base font-bold font-mono text-stone-900 tabular-nums mt-0.5">
                  {tch.qualityOfKnowledgePercent}%
                </div>
                <div className="text-[10px] text-stone-500 mt-1">4 & 5 Marks share</div>
              </div>
            </div>

            {/* Last Inspection Notes from Завуч */}
            <div className="p-3.5 rounded-lg bg-stone-50/70 border border-stone-200 text-xs text-stone-700 space-y-1">
              <div className="font-semibold text-stone-900 flex items-center justify-between">
                <span>{t.notesTitle} (Last Inspection: {tch.lastObservedDate})</span>
                <span className="text-[11px] text-emerald-800 font-medium">✓ Verified by Vice Principal</span>
              </div>
              <p className="leading-relaxed text-stone-600">{tch.observationNotes}</p>
            </div>

            {/* Honors and Professional Training */}
            {tch.awards.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-stone-400 font-semibold">Honors:</span>
                {tch.awards.map((aw, aIdx) => (
                  <span
                    key={aIdx}
                    className="px-2.5 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-medium"
                  >
                    ★ {aw}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
