export default function ResultPage() {
  const result = localStorage.getItem("result") || "normal";

  const data = {
    stress: {
      title: "Stress Detected 😟",
      color: "from-amber-100",
      message: "You are experiencing stress. Relaxation recommended."
    },
    depression: {
      title: "Depression Risk 💙",
      color: "from-indigo-100",
      message: "You may need emotional support. You're not alone."
    },
    normal: {
      title: "All Good 🌿",
      color: "from-emerald-100",
      message: "Your mental health is stable. Keep it up!"
    }
  };

  const info = data[result];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-6">

      <div className={`bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl text-center border`}>
        
        <h1 className="text-3xl font-bold text-slate-800">
          AI Analysis Result
        </h1>

        <div className={`mt-6 p-6 rounded-2xl bg-gradient-to-br ${info.color}`}>
          <h2 className="text-2xl font-bold">{info.title}</h2>
          <p className="text-slate-600 mt-2">{info.message}</p>
        </div>

        <button
          onClick={() => window.location.href = `/dashboard/${result}`}
          className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold"
        >
          Continue to Dashboard
        </button>

      </div>
    </div>
  );
}