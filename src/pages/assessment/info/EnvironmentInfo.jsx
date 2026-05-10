import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaHome,
  FaBrain,
  FaShieldAlt,
  FaArrowRight,
  FaCloudSun,
} from "react-icons/fa";

const EnvironmentInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
      {/* HERO SECTION */}
      <div className="relative w-full h-[520px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop"
          alt="Environment and Peace Wellness"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />

        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-300 font-bold tracking-[4px] uppercase mb-5"
          >
            Environment & Peace Assessment
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight max-w-5xl"
          >
            Understand How Your Environment Affects Emotional Wellness
          </motion.h1>

          <div className="mt-8 flex flex-col md:flex-row md:items-end gap-8 md:gap-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-lg md:text-xl max-w-3xl leading-relaxed"
            >
              Noise, pressure, toxic surroundings, emotional instability, social
              stress, or an unhealthy environment can silently affect emotional
              balance, peace of mind, concentration, and mental wellness. This
              assessment helps identify environmental stress patterns and their
              emotional impact.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => navigate("/assessment/safe-space")}
              className="whitespace-nowrap bg-white/20 backdrop-blur-xl border border-white/30 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:bg-white/30 hover:border-white/50 transition-all duration-300 flex items-center gap-3 group h-fit"
            >
            Start Environment Assessment
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* SECTION 1 */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1200&auto=format&fit=crop"
              alt="Peaceful Environment"
              className="rounded-3xl shadow-2xl w-full h-[430px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              Why Environment & Peace Matter
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              The environment around us strongly influences emotional wellness,
              stress levels, focus, sleep quality, and emotional stability.
              Toxic surroundings, constant noise, pressure, emotional tension,
              or lack of peace can increase anxiety and emotional exhaustion.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Emotional wellness research shows that safe, peaceful, and
              supportive environments improve emotional balance, mental clarity,
              confidence, and overall well-being. Early awareness helps users
              identify hidden environmental stress patterns.
            </p>

            <div className="border-l-4 border-green-500 bg-green-50 rounded-r-xl p-5">
              <p className="text-slate-700 font-semibold text-lg leading-relaxed">
                “A peaceful environment supports emotional healing, mental
                clarity, and healthy emotional balance.”
              </p>
            </div>

            <p className="text-sm text-slate-500 mt-4">
              Inspired by emotional wellness and environmental psychology
              research.
            </p>
          </motion.div>
        </div>

        {/* HIGHLIGHT CARDS */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-24 border border-slate-100">
          <div className="flex items-center gap-4 mb-10">
            <FaLeaf className="text-green-500 text-4xl" />

            <h2 className="text-4xl font-extrabold">
              Common Signs of Environmental Stress
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaHome />,
                title: "Uncomfortable Surroundings",
                text: "Feeling emotionally unsafe or stressed in daily spaces.",
              },
              {
                icon: <FaBrain />,
                title: "Mental Overload",
                text: "Difficulty relaxing due to constant pressure or noise.",
              },
              {
                icon: <FaCloudSun />,
                title: "Lack of Peace",
                text: "Feeling emotionally restless or mentally exhausted.",
              },
              {
                icon: <FaShieldAlt />,
                title: "Emotional Tension",
                text: "Stress caused by toxic or emotionally draining spaces.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
              >
                <div className="text-green-500 text-3xl mb-4">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RESEARCH SECTION */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-24">
          <div>
            <h2 className="text-4xl font-extrabold mb-6">
              Environmental Wellness & Mental Health Research
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Emotional wellness tools and stress assessments help identify how
              surroundings, environmental pressure, social stress, and emotional
              atmosphere affect mental wellness, emotional stability, and
              overall quality of life.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Mental wellness experts explain that emotionally supportive and
              peaceful environments improve resilience, emotional recovery,
              confidence, relaxation, and healthy daily functioning.
            </p>

            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-7 mt-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-3">
                Why Emotional Safety Matters
              </h3>

              <p className="leading-relaxed text-white/90">
                Calm surroundings, emotional safety, peaceful spaces, and
                healthy environments support emotional recovery, reduce stress,
                improve focus, and strengthen mental wellness.
              </p>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200&auto=format&fit=crop"
              alt="Nature and Peace"
              className="rounded-3xl shadow-2xl w-full h-[450px] object-cover"
            />
          </div>
        </div>

        {/* STATUS / INFO SECTION */}
        <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-10 mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-2xl mb-3">
                Assessment Duration
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Approximately 3–5 minutes.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-2xl mb-3">
                What You’ll Receive
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Personalized environmental wellness insights, emotional stress
                analysis, peace evaluation, and AI-powered wellness
                recommendations.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-2xl mb-3">
                Privacy & Security
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Your responses remain secure, private, and protected throughout
                the assessment experience.
              </p>
            </div>
          </div>
        </div>

        {/* FINAL CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
         
          <p className="text-slate-500 mt-6">
            Emotional peace begins with a healthy and supportive environment.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default EnvironmentInfo;