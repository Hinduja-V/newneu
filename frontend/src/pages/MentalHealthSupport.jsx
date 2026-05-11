import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MentalHealthSupport() {

  const navigate = useNavigate();

  const sections = [
    {
      icon: "🧠",
      title: "What is Mental Health?",
      desc: "Mental health includes emotional, psychological, and social well-being. It affects how we think, feel, and act in daily life.",
      color: "from-blue-400 to-cyan-400",
    },
    {
      icon: "🌧️",
      title: "Common Issues",
      desc: "Stress, anxiety, depression, overthinking, and burnout are common mental health challenges faced by many people.",
      color: "from-purple-400 to-pink-400",
    },
    {
      icon: "💙",
      title: "Why It Matters",
      desc: "Good mental health helps you handle stress, make decisions, build relationships, and live a balanced life.",
      color: "from-green-400 to-emerald-400",
    },
    {
      icon: "⚠️",
      title: "Early Signs of Stress",
      desc: "Feeling tired, loss of interest, poor sleep, irritability, and difficulty focusing are warning signs.",
      color: "from-orange-400 to-amber-400",
    },
    {
      icon: "🤝",
      title: "When to Seek Help",
      desc: "If emotions feel overwhelming or long-lasting, talking to a counsellor or trusted person is important.",
      color: "from-rose-400 to-red-400",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#eef6ff] via-[#f5f7ff] to-[#f3faff] px-6 py-10">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-blue-200 blur-[120px] opacity-40 rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-200 blur-[120px] opacity-40 rounded-full"></div>

      {/* TOP SECTION */}
      <div className="relative z-10 max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-12">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >

            <p className="text-blue-600 font-semibold mb-3">
              🌿 Mental Wellness Guide
            </p>

            <h1 className="text-5xl font-bold leading-tight text-slate-800">
              Mental Health <br />
              Support & Awareness 💙
            </h1>

            <p className="mt-6 text-slate-500 text-lg max-w-2xl leading-relaxed">
              Understanding mental health helps people
              manage emotions, reduce stress, improve
              relationships, and build a healthier life.
            </p>

            {/* SMALL INFO BOXES */}
            <div className="grid grid-cols-2 gap-4 mt-8 max-w-xl">

              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 shadow-md">
                <div className="text-3xl mb-2">🧘</div>

                <h3 className="font-semibold text-slate-700">
                  Emotional Balance
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Calm thoughts improve daily life
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 shadow-md">
                <div className="text-3xl mb-2">🌸</div>

                <h3 className="font-semibold text-slate-700">
                  Positive Mindset
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Mental peace builds confidence
                </p>
              </div>

            </div>

          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 flex justify-center"
          >

            <img
              src="https://images.unsplash.com/photo-1493836512294-502baa1986e2?q=80&w=1200&auto=format&fit=crop"
              alt="mental health"
              className="w-full max-w-lg rounded-[40px] shadow-2xl object-cover"
            />

          </motion.div>

        </div>

        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-[40px] p-8"
        >

          {/* SECTION TITLE */}
          <div className="flex items-center justify-between mb-8">

            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                🧠 Mental Health Topics
              </h2>

              <p className="text-slate-500 mt-2">
                Learn the basics of emotional well-being
              </p>
            </div>

            <div className="hidden md:flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow">
              <span className="text-3xl">💡</span>

              <div>
                <p className="font-semibold text-slate-700">
                  Wellness Tip
                </p>

                <p className="text-xs text-slate-500">
                  Talk • Relax • Heal
                </p>
              </div>
            </div>

          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {sections.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                }}
                className="relative overflow-hidden rounded-[30px] bg-white p-6 shadow-lg border border-white/40"
              >

                {/* BACKGROUND GLOW */}
                <div
                  className={`absolute inset-0 opacity-10 bg-gradient-to-br ${item.color}`}
                ></div>

                {/* CONTENT */}
                <div className="relative z-10">

                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl shadow-md mb-5`}
                  >
                    {item.icon}
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-sm">
                    {item.desc}
                  </p>

                </div>

              </motion.div>
            ))}

          </div>

          {/* BOTTOM NOTE */}
          <div className="mt-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl p-6 text-center">

            <h3 className="text-xl font-bold text-slate-800 mb-2">
              💙 Remember
            </h3>

            <p className="text-slate-600 max-w-2xl mx-auto">
              Mental health is just as important as physical health.
              Taking care of your emotions and thoughts helps create
              a peaceful and balanced life.
            </p>

          </div>

          {/* NAVIGATION */}
          <div className="flex justify-center gap-5 mt-10">

            <button
              onClick={() => navigate("/resources")}
              className="px-8 py-3 rounded-2xl bg-gray-200 hover:bg-gray-300 transition shadow font-medium text-slate-700"
            >
              ⬅ Back
            </button>

            <button
              onClick={() => navigate("/self-help")}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:scale-105 transition shadow-lg font-semibold"
            >
              Continue ➜
            </button>

          </div>

        </motion.div>

      </div>
    </div>
  );
}