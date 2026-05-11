import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  User,
  Send,
  Volume2,
  Square,
  Sparkles,
} from "lucide-react";

const ChatAI = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello 👋 I’m NeuroSync AI. How are you feeling today?",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(null);

  const scrollRef = useRef(null);

  /* AUTO SCROLL */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  /* SEND MESSAGE */
  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);

    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          model: "gemma:2b",

          prompt: `
You are NeuroSync AI, a supportive wellness assistant.

Rules:
- Be calm, friendly, and supportive.
- Always answer clearly.
- Keep answers meaningful and easy to understand.
- Use bullet points when helpful.
- Never answer rudely.
- Encourage healthy and positive thinking.

User: ${currentInput}
Assistant:
          `,

          stream: true,
        }),
      });

      setMessages((prev) => [...prev, { role: "ai", text: "" }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, {
          stream: true,
        });

        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.trim()) continue;

          try {
            const json = JSON.parse(line);

            if (json.response) {
              fullText += json.response;

              setMessages((prev) => {
                const updated = [...prev];

                updated[updated.length - 1] = {
                  role: "ai",
                  text: fullText,
                };

                return updated;
              });
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "error",
          text: "⚠️ Unable to connect with Ollama server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* SPEAK */
  const speak = (index) => {
    if (speaking === index) return;

    if (speaking !== null) {
      window.speechSynthesis.cancel();
    }

    const text = messages[index]?.text;

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => {
      setSpeaking(null);
    };

    utterance.onerror = () => {
      setSpeaking(null);
    };

    window.speechSynthesis.speak(utterance);

    setSpeaking(index);
  };

  /* STOP SPEAK */
  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeaking(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-purple-100 flex items-center justify-center px-4 py-10">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white rounded-[35px] overflow-hidden shadow-2xl border border-white/50"
      >

        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-6 text-white">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-lg">
              <Sparkles size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold">
                NeuroSync AI
              </h1>

              <p className="text-sm opacity-90">
                Powered by Gemma 2B • Local & Private AI
              </p>
            </div>

          </div>

        </div>

        {/* CHAT AREA */}
        <div
          ref={scrollRef}
          className="h-[550px] overflow-y-auto bg-slate-50 px-6 py-8 space-y-5"
        >

          <AnimatePresence>

            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[85%] rounded-3xl px-5 py-4 shadow-md ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-md"
                      : msg.role === "error"
                      ? "bg-red-100 text-red-600"
                      : "bg-white text-slate-800 rounded-bl-md border border-slate-200"
                  }`}
                >

                  {/* ICON */}
                  <div className="flex items-center gap-2 mb-2">

                    {msg.role === "user" ? (
                      <User size={18} />
                    ) : (
                      <Bot size={18} />
                    )}

                    <span className="text-xs font-semibold opacity-70 uppercase">
                      {msg.role === "user"
                        ? "You"
                        : msg.role === "ai"
                        ? "NeuroSync"
                        : "System"}
                    </span>

                  </div>

                  {/* TEXT */}
                  <p className="leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                    {msg.text}
                  </p>

                  {/* SPEAK BUTTON */}
                  {msg.role === "ai" && msg.text && (
                    <div className="mt-4 flex gap-3">

                      {speaking === index ? (
                        <button
                          onClick={stopSpeaking}
                          className="flex items-center gap-1 text-red-500 text-sm hover:underline"
                        >
                          <Square size={15} />
                          Stop
                        </button>
                      ) : (
                        <button
                          onClick={() => speak(index)}
                          className="flex items-center gap-1 text-indigo-600 text-sm hover:underline"
                        >
                          <Volume2 size={15} />
                          Speak
                        </button>
                      )}

                    </div>
                  )}

                </div>

              </motion.div>
            ))}

          </AnimatePresence>

          {/* LOADING */}
          {loading && (
            <div className="flex justify-start">

              <div className="bg-white border border-slate-200 rounded-3xl px-5 py-4 shadow-md">

                <div className="flex gap-2">

                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-200"></div>

                </div>

              </div>

            </div>
          )}

        </div>

        {/* INPUT AREA */}
        <div className="p-5 bg-white border-t border-slate-200">

          <div className="flex items-center gap-3">

            <input
              type="text"
              placeholder="Talk with NeuroSync AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSendMessage()
              }
              className="flex-1 bg-slate-100 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
            />

            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-4 rounded-2xl font-bold shadow-lg transition-all duration-300 disabled:opacity-50"
            >

              <Send size={20} />

            </button>

          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default ChatAI;