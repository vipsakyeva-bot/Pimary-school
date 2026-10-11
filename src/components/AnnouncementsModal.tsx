import React from 'react';
import { SchoolAnnouncement, LanguageCode } from '../types/school';
import { X, Bell, Pin, Calendar, Tag } from 'lucide-react';

interface AnnouncementsModalProps {
  announcements: SchoolAnnouncement[];
  lang: LanguageCode;
  onClose: () => void;
}

export const AnnouncementsModal: React.FC<AnnouncementsModalProps> = ({
  announcements,
  lang,
  onClose,
}) => {
  const t = {
    en: {
      title: 'Campus Bulletins & Official Notices',
      subtitle: 'Directives from the Principal’s Office and Ministry of Education of KR.',
      close: 'Close',
    },
    ky: {
      title: 'Мектептин расмий жарыялары',
      subtitle: 'Дирекциянын буйруктары жана КР Билим берүү министрлигинин көрсөтмөлөрү.',
      close: 'Жабуу',
    },
    ru: {
      title: 'Официальные объявления и приказы комплекса',
      subtitle: 'Распоряжения администрации и Министерства образования и науки КР.',
      close: 'Закрыть',
    },
  }[lang];

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-xl border border-stone-200 shadow-xl max-w-2xl w-full p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" />
              <span>{t.title}</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">{t.subtitle}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded text-stone-400 hover:text-stone-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className={`p-4 rounded-xl border space-y-1.5 ${
                ann.isPinned
                  ? 'bg-amber-50/50 border-amber-200 text-amber-950'
                  : 'bg-stone-50 border-stone-200 text-stone-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-[10px] text-stone-500 flex items-center gap-1">
                  {ann.isPinned && <Pin className="w-3 h-3 text-amber-600 inline" />}
                  <span>{ann.category}</span>
                </span>
                <span className="font-mono tabular-nums text-stone-400 text-[11px]">{ann.date}</span>
              </div>
              <h4 className="text-sm font-bold text-stone-900 leading-snug">
                {lang === 'ky' ? ann.titleKg : ann.title}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">{ann.summary}</p>
              <div className="text-[11px] text-stone-400 pt-1">
                Authorized by: {ann.author}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-3 border-t border-stone-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
