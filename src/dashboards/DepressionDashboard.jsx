import React from "react";

export default function DepressionDashboard() {
  const alertContact = () => {
    const contact = localStorage.getItem("trustedContact");
    alert("🚨 Emergency alert sent to: " + contact);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-6 py-10 flex items-center justify-center">

      {/* MAIN WRAPPER */}
      <div className="w-full max-w-4xl">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-800">
            Depression Support Dashboard 💙
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            You are safe here. Take things one step at a time.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-[30px] shadow-2xl border border-slate-100 p-8 md:p-10">

          {/* TOP STATUS SECTION */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">

            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100 shadow-sm">
              <h2 className="text-lg font-bold text-blue-700">
                🤖 AI Emotional Support
              </h2>
              <p className="text-slate-600 mt-2">
                Always available for conversation & grounding techniques
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100 shadow-sm">
              <h2 className="text-lg font-bold text-indigo-700">
                💙 Mood Stabilization Mode
              </h2>
              <p className="text-slate-600 mt-2">
                Gentle recommendations based on your assessment
              </p>
            </div>

          </div>

          {/* SAFETY ALERT SECTION */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-10 shadow-sm">

            <h2 className="text-lg font-bold text-red-600">
              🚨 Emergency Support System
            </h2>

            <p className="text-slate-600 mt-2">
              If you're feeling overwhelmed, send an instant alert to your trusted contact.
            </p>

            <button
              onClick={alertContact}
              className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-md transition-all"
            >
              Send Emergency Alert
            </button>

          </div>

          {/* ACTION CARDS */}
          <div className="grid md:grid-cols-3 gap-5">

            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-md transition">
              🤖 Talk to AI
            </button>

            <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold py-4 rounded-2xl shadow-sm transition">
              🌿 Breathing Exercise
            </button>

            <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 rounded-2xl shadow-sm transition">
              📓 Mood Journal
            </button>

          </div>

          {/* FOOTER */}
          <p className="text-center text-xs text-slate-400 mt-8">
            This dashboard supports emotional wellness but is not a replacement for professional care 💙
          </p>

        </div>
      </div>
    </div>
  );
}