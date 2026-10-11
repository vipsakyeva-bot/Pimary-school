import React from 'react';
import { SchoolProject } from '../types/project';
import { Edit3, CheckCircle2, FlaskConical, FileText, Check } from 'lucide-react';

interface ProjectOverviewProps {
  project: SchoolProject;
  onEditProject: () => void;
  onToggleMaterial?: (materialIndex: number) => void;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  project,
  onEditProject,
}) => {
  return (
    <div className="space-y-8">
      {/* Project Hero Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {/* Zero-Pill Unboxed Metadata with Typographic Separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-medium">
              <span>{project.subject}</span>
              <span aria-hidden="true">·</span>
              <span>{project.gradeLevel}</span>
              <span aria-hidden="true">·</span>
              <span>{project.schoolName}</span>
              <span aria-hidden="true">·</span>
              <span>Due {project.dueDate}</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-700 font-semibold">{project.status}</span>
            </div>

            {/* Display Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900 leading-tight">
              {project.title}
            </h1>

            {/* Author Credit */}
            <div className="text-sm text-stone-600">
              Student Investigator: <span className="font-semibold text-stone-900">{project.studentName}</span>
              <span className="mx-2 text-stone-300">·</span>
              Advisor: <span className="font-medium text-stone-800">{project.teacherName}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onEditProject}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-200/80"
            >
              <Edit3 className="w-3.5 h-3.5 text-stone-600" />
              <span>Edit Project Details</span>
            </button>
          </div>
        </div>

        {/* Abstract Box */}
        <div className="mt-6 pt-6 border-t border-stone-100">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            Abstract & Executive Summary
          </h2>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            {project.abstract}
          </p>
        </div>
      </div>

      {/* Hypothesis & Scientific Inquiry Callout */}
      <div className="bg-amber-50/50 rounded-xl border border-amber-200/80 p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
            <FlaskConical className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Testable Hypothesis
            </h3>
            <p className="text-sm sm:text-base text-amber-950 font-medium leading-relaxed">
              "{project.hypothesis}"
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Materials (Left 5 cols) & Methodology (Right 7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Materials & Apparatus */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h3 className="text-sm font-bold text-stone-900 tracking-tight flex items-center gap-2">
                <FileText className="w-4 h-4 text-stone-500" />
                <span>Materials & Apparatus Checklist</span>
              </h3>
              <span className="text-xs font-mono text-stone-400 tabular-nums">
                {project.materials.length} Items
              </span>
            </div>

            <ul className="space-y-2.5">
              {project.materials.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                  <div className="w-4 h-4 rounded-sm bg-stone-100 border border-stone-300 flex items-center justify-center text-stone-700 shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] text-stone-500">
            All equipment verified against school safety protocols.
          </div>
        </div>

        {/* Methodology & Experimental Steps */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
            <h3 className="text-sm font-bold text-stone-900 tracking-tight">
              Experimental Procedure & Methodology
            </h3>
            <span className="text-xs text-stone-500">Controlled Trials</span>
          </div>

          <ol className="space-y-4">
            {project.methodology.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <span className="font-mono text-xs font-semibold text-stone-400 shrink-0 mt-0.5">
                  0{idx + 1}.
                </span>
                <p className="leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Key Findings & Empirical Data */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-stone-900 tracking-tight mb-4 pb-3 border-b border-stone-100">
          Key Quantitative Findings & Observations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.keyFindings.map((finding, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-stone-50/70 border border-stone-200/80 flex flex-col justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Observation {idx + 1}</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-normal">
                {finding}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Conclusion & Real-World Application */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
          Conclusion & Scholarly Reflection
        </h3>
        <p className="text-stone-800 text-sm sm:text-base leading-relaxed">
          {project.conclusion}
        </p>
      </div>
    </div>
  );
};
