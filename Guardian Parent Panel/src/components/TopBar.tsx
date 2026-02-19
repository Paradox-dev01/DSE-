import { Bell, ChevronDown, User, Moon, Sun } from 'lucide-react';
import { mockChildren, type Child } from '../data/mockData';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface TopBarProps {
  selectedChild: Child;
  onChildChange: (childId: string) => void;
}

export function TopBar({ selectedChild, onChildChange }: TopBarProps) {
  const [showChildDropdown, setShowChildDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 z-50">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left Section: Logo & School Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">SP</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-semibold text-neutral-900 dark:text-white">Sunnydale Public School</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Guardian Portal</p>
          </div>
        </div>

        {/* Right Section: Child Switcher, Theme Toggle, Notifications, Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Child Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowChildDropdown(!showChildDropdown)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            >
              <img 
                src={selectedChild.photo} 
                alt={selectedChild.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-neutral-900 dark:text-white">{selectedChild.name}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{selectedChild.class}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            </button>

            {showChildDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-2">
                {mockChildren.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => {
                      onChildChange(child.id);
                      setShowChildDropdown(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors ${
                      child.id === selectedChild.id ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                    }`}
                  >
                    <img 
                      src={child.photo} 
                      alt={child.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">{child.name}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">{child.class}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
            ) : (
              <Sun className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
            )}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
            <Bell className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            >
              <User className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-2">
                <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700">
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700">
                  Settings
                </button>
                <hr className="my-2 border-neutral-200 dark:border-neutral-700" />
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-50 dark:hover:bg-neutral-700">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}