import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Wind,
  Play,
  Pause,
  Sparkles,
  Waves,
} from "lucide-react";

const BreathingExercise = () => {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState("Ready");
  const [count, setCount] = useState(0);

  const timerRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const steps = [
      { name: "Inhale", time: 4000 },
      { name: "Hold", time: 3000 },
      { name: "Exhale", time: 4000 },
    ];

    let index = 0;

    const run = () => {
      setPhase(steps[index].name);

      if (steps[index].name === "Exhale") {
        setCount((prev) => prev + 1);
      }

      timerRef.current = setTimeout(() => {
        index = (index + 1) % steps.length;
        run();
      }, steps[index].time);
    };

    run();

    return () => clearTimeout(timerRef.current);
  }, [active]);

  const stopExercise = () => {
    setActive(false);
    setPhase("Ready");

    clearTimeout(timerRef.current);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-emerald-50 flex items-center justify-center px-4 py-10">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-cyan-200 blur-[120px] opacity-50 rounded-full"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-emerald-200 blur-[120px] opacity-50 rounded-full"></div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-5xl rounded-[40px] overflow-hidden border border-white/40 bg-white/70 backdrop-blur-2xl shadow-2xl"
      >

        <div className="grid lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="p-8 md:p-12 flex flex-col justify-center">

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium w-fit">

              <Sparkles size={16} />

              Wellness Breathing

            </div>

            {/* TITLE */}
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold text-slate-800 leading-tight">
              Relax <br />
              Your Mind
            </h1>

            <p className="mt-6 text-slate-500 leading-relaxed text-lg">
              Follow the breathing rhythm to calm your thoughts,
              reduce anxiety, and refresh your mind peacefully.
            </p>

            {/* STATUS */}
            <div className="mt-10 flex items-center gap-4">

              <div className="w-16 h-16 rounded-3xl bg-cyan-100 flex items-center justify-center shadow-inner">

                <Wind className="text-cyan-600" size={30} />

              </div>

              <div>

                <p className="text-slate-500 text-sm">
                  Current Phase
                </p>

                <h2 className="text-3xl font-extrabold text-slate-800">
                  {active ? phase : "Ready"}
                </h2>

              </div>

            </div>

            {/* STATS */}
            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-md">

                <p className="text-slate-500 text-sm">
                  Breathing Cycles
                </p>

                <h3 className="text-3xl font-extrabold text-cyan-600 mt-2">
                  {count}
                </h3>

              </div>

              <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-md">

                <p className="text-slate-500 text-sm">
                  Relaxation
                </p>

                <h3 className="text-3xl font-extrabold text-emerald-600 mt-2">
                  Calm
                </h3>

              </div>

            </div>

            {/* BUTTON */}
            <div className="mt-10">

              {!active ? (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActive(true)}
                  className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl flex items-center gap-3"
                >

                  <Play size={20} />

                  Start Breathing

                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={stopExercise}
                  className="bg-gradient-to-r from-rose-500 to-red-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl flex items-center gap-3"
                >

                  <Pause size={20} />

                  Stop Session

                </motion.button>
              )}

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">

            {/* OUTER RINGS */}
            <motion.div
              animate={{
                scale:
                  active && phase === "Inhale"
                    ? 1.25
                    : active && phase === "Exhale"
                    ? 0.85
                    : 1,
              }}
              transition={{
                duration: phase === "Hold" ? 3 : 4,
                ease: "easeInOut",
              }}
              className="absolute w-[380px] h-[380px] rounded-full border-[20px] border-cyan-100"
            />

            <motion.div
              animate={{
                scale:
                  active && phase === "Inhale"
                    ? 1.15
                    : active && phase === "Exhale"
                    ? 0.92
                    : 1,
              }}
              transition={{
                duration: phase === "Hold" ? 3 : 4,
                ease: "easeInOut",
              }}
              className="absolute w-[300px] h-[300px] rounded-full border-[16px] border-emerald-100"
            />

            {/* MAIN CIRCLE */}
            <motion.div
              animate={{
                scale:
                  active && phase === "Inhale"
                    ? 1.2
                    : active && phase === "Exhale"
                    ? 0.85
                    : 1,
              }}
              transition={{
                duration: phase === "Hold" ? 3 : 4,
                ease: "easeInOut",
              }}
              className="relative w-[230px] h-[230px] rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 shadow-[0_20px_60px_rgba(0,200,180,0.35)] flex items-center justify-center"
            >

              {/* INNER */}
              <div className="absolute inset-5 rounded-full bg-white/20 backdrop-blur-xl border border-white/40"></div>

              {/* CONTENT */}
              <div className="relative z-10 text-center">

                <Waves className="text-white mx-auto mb-4" size={42} />

                <h2 className="text-4xl font-extrabold text-white">
                  {active ? phase : "Ready"}
                </h2>

                <p className="text-white/90 mt-2 text-sm">
                  Breathe slowly
                </p>

              </div>

            </motion.div>

          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default BreathingExercise;