import NavigationButtons from "../components/NavigationButtons";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function GamesPage() {
  const navigate = useNavigate();

  const quotes = [
    "Play, relax, and let your mind breathe.",
    "A calm mind begins with joyful moments.",
    "Relaxation is productive too.",
    "Games can heal the mind gently.",
    "Take a pause and enjoy the moment.",
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const games = [
    {
      title: "Breathing Bubble Game",
      path: "/games/breathing",
      category: "BREATHING",
      desc: "Calm your thoughts with relaxing breathing bubbles.",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
      button:
        "from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
    },
    {
      title: "Pop the Stress Ball",
      path: "/games/stress-ball",
      category: "STRESS RELIEF",
      desc: "Release tension and stress with satisfying pops.",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
      button:
        "from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700",
    },
    {
      title: "Bubble Wrap Pop Game",
      path: "/games/bubble-wrap",
      category: "RELAXATION",
      desc: "Enjoy satisfying bubble pops for instant relaxation.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
      button:
        "from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600",
    },
    {
      title: "Zen Color Tap Game",
      path: "/games/zen-color-tap",
      category: "FOCUS",
      desc: "Tap calming colors and improve mindfulness.",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
      button:
        "from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700",
    },
    {
      title: "Zen Garden / Sand Rake",
      path: "/games/zen-garden",
      category: "ZEN",
      desc: "Create peaceful patterns and relax your mind.",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
      button:
        "from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
    },
    {
      title: "Cube Games",
      path: "/games/cube",
      category: "PUZZLE",
      desc: "Sharpen your focus with relaxing puzzle games.",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
      button:
        "from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 px-6 md:px-10 py-10">

      {/* HEADING */}
      <div className="text-center mb-14">

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight">
          Relaxation Games
        </h1>

        {/* QUOTE */}
        <div className="max-w-3xl mx-auto mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-lg rounded-3xl px-8 py-6 text-slate-600 italic text-lg md:text-xl border border-slate-200"
            >
              “{quotes[quoteIndex]}”
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* GAME CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {games.map((game, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >

            {/* IMAGE */}
            <div className="h-[270px] overflow-hidden">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* CONTENT */}
            <div className="p-8">

              <p className="text-emerald-600 font-bold tracking-[3px] text-sm uppercase mb-4">
                {game.category}
              </p>

              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                {game.title}
              </h2>

              <p className="mt-5 text-slate-500 text-lg leading-relaxed">
                {game.desc}
              </p>

              {/* BUTTON */}
              <button
                onClick={() => navigate(game.path)}
                className={`mt-10 w-full py-4 rounded-2xl text-white font-bold text-lg shadow-md bg-gradient-to-r transition-all duration-300 ${game.button}`}
              >
                Start Game →
              </button>

            </div>

          </motion.div>
        ))}

      </div>

      {/* NAVIGATION */}
      <div className="mt-16 flex justify-center">
        <NavigationButtons />
      </div>

    </div>
  );
}