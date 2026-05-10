import React from "react";

export default function NormalDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 px-6 py-10 flex items-center justify-center">

      {/* MAIN WRAPPER */}
      <div className="w-full max-w-5xl">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-800">
            Wellness Dashboard 🌿
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            You are in a balanced and healthy mental state
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-[30px] shadow-2xl border border-slate-100 p-8 md:p-10">

          {/* STATUS GRID */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-green-50 border border-green-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-green-700 font-bold text-lg">
                🔥 Energy Level
              </h2>
              <p className="text-slate-600 mt-2">
                Balanced & stable
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-blue-700 font-bold text-lg">
                🧠 Mental State
              </h2>
              <p className="text-slate-600 mt-2">
                Healthy & focused
              </p>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-indigo-700 font-bold text-lg">
                📊 Mood Status
              </h2>
              <p className="text-slate-600 mt-2">
                Positive & stable
              </p>
            </div>

          </div>

          {/* DAILY TASK SECTION */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-10 border border-slate-100">

            <h2 className="text-xl font-bold text-slate-700 mb-4">
              📘 Daily Wellness Tasks
            </h2>

            <ul className="space-y-3 text-slate-600">
              <li>✔ Drink enough water (2–3L)</li>
              <li>✔ Take short breathing breaks</li>
              <li>✔ Spend 10 minutes in nature or sunlight</li>
              <li>✔ Write 1 positive thought</li>
            </ul>

          </div>

          {/* QUICK ACTIONS */}
          <div className="grid md:grid-cols-3 gap-5">

            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-md transition">
              🧘 Meditation
            </button>

            <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold py-4 rounded-2xl shadow-sm transition">
              📓 Mood Journal
            </button>

            <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold py-4 rounded-2xl shadow-sm transition">
              🎵 Calm Music
            </button>

          </div>

          {/* FOOTER */}
          <p className="text-center text-xs text-slate-400 mt-8">
            Keep maintaining your wellness habits daily 🌱
          </p>

        </div>
      </div>
    </div>
  );
}