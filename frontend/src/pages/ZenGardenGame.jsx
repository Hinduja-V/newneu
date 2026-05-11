import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ZenGardenGame() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  const [drawing, setDrawing] = useState(false);
  const [mode, setMode] = useState("wave");

  // 🌿 INIT
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 520;
    canvas.height = 300;

    const particles = [];

    for (let i = 0; i < 320; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
        size: Math.random() * 2 + 1,
      });
    }

    particlesRef.current = particles;

    const animate = () => {
      // background fade
      ctx.fillStyle = "rgba(250,247,240,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // subtle gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#fefae0");
      gradient.addColorStop(1, "#f5ebe0");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        // edge loop
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.fillStyle = "#c2a878";
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  // 🌊 INTERACTION MODES
  const interact = (x, y) => {
    particlesRef.current.forEach((p) => {
      const dx = p.x - x;
      const dy = p.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 45) {
        if (mode === "wave") {
          p.vx += dx * 0.015;
          p.vy += dy * 0.015;
        }

        if (mode === "spiral") {
          p.vx += -dy * 0.01;
          p.vy += dx * 0.01;
        }

        if (mode === "push") {
          p.vx += dx * 0.03;
          p.vy += dy * 0.03;
        }
      }
    });
  };

  const handleMouseDown = (e) => {
    setDrawing(true);
    interact(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    interact(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  // 🔄 RESET
  const resetGarden = () => {
    particlesRef.current.forEach((p) => {
      p.x = Math.random() * 520;
      p.y = Math.random() * 300;
      p.vx = 0;
      p.vy = 0;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6ec] via-[#f6fff8] to-[#edf6f9] flex flex-col items-center justify-center px-4 py-8 overflow-hidden">

      {/* SOFT GLOW */}
      <div className="absolute w-[300px] h-[300px] bg-green-100 blur-[120px] rounded-full top-0 left-0 opacity-40"></div>
      <div className="absolute w-[300px] h-[300px] bg-yellow-100 blur-[120px] rounded-full bottom-0 right-0 opacity-40"></div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl rounded-[32px] p-6 w-full max-w-2xl"
      >

        {/* TITLE */}
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold text-emerald-700">
            🌾 Zen Garden Therapy
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Move your cursor gently and create peaceful sand waves
          </p>
        </div>

        {/* MODES */}
        <div className="flex justify-center gap-3 mb-5 flex-wrap">

          <button
            onClick={() => setMode("wave")}
            className={`px-4 py-2 rounded-xl text-sm transition
            ${mode === "wave"
                ? "bg-emerald-600 text-white"
                : "bg-white text-gray-700 shadow"
              }`}
          >
            🌊 Wave
          </button>

          <button
            onClick={() => setMode("spiral")}
            className={`px-4 py-2 rounded-xl text-sm transition
            ${mode === "spiral"
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 shadow"
              }`}
          >
            🌀 Spiral
          </button>

          <button
            onClick={() => setMode("push")}
            className={`px-4 py-2 rounded-xl text-sm transition
            ${mode === "push"
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-700 shadow"
              }`}
          >
            ✨ Push
          </button>

        </div>

        {/* CANVAS */}
        <div className="rounded-3xl overflow-hidden border border-[#e6dccf] shadow-inner bg-[#faf7f2]">

          <canvas
            ref={canvasRef}
            width={520}
            height={300}
            className="w-full cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />

        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-6">

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGarden}
            className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-2xl shadow-lg font-medium"
          >
            Reset Garden 🌿
          </motion.button>

        </div>

        {/* FOOTER */}
        <p className="text-center text-xs text-gray-400 mt-5">
          Slow movement creates calm energy ✨
        </p>

      </motion.div>

    </div>
  );
}