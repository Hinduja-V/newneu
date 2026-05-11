import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  // TOP PRIORITY STRESS AREAS
  {
    id: "general",
    title: "General Wellness Assessment",
    subtitle: "GENERAL",
    description:
      "Understand your overall emotional wellness, stress, and mental balance.",
    image:
      "https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=1200&auto=format&fit=crop",
    buttonColor: "from-cyan-500 to-blue-600",
  },

  {
    id: "health",
    title: "Health Stress Assessment",
    subtitle: "HEALTH",
    description:
      "Identify anxiety and emotional stress related to physical health concerns.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    buttonColor: "from-emerald-500 to-teal-600",
  },

  {
    id: "money",
    title: "Financial Stress Assessment",
    subtitle: "MONEY",
    description:
      "Analyze emotional pressure caused by money, career, and financial instability.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
    buttonColor: "from-yellow-500 to-orange-500",
  },

  {
    id: "relationship",
    title: "Relationship Assessment",
    subtitle: "RELATIONSHIP",
    description:
      "Explore emotional difficulties in personal and social relationships.",
    image:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop",
    buttonColor: "from-pink-500 to-rose-500",
  },

  // EXTRA WELLNESS AREAS
  {
    id: "focus-growth",
    title: "Focus & Personal Growth",
    subtitle: "PERFORMANCE",
    description:
      "Understand productivity pressure, self-growth struggles, burnout, and performance stress.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    buttonColor: "from-violet-500 to-indigo-600",
  },

  {
    id: "sleep-energy",
    title: "Sleep & Energy Wellness",
    subtitle: "REST & ENERGY",
    description:
      "Analyze sleep quality, mental fatigue, emotional exhaustion, and low daily energy levels.",
    image:
      "https://geimshospital.com/wp-content/uploads/2025/09/How-to-Sleep-Fast.jpg",
    buttonColor: "from-sky-500 to-cyan-600",
  },

  {
    id: "safe-space",
    title: "Environment & Peace Assessment",
    subtitle: "ENVIRONMENT",
    description:
      "Explore how surroundings, noise, pressure, or toxic environments affect emotional wellness.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
    buttonColor: "from-green-500 to-emerald-600",
  },
];

const AssessmentCategory = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f7fb] py-16 px-6">
      {/* HEADING */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-5"
        >
          Choose Your Assessment
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed"
        >
          Select the area that is affecting your emotional wellness the most.
          Our AI-powered assessments help identify stress patterns, emotional
          challenges, and wellness insights.
        </motion.p>
      </div>

      {/* MAIN 4 CARDS */}
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-slate-800 mb-8">
          Major Emotional Stress Areas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.slice(0, 4).map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ y: -10 }}
              className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 cursor-pointer group transition-all duration-300 hover:shadow-2xl"
              onClick={() =>
                navigate(`/assessment/info/${category.id}`)
              }
            >
              {/* IMAGE */}
              <div className="overflow-hidden flex-shrink-0">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-3">
                  {category.subtitle}
                </p>

                <h2 className="text-3xl font-extrabold leading-tight text-slate-800 mb-4 group-hover:text-indigo-600 transition">
                  {category.title}
                </h2>

                <p className="text-slate-500 text-base leading-relaxed mb-6 flex-grow">
                  {category.description}
                </p>

                <button
                  className={`w-full bg-gradient-to-r ${category.buttonColor} text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-xl transition duration-300 mt-auto`}
                >
                  Start Assessment →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* EXTRA WELLNESS SECTION */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">
            Lifestyle & Wellness Assessments
          </h2>

          <p className="text-slate-500 text-lg">
            Explore additional emotional wellness areas related to lifestyle,
            environment, productivity, sleep, and personal growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.slice(4).map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 cursor-pointer group transition-all duration-300 hover:shadow-2xl"
              onClick={() =>
                navigate(`/assessment/info/${category.id}`)
              }
            >
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-violet-600 font-bold text-sm tracking-widest uppercase mb-3">
                  {category.subtitle}
                </p>

                <h2 className="text-3xl font-extrabold leading-tight text-slate-800 mb-4">
                  {category.title}
                </h2>

                <p className="text-slate-500 text-base leading-relaxed mb-6 flex-grow">
                  {category.description}
                </p>

                <button
                  className={`w-full bg-gradient-to-r ${category.buttonColor} text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-xl transition duration-300 mt-auto`}
                >
                  Explore Assessment →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentCategory;