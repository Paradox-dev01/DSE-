import { useState } from 'react';
import { Bell, Lock, Globe, UserPlus, Shield, HelpCircle, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white">Settings</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-1">Manage your account preferences</p>
      </div>

      {/* Appearance */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-3 mb-6">
          {theme === 'light' ? (
            <Sun className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          ) : (
            <Moon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          )}
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Appearance</h2>
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-white">Dark Mode</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Switch between light and dark themes</p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              theme === 'dark' ? 'bg-blue-600' : 'bg-neutral-300'
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Notification Preferences</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-neutral-100 dark:border-neutral-700">
            <div>
              <h3 className="font-medium text-neutral-900 dark:text-white">Email Notifications</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Receive updates via email</p>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                emailNotifications ? 'bg-blue-600' : 'bg-neutral-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  emailNotifications ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-neutral-100 dark:border-neutral-700">
            <div>
              <h3 className="font-medium text-neutral-900 dark:text-white">Push Notifications</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Receive push notifications on your device</p>
            </div>
            <button
              onClick={() => setPushNotifications(!pushNotifications)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                pushNotifications ? 'bg-blue-600' : 'bg-neutral-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  pushNotifications ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium text-neutral-900 dark:text-white">SMS Notifications</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Receive important alerts via SMS</p>
            </div>
            <button
              onClick={() => setSmsNotifications(!smsNotifications)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                smsNotifications ? 'bg-blue-600' : 'bg-neutral-300'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  smsNotifications ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Security</h2>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
            <span className="font-medium text-neutral-900 dark:text-white">Change Password</span>
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
            <span className="font-medium text-neutral-900 dark:text-white">Two-Factor Authentication</span>
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Language */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Language</h2>
        </div>

        <select className="w-full px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-600 text-neutral-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
        </select>
      </div>

      {/* Additional Guardians */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-3 mb-6">
          <UserPlus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Additional Guardians</h2>
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          Add secondary guardians to give them access to your child's information
        </p>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Add Secondary Guardian
        </button>
      </div>

      {/* Privacy & Data */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Privacy & Data</h2>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
            <span className="font-medium text-neutral-900 dark:text-white">Privacy Policy</span>
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
            <span className="font-medium text-neutral-900 dark:text-white">Terms of Service</span>
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
            <span className="font-medium text-neutral-900 dark:text-white">Download My Data</span>
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Help & Support */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Help & Support</h2>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
            <span className="font-medium text-neutral-900 dark:text-white">Help Center</span>
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
            <span className="font-medium text-neutral-900 dark:text-white">Contact Support</span>
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
            <span className="font-medium text-neutral-900 dark:text-white">Report an Issue</span>
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* App Version */}
      <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">
        <p>Guardian Portal v1.0.0</p>
        <p className="mt-1">© 2026 Sunnydale Public School</p>
      </div>
    </div>
  );
}