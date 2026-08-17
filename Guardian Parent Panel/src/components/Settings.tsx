import { useState } from 'react';
import { Bell, Lock, Globe, UserPlus, Shield, HelpCircle, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleChangePassword = async () => {
  setPasswordError('');
  if (newPassword.length < 6) {
    setPasswordError('New password must be at least 6 characters.');
    return;
  }
  if (newPassword !== confirmPassword) {
    setPasswordError('New passwords do not match.');
    return;
  }
  try {
    const token = localStorage.getItem('token'); // adjust key once we confirm storage
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to change password');
    }
    setPasswordSuccess(true);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswordSuccess(false);
    }, 1500);
  } catch (err: any) {
    setPasswordError(err.message || 'Something went wrong.');
  }
};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold md:text-3xl text-neutral-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-neutral-600 dark:text-neutral-400">Manage your account preferences</p>
      </div>

      {/* Appearance */}
      <div className="p-6 bg-white border shadow-sm dark:bg-neutral-800 rounded-2xl border-neutral-200 dark:border-neutral-700">
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
      <div className="p-6 bg-white border shadow-sm dark:bg-neutral-800 rounded-2xl border-neutral-200 dark:border-neutral-700">
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
      <div className="p-6 bg-white border shadow-sm dark:bg-neutral-800 rounded-2xl border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Security</h2>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center justify-between w-full p-4 transition-colors border rounded-lg border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700"
          >
            <span className="font-medium text-neutral-900 dark:text-white">Change Password</span>
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Language */}
      <div className="p-6 bg-white border shadow-sm dark:bg-neutral-800 rounded-2xl border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Language</h2>
        </div>

        <select className="w-full px-4 py-3 bg-white border rounded-lg dark:bg-neutral-900 border-neutral-200 dark:border-neutral-600 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
        </select>
      </div>

      {/* Additional Guardians */}
      <div className="p-6 bg-white border shadow-sm dark:bg-neutral-800 rounded-2xl border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-3 mb-6">
          <UserPlus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Additional Guardians</h2>
        </div>

        <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
          Add secondary guardians to give them access to your child's information
        </p>

        <button className="px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
          Add Secondary Guardian
        </button>
      </div>

      {/* Privacy & Data */}
      <div className="p-6 bg-white border shadow-sm dark:bg-neutral-800 rounded-2xl border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Privacy & Data</h2>
        </div>

        <div className="space-y-3">
          <button className="flex items-center justify-between w-full p-4 transition-colors border rounded-lg border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700">
            <span className="font-medium text-neutral-900 dark:text-white">Privacy Policy</span>
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="flex items-center justify-between w-full p-4 transition-colors border rounded-lg border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700">
            <span className="font-medium text-neutral-900 dark:text-white">Terms of Service</span>
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="flex items-center justify-between w-full p-4 transition-colors border rounded-lg border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700">
            <span className="font-medium text-neutral-900 dark:text-white">Download My Data</span>
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Help & Support */}
      <div className="p-6 bg-white border shadow-sm dark:bg-neutral-800 rounded-2xl border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Help & Support</h2>
        </div>

        <div className="space-y-3">
          <button className="flex items-center justify-between w-full p-4 transition-colors border rounded-lg border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700">
            <span className="font-medium text-neutral-900 dark:text-white">Help Center</span>
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="flex items-center justify-between w-full p-4 transition-colors border rounded-lg border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700">
            <span className="font-medium text-neutral-900 dark:text-white">Contact Support</span>
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="flex items-center justify-between w-full p-4 transition-colors border rounded-lg border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700">
            <span className="font-medium text-neutral-900 dark:text-white">Report an Issue</span>
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* App Version */}
      <div className="text-sm text-center text-neutral-500 dark:text-neutral-400">
        <p>Guardian Portal v1.0.0</p>
        <p className="mt-1">© 2026 Sunnydale Public School</p>
      </div>

      {/* App Version */}
      <div className="text-sm text-center text-neutral-500 dark:text-neutral-400">
        <p>Guardian Portal v1.0.0</p>
        <p className="mt-1">© 2026 Sunnydale Public School</p>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md p-6 bg-white dark:bg-neutral-800 rounded-2xl">
            <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-white">Change Password</h2>
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border rounded-lg dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border rounded-lg dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border rounded-lg dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
              {passwordSuccess && <p className="text-sm text-green-600">Password changed successfully!</p>}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-4 py-3 font-medium transition-colors border rounded-lg border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="flex-1 px-4 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}