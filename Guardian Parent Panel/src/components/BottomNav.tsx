import { Home, BookOpen, CreditCard, MessageSquare, Settings } from 'lucide-react';
import type { NavigationItem } from '../App';

interface BottomNavProps {
  currentView: NavigationItem;
  onNavigate: (view: NavigationItem) => void;
}

const mobileNavItems = [
  { id: 'dashboard' as NavigationItem, label: 'Home', icon: Home },
  { id: 'academics' as NavigationItem, label: 'Academics', icon: BookOpen },
  { id: 'fees' as NavigationItem, label: 'Fees', icon: CreditCard },
  { id: 'messages' as NavigationItem, label: 'Messages', icon: MessageSquare },
  { id: 'settings' as NavigationItem, label: 'More', icon: Settings },
];

export function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 z-40">
      <div className="flex items-center justify-around">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 py-3 px-4 transition-colors ${
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-500 dark:text-neutral-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}