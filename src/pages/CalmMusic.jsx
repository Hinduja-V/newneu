import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CalmMusic() {
  const audioRef = useRef(null);
  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);

  const tracks = [
    {
      name: "Moonlight Piano",
      mood: "Deep Relaxation",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      name: "Rain & Nature",
      mood: "Stress Relief",
      image:
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200&auto=format&fit=crop",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      name: "Soft Ambient",
      mood: "Peaceful Focus",
      image:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1200&auto=format&fit=crop",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
  ];

  // ▶ PLAY
  const playMusic = async () => {
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.log(err);
    }
  };

  // ⏸ PAUSE
  const pauseMusic = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  // 🔁 CHANGE TRACK
  const changeTrack = (index) => {
    setCurrentTrack(index);
    setProgress(0);

    setTimeout(async () => {
      try {
        audioRef.current.load();
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.log(err);
      }
    }, 100);
  };

  // ⏭ AUTO NEXT
  const handleEnded = () => {
    const next = (currentTrack + 1) % tracks.length;
    changeTrack(next);
  };

  // 📊 PROGRESS BAR
  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (!audio.duration) return;

      const percent =
        (audio.currentTime / audio.duration) * 100;

      setProgress(percent);
    };

    audio?.addEventListener("timeupdate", updateProgress);

    return () => {
      audio?.removeEventListener(
        "timeupdate",
        updateProgress
      );
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#eef4ff] relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-200 blur-[120px] opacity-40 rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-200 blur-[120px] opacity-40 rounded-full"></div>

      {/* TOP NAVBAR */}
      <div className="relative z-20 flex items-center justify-between px-8 py-5">

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            🎧 MindCare Music
          </h1>

          <p className="text-sm text-slate-500">
            Relax • Focus • Heal
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="bg-white px-5 py-2 rounded-xl shadow hover:scale-105 transition"
        >
          ⬅ Back
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 px-6 py-10">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >

          <div className="mb-6">
            <h2 className="text-5xl font-bold leading-tight text-slate-800">
              Calm Your <br />
              Mind With Music 🌿
            </h2>

            <p className="mt-5 text-slate-500 text-lg max-w-lg">
              Experience peaceful audio therapy designed
              to reduce stress, improve focus, and relax
              your emotions naturally.
            </p>
          </div>

          {/* FEATURE CARDS */}
          <div className="grid grid-cols-2 gap-4 mt-6">

            <div className="bg-white/70 backdrop-blur-xl p-5 rounded-3xl shadow-md">
              <div className="text-3xl mb-2">🎵</div>
              <h3 className="font-semibold text-slate-700">
                Relaxing Tracks
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Calm piano, rain & ambient sounds
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-xl p-5 rounded-3xl shadow-md">
              <div className="text-3xl mb-2">🧘</div>

              <h3 className="font-semibold text-slate-700">
                Stress Relief
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Reduce anxiety naturally with audio
              </p>
            </div>

          </div>
        </motion.div>

        {/* RIGHT SIDE PLAYER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[40px] shadow-2xl overflow-hidden"
        >

          {/* IMAGE */}
          <div className="relative h-[320px] overflow-hidden">

            <img
              src={tracks[currentTrack].image}
              alt="music"
              className={`w-full h-full object-cover transition-all duration-700 ${
                isPlaying ? "scale-110" : "scale-100"
              }`}
            />

            <div className="absolute inset-0 bg-black/20"></div>

            {/* MUSIC WAVE */}
            {isPlaying && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
                {[1, 2, 3, 4, 5].map((b) => (
                  <div
                    key={b}
                    className="w-1 bg-white rounded-full animate-pulse"
                    style={{
                      height: `${10 + b * 5}px`,
                      animationDelay: `${b * 0.2}s`,
                    }}
                  ></div>
                ))}
              </div>
            )}

          </div>

          {/* PLAYER CONTENT */}
          <div className="p-7">

            {/* TRACK INFO */}
            <div className="text-center mb-6">

              <p className="text-sm text-blue-600 font-medium">
                NOW PLAYING
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                {tracks[currentTrack].name}
              </h2>

              <p className="text-slate-500 mt-1">
                {tracks[currentTrack].mood}
              </p>
            </div>

            {/* AUDIO */}
            <audio
              ref={audioRef}
              onEnded={handleEnded}
            >
              <source
                src={tracks[currentTrack].url}
                type="audio/mp3"
              />
            </audio>

            {/* PROGRESS */}
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-8">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* CONTROLS */}
            <div className="flex items-center justify-center gap-5 mb-8">

              {/* PREVIOUS */}
              <button
                onClick={() =>
                  changeTrack(
                    (currentTrack - 1 + tracks.length) %
                      tracks.length
                  )
                }
                className="w-14 h-14 rounded-full bg-white shadow-lg hover:scale-110 transition text-xl"
              >
                ⏮
              </button>

              {/* PLAY / PAUSE */}
              {!isPlaying ? (
                <button
                  onClick={playMusic}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-3xl shadow-2xl hover:scale-110 transition"
                >
                  ▶
                </button>
              ) : (
                <button
                  onClick={pauseMusic}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-red-400 to-pink-500 text-white text-3xl shadow-2xl hover:scale-110 transition"
                >
                  ❚❚
                </button>
              )}

              {/* NEXT */}
              <button
                onClick={() =>
                  changeTrack(
                    (currentTrack + 1) % tracks.length
                  )
                }
                className="w-14 h-14 rounded-full bg-white shadow-lg hover:scale-110 transition text-xl"
              >
                ⏭
              </button>

            </div>

            {/* PLAYLIST */}
            <div className="space-y-4">

              {tracks.map((track, i) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  key={i}
                  onClick={() => changeTrack(i)}
                  className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition
                  ${
                    currentTrack === i
                      ? "bg-blue-100 border border-blue-200"
                      : "bg-white"
                  }`}
                >

                  <img
                    src={track.image}
                    alt={track.name}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-slate-700">
                      {track.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {track.mood}
                    </p>
                  </div>

                  {currentTrack === i && (
                    <div className="text-2xl">
                      🎵
                    </div>
                  )}

                </motion.div>
              ))}

            </div>

            {/* NEXT BUTTON */}
            <div className="mt-8 text-center">

              <button
                onClick={() => navigate("/ai-videos")}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition"
              >
                Continue ➜
              </button>

            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}