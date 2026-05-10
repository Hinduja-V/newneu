import React, { useState } from "react";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [trustedContact, setTrustedContact] = useState("");

  const navigate = useNavigate();

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      localStorage.setItem("phone", phone);
      localStorage.setItem("trustedContact", trustedContact);

      navigate("/assessment");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-100 px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800">
            Create Account 🌱
          </h1>
          <p className="text-slate-500 mt-2">
            Start your stress-free wellness journey
          </p>
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-slate-600">
            Email
          </label>
          <input
            className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-slate-600">
            Password
          </label>
          <input
            type="password"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Create a strong password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* PHONE */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-slate-600">
            Phone Number
          </label>
          <input
            className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your phone number"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* TRUSTED CONTACT */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-slate-600">
            Trusted Contact (Emergency)
          </label>
          <input
            className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Family / Friend phone number"
            onChange={(e) => setTrustedContact(e.target.value)}
          />
          <p className="text-xs text-slate-400 mt-2">
            Used only for emergency mental health alerts 🚨
          </p>
        </div>

        {/* SIGNUP BUTTON */}
        <button
          onClick={signup}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition shadow-lg"
        >
          Create Account
        </button>

        {/* LOGIN LINK */}
        <p className="text-center mt-6 text-sm text-slate-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-bold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}