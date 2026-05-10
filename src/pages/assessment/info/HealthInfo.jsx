import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHeartbeat,
  FaBrain,
  FaShieldAlt,
  FaArrowRight,
  FaStethoscope,
} from "react-icons/fa";

const HealthInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
      {/* HERO SECTION */}
      <div className="relative w-full h-[520px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop"
          alt="Health Stress Assessment"
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
            Understand Health-Related Anxiety & Emotional Stress
          </motion.h1>

          <div className="mt-8 flex flex-col md:flex-row md:items-end gap-8 md:gap-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-lg md:text-xl max-w-3xl leading-relaxed"
            >
              Constant worry about physical symptoms, illnesses, medical
              reports, or future health problems can create emotional
              exhaustion and increase anxiety levels. Early emotional screening
              helps identify stress patterns before they become overwhelming.
            </motion.p>

<motion.button
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.4 }}
  onClick={() => navigate("/assessment/health")}
  className="whitespace-nowrap bg-white/20 backdrop-blur-xl border border-white/30 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:bg-white/30 hover:border-white/50 transition-all duration-300 flex items-center gap-3 group h-fit mb-1 ml-60"
>
  Start Health Assessment
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
              src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop"
              alt="Health Anxiety"
              className="rounded-3xl shadow-2xl w-full h-[430px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              Why Health Stress Should Not Be Ignored
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Health-related stress can affect concentration, sleep quality,
              emotional balance, productivity, and social interactions. Many
              individuals experience continuous worry about physical symptoms,
              medical conditions, or future illnesses.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Research in emotional wellness suggests that stress and anxiety
              are often identified through emotional and behavioral assessments
              rather than a single medical test. Emotional screening helps
              identify hidden stress patterns and encourages early support.
            </p>

            <div className="border-l-4 border-cyan-500 bg-cyan-50 rounded-r-xl p-5">
              <p className="text-slate-700 font-semibold text-lg leading-relaxed">
                “Mental health conditions such as anxiety and depression are
                commonly evaluated using emotional assessments, behavioral
                analysis, and symptom-based screening tools.”
              </p>
            </div>

            <p className="text-sm text-slate-500 mt-4">
              Inspired by emotional wellness and mental health screening
              research.
            </p>
          </motion.div>
        </div>

        {/* HIGHLIGHT CARDS */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-24 border border-slate-100">
          <div className="flex items-center gap-4 mb-10">
            <FaHeartbeat className="text-cyan-500 text-4xl" />
            <h2 className="text-4xl font-extrabold">
              Common Signs of Health Stress
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaHeartbeat />,
                title: "Constant Worry",
                text: "Repeated fear about health symptoms or future illness.",
              },
              {
                icon: <FaBrain />,
                title: "Overthinking",
                text: "Continuous thoughts about medical conditions or reports.",
              },
              {
                icon: <FaShieldAlt />,
                title: "Emotional Tension",
                text: "Feeling mentally exhausted due to ongoing health anxiety.",
              },
              {
                icon: <FaStethoscope />,
                title: "Sleep Disturbance",
                text: "Difficulty sleeping caused by stress and emotional worry.",
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
              Emotional Screening & Mental Health Research
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Emotional wellness assessments such as PHQ-9 and GAD-7 are widely
              used to identify emotional distress, depression symptoms, and
              anxiety patterns. These tools help understand how stress affects
              thoughts, emotions, and daily functioning.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              According to mental health experts, emotional conditions cannot
              usually be diagnosed through a single laboratory or blood test
              alone. Emotional patterns, stress behaviors, and psychological
              symptoms are important parts of mental wellness evaluation.
            </p>

            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl p-7 mt-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-3">
                Why Early Emotional Awareness Matters
              </h3>

              <p className="leading-relaxed text-white/90">
                Early emotional awareness can reduce long-term stress,
                encourage proactive support, improve emotional balance, and
                help users seek wellness support before symptoms worsen.
              </p>
            </div>
          </div>

          <div>
            <img
              src="https://www.healthchek.in/images/blogs/12329851.jpg"
              alt="Mental Health Research"
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
                Personalized emotional insights, stress evaluation, depression
                screening, anxiety analysis, and AI wellness recommendations.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-2xl mb-3">
                Privacy & Security
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Your emotional responses are processed securely and remain
                private throughout the assessment experience.
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

export default HealthInfo;