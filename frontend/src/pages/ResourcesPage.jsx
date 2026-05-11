import NavigationButtons from "../components/NavigationButtons";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ResourcesPage() {
  const navigate = useNavigate();

  const quotes = [
    "You are not alone — support is always available.",
    "Healing begins when you ask for support.",
    "Mental wellness matters every single day.",
    "Small support can create big positive change.",
    "Your feelings are valid and important.",
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const resources = [
    {
      title: "Mental Support",
      desc: "Learn and understand emotional well-being and mental health.",
      path: "/mental-health",
      category: "SUPPORT",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
      button:
        "from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700",
    },

    {
      title: "Self Help Suggestions",
      desc: "Discover daily habits to improve your mental wellness.",
      path: "/self-help",
      category: "SELF CARE",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
      button:
        "from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
    },

    {
      title: "Counsellor Support",
      desc: "Connect with professional counsellors for guidance.",
      path: "/counsellor",
      category: "COUNSELLING",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop",
      button:
        "from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700",
    },

    {
      title: "Helpline Support",
      desc: "Immediate help and support during difficult situations.",
      path: "/sos",
      category: "HELPLINE",
      image:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
      button:
        "from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 px-6 md:px-10 py-10">

      {/* HEADING */}
      <div className="text-center mb-14">

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight">
          Mental Health Resources
        </h1>

        <p className="mt-4 text-slate-500 text-lg">
          Find guidance, support, and resources for better mental wellness
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-6xl mx-auto">

        {resources.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
          >

            {/* IMAGE */}
            <div className="h-[280px] overflow-hidden">
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

              <h2 className="text-3xl font-extrabold text-slate-900">
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
                Explore Support →
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