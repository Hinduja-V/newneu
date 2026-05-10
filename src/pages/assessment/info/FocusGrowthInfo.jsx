import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBrain,
  FaArrowRight,
  FaChartLine,
  FaBolt,
  FaShieldAlt,
  FaBullseye,
} from "react-icons/fa";

const FocusGrowthInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
      {/* HERO SECTION */}
      <div className="relative w-full h-[520px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
          alt="Focus and Growth"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />

        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-violet-400 font-bold tracking-[4px] uppercase mb-5"
          >
            Performance & Growth Assessment
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight max-w-5xl"
          >
            Understand Productivity Pressure & Personal Growth Stress
          </motion.h1>

          <div className="mt-8 flex flex-col md:flex-row md:items-end gap-8 md:gap-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-lg md:text-xl max-w-3xl leading-relaxed"
            >
              Academic pressure, career expectations, burnout, fear of failure,
              and self-comparison can deeply affect emotional wellness,
              confidence, and motivation. This assessment helps identify stress
              patterns connected to performance and self-growth.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => navigate("/assessment/focus-growth")}
              className="whitespace-nowrap bg-white/20 backdrop-blur-xl border border-white/30 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:bg-white/30 hover:border-white/50 transition-all duration-300 flex items-center gap-3 group h-fit"
            >
               Start Performance Assessment
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
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop"
              alt="Performance Stress"
              className="rounded-3xl shadow-2xl w-full h-[430px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              Why Performance Stress Should Not Be Ignored
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Continuous pressure to achieve goals, maintain productivity, or
              meet expectations can lead to emotional exhaustion, anxiety,
              burnout, and reduced confidence. Many individuals silently
              struggle with stress caused by academic, career, or personal
              growth expectations.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Emotional wellness research shows that performance-related stress
              can affect sleep, focus, motivation, emotional balance, and daily
              functioning. Early emotional awareness helps prevent long-term
              burnout and mental fatigue.
            </p>

            <div className="border-l-4 border-violet-500 bg-violet-50 rounded-r-xl p-5">
              <p className="text-slate-700 font-semibold text-lg leading-relaxed">
                “Healthy growth comes from balance, self-awareness, and
                emotional resilience — not constant pressure.”
              </p>
            </div>

            <p className="text-sm text-slate-500 mt-4">
              Inspired by emotional wellness and productivity psychology
              research.
            </p>
          </motion.div>
        </div>

        {/* HIGHLIGHT CARDS */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-24 border border-slate-100">
          <div className="flex items-center gap-4 mb-10">
            <FaChartLine className="text-violet-500 text-4xl" />

            <h2 className="text-4xl font-extrabold">
              Common Signs of Performance Stress
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaBullseye />,
                title: "Fear of Failure",
                text: "Feeling anxious about not meeting expectations or goals.",
              },
              {
                icon: <FaBrain />,
                title: "Mental Overload",
                text: "Difficulty focusing due to excessive pressure and stress.",
              },
              {
                icon: <FaBolt />,
                title: "Burnout & Exhaustion",
                text: "Feeling emotionally drained from constant productivity.",
              },
              {
                icon: <FaShieldAlt />,
                title: "Low Motivation",
                text: "Loss of confidence, energy, or interest in growth.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
              >
                <div className="text-violet-500 text-3xl mb-4">
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
              Growth, Burnout & Emotional Wellness Research
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Emotional wellness tools such as stress analysis, PHQ-9, and
              GAD-7 help identify emotional fatigue, anxiety, low motivation,
              and burnout connected to performance pressure and self-growth
              struggles.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Mental wellness experts explain that emotional burnout is not
              simply tiredness — it often includes emotional exhaustion,
              overthinking, low confidence, stress overload, and reduced
              emotional balance.
            </p>

            <div className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-2xl p-7 mt-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-3">
                Why Emotional Balance Matters
              </h3>

              <p className="leading-relaxed text-white/90">
                Sustainable personal growth requires emotional wellness,
                balanced productivity, self-care, motivation, and healthy mental
                resilience — not continuous pressure and burnout.
              </p>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
              alt="Growth and Focus"
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
                Personalized productivity insights, stress analysis, burnout
                awareness, emotional wellness evaluation, and AI-based wellness
                recommendations.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-2xl mb-3">
                Privacy & Security
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Your responses remain private and securely processed throughout
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
            Healthy growth starts with emotional awareness and balance.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FocusGrowthInfo;