import { useState, FormEvent } from 'react';
import { api, ApiError } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

export function ForceChangePassword() {
  const { refreshUser, logout } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!oldPassword) {
      setError('Please enter your current password.');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (newPassword === oldPassword) {
      setError('New password must be different from your current password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/auth/change-password', { oldPassword, newPassword });
      await refreshUser(); // must_change_password is now false, AuthGate will re-render into the app
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.status === 401 ? 'Current password is incorrect.' : err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-neutral-50 dark:bg-neutral-900">
      <div className="w-full max-w-sm mx-auto" style={{ maxWidth: '24rem' }}>
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
            Set a New Password
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            For security, please choose a new password before continuing.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 bg-white border shadow-sm dark:bg-neutral-800 rounded-xl border-neutral-200 dark:border-neutral-700"
        >
          <div>
            <label
              htmlFor="oldPassword"
              className="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Current Password
            </label>
            <input
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              autoComplete="current-password"
              autoFocus
              className="w-full px-3 py-2 bg-white border rounded-lg border-neutral-300 dark:border-neutral-600 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Login ID, if this is your first sign-in"
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full px-3 py-2 bg-white border rounded-lg border-neutral-300 dark:border-neutral-600 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full px-3 py-2 bg-white border rounded-lg border-neutral-300 dark:border-neutral-600 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Re-enter new password"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 transition-colors"
          >
            {isSubmitting ? 'Updating…' : 'Update Password'}
          </button>

          <button
            type="button"
            onClick={logout}
            className="w-full py-1 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            Cancel and sign out
          </button>
        </form>
      </div>
    </div>
  );
}