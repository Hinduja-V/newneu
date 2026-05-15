import { useState, useRef, useEffect } from "react";

const FontLink = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');`}</style>
);

const PROMPTS = {
  wellness: `You are a cheerful, motivating mental wellness coach. The user is mentally healthy and thriving. Be upbeat, brief (2-3 sentences), celebrate their wins, suggest simple positive habits, and keep energy high and encouraging.`,
  stress: `You are a calm CBT therapist assistant for someone under moderate stress. Use gentle Cognitive Behavioral Therapy: explore thoughts, offer compassionate reframes, suggest grounding or breathing. Be warm and concise (2-3 sentences).`,
  support: `You are a deeply empathetic mental health companion for someone in emotional pain. Be soft, validating, never dismissive. Remind them they matter, celebrate tiny steps, gently encourage professional help. Responses gentle and brief (2-3 sentences).`,
};

const DASHBOARDS = [
  { id: "wellness", label: "Wellness Dashboard", emoji: "🌿", tagline: "You're thriving!" },
  { id: "stress", label: "Stress Relief", emoji: "💙", tagline: "Let's breathe together" },
  { id: "support", label: "Support Space", emoji: "🌸", tagline: "You are not alone" },
];

const THEMES = {
  wellness: {
    bg: "#f0faf4",
    card: "#ffffff",
    accent: "#18a058",
    accentBg: "#e8f7ef",
    border: "#c6e9d4",
    text: "#1a3d28",
    muted: "#5a8a6a",
    pill: "#d0f0de",
    pillText: "#0e6e3a",
    btn: "linear-gradient(135deg,#18a058,#0e7a42)",
    shadow: "0 2px 16px rgba(24,160,88,0.10)",
  },
  stress: {
    bg: "#f0f6ff",
    card: "#ffffff",
    accent: "#3b82f6",
    accentBg: "#e8f0ff",
    border: "#bfdbfe",
    text: "#1e3a5f",
    muted: "#4a6a9a",
    pill: "#dbeafe",
    pillText: "#1d4ed8",
    btn: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
    shadow: "0 2px 16px rgba(59,130,246,0.10)",
  },
  support: {
    bg: "#fdf4ff",
    card: "#ffffff",
    accent: "#a855f7",
    accentBg: "#f5e8ff",
    border: "#e9d5ff",
    text: "#3b1f5e",
    muted: "#7a5a9a",
    pill: "#ede9fe",
    pillText: "#6d28d9",
    btn: "linear-gradient(135deg,#a855f7,#7c3aed)",
    shadow: "0 2px 16px rgba(168,85,247,0.10)",
  },
};

