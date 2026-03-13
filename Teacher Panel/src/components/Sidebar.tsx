import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  BookMarked,
  GraduationCap,
  Users,
  MessageSquare,
  Bell,
  Folder,
  BarChart,
  Calendar,
  FileText,
  HelpCircle,
  Keyboard,
  ChevronRight,
  X
} from 'lucide-react';
import { cn } from './ui/utils';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'classes', label: 'My Classes', icon: BookOpen },
  { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
  { id: 'homework', label: 'Homework & Assignments', icon: BookMarked },
  { id: 'exams', label: 'Exams & Marks', icon: GraduationCap },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'notices', label: 'Notices & Notifications', icon: Bell },
  { id: 'resources', label: 'Resources', icon: Folder },
  { id: 'reports', label: 'Reports', icon: BarChart },
  { id: 'planner', label: 'Planner', icon: Calendar },
  { id: 'leave', label: 'Leave & Substitution', icon: FileText },
];

const bottomNavigation = [
  { id: 'help', label: 'Help', icon: HelpCircle },
  { id: 'shortcuts', label: 'Shortcuts Guide', icon: Keyboard },
];

export function Sidebar({ activeView, onNavigate, isOpen, onClose }: SidebarProps) {
  const handleNavigate = (view: string) => {
    onNavigate(view);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 lg:z-0 h-screen border-r bg-white dark:bg-gray-900 dark:border-gray-800 transition-transform duration-300 ease-in-out",
          "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b dark:border-gray-800">
          <span className="font-semibold text-gray-900 dark:text-white">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)]">
          <div className="flex flex-col h-full">
            {/* Primary Navigation */}
            <nav className="flex-1 p-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 transition-colors",
                      isActive
                        ? "bg-[#2563EB] text-white hover:bg-[#2563EB]/90"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                    onClick={() => handleNavigate(item.id)}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {isActive && <ChevronRight className="h-4 w-4" />}
                  </Button>
                );
              })}
            </nav>

            {/* Bottom Navigation */}
            <div className="p-3 border-t dark:border-gray-800">
              <Separator className="mb-3" />
              {bottomNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="w-full justify-start gap-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => handleNavigate(item.id)}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}