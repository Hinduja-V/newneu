import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBrain,
  FaHeartbeat,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";

const GeneralInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
      {/* HERO SECTION */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=1600&auto=format&fit=crop"
          alt="General Mental Wellness"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20">
        <motion.button
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.4 }}
  onClick={() => navigate("/assessment/general")}
  className="absolute bottom-8 right-8 md:right-20 lg:right-32 bg-white/20 backdrop-blur-xl border border-white/30 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:bg-white/30 hover:border-white/50 transition-all duration-300 flex items-center gap-3 group ml-[60px]"
>
  Start General Assessment
  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
</motion.button>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight max-w-4xl"
          >
            Understand Your Emotional Well-Being
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg md:text-xl max-w-3xl mt-6 leading-relaxed"
          >
            Emotional stress, anxiety, burnout, and low mood can silently affect
            concentration, sleep, productivity, and relationships. This
            assessment helps identify early emotional patterns before they grow
            into severe mental health challenges.
          </motion.p>
        </div>

        {/* HERO BUTTON - Right side transparent */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate("/assessment/general")}
          className="absolute bottom-8 right-8 md:right-20 lg:right-32 bg-white/20 backdrop-blur-xl border border-white/30 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:bg-white/30 hover:border-white/50 transition-all duration-300 flex items-center gap-3 group"
        >
          Start General Assessment
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* INTRO SECTION */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?q=80&w=1200&auto=format&fit=crop"
              alt="Mental Health"
              className="rounded-3xl shadow-2xl w-full h-[420px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              Why Is Mental Wellness Assessment Important?
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Many people ignore emotional stress until it becomes overwhelming.
              Mental health conditions such as anxiety and depression often
              develop gradually and may affect everyday functioning before users
              recognize the symptoms.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Research suggests that early emotional screening and continuous
              monitoring can improve emotional awareness, encourage timely
              intervention, and reduce worsening mental health conditions.
            </p>

            <div className="border-l-4 border-cyan-500 pl-5 py-2 bg-cyan-50 rounded-r-xl">
              <p className="text-slate-700 font-semibold leading-relaxed">
                "Depression and anxiety are often diagnosed using emotional and
                behavioral assessments rather than a single laboratory test."
              </p>
            </div>

            <p className="text-sm text-slate-500 mt-4">
              Inspired by mental health research and emotional screening methods.
            </p>
          </motion.div>
        </div>

        {/* HIGHLIGHT SECTION */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-24 border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <FaBrain className="text-cyan-500 text-4xl" />

            <h2 className="text-4xl font-extrabold">
              What This Assessment Analyzes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaBrain />,
                title: "Stress Patterns",
                text: "Identify emotional pressure and mental overload.",
              },
              {
                icon: <FaHeartbeat />,
                title: "Mood Changes",
                text: "Understand emotional ups and downs over time.",
              },
              {
                icon: <FaShieldAlt />,
                title: "Anxiety Signals",
                text: "Detect signs of worry, panic, and emotional tension.",
              },
              {
                icon: <FaBrain />,
                title: "Depression Indicators",
                text: "Screen emotional symptoms using structured assessments.",
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
              Research & Emotional Screening
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Mental health assessments commonly use structured questionnaires
              such as PHQ-9 and GAD-7 to evaluate emotional symptoms, anxiety,
              and depression severity. These tools are widely used for emotional
              screening and early mental wellness analysis.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              According to mental health experts, emotional assessments help
              users recognize emotional distress early and encourage proactive
              support before symptoms become severe.
            </p>

            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl p-6 mt-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-3">
                Why Early Assessment Matters
              </h3>

              <p className="leading-relaxed text-white/90">
                Early emotional awareness can improve mental wellness outcomes,
                encourage support-seeking behavior, and reduce long-term stress,
                anxiety, and emotional burnout.
              </p>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop"
              alt="Research"
              className="rounded-3xl shadow-2xl w-full h-[450px] object-cover"
            />
          </div>
        </div>

        {/* ASSESSMENT INFO BOX */}
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
                What You'll Receive
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Personalized emotional insights, stress analysis, depression
                screening, and anxiety evaluation.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-2xl mb-3">
                Privacy & Security
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Your responses remain private and securely processed for
                emotional wellness analysis.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM CTA - Removed since hero button handles main action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-slate-500 text-lg">
            Your emotional wellness journey starts here.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default GeneralInfo;