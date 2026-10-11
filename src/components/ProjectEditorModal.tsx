import React, { useState } from 'react';
import { SchoolProject } from '../types/project';
import { X, Save } from 'lucide-react';

interface ProjectEditorModalProps {
  project: SchoolProject;
  onSave: (updated: SchoolProject) => void;
  onClose: () => void;
}

export const ProjectEditorModal: React.FC<ProjectEditorModalProps> = ({
  project,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState(project.title);
  const [subject, setSubject] = useState(project.subject);
  const [gradeLevel, setGradeLevel] = useState(project.gradeLevel);
  const [studentName, setStudentName] = useState(project.studentName);
  const [schoolName, setSchoolName] = useState(project.schoolName);
  const [teacherName, setTeacherName] = useState(project.teacherName);
  const [dueDate, setDueDate] = useState(project.dueDate);
  const [abstract, setAbstract] = useState(project.abstract);
  const [hypothesis, setHypothesis] = useState(project.hypothesis);
  const [materialsText, setMaterialsText] = useState(project.materials.join('\n'));
  const [methodologyText, setMethodologyText] = useState(project.methodology.join('\n'));
  const [findingsText, setFindingsText] = useState(project.keyFindings.join('\n'));
  const [conclusion, setConclusion] = useState(project.conclusion);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SchoolProject = {
      ...project,
      title: title.trim() || project.title,
      subject: subject.trim() || project.subject,
      gradeLevel: gradeLevel.trim() || project.gradeLevel,
      studentName: studentName.trim() || project.studentName,
      schoolName: schoolName.trim() || project.schoolName,
      teacherName: teacherName.trim() || project.teacherName,
      dueDate: dueDate.trim() || project.dueDate,
      abstract: abstract.trim() || project.abstract,
      hypothesis: hypothesis.trim() || project.hypothesis,
      materials: materialsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      methodology: methodologyText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      keyFindings: findingsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      conclusion: conclusion.trim() || project.conclusion,
    };
    onSave(updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-xl border border-stone-200 shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/50">
          <div>
            <h2 className="text-base font-bold text-stone-900">Edit School Project Information</h2>
            <p className="text-xs text-stone-500">Update project details, hypothesis, materials, and findings.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs sm:text-sm">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
              required
            />
          </div>

          {/* Subject & Grade Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Subject / Discipline</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Physics, Biology, History, Computer Science..."
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Grade Level</label>
              <input
                type="text"
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                placeholder="Grade 10, Middle School, High School..."
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                required
              />
            </div>
          </div>

          {/* Student & School Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Student Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">School Name</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Teacher / Advisor</label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full sm:w-48 px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>

          {/* Abstract */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Abstract / Executive Summary</label>
            <textarea
              rows={3}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>

          {/* Hypothesis */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Scientific Hypothesis / Thesis</label>
            <textarea
              rows={2}
              value={hypothesis}
              onChange={(e) => setHypothesis(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>

          {/* Materials */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Materials List (one per line)</label>
            <textarea
              rows={4}
              value={materialsText}
              onChange={(e) => setMaterialsText(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>

          {/* Methodology */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Experimental Methodology (one step per line)</label>
            <textarea
              rows={4}
              value={methodologyText}
              onChange={(e) => setMethodologyText(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>

          {/* Findings */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Key Quantitative Findings (one observation per line)</label>
            <textarea
              rows={3}
              value={findingsText}
              onChange={(e) => setFindingsText(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>

          {/* Conclusion */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Conclusion & Significance</label>
            <textarea
              rows={3}
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
