import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Timer,
  Coffee,
  Brain,
} from "lucide-react";

const PomodoroTimer = () => {
  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  const [isRunning, setIsRunning] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);

  const timerRef = useRef(null);

  // TIMER
  useEffect(() => {
    if (!isRunning) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 0) {
          const next = !isWork;
          setIsWork(next);
          return next ? WORK_TIME : BREAK_TIME;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isRunning, isWork]);

  // FORMAT
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;

    return `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  // PROGRESS
  const totalTime = isWork ? WORK_TIME : BREAK_TIME;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  // RESET
  const resetTimer = () => {
    setIsRunning(false);
    setIsWork(true);
    setTimeLeft(WORK_TIME);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fff5f5] via-[#fff8f1] to-[#fff1f2] flex items-center justify-center px-4 py-10">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-100px] left-[-100px] w-[320px] h-[320px] bg-red-200 blur-[120px] opacity-40 rounded-full"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[320px] h-[320px] bg-orange-200 blur-[120px] opacity-40 rounded-full"></div>

      {/* FLOATING ICONS */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-20 left-16 hidden md:flex"
      >
        <Brain className="text-red-300" size={48} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute bottom-20 right-16 hidden md:flex"
      >
        <Coffee className="text-orange-300" size={48} />
      </motion.div>

      {/* MAIN CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-6xl bg-white/70 backdrop-blur-3xl border border-white/40 rounded-[40px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] overflow-hidden"
      >

        <div className="grid lg:grid-cols-2">

          {/* LEFT SECTION */}
          <div className="p-8 md:p-12 flex flex-col justify-center">

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold w-fit">

              <Timer size={16} />

              Productivity Mode

            </div>

            {/* TITLE */}
            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold text-slate-800 leading-tight">
              Focus <br />
              Better
            </h1>

            <p className="mt-5 text-slate-500 text-lg leading-relaxed max-w-lg">
              Improve concentration using the Pomodoro technique.
              Work deeply, relax properly, and avoid burnout.
            </p>

            {/* FEATURE BOXES */}
            <div className="mt-10 grid sm:grid-cols-2 gap-5">

              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-lg">

                <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">

                  <Brain className="text-red-500" />

                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-800">
                  Deep Focus
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  25-minute focus sessions improve productivity.
                </p>

              </div>

              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-lg">

                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

                  <Coffee className="text-green-500" />

                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-800">
                  Smart Breaks
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  Relax your brain with refreshing short breaks.
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT SECTION */}
          <div className="bg-gradient-to-br from-red-50/60 to-orange-100/60 p-8 md:p-12 flex items-center justify-center">

            <div className="w-full max-w-md bg-white rounded-[35px] p-8 shadow-2xl border border-white/50 text-center">

              {/* TOP ICON */}
              <motion.div
                animate={{
                  scale: isRunning ? [1, 1.08, 1] : 1,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center shadow-xl
                ${
                  isWork
                    ? "bg-gradient-to-br from-red-500 to-orange-500"
                    : "bg-gradient-to-br from-green-400 to-emerald-500"
                }`}
              >

                <span className="text-5xl">
                  {isWork ? "🍅" : "🌿"}
                </span>

              </motion.div>

              {/* MODE */}
              <h2
                className={`mt-6 text-3xl font-extrabold
                ${
                  isWork
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {isWork ? "Work Session" : "Break Time"}
              </h2>

              <p className="text-slate-500 mt-2">
                {isWork
                  ? "Stay focused on your task"
                  : "Relax and refresh your mind"}
              </p>

              {/* TIMER */}
              <div className="mt-10">

                <div className="text-7xl font-black tracking-wider text-slate-800">
                  {formatTime(timeLeft)}
                </div>

                {/* PROGRESS BAR */}
                <div className="w-full h-4 bg-slate-100 rounded-full mt-8 overflow-hidden">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className={`h-full rounded-full
                    ${
                      isWork
                        ? "bg-gradient-to-r from-red-400 to-orange-400"
                        : "bg-gradient-to-r from-green-400 to-emerald-400"
                    }`}
                  />

                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex gap-4 mt-10">

                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white shadow-lg transition-all
                  ${
                    isWork
                      ? "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                      : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  }`}
                >

                  {isRunning ? (
                    <>
                      <Pause size={18} />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play size={18} />
                      Start
                    </>
                  )}

                </button>

                <button
                  onClick={resetTimer}
                  className="flex items-center justify-center gap-2 px-6 bg-slate-100 hover:bg-slate-200 rounded-2xl font-semibold text-slate-700 transition-all"
                >

                  <RotateCcw size={18} />

                  Reset

                </button>

              </div>

              {/* FOOTER */}
              <div className="mt-8 bg-slate-50 rounded-2xl p-4 border border-slate-100">

                <p className="text-sm text-slate-500">
                  ⏱ 25 min focus • 5 min break cycle
                </p>

              </div>

            </div>

          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default PomodoroTimer;