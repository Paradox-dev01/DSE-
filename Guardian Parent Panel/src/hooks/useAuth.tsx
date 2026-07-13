import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

export type Guardian = {
  id: string;
  guardian_code: string;
  full_name: string;
  email?: string;
};

type AuthContextType = {
  user: Guardian | null;
  session: Session | null;
  loading: boolean;
  login: (guardian_code: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

async function fetchGuardianProfile(
  authUser: User
): Promise<Guardian | null> {
  if (!authUser.email) {
    return null;
  }

  const { data, error } = await supabase
    .from("guardians")
    .select("id, guardian_code, full_name, email")
    .eq("email", authUser.email)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Guardian | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const syncAuthState = useCallback(async (nextSession: Session | null) => {
    setSession(nextSession);

    if (!nextSession?.user) {
      setUser(null);
      return;
    }

    const guardian = await fetchGuardianProfile(nextSession.user);
    setUser(guardian);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      const {
        data: { session: initialSession },
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      await syncAuthState(initialSession);
      setLoading(false);
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!isMounted) {
        return;
      }

      await syncAuthState(nextSession);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [syncAuthState]);

  const login = async (
    guardian_code: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);

    try {
      const { data: guardian, error: guardianError } = await supabase
        .from("guardians")
        .select("id, guardian_code, full_name, email")
        .eq("guardian_code", guardian_code)
        .single();

      if (guardianError || !guardian?.email) {
        return false;
      }

      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: guardian.email,
          password,
        });

      if (authError || !authData.session || !authData.user) {
        return false;
      }

      await syncAuthState(authData.session);
      return true;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }

      setSession(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
