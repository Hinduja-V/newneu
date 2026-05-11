import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PlayCircle,
  Moon,
  Brain,
  Sparkles,
  Headphones,
} from "lucide-react";

const Meditation = () => {
  const videos = [
    {
      id: "SgapKdDys08",
      title: "Guided Meditation",
      desc: "Relax and calm your thoughts peacefully",
      icon: <Sparkles size={20} />,
    },
    {
      id: "PrYt0Iew8WM",
      title: "Deep Sleep Meditation",
      desc: "Improve sleep and reduce night stress",
      icon: <Moon size={20} />,
    },
    {
      id: "_G42Z7-vZvw",
      title: "Stress Relief Session",
      desc: "Release anxiety and mental tension",
      icon: <Brain size={20} />,
    },
    {
      id: "3pLhetYsHfQ",
      title: "Mindfulness Breathing",
      desc: "Focus on breathing and inner peace",
      icon: <Headphones size={20} />,
    },
  ];

  const [selected, setSelected] = useState(videos[0]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-100 px-4 py-10 flex items-center justify-center">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-violet-200 blur-[120px] opacity-50 rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-purple-200 blur-[120px] opacity-50 rounded-full"></div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-6xl bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[40px] shadow-2xl overflow-hidden"
      >

        <div className="grid lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="p-8 md:p-10 flex flex-col justify-center">

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-semibold w-fit">

              <Sparkles size={16} />

              Mindful Meditation

            </div>

            {/* TITLE */}
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold text-slate-800 leading-tight">
              Relax <br />
              Your Soul
            </h1>

            <p className="mt-5 text-slate-500 text-lg leading-relaxed">
              Take a deep breath, slow your thoughts,
              and enter a peaceful meditation experience.
            </p>

            {/* CURRENT VIDEO */}
            <div className="mt-10 bg-white rounded-3xl border border-violet-100 p-6 shadow-lg">

              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600">

                  {selected.icon}

                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Currently Playing
                  </p>

                  <h2 className="text-2xl font-bold text-slate-800">
                    {selected.title}
                  </h2>

                </div>

              </div>

              <p className="mt-4 text-slate-500 leading-relaxed">
                {selected.desc}
              </p>

            </div>

            {/* PLAYLIST */}
            <div className="mt-8 space-y-4">

              {videos.map((video, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelected(video)}
                  className={`w-full flex items-center gap-4 rounded-2xl p-4 transition-all border
                  ${
                    selected.id === video.id
                      ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white border-transparent shadow-lg"
                      : "bg-white text-slate-700 border-slate-100 hover:bg-violet-50"
                  }`}
                >

                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center
                    ${
                      selected.id === video.id
                        ? "bg-white/20"
                        : "bg-violet-100 text-violet-600"
                    }`}
                  >

                    {video.icon}

                  </div>

                  <div className="text-left flex-1">

                    <h3 className="font-semibold">
                      {video.title}
                    </h3>

                    <p
                      className={`text-sm mt-1
                      ${
                        selected.id === video.id
                          ? "text-white/80"
                          : "text-slate-500"
                      }`}
                    >
                      {video.desc}
                    </p>

                  </div>

                  <PlayCircle size={22} />

                </motion.button>
              ))}

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-gradient-to-br from-violet-100/60 to-purple-100/60 p-6 md:p-8 flex items-center justify-center">

            <motion.div
              key={selected.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >

              {/* VIDEO CARD */}
              <div className="bg-white rounded-[35px] overflow-hidden shadow-2xl border border-white/40">

                {/* VIDEO */}
                <div className="relative">

                  <iframe
                    width="100%"
                    height="420"
                    src={`https://www.youtube.com/embed/${selected.id}?rel=0`}
                    title="Meditation Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full"
                  ></iframe>

                </div>

                {/* FOOTER */}
                <div className="p-6">

                  <h2 className="text-2xl font-bold text-slate-800">
                    {selected.title}
                  </h2>

                  <p className="text-slate-500 mt-2 leading-relaxed">
                    {selected.desc}
                  </p>

                  <div className="mt-5 flex items-center justify-between">

                    <div className="flex items-center gap-2 text-violet-600 font-medium">

                      <Sparkles size={18} />

                      Daily Meditation

                    </div>

                    <div className="text-sm text-slate-400">
                      5–10 min recommended
                    </div>

                  </div>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default Meditation;