import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SelfHelpSuggestions() {
  const navigate = useNavigate();

  const tips = [
    {
      emoji: "🌬️",
      title: "Deep Breathing",
      desc: "Practice 4-7-8 breathing to calm your nervous system instantly.",
      color: "from-sky-400 to-blue-500",
    },
    {
      emoji: "🚶",
      title: "Daily Walk",
      desc: "A short walk in fresh air boosts mood and clears your thoughts.",
      color: "from-emerald-400 to-green-500",
    },
    {
      emoji: "📝",
      title: "Write Your Thoughts",
      desc: "Journaling helps release emotional pressure and overthinking.",
      color: "from-pink-400 to-rose-500",
    },
    {
      emoji: "🎧",
      title: "Calm Music",
      desc: "Soft music and nature sounds help your brain relax peacefully.",
      color: "from-violet-400 to-purple-500",
    },
    {
      emoji: "📱",
      title: "Reduce Screen Time",
      desc: "Avoid excessive mobile usage before sleep for better rest.",
      color: "from-orange-400 to-amber-500",
    },
    {
      emoji: "🌙",
      title: "Proper Sleep",
      desc: "Good sleep refreshes your mind and reduces mental stress.",
      color: "from-indigo-400 to-blue-600",
    },
    {
      emoji: "🥗",
      title: "Healthy Food",
      desc: "Nutritious food and hydration improve emotional balance.",
      color: "from-lime-400 to-green-500",
    },
    {
      emoji: "🧘",
      title: "Meditation",
      desc: "Just 5 minutes daily improves focus and inner calmness.",
      color: "from-fuchsia-400 to-pink-500",
    },
    {
      emoji: "💬",
      title: "Talk to Someone",
      desc: "Sharing feelings reduces emotional burden and loneliness.",
      color: "from-cyan-400 to-sky-500",
    },
    {
      emoji: "💖",
      title: "Self Acceptance",
      desc: "Be kind to yourself. Progress matters more than perfection.",
      color: "from-rose-400 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-violet-100 px-5 py-10">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-blue-200/40 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-200/40 blur-[120px] rounded-full"></div>

      {/* HEADER */}
      <div className="relative z-10 text-center mb-10">

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-slate-800 mb-3"
        >
          🌿 Self Help Suggestions
        </motion.h1>

        <p className="text-slate-500 max-w-2xl mx-auto">
          Small healthy habits can slowly improve mental well-being,
          reduce stress, and create inner peace 💙
        </p>

      </div>

      {/* CARDS */}
      <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {tips.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            transition={{ duration: 0.25 }}
            className="group relative overflow-hidden bg-white/70 backdrop-blur-2xl border border-white/50 shadow-xl rounded-3xl p-6"
          >

            {/* TOP ICON */}
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color}
              flex items-center justify-center text-3xl shadow-lg mb-5`}
            >
              {item.emoji}
            </div>

            {/* TITLE */}
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              {item.title}
            </h2>

            {/* DESC */}
            <p className="text-sm leading-relaxed text-slate-600">
              {item.desc}
            </p>

            {/* HOVER LIGHT */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-white/10"></div>

          </motion.div>
        ))}

      </div>

      {/* FOOTER MESSAGE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 mt-12 text-center"
      >

        <div className="inline-block px-6 py-4 bg-white/60 backdrop-blur-xl rounded-2xl shadow-md border border-white/40">

          <p className="text-slate-600 text-sm">
            ✨ Healing is not instant. Small peaceful habits every day create
            a stronger and calmer mind.
          </p>

        </div>

      </motion.div>

      {/* NAVIGATION */}
      <div className="relative z-10 mt-12 flex justify-center gap-5">

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/mental-health")}
          className="px-7 py-3 rounded-2xl bg-white shadow-lg border border-gray-200 text-slate-700 font-medium"
        >
          ← Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/counsellor")}
          className="px-7 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl font-medium"
        >
          Next →
        </motion.button>

      </div>
    </div>
  );
}