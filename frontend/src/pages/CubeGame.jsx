import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CubeGame() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [cubeColor, setCubeColor] = useState("from-cyan-400 to-blue-500");
  const [message, setMessage] = useState("Catch the floating cube ✨");
  const [position, setPosition] = useState({
    top: "40%",
    left: "45%",
  });

  const colors = [
    "from-cyan-400 to-blue-500",
    "from-pink-400 to-rose-500",
    "from-violet-400 to-purple-500",
    "from-emerald-400 to-green-500",
    "from-orange-400 to-amber-500",
  ];

  // 🎯 MOVE CUBE RANDOMLY
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        top: `${Math.random() * 65 + 10}%`,
        left: `${Math.random() * 65 + 10}%`,
      });

      const randomColor =
        colors[Math.floor(Math.random() * colors.length)];

      setCubeColor(randomColor);
    }, Math.max(1200 - level * 100, 450));

    return () => clearInterval(interval);
  }, [level]);

  // 🧊 TAP CUBE
  const tapCube = () => {
    const newScore = score + 1;

    setScore(newScore);

    // level up
    if (newScore % 5 === 0) {
      setLevel((prev) => prev + 1);
      setMessage("Mind Focus Increased 🧠");
    } else {
      setMessage("Nice Catch ✨");
    }
  };

  // 🔄 RESET
  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setMessage("Catch the floating cube ✨");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-sky-50 to-indigo-100 relative flex flex-col items-center justify-center px-4">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[350px] h-[350px] bg-cyan-200 rounded-full blur-[120px] opacity-40 top-0 left-0"></div>
      <div className="absolute w-[350px] h-[350px] bg-purple-200 rounded-full blur-[120px] opacity-40 bottom-0 right-0"></div>

      {/* TOP CARD */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 backdrop-blur-2xl bg-white/60 border border-white/50 shadow-2xl rounded-[30px] px-8 py-5 text-center mb-8"
      >

        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
          🧊 Floating Cube Focus
        </h1>

        <p className="text-gray-500 text-sm mt-2">
          Follow the moving cube and improve calm focus
        </p>

      </motion.div>

      {/* STATS */}
      <div className="relative z-10 flex gap-4 mb-10">

        <div className="bg-white/70 backdrop-blur-xl shadow-lg rounded-2xl px-6 py-4 text-center min-w-[120px]">
          <p className="text-xs text-gray-400">Score</p>
          <h2 className="text-3xl font-bold text-cyan-600">
            {score}
          </h2>
        </div>

        <div className="bg-white/70 backdrop-blur-xl shadow-lg rounded-2xl px-6 py-4 text-center min-w-[120px]">
          <p className="text-xs text-gray-400">Level</p>
          <h2 className="text-3xl font-bold text-indigo-600">
            {level}
          </h2>
        </div>

      </div>

      {/* GAME AREA */}
      <div className="relative w-full max-w-3xl h-[420px] rounded-[40px] overflow-hidden border border-white/50 bg-white/20 backdrop-blur-xl shadow-2xl">

        {/* GRID EFFECT */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* FLOATING CUBE */}
        <AnimatePresence>

          <motion.div
            key={`${position.top}-${position.left}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: 1,
              top: position.top,
              left: position.left,
              rotate: 360,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
            onClick={tapCube}
            className={`absolute w-24 h-24 rounded-[28px] bg-gradient-to-br ${cubeColor} shadow-2xl cursor-pointer flex items-center justify-center text-white font-bold text-xl select-none`}
          >

            <div className="absolute inset-0 rounded-[28px] bg-white/20 backdrop-blur-md"></div>

            <span className="relative z-10">
              TAP
            </span>

          </motion.div>

        </AnimatePresence>

      </div>

      {/* MESSAGE */}
      <motion.p
        key={message}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 mt-8 text-gray-600 italic text-lg"
      >
        {message}
      </motion.p>

      {/* BUTTON */}
      <button
        onClick={resetGame}
        className="relative z-10 mt-6 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white px-7 py-3 rounded-2xl shadow-xl hover:scale-105 transition"
      >
        Reset Game ✨
      </button>

      {/* FOOTER */}
      <p className="relative z-10 text-xs text-gray-400 mt-6">
        Focus training + calming interaction 🌙
      </p>

    </div>
  );
}