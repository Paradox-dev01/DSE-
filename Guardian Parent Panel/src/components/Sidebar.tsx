import { Home, BookOpen, Calendar, CreditCard, Bell, MessageSquare, CalendarDays, Settings } from 'lucide-react';
import type { NavigationItem } from '../App';

interface SidebarProps {
  currentView: NavigationItem;
  onNavigate: (view: NavigationItem) => void;
}

const navItems = [
  { id: 'dashboard' as NavigationItem, label: 'Dashboard', icon: Home },
  { id: 'academics' as NavigationItem, label: 'Academics', icon: BookOpen },
  { id: 'attendance' as NavigationItem, label: 'Attendance', icon: Calendar },
  { id: 'fees' as NavigationItem, label: 'Fees', icon: CreditCard },
  { id: 'notices' as NavigationItem, label: 'Notices', icon: Bell },
  { id: 'messages' as NavigationItem, label: 'Messages', icon: MessageSquare },
  { id: 'events' as NavigationItem, label: 'Events', icon: CalendarDays },
  { id: 'settings' as NavigationItem, label: 'Settings', icon: Settings },
];

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden md:block fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 overflow-y-auto">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}