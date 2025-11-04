import React, { useState, useCallback } from 'react';
import { User, View, ExamType } from './types';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';
import StudyGuidePage from './components/StudyGuidePage';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>(View.Login);
  const [selectedExam, setSelectedExam] = useState<ExamType | null>(null);

  const handleLogin = useCallback((user: User) => {
    setCurrentUser(user);
    setCurrentView(View.Dashboard);
  }, []);

  const handleRegister = useCallback((user: User) => {
    // In a real app, you'd save the user. Here we just log them in.
    setCurrentUser(user);
    setCurrentView(View.Dashboard);
  }, []);
  
  const handleSelectExam = useCallback((exam: ExamType) => {
    setSelectedExam(exam);
    setCurrentView(View.StudyGuide);
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setSelectedExam(null);
    setCurrentView(View.Dashboard);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setCurrentView(View.Login);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case View.Login:
        return <LoginPage onLogin={handleLogin} onNavigateToRegister={() => setCurrentView(View.Register)} />;
      case View.Register:
        return <RegisterPage onRegister={handleRegister} onNavigateToLogin={() => setCurrentView(View.Login)} />;
      case View.Dashboard:
        return currentUser && <DashboardPage user={currentUser} onSelectExam={handleSelectExam} onLogout={handleLogout} />;
      case View.StudyGuide:
        return selectedExam && <StudyGuidePage examType={selectedExam} onBack={handleBackToDashboard} />;
      default:
        return <LoginPage onLogin={handleLogin} onNavigateToRegister={() => setCurrentView(View.Register)} />;
    }
  };

  return (
    <main className="text-white min-h-screen antialiased">
        <div className="container mx-auto px-4 py-8">
            {renderView()}
        </div>
    </main>
  );
};

export default App;