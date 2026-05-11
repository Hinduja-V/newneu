import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaBrain,
  FaUsers,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";

const RelationshipInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800">
      {/* HERO SECTION */}
      <div className="relative w-full h-[520px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1600&auto=format&fit=crop"
          alt="Relationship Stress Assessment"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />

        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-pink-400 font-bold tracking-[4px] uppercase mb-5"
          >
            Relationship Assessment
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight max-w-5xl"
          >
            Understand Emotional Stress in Relationships
          </motion.h1>

          <div className="mt-8 flex flex-col md:flex-row md:items-end gap-8 md:gap-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-lg md:text-xl max-w-3xl leading-relaxed"
            >
              Relationship challenges, emotional disconnection, conflicts,
              misunderstandings, and loneliness can deeply affect mental
              wellness. Emotional screening helps identify stress patterns,
              emotional imbalance, and hidden anxiety connected to
              relationships.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => navigate("/assessment/relationship")}
              className="whitespace-nowrap bg-white/20 backdrop-blur-xl border border-white/30 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:bg-white/30 hover:border-white/50 transition-all duration-300 flex items-center gap-3 group h-fit"
            >
              Start Relationship Assessment
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
              src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1200&auto=format&fit=crop"
              alt="Relationship Stress"
              className="rounded-3xl shadow-2xl w-full h-[430px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              Why Relationship Stress Matters
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Emotional stress from relationships can impact mental clarity,
              confidence, sleep quality, emotional stability, and overall
              happiness. Conflicts, communication gaps, emotional neglect, and
              loneliness often increase anxiety and emotional exhaustion.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Research in emotional wellness shows that emotional distress is
              commonly identified using behavioral and psychological screening
              rather than a single laboratory test. Emotional assessments help
              identify hidden stress patterns and support early emotional care.
            </p>

            <div className="border-l-4 border-pink-500 bg-pink-50 rounded-r-xl p-5">
              <p className="text-slate-700 font-semibold text-lg leading-relaxed">
                “Strong emotional relationships are closely connected to mental
                wellness, emotional stability, and reduced stress levels.”
              </p>
            </div>

            <p className="text-sm text-slate-500 mt-4">
              Inspired by emotional wellness and relationship psychology
              research.
            </p>
          </motion.div>
        </div>

        {/* HIGHLIGHT CARDS */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-24 border border-slate-100">
          <div className="flex items-center gap-4 mb-10">
            <FaHeart className="text-pink-500 text-4xl" />

            <h2 className="text-4xl font-extrabold">
              Common Signs of Relationship Stress
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaHeart />,
                title: "Emotional Distance",
                text: "Feeling disconnected or emotionally unsupported.",
              },
              {
                icon: <FaUsers />,
                title: "Communication Problems",
                text: "Frequent misunderstandings or unresolved conflicts.",
              },
              {
                icon: <FaBrain />,
                title: "Overthinking",
                text: "Constant worrying about relationships or social bonds.",
              },
              {
                icon: <FaShieldAlt />,
                title: "Loneliness & Anxiety",
                text: "Feeling isolated, emotionally drained, or stressed.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
              >
                <div className="text-pink-500 text-3xl mb-4">
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
              Emotional Wellness & Relationship Research
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Emotional screening tools such as PHQ-9 and GAD-7 help identify
              emotional stress, anxiety, and depression patterns connected to
              relationships and social experiences. These assessments support
              emotional awareness and early intervention.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Mental wellness experts explain that emotional conditions are
              usually evaluated through emotional behaviors, stress symptoms,
              and psychological screening rather than only medical tests.
            </p>

            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl p-7 mt-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-3">
                Why Emotional Awareness Helps
              </h3>

              <p className="leading-relaxed text-white/90">
                Understanding emotional relationship stress early can improve
                communication, emotional balance, social confidence, and mental
                wellness before emotional distress becomes severe.
              </p>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop"
              alt="Relationship Wellness"
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
                Personalized emotional insights, stress evaluation,
                relationship-related anxiety analysis, and AI wellness
                recommendations.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-2xl mb-3">
                Privacy & Security
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Your emotional responses remain private and securely processed
                throughout the assessment experience.
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
            Better emotional understanding starts with awareness.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RelationshipInfo;