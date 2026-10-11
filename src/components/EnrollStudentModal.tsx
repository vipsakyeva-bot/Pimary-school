import React, { useState } from 'react';
import { PrimaryStudent, PrimaryGradeLevel, LanguageCode } from '../types/school';
import { X, UserPlus, Save } from 'lucide-react';

interface EnrollStudentModalProps {
  onClose: () => void;
  onEnroll: (student: PrimaryStudent) => void;
  lang: LanguageCode;
}

export const EnrollStudentModal: React.FC<EnrollStudentModalProps> = ({
  onClose,
  onEnroll,
  lang,
}) => {
  const [fullName, setFullName] = useState('');
  const [fullNameKg, setFullNameKg] = useState('');
  const [grade, setGrade] = useState<PrimaryGradeLevel>('1-A');
  const [birthYear, setBirthYear] = useState<number>(2019);
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('+996 ');
  const [parentEmail, setParentEmail] = useState('');

  const t = {
    en: {
      modalTitle: 'Enroll New Student (Grades 1–6)',
      modalSubtitle: 'Register student into official Ministry of Education cohort for Premier Educational Complex.',
      colFullName: 'Full Name (Latin/Russian)',
      colFullNameKg: 'Full Name in Kyrgyz',
      colGrade: 'Enrolling Grade & Section',
      colBirthYear: 'Birth Year',
      colParentName: 'Parent / Legal Guardian',
      colParentPhone: 'Parent Phone (WhatsApp)',
      colParentEmail: 'Parent Email',
      cancel: 'Cancel',
      submit: 'Complete Official Enrollment',
    },
    ky: {
      modalTitle: 'Жаңы окуучуну кабыл алуу (1-6-класстар)',
      modalSubtitle: 'Окуучуну мектептин жана КР Билим берүү министрлигинин базасына кошуу.',
      colFullName: 'Толук аты-жөнү (орусча/латынча)',
      colFullNameKg: 'Кыргызча аты-жөнү',
      colGrade: 'Кабыл алынган класс',
      colBirthYear: 'Туулган жылы',
      colParentName: 'Ата-энесинин аты-жөнү',
      colParentPhone: 'Ата-энесинин телефону (WhatsApp)',
      colParentEmail: 'Электрондук дареги',
      cancel: 'Жокко чыгаруу',
      submit: 'Окуучуну каттоого алуу',
    },
    ru: {
      modalTitle: 'Зачисление учащегося в 1–6 класс',
      modalSubtitle: 'Внесение данных учащегося в электронный контингент комплекса.',
      colFullName: 'ФИО учащегося',
      colFullNameKg: 'ФИО на кыргызском языке',
      colGrade: 'Класс зачисления',
      colBirthYear: 'Год рождения',
      colParentName: 'ФИО родителя / опекуна',
      colParentPhone: 'Номер телефона родителя (WhatsApp)',
      colParentEmail: 'Email родителя',
      cancel: 'Отмена',
      submit: 'Зачислить учащегося',
    },
  }[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !parentName.trim()) return;

    const newStudent: PrimaryStudent = {
      id: `STU-P-${Date.now().toString().slice(-3)}`,
      fullName: fullName.trim(),
      fullNameKg: fullNameKg.trim() || undefined,
      grade,
      birthYear,
      homeroomTeacher: grade.startsWith('1')
        ? 'Nadezhda Ivanova'
        : grade.startsWith('3')
        ? 'Aizada Beishenalieva'
        : 'Cholpon Asanova',
      gpa: 5.0,
      attendanceRate: 100,
      readingSpeedWpm: grade.startsWith('1') ? 45 : 100,
      readingSpeedTarget: grade.startsWith('1') ? 40 : 95,
      mathProficiencyIndex: 95,
      homeworkCompletionRate: 100,
      parentName: parentName.trim(),
      parentPhone: parentPhone.trim(),
      parentEmail: parentEmail.trim() || 'parent@mail.kg',
      tuitionStatus: 'Paid',
      avatarColor: 'bg-emerald-100 text-emerald-800',
      strengths: ['Initial Motivation', 'Active Classroom Participation'],
      growthAreas: ['Orientation to school routine'],
      badges: ['Newly Enrolled Scholar 2026'],
    };

    onEnroll(newStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-xl border border-stone-200 shadow-xl max-w-lg w-full p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h3 className="text-base font-bold text-stone-900">{t.modalTitle}</h3>
            <p className="text-xs text-stone-500 mt-0.5">{t.modalSubtitle}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded text-stone-400 hover:text-stone-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">{t.colFullName}</label>
            <input
              type="text"
              placeholder="e.g. Nurbol Azamatov"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">{t.colFullNameKg}</label>
            <input
              type="text"
              placeholder="e.g. Нурбол Азаматов"
              value={fullNameKg}
              onChange={(e) => setFullNameKg(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">{t.colGrade}</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-stone-50 font-semibold"
              >
                {['1-A', '1-B', '2-A', '2-B', '3-A', '3-B', '4-A', '4-B', '5-A', '5-B', '6-A', '6-B'].map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">{t.colBirthYear}</label>
              <input
                type="number"
                min="2012"
                max="2021"
                value={birthYear}
                onChange={(e) => setBirthYear(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">{t.colParentName}</label>
            <input
              type="text"
              placeholder="e.g. Azamat Toktosunov"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">{t.colParentPhone}</label>
              <input
                type="text"
                placeholder="+996 555 123 456"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">{t.colParentEmail}</label>
              <input
                type="email"
                placeholder="azamat@mail.kg"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{t.submit}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
