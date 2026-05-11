import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Waves, CloudMoon, Sparkles } from "lucide-react";

export default function BreathingGame() {
  const [phase, setPhase] = useState("Breathe In");
  const [count, setCount] = useState(4);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let inhale = true;

    const breathingLoop = setInterval(() => {
      let timer = 4;

      setCount(timer);
      setPhase(inhale ? "Breathe In 🌿" : "Breathe Out 🌬️");
      setScale(inhale ? 1.4 : 1);

      const countdown = setInterval(() => {
        timer--;

        if (timer >= 0) {
          setCount(timer);
        }
      }, 1000);

      inhale = !inhale;

      setTimeout(() => {
        clearInterval(countdown);
      }, 4000);
    }, 4000);

    return () => clearInterval(breathingLoop);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f0f9ff] via-[#f7fcff] to-[#eefbf6] flex items-center justify-center px-4 py-10">

      {/* FLOATING BACKGROUND */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-cyan-200 blur-[150px] opacity-40 rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-emerald-200 blur-[150px] opacity-40 rounded-full"></div>

      {/* FLOATING ICONS */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute top-20 left-20 hidden md:flex"
      >
        <CloudMoon size={55} className="text-cyan-300" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute bottom-20 right-20 hidden md:flex"
      >
        <Sparkles size={55} className="text-emerald-300" />
      </motion.div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 w-full max-w-6xl bg-white/70 backdrop-blur-3xl rounded-[45px] border border-white/40 shadow-[0_20px_90px_rgba(0,0,0,0.08)] overflow-hidden">

        <div className="grid lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="p-8 md:p-12 flex flex-col justify-center">

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold w-fit">

              <Waves size={16} />

              Mind Relaxation

            </div>

            {/* TITLE */}
            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold text-slate-800 leading-tight">
              Ocean <br />
              Breathing
            </h1>

            <p className="mt-5 text-slate-500 text-lg leading-relaxed max-w-lg">
              Let your breath move like calm ocean waves.
              Inhale peace, exhale stress, and reset your mind naturally.
            </p>

            {/* INFO CARDS */}
            <div className="mt-10 grid sm:grid-cols-2 gap-5">

              <div className="bg-white rounded-3xl p-5 shadow-lg border border-slate-100">

                <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center">

                  🌊

                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-800">
                  Calm Rhythm
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  Smooth breathing patterns relax your nervous system.
                </p>

              </div>

              <div className="bg-white rounded-3xl p-5 shadow-lg border border-slate-100">

                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">

                  ✨

                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-800">
                  Mental Clarity
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  Deep breathing improves emotional balance and focus.
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="relative bg-gradient-to-br from-cyan-50/80 to-emerald-50/80 p-8 md:p-12 flex items-center justify-center overflow-hidden">

            {/* WAVE BACKGROUND */}
            <div className="absolute bottom-0 left-0 w-full">

              <svg
                viewBox="0 0 1440 320"
                className="w-full opacity-30"
              >
                <path
                  fill="#7dd3fc"
                  d="M0,224L60,229.3C120,235,240,245,360,234.7C480,224,600,192,720,186.7C840,181,960,203,1080,224C1200,245,1320,267,1380,277.3L1440,288L1440,320L0,320Z"
                ></path>
              </svg>

            </div>

            {/* BREATHING CENTER */}
            <div className="relative z-10 flex flex-col items-center">

              {/* PHASE */}
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-3xl font-extrabold mb-8
                ${
                  phase.includes("In")
                    ? "text-cyan-600"
                    : "text-emerald-600"
                }`}
              >

                {phase}

              </motion.div>

              {/* BREATHING ORB */}
              <div className="relative flex items-center justify-center w-[340px] h-[340px]">

                {/* OUTER RIPPLE */}
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.25, 0.1, 0.25],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                  }}
                  className="absolute w-[260px] h-[260px] rounded-full bg-cyan-300 blur-3xl"
                />

                {/* MIDDLE RIPPLE */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                  }}
                  className="absolute w-[240px] h-[240px] rounded-full border border-cyan-200"
                />

                {/* MAIN ORB */}
                <motion.div
                  animate={{
                    scale: scale,
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="relative w-[180px] h-[180px] rounded-full bg-gradient-to-br from-cyan-400 via-sky-400 to-emerald-400 shadow-[0_20px_60px_rgba(34,211,238,0.4)] flex items-center justify-center"
                >

                  {/* INNER SHINE */}
                  <div className="absolute top-5 left-5 w-12 h-12 rounded-full bg-white/40 blur-md"></div>

                  {/* COUNTDOWN */}
                  <div className="text-white text-6xl font-black">
                    {count}
                  </div>

                </motion.div>

              </div>

              {/* FOOT NOTE */}
              <div className="mt-10 bg-white/80 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/50 shadow-lg">

                <p className="text-slate-600 text-sm font-medium">
                  🌿 Follow the expanding orb and breathe slowly
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}