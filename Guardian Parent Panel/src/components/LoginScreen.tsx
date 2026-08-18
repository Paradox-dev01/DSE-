import { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ApiError } from '../lib/api';

export function LoginScreen() {
  const { login } = useAuth();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!loginId.trim() || !password) {
      setError('Please enter both your ID and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(loginId.trim(), password);
      // No manual navigation needed — AuthContext updates `user`,
      // and AuthGate re-renders based on isAuthenticated / must_change_password.
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.status === 401 ? 'Incorrect ID or password.' : err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-neutral-50 dark:bg-neutral-900">
      <div className="w-full max-w-sm mx-auto" style={{ maxWidth: '24rem' }}>
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
            Guardian Portal
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Sign in to view your child's progress
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 bg-white border shadow-sm dark:bg-neutral-800 rounded-xl border-neutral-200 dark:border-neutral-700"
        >
          <div>
            <label
              htmlFor="loginId"
              className="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Login ID
            </label>
            <input
              id="loginId"
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              autoComplete="username"
              autoFocus
              className="w-full px-3 py-2 bg-white border rounded-lg border-neutral-300 dark:border-neutral-600 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 303"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full px-3 py-2 bg-white border rounded-lg border-neutral-300 dark:border-neutral-600 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
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
            {isSubmitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="mt-4 text-xs text-center text-neutral-400 dark:text-neutral-500">
          First time signing in? Your password is the same as your Login ID.
        </p>
      </div>
    </div>
  );
}