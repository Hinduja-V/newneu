import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaWallet,
  FaBrain,
  FaShieldAlt,
  FaArrowRight,
  FaChartLine,
  FaMoneyBillWave,
} from "react-icons/fa";

const MoneyInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
      {/* HERO SECTION */}
      <div className="relative w-full h-[520px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop"
          alt="Financial Stress Assessment"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />

        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight max-w-5xl"
          >
            Understand Financial Stress & Emotional Pressure
          </motion.h1>

          <div className="mt-8 flex flex-col md:flex-row md:items-end gap-8 md:gap-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-lg md:text-xl max-w-3xl leading-relaxed"
            >
              Financial pressure, debt worries, career uncertainty, and money
              instability can strongly affect emotional wellness, confidence,
              sleep quality, and mental balance. Early emotional awareness can
              help identify unhealthy stress patterns before they become severe.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => navigate("/assessment/money")}
              className="whitespace-nowrap bg-white/20 backdrop-blur-xl border border-white/30 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:bg-white/30 hover:border-white/50 transition-all duration-300 flex items-center gap-3 group h-fit mb-1 md:ml-40"
            >
              Start Financial Assessment
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
              src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop"
              alt="Financial Anxiety"
              className="rounded-3xl shadow-2xl w-full h-[430px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              Why Financial Stress Should Not Be Ignored
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Financial stress can affect emotional stability, decision-making,
              confidence, relationships, productivity, and daily peace of mind.
              Many individuals silently experience anxiety related to expenses,
              savings, loans, careers, and future uncertainty.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Research in emotional wellness suggests that continuous financial
              pressure can contribute to stress, emotional exhaustion, anxiety,
              and depressive thoughts. Emotional assessments help identify these
              stress patterns early.
            </p>

            <div className="border-l-4 border-cyan-500 bg-cyan-50 rounded-r-xl p-5">
              <p className="text-slate-700 font-semibold text-lg leading-relaxed">
                “Financial pressure can influence emotional health, sleep,
                concentration, confidence, and long-term mental wellness.”
              </p>
            </div>

            <p className="text-sm text-slate-500 mt-4">
              Inspired by emotional wellness and behavioral stress research.
            </p>
          </motion.div>
        </div>

        {/* HIGHLIGHT CARDS */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-24 border border-slate-100">
          <div className="flex items-center gap-4 mb-10">
            <FaWallet className="text-cyan-500 text-4xl" />

            <h2 className="text-4xl font-extrabold">
              Common Signs of Financial Stress
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaMoneyBillWave />,
                title: "Money Worries",
                text: "Constant fear about expenses, debt, or financial stability.",
              },
              {
                icon: <FaBrain />,
                title: "Overthinking",
                text: "Continuous thoughts about career growth or financial future.",
              },
              {
                icon: <FaShieldAlt />,
                title: "Emotional Burnout",
                text: "Feeling emotionally exhausted due to financial pressure.",
              },
              {
                icon: <FaChartLine />,
                title: "Future Anxiety",
                text: "Fear and uncertainty about savings, goals, or responsibilities.",
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
              Emotional Screening & Financial Wellness Research
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Emotional wellness assessments such as PHQ-9 and GAD-7 help
              identify emotional distress, anxiety patterns, stress behaviors,
              and depressive symptoms caused by financial uncertainty and
              emotional overload.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Mental wellness experts suggest that emotional conditions are
              often identified through emotional patterns, behavioral responses,
              and stress analysis rather than a single medical or laboratory
              test.
            </p>

            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl p-7 mt-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-3">
                Why Early Emotional Awareness Matters
              </h3>

              <p className="leading-relaxed text-white/90">
                Understanding emotional reactions to financial stress can help
                improve mental balance, reduce emotional burnout, encourage
                proactive coping strategies, and support healthier decision-making.
              </p>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop"
              alt="Financial Wellness"
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
                Personalized emotional insights, stress evaluation, anxiety
                analysis, financial wellness patterns, and AI-based support
                recommendations.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-2xl mb-3">
                Privacy & Security
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Your responses remain private and securely processed throughout
                the emotional wellness assessment experience.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-slate-500 mt-6">
            Take the first step toward understanding your emotional wellness.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MoneyInfo;