# Premier Educational Complex — School Management System (Bishkek, Kyrgyzstan)

A modern, enterprise-grade school management and academic portal engineered for **Premier Educational Complex** in Kyrgyzstan, covering Grades 1–6 (Primary & Middle School) and senior academic tracking.

---

## 🌟 Key Features

1. **Primary School Management (Grades 1–6)**:
   - Full cohort registry across 12 class sections (`1-A` through `6-B`).
   - Aligned with the Ministry of Education and Science of the Kyrgyz Republic standard curriculum and Cambridge Primary English.

2. **Electronic Class Timetable & Bell Schedule**:
   - Dynamic 7-period weekly schedule with classroom suite allocations, laboratory assignments, and physical dynamic recess.
   - One-click print-ready schedule generator.

3. **Role-Based Personal Cabinets (5 Dedicated Roles)**:
   - 👑 **Директор (Principal / Director)**: Strategic KPI dashboard, educational quality index (СОУ), staffing ratios, and ministerial directives.
   - 📋 **Завуч (Vice Principal for Academics / Завуч по УВР)**: Lesson plan compliance tracking, lesson observation rubrics (посещение уроков), syllabus completion rates.
   - 👩‍🏫 **Учитель (Teacher Workspace)**: Rapid grade entries, today's teaching queue, homework publishing to student diaries.
   - 🎒 **Ученик (Student Digital Diary / Электрондук күндөлүк)**: Today's lessons, homework completion check-off, reading speed metrics, digital stars/badges.
   - 👨‍👩‍👧 **Родитель (Parent Portal)**: Real-time turnstile attendance alerts, cafeteria meal balances, quarterly marks, instant WhatsApp/phone direct contact with homeroom teacher.

4. **Teacher Performance Control & Progress Tracking**:
   - Comprehensive faculty audit cards tracking syllabus pacing (%), lesson plan approval (%), average student GPA, and inspection observation notes.

5. **Individual Student Progress Monitoring**:
   - Longitudinal tracking of Reading Fluency (Техника чтения в словах/минуту) compared against national grade-level benchmarks.
   - Mathematics problem-solving index, homework submission consistency, cognitive strengths, and personalized growth trajectory (ИОТ).

6. **Trilingual Localization**:
   - Seamless live switching between **English**, **Кыргызча (Kyrgyz)**, and **Русский (Russian)**.

---

## 🚀 Deployment to GitHub and Vercel

This application is ready for zero-config production deployment on Vercel and GitHub.

### Step 1: Push to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "feat: Premier Educational Complex school management platform"

# Link to your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/premier-school-kyrgyzstan.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Via Vercel Web Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New Project"** and import your GitHub repository.
3. Select **Vite** as the framework preset (automatically detected via `vercel.json`).
4. Keep the default build command (`npm run build`) and output directory (`dist`).
5. Click **"Deploy"**.

#### Option B: Via Vercel CLI
```bash
# Install Vercel CLI if needed
npm i -g vercel

# Deploy directly from terminal
vercel

# Deploy to production
vercel --prod
```

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server (port 3000)
npm run dev

# Run TypeScript type check
npm run lint

# Build for production
npm run build
```

---

## 🏛️ Institutional Compliance

- **Accreditation**: Aligned with the state educational standards of the Ministry of Education and Science of the Kyrgyz Republic (Кыргыз Республикасынын Билим берүү жана илим министрлиги).
- **Grading Scale**: National 5-point scale (5 = Excellent, 4 = Good, 3 = Satisfactory, 2 = Unsatisfactory) + GPA conversion.
- **Location**: Tokombaev St (South Gate), Bishkek, Kyrgyzstan.
