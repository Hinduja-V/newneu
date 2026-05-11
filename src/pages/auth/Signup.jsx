import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Calendar,
  Briefcase,
  HeartHandshake,
  Eye,
  EyeOff,
} from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    occupation: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.age ||
      !formData.gender ||
      !formData.occupation
    ) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          age: Number(formData.age),
          gender: formData.gender,
          occupation: formData.occupation,
        }),
      });

      const data = await response.json();

    if (response.status === 409) {
  setError("This email already exists. Please login instead.");
  return;
}

      setSuccess("Account created successfully!");

      localStorage.setItem("mindcareUser", JSON.stringify(data.user));

      setTimeout(() => {
       navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-blue-100 flex items-center justify-center px-4 py-10 overflow-hidden relative">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-300/30 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300/30 blur-3xl rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 bg-white/80 backdrop-blur-xl rounded-[40px] shadow-2xl overflow-hidden border border-white/40"
      >
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-cyan-500 to-blue-700 text-white p-14 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full" />

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center mb-8">
              <HeartHandshake size={40} />
            </div>

            <h1 className="text-5xl font-black leading-tight mb-6">
              Welcome to <br /> MindCare AI
            </h1>

            <p className="text-cyan-100 text-lg leading-relaxed mb-10">
              Build healthier habits, reduce stress, track emotional wellness,
              and improve your mental health journey with AI-powered support.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-white rounded-full" />
                <p>Daily Mood Tracking</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-white rounded-full" />
                <p>Weekly Stress Assessments</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-white rounded-full" />
                <p>AI Mental Wellness Suggestions</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-white rounded-full" />
                <p>Personal Emotional Dashboard</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-black text-slate-800 mb-2">
              Create Account
            </h2>

            <p className="text-slate-500 mb-8">
              Start your emotional wellness journey today.
            </p>

            {/* Success */}
            {success && (
              <div className="mb-5 bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-2xl">
                {success}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-5 bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-2xl">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-5">
              
              {/* Name */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Full Name
                </label>

                <div className="flex items-center bg-slate-100 rounded-2xl px-4 border border-transparent focus-within:border-cyan-500 transition-all">
                  <User className="text-slate-400" size={20} />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent px-3 py-4 outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Email Address
                </label>

                <div className="flex items-center bg-slate-100 rounded-2xl px-4 border border-transparent focus-within:border-cyan-500 transition-all">
                  <Mail className="text-slate-400" size={20} />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent px-3 py-4 outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Password
                </label>

                <div className="flex items-center bg-slate-100 rounded-2xl px-4 border border-transparent focus-within:border-cyan-500 transition-all">
                  <Lock className="text-slate-400" size={20} />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-transparent px-3 py-4 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="text-slate-500" size={20} />
                    ) : (
                      <Eye className="text-slate-500" size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Age + Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">
                    Age
                  </label>

                  <div className="flex items-center bg-slate-100 rounded-2xl px-4 border border-transparent focus-within:border-cyan-500 transition-all">
                    <Calendar className="text-slate-400" size={20} />

                    <input
                      type="number"
                      name="age"
                      placeholder="Your age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full bg-transparent px-3 py-4 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-slate-100 rounded-2xl px-4 py-4 outline-none border border-transparent focus:border-cyan-500"
                  >
                    <option value="">Select Gender</option>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Occupation */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Occupation
                </label>

                <div className="flex items-center bg-slate-100 rounded-2xl px-4 border border-transparent focus-within:border-cyan-500 transition-all">
                  <Briefcase className="text-slate-400" size={20} />

                  <input
                    type="text"
                    name="occupation"
                    placeholder="Student / Employee / Freelancer"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="w-full bg-transparent px-3 py-4 outline-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full mt-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </motion.button>
            </form>

            {/* Login */}
            <div className="text-center mt-6">
              <p className="text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-cyan-600 font-bold hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;