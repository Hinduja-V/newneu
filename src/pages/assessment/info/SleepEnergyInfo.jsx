import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaMoon,
  FaBed,
  FaBolt,
  FaBrain,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";

const SleepEnergyInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
      {/* HERO SECTION */}
      <div className="relative w-full h-[520px] overflow-hidden">
        <img
          src="https://geimshospital.com/wp-content/uploads/2025/09/How-to-Sleep-Fast.jpg"
          alt="Sleep and Energy Wellness"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />

        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-cyan-300 font-bold tracking-[4px] uppercase mb-5"
          >
            Sleep & Energy Wellness
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight max-w-5xl"
          >
            Understand Sleep Problems, Fatigue & Mental Exhaustion
          </motion.h1>

          <div className="mt-8 flex flex-col md:flex-row md:items-end gap-8 md:gap-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-lg md:text-xl max-w-3xl leading-relaxed"
            >
              Poor sleep quality, emotional exhaustion, low energy, and mental
              fatigue can strongly affect emotional wellness, focus, mood, and
              daily productivity. This assessment helps identify emotional and
              lifestyle patterns connected to sleep and energy imbalance.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => navigate("/assessment/sleep-energy")}
              className="whitespace-nowrap bg-white/20 backdrop-blur-xl border border-white/30 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:bg-white/30 hover:border-white/50 transition-all duration-300 flex items-center gap-3 group h-fit"
            >
              Start Sleep wellness Assessment
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
              src="https://images.unsplash.com/photo-1494173853739-c21f58b16055?q=80&w=1200&auto=format&fit=crop"
              alt="Sleep Stress"
              className="rounded-3xl shadow-2xl w-full h-[430px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              Why Sleep & Energy Balance Matters
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Lack of proper sleep and constant mental exhaustion can affect
              emotional balance, memory, concentration, productivity, and daily
              motivation. Emotional stress and anxiety often contribute to sleep
              disturbances and energy loss.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Emotional wellness research shows that poor sleep quality is
              closely connected to stress, burnout, anxiety, emotional fatigue,
              and reduced mental resilience. Early awareness helps prevent
              long-term emotional exhaustion.
            </p>

            <div className="border-l-4 border-cyan-500 bg-cyan-50 rounded-r-xl p-5">
              <p className="text-slate-700 font-semibold text-lg leading-relaxed">
                “Rest is not a luxury — quality sleep and emotional recovery are
                essential for mental wellness and healthy daily functioning.”
              </p>
            </div>

            <p className="text-sm text-slate-500 mt-4">
              Inspired by emotional wellness and sleep health research.
            </p>
          </motion.div>
        </div>

        {/* HIGHLIGHT CARDS */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-24 border border-slate-100">
          <div className="flex items-center gap-4 mb-10">
            <FaMoon className="text-cyan-500 text-4xl" />

            <h2 className="text-4xl font-extrabold">
              Common Signs of Sleep & Energy Imbalance
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaBed />,
                title: "Poor Sleep Quality",
                text: "Difficulty sleeping, waking often, or restless nights.",
              },
              {
                icon: <FaBolt />,
                title: "Low Daily Energy",
                text: "Feeling physically or emotionally drained frequently.",
              },
              {
                icon: <FaBrain />,
                title: "Mental Fatigue",
                text: "Difficulty focusing due to exhaustion or stress overload.",
              },
              {
                icon: <FaShieldAlt />,
                title: "Burnout Symptoms",
                text: "Feeling emotionally tired, unmotivated, or overwhelmed.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
              >
                <div className="text-cyan-500 text-3xl mb-4">
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
              Sleep Wellness & Emotional Health Research
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Emotional wellness tools and stress assessments help identify how
              sleep patterns, emotional stress, and daily energy levels affect
              mental wellness, anxiety, concentration, and emotional balance.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Mental wellness experts explain that emotional fatigue and poor
              sleep are often connected to stress overload, burnout, anxiety,
              overthinking, and emotional exhaustion.
            </p>

            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl p-7 mt-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-3">
                Why Recovery & Rest Matter
              </h3>

              <p className="leading-relaxed text-white/90">
                Emotional recovery, quality sleep, stress management, and
                healthy daily habits improve mental clarity, emotional balance,
                focus, motivation, and overall wellness.
              </p>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1200&auto=format&fit=crop"
              alt="Sleep Wellness"
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
                Personalized sleep wellness insights, stress analysis, fatigue
                awareness, emotional wellness evaluation, and AI wellness
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
            Better emotional wellness begins with proper rest and recovery.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SleepEnergyInfo;