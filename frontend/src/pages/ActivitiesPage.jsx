import NavigationButtons from "../components/NavigationButtons";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ActivitiesPage() {
  const navigate = useNavigate();

  const quotes = [
    "Take a deep breath. It’s just a bad moment, not a bad life.",
    "Healing begins when you choose to pause.",
    "Peace starts with one mindful breath.",
    "Your mind deserves the same care as your body.",
    "Small steps every day lead to big healing.",
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
      title: "Whiteboard Activities",
      path: "/whiteboard",
      category: "CREATIVITY",
      desc: "Express your thoughts freely and release emotions creatively.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      button:
        "from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
    },
    {
      title: "Breathing Exercise",
      path: "/breathing",
      category: "HEALTH",
      desc: "Reduce stress and calm your mind with deep breathing.",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
      button:
        "from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
    },
    {
      title: "Short Meditation",
      path: "/meditation",
      category: "MINDFULNESS",
      desc: "Find inner peace and emotional balance through mindfulness.",
      image:
        "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1200&auto=format&fit=crop",
      button:
        "from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700",
    },
    {
      title: "Gratitude Activities",
      path: "/gratitude",
      category: "POSITIVITY",
      desc: "Build positivity and happiness with gratitude exercises.",
      image:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop",
      button:
        "from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-700",
    },
    {
      title: "Sleep Relaxation",
      path: "/sleep",
      category: "SLEEP",
      desc: "Improve sleep quality and recharge your mental energy.",
      image:
        "https://images.unsplash.com/photo-1511296265581-c2450046447d?q=80&w=1200&auto=format&fit=crop",
      button:
        "from-indigo-500 to-blue-700 hover:from-indigo-600 hover:to-blue-800",
    },
    {
      title: "Pomodoro Timer",
      path: "/pomodoro",
      category: "FOCUS",
      desc: "Boost productivity using focused work and mindful breaks.",
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop",
      button:
        "from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 px-6 md:px-10 py-10">

      {/* HEADING */}
      <div className="text-center mb-14">

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight">
          Wellness Activities
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

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {items.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >

            {/* IMAGE */}
            <div className="h-[270px] overflow-hidden">
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
                Start Activity →
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