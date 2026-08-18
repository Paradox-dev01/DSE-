import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Academics } from './components/Academics';
import { Attendance } from './components/Attendance';
import { Fees } from './components/Fees';
import { Notices } from './components/Notices';
import { Messages } from './components/Messages';
import { Events } from './components/Events';
import { Settings } from './components/Settings';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { mockChildren } from './data/mockData';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginScreen } from './components/LoginScreen';
import { ForceChangePassword } from './components/ForceChangePassword';
import GuardianProfilePage from './components/ProfilePage';

export type NavigationItem = 'dashboard' | 'academics' | 'attendance' | 'fees' | 'notices' | 'messages' | 'events' | 'settings' | 'profile';

function AppShell() {
  const [currentView, setCurrentView] = useState<NavigationItem>('dashboard');
  const [selectedChildId, setSelectedChildId] = useState(mockChildren[0].id);

  const selectedChild = mockChildren.find(child => child.id === selectedChildId) || mockChildren[0];

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard childId={selectedChildId} />;
      case 'academics':
        return <Academics childId={selectedChildId} />;
      case 'attendance':
        return <Attendance childId={selectedChildId} />;
      case 'fees':
        return <Fees childId={selectedChildId} />;
      case 'notices':
        return <Notices />;
      case 'messages':
        return <Messages childId={selectedChildId} />;
      case 'events':
        return <Events />;
      case 'settings':
        return <Settings />;
      case 'profile':
        return <GuardianProfilePage onClose={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard childId={selectedChildId} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <TopBar
        selectedChild={selectedChild}
        onChildChange={setSelectedChildId}
        onNavigate={setCurrentView}
      />

      <div className="flex pt-16">
        <Sidebar
          currentView={currentView}
          onNavigate={setCurrentView}
        />

        <main className="flex-1 p-4 pb-20 md:p-6 lg:p-8 md:pb-8 md:ml-64">
          <div className="mx-auto max-w-7xl">
            {renderContent()}
          </div>
        </main>
      </div>

      <BottomNav
        currentView={currentView}
        onNavigate={setCurrentView}
      />
    </div>
  );
}

function AuthGate() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <div className="w-8 h-8 border-2 border-blue-600 rounded-full border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  if (user?.must_change_password) {
    return <ForceChangePassword />;
  }

  return <AppShell />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthGate />
      </AuthProvider>
    </ThemeProvider>
  );
}