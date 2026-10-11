import React, { useState } from 'react';
import { Student, LanguageCode } from '../types/school';
import { Search, UserPlus, Phone, Mail, Award, X, Building, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface StudentsManagementProps {
  students: Student[];
  lang: LanguageCode;
  onOpenEnrollModal: () => void;
  onUpdateStudent: (student: Student) => void;
}

export const StudentsManagement: React.FC<StudentsManagementProps> = ({
  students,
  lang,
  onOpenEnrollModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedTrack, setSelectedTrack] = useState('All');
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);

  const t = {
    en: {
      title: 'Students Register & Academic Directory',
      subtitle: 'Complete enrolled student roster across Lyceum, Gymnasium, and Cambridge tracks.',
      enrollBtn: 'Enroll New Student',
      searchPlaceholder: 'Search by student name, ID (STU-...), parent name, or phone...',
      colId: 'Student ID',
      colName: 'Full Name',
      colGrade: 'Grade / Class',
      colTrack: 'Academic Track',
      colGPA: 'Current GPA',
      colAttendance: 'Attendance',
      colORT: 'ORT Mock',
      colTuition: 'Tuition Status',
      colActions: 'Actions',
      viewProfile: 'View Dossier',
      profileTitle: 'Student Academic Dossier',
      parentInfo: 'Parent / Guardian Contacts',
      scholarship: 'Scholarship Grant',
      dormitory: 'Boarding / Dormitory',
      yes: 'Yes (On-campus resident)',
      no: 'No (Day scholar)',
      address: 'Residential Address in Bishkek',
      enrolled: 'Enrollment Date',
      close: 'Close Dossier',
    },
    ky: {
      title: 'Окуучулардын реестри жана өздүк көктөмөлөрү',
      subtitle: 'Лицей, гимназия жана Кембридж багыттары боюнча окуучулардын толук базасы.',
      enrollBtn: 'Жаңы окуучуну кабыл алуу',
      searchPlaceholder: 'Аты-жөнү, ID номери, ата-энеси же телефону боюнча издөө...',
      colId: 'Окуучу ID',
      colName: 'Аты-жөнү',
      colGrade: 'Классы',
      colTrack: 'Окуу багыты',
      colGPA: 'GPA көрсөткүчү',
      colAttendance: 'Катышуусу',
      colORT: 'ЖРТ балы',
      colTuition: 'Төлөм абалы',
      colActions: 'Аракеттер',
      viewProfile: 'Өздүк көктөмө',
      profileTitle: 'Окуучунун академиялык өздүк көктөмөсү',
      parentInfo: 'Ата-энесинин байланыштары',
      scholarship: 'Стипендия / Жеңилдик',
      dormitory: 'Жатакана (Интернат)',
      yes: 'Ооба (Жатаканада жашайт)',
      no: 'Жок (Күн сайын келет)',
      address: 'Бишкек шаарындагы дареги',
      enrolled: 'Кабыл алынган күнү',
      close: 'Жабуу',
    },
    ru: {
      title: 'Реестр учащихся и академические досье',
      subtitle: 'Полный контингент учащихся лицея, гимназии и международного отделения.',
      enrollBtn: 'Зачислить учащегося',
      searchPlaceholder: 'Поиск по ФИО, ID номеру, родителям или телефону...',
      colId: 'ID учащегося',
      colName: 'ФИО учащегося',
      colGrade: 'Класс',
      colTrack: 'Учебное направление',
      colGPA: 'Средний балл (GPA)',
      colAttendance: 'Посещаемость',
      colORT: 'Пробный ОРТ',
      colTuition: 'Оплата за обучение',
      colActions: 'Действия',
      viewProfile: 'Досье',
      profileTitle: 'Академическое досье учащегося',
      parentInfo: 'Контакты родителей / опекунов',
      scholarship: 'Стипендия / Скидка',
      dormitory: 'Пансион / Общежитие',
      yes: 'Да (Проживает в пансионе)',
      no: 'Нет (Дневное обучение)',
      address: 'Адрес проживания в Бишкеке',
      enrolled: 'Дата зачисления',
      close: 'Закрыть',
    },
  }[lang];

  // Filtering
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.fullNameKg && s.fullNameKg.toLowerCase().includes(searchQuery.toLowerCase())) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.parentPhone.includes(searchQuery);

    const matchesGrade = selectedGrade === 'All' || s.grade === selectedGrade;
    const matchesTrack = selectedTrack === 'All' || s.track === selectedTrack;

    return matchesSearch && matchesGrade && matchesTrack;
  });

  const gradesList = ['All', '11-Olympiad', '11-A', '10-A', '9-B'];
  const tracksList = ['All', 'National Lyceum STEM', 'Cambridge IGCSE / A-Levels', 'Trilingual Excellence (EN-KG-RU)'];

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-stone-900 tracking-tight">{t.title}</h2>
          <p className="text-xs text-stone-500 mt-0.5">{t.subtitle}</p>
        </div>

        <button
          onClick={onOpenEnrollModal}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white transition-colors shrink-0 shadow-xs"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>{t.enrollBtn}</span>
        </button>
      </div>

      {/* Filters & Search Strip */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>

          {/* Grade Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-stone-500 mr-1 shrink-0">Class:</span>
            {gradesList.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 border ${
                  selectedGrade === g
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Track Filter */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 text-xs">
          <span className="font-semibold text-stone-500 mr-1">Curriculum Track:</span>
          {tracksList.map((tr) => (
            <button
              key={tr}
              onClick={() => setSelectedTrack(tr)}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                selectedTrack === tr
                  ? 'bg-amber-100 text-amber-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tr === 'All' ? 'All Curricula' : tr}
            </button>
          ))}
        </div>
      </div>

      {/* High-Density Data Grid */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">{t.colId}</th>
                <th className="py-3 px-4">{t.colName}</th>
                <th className="py-3 px-4">{t.colGrade}</th>
                <th className="py-3 px-4">{t.colTrack}</th>
                <th className="py-3 px-4 text-right">{t.colGPA}</th>
                <th className="py-3 px-4 text-right">{t.colAttendance}</th>
                <th className="py-3 px-4 text-right">{t.colORT}</th>
                <th className="py-3 px-4">{t.colTuition}</th>
                <th className="py-3 px-4 text-right pr-6">{t.colActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-stone-400">
                    No students matched the query filters.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono text-stone-500 tabular-nums">
                      {s.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-stone-900">
                      <div>{s.fullName}</div>
                      {s.fullNameKg && (
                        <div className="text-[10px] text-stone-400 font-normal">{s.fullNameKg}</div>
                      )}
                    </td>
                    <td className="py-3 px-4 font-medium text-stone-800">
                      {s.grade}
                    </td>
                    <td className="py-3 px-4 text-stone-600 max-w-xs truncate">
                      {s.track}
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums font-semibold text-stone-900">
                      {s.gpa.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-stone-800">
                      {s.attendancePercent}%
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums font-bold text-amber-700">
                      {s.ortMockScore || '—'}
                    </td>
                    <td className="py-3 px-4">
                      {s.tuitionStatus === 'Paid' && (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Paid</span>
                        </span>
                      )}
                      {s.tuitionStatus === 'Pending' && (
                        <span className="inline-flex items-center gap-1 text-amber-700 font-medium">
                          <Clock className="w-3 h-3" />
                          <span>Pending</span>
                        </span>
                      )}
                      {s.tuitionStatus === 'Overdue' && (
                        <span className="inline-flex items-center gap-1 text-rose-700 font-medium">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Overdue</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right pr-6">
                      <button
                        onClick={() => setActiveStudent(s)}
                        className="px-2.5 py-1 text-xs font-semibold rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
                      >
                        {t.viewProfile}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Profile Modal */}
      {activeStudent && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-xl border border-stone-200 shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/50">
              <div>
                <h3 className="text-base font-bold text-stone-900">{t.profileTitle}</h3>
                <div className="text-xs text-stone-500 font-mono mt-0.5">{activeStudent.id}</div>
              </div>
              <button
                onClick={() => setActiveStudent(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs sm:text-sm">
              {/* Header Profile Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div>
                  <h4 className="text-lg font-bold text-stone-900">{activeStudent.fullName}</h4>
                  {activeStudent.fullNameKg && (
                    <div className="text-xs text-stone-500">{activeStudent.fullNameKg}</div>
                  )}
                  <div className="text-xs text-stone-600 mt-1">
                    Class: <strong className="text-stone-900">{activeStudent.grade}</strong> · Track: {activeStudent.track}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Current GPA</div>
                  <div className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
                    {activeStudent.gpa.toFixed(2)} <span className="text-xs text-stone-400 font-normal">/ 5.00</span>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg border border-stone-200 bg-white">
                  <div className="text-[11px] text-stone-500">Attendance</div>
                  <div className="text-base font-bold font-mono text-stone-900 tabular-nums mt-0.5">
                    {activeStudent.attendancePercent}%
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-stone-200 bg-white">
                  <div className="text-[11px] text-stone-500">ORT Mock Score</div>
                  <div className="text-base font-bold font-mono text-amber-700 tabular-nums mt-0.5">
                    {activeStudent.ortMockScore ? `${activeStudent.ortMockScore} / 245` : 'N/A'}
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-stone-200 bg-white">
                  <div className="text-[11px] text-stone-500">{t.scholarship}</div>
                  <div className="text-base font-bold font-mono text-emerald-700 tabular-nums mt-0.5">
                    {activeStudent.scholarshipPercent}% Grant
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-stone-200 bg-white">
                  <div className="text-[11px] text-stone-500">{t.dormitory}</div>
                  <div className="text-xs font-semibold text-stone-800 mt-1">
                    {activeStudent.dormitory ? t.yes : t.no}
                  </div>
                </div>
              </div>

              {/* Olympiad Honors if any */}
              {activeStudent.olympiadSubject && (
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 flex items-start gap-3">
                  <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide text-amber-900">
                      Olympiad Academic Honors
                    </div>
                    <div className="text-sm font-semibold mt-0.5">{activeStudent.olympiadSubject}</div>
                    <div className="text-xs text-amber-800 mt-0.5">{activeStudent.olympiadMedal}</div>
                  </div>
                </div>
              )}

              {/* Parent & Residential Contact */}
              <div className="space-y-3 pt-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  {t.parentInfo}
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/40">
                    <div className="text-[11px] text-stone-500">Primary Guardian Name</div>
                    <div className="font-semibold text-stone-900 mt-0.5">{activeStudent.parentName}</div>
                  </div>

                  <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/40">
                    <div className="text-[11px] text-stone-500">Mobile Phone (WhatsApp Active)</div>
                    <div className="font-mono font-semibold text-stone-900 mt-0.5 flex items-center justify-between">
                      <span>{activeStudent.parentPhone}</span>
                      <a
                        href={`https://wa.me/${activeStudent.parentPhone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-emerald-700 font-sans hover:underline font-bold"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/40 sm:col-span-2">
                    <div className="text-[11px] text-stone-500">{t.address}</div>
                    <div className="text-stone-800 mt-0.5">{activeStudent.address}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex justify-end">
              <button
                onClick={() => setActiveStudent(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 text-white hover:bg-stone-800"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
