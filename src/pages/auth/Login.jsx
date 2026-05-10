import React, { useState } from "react";
import { auth, googleProvider } from "../../firebase/config";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const result = localStorage.getItem("result");

      if (!result) navigate("/assessment");
      else navigate(`/dashboard/${result}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/assessment");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800">
            Welcome Back 👋
          </h1>
          <p className="text-slate-500 mt-2">
            Continue your mental wellness journey
          </p>
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-slate-600">
            Email
          </label>
          <input
            className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-slate-600">
            Password
          </label>
          <input
            type="password"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={login}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-lg"
        >
          Login
        </button>

        {/* OR DIVIDER */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-slate-200"></div>
          <p className="px-3 text-sm text-slate-400">OR</p>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        {/* GOOGLE LOGIN */}
        <button
          onClick={googleLogin}
          className="w-full flex items-center justify-center gap-3 border border-slate-200 py-3 rounded-xl hover:bg-slate-50 transition"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="google"
            className="w-5"
          />
          <span className="font-semibold text-slate-700">
            Continue with Google
          </span>
        </button>

        {/* SIGNUP LINK */}
        <p className="text-center mt-6 text-sm text-slate-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-bold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}