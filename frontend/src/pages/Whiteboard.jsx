import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  Trash2,
  PawPrint,
  Palette,
  PenTool,
} from "lucide-react";

export default function Whiteboard() {
  const canvasRef = useRef(null);

  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [text, setText] = useState("");

  const [selectedAnim, setSelectedAnim] = useState("fire");

  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  /* DRAW */
  const startDraw = (e) => {
    const ctx = canvasRef.current.getContext("2d");

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;

    const ctx = canvasRef.current.getContext("2d");

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDraw = () => {
    setDrawing(false);
  };

  /* DISCARD */
  const handleDiscard = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const image = canvas.toDataURL();

    setPreviewImage(image);
    setShowPreview(true);

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setText("");

    setTimeout(() => {
      setShowPreview(false);
      setPreviewImage("");
    }, 2200);
  };

  /* CLEAR */
  const clearCanvas = () => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setText("");
  };

  const colors = [
    "#000000",
    "#ef4444",
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#a855f7",
    "#ec4899",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 px-4 py-8">

      {/* HEADER */}
      <div className="text-center mb-8">

        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800">
          Express & Release
        </h1>

        <p className="mt-3 text-slate-500 text-base">
          Draw your emotions, write your thoughts, and let them go peacefully
        </p>

      </div>

      {/* MAIN */}
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_250px] gap-5">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[30px] shadow-2xl p-5 md:p-6"
        >

          {/* TOOLS */}
          <div className="flex flex-wrap items-center justify-between gap-5 mb-5">

            {/* COLORS */}
            <div>

              <div className="flex items-center gap-2 mb-3">

                <Palette className="text-indigo-500" size={18} />

                <h3 className="font-bold text-slate-700 text-sm">
                  Choose Color
                </h3>

              </div>

              <div className="flex gap-2">

                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    style={{ background: c }}
                    className={`w-8 h-8 rounded-full border-4 transition-all ${
                      color === c
                        ? "border-slate-700 scale-110"
                        : "border-white"
                    }`}
                  />
                ))}

              </div>

            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">

              <button
                onClick={clearCanvas}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-sm transition"
              >
                Clear
              </button>

              <button
                onClick={handleDiscard}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold text-sm shadow-lg transition"
              >
                Release
              </button>

            </div>

          </div>

          {/* CANVAS */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-md">

            <canvas
              ref={canvasRef}
              width={700}
              height={350}
              className="bg-white w-full cursor-crosshair"
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
            />

          </div>

          {/* TEXT AREA */}
          <div className="mt-5">

            <div className="flex items-center gap-2 mb-3">

              <PenTool className="text-purple-500" size={18} />

              <h3 className="font-bold text-slate-700 text-sm">
                Write Your Thoughts
              </h3>

            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your emotions, stress, fears, or thoughts here..."
              className="w-full min-h-[120px] rounded-3xl border border-slate-200 bg-slate-50 p-4 outline-none focus:ring-2 focus:ring-indigo-400 text-slate-700 resize-none"
            />

          </div>

        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[30px] shadow-2xl p-5 h-fit sticky top-10"
        >

          <h2 className="text-xl font-extrabold text-slate-800 text-center">
            Release Methods
          </h2>

          <p className="text-slate-500 text-center mt-2 mb-6 text-sm">
            Choose how you want to let go
          </p>

          <div className="space-y-4">

            {/* FIRE */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedAnim("fire")}
              className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                selectedAnim === "fire"
                  ? "bg-red-50 border-red-400 shadow-lg"
                  : "bg-white border-slate-200"
              }`}
            >

              <Flame className="text-red-500 mb-3" size={30} />

              <h3 className="font-bold text-lg text-slate-800">
                Burn It
              </h3>

              <p className="text-slate-500 mt-1 text-xs">
                Let painful thoughts fade away.
              </p>

            </motion.div>

            {/* TRASH */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedAnim("trash")}
              className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                selectedAnim === "trash"
                  ? "bg-slate-100 border-slate-500 shadow-lg"
                  : "bg-white border-slate-200"
              }`}
            >

              <Trash2 className="text-slate-700 mb-3" size={30} />

              <h3 className="font-bold text-lg text-slate-800">
                Throw Away
              </h3>

              <p className="text-slate-500 mt-1 text-xs">
                Remove negativity from your mind.
              </p>

            </motion.div>

            {/* ANIMAL */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedAnim("animal")}
              className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                selectedAnim === "animal"
                  ? "bg-yellow-50 border-yellow-400 shadow-lg"
                  : "bg-white border-slate-200"
              }`}
            >

              <PawPrint className="text-yellow-600 mb-3" size={30} />

              <h3 className="font-bold text-lg text-slate-800">
                Animal Eats
              </h3>

              <p className="text-slate-500 mt-1 text-xs">
                Symbolically release your worries.
              </p>

            </motion.div>

          </div>

        </motion.div>

      </div>

      {/* PREVIEW */}
      <AnimatePresence>

        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          >

            <div className="relative w-[500px] h-[320px] bg-white rounded-[30px] overflow-hidden shadow-2xl">

              <img
                src={previewImage}
                alt="preview"
                className={`
                  absolute w-full h-full object-contain

                  ${
                    selectedAnim === "fire" &&
                    "animate-[burnPro_2.2s_ease-in-out]"
                  }

                  ${
                    selectedAnim === "trash" &&
                    "animate-[trashPro_2.2s_ease-in-out]"
                  }

                  ${
                    selectedAnim === "animal" &&
                    "animate-[eatPro_2.2s_ease-in-out]"
                  }
                `}
              />

              {/* FIRE */}
              {selectedAnim === "fire" && (
                <div className="absolute inset-0 flex items-center justify-center text-7xl animate-pulse">
                  🔥🔥🔥
                </div>
              )}

              {/* ANIMAL */}
              {selectedAnim === "animal" && (
                <div className="absolute bottom-4 right-4 text-6xl animate-bounce">
                  🐶
                </div>
              )}

            </div>

          </motion.div>
        )}

      </AnimatePresence>

      {/* ANIMATIONS */}
      <style>
        {`
        @keyframes burnPro {
          0% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            filter: brightness(1);
          }

          100% {
            opacity: 0;
            transform: scale(0.4) rotate(10deg);
            filter: brightness(0);
          }
        }

        @keyframes trashPro {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }

          100% {
            transform: translateY(500px) rotate(30deg);
            opacity: 0;
          }
        }

        @keyframes eatPro {
          0% {
            transform: scale(1);
            opacity: 1;
          }

          100% {
            transform: scale(0);
            opacity: 0;
          }
        }
        `}
      </style>

    </div>
  );
}