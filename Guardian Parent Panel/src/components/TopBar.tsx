import { Bell, ChevronDown, User, Moon, Sun } from 'lucide-react';
import { mockChildren, type Child } from '../data/mockData';
import { useState, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useClickOutside } from '../hooks/useClickOutside';

interface TopBarProps {
  selectedChild: Child;
  onChildChange: (childId: string) => void;
}

export function TopBar({ selectedChild, onChildChange }: TopBarProps) {
  const [showChildDropdown, setShowChildDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const [showNotifications, setShowNotifications] = useState(false);
  const mockNotifications = [
    { id: 1, message: 'New exam schedule released', read: false },
    { id: 2, message: 'Fee payment reminder', read: true },
    { id: 3, message: 'New message from Mr. Cooper', read: false }
  ];

  const childDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useClickOutside(childDropdownRef, () => setShowChildDropdown(false));
  useClickOutside(notificationsRef, () => setShowNotifications(false));
  useClickOutside(profileRef, () => setShowProfileMenu(false));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left Section: Logo & School Name */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
            <span className="text-lg font-bold text-white">SP</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-semibold text-neutral-900 dark:text-white">Sunnydale Public School</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Guardian Portal</p>
          </div>
        </div>

        {/* Right Section: Child Switcher, Theme Toggle, Notifications, Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Child Switcher */}
          <div className="relative" ref={childDropdownRef}>
            <button
              onClick={() => setShowChildDropdown(!showChildDropdown)}
              className="flex items-center gap-2 px-3 py-2 transition-colors rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700"
            >
              <img
                src={selectedChild.photo}
                alt={selectedChild.name}
                className="object-cover w-8 h-8 rounded-full"
              />
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium text-neutral-900 dark:text-white">{selectedChild.name}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{selectedChild.class}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            </button>

            {showChildDropdown && (
              <div className="absolute right-0 w-64 py-2 mt-2 bg-white border rounded-lg shadow-lg dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                {mockChildren.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => {
                      onChildChange(child.id);
                      setShowChildDropdown(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors ${child.id === selectedChild.id ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                      }`}
                  >
                    <img
                      src={child.photo}
                      alt={child.name}
                      className="object-cover w-10 h-10 rounded-full"
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
            className="p-2 transition-colors rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
            ) : (
              <Sun className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(prev => !prev)}
              className="relative p-2 transition-colors rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700"
            >
              <Bell className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
              {mockNotifications.some(n => !n.read) && (
                <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 w-48 py-2 mt-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg z-[60]">

                {mockNotifications.length > 0 ? (
                  mockNotifications.map((notif) => (
                    <button
                      key={notif.id}
                      className={`w-full px-4 py-2 text-sm text-left hover:bg-neutral-50 dark:hover:bg-neutral-700 ${!notif.read
                        ? 'text-neutral-900 dark:text-white font-medium'
                        : 'text-neutral-500 dark:text-neutral-400'
                        }`}
                    >
                      {notif.message}
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-2 text-sm text-neutral-500 dark:text-neutral-400">
                    No notifications
                  </p>
                )}

              </div>
            )}

          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="p-2 transition-colors rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700"
            >
              <User className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 w-48 py-2 mt-2 bg-white border rounded-lg shadow-lg dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                <button className="w-full px-4 py-2 text-sm text-left text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700">
                  Profile
                </button>
                <button className="w-full px-4 py-2 text-sm text-left text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700">
                  Settings
                </button>
                <hr className="my-2 border-neutral-200 dark:border-neutral-700" />
                <button className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-neutral-50 dark:hover:bg-neutral-700">
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