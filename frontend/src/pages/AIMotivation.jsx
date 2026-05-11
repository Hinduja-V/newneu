import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AIMotivation() {

  const navigate = useNavigate();

  const quotes = [
    {
      text: "You are stronger than you think",
      emoji: "💪",
      color: "from-blue-400 to-cyan-400",
    },
    {
      text: "Small steps every day create big change",
      emoji: "🌱",
      color: "from-green-400 to-emerald-400",
    },
    {
      text: "Your future depends on your today",
      emoji: "🚀",
      color: "from-purple-400 to-pink-400",
    },
    {
      text: "Stay consistent, success will follow",
      emoji: "🎯",
      color: "from-orange-400 to-amber-400",
    },
    {
      text: "Discipline beats motivation",
      emoji: "🔥",
      color: "from-rose-400 to-red-400",
    },
    {
      text: "Peace begins with a calm mind",
      emoji: "🧘",
      color: "from-sky-400 to-indigo-400",
    },
    {
      text: "You are doing better than you think",
      emoji: "🌸",
      color: "from-pink-400 to-fuchsia-400",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#eef6ff] via-[#f5f3ff] to-[#ecfeff] px-6 py-10">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-blue-200 blur-[120px] opacity-40 rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-200 blur-[120px] opacity-40 rounded-full"></div>

      {/* TOP BAR */}
      <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between mb-10">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            ✨ AI Motivation Space
          </h1>

          <p className="text-slate-500 mt-2 text-lg">
            Calm your thoughts • Build confidence • Stay positive
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-white shadow-lg rounded-2xl hover:scale-105 transition font-medium text-slate-700"
        >
          ⬅ Back
        </button>

      </div>

      {/* HERO CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-7xl mx-auto bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[40px] shadow-2xl overflow-hidden"
      >

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-2 gap-10 p-10">

          {/* LEFT */}
          <div className="flex flex-col justify-center">

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl font-bold leading-tight text-slate-800"
            >
              Daily Motivation <br />
              For Mental Wellness 🌿
            </motion.h2>

            <p className="mt-6 text-slate-500 text-lg leading-relaxed">
              Positive thoughts can improve mental health,
              reduce stress, and build emotional strength.
              Read a quote every day and stay inspired.
            </p>

            {/* FEATURE BOXES */}
            <div className="grid grid-cols-2 gap-4 mt-8">

              <div className="bg-white rounded-3xl p-5 shadow-md">
                <div className="text-3xl mb-2">🧠</div>

                <h3 className="font-semibold text-slate-700">
                  Positive Thinking
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Train your mind for calmness
                </p>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-md">
                <div className="text-3xl mb-2">💖</div>

                <h3 className="font-semibold text-slate-700">
                  Mental Wellness
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Build confidence every day
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            className="flex items-center justify-center"
          >

            <img
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop"
              alt="motivation"
              className="w-full max-w-md rounded-[40px] shadow-2xl object-cover"
            />

          </motion.div>

        </div>

        {/* QUOTES SECTION */}
        <div className="px-10 pb-10">

          <div className="flex items-center justify-between mb-8">

            <div>
              <h3 className="text-3xl font-bold text-slate-800">
                🌟 Motivation Quotes
              </h3>

              <p className="text-slate-500 mt-1">
                Read slowly and absorb positivity
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow">
              <span className="text-2xl">☀️</span>

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Daily Reminder
                </p>

                <p className="text-xs text-slate-500">
                  Stay calm & focused
                </p>
              </div>
            </div>

          </div>

          {/* QUOTE GRID */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {quotes.map((quote, i) => (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                }}
                className="relative overflow-hidden rounded-[30px] shadow-lg bg-white p-6 border border-white/40"
              >

                {/* GLOW */}
                <div
                  className={`absolute inset-0 opacity-10 bg-gradient-to-br ${quote.color}`}
                ></div>

                {/* CONTENT */}
                <div className="relative z-10">

                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${quote.color} flex items-center justify-center text-2xl shadow-md mb-5`}
                  >
                    {quote.emoji}
                  </div>

                  <p className="text-slate-700 text-lg font-medium leading-relaxed">
                    “{quote.text}”
                  </p>

                  <div className="mt-5 flex items-center justify-between">

                    <span className="text-xs text-slate-400">
                      AI Motivation
                    </span>

                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                      <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                      <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                    </div>

                  </div>

                </div>

              </motion.div>
            ))}

          </div>

          {/* FOOTER */}
          <div className="mt-10 text-center">

            <p className="text-slate-500 text-sm">
              🌿 Positive words create positive minds
            </p>

            <button
              onClick={() => navigate("/dashboard")}
              className="mt-5 px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              Back to Dashboard ➜
            </button>

          </div>

        </div>

      </motion.div>

    </div>
  );
}