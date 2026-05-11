import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Smile,
  RefreshCcw,
  Flower2,
} from "lucide-react";

export default function GratitudeActivity() {
  const [entries, setEntries] = useState(["", "", ""]);
  const [submitted, setSubmitted] = useState(false);
  const [mood, setMood] = useState("");

  const prompts = [
    "What made you smile today?",
    "Who are you thankful for today?",
    "What peaceful moment did you enjoy?",
    "What positive thing happened today?",
    "What are you proud of today?",
  ];

  const randomPrompt =
    prompts[Math.floor(Math.random() * prompts.length)];

  const handleChange = (i, value) => {
    const updated = [...entries];
    updated[i] = value;
    setEntries(updated);
  };

  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😌", label: "Peaceful" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "😔", label: "Low" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-100 px-4 py-10 flex items-center justify-center">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-pink-200 blur-[120px] opacity-50 rounded-full"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-purple-200 blur-[120px] opacity-50 rounded-full"></div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-5xl bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[40px] shadow-2xl overflow-hidden"
      >

        <div className="grid lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="p-8 md:p-10 flex flex-col justify-center">

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-semibold w-fit">

              <Sparkles size={16} />

              Daily Gratitude

            </div>

            {/* TITLE */}
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold text-slate-800 leading-tight">
              Gratitude <br />
              Journal
            </h1>

            <p className="mt-5 text-slate-500 text-lg leading-relaxed">
              Take a moment to appreciate the positive things in your life
              and create peaceful thoughts for your mind.
            </p>

            {/* PROMPT CARD */}
            <div className="mt-10 bg-white rounded-3xl border border-pink-100 p-6 shadow-lg">

              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center">

                  <Heart className="text-pink-600" size={28} />

                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Reflection Prompt
                  </p>

                  <h2 className="text-xl font-bold text-slate-800">
                    "{randomPrompt}"
                  </h2>

                </div>

              </div>

            </div>

            {/* MOOD */}
            <div className="mt-8">

              <p className="text-slate-600 font-semibold mb-4">
                How are you feeling today?
              </p>

              <div className="flex gap-4 flex-wrap">

                {moods.map((m) => (
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    key={m.emoji}
                    onClick={() => setMood(m.emoji)}
                    className={`flex flex-col items-center justify-center w-20 h-20 rounded-2xl transition-all border
                    ${
                      mood === m.emoji
                        ? "bg-gradient-to-br from-pink-500 to-purple-500 text-white border-transparent shadow-xl"
                        : "bg-white border-slate-100 hover:bg-pink-50"
                    }`}
                  >

                    <span className="text-3xl">
                      {m.emoji}
                    </span>

                    <span className="text-xs mt-1 font-medium">
                      {m.label}
                    </span>

                  </motion.button>
                ))}

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-gradient-to-br from-pink-100/50 to-purple-100/50 p-8 md:p-10 flex items-center justify-center">

            <AnimatePresence mode="wait">

              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="w-full bg-white rounded-[35px] p-8 shadow-2xl border border-white/40"
                >

                  <div className="flex items-center gap-3 mb-6">

                    <Flower2 className="text-purple-500" size={28} />

                    <h2 className="text-2xl font-bold text-slate-800">
                      Write Your Gratitude
                    </h2>

                  </div>

                  {/* INPUTS */}
                  <div className="space-y-5">

                    {entries.map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        className="bg-slate-50 border border-slate-100 rounded-2xl p-4 shadow-sm"
                      >

                        <label className="text-sm text-slate-500">
                          Gratitude {i + 1}
                        </label>

                        <textarea
                          value={item}
                          onChange={(e) =>
                            handleChange(i, e.target.value)
                          }
                          placeholder="Write something meaningful..."
                          className="w-full mt-2 bg-transparent outline-none resize-none text-slate-700"
                          rows={2}
                        />

                      </motion.div>
                    ))}

                  </div>

                  {/* BUTTON */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSubmitted(true)}
                    className="mt-8 w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 rounded-2xl shadow-xl"
                  >

                    Save Reflection

                  </motion.button>

                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full bg-white rounded-[35px] p-8 shadow-2xl border border-white/40 text-center"
                >

                  {/* ICON */}
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-xl">

                    <Smile className="text-white" size={40} />

                  </div>

                  {/* TITLE */}
                  <h2 className="mt-6 text-3xl font-extrabold text-slate-800">
                    Your Gratitude Reflection
                  </h2>

                  <p className="text-slate-500 mt-3">
                    Small positive moments create a peaceful mind 🌸
                  </p>

                  {/* ENTRIES */}
                  <div className="mt-8 space-y-4 text-left">

                    {entries.map((e, i) => (
                      <div
                        key={i}
                        className="bg-pink-50 border border-pink-100 rounded-2xl p-4"
                      >

                        <p className="text-sm text-pink-500 mb-1">
                          Gratitude {i + 1}
                        </p>

                        <p className="text-slate-700">
                          {e || "—"}
                        </p>

                      </div>
                    ))}

                  </div>

                  {/* MOOD */}
                  <div className="mt-8">

                    <p className="text-slate-500 mb-2">
                      Your Mood
                    </p>

                    <div className="text-5xl">
                      {mood || "😊"}
                    </div>

                  </div>

                  {/* RESET */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setEntries(["", "", ""]);
                      setSubmitted(false);
                      setMood("");
                    }}
                    className="mt-8 inline-flex items-center gap-3 bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg"
                  >

                    <RefreshCcw size={18} />

                    Write Again

                  </motion.button>

                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>

      </motion.div>

    </div>
  );
}