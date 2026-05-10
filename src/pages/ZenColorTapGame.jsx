import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ZenColorTapGame() {
  const colors = [
    { color: "#c4b5fd", name: "Violet 🌸" },
    { color: "#93c5fd", name: "Blue 🌊" },
    { color: "#86efac", name: "Green 🌿" },
    { color: "#f9a8d4", name: "Pink 💖" },
    { color: "#fde68a", name: "Yellow ☀️" },
    { color: "#fdba74", name: "Orange 🍊" },
  ];

  const [target, setTarget] = useState(colors[0]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [message, setMessage] = useState("Stay calm and tap the glowing color ✨");
  const [time, setTime] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  // 🎯 RANDOM TARGET
  useEffect(() => {
    if (gameOver) return;

    const targetInterval = setInterval(() => {
      const random = colors[Math.floor(Math.random() * colors.length)];
      setTarget(random);
    }, 1800);

    return () => clearInterval(targetInterval);
  }, [gameOver]);

  // ⏳ TIMER
  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver]);

  // 🎮 HANDLE TAP
  const handleTap = (item) => {
    if (gameOver) return;

    if (item.color === target.color) {
      setScore((s) => s + 10);
      setCombo((c) => c + 1);
      setMessage("Perfect Match 🌿");

      // bonus combo
      if (combo >= 2) {
        setScore((s) => s + 5);
      }
    } else {
      setCombo(0);
      setMessage("Slow down... breathe 😌");
    }
  };

  // 🔄 RESET
  const resetGame = () => {
    setScore(0);
    setCombo(0);
    setTime(30);
    setGameOver(false);
    setMessage("Stay calm and tap the glowing color ✨");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-fuchsia-50 to-sky-50 flex items-center justify-center px-4 py-8 relative">

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-200 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-pink-200 rounded-full blur-[120px] opacity-40"></div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md backdrop-blur-2xl bg-white/70 border border-white/50 rounded-[32px] shadow-2xl p-6"
      >

        {/* TITLE */}
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            🎨 Zen Color Tap
          </h1>

          <p className="text-gray-500 text-sm mt-2">
            Focus your mind and tap with calm energy
          </p>
        </div>

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">

          <div className="bg-white/70 px-4 py-2 rounded-2xl shadow text-purple-700 font-semibold text-sm">
            🧠 Score: {score}
          </div>

          <div className="bg-white/70 px-4 py-2 rounded-2xl shadow text-pink-600 font-semibold text-sm">
            ⏳ {time}s
          </div>

        </div>

        {/* TARGET AREA */}
        <div className="flex flex-col items-center">

          <AnimatePresence mode="wait">
            <motion.div
              key={target.color}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >

              {/* glow */}
              <div
                className="absolute inset-0 rounded-3xl blur-2xl opacity-50 animate-pulse"
                style={{ backgroundColor: target.color }}
              ></div>

              {/* target box */}
              <div
                className="relative w-32 h-32 rounded-3xl shadow-2xl border-4 border-white"
                style={{ backgroundColor: target.color }}
              ></div>

            </motion.div>
          </AnimatePresence>

          <p className="mt-5 text-lg font-semibold text-gray-700">
            Tap: <span className="text-purple-600">{target.name}</span>
          </p>

          <p className="text-sm text-gray-500 italic mt-2">
            {message}
          </p>

          {combo >= 2 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-3 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium"
            >
              🔥 Combo x{combo}
            </motion.div>
          )}
        </div>

        {/* COLOR GRID */}
        <div className="grid grid-cols-3 gap-4 mt-8">

          {colors.map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleTap(item)}
              className="h-20 rounded-2xl shadow-lg border-2 border-white"
              style={{ backgroundColor: item.color }}
            />
          ))}

        </div>

        {/* GAME OVER */}
        {gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center"
          >

            <h2 className="text-2xl font-bold text-purple-700">
              🌸 Session Complete
            </h2>

            <p className="text-gray-600 mt-2">
              Final Score: {score}
            </p>

            <button
              onClick={resetGame}
              className="mt-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
            >
              Play Again ✨
            </button>

          </motion.div>
        )}

        {/* FOOT NOTE */}
        {!gameOver && (
          <p className="text-center text-xs text-gray-400 mt-6">
            Calm focus improves mindfulness 🌿
          </p>
        )}

      </motion.div>
    </div>
  );
}