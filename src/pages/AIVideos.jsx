import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AIVideos() {
  const navigate = useNavigate();

  const videos = [
    {
      title: "Nature Relaxation",
      desc: "Peaceful forest ambience for stress relief",
      url: "https://www.youtube.com/embed/2OEL4P1Rz04",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
      color: "from-emerald-400 to-green-500",
    },
    {
      title: "Morning Motivation",
      desc: "Start your day with positive energy",
      url: "https://www.youtube.com/embed/ZXsQAXx_ao0",
      image:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1200&auto=format&fit=crop",
      color: "from-orange-400 to-yellow-400",
    },
    {
      title: "Deep Focus Session",
      desc: "Improve focus and concentration",
      url: "https://www.youtube.com/embed/smEqnnklfYs",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
      color: "from-blue-400 to-indigo-500",
    },
    {
      title: "Sleep Relaxation",
      desc: "Calm your mind before sleeping",
      url: "https://www.youtube.com/embed/inpok4MKVLM",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
      color: "from-purple-400 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-100 via-blue-50 to-purple-100 px-4 py-10">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-300/30 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-pink-300/30 blur-[120px] rounded-full"></div>

      {/* HEADER */}
      <div className="relative z-10 text-center mb-12">

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-slate-800"
        >
          🎬 AI Relaxing Videos
        </motion.h1>

        <p className="text-slate-500 mt-3 text-sm md:text-base">
          Watch calming videos to refresh your mind & emotions
        </p>

      </div>

      {/* VIDEO GRID */}
      <div className="relative z-10 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

        {videos.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group bg-white/60 backdrop-blur-2xl rounded-[30px] overflow-hidden shadow-2xl border border-white/40"
          >

            {/* IMAGE HEADER */}
            <div className="relative h-44 overflow-hidden">

              <img
                src={video.image}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              <div
                className={`absolute inset-0 bg-gradient-to-t ${video.color} opacity-60`}
              ></div>

              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-xl font-bold">
                  {video.title}
                </h2>

                <p className="text-sm opacity-90">
                  {video.desc}
                </p>
              </div>

            </div>

            {/* VIDEO */}
            <div className="p-4">

              <div className="overflow-hidden rounded-2xl shadow-lg border border-white/30">

                <iframe
                  className="w-full h-[230px]"
                  src={video.url}
                  title={video.title}
                  allowFullScreen
                />

              </div>

            </div>

          </motion.div>
        ))}

      </div>

      {/* QUOTE */}
      <div className="relative z-10 text-center mt-10">

        <p className="text-slate-500 italic text-sm">
          “A calm mind creates a peaceful life 🌿”
        </p>

      </div>

      {/* NAVIGATION */}
      <div className="relative z-10 mt-12 flex justify-center gap-5">

        <button
          onClick={() => navigate("/relaxing")}
          className="px-6 py-3 rounded-2xl bg-white/70 backdrop-blur-xl shadow-md hover:scale-105 transition font-medium text-slate-700"
        >
          ⬅ Back
        </button>

        <button
          onClick={() => navigate("/ai-motivation")}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:scale-105 transition font-medium"
        >
          Next ➜
        </button>

      </div>

    </div>
  );
}