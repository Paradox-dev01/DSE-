import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, ApiError } from '../lib/api';

// Matches guardians table exactly
export interface GuardianProfile {
  id: string;
  guardian_code: string;
  full_name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
}

// Matches GET /auth/me response
export interface AuthUser {
  id: string;
  role: string;
  login_id: string;
  email: string | null;
  avatar_url: string | null;
  must_change_password: boolean;
  profile: GuardianProfile | null;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    role: string;
    must_change_password: boolean;
  };
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (loginId: string, password: string) => Promise<AuthUser>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'dse_token';
const REFRESH_TOKEN_KEY = 'dse_refresh_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchMe(): Promise<AuthUser> {
    return api.get<AuthUser>('/auth/me');
  }

  async function login(loginId: string, password: string): Promise<AuthUser> {
    const data = await api.post<LoginResponse>('/auth/login', {
      login_id: loginId,
      password,
    });

    localStorage.setItem(TOKEN_KEY, data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);

    // login only returns id/role/must_change_password — fetch full profile
    const fullUser = await fetchMe();
    setUser(fullUser);
    return fullUser;
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setUser(null);
  }

  async function refreshUser() {
    const fullUser = await fetchMe();
    setUser(fullUser);
  }

  // Rehydrate session on app load if a token already exists
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setIsLoading(false);
      return;
    }

    fetchMe()
      .then(setUser)
      .catch((err) => {
        // Token invalid/expired — clear it silently
        if (err instanceof ApiError) {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(REFRESH_TOKEN_KEY);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}