import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BubbleWrapGame() {
  const createBubbles = () =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      popped: false,
      x: Math.random() * 220,
      y: Math.random() * 320,
      size: 45 + Math.random() * 18,
    }));

  const [bubbles, setBubbles] = useState(createBubbles());
  const [score, setScore] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [message, setMessage] = useState("Pop stress away ✨");
  const [floatingTexts, setFloatingTexts] = useState([]);

  // POP
  const popBubble = (bubble) => {
    if (bubble.popped) return;

    setBubbles((prev) =>
      prev.map((b) =>
        b.id === bubble.id ? { ...b, popped: true } : b
      )
    );

    setScore((prev) => prev + 1);

    setEnergy((prev) => Math.max(prev - 4, 0));

    const textId = Date.now();

    setFloatingTexts((prev) => [
      ...prev,
      {
        id: textId,
        x: bubble.x,
        y: bubble.y,
      },
    ]);

    setTimeout(() => {
      setFloatingTexts((prev) =>
        prev.filter((t) => t.id !== textId)
      );
    }, 1000);

    const messages = [
      "Mind relaxing 🌿",
      "Stress fading 💙",
      "Feeling lighter ✨",
      "Calm energy 😌",
    ];

    setMessage(
      messages[Math.floor(Math.random() * messages.length)]
    );
  };

  // RESET
  const resetGame = () => {
    setBubbles(createBubbles());
    setScore(0);
    setEnergy(100);
    setMessage("Pop stress away ✨");
  };

  // AUTO COMPLETE
  useEffect(() => {
    if (energy === 0) {
      setMessage("Fully relaxed 🎉");
    }
  }, [energy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-sky-50 to-blue-100 flex items-center justify-center px-4 py-6 overflow-hidden relative">

      {/* FLOATING LIGHTS */}
      <div className="absolute w-72 h-72 bg-cyan-200/30 blur-3xl rounded-full top-0 left-0"></div>
      <div className="absolute w-72 h-72 bg-blue-300/30 blur-3xl rounded-full bottom-0 right-0"></div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md bg-white/60 backdrop-blur-2xl border border-white/40 rounded-[32px] shadow-2xl p-5"
      >

        {/* HEADER */}
        <div className="text-center mb-5">
          <h1 className="text-2xl font-bold text-cyan-700">
            🌊 Stress Bubble Zone
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Pop bubbles to reduce stress energy
          </p>
        </div>

        {/* TOP INFO */}
        <div className="flex justify-between items-center mb-5 gap-3">

          <div className="bg-white/70 rounded-2xl px-4 py-3 flex-1 shadow">
            <p className="text-xs text-slate-500">Calm Score</p>
            <h2 className="text-2xl font-bold text-cyan-700">
              {score}
            </h2>
          </div>

          <div className="bg-white/70 rounded-2xl px-4 py-3 flex-1 shadow">
            <p className="text-xs text-slate-500 mb-2">
              Stress Meter
            </p>

            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${energy}%` }}
                className="h-full bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full"
              />
            </div>
          </div>

        </div>

        {/* STATUS */}
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm font-medium text-cyan-700 mb-4"
        >
          {message}
        </motion.div>

        {/* GAME AREA */}
        <div className="relative h-[380px] rounded-[28px] overflow-hidden bg-gradient-to-b from-cyan-100/60 to-blue-200/40 border border-white/40 shadow-inner">

          {/* WATER WAVES */}
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-cyan-300/40 to-transparent"></div>

          {/* FLOATING TEXT */}
          <AnimatePresence>
            {floatingTexts.map((text) => (
              <motion.div
                key={text.id}
                initial={{
                  opacity: 1,
                  y: text.y,
                  x: text.x,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 0,
                  y: text.y - 50,
                  scale: 1.2,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute text-xs font-bold text-cyan-700"
              >
                + calm ✨
              </motion.div>
            ))}
          </AnimatePresence>

          {/* BUBBLES */}
          {bubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              onClick={() => popBubble(bubble)}
              animate={
                !bubble.popped
                  ? {
                      y: [0, -12, 0],
                    }
                  : {
                      scale: 0,
                      opacity: 0,
                    }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: bubble.id * 0.1,
              }}
              whileTap={{ scale: 0.7 }}
              className={`
                absolute rounded-full cursor-pointer
                flex items-center justify-center
                backdrop-blur-md border border-white/50
                shadow-lg
                ${
                  bubble.popped
                    ? ""
                    : "bg-gradient-to-br from-white/70 to-cyan-200/60"
                }
              `}
              style={{
                width: bubble.size,
                height: bubble.size,
                left: bubble.x,
                top: bubble.y,
              }}
            >

              {!bubble.popped && (
                <>
                  <div className="absolute top-2 left-3 w-2 h-2 bg-white rounded-full opacity-90"></div>

                  <span className="text-lg">🫧</span>
                </>
              )}

            </motion.div>
          ))}

        </div>

        {/* BUTTON */}
        <button
          onClick={resetGame}
          className="w-full mt-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
        >
          Restart Relaxation
        </button>

        {/* FOOTER */}
        <p className="text-center text-xs text-slate-400 mt-4">
          Every pop removes stress from your mind 🌿
        </p>

      </motion.div>
    </div>
  );
}