function Card({ t, children, style = {} }) {
  return (
    <div
      style={{
        background: t.card,
        border: `1.5px solid ${t.border}`,
        borderRadius: 20,
        padding: "20px",
        marginBottom: 16,
        boxShadow: t.shadow,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SLabel({ t, children }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 700,
        color: t.accent,
        marginBottom: 14,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

const MOODS = [
  ["😄", "Joyful"],
  ["🙂", "Good"],
  ["😐", "Okay"],
  ["😔", "Low"],
  ["😢", "Hard"],
];

function MoodPicker({ t, mood, setMood }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {MOODS.map(([em, label], i) => (
        <button
          key={i}
          onClick={() => setMood(i)}
          style={{
            background: mood === i ? t.accentBg : "transparent",
            border: `1.5px solid ${mood === i ? t.accent : t.border}`,
            borderRadius: 14,
            padding: "10px 6px",
            cursor: "pointer",
            textAlign: "center",
            transition: "all 0.2s",
            minWidth: 50,
            fontFamily: "inherit",
          }}
        >
          <div style={{ fontSize: 24 }}>{em}</div>
          <div style={{ fontSize: 10, color: t.muted, marginTop: 4, fontWeight: 500 }}>{label}</div>
        </button>
      ))}
    </div>
  );
}

function ProgressBar({ t, value, max = 100 }) {
  return (
    <div style={{ height: 8, background: t.accentBg, borderRadius: 8, overflow: "hidden" }}>
      <div
        style={{
          height: "100%",
          width: `${(value / max) * 100}%`,
          background: t.accent,
          borderRadius: 8,
          transition: "width 0.5s ease",
        }}
      />
    </div>
  );
}

function ChatModal({ mode, onClose }) {
  const t = THEMES[mode];
  const [msgs, setMsgs] = useState([
    {
      role: "assistant",
      content:
        mode === "wellness"
          ? "Hey there! ✨ You're doing wonderfully. What's on your mind today?"
          : mode === "stress"
          ? "Hi, I'm right here with you. 💙 Let's slow down together. What's been weighing on you?"
          : "Hello. I'm so glad you reached out. 🌸 You don't have to carry this alone. How are you feeling?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const next = [...msgs, { role: "user", content: input }];
    setMsgs(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: PROMPTS[mode],
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
     const reply =
  data?.content?.[0]?.text || "I'm here for you.";
      setMsgs([...next, { role: "assistant", content: reply }]);
    } catch {
      setMsgs([...next, { role: "assistant", content: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: "#fff",
          borderRadius: "24px 24px 0 0",
          border: `1.5px solid ${t.border}`,
          display: "flex",
          flexDirection: "column",
          height: "72vh",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            padding: "18px 22px",
            borderBottom: `1px solid ${t.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: t.accentBg,
            borderRadius: "24px 24px 0 0",
          }}
        >
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: t.accent }}>AI Support Chat</div>
            <div style={{ fontSize: 12, color: t.muted }}>{DASHBOARDS.find((d) => d.id === mode)?.label}</div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: t.border,
              border: "none",
              color: t.muted,
              fontSize: 20,
              cursor: "pointer",
              borderRadius: "50%",
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "inherit",
            }}
          >
            ×
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "18px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              <div
                style={{
                  maxWidth: "80%",
                  padding: "12px 16px",
                  borderRadius: m.role === "user" ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
                  background: m.role === "user" ? t.accent : t.accentBg,
                  color: m.role === "user" ? "#fff" : t.text,
                  fontSize: 14,
                  lineHeight: 1.65,
                  border: `1px solid ${m.role === "user" ? "transparent" : t.border}`,
                }}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 5, padding: "4px 0" }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: t.accent,
                    animation: `mc-bounce 1s ${i * 0.2}s infinite ease-in-out`,
                  }}
                />
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div style={{ padding: "14px 18px", borderTop: `1px solid ${t.border}`, display: "flex", gap: 10 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Share what's on your mind…"
            style={{
              flex: 1,
              background: t.bg,
              border: `1.5px solid ${t.border}`,
              borderRadius: 12,
              padding: "12px 16px",
              color: t.text,
              fontSize: 14,
              outline: "none",
              fontFamily: "Plus Jakarta Sans, sans-serif",
            }}
          />
          <button
            onClick={send}
            style={{
              background: t.btn,
              border: "none",
              borderRadius: 12,
              padding: "12px 22px",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 14,
              fontFamily: "Plus Jakarta Sans, sans-serif",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function WellnessDashboard({ onChat }) {
  const t = THEMES.wellness;
  const [mood, setMood] = useState(null);
  const [checks, setChecks] = useState([false, false, false, false]);
  const [graphData, setGraphData] = useState([]);

  const toggle = (i) => setChecks((c) => c.map((v, j) => (j === i ? !v : v)));

  const fetchGraph = async () => {
    console.log("🔥 FETCH FUNCTION ENTERED");
  try {
    console.log("🔥 fetchGraph called");

    const user = JSON.parse(localStorage.getItem("mindcareUser") || "null");

    console.log("👤 user:", user);

    if (!user || !user.id) {
      console.log("❌ No user found in localStorage");
      return;
    }

    const res = await fetch(`http://localhost:8000/graph/daily/${user.id}`);

    const data = await res.json();

    console.log("📊 GRAPH DATA:", data);
 

 const cleaned =
  Array.isArray(data)
    ? data
    : data?.data || data?.graph || data?.result || [];

console.log("🧹 CLEANED DATA:", cleaned);

setGraphData(cleaned);
  } catch (err) {
    console.error("Graph error:", err);
  }
}; 
useEffect(() => {
  console.log("⚡ USEEFFECT RUNNING");

  fetchGraph();

  return () => {
    console.log("🧹 CLEANUP RUNNING");
  };
}, []);

useEffect(() => {
  fetchGraph(); // initial load

  const handleUpdate = () => {
    console.log("🔄 Assessment updated → refreshing graph");
    fetchGraph();
  };

  window.addEventListener("assessmentUpdated", handleUpdate);

  return () => {
    window.removeEventListener("assessmentUpdated", handleUpdate);
  };
}, []);


const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);

    days.push({
      date: d.toISOString().split("T")[0],
      score: Math.floor(Math.random() * 40) + 60,
    });
  }
  return days;
};
const fallback = getLast7Days();

const normalizedData = (graphData || []).map((item) => ({
  date: item.date,
  score: Number(item.score ?? item.percentage_score ?? 0),
}));

const chartData =
  normalizedData.length > 0
    ? normalizedData.sort((a, b) => new Date(a.date) - new Date(b.date))
    : fallback;

       console.log("normalized:", normalizedData);
console.log("chartData:", chartData);

const today = new Date().toISOString().slice(0, 10);

  return (
    <div style={{ background: t.bg, minHeight: "100vh", padding: "20px 16px", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
      <div
        style={{
          background: "linear-gradient(135deg,#18a058 0%,#0e7a42 100%)",
          borderRadius: 24,
          padding: "28px 22px",
          marginBottom: 20,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 700, letterSpacing: "0.08em", marginBottom: 6, textTransform: "uppercase" }}>
          Good Morning
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 6, fontFamily: "Lora, serif" }}>
          You're doing great, Alex 🌟
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginBottom: 20 }}>
          14 consecutive calm days — keep that momentum!
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[["🔥", "14 days", "Calm streak"], ["🧘", "7 days", "Mindfulness"], ["💧", "2.1 L", "Hydration"]].map(([ic, val, lbl], i) => (
            <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 14, padding: "12px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 20, marginBottom: 3 }}>{ic}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{val}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.75)" }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <Card t={t}>
        <SLabel t={t}>Daily Mood Check-in</SLabel>
        <MoodPicker t={t} mood={mood} setMood={setMood} />
        {mood !== null && (
          <div style={{ marginTop: 14, background: t.accentBg, borderRadius: 12, padding: "12px 16px", fontSize: 13, color: t.muted, lineHeight: 1.75 }}>
            {[
              "You're beaming today! Keep sharing that energy. 🌞",
              "A solid day! Small joys add up to big wellness. 😊",
              "Okay days are perfectly fine. You showed up. 👍",
              "It's okay to feel low sometimes. Rest is productive too. 💚",
              "Tough day — but you checked in, and that takes courage. 🌿",
            ][mood]}
          </div>
        )}
      </Card>

      <Card t={t}>
        <SLabel t={t}>Today's Relaxation Menu 🎯</SLabel>
        {[
          { ic: "🎵", title: "Lo-fi Focus Mix", sub: "20 min · Calm music for focus & clarity", tag: "Music" },
          { ic: "🌬️", title: "Box Breathing", sub: "4-4-4-4 technique · Reset your mind", tag: "Breathing" },
          { ic: "🌳", title: "Nature Walk", sub: "15 min outside · Ground yourself", tag: "Activity" },
          { ic: "🫖", title: "Herbal Tea Ritual", sub: "Slow down & savour the present moment", tag: "Mindful" },
        ].map((r, i, arr) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : "none" }}>
            <div style={{ width: 44, height: 44, borderRadius: 13, background: t.accentBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
              {r.ic}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{r.title}</div>
              <div style={{ fontSize: 12, color: t.muted }}>{r.sub}</div>
            </div>
            <div style={{ background: t.pill, color: t.pillText, fontSize: 11, fontWeight: 600, borderRadius: 20, padding: "4px 10px", flexShrink: 0 }}>
              {r.tag}
            </div>
          </div>
        ))}
      </Card>

      <Card t={t}>
        <SLabel t={t}>Daily Wins Checklist ✅</SLabel>
        {["Morning gratitude — write 3 things", "8 glasses of water today", "10 min movement or stretch", "Screen-free wind-down time"].map((item, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 0", borderBottom: i < 3 ? `1px solid ${t.border}` : "none", cursor: "pointer" }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 7,
                border: `2px solid ${checks[i] ? t.accent : t.border}`,
                background: checks[i] ? t.accent : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                color: "#fff",
                flexShrink: 0,
                transition: "all 0.2s",
              }}
            >
              {checks[i] ? "✓" : ""}
            </div>
            <span style={{ fontSize: 14, color: checks[i] ? t.muted : t.text, textDecoration: checks[i] ? "line-through" : "none", transition: "all 0.2s" }}>{item}</span>
          </div>
        ))}
        <div style={{ marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: t.muted }}>Today's progress</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: t.accent }}>{checks.filter(Boolean).length}/4 complete</span>
          </div>
          <ProgressBar t={t} value={checks.filter(Boolean).length} max={4} />
        </div>
      </Card>

      <Card t={t}>
        <SLabel t={t}>Weekly Wellbeing Trend 📊</SLabel>
       <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80, minHeight: 80, marginBottom: 8 }}>
          {chartData.map((h, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div
                style={{
                  width: "100%",
                 height: `${((h.score || 0) / 100) * 80}px`,
                 background: h.date === today ? t.accent : t.accentBg,
                  borderRadius: "6px 6px 0 0",
                  border: `1px solid ${t.border}`,
                  transition: "height 0.4s",
                }}
              />
              <div style={{ fontSize: 10, color: t.muted }}>
                {new Date(h.date).toLocaleDateString("en-US", { weekday: "short" })}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <button
        onClick={onChat}
        style={{
          width: "100%",
          background: t.btn,
          border: "none",
          borderRadius: 16,
          padding: "18px",
          color: "#fff",
          fontWeight: 700,
          fontSize: 16,
          cursor: "pointer",
          fontFamily: "Plus Jakarta Sans, sans-serif",
          boxShadow: "0 4px 20px rgba(24,160,88,0.28)",
        }}
      >
        Chat with AI Wellness Coach 💬
      </button>
    </div>
  );
}

function StressDashboard({ onChat }) {
  const t = THEMES.stress;
  const [level, setLevel] = useState(1);
  const [mood, setMood] = useState(null);
  const [openEx, setOpenEx] = useState(null);
  const lvlMeta = [
    { label: "Low", color: "#22c55e", bg: "#dcfce7", desc: "Great! Maintain this with short mindfulness breaks." },
    { label: "Medium", color: "#f59e0b", bg: "#fef3c7", desc: "Normal to feel this. A quick breathing exercise will help." },
    { label: "High", color: "#ef4444", bg: "#fee2e2", desc: "Let's slow down. Take 3 deep breaths before anything else." },
  ];

  return (
    <div style={{ background: t.bg, minHeight: "100vh", padding: "20px 16px", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
      {/* keep your existing StressDashboard content here */}
    </div>
  );
}

function SupportDashboard({ onChat }) {
  const t = THEMES.support;
  const [emotion, setEmotion] = useState(null);
  const [step, setStep] = useState(0);
  const [wins, setWins] = useState([false, false, false, false]);

  const cbtSteps = [
    { title: "Notice the thought 🌿", body: "What thought keeps replaying? Just observe it gently, without judgment. You don't have to fix it right now — just notice it's there." },
    { title: "Name the feeling 💜", body: "What emotion does this thought bring up? Sadness, fear, shame, emptiness? Give it a name softly. Naming takes away some of its power." },
    { title: "Question gently 🌸", body: "Is this thought absolutely 100% true? Could there be even a 1% chance it isn't? What facts do you actually have in front of you?" },
    { title: "Compassionate reframe 🤍", body: "What would you whisper to a dear friend feeling this way? Write it down. Now read it back to yourself — you deserve that same compassion." },
  ];

  return (
    <div style={{ background: t.bg, minHeight: "100vh", padding: "20px 16px", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
      {/* keep your existing SupportDashboard content here */}
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("wellness");
  const [chat, setChat] = useState(false);
  const t = THEMES[active];

  return (
    <>
      <FontLink />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f3f4f6; font-family: 'Plus Jakarta Sans', sans-serif; }
        @keyframes mc-bounce { 0%,100%{transform:translateY(0);opacity:.3} 50%{transform:translateY(-6px);opacity:1} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
      `}</style>

      <div style={{ maxWidth: 520, margin: "0 auto", background: "#fff", minHeight: "100vh", boxShadow: "0 0 60px rgba(0,0,0,0.08)", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, zIndex: 200, background: "#fff", borderBottom: "1.5px solid #f0f0f0" }}>
          <div style={{ padding: "16px 20px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: t.btn, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, transition: "all 0.3s", flexShrink: 0 }}>
                {DASHBOARDS.find((d) => d.id === active)?.emoji}
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#1a1a2e", fontFamily: "Lora, serif", lineHeight: 1.2 }}>MindCare AI</div>
                <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>{DASHBOARDS.find((d) => d.id === active)?.tagline}</div>
              </div>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: t.accentBg, border: `1.5px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, cursor: "pointer" }}>
              👤
            </div>
          </div>

          <div style={{ display: "flex", paddingBottom: 0 }}>
            {DASHBOARDS.map((d) => (
              <button
                key={d.id}
                onClick={() => setActive(d.id)}
                style={{
                  flex: 1,
                  padding: "10px 4px 13px",
                  background: "transparent",
                  border: "none",
                  borderBottom: `3px solid ${active === d.id ? THEMES[d.id].accent : "transparent"}`,
                  color: active === d.id ? THEMES[d.id].accent : "#9ca3af",
                  fontSize: 12,
                  fontWeight: active === d.id ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  lineHeight: 1.4,
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                }}
              >
                <div style={{ fontSize: 18, marginBottom: 3 }}>{d.emoji}</div>
                <div>{d.id === "wellness" ? "Wellness" : d.id === "stress" ? "Stress Relief" : "Support"}</div>
              </button>
            ))}
          </div>
        </div>

        {active === "wellness" && <WellnessDashboard onChat={() => setChat(true)} />}
        {active === "stress" && <StressDashboard onChat={() => setChat(true)} />}
        {active === "support" && <SupportDashboard onChat={() => setChat(true)} />}

        {chat && <ChatModal mode={active} onClose={() => setChat(false)} />}
      </div>
    </>
  );
}