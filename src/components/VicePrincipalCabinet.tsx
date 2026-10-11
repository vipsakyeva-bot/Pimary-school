import React, { useState } from 'react';
import { TeacherWorkRecord, InspectionObservation, LanguageCode } from '../types/school';
import { INSPECTION_OBSERVATIONS } from '../data/grades1to6Data';
import { BookOpenCheck, CheckCircle2, ClipboardList, Plus, FileText, Check, Award, AlertTriangle } from 'lucide-react';

interface VicePrincipalCabinetProps {
  teachers: TeacherWorkRecord[];
  lang: LanguageCode;
}

export const VicePrincipalCabinet: React.FC<VicePrincipalCabinetProps> = ({
  teachers,
  lang,
}) => {
  const [observations, setObservations] = useState<InspectionObservation[]>(INSPECTION_OBSERVATIONS);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for new inspection
  const [teacherName, setTeacherName] = useState(teachers[0]?.teacherName || 'Aizada Beishenalieva');
  const [classGrade, setClassGrade] = useState<'3-A'>('3-A');
  const [subject, setSubject] = useState('Primary Mathematics');
  const [topic, setTopic] = useState('');
  const [methodScore, setMethodScore] = useState(25);
  const [engageScore, setEngageScore] = useState(24);
  const [standardScore, setStandardScore] = useState(25);
  const [digitalScore, setDigitalScore] = useState(23);
  const [recommendations, setRecommendations] = useState('');

  const t = {
    en: {
      roleTitle: 'Vice Principal for Academics (Завуч по УВР) Portal',
      subtitle: 'Pedagogical inspection, syllabus adherence, lesson plan approvals, and teaching quality metrics.',
      logObservationBtn: 'Conduct Lesson Observation',
      cardAudits: 'Lesson Plan Compliance',
      cardObservations: 'Inspections Conducted',
      cardJournalAudit: 'Journal Timeliness Audit',
      cardCurriculum: 'Curriculum Pacing',
      tableTitle: 'Recent Lesson Observations & Pedagogical Reviews',
      colDate: 'Inspection Date',
      colTeacher: 'Observed Teacher',
      colLesson: 'Subject & Topic',
      colScore: 'Total Score / 100',
      colStatus: 'Evaluation Status',
      colRecommendations: 'Methodological Recommendations',
      modalTitle: 'Register New Pedagogical Lesson Inspection',
      modalSubtitle: 'Structured observation protocol based on KR Ministry of Education teacher standards.',
      saveObservation: 'Authorize & Save Observation',
    },
    ky: {
      roleTitle: 'Окуу бөлүмүнүн башчысынын (Завуч) кабинети',
      subtitle: 'Мугалимдердин поурочный пландарын бекитүү, сабактарды текшерүү жана билим сапатын көзөмөлдөө.',
      logObservationBtn: 'Сабакка катышуу протоколу',
      cardAudits: 'Поурочный пландардын бекитилиши',
      cardObservations: 'Текшерилген сабактар',
      cardJournalAudit: 'Журналды толтуруу тартиби',
      cardCurriculum: 'Программаны аткаруу',
      tableTitle: 'Акыркы сабактарга катышуу жана талдоо протоколдору',
      colDate: 'Күнү',
      colTeacher: 'Мугалим',
      colLesson: 'Сабак жана тема',
      colScore: 'Жалпы балл / 100',
      colStatus: 'Абалы',
      colRecommendations: 'Методикалык сунуштар',
      modalTitle: 'Сабакка катышуу протоколун түзүү',
      modalSubtitle: 'КР Билим берүү министрлигинин стандарты боюнча баалоо.',
      saveObservation: 'Протоколду сактоо жана бекитүү',
    },
    ru: {
      roleTitle: 'Личный кабинет Завуча по учебно-воспитательной работе (УВР)',
      subtitle: 'Экспертиза поурочных планов, мониторинг выполнения программ, срезы знаний и посещение уроков.',
      logObservationBtn: 'Провести посещение урока',
      cardAudits: 'Сдача поурочных планов',
      cardObservations: 'Посещено уроков',
      cardJournalAudit: 'Своевременность журнала',
      cardCurriculum: 'Выполнение программы',
      tableTitle: 'Журнал посещения уроков и педагогического анализа',
      colDate: 'Дата посещения',
      colTeacher: 'Преподаватель',
      colLesson: 'Предмет и тема урока',
      colScore: 'Оценка (из 100)',
      colStatus: 'Статус завуча',
      colRecommendations: 'Методические рекомендации',
      modalTitle: 'Карта анализа и посещения урока',
      modalSubtitle: 'Стандартизированная карта анализа в соответствии с требованиями МОиН Кыргызской Республики.',
      saveObservation: 'Утвердить протокол анализа',
    },
  }[lang];

  const handleCreateObservation = (e: React.FormEvent) => {
    e.preventDefault();
    const totalScore = methodScore + engageScore + standardScore + digitalScore;
    const newObs: InspectionObservation = {
      id: `OBS-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      teacherName,
      classGrade,
      subject,
      topic: topic.trim() || 'Scheduled syllabus topic',
      observedBy: 'Vice Principal for Academics (Завуч)',
      score: totalScore,
      criteria: {
        pedagogicalMethods: methodScore,
        studentEngagement: engageScore,
        curriculumStandards: standardScore,
        digitalToolsUsage: digitalScore,
      },
      recommendations: recommendations.trim() || 'Classroom pacing aligns with excellence.',
      status: totalScore >= 80 ? 'Approved' : 'Action Plan Required',
    };

    setObservations((prev) => [newObs, ...prev]);
    setShowAddModal(false);
    setTopic('');
    setRecommendations('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            <BookOpenCheck className="w-4 h-4 text-amber-600" />
            <span>Academic Supervision & Quality Control</span>
          </div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">{t.roleTitle}</h2>
          <p className="text-xs text-stone-500 mt-0.5">{t.subtitle}</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white transition-colors shrink-0 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{t.logObservationBtn}</span>
        </button>
      </div>

      {/* Vice Principal KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{t.cardAudits}</div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-700 tabular-nums mt-1">98.2%</div>
          <div className="text-[10px] text-stone-500 mt-1">All weekly plans signed & verified</div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{t.cardObservations}</div>
          <div className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums mt-1">{observations.length + 24}</div>
          <div className="text-[10px] text-stone-500 mt-1">Average rating: 95.4 / 100</div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{t.cardJournalAudit}</div>
          <div className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums mt-1">100%</div>
          <div className="text-[10px] text-emerald-700 font-medium mt-1">Zero unposted grades &gt;24 hrs</div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{t.cardCurriculum}</div>
          <div className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums mt-1">96.8%</div>
          <div className="text-[10px] text-stone-500 mt-1">On schedule with KR state standard</div>
        </div>
      </div>

      {/* Observations Ledger Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-6 pb-3 border-b border-stone-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-stone-900 tracking-tight">{t.tableTitle}</h3>
          <span className="text-xs text-stone-500 font-mono">{observations.length} Registered Reviews</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">{t.colDate}</th>
                <th className="py-3 px-4">{t.colTeacher}</th>
                <th className="py-3 px-4">{t.colLesson}</th>
                <th className="py-3 px-4 text-right">{t.colScore}</th>
                <th className="py-3 px-4">{t.colStatus}</th>
                <th className="py-3 px-4 pr-6">{t.colRecommendations}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {observations.map((obs) => (
                <tr key={obs.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono tabular-nums text-stone-600">
                    {obs.date}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-stone-900">
                    {obs.teacherName}
                    <div className="text-[10px] text-stone-500 font-normal">{obs.classGrade}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-stone-900">{obs.subject}</div>
                    <div className="text-[11px] text-stone-500 italic">Topic: {obs.topic}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums font-bold text-amber-700">
                    {obs.score}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                      obs.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{obs.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 pr-6 text-stone-600 text-xs max-w-xs leading-relaxed">
                    {obs.recommendations}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Conduct New Lesson Inspection */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-xl border border-stone-200 shadow-xl max-w-xl w-full p-6 space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="text-base font-bold text-stone-900">{t.modalTitle}</h3>
              <p className="text-xs text-stone-500 mt-0.5">{t.modalSubtitle}</p>
            </div>

            <form onSubmit={handleCreateObservation} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Teacher</label>
                  <select
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-stone-50"
                  >
                    {teachers.map((tch) => (
                      <option key={tch.id} value={tch.teacherName}>
                        {tch.teacherName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Class Section</label>
                  <select
                    value={classGrade}
                    onChange={(e) => setClassGrade(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-stone-50"
                  >
                    {['1-A', '2-A', '3-A', '4-A', '5-A', '6-A'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Subject & Topic</label>
                <input
                  type="text"
                  placeholder="e.g. Mental Arithmetic: Properties of Multiplication"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
                  required
                />
              </div>

              {/* Scoring Sliders across 4 KR pedagogical dimensions */}
              <div className="space-y-3 p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs">
                <div className="font-semibold text-stone-900">Ministry Rubric Criteria (Max 25 pts each):</div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>1. Pedagogical Methodology:</span>
                    <span className="font-mono font-bold tabular-nums">{methodScore} / 25</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="25"
                    value={methodScore}
                    onChange={(e) => setMethodScore(Number(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 rounded appearance-none accent-stone-900"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>2. Student Active Engagement:</span>
                    <span className="font-mono font-bold tabular-nums">{engageScore} / 25</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="25"
                    value={engageScore}
                    onChange={(e) => setEngageScore(Number(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 rounded appearance-none accent-stone-900"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>3. State Curriculum Standards:</span>
                    <span className="font-mono font-bold tabular-nums">{standardScore} / 25</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="25"
                    value={standardScore}
                    onChange={(e) => setStandardScore(Number(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 rounded appearance-none accent-stone-900"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>4. Use of Digital / Interactive Tools:</span>
                    <span className="font-mono font-bold tabular-nums">{digitalScore} / 25</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="25"
                    value={digitalScore}
                    onChange={(e) => setDigitalScore(Number(e.target.value))}
                    className="w-full h-1.5 bg-stone-200 rounded appearance-none accent-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Methodological Feedback</label>
                <textarea
                  rows={2}
                  placeholder="Enter positive highlights and areas of growth..."
                  value={recommendations}
                  onChange={(e) => setRecommendations(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white"
                >
                  {t.saveObservation}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
