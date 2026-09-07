import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { AuthModal } from './components/AuthModal';
import { PrivacyModal } from './components/PrivacyModal';
import { Footer } from './components/Footer';

// Views
import { LandingPage } from './views/LandingPage';
import { StudentDashboard } from './views/StudentDashboard';
import { AcademyView } from './views/AcademyView';
import { ConceptLearningView } from './views/ConceptLearningView';
import { QuizView } from './views/QuizView';
import { QuizAnalysisView } from './views/QuizAnalysisView';
import { WeaknessDetectionView } from './views/WeaknessDetectionView';
import { RetestView } from './views/RetestView';
import { UploadLearnView } from './views/UploadLearnView';
import { ProgrammingHubView } from './views/ProgrammingHubView';
import { HackathonsView } from './views/HackathonsView';
import { MockInterviewView } from './views/MockInterviewView';
import { ResumeBuilderView } from './views/ResumeBuilderView';
import { PersonalAIAssistantView } from './views/PersonalAIAssistantView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { AdminLoginView } from './views/AdminLoginView';

const MainContent: React.FC = () => {
  const { role, schoolNav, collegeNav, userId, showAdminLogin, adminAuthenticated } = useApp();

  if (showAdminLogin && !adminAuthenticated) return <div className="flex-1 flex flex-col min-w-0"><main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto"><AdminLoginView /></main></div>;

  if (role === 'landing' || ((role === 'school' || role === 'college') && !userId)) {
    return <LandingPage />;
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        {/* School Navigation Views */}
        {role === 'school' && (
          <>
            {schoolNav === 'dashboard' && <StudentDashboard />}
            {schoolNav === 'academy' && <AcademyView />}
            {schoolNav === 'concept-learning' && <ConceptLearningView />}
            {schoolNav === 'quiz' && <QuizView />}
            {schoolNav === 'quiz-analysis' && <QuizAnalysisView />}
            {schoolNav === 'weakness' && <WeaknessDetectionView />}
            {schoolNav === 'retest' && <RetestView />}
            {schoolNav === 'upload' && <UploadLearnView />}
            {schoolNav === 'ai-assistant' && <PersonalAIAssistantView />}
          </>
        )}

        {/* College Navigation Views */}
        {role === 'college' && (
          <>
            {collegeNav === 'dashboard' && <StudentDashboard />}
            {collegeNav === 'academy' && <AcademyView />}
            {collegeNav === 'upload' && <UploadLearnView />}
            {collegeNav === 'programming' && <ProgrammingHubView />}
            {collegeNav === 'hackathons' && <HackathonsView />}
            {collegeNav === 'mock-interview' && <MockInterviewView />}
            {collegeNav === 'resume-builder' && <ResumeBuilderView />}
            {collegeNav === 'ai-assistant' && <PersonalAIAssistantView />}
          </>
        )}

        {/* Admin Dashboard */}
        {role === 'admin' && adminAuthenticated && <AdminDashboardView />}
        {role === 'admin' && !adminAuthenticated && <AdminLoginView />}
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#e3f2fd] flex flex-col selection:bg-[#90caf9] selection:text-[#0d47a1]">
        <Navbar />
        <div className="flex-1 flex">
          <Sidebar />
          <MainContent />
        </div>
        <MobileNav />
        <AuthModal />
        <PrivacyModal />
        <Footer />
      </div>
    </AppProvider>
  );
};

export default App;
