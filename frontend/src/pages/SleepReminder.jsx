import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Moon,
  Stars,
  AlarmClock,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  CloudMoon,
} from "lucide-react";

const SleepReminder = () => {
  const [time, setTime] = useState("");
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(false);

  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  // Notification Permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Timer
  useEffect(() => {
    if (!active || !time) return;

    intervalRef.current = setInterval(() => {
      const now = new Date();

      const currentIST = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      if (currentIST === time) {
        triggerSleep();
        stopTimer();
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [active, time]);

  // Trigger Sleep
  const triggerSleep = () => {
    setMessage("🌙 Time to sleep peacefully... Good Night!");

    if (Notification.permission === "granted") {
      new Notification("🌙 Sleep Reminder", {
        body: "Relax and sleep peacefully 💤",
      });
    }

    playAudio();
  };

  // Play Audio
  const playAudio = async () => {
    if (!audioRef.current || !soundEnabled) return;

    try {
      audioRef.current.volume = 0.5;
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
    } catch (err) {
      console.log(err);
    }
  };

  // Enable Sound
  const unlockAudio = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      setSoundEnabled(true);
      setMessage("🔊 Sleep sound enabled");
    } catch (err) {
      console.log(err);
    }
  };

  // Start
  const startTimer = () => {
    if (!time) {
      alert("Please select sleep time");
      return;
    }

    setActive(true);
    setMessage("⏳ Sleep timer started");
  };

  // Stop
  const stopTimer = () => {
    setActive(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setMessage("⏸ Sleep timer stopped");
  };

  // Reset
  const resetTimer = () => {
    stopTimer();
    setTime("");

    setMessage("🔄 Sleep timer reset");

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#eef4ff] via-[#f6f8ff] to-[#ece8ff] flex items-center justify-center px-4 py-10">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-blue-200 blur-[130px] opacity-40 rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-purple-200 blur-[130px] opacity-40 rounded-full"></div>

      {/* STARS */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        >
          <Stars size={10} className="text-white/70" />
        </div>
      ))}

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-6xl bg-white/70 backdrop-blur-3xl border border-white/40 rounded-[40px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] overflow-hidden"
      >

        <div className="grid lg:grid-cols-2">

          {/* LEFT SECTION */}
          <div className="relative p-8 md:p-12 flex flex-col justify-center">

            {/* TOP BADGE */}
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold w-fit">

              <Moon size={16} />

              Sleep Wellness

            </div>

            {/* TITLE */}
            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold text-slate-800 leading-tight">
              Sleep <br />
              Better
            </h1>

            <p className="mt-5 text-slate-500 text-lg leading-relaxed max-w-lg">
              Build a peaceful bedtime routine with reminders,
              relaxing sounds, and a calm sleep atmosphere.
            </p>

            {/* FEATURE CARDS */}
            <div className="mt-10 grid sm:grid-cols-2 gap-5">

              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-lg">

                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">

                  <AlarmClock className="text-indigo-600" />

                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-800">
                  Smart Reminder
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  Set your bedtime and receive peaceful reminders.
                </p>

              </div>

              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-lg">

                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">

                  <CloudMoon className="text-purple-600" />

                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-800">
                  Calm Sleep Sound
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  Enjoy relaxing rain ambience while sleeping.
                </p>

              </div>

            </div>

            {/* MOON VISUAL */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute top-10 right-10 hidden lg:flex"
            >

              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-50 shadow-[0_0_80px_rgba(255,255,255,0.8)] flex items-center justify-center">

                <Moon className="text-yellow-400" size={48} />

              </div>

            </motion.div>

          </div>

          {/* RIGHT SECTION */}
          <div className="bg-gradient-to-br from-indigo-50/60 to-purple-100/60 p-8 md:p-12 flex items-center justify-center">

            <div className="w-full max-w-md bg-white rounded-[35px] p-8 shadow-2xl border border-white/50">

              {/* ICON */}
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-xl">

                <Moon className="text-white" size={42} />

              </div>

              {/* TITLE */}
              <h2 className="mt-6 text-3xl font-extrabold text-center text-slate-800">
                Sleep Timer
              </h2>

              <p className="text-center text-slate-500 mt-2">
                Relax and prepare for restful sleep
              </p>

              {/* TIME INPUT */}
              <div className="mt-8">

                <label className="text-sm text-slate-500">
                  Choose Bedtime
                </label>

                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full mt-3 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-300 text-slate-700 shadow-sm"
                />

              </div>

              {/* BUTTONS */}
              <div className="mt-6 space-y-4">

                <button
                  onClick={startTimer}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg transition-all"
                >

                  <Play size={18} />

                  Start Timer

                </button>

                <button
                  onClick={stopTimer}
                  className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold py-3 rounded-2xl transition-all"
                >

                  <Pause size={18} />

                  Stop Timer

                </button>

                <button
                  onClick={resetTimer}
                  className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-2xl transition-all"
                >

                  <RotateCcw size={18} />

                  Reset Timer

                </button>

              </div>

              {/* SOUND */}
              <button
                onClick={unlockAudio}
                className="mt-5 w-full flex items-center justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-700 py-3 rounded-2xl font-medium transition-all"
              >

                <Volume2 size={18} />

                Enable Sleep Sound

              </button>

              {/* STATUS */}
              {message && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 bg-green-50 border border-green-100 text-green-700 p-4 rounded-2xl text-center font-medium"
                >

                  {message}

                </motion.div>
              )}

              {/* NOTE */}
              <p className="text-center text-xs text-slate-400 mt-5">
                Recommended sleep: 7–8 hours daily 🌙
              </p>

              {/* AUDIO */}
              <audio ref={audioRef} loop preload="auto">
                <source
                  src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b3d1d7c3.mp3?filename=rain-and-thunder-ambient-ambient-sound-11001.mp3"
                  type="audio/mpeg"
                />
              </audio>

            </div>

          </div>

        </div>

      </motion.div>

    </div>
  );
}

export default SleepReminder;