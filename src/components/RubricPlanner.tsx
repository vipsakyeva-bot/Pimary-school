import React, { useState } from 'react';
import { RubricCriterion, MilestoneItem } from '../types/project';
import { Award, CheckCircle, Calendar, Plus, Trash2 } from 'lucide-react';

interface RubricPlannerProps {
  rubric: RubricCriterion[];
  milestones: MilestoneItem[];
  dueDate: string;
  onUpdateRubricScore: (id: string, newPoints: number) => void;
  onToggleMilestone: (id: string) => void;
  onAddMilestone: (title: string, dueDate: string) => void;
  onDeleteMilestone: (id: string) => void;
}

export const RubricPlanner: React.FC<RubricPlannerProps> = ({
  rubric,
  milestones,
  dueDate,
  onUpdateRubricScore,
  onToggleMilestone,
  onAddMilestone,
  onDeleteMilestone,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState(dueDate);
  const [showAddForm, setShowAddForm] = useState(false);

  const totalPossible = rubric.reduce((acc, curr) => acc + curr.maxPoints, 0);
  const currentTotal = rubric.reduce((acc, curr) => acc + curr.currentPoints, 0);
  const percentage = Math.round((currentTotal / (totalPossible || 1)) * 100);

  const completedMilestones = milestones.filter((m) => m.completed).length;

  const handleCreateMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddMilestone(newTitle.trim(), newDate);
    setNewTitle('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Top Score & Progress Header Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Rubric Score */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Rubric Assessment
            </div>
            <div className="text-3xl font-bold text-stone-900 tabular-nums mt-1">
              {currentTotal} <span className="text-sm font-normal text-stone-400">/ {totalPossible} pts</span>
            </div>
            <div className="text-xs text-stone-500 mt-1">
              Current Projected Grade: <span className="font-semibold text-emerald-700">{percentage}% (A)</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Milestones Completed */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Milestone Progress
            </div>
            <div className="text-3xl font-bold text-stone-900 tabular-nums mt-1">
              {completedMilestones} <span className="text-sm font-normal text-stone-400">/ {milestones.length} tasks</span>
            </div>
            <div className="text-xs text-stone-500 mt-1">
              {Math.round((completedMilestones / (milestones.length || 1)) * 100)}% project phases completed
            </div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        {/* School Due Date */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Final Submission Target
            </div>
            <div className="text-2xl font-bold text-stone-900 mt-1 font-mono tabular-nums">
              {dueDate}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              Teacher Review & Science Fair Defense
            </div>
          </div>
          <div className="p-3 rounded-xl bg-stone-100 text-stone-600 border border-stone-200">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Rubric Criteria Evaluation Table */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <div>
            <h3 className="text-base font-bold text-stone-900 tracking-tight">
              School Project Grading Rubric Matrix
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Adjust point sliders to self-evaluate each dimension of your research paper and presentation.
            </p>
          </div>
          <span className="text-xs font-mono text-stone-500 tabular-nums font-semibold">
            {currentTotal}/{totalPossible} Total Points
          </span>
        </div>

        <div className="space-y-6">
          {rubric.map((crit) => (
            <div key={crit.id} className="p-4 rounded-lg bg-stone-50/50 border border-stone-200/70 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{crit.name}</h4>
                  <p className="text-xs text-stone-600 mt-0.5">{crit.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-sm font-bold text-stone-900 tabular-nums">
                    {crit.currentPoints}
                  </span>
                  <span className="text-xs text-stone-400">/ {crit.maxPoints} pts</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max={crit.maxPoints}
                  value={crit.currentPoints}
                  onChange={(e) => onUpdateRubricScore(crit.id, Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones Checklist */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <div>
            <h3 className="text-base font-bold text-stone-900 tracking-tight">
              Project Timeline & Action Milestones
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Check off completed steps as you advance through the scientific method.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Milestone</span>
          </button>
        </div>

        {/* Add Milestone Form */}
        {showAddForm && (
          <form onSubmit={handleCreateMilestone} className="mb-6 p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Milestone description..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="sm:col-span-2 px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                required
              />
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold bg-stone-900 text-white rounded-lg hover:bg-stone-800"
              >
                Save Step
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {milestones.map((m) => (
            <div
              key={m.id}
              className={`p-4 rounded-lg border transition-colors flex items-start justify-between gap-4 ${
                m.completed
                  ? 'bg-stone-50/40 border-stone-200 text-stone-500'
                  : 'bg-white border-stone-200 text-stone-900'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={m.completed}
                  onChange={() => onToggleMilestone(m.id)}
                  className="w-4 h-4 mt-0.5 rounded-sm border-stone-300 text-stone-900 focus:ring-stone-900 cursor-pointer"
                />
                <div>
                  <h4 className={`text-sm font-semibold ${m.completed ? 'line-through text-stone-500' : 'text-stone-900'}`}>
                    {m.title}
                  </h4>
                  {m.notes && <p className="text-xs text-stone-500 mt-0.5">{m.notes}</p>}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono text-stone-400 tabular-nums">
                  Due {m.dueDate}
                </span>
                <button
                  onClick={() => onDeleteMilestone(m.id)}
                  className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                  title="Remove Milestone"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
