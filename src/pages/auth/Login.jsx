import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Login failed");
      }

      // 🔐 STORE DATA
      localStorage.setItem("token", data.token);
      localStorage.setItem("mindcareUser", JSON.stringify(data.user));

      // 🧠 Sync React state in App (no setUser prop needed)
      window.dispatchEvent(new Event("storage"));

      alert("Login successful!");

      // 🚀 Redirect safely
      navigate("/dashboard", { replace: true });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={login}
        className="w-96 p-8 bg-white shadow-xl rounded-2xl"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          className="w-full border p-3 mb-3 rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-3 mb-3 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          onClick={() => navigate("/signup")}
          className="text-center mt-4 text-blue-600 cursor-pointer"
        >
          Create account
        </p>
      </form>
    </div>
  );
}