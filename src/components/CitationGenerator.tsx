import React, { useState } from 'react';
import { CitationItem } from '../types/project';
import { BookOpen, Copy, Check, Plus, Trash2 } from 'lucide-react';

interface CitationGeneratorProps {
  citations: CitationItem[];
  onAddCitation: (citation: Omit<CitationItem, 'id'>) => void;
  onDeleteCitation: (id: string) => void;
}

export const CitationGenerator: React.FC<CitationGeneratorProps> = ({
  citations,
  onAddCitation,
  onDeleteCitation,
}) => {
  const [style, setStyle] = useState<'APA' | 'MLA' | 'Chicago'>('APA');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form states
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState('2024');
  const [url, setUrl] = useState('');
  const [type, setType] = useState<'book' | 'journal' | 'website'>('journal');

  const formatCitation = (c: CitationItem): string => {
    if (style === 'APA') {
      // APA 7: Author, A. A. (Year). Title. Publisher/Journal. URL
      return `${c.authors} (${c.year}). ${c.title}. ${c.publicationOrPublisher}.${c.url ? ` ${c.url}` : ''}`;
    }
    if (style === 'MLA') {
      // MLA 9: Author. "Title." Publisher/Journal, Year.
      return `${c.authors}. "${c.title}." ${c.publicationOrPublisher}, ${c.year}.${c.url ? ` ${c.url}` : ''}`;
    }
    // Chicago: Author. Year. Title. Publisher.
    return `${c.authors}. ${c.year}. "${c.title}." ${c.publicationOrPublisher}.${c.url ? ` ${c.url}` : ''}`;
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAll = () => {
    const allFormatted = citations.map((c) => formatCitation(c)).join('\n\n');
    navigator.clipboard.writeText(allFormatted);
    setCopiedId('all');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateCitation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    onAddCitation({
      type,
      authors: author.trim(),
      title: title.trim(),
      publicationOrPublisher: publisher.trim() || 'Independent Academic Report',
      year: year.trim() || '2024',
      url: url.trim() || undefined,
    });
    setAuthor('');
    setTitle('');
    setPublisher('');
    setUrl('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Style Switcher */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-stone-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-stone-600" />
            <span>Academic Bibliography & Citation Generator</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Auto-formatted bibliography ready to paste directly into your school project manuscript.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Format Selector segmented control */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200/80">
            {(['APA', 'MLA', 'Chicago'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  style === s ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {s} 7th
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Reference</span>
          </button>
        </div>
      </div>

      {/* Add Reference Modal / Card */}
      {showAddModal && (
        <form onSubmit={handleCreateCitation} className="bg-white rounded-xl border border-stone-300 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900">Add Academic Citation Source</h3>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="text-xs text-stone-500 hover:text-stone-800"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Source Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg"
              >
                <option value="journal">Peer-Reviewed Journal</option>
                <option value="book">Published Textbook / Monograph</option>
                <option value="website">Institutional Website / Whitepaper</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Author(s) (e.g., Hawking, Stephen)</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Last name, First name"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-stone-700 mb-1">Work Title / Article Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="A Brief History of Time..."
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Publisher or Journal Name</label>
              <input
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="Bantam Books or Nature Physics"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Year of Publication</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2023"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-stone-700 mb-1">Digital Object Identifier (DOI) or URL</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://doi.org/10.1038/..."
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold bg-stone-900 text-white rounded-lg hover:bg-stone-800"
            >
              Save Source
            </button>
          </div>
        </form>
      )}

      {/* Citations List */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Formatted Sources ({citations.length})
          </span>
          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 text-xs text-stone-700 hover:text-stone-900 font-semibold"
          >
            {copiedId === 'all' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
            <span>{copiedId === 'all' ? 'All Copied!' : 'Copy Entire Works Cited'}</span>
          </button>
        </div>

        <div className="space-y-4">
          {citations.map((c) => {
            const formatted = formatCitation(c);
            return (
              <div
                key={c.id}
                className="p-4 rounded-lg bg-stone-50/60 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="text-xs text-stone-400 capitalize font-medium">{c.type} Citation</div>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-serif">
                    {formatted}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(c.id, formatted)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors"
                  >
                    {copiedId === c.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
                    <span>{copiedId === c.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => onDeleteCitation(c.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                    title="Delete source"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
