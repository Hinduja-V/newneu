import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StressBallGame() {
  const [count, setCount] = useState(0);
  const [stressLevel, setStressLevel] = useState(100);
  const [message, setMessage] = useState("Squeeze the stress away 💆");
  const [ripples, setRipples] = useState([]);

  // SQUEEZE BALL
  const squeezeBall = () => {
    setCount((prev) => prev + 1);

    setStressLevel((prev) => Math.max(prev - 3, 0));

    const id = Date.now();

    setRipples((prev) => [...prev, id]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r !== id));
    }, 1000);

    const texts = [
      "Relaxing... 🌿",
      "Stress melting ✨",
      "Feel calm 💖",
      "Mind getting lighter ☁️",
      "Peace loading 😌",
    ];

    setMessage(texts[Math.floor(Math.random() * texts.length)]);
  };

  // COMPLETE
  useEffect(() => {
    if (stressLevel === 0) {
      setMessage("Fully relaxed 🎉");
    }
  }, [stressLevel]);

  // RESET
  const resetGame = () => {
    setCount(0);
    setStressLevel(100);
    setMessage("Squeeze the stress away 💆");
  };

  return (
    <div className="min-h-screen overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 px-4 py-8">

      {/* BACKGROUND LIGHT */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300/20 blur-3xl rounded-full"></div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md bg-white/60 backdrop-blur-2xl border border-white/40 rounded-[34px] shadow-2xl p-6"
      >

        {/* HEADER */}
        <div className="text-center mb-5">
          <h1 className="text-3xl font-extrabold text-pink-600">
            💗 Stress Ball Therapy
          </h1>

          <p className="text-slate-500 text-sm mt-2">
            Tap the ball and slowly release tension
          </p>
        </div>

        {/* TOP INFO */}
        <div className="flex gap-3 mb-6">

          {/* SCORE */}
          <div className="flex-1 bg-white/70 rounded-2xl p-4 shadow">
            <p className="text-xs text-slate-500">Squeezes</p>

            <h2 className="text-2xl font-bold text-pink-600">
              {count}
            </h2>
          </div>

          {/* STRESS LEVEL */}
          <div className="flex-1 bg-white/70 rounded-2xl p-4 shadow">
            <p className="text-xs text-slate-500 mb-2">
              Stress Meter
            </p>

            <div className="w-full h-3 bg-pink-100 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${stressLevel}%` }}
                className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full"
              />
            </div>
          </div>

        </div>

        {/* MESSAGE */}
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-pink-600 font-medium text-sm mb-8"
        >
          {message}
        </motion.div>

        {/* STRESS BALL AREA */}
        <div className="relative flex justify-center items-center h-[260px]">

          {/* RIPPLE EFFECT */}
          <AnimatePresence>
            {ripples.map((ripple) => (
              <motion.div
                key={ripple}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2.2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute w-44 h-44 rounded-full border-4 border-pink-300"
              />
            ))}
          </AnimatePresence>

          {/* SHADOW */}
          <div className="absolute bottom-5 w-40 h-10 bg-pink-300/20 blur-2xl rounded-full"></div>

          {/* BALL */}
          <motion.div
            onClick={squeezeBall}
            whileTap={{
              scale: 0.85,
              rotate: [-3, 3, -2, 2, 0],
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              y: {
                duration: 3,
                repeat: Infinity,
              },
            }}
            className="relative w-40 h-40 rounded-full cursor-pointer flex items-center justify-center shadow-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #fb7185, #ec4899, #d946ef)",
            }}
          >

            {/* GLOSS */}
            <div className="absolute top-5 left-7 w-10 h-10 bg-white/40 rounded-full blur-sm"></div>

            {/* INNER GLOW */}
            <div className="absolute inset-3 rounded-full border border-white/20"></div>

            {/* TEXT */}
            <motion.span
              whileTap={{ scale: 0.9 }}
              className="text-white font-bold text-xl z-10"
            >
              SQUEEZE
            </motion.span>

          </motion.div>

        </div>

        {/* RESET BUTTON */}
        <button
          onClick={resetGame}
          className="w-full mt-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
        >
          Reset Therapy
        </button>

        {/* FOOTER */}
        <p className="text-center text-xs text-slate-400 mt-5">
          Every squeeze helps your mind feel lighter 🌸
        </p>

      </motion.div>
    </div>
  );
}