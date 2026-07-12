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
import GuardianProfilePage from './components/ProfilePage';
import Login from "./components/Login";
import { useAuth } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";

export type NavigationItem = 'dashboard' | 'academics' | 'attendance' | 'fees' | 'notices' | 'messages' | 'events' | 'settings' | 'profile';

export default function App() {
  const { user } = useAuth(); // AUTH STATE CHECK

  const [currentView, setCurrentView] = useState<NavigationItem>('dashboard');
  const [selectedChildId, setSelectedChildId] = useState(mockChildren[0].id);

  // 🔴 1. IF NOT LOGGED IN → SHOW LOGIN ONLY
  if (!user) {
    return (
      <ThemeProvider>
        <Login />
      </ThemeProvider>
    );
  }

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
      case 'profile': // ← add this
        return <GuardianProfilePage onClose={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard childId={selectedChildId} />;
    }
  };

  // 🟢 2. IF LOGGED IN → FULL APP
  return (
    <ThemeProvider>
      <ProtectedRoute>
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
      </ProtectedRoute>
    </ThemeProvider>
  );
}