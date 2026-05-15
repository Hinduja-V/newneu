import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import {
  FiSend,
  FiPlus,
  FiMic,
} from "react-icons/fi";

import {
  HiOutlineSparkles,
} from "react-icons/hi";

import {
  BsRobot,
} from "react-icons/bs";

import { sendMessageToBot } from "../services/chatApi";

export default function CBTChatbot() {

  // ================= STATE =================
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello 👋 I’m your CBT wellness assistant. How are you feeling today?",
    },
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // ================= AUTO SCROLL =================
  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);

  // ================= SEND MESSAGE =================
  const handleSend = async () => {

    if (!input.trim()) return;

    const currentInput = input;

    // USER MESSAGE
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: currentInput,
      },
    ]);

    setInput("");

    setLoading(true);

    try {

      const botReply = await sendMessageToBot(
        currentInput
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botReply,
        },
      ]);

    } catch (err) {

      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
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
      handleSend();
    }
  };

  return (
    <div className="h-screen bg-[#f7f7f8] flex flex-col overflow-hidden">

      {/* ================= TOP BAR ================= */}
      <div className="h-[70px] border-b border-gray-200 bg-white flex items-center justify-between px-8">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
            <BsRobot className="text-2xl" />
          </div>

          <div>

            <h1 className="text-[22px] font-bold text-gray-800">
              MindCare AI
            </h1>

            <p className="text-sm text-gray-500">
              Cognitive Behavioral Therapy Assistant
            </p>

          </div>

        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">

          <HiOutlineSparkles />

          AI Active

        </div>

      </div>

      {/* ================= CHAT BODY ================= */}
      <div className="flex-1 overflow-y-auto">

        <div className="max-w-4xl mx-auto px-6 py-10">

          {/* EMPTY STATE */}
          {messages.length === 1 && (

            <div className="h-[70vh] flex flex-col items-center justify-center text-center">

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >

                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-2xl mx-auto mb-8">
                  <BsRobot className="text-5xl" />
                </div>

                <h1 className="text-5xl font-bold text-gray-800 mb-5">
                  MindCare AI
                </h1>

                <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
                  A safe AI-powered CBT assistant designed to
                  support emotional wellness, stress management,
                  and mindful conversations.
                </p>

              </motion.div>

            </div>
          )}

          {/* ================= MESSAGES ================= */}
          <div className="space-y-8">

            {messages.map((msg, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[75%] ${
                    msg.sender === "user"
                      ? "flex flex-row-reverse items-end gap-3"
                      : "flex items-start gap-3"
                  }`}
                >

                  {/* AVATAR */}
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
                        : "bg-white border border-gray-200 text-cyan-600"
                    }`}
                  >

                    {msg.sender === "user" ? (
                      "D"
                    ) : (
                      <BsRobot className="text-xl" />
                    )}

                  </div>

                  {/* MESSAGE */}
                  <div
                    className={`px-6 py-4 rounded-3xl text-[15px] leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-md"
                        : "bg-white border border-gray-200 text-gray-700 rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>

                </div>

              </motion.div>
            ))}

            {/* ================= LOADING ================= */}
            {loading && (

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >

                <div className="flex items-start gap-3">

                  <div className="w-11 h-11 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-cyan-600 shadow-sm">
                    <BsRobot className="text-xl" />
                  </div>

                  <div className="bg-white border border-gray-200 rounded-3xl rounded-bl-md px-5 py-4 flex items-center gap-2 shadow-sm">

                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></span>

                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-100"></span>

                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-200"></span>

                  </div>

                </div>

              </motion.div>
            )}

            <div ref={chatEndRef}></div>

          </div>

        </div>

      </div>

      {/* ================= INPUT AREA ================= */}
      <div className="border-t border-gray-200 bg-white px-6 py-5">

        <div className="max-w-4xl mx-auto">

          <div className="flex items-center gap-4 bg-[#f4f4f5] border border-gray-200 rounded-full px-5 py-3 shadow-sm">

            {/* PLUS */}
            <button className="text-gray-500 hover:text-gray-700 transition">
              <FiPlus className="text-2xl" />
            </button>

            {/* INPUT */}
            <input
              type="text"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-[16px]"
            />

            {/* MIC */}
            <button className="text-gray-500 hover:text-gray-700 transition">
              <FiMic className="text-2xl" />
            </button>

            {/* SEND */}
            <button
              onClick={handleSend}
              disabled={loading}
              className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition"
            >
              <FiSend className="text-lg" />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}