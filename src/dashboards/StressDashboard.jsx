import React from "react";

export default function StressDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50 px-6 py-10 flex items-center justify-center">

      {/* MAIN WRAPPER */}
      <div className="w-full max-w-5xl">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-800">
            Stress Relief Dashboard 🌿
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Take a pause. Your mind deserves rest.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-[30px] shadow-2xl border border-slate-100 p-8 md:p-10">

          {/* STATUS BANNER */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-10 shadow-sm">
            <h2 className="text-amber-700 font-bold text-lg">
              ⚠️ Stress Level Detected
            </h2>
            <p className="text-slate-600 mt-2">
              Recommended calming activities activated for your well-being
            </p>
          </div>

          {/* FEATURE CARDS */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-blue-700 font-bold text-lg">
                🧘 Breathing
              </h2>
              <p className="text-slate-600 mt-2">
                Guided breathing to reduce anxiety
              </p>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-indigo-700 font-bold text-lg">
                🎵 Relaxation Music
              </h2>
              <p className="text-slate-600 mt-2">
                Calm sounds to stabilize mood
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-emerald-700 font-bold text-lg">
                🌿 Nature Break
              </h2>
              <p className="text-slate-600 mt-2">
                Step outside & reset your mind
              </p>
            </div>

          </div>

          {/* QUICK ACTION BUTTONS */}
          <div className="grid md:grid-cols-3 gap-5">

            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-md transition">
              🧘 Start Breathing
            </button>

            <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold py-4 rounded-2xl shadow-sm transition">
              🎧 Play Music
            </button>

            <button className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-bold py-4 rounded-2xl shadow-sm transition">
              🌳 Take Nature Break
            </button>

          </div>

          {/* FOOTER */}
          <p className="text-center text-xs text-slate-400 mt-8">
            Small breaks reduce stress significantly over time 🌱
          </p>

        </div>
      </div>
    </div>
  );
}