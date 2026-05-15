import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FiSend,
  FiActivity,
} from "react-icons/fi";

import {
  FaBrain,
  FaRobot,
  FaUserCircle,
} from "react-icons/fa";

export default function DepressionPage() {

  // ================= STATE =================
  const [chat, setChat] = useState([
    {
      role: "bot",
      text: "Hello 👋 I'm your CBT wellness assistant. How are you feeling today?",
    },
  ]);

  const [msg, setMsg] = useState("");

  const [loading, setLoading] = useState(false);

  const [phqAnswers, setPhqAnswers] = useState(
    Array(9).fill(0)
  );

  const [result, setResult] = useState(null);

  const chatEndRef = useRef(null);

  // ================= AUTO SCROLL =================
  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [chat, loading]);

  // ================= SEND CHAT =================
  const sendChat = async () => {

    if (!msg.trim()) return;

    const currentMsg = msg;

    setChat((prev) => [
      ...prev,
      {
        role: "user",
        text: currentMsg,
      },
    ]);

    setMsg("");

    setLoading(true);

    try {

      const res = await fetch(
        "http://127.0.0.1:8000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: currentMsg,
          }),
        }
      );

      const data = await res.json();

      setChat((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.reply,
        },
      ]);

    } catch (err) {

      console.error(err);

      setChat((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Unable to connect to AI server.",
        },
      ]);

    } finally {

      setLoading(false);
    }
  };

  // ================= ENTER SEND =================
  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      sendChat();
    }
  };

  // ================= PHQ CHANGE =================
  const handleChange = (i, value) => {

    const updated = [...phqAnswers];

    updated[i] = Number(value);

    setPhqAnswers(updated);
  };

  // ================= SUBMIT PHQ =================
  const submitPHQ = async () => {

    try {

      const res = await fetch(
        "http://127.0.0.1:8000/phq9",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: phqAnswers,
          }),
        }
      );

      const data = await res.json();

      const ml = await fetch(
        "http://127.0.0.1:8000/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            score: data.score,
          }),
        }
      );

      const mlData = await ml.json();

      setResult({
        score: data.score,
        level: data.level,
        prediction: mlData.prediction,
      });

    } catch (err) {

      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f8fb] flex">

      {/* ================= LEFT CHAT ================= */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
              <FaBrain className="text-2xl" />
            </div>

            <div>

              <h1 className="text-2xl font-bold text-gray-800">
                MindCare AI
              </h1>

              <p className="text-gray-500 text-sm">
                Cognitive Behavioral Therapy Assistant
              </p>

            </div>

          </div>

          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            AI Active
          </div>

        </div>

        {/* CHAT BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-8">

          <div className="max-w-4xl mx-auto space-y-6">

            {chat.map((c, i) => (

              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  c.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div className="flex items-end gap-3 max-w-[80%]">

                  {c.role === "bot" && (
                    <div className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center shrink-0">
                      <FaRobot />
                    </div>
                  )}

                  <div
                    className={`px-5 py-4 rounded-3xl shadow-md text-[15px] leading-relaxed ${
                      c.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-md"
                        : "bg-white border border-gray-200 text-gray-700 rounded-bl-md"
                    }`}
                  >
                    {c.text}
                  </div>

                  {c.role === "user" && (
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <FaUserCircle />
                    </div>
                  )}

                </div>

              </motion.div>
            ))}

            {/* LOADING */}
            {loading && (

              <div className="flex justify-start">

                <div className="flex items-end gap-3">

                  <div className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center">
                    <FaRobot />
                  </div>

                  <div className="bg-white border border-gray-200 px-5 py-4 rounded-3xl flex gap-2">

                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-200"></span>

                  </div>

                </div>

              </div>
            )}

            <div ref={chatEndRef}></div>

          </div>

        </div>

        {/* INPUT */}
        <div className="bg-white border-t border-gray-200 p-5">

          <div className="max-w-4xl mx-auto flex items-center gap-4">

            <input
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Share your thoughts..."
              className="flex-1 bg-gray-100 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-cyan-400 text-gray-700"
            />

            <button
              onClick={sendChat}
              disabled={loading}
              className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all"
            >
              <FiSend className="text-2xl" />
            </button>

          </div>

        </div>

      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div className="w-[400px] bg-white border-l border-gray-200 p-6 hidden lg:block overflow-y-auto">

        <div className="sticky top-0">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex items-center justify-center">
              <FiActivity className="text-2xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                PHQ-9 Assessment
              </h2>

              <p className="text-sm text-gray-500">
                Mental wellness evaluation
              </p>
            </div>

          </div>

          <div className="space-y-4">

            {phqAnswers.map((val, i) => (

              <div
                key={i}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-4"
              >

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Question {i + 1}
                </label>

                <select
                  value={val}
                  onChange={(e) =>
                    handleChange(i, e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value={0}>0 - Not at all</option>
                  <option value={1}>1 - Several days</option>
                  <option value={2}>2 - More than half</option>
                  <option value={3}>3 - Nearly every day</option>
                </select>

              </div>
            ))}

          </div>

          <button
            onClick={submitPHQ}
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-2xl font-semibold shadow-lg hover:scale-[1.02] transition"
          >
            Submit Assessment
          </button>

          {/* RESULT */}
          {result && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 bg-cyan-50 border border-cyan-100 rounded-2xl p-5"
            >

              <h3 className="text-xl font-bold text-gray-800 mb-4">
                AI Result
              </h3>

              <div className="space-y-3 text-gray-700">

                <p>
                  <span className="font-semibold">
                    Score:
                  </span>{" "}
                  {result.score}
                </p>

                <p>
                  <span className="font-semibold">
                    PHQ Level:
                  </span>{" "}
                  {result.level}
                </p>

                <p>
                  <span className="font-semibold">
                    ML Prediction:
                  </span>{" "}
                  {result.prediction}
                </p>

              </div>

            </motion.div>
          )}

        </div>

      </div>

    </div>
  );
}