import { Bell, Search, MessageSquare, User, LogOut, Settings, Calendar, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { currentTeacher, academicYear } from '../lib/mock-data';
import { useTheme } from '../lib/theme-context';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  activeClass?: string;
  onMenuClick: () => void;
  onNavigate: (view: string) => void;
}

export function Header({ activeClass, onMenuClick, onNavigate }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const currentTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  useEffect(() => {
    if (searchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchExpanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (searchExpanded && !target.closest('.search-container')) {
        setSearchExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchExpanded]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="flex h-16 items-center gap-2 md:gap-4 px-4 md:px-6">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-gray-600 dark:text-gray-300"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563EB] text-white">
            <span className="font-bold">TP</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-gray-900 dark:text-white">Teacher Panel</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{academicYear}</div>
          </div>
        </div>

        {/* Date & Time - Hidden on mobile */}
        <div className="hidden xl:flex flex-col ml-4">
          <div className="text-xs text-gray-500 dark:text-gray-400">{currentTime}</div>
        </div>

        {/* Active Class Indicator - Hidden on mobile */}
        {activeClass && (
          <div className="hidden lg:flex items-center gap-2 ml-4 px-3 py-1.5 bg-[#2563EB]/10 dark:bg-[#2563EB]/20 rounded-lg border border-[#2563EB]/20">
            <div className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse"></div>
            <span className="text-sm font-medium text-[#2563EB] dark:text-blue-400">{activeClass}</span>
          </div>
        )}

        {/* Search - Desktop */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search students, classes, messages..."
              className="pl-9 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 md:gap-2 ml-auto">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-600 dark:text-gray-300"
            onClick={() => setSearchExpanded(!searchExpanded)}
          >
            {searchExpanded ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-gray-600 dark:text-gray-300">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#DC2626]">
                  3
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-[#2563EB]">
                  Mark all read
                </Button>
              </div>
              <ScrollArea className="h-[400px]">
                <div className="p-2">
                  {/* Notification Items */}
                  <button 
                    onClick={() => onNavigate('homework')}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 dark:text-white">
                          New assignment submission
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Emma Wilson submitted "Algebra Homework #5"
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          5 minutes ago
                        </p>
                      </div>
                    </div>
                  </button>

                  <button 
                    onClick={() => onNavigate('communication')}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 dark:text-white">
                          Parent message received
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Maria Martinez sent you a message about John's progress
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          1 hour ago
                        </p>
                      </div>
                    </div>
                  </button>

                  <button 
                    onClick={() => onNavigate('planner')}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#2563EB] mt-2 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 dark:text-white">
                          Faculty meeting reminder
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Scheduled for tomorrow at 3:00 PM in Conference Room A
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          3 hours ago
                        </p>
                      </div>
                    </div>
                  </button>

                  <button 
                    onClick={() => onNavigate('exams')}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors opacity-60"
                  >
                    <div className="flex gap-3">
                      <div className="h-2 w-2 rounded-full bg-gray-400 mt-2 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 dark:text-white">
                          Exam schedule updated
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Final exam dates have been published
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          Yesterday
                        </p>
                      </div>
                    </div>
                  </button>

                  <button 
                    onClick={() => onNavigate('leave')}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors opacity-60"
                  >
                    <div className="flex gap-3">
                      <div className="h-2 w-2 rounded-full bg-gray-400 mt-2 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 dark:text-white">
                          Leave request approved
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Your leave request for March 15 has been approved
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          2 days ago
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </ScrollArea>
              <div className="border-t dark:border-gray-700 p-2">
                <Button 
                  variant="ghost" 
                  className="w-full text-[#2563EB]"
                  onClick={() => onNavigate('notices')}
                >
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Messages - Hidden on small mobile */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden sm:flex relative text-gray-600 dark:text-gray-300"
            onClick={() => onNavigate('communication')}
          >
            <MessageSquare className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#2563EB]">
              2
            </Badge>
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentTeacher.avatar} alt={currentTeacher.name} />
                  <AvatarFallback>{currentTeacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="hidden xl:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                  {currentTeacher.name}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{currentTeacher.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{currentTeacher.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onNavigate('profile')}>
                <User className="mr-2 h-4 w-4" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('planner')}>
                <Calendar className="mr-2 h-4 w-4" />
                My Timetable
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 dark:text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Expanded Search */}
      {searchExpanded && (
        <div className="md:hidden border-t dark:border-gray-800 bg-white dark:bg-gray-900 search-container">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                ref={searchInputRef}
                placeholder="Search students, classes, messages..."
                className="pl-10 text-base h-12 bg-gray-50 dark:bg-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {searchQuery && (
              <div className="mt-4 space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Students</h4>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                    <p className="font-medium text-gray-900 dark:text-white">Emma Wilson</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">7B-001 • Class 7B</p>
                  </button>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Classes</h4>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                    <p className="font-medium text-gray-900 dark:text-white">Class 7B - Mathematics</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">32 students • Period 3</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}