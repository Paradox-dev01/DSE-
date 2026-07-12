import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

type Guardian = {
    id: string;
    guardian_code: string;
    full_name: string;
    email?: string;
};

type AuthContextType = {
    user: Guardian | null;
    loading: boolean;
    login: (guardian_code: string, password: string) => Promise<boolean>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<Guardian | null>(null);
    const [loading, setLoading] = useState(true);

    // 🔵 STEP 1: restore session on refresh
    useEffect(() => {
        const saved = localStorage.getItem("guardian_session");

        if (saved) {
            try {
                setUser(JSON.parse(saved));
            } catch (err) {
                localStorage.removeItem("guardian_session");
            }
        }

        setLoading(false); // ✅ IMPORTANT: release UI after check
    }, []);

    // 🔵 STEP 2: LOGIN FUNCTION (core logic)
    const login = async (guardian_code: string, password: string) => {
        setLoading(true);

        // 1. fetch guardian from DB
        const { data, error } = await supabase
            .from("guardians")
            .select("*")
            .eq("guardian_code", guardian_code)
            .single();

        setLoading(false);

        // 2. validation checks
        if (error || !data) {
            return false;
        }

        // 3. password check (TEMPORARY plain text system)
        if (data.password !== password) {
            return false;
        }

        // 4. create session user object
        const sessionUser = {
            id: data.id,
            guardian_code: data.guardian_code,
            full_name: data.full_name,
            email: data.email,
        };

        // 5. store session
        setUser(sessionUser);
        localStorage.setItem("guardian_session", JSON.stringify(sessionUser));

        return true;
    };

    // 🔵 logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem("guardian_session");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }
        }>
            {children}
        </AuthContext.Provider>
    );
}

// hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};