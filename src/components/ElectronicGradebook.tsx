import React, { useState } from 'react';
import { GradeEntry, LanguageCode } from '../types/school';
import { BookOpen, Download, Plus, Check, Save } from 'lucide-react';

interface ElectronicGradebookProps {
  grades: GradeEntry[];
  lang: LanguageCode;
  onUpdateGrade: (updated: GradeEntry) => void;
}

export const ElectronicGradebook: React.FC<ElectronicGradebookProps> = ({
  grades,
  lang,
  onUpdateGrade,
}) => {
  const [selectedClass, setSelectedClass] = useState('11-Olympiad');
  const [selectedSubject, setSelectedSubject] = useState('Advanced Mathematics (Calculus)');
  const [selectedQuarter, setSelectedQuarter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4'>('Q2');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempScores, setTempScores] = useState<number[]>([]);
  const [tempExam, setTempExam] = useState<number>(95);

  const t = {
    en: {
      title: 'Electronic Gradebook & Academic Journal',
      subtitle: 'Official academic assessment ledger aligned with the Ministry of Education of the Kyrgyz Republic 5-point scale.',
      classFilter: 'Class / Grade Section',
      subjectFilter: 'Academic Subject',
      quarterFilter: 'Academic Quarter',
      colStudent: 'Student Name',
      colClass: 'Class',
      colDailyGrades: 'Daily Lesson Marks (1-5 Scale)',
      colExam: 'Quarter Exam (%)',
      colFinal: 'Final Quarter Mark',
      colStatus: 'Grade Status',
      edit: 'Edit Marks',
      save: 'Save',
      addGradeBtn: 'Add Mark',
      exportBtn: 'Export Register (CSV)',
      scaleLegend: 'Grading scale: 5 (Excellent) · 4 (Good) · 3 (Satisfactory) · 2 (Unsatisfactory)',
    },
    ky: {
      title: 'Электрондук класс журналы',
      subtitle: 'Кыргыз Республикасынын Билим берүү жана илим министрлигинин 5 баллдык шкаласы боюнча баалоо ведомосту.',
      classFilter: 'Классы жана бөлүмү',
      subjectFilter: 'Сабактын аталышы',
      quarterFilter: 'Окуу чейреги',
      colStudent: 'Окуучунун аты-жөнү',
      colClass: 'Классы',
      colDailyGrades: 'Күндөлүк баалар (1-5 балл)',
      colExam: 'Чейректик тест (%)',
      colFinal: 'Чейректик баа',
      colStatus: 'Абалы',
      edit: 'Бааларды оңдоо',
      save: 'Сактоо',
      addGradeBtn: 'Баа кошуу',
      exportBtn: 'Журналды жүктөө (CSV)',
      scaleLegend: 'Баалоо шкаласы: 5 (Эң жакшы) · 4 (Жакшы) · 3 (Канааттандырарлык) · 2 (Канааттандырарлык эмес)',
    },
    ru: {
      title: 'Электронный классный журнал',
      subtitle: 'Официальная ведомость успеваемости по 5-балльной системе Министерства образования и науки КР.',
      classFilter: 'Класс / Отделение',
      subjectFilter: 'Учебный предмет',
      quarterFilter: 'Учебная четверть',
      colStudent: 'ФИО учащегося',
      colClass: 'Класс',
      colDailyGrades: 'Текущие оценки (1-5)',
      colExam: 'Четвертной экзамен (%)',
      colFinal: 'Итоговая за четверть',
      colStatus: 'Статус',
      edit: 'Редактировать',
      save: 'Сохранить',
      addGradeBtn: 'Поставить оценку',
      exportBtn: 'Экспорт журнала (CSV)',
      scaleLegend: 'Шкала оценивания: 5 (Отлично) · 4 (Хорошо) · 3 (Удовлетворительно) · 2 (Неудовлетворительно)',
    },
  }[lang];

  const subjectsList = [
    'Advanced Mathematics (Calculus)',
    'Informatics & Python/C++',
    'Kyrgyz Language & Literature',
    'Physics & Thermodynamics',
    'English Academic Writing',
    'History of Kyrgyzstan',
  ];

  const classesList = ['11-Olympiad', '10-A', '11-A', '9-B'];

  // Filter entries
  const currentEntries = grades.filter((g) => {
    return (
      (selectedClass === 'All' || g.classGrade === selectedClass) &&
      (selectedSubject === 'All' || g.subject === selectedSubject) &&
      g.quarter === selectedQuarter
    );
  });

  const handleStartEdit = (entry: GradeEntry) => {
    setEditingId(entry.id);
    setTempScores([...entry.scores]);
    setTempExam(entry.examScore);
  };

  const handleAddTempScore = (score: number) => {
    setTempScores((prev) => [...prev, score]);
  };

  const handleRemoveLastScore = () => {
    setTempScores((prev) => prev.slice(0, -1));
  };

  const handleSaveEdit = (entry: GradeEntry) => {
    // Calculate final grade based on average + exam
    const avg = tempScores.length ? tempScores.reduce((a, b) => a + b, 0) / tempScores.length : 5;
    const examFactor = tempExam >= 85 ? 5 : tempExam >= 70 ? 4 : 3;
    const finalMark = Math.round(avg * 0.6 + examFactor * 0.4);

    const updated: GradeEntry = {
      ...entry,
      scores: tempScores,
      examScore: tempExam,
      finalGrade: Math.min(5, Math.max(2, finalMark)),
    };

    onUpdateGrade(updated);
    setEditingId(null);
  };

  const handleExportCSV = () => {
    const headers = ['Student ID', 'Student Name', 'Class', 'Subject', 'Quarter', 'Current Marks', 'Exam Score', 'Quarter Final Grade'];
    const rows = currentEntries.map((e) => [
      e.studentId,
      `"${e.studentName}"`,
      e.classGrade,
      `"${e.subject}"`,
      e.quarter,
      `"${e.scores.join(', ')}"`,
      e.examScore,
      e.finalGrade,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Gradebook_${selectedClass}_${selectedSubject.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-stone-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>{t.title}</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">{t.subtitle}</p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-200 transition-colors shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-stone-600" />
          <span>{t.exportBtn}</span>
        </button>
      </div>

      {/* Selectors Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Class Selector */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">{t.classFilter}</label>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {classesList.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedClass(c)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap border ${
                  selectedClass === c
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Selector */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">{t.subjectFilter}</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900 font-medium text-stone-800"
          >
            {subjectsList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Quarter Selector */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">{t.quarterFilter}</label>
          <div className="flex items-center gap-1 p-0.5 bg-stone-100 rounded-lg border border-stone-200">
            {(['Q1', 'Q2', 'Q3', 'Q4'] as const).map((q) => (
              <button
                key={q}
                onClick={() => setSelectedQuarter(q)}
                className={`flex-1 py-1 text-xs font-semibold rounded-md transition-colors ${
                  selectedQuarter === q ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grade Ledger Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">{t.colStudent}</th>
                <th className="py-3 px-4">{t.colClass}</th>
                <th className="py-3 px-4">{t.colDailyGrades}</th>
                <th className="py-3 px-4 text-right">{t.colExam}</th>
                <th className="py-3 px-4 text-center">{t.colFinal}</th>
                <th className="py-3 px-4 text-right pr-6">{t.colStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {currentEntries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-400">
                    No academic records registered for {selectedSubject} in {selectedClass} ({selectedQuarter}).
                  </td>
                </tr>
              ) : (
                currentEntries.map((entry) => {
                  const isEditing = editingId === entry.id;
                  return (
                    <tr key={entry.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-stone-900">
                        {entry.studentName}
                        <div className="text-[10px] text-stone-400 font-mono font-normal">{entry.studentId}</div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-stone-700">
                        {entry.classGrade}
                      </td>
                      <td className="py-3.5 px-4">
                        {!isEditing ? (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {entry.scores.map((score: number, sIdx: number) => (
                              <span
                                key={sIdx}
                                className={`w-6 h-6 rounded flex items-center justify-center font-mono font-bold text-xs tabular-nums border ${
                                  score === 5
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : score === 4
                                    ? 'bg-sky-50 text-sky-800 border-sky-200'
                                    : 'bg-amber-50 text-amber-800 border-amber-200'
                                }`}
                              >
                                {score}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {tempScores.map((score, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="w-6 h-6 rounded bg-stone-200 flex items-center justify-center font-mono font-bold text-xs"
                                >
                                  {score}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-stone-500 mr-1">Add:</span>
                              {[5, 4, 3, 2].map((num) => (
                                <button
                                  key={num}
                                  onClick={() => handleAddTempScore(num)}
                                  className="w-5 h-5 rounded bg-stone-100 hover:bg-stone-300 font-mono text-[11px] font-bold text-stone-800"
                                >
                                  {num}
                                </button>
                              ))}
                              <button
                                onClick={handleRemoveLastScore}
                                className="px-1.5 py-0.5 rounded bg-stone-100 text-[10px] text-rose-600 hover:bg-rose-100"
                              >
                                Undo
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold">
                        {!isEditing ? (
                          <span>{entry.examScore}%</span>
                        ) : (
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={tempExam}
                            onChange={(e) => setTempExam(Number(e.target.value))}
                            className="w-16 px-1.5 py-1 text-right border border-stone-300 rounded font-mono text-xs"
                          />
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-mono font-bold text-sm border tabular-nums ${
                            entry.finalGrade === 5
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                              : entry.finalGrade === 4
                              ? 'bg-sky-100 text-sky-900 border-sky-300'
                              : 'bg-amber-100 text-amber-900 border-amber-300'
                          }`}
                        >
                          {entry.finalGrade}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right pr-6">
                        {!isEditing ? (
                          <button
                            onClick={() => handleStartEdit(entry)}
                            className="px-2.5 py-1 text-xs font-semibold rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
                          >
                            {t.edit}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSaveEdit(entry)}
                            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-md bg-stone-900 text-white hover:bg-stone-800 transition-colors"
                          >
                            <Save className="w-3 h-3" />
                            <span>{t.save}</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Grading Legend Note */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 text-[11px] text-stone-500 flex items-center justify-between">
          <span>{t.scaleLegend}</span>
          <span className="font-medium text-stone-700">Aligned with KR State Standard</span>
        </div>
      </div>
    </div>
  );
};
