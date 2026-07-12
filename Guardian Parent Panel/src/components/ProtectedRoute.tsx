import { useAuth } from "../hooks/useAuth";
import Login from "./Login";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();

    // 🔵 1. show loading state while checking session
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-neutral-600 dark:text-neutral-300">
                    Loading...
                </p>
            </div>
        );
    }

    // 🔴 2. not logged in → show login
    if (!user) {
        return <Login />;
    }

    // 🟢 3. logged in → show app
    return <>{children}</>;
}