import NavigationButtons from "../components/NavigationButtons";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RelaxingPage() {
  const navigate = useNavigate();

  const quotes = [
    "Relax, refresh, and recharge your mind.",
    "Peace begins with a calm moment.",
    "Your mind deserves quiet and comfort.",
    "Take a pause and let yourself breathe.",
    "Relaxation is healing for the soul.",
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    {
      title: "Calm Music",
      path: "/calm-music",
      category: "MUSIC",
      desc: "Relax your mind with peaceful calming music.",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
      button:
        "from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700",
    },
    {
      title: "AI Videos",
      path: "/ai-videos",
      category: "VIDEOS",
      desc: "Watch soothing visuals and peaceful relaxing scenes.",
      image:
        "https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=1200&auto=format&fit=crop",
      button:
        "from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700",
    },
    {
      title: "AI Motivation",
      path: "/ai-motivation",
      category: "MOTIVATION",
      desc: "Boost positivity with uplifting motivational content.",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
      button:
        "from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 px-6 md:px-10 py-10">

      {/* HEADING */}
      <div className="text-center mb-14">

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight">
          Relaxing Zone
        </h1>

        <p className="mt-4 text-slate-500 text-lg">
          Choose what helps you feel calm and peaceful
        </p>

        {/* QUOTE */}
        <div className="max-w-3xl mx-auto mt-8">
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

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {items.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >

            {/* IMAGE */}
            <div className="h-[260px] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* CONTENT */}
            <div className="p-8">

              <p className="text-emerald-600 font-bold tracking-[3px] text-sm uppercase mb-4">
                {item.category}
              </p>

              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                {item.title}
              </h2>

              <p className="mt-5 text-slate-500 text-lg leading-relaxed">
                {item.desc}
              </p>

              {/* BUTTON */}
              <button
                onClick={() => navigate(item.path)}
                className={`mt-10 w-full py-4 rounded-2xl text-white font-bold text-lg shadow-md bg-gradient-to-r transition-all duration-300 ${item.button}`}
              >
                Explore Now →
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