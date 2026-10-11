import React from 'react';
import { PrimaryStudent, LanguageCode } from '../types/school';
import { HeartHandshake, Phone, MessageCircle, CheckCircle2, Utensils, CreditCard, ShieldCheck, Star } from 'lucide-react';

interface ParentCabinetProps {
  student: PrimaryStudent;
  lang: LanguageCode;
}

export const ParentCabinet: React.FC<ParentCabinetProps> = ({
  student,
  lang,
}) => {
  const t = {
    en: {
      roleTitle: 'Parent Portal: Family Oversight',
      childInfo: `Student: ${student.fullName} · Grade ${student.grade}`,
      attendanceTitle: 'Real-Time Campus Presence',
      attendanceVerified: 'Present in Class · Checked through South Gate at 08:14 AM',
      teacherContact: 'Homeroom Teacher Contacts',
      callBtn: 'Call Teacher',
      waBtn: 'WhatsApp Chat',
      cafeteriaTitle: 'School Cafeteria & Nutrition Balance',
      cafeteriaBalance: '2,450 KGS (24 days remaining)',
      todayLunch: 'Today’s Hot Lunch: Organic Beef & Rice, Fresh Vegetable Salad, Fruit Compote',
      academicProgress: 'Child Academic Growth & Subject Marks',
      tuitionTitle: 'Tuition Accounting Status',
      tuitionPaid: 'Term II Tuition Fully Settled (185,000 KGS)',
    },
    ky: {
      roleTitle: 'Ата-энелер кабинети',
      childInfo: `Окуучу: ${student.fullName} · ${student.grade} класс`,
      attendanceTitle: 'Мектепке келүүсү (Онлайн көзөмөл)',
      attendanceVerified: 'Сабакта отурат · Түштүк дарбазадан 08:14тө өттү',
      teacherContact: 'Класс жетекчи менен байланыш',
      callBtn: 'Чалуу',
      waBtn: 'WhatsApp жазуу',
      cafeteriaTitle: 'Ашкана балансы жана тамактануу',
      cafeteriaBalance: '2,450 сом (24 күнгө жетет)',
      todayLunch: 'Бүгүнкү ысык түшкү тамак: Палоо, жаңы салат, кургатылган жемиш компоту',
      academicProgress: 'Баланын жетишкендиги жана баалары',
      tuitionTitle: 'Окуу акысы',
      tuitionPaid: 'II чейрек толук төлөнгөн (185,000 сом)',
    },
    ru: {
      roleTitle: 'Личный кабинет родителя',
      childInfo: `Учащийся: ${student.fullName} · ${student.grade} класс`,
      attendanceTitle: 'Контроль посещаемости (СМС/Онлайн)',
      attendanceVerified: 'Присутствует на уроках · Проход через турникет в 08:14',
      teacherContact: 'Связь с классным руководителем',
      callBtn: 'Позвонить',
      waBtn: 'Написать в WhatsApp',
      cafeteriaTitle: 'Школьное питание и баланс столовой',
      cafeteriaBalance: '2,450 сом (Хватает на 24 учебных дня)',
      todayLunch: 'Горячий обед: Натуральный плов, свежий овощной салат, компот',
      academicProgress: 'Успеваемость и оценки за четверть',
      tuitionTitle: 'Статус оплаты за обучение',
      tuitionPaid: 'Оплата за II четверть подтверждена (185,000 сом)',
    },
  }[lang];

  return (
    <div className="space-y-6">
      {/* Header Profile */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            <HeartHandshake className="w-4 h-4 text-amber-600" />
            <span>Family Academic Portal</span>
          </div>
          <h2 className="text-xl font-bold text-stone-900 tracking-tight">{t.roleTitle}</h2>
          <p className="text-xs text-stone-500 mt-0.5">{t.childInfo}</p>
        </div>

        {/* Real-time Attendance Presence Banner */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{t.attendanceVerified}</span>
        </div>
      </div>

      {/* Grid: Teacher Contact & Cafeteria */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Homeroom Teacher Contact Card */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 tracking-tight">{t.teacherContact}</h3>
            <span className="text-xs text-stone-500">Grade 3-A</span>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-bold text-stone-900">{student.homeroomTeacher}</div>
            <div className="text-xs text-stone-500">Office: Room 104 · Available for consultations 14:30 - 16:00</div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <a
              href="tel:+996555124890"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t.callBtn}</span>
            </a>
            <a
              href="https://wa.me/996555124890"
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t.waBtn}</span>
            </a>
          </div>
        </div>

        {/* School Cafeteria & Nutrition */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <Utensils className="w-4 h-4 text-amber-600" />
              <span>{t.cafeteriaTitle}</span>
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-800">{t.cafeteriaBalance}</span>
          </div>

          <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700 leading-relaxed">
            {t.todayLunch}
          </div>

          <div className="text-[11px] text-stone-500">
            Nutritional standards verified by Ministry of Health of the Kyrgyz Republic school inspection.
          </div>
        </div>
      </div>

      {/* Academic Marks & Progress for Parents */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <h3 className="text-sm font-bold text-stone-900 tracking-tight">{t.academicProgress}</h3>
          <span className="text-xs font-mono font-bold text-stone-800">Current Average: {student.gpa.toFixed(2)} / 5.0</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/50">
            <div className="text-[11px] text-stone-500">Mathematics</div>
            <div className="text-xl font-bold font-mono text-stone-900 mt-1">5 (Excellent)</div>
            <div className="text-[10px] text-emerald-700 mt-0.5">Proficiency: 96%</div>
          </div>

          <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/50">
            <div className="text-[11px] text-stone-500">Literary Reading</div>
            <div className="text-xl font-bold font-mono text-stone-900 mt-1">5 (Excellent)</div>
            <div className="text-[10px] text-emerald-700 mt-0.5">Speed: 118 wpm</div>
          </div>

          <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/50">
            <div className="text-[11px] text-stone-500">Kyrgyz Language</div>
            <div className="text-xl font-bold font-mono text-stone-900 mt-1">5 (Excellent)</div>
            <div className="text-[10px] text-stone-500 mt-0.5">Grammar & Orthography</div>
          </div>

          <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/50">
            <div className="text-[11px] text-stone-500">Cambridge English</div>
            <div className="text-xl font-bold font-mono text-stone-900 mt-1">5 (Excellent)</div>
            <div className="text-[10px] text-emerald-700 mt-0.5">Phonics Stage 3</div>
          </div>
        </div>
      </div>
    </div>
  );
};
