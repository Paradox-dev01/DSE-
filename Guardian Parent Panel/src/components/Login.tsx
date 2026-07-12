import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const navigate = useNavigate();
    const { login, loading } = useAuth();

    const [guardianCode, setGuardianCode] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");

        const success = await login(guardianCode, password);

        if (success) {
            navigate("/dashboard"); // ✅ your confirmed route
        } else {
            setError("Invalid Guardian ID or Password");
        }
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-md p-8 bg-white shadow-lg dark:bg-neutral-800 rounded-2xl">

                <h2 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-white">
                    Guardian Login
                </h2>

                {/* Guardian Code */}
                <input
                    className="w-full p-3 mb-3 border rounded-lg dark:bg-neutral-700"
                    placeholder="Guardian ID"
                    value={guardianCode}
                    onChange={(e) => setGuardianCode(e.target.value)}
                />

                {/* Password */}
                <input
                    type="password"
                    className="w-full p-3 mb-3 border rounded-lg dark:bg-neutral-700"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Error */}
                {error && (
                    <p className="mb-2 text-sm text-red-500">{error}</p>
                )}

                {/* Button */}
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </AuthLayout>
    );
}