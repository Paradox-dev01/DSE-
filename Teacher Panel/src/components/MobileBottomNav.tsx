import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  Users,
  MessageSquare,
} from 'lucide-react';
import { cn } from './ui/utils';

interface MobileBottomNavProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'classes', label: 'Classes', icon: BookOpen },
  { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'communication', label: 'Messages', icon: MessageSquare },
];

export function MobileBottomNav({ activeView, onNavigate }: MobileBottomNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t dark:border-gray-800 pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-0 flex-1",
                isActive
                  ? "text-[#2563EB] dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 shrink-0",
                isActive && "text-[#2563EB] dark:text-blue-400"
              )} />
              <span className={cn(
                "text-[10px] font-medium truncate max-w-full",
                isActive && "text-[#2563EB] dark:text-blue-400"
              )}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#2563EB]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}