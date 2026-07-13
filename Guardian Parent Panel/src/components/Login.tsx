import { useState } from "react";
import { Navigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading, user } = useAuth();

  const [guardianCode, setGuardianCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async () => {
    setError("");

    if (!guardianCode.trim() || !password) {
      setError("Please enter your Guardian ID and password.");
      return;
    }

    const success = await login(guardianCode.trim(), password);

    if (success) {
      navigate("/dashboard", { replace: true });
    } else {
      setError("Invalid Guardian ID or Password");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md p-8 bg-white shadow-lg dark:bg-neutral-800 rounded-2xl">
        <h2 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-white">
          Guardian Login
        </h2>

        <input
          className="w-full p-3 mb-3 border rounded-lg dark:bg-neutral-700"
          placeholder="Guardian ID"
          value={guardianCode}
          onChange={(e) => setGuardianCode(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="username"
        />

        <input
          type="password"
          className="w-full p-3 mb-3 border rounded-lg dark:bg-neutral-700"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="current-password"
        />

        {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </AuthLayout>
  );
}
