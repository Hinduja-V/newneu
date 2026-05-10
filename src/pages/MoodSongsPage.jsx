import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavigationButtons from "../components/NavigationButtons";

export default function MoodSongsPage() {
  const [mood, setMood] = useState("");

  const moods = {
    happy: {
      video: "ZbZSe6N_BXs",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
      quote: "Happiness sounds better with music 🎵",
      color: "from-yellow-500 to-orange-500",
    },

    sad: {
      video: "hoNb6HuNmU0",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
      quote: "Music understands feelings words cannot express 💙",
      color: "from-blue-500 to-indigo-600",
    },

    calm: {
      video: "2OEL4P1Rz04",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
      quote: "Relax your thoughts and breathe peacefully 🌿",
      color: "from-green-500 to-emerald-600",
    },

    focus: {
      video: "lFcSrYw-ARY",
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop",
      quote: "Stay focused and let your mind flow 🎯",
      color: "from-purple-500 to-indigo-600",
    },
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 md:px-10 py-10">

      {/* HEADER */}
      <div className="text-center mb-12">

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight">
          Mood Music Therapy
        </h1>

        <p className="mt-4 text-slate-500 text-lg">
          Select your mood and let music heal your mind
        </p>

      </div>

      {/* MOOD SELECT */}
      <div className="flex justify-center mb-12">

        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="bg-white border border-slate-200 shadow-lg rounded-2xl px-6 py-4 text-slate-700 text-lg outline-none focus:ring-2 focus:ring-indigo-400 min-w-[250px]"
        >
          <option value="">Select Your Mood 😊</option>
          <option value="happy">😊 Happy</option>
          <option value="sad">😔 Sad</option>
          <option value="calm">🌿 Calm</option>
          <option value="focus">🎯 Focus</option>
        </select>

      </div>

      {/* CONTENT */}
      <AnimatePresence>

        {mood && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-6xl mx-auto bg-white rounded-[35px] overflow-hidden shadow-2xl"
          >

            {/* IMAGE */}
            <div className="relative h-[320px] overflow-hidden">

              <img
                src={moods[mood].image}
                alt={mood}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/35 flex items-center justify-center">

                <div className="text-center px-6">

                  <h2 className="text-4xl md:text-5xl font-extrabold text-white capitalize">
                    {mood} Mood
                  </h2>

                  <p className="mt-4 text-white/90 text-lg italic">
                    “{moods[mood].quote}”
                  </p>

                </div>

              </div>

            </div>

            {/* VIDEO SECTION */}
            <div className="p-8 md:p-10">

              <div
                className={`inline-block px-5 py-2 rounded-full text-white font-semibold bg-gradient-to-r ${moods[mood].color}`}
              >
                Music Therapy Session 🎶
              </div>

              <h3 className="mt-6 text-3xl font-extrabold text-slate-800">
                Relax & Enjoy Your Music
              </h3>

              <p className="mt-3 text-slate-500 text-lg leading-relaxed">
                Let calming sounds guide your emotions, improve your mood,
                and bring peace to your mind.
              </p>

              {/* VIDEO */}
              <div className="mt-8 overflow-hidden rounded-3xl shadow-xl">

                <iframe
                  className="w-full h-[450px]"
                  src={`https://www.youtube.com/embed/${moods[mood].video}`}
                  title="Mood Music"
                  allowFullScreen
                />

              </div>

            </div>

          </motion.div>
        )}

      </AnimatePresence>

      {/* NAVIGATION */}
      <div className="mt-16 flex justify-center">
        <NavigationButtons />
      </div>

    </div>
  );
}