import React, { useState } from 'react';
import { AttendanceItem, LanguageCode } from '../types/school';
import { CheckCircle2, Clock, XCircle, AlertCircle, Check, Search } from 'lucide-react';

interface AttendanceTerminalProps {
  initialAttendance: AttendanceItem[];
  lang: LanguageCode;
}

export const AttendanceTerminal: React.FC<AttendanceTerminalProps> = ({
  initialAttendance,
  lang,
}) => {
  const [records, setRecords] = useState<AttendanceItem[]>(initialAttendance);
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const t = {
    en: {
      title: 'Daily Campus Attendance Terminal',
      subtitle: 'Real-time turnstile RFID gate sync and manual homeroom attendance registration.',
      markAllPresent: 'Mark All Present',
      allClasses: 'All Classes',
      colStudent: 'Student Name',
      colClass: 'Class',
      colStatus: 'Status',
      colTimestamp: 'Gate Check-In Time',
      colNotes: 'Remarks / Notes',
      present: 'Present',
      late: 'Late',
      absent: 'Absent',
      excused: 'Excused',
      statsPresent: 'Present Today',
      statsLate: 'Late Arrivals',
      statsAbsent: 'Absent / Excused',
      saveConfirmation: 'Attendance records updated',
    },
    ky: {
      title: 'Күндөлүк катышууну каттоо терминалы',
      subtitle: 'Турникет RFID карталарынын маалыматы жана класс жетекчинин белгилөөсү.',
      markAllPresent: 'Баарын келди деп белгилөө',
      allClasses: 'Бардык класстар',
      colStudent: 'Окуучунун аты-жөнү',
      colClass: 'Классы',
      colStatus: 'Абалы',
      colTimestamp: 'Келген убактысы',
      colNotes: 'Эскертүү / Себеби',
      present: 'Келди',
      late: 'Кечикти',
      absent: 'Келген жок',
      excused: 'Себептүү',
      statsPresent: 'Бүгүн келгендер',
      statsLate: 'Кечиккендер',
      statsAbsent: 'Келбегендер',
      saveConfirmation: 'Катышуу журналы жаңыланды',
    },
    ru: {
      title: 'Терминал ежедневного учета посещаемости',
      subtitle: 'Синхронизация с турникетами пропускной системы и журнал классного руководителя.',
      markAllPresent: 'Отметить всех присутствующими',
      allClasses: 'Все классы',
      colStudent: 'ФИО учащегося',
      colClass: 'Класс',
      colStatus: 'Статус',
      colTimestamp: 'Время прохода через турникет',
      colNotes: 'Примечания / Причина',
      present: 'Присутствует',
      late: 'Опоздал',
      absent: 'Отсутствует',
      excused: 'Уважительная',
      statsPresent: 'Присутствуют сегодня',
      statsLate: 'Опоздания',
      statsAbsent: 'Отсутствуют',
      saveConfirmation: 'Журнал посещаемости обновлен',
    },
  }[lang];

  const handleStatusChange = (studentId: string, newStatus: AttendanceItem['status']) => {
    setRecords((prev) =>
      prev.map((r) => {
        if (r.studentId !== studentId) return r;
        const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        return {
          ...r,
          status: newStatus,
          timestamp: newStatus === 'Absent' ? '-' : r.timestamp === '-' ? nowTime : r.timestamp,
        };
      })
    );
  };

  const handleMarkAllPresent = () => {
    const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setRecords((prev) =>
      prev.map((r) => ({
        ...r,
        status: 'Present',
        timestamp: r.timestamp === '-' ? nowTime : r.timestamp,
      }))
    );
  };

  const filtered = records.filter((r) => {
    const matchesClass = selectedClass === 'All' || r.classGrade === selectedClass;
    const matchesSearch = r.studentName.toLowerCase().includes(search.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const presentCount = records.filter((r) => r.status === 'Present').length;
  const lateCount = records.filter((r) => r.status === 'Late').length;
  const absentCount = records.filter((r) => r.status === 'Absent' || r.status === 'Excused').length;
  const attendancePercent = ((presentCount / (records.length || 1)) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header Banner with Overall Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{t.statsPresent}</div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-700 tabular-nums mt-1">{presentCount}</div>
          <div className="text-[11px] text-stone-500 mt-1">{attendancePercent}% of registered cohort</div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{t.statsLate}</div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-700 tabular-nums mt-1">{lateCount}</div>
          <div className="text-[11px] text-stone-500 mt-1">Logged past 08:30 AM</div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{t.statsAbsent}</div>
          <div className="text-2xl sm:text-3xl font-bold text-rose-700 tabular-nums mt-1">{absentCount}</div>
          <div className="text-[11px] text-stone-500 mt-1">Notifications sent to parents</div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Gate Status</div>
            <div className="text-sm font-bold text-stone-900 mt-1">Bishkek Main Turnstile</div>
          </div>
          <button
            onClick={handleMarkAllPresent}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{t.markAllPresent}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', '11-Olympiad', '10-A', '9-B', '11-A'].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedClass(c)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap border ${
                selectedClass === c
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              {c === 'All' ? t.allClasses : c}
            </button>
          ))}
        </div>
      </div>

      {/* Attendance Register Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">{t.colStudent}</th>
                <th className="py-3 px-4">{t.colClass}</th>
                <th className="py-3 px-4">{t.colTimestamp}</th>
                <th className="py-3 px-4">{t.colStatus}</th>
                <th className="py-3 px-4 pr-6">{t.colNotes}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filtered.map((r) => (
                <tr key={r.studentId} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-stone-900">
                    {r.studentName}
                    <div className="text-[10px] text-stone-400 font-mono font-normal">{r.studentId}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-stone-800">
                    {r.classGrade}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-stone-600 tabular-nums">
                    {r.timestamp}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleStatusChange(r.studentId, 'Present')}
                        className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                          r.status === 'Present'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        {t.present}
                      </button>
                      <button
                        onClick={() => handleStatusChange(r.studentId, 'Late')}
                        className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                          r.status === 'Late'
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        {t.late}
                      </button>
                      <button
                        onClick={() => handleStatusChange(r.studentId, 'Absent')}
                        className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                          r.status === 'Absent'
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        {t.absent}
                      </button>
                      <button
                        onClick={() => handleStatusChange(r.studentId, 'Excused')}
                        className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                          r.status === 'Excused'
                            ? 'bg-sky-600 text-white shadow-xs'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        {t.excused}
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 pr-6 text-stone-500 text-xs italic">
                    {r.note || '—'}
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
