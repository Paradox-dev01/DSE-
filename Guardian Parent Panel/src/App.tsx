import { useEffect, useState } from 'react';
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
import { type Child } from './data/mockData';
import { api, ApiError } from './lib/api';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginScreen } from './components/LoginScreen';
import { ForceChangePassword } from './components/ForceChangePassword';
import GuardianProfilePage from './components/ProfilePage';

export type NavigationItem = 'dashboard' | 'academics' | 'attendance' | 'fees' | 'notices' | 'messages' | 'events' | 'settings' | 'profile';

function AppShell() {
  const [currentView, setCurrentView] = useState<NavigationItem>('dashboard');

  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [isLoadingChildren, setIsLoadingChildren] = useState(true);
  const [childrenError, setChildrenError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadChildren() {
      try {
        const data = await api.get<{ children: Child[] }>('/guardian/children');
        if (cancelled) return;
        setChildren(data.children);
        if (data.children.length > 0) {
          setSelectedChildId(data.children[0].id);
        }
      } catch (err) {
        if (cancelled) return;
        setChildrenError(err instanceof ApiError ? err.message : 'Failed to load children');
      } finally {
        if (!cancelled) setIsLoadingChildren(false);
      }
    }

    loadChildren();
    return () => { cancelled = true; };
  }, []);

  const selectedChild = children.find(child => child.id === selectedChildId) ?? null;

  const renderContent = () => {
    if (!selectedChildId) return null;
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

  if (isLoadingChildren) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <div className="w-8 h-8 border-2 border-blue-600 rounded-full border-t-transparent animate-spin" />
      </div>
    );
  }

  if (childrenError) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 text-center bg-neutral-50 dark:bg-neutral-900">
        <p className="text-red-600 dark:text-red-400">{childrenError}</p>
      </div>
    );
  }

  if (!selectedChild) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 text-center bg-neutral-50 dark:bg-neutral-900">
        <p className="text-neutral-600 dark:text-neutral-400">No children are linked to this account yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <TopBar
        selectedChild={selectedChild}
        allChildren={children}
        currentView={currentView}
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