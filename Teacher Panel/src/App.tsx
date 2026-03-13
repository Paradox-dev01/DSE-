import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ContextPanel } from './components/ContextPanel';
import { Dashboard } from './components/screens/Dashboard';
import { MyClasses } from './components/screens/MyClasses';
import { Attendance } from './components/screens/Attendance';
import { Homework } from './components/screens/Homework';
import { ExamsMarks } from './components/screens/ExamsMarks';
import { Students } from './components/screens/Students';
import { Communication } from './components/screens/Communication';
import { Planner, Reports, Leave, Resources, Help, Shortcuts } from './components/screens/SimpleScreens';
import { Profile } from './components/screens/Profile';
import { Notices } from './components/screens/Notices';
import { ThemeProvider } from './lib/theme-context';
import { Toaster } from 'sonner@2.0.3';
import { todayClasses } from './lib/mock-data';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeClass = todayClasses.find(c => c.status === 'active');
  const activeClassString = activeClass 
    ? `${activeClass.className} – ${activeClass.subject} – Period ${activeClass.period}`
    : undefined;

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveView} />;
      case 'classes':
        return <MyClasses onNavigate={setActiveView} />;
      case 'attendance':
        return <Attendance />;
      case 'homework':
        return <Homework />;
      case 'exams':
        return <ExamsMarks />;
      case 'students':
        return <Students />;
      case 'communication':
        return <Communication />;
      case 'notices':
        return <Notices onNavigate={setActiveView} />;
      case 'planner':
        return <Planner />;
      case 'reports':
        return <Reports />;
      case 'leave':
        return <Leave />;
      case 'resources':
        return <Resources />;
      case 'help':
        return <Help />;
      case 'shortcuts':
        return <Shortcuts />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard onNavigate={setActiveView} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header 
          activeClass={activeClassString} 
          onMenuClick={() => setSidebarOpen(true)}
          onNavigate={setActiveView}
        />
        <div className="flex">
          <Sidebar
            activeView={activeView}
            onNavigate={setActiveView}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <main className="flex-1 min-w-0 p-4 md:p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {renderView()}
            </div>
          </main>
          <ContextPanel />
        </div>
        <MobileBottomNav activeView={activeView} onNavigate={setActiveView} />
        <Toaster position="top-right" />
      </div>
    </ThemeProvider>
  );
}