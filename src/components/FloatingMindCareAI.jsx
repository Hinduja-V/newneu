import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Minimize2, BrainCircuit } from "lucide-react";
import { useNavigate } from "react-router-dom";
const FloatingMindCareAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi 👋 I'm MindCare AI. How are you feeling today?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);

  // Auto Scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Send Message
  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

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
System:
You are MindCare AI, a calm emotional wellness assistant.
Reply supportively and briefly.

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

        const chunk = decoder.decode(value, { stream: true });
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
          text: "Unable to connect with MindCare AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
     <button
  onClick={() => navigate("/chat")}
  className="fixed bottom-5 right-5 z-50 bg-gradient-to-br from-indigo-600 via-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:scale-110 transition-all duration-300 group"
>
  <div className="relative">
    <Sparkles size={28} className="group-hover:rotate-12 transition-transform duration-300" />

    <span className="absolute -top-1 -right-1 flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-300"></span>
    </span>
  </div>
</button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-5 right-5 z-50 w-[370px] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
            isMinimized ? "h-[70px]" : "h-[600px]"
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <BrainCircuit size={20} />
              </div>
              <div>
                <h2 className="font-bold text-lg leading-tight">MindCare AI</h2>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <p className="text-[10px] opacity-90 uppercase tracking-wider font-semibold">Online Assistant</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMinimized(!isMinimized)} 
                className="hover:bg-white/20 p-1.5 rounded-full transition-colors"
              >
                <Minimize2 size={18} />
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/20 p-1.5 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          {!isMinimized && (
            <>
              {/* Suggested Prompts */}
              <div className="p-3 flex flex-wrap gap-2 bg-slate-50 border-b">
                {[
                  "😟 I feel anxious",
                  "😔 I'm stressed",
                  "😴 Feeling tired",
                  "😌 I want calmness",
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(item)}
                    className="text-xs px-3 py-2 bg-white border rounded-full hover:bg-indigo-50 transition"
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 h-[420px] overflow-y-auto p-4 space-y-4 bg-slate-50"
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                        message.role === "user"
                          ? "bg-indigo-600 text-white rounded-br-none"
                          : message.role === "error"
                          ? "bg-red-100 text-red-600"
                          : "bg-white text-gray-800 shadow border rounded-bl-none"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="text-sm text-gray-500">
                    MindCare AI is typing...
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t bg-white flex gap-2">
                <input
                  type="text"
                  placeholder="Share your thoughts..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSendMessage()
                  }
                  className="flex-1 bg-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <button
                  onClick={handleSendMessage}
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 rounded-xl font-semibold transition disabled:opacity-50"
                >
                  Send
                </button>
              </div>

              {/* Full Chat Page Button */}
              <div className="px-4 pb-4">
                <button className="w-full text-sm text-indigo-600 hover:underline">
                  Continue Full Conversation →
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingMindCareAI;