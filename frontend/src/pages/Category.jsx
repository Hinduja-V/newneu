import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBrain, FaHeartbeat, FaArrowRight } from "react-icons/fa";

export default function Category() {
  const navigate = useNavigate();

  const selectCategory = (type) => {
    localStorage.setItem("category", type);

    if (type === "stress") {
      navigate("/");
    } else {
      navigate("/depression-ai");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-100 overflow-hidden">

      {/* 🌿 SOFT BACKGROUND BLOBS */}
      <div className="absolute w-[420px] h-[420px] bg-teal-200/40 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-3xl bottom-10 right-10"></div>

      <div className="max-w-5xl w-full text-center relative z-10">

        {/* HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-slate-800"
        >
          How are you feeling today? 🌿
        </motion.h1>

        <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">
          Choose a path so we can personalize your mental wellness experience
        </p>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-10 mt-14">

          {/* STRESS CARD */}
          <motion.div
            whileHover={{ scale: 1.03, y: -5 }}
            onClick={() => selectCategory("stress")}
            className="cursor-pointer rounded-3xl bg-white shadow-xl border border-slate-100 p-10 transition relative overflow-hidden"
          >

            {/* top accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-500" />

            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white text-3xl shadow-md">
              <FaHeartbeat />
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mt-6">
              Stress & Anxiety
            </h2>

            <p className="text-slate-500 mt-3 text-sm leading-relaxed">
              Relaxation tools, breathing exercises, guided therapy, and stress assessment flow.
            </p>

            <div className="mt-6 flex justify-center">
              <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-600 transition">
                Continue <FaArrowRight />
              </button>
            </div>
          </motion.div>

          {/* DEPRESSION CARD */}
          <motion.div
            whileHover={{ scale: 1.03, y: -5 }}
            onClick={() => selectCategory("depression")}
            className="cursor-pointer rounded-3xl bg-white shadow-xl border border-slate-100 p-10 transition relative overflow-hidden"
          >

            {/* top accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-600" />

            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-3xl shadow-md">
              <FaBrain />
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mt-6">
              Depression Support
            </h2>

            <p className="text-slate-500 mt-3 text-sm leading-relaxed">
              AI CBT chatbot that talks with you, asks questions, and supports emotional recovery.
            </p>

            <div className="mt-6 flex justify-center">
              <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
                Start Chat <FaArrowRight />
              </button>
            </div>
          </motion.div>

        </div>

        {/* FOOTER NOTE */}
        <p className="text-slate-400 text-xs mt-12">
          Your mental health journey is private, safe, and AI-supported 🤍
        </p>

      </div>
    </div>
  );
}