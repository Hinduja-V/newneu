import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  HeartHandshake,
  Bot,
  Music2,
  ShieldAlert,
} from "lucide-react";

const SOSPage = () => {
  const [showMusic, setShowMusic] = useState(false);

  const handleEmergency = () => {
    alert("🚨 Emergency Alert Sent Successfully!");
  };

  const handleAI = () => {
    alert("🤖 Connecting to AI Support...");
  };

  const handleCalm = () => {
    setShowMusic(!showMusic);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-rose-50 to-pink-100 flex items-center justify-center px-6 py-10">

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden grid md:grid-cols-2"
      >

        {/* LEFT SIDE IMAGE */}
        <div className="relative h-[350px] md:h-auto">

          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop"
            alt="Emergency Support"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">

            <div className="bg-white/20 backdrop-blur-lg p-5 rounded-full mb-5">
              <ShieldAlert className="text-white" size={50} />
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Emergency <br /> Support
            </h1>

            <p className="text-white/90 mt-5 text-lg italic max-w-sm">
              “When everything feels overwhelming, support is just one tap away.”
            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-10 flex flex-col justify-center">

          <p className="uppercase tracking-[4px] text-red-500 font-bold text-sm">
            You Are Not Alone
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-3 leading-tight">
            Get Immediate Help & Emotional Support
          </h2>

          <p className="text-slate-500 mt-5 leading-relaxed text-lg">
            If you are feeling anxious, stressed, overwhelmed, or unsafe,
            reach out immediately. Calm support and emergency help are available.
          </p>

          {/* SOS BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleEmergency}
            className="mt-8 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white py-4 rounded-2xl text-lg font-bold shadow-lg flex items-center justify-center gap-3"
          >

            <Phone size={22} />
            Trigger SOS Alert

          </motion.button>

          {/* ACTION BUTTONS */}
          <div className="grid sm:grid-cols-2 gap-4 mt-6">

            {/* AI SUPPORT */}
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAI}
              className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-2xl p-5 text-left transition-all"
            >

              <Bot className="text-blue-600 mb-3" size={28} />

              <h3 className="font-bold text-slate-800 text-lg">
                AI Support
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Talk with calming AI guidance and emotional support.
              </p>

            </motion.button>

            {/* CALM MUSIC */}
            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCalm}
              className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-2xl p-5 text-left transition-all"
            >

              <Music2 className="text-green-600 mb-3" size={28} />

              <h3 className="font-bold text-slate-800 text-lg">
                Calm Me Down
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Relax with peaceful breathing music and calming sounds.
              </p>

            </motion.button>

          </div>

          {/* EXTRA SUPPORT */}
          <div className="mt-8 bg-rose-50 border border-rose-100 rounded-2xl p-5 flex gap-4">

            <HeartHandshake className="text-rose-500 mt-1" size={30} />

            <div>

              <h4 className="font-bold text-slate-800">
                Remember
              </h4>

              <p className="text-slate-500 text-sm mt-1">
                Asking for help is a sign of strength, not weakness.
              </p>

            </div>

          </div>

        </div>

      </motion.div>

      {/* MUSIC PLAYER */}
      <AnimatePresence>

        {showMusic && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6 w-[360px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
          >

            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-4 text-white font-bold text-lg">
              🌿 Relaxing Music Therapy
            </div>

            <iframe
              className="w-full h-[220px]"
              src="https://www.youtube.com/embed/2OEL4P1Rz04?autoplay=1"
              title="Relaxing Music"
              allow="autoplay"
              allowFullScreen
            />

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};

export default SOSPage;