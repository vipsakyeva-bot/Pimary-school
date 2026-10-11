import React, { useState } from 'react';
import { TuitionInvoice, LanguageCode } from '../types/school';
import { INITIAL_INVOICES } from '../data/mockData';
import { CreditCard, CheckCircle2, Clock, AlertTriangle, Download, Plus, Search, Printer } from 'lucide-react';

interface BursarFinanceProps {
  lang: LanguageCode;
}

export const BursarFinance: React.FC<BursarFinanceProps> = ({
  lang,
}) => {
  const [invoices, setInvoices] = useState<TuitionInvoice[]>(INITIAL_INVOICES);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending' | 'Overdue'>('All');
  const [search, setSearch] = useState('');

  const t = {
    en: {
      title: 'Bursar Office & Primary School Tuition (KGS)',
      subtitle: 'Official tuition collection, scholarship discounts, and bank receipt accounting.',
      colInvoice: 'Invoice #',
      colStudent: 'Student & Grade',
      colTerm: 'Term',
      colGross: 'Tuition Fee (KGS)',
      colDiscount: 'Scholarship Grant',
      colNet: 'Net Due (сом)',
      colStatus: 'Status',
      colPayment: 'Method & Date',
      markPaid: 'Mark Paid (MBank)',
      printReceipt: 'Print Receipt',
      totalCollected: 'Collected This Term',
      totalPending: 'Pending Accounts',
      totalOverdue: 'Overdue Tuition',
    },
    ky: {
      title: 'Мектептин бухгалтериясы жана төлөмдөр (сом)',
      subtitle: 'Окуу акысы, стипендиялык жеңилдиктер жана банктык дүмүрчөктөрдүн эсеби.',
      colInvoice: 'Дүмүрчөк №',
      colStudent: 'Окуучу жана класс',
      colTerm: 'Чейрек',
      colGross: 'Окуу акысы (сом)',
      colDiscount: 'Жеңилдик',
      colNet: 'Төлөнүүчү сумма',
      colStatus: 'Абалы',
      colPayment: 'Төлөө ыкмасы',
      markPaid: 'Төлөндү деп белгилөө',
      printReceipt: 'Квитанция басып чыгаруу',
      totalCollected: 'Чогултулган каражат',
      totalPending: 'Күтүлүп жаткан төлөмдөр',
      totalOverdue: 'Мөөнөтү өткөн төлөмдөр',
    },
    ru: {
      title: 'Бухгалтерия и оплата за обучение (сом)',
      subtitle: 'Реестр счетов за обучение в 1–6 классах, стипендиальные гранты и безналичные платежи.',
      colInvoice: 'Номер счета',
      colStudent: 'Учащийся и класс',
      colTerm: 'Период',
      colGross: 'Стоимость (сом)',
      colDiscount: 'Скидка / Грант',
      colNet: 'К оплате (KGS)',
      colStatus: 'Статус',
      colPayment: 'Способ и дата',
      markPaid: 'Отметить оплаченным',
      printReceipt: 'Квитанция',
      totalCollected: 'Собрано за II четверть',
      totalPending: 'Ожидает оплаты',
      totalOverdue: 'Просрочено',
    },
  }[lang];

  const handleMarkPaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              status: 'Paid',
              paymentDate: new Date().toISOString().split('T')[0],
              paymentMethod: 'MBank Mobile QR',
            }
          : inv
      )
    );
  };

  const filtered = invoices.filter((inv) => {
    const matchesSearch =
      inv.studentName.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCollected = invoices
    .filter((x) => x.status === 'Paid')
    .reduce((acc, curr) => acc + curr.finalAmountKGS, 0);

  const totalPending = invoices
    .filter((x) => x.status === 'Pending')
    .reduce((acc, curr) => acc + curr.finalAmountKGS, 0);

  const totalOverdue = invoices
    .filter((x) => x.status === 'Overdue')
    .reduce((acc, curr) => acc + curr.finalAmountKGS, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-stone-900 tracking-tight flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-amber-500" />
            <span>{t.title}</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">{t.subtitle}</p>
        </div>

        <div className="text-xs text-stone-500 font-mono">
          Currency: Kyrgyzstani Som (KGS / сом)
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{t.totalCollected}</div>
          <div className="text-2xl font-bold font-mono text-emerald-800 tabular-nums mt-1">
            {totalCollected.toLocaleString()} сом
          </div>
          <div className="text-[10px] text-stone-500 mt-1">Direct settlement via MBank / Optima</div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{t.totalPending}</div>
          <div className="text-2xl font-bold font-mono text-amber-800 tabular-nums mt-1">
            {totalPending.toLocaleString()} сом
          </div>
          <div className="text-[10px] text-stone-500 mt-1">Invoices due within 10 days</div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">{t.totalOverdue}</div>
          <div className="text-2xl font-bold font-mono text-rose-800 tabular-nums mt-1">
            {totalOverdue.toLocaleString()} сом
          </div>
          <div className="text-[10px] text-rose-700 mt-1 font-medium">Automatic SMS reminders sent</div>
        </div>
      </div>

      {/* Filters and Invoices Ledger */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full sm:w-auto">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search invoice or student name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>

          <div className="flex items-center gap-1 p-0.5 bg-stone-100 rounded-lg border border-stone-200">
            {(['All', 'Paid', 'Pending', 'Overdue'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  statusFilter === st ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">{t.colInvoice}</th>
                <th className="py-3 px-4">{t.colStudent}</th>
                <th className="py-3 px-4 text-right">{t.colGross}</th>
                <th className="py-3 px-4 text-right">{t.colDiscount}</th>
                <th className="py-3 px-4 text-right font-bold">{t.colNet}</th>
                <th className="py-3 px-4">{t.colStatus}</th>
                <th className="py-3 px-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-semibold text-stone-900 tabular-nums">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-stone-900">{inv.studentName}</div>
                    <div className="text-[10px] text-stone-500">{inv.classGrade} · {inv.termName}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-stone-600">
                    {inv.tuitionFeeKGS.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums text-emerald-800">
                    -{inv.scholarshipDiscountKGS.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono tabular-nums font-bold text-stone-900">
                    {inv.finalAmountKGS.toLocaleString()} KGS
                  </td>
                  <td className="py-3.5 px-4">
                    {inv.status === 'Paid' && (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Paid</span>
                      </span>
                    )}
                    {inv.status === 'Pending' && (
                      <span className="inline-flex items-center gap-1 text-amber-700 font-medium">
                        <Clock className="w-3 h-3" />
                        <span>Pending</span>
                      </span>
                    )}
                    {inv.status === 'Overdue' && (
                      <span className="inline-flex items-center gap-1 text-rose-700 font-medium">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Overdue</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 pr-6 text-right">
                    <div className="inline-flex items-center gap-2">
                      {inv.status !== 'Paid' && (
                        <button
                          onClick={() => handleMarkPaid(inv.id)}
                          className="px-2.5 py-1 text-xs font-semibold rounded bg-stone-900 text-white hover:bg-stone-800"
                        >
                          {t.markPaid}
                        </button>
                      )}
                      <button
                        onClick={() => alert(`Official Receipt for ${inv.studentName} (${inv.invoiceNumber}) downloaded.`)}
                        className="p-1 rounded text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                        title={t.printReceipt}
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
