import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AboutMindCare from "../components/AboutMindCare";
import Footer from "../components/Footer";
import TherapyCard from "../components/TherapyCard";
/* --- Add these new icon imports --- */
import { FaUsers, FaLeaf, FaBrain, FaMusic, FaSmog, FaMasksTheater } from "react-icons/fa6";
import { FaShieldAlt, FaStar, FaCheckCircle, FaArrowRight, FaPlay } from "react-icons/fa";

/* IMAGES */
import heroBg from "../assets/nature-bg.jpg";
import activitiesImg from "../assets/activities.jpg";
import gamesImg from "../assets/games.avif";
import relaxingImg from "../assets/relaxing.jpg";
import chatImg from "../assets/chat.jpg";
import resourcesImg from "../assets/resources.jpeg";
import songsImg from "../assets/songs.jpg";

/* ─── GLOBAL STYLES injected once ─── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

  :root {
    --mint:      #3ecfb2;
    --ocean:     #2563eb;
    --sky:       #67e8f9;
    --lavender:  #a78bfa;
    --blush:     #fda4af;
    --sand:      #fef3c7;
    --deep:      #0f172a;
    --card-bg:   #ffffff;
  }

  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; margin:0; }

  .font-display  { font-family: 'Playfair Display', serif; }
  .font-grotesk  { font-family: 'Space Grotesk', sans-serif; }

  /* ── Animated gradient mesh ── */
  .mesh-bg {
    background: linear-gradient(135deg,#e0f2fe 0%,#f0fdf4 35%,#fdf4ff 70%,#fff7ed 100%);
    position: relative; overflow: hidden;
  }
  .mesh-bg::before {
    content:''; position:absolute; inset:0;
    background:
      radial-gradient(ellipse at 20% 30%, rgba(62,207,178,.18) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 70%, rgba(167,139,250,.15) 0%, transparent 60%),
      radial-gradient(ellipse at 55% 10%, rgba(103,232,249,.12) 0%, transparent 50%);
    pointer-events:none;
  }

  /* ── Floating orb animations ── */
  @keyframes float {
    0%,100%{ transform:translateY(0px) rotate(0deg); }
    33%    { transform:translateY(-22px) rotate(3deg); }
    66%    { transform:translateY(10px) rotate(-2deg); }
  }
  @keyframes floatX {
    0%,100%{ transform:translateX(0px); }
    50%    { transform:translateX(18px); }
  }
  .orb      { animation: float  8s ease-in-out infinite; }
  .orb-slow { animation: float 13s ease-in-out infinite reverse; }
  .orb-x    { animation: floatX 9s ease-in-out infinite; }

  /* ── Shimmer text ── */
  @keyframes shimmer {
    0%  { background-position: -200% center; }
    100%{ background-position:  200% center; }
  }
  .text-shimmer {
    background: linear-gradient(90deg,#3ecfb2,#2563eb,#a78bfa,#3ecfb2);
    background-size: 200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text;
    animation: shimmer 4s linear infinite;
  }

  /* ── Pulse ring ── */
  @keyframes pulse-ring {
    0%  { transform:scale(1);    opacity:.6; }
    100%{ transform:scale(1.65); opacity:0;  }
  }
  .pulse-ring::before {
    content:''; position:absolute; inset:-8px; border-radius:inherit;
    border:2px solid #3ecfb2;
    animation: pulse-ring 2s ease-out infinite;
  }

  /* ── Glass card ── */
  .glass {
    background: rgba(255,255,255,.68);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border: 1px solid rgba(255,255,255,.55);
  }
  .glass-dark {
    background: rgba(15,23,42,.55);
    backdrop-filter: blur(20px) saturate(120%);
    -webkit-backdrop-filter: blur(20px) saturate(120%);
    border: 1px solid rgba(255,255,255,.12);
  }

  /* ── Gradient border card ── */
  .grad-border { position:relative; border-radius:1.5rem; }
  .grad-border::before {
    content:''; position:absolute; inset:-1.5px; border-radius:inherit;
    background: linear-gradient(135deg,#3ecfb2,#2563eb,#a78bfa);
    opacity:0; transition:opacity .4s; z-index:-1;
  }
  .grad-border:hover::before { opacity:1; }

  /* ── Noise overlay ── */
  .noise::after {
    content:''; position:absolute; inset:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.03'/%3E%3C/svg%3E");
    pointer-events:none; border-radius:inherit;
  }

  /* ── Pill badge ── */
  .pill {
    display:inline-flex; align-items:center; gap:.4rem;
    padding:.3rem 1rem; border-radius:9999px;
    font-size:.7rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
  }

  /* ── Hero image frame ── */
  .hero-img-frame {
    position:relative; border-radius:2rem; overflow:hidden;
    box-shadow: 0 40px 100px -20px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.1);
  }
  .hero-img-frame::before {
    content:''; position:absolute; inset:0; z-index:1;
    background: linear-gradient(135deg,rgba(62,207,178,.08) 0%,transparent 60%);
    pointer-events:none;
  }

  /* ── Decorative grid lines (hero) ── */
  .hero-grid {
    position:absolute; inset:0; z-index:1; pointer-events:none;
    background-image:
      linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  /* ── Stat card glow ── */
  .stat-glow {
    box-shadow: 0 0 30px rgba(62,207,178,.25), 0 8px 32px rgba(0,0,0,.2);
  }

  /* ── Scroll ticker ── */
  @keyframes ticker {
    0%  { transform:translateX(0); }
    100%{ transform:translateX(-50%); }
  }
  .ticker-inner { animation: ticker 22s linear infinite; }
  .ticker-inner:hover { animation-play-state: paused; }

  /* ── Wave divider ── */
  .wave-divider svg { display:block; }

  /* ── CTA shine ── */
  .btn-shine { position:relative; overflow:hidden; }
  .btn-shine::after {
    content:'';
    position:absolute; top:0; left:-75%;
    width:50%; height:100%;
    background:linear-gradient(120deg,transparent,rgba(255,255,255,.3),transparent);
    transform:skewX(-20deg);
  }
  .btn-shine:hover::after { left:125%; transition:left .6s ease; }
`;

// ✅ SHARED DATA & STATE - MOVED TO TOP
const experiences = [
  {
    id: 0,
    title: "Personalized Relaxation",
    desc: "Tailored soundscapes and guided breathing exercises designed specifically for your current emotional state.",
    icon: <FaMusic className="text-3xl" />,
    color: "bg-teal-400",
    lightColor: "bg-teal-50",
    path: "/relaxing"
  },
  {
    id: 1,
    title: "Mindful Activities",
    desc: "Engage in AI-curated activities that help you stay present and reduce daily anxiety effectively.",
    icon: <FaLeaf className="text-3xl" />,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    path: "/activities"
  },
  {
    id: 2,
    title: "Emotional Support AI",
    desc: "24/7 access to our empathetic AI companion, ready to listen and provide mastering stress techniques.",
    icon: <FaBrain className="text-3xl" />,
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    path: "/chat"
  }
];

/* ─── StyleTag ─── */
const StyleTag = () => {
  useEffect(() => {
    const id = "mindcare-global-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id; tag.textContent = globalStyles;
      document.head.appendChild(tag);
    }
  }, []);
  return null;
};

/* ─── Floating decorative orb ─── */
const Orb = ({ size=300, color="#3ecfb2", top, left, right, bottom, opacity=0.12, slow=false, floatX=false }) => (
  <div
    className={floatX ? "orb-x" : slow ? "orb-slow" : "orb"}
    style={{
      position:"absolute", width:size, height:size, borderRadius:"50%",
      background:`radial-gradient(circle, ${color}cc 0%, transparent 70%)`,
      top, left, right, bottom, opacity,
      pointerEvents:"none", zIndex:0, filter:"blur(3px)",
    }}
  />
);

/* ─── SectionLabel ─── */
const SectionLabel = ({ children, color="blue" }) => {
  const map = {
    blue:"bg-blue-100 text-blue-700",
    teal:"bg-teal-100 text-teal-700",
    purple:"bg-purple-100 text-purple-700",
  };
  return (
    <span className={`pill ${map[color]} shadow-sm`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
      {children}
    </span>
  );
};

/* ─── Stat ticker bar ─── */
const StatBar = () => {
  const stats = [
    { label:"Users Supported",     value:"120K+" },
    { label:"Sessions Completed",  value:"2.4M"  },
    { label:"Therapist Partners",  value:"340+"  },
    { label:"Avg Stress Reduction",value:"67%"   },
    { label:"Countries Reached",   value:"48"    },
  ];
  return (
    <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 py-4 overflow-hidden relative">
      <div className="flex gap-16 ticker-inner whitespace-nowrap w-max">
        {[...stats, ...stats].map((s,i) => (
          <span key={i} className="inline-flex items-center gap-3 text-white/80 text-sm font-medium font-grotesk">
            <span className="text-teal-400 font-bold text-base">{s.value}</span>
            {s.label}
            <span className="text-white/20 mx-2">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════
   HERO FLOATING CARD
════════════════════════════════════════════════════ */
const HeroFloatCard = ({ delay, className, children }) => (
  <motion.div
    initial={{ opacity:0, y:12, scale:.93 }}
    animate={{ opacity:1, y:0,  scale:1   }}
    transition={{ delay, duration:.7, ease:"easeOut" }}
    className={`glass absolute rounded-2xl shadow-2xl ${className}`}
  >
    {children}
  </motion.div>
);

/* ════════════════════════════════════════════════════
   PROFESSIONAL HERO SECTION
   
   ── BACKGROUND IMAGE (nature-bg.jpg) ──────────────
   Download one of these from unsplash.com (free, no credit needed for apps):
   • Misty forest morning light:
     https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=90
   • Mountain lake with reflection:
     https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90
   • Soft aerial green valley (most calming):
     https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=90
   Save as: src/assets/nature-bg.jpg

   ── RIGHT SIDE IMAGE ──────────────────────────────
   Used as: src in <img> below.
   Best professional therapy images (Unsplash):
   • Warm therapy session (recommended):
     https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=85
   • Calm woman meditating:
     https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=85
   • Mindful nature walk:
     https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=85
   To use local: import therapyImg from "../assets/therapy.jpg" and use src={therapyImg}
════════════════════════════════════════════════════ */
const HeroSection = () => (
  <section
    className="relative min-h-screen pt-28 pb-20 px-6 text-white noise overflow-hidden"
    style={{
      backgroundImage:`url(${heroBg})`,
      backgroundSize:"cover",
      backgroundPosition:"center top",
    }}
  >
    {/* ── Multi-layer overlays ── */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#0c1a3a]/82 via-[#0f2d3a]/62 to-[#0a1f1a]/78 z-[1]" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent z-[2]" />

    {/* ── Subtle grid ── */}
    <div className="hero-grid" />

    {/* ── Decorative orbs ── */}
    <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:2}}>
      <Orb size={500} color="#3ecfb2" top="-80px"  right="-120px" opacity={0.16} />
      <Orb size={320} color="#a78bfa" bottom="60px" left="3%"      opacity={0.13} slow />
      <Orb size={200} color="#67e8f9" top="40%"     left="45%"     opacity={0.09} floatX />
    </div>

    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">

      {/* ════ LEFT ════ */}
      <motion.div
        initial={{ opacity:0, x:-50 }}
        animate={{ opacity:1, x:0  }}
        transition={{ duration:.85, ease:"easeOut" }}
        className="flex flex-col"
      >
        {/* Top badge */}
        <motion.div
          initial={{ opacity:0, y:-14 }}
          animate={{ opacity:1, y:0  }}
          transition={{ delay:.2 }}
          className="inline-flex w-fit items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 font-semibold uppercase text-xs tracking-widest px-5 py-2.5 rounded-full mb-7 shadow-lg font-grotesk"
        >
          <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
          Next-Gen Wellness Platform
        </motion.div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl xl:text-[70px] font-bold font-display leading-[1.05] mb-6">
          <span className="text-shimmer">MindCare AI</span>
          <br />
          <span className="text-white/85 text-3xl md:text-4xl font-normal italic mt-2 block">
            — your calm starts here.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg text-white/72 leading-relaxed max-w-lg mb-9">
          Stop managing stress.{" "}
          <strong className="text-teal-300 font-semibold">Start mastering it</strong>{" "}
          with AI-powered therapy, soundscapes, and 24/7 emotional support built for you.
        </p>

        {/* Feature bullets */}
        <div className="flex flex-col gap-3 mb-10">
          {[
            "Personalized AI mental health sessions",
            "Evidence-based therapy techniques",
            "Available 24/7 — no appointments needed",
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, x:-20 }}
              animate={{ opacity:1, x:0  }}
              transition={{ delay:.4 + i * .12 }}
              className="flex items-center gap-3 text-white/78 text-sm font-grotesk"
            >
              <FaCheckCircle className="text-teal-400 flex-shrink-0 text-base" />
              {f}
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap mb-10">
          <Link to="/login">
            <motion.button
              whileHover={{ scale:1.05 }}
              whileTap={{ scale:.97 }}
              className="btn-shine bg-gradient-to-r from-teal-400 to-blue-500 px-9 py-4 rounded-xl shadow-xl shadow-blue-500/30 font-bold text-white text-base font-grotesk flex items-center gap-2"
            >
              Get Started Free
              <FaArrowRight className="text-sm" />
            </motion.button>
          </Link>
          <Link to="/assessment">
            <motion.button
              whileHover={{ scale:1.05, backgroundColor:"rgba(255,255,255,.92)", color:"#1e293b" }}
              whileTap={{ scale:.97 }}
              className="border border-white/35 bg-white/10 backdrop-blur-sm px-9 py-4 rounded-xl text-white font-semibold text-base transition-all duration-300 font-grotesk flex items-center gap-2"
            >
              <FaPlay className="text-xs" />
              Start Assessment
            </motion.button>
          </Link>
        </div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:.9 }}
          className="flex items-center gap-5 flex-wrap"
        >
          <div className="flex -space-x-2.5">
            {["#3ecfb2","#2563eb","#a78bfa","#fda4af","#fbbf24"].map((c,i) => (
              <div key={i} className="w-9 h-9 rounded-full border-2 border-white/60 shadow-md" style={{background:c}} />
            ))}
          </div>
          <div>
            <div className="flex items-center gap-1 mb-0.5">
              {[...Array(5)].map((_,i) => <FaStar key={i} className="text-yellow-400 text-xs" />)}
              <span className="text-white/75 text-xs ml-1 font-grotesk">4.9/5</span>
            </div>
            <p className="text-white/58 text-xs font-grotesk">
              Trusted by <strong className="text-white">120,000+</strong> users worldwide
            </p>
          </div>
          <div className="glass-dark px-4 py-2 rounded-xl flex items-center gap-2">
            <FaShieldAlt className="text-teal-400 text-sm" />
            <span className="text-white/80 text-xs font-grotesk font-semibold">HIPAA Compliant</span>
          </div>
        </motion.div>
      </motion.div>

      {/* ════ RIGHT — image + 4 floating cards ════ */}
      <motion.div
        initial={{ opacity:0, scale:.88, y:24 }}
        animate={{ opacity:1, scale:1,   y:0  }}
        transition={{ duration:.95, ease:"easeOut", delay:.18 }}
        className="relative flex justify-center"
      >
        {/* Glow halo */}
        <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-teal-400/35 to-blue-600/35 blur-3xl" />

        {/* ── MAIN HERO IMAGE ─────────────────────────────────
            Recommended: download from Unsplash and save as src/assets/therapy.jpg
            Option A (warm session): 
              https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=85
            Option B (meditating woman):
              https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=85
            Then replace img src with {therapyImg} after importing it.
        ── */}
        <div className="hero-img-frame w-full max-w-[540px] relative">
          <img
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=85"
            alt="Professional therapy session — warm, calm, supportive"
            className="w-full h-[470px] object-cover object-top"
            onError={(e) => {
              // Graceful fallback to original image
              e.target.src = "https://psychcounsellingclinic.com/wp-content/uploads/2024/06/what-is-individual-therapy-768x513.jpg";
            }}
          />
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-transparent to-transparent" style={{zIndex:2}} />
        </div>

        {/* ── Floating card 1: AI Session Active (bottom-left) ── */}
        <HeroFloatCard delay={0.75} className="bottom-[-22px] left-[-18px] px-4 py-3 flex items-center gap-3 stat-glow">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center shadow-lg flex-shrink-0">
            <FaBrain className="text-white text-lg" />
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-medium font-grotesk uppercase tracking-wide">AI Session Active</p>
            <p className="text-sm font-bold text-slate-800 font-grotesk">Feeling calmer 😊</p>
            {/* Mini waveform */}
            <div className="flex items-end gap-0.5 mt-1.5">
              {[4,7,5,9,6,8,4,7,5,6].map((h,i) => (
                <div key={i} className="w-1 rounded-full bg-teal-400" style={{height:`${h}px`,opacity:.5+i*.04}} />
              ))}
            </div>
          </div>
        </HeroFloatCard>

        {/* ── Floating card 2: Daily Streak (top-right) ── */}
        <HeroFloatCard delay={0.95} className="top-5 right-[-22px] px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-md flex-shrink-0 text-xl">
            🔥
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-grotesk font-medium uppercase tracking-wide">Daily Streak</p>
            <p className="text-sm font-bold text-slate-800 font-grotesk">14 Days Strong!</p>
          </div>
        </HeroFloatCard>

        {/* ── Floating card 3: Stress score bar chart (mid-right) ── */}
        <HeroFloatCard delay={1.1} className="top-[42%] right-[-30px] px-4 py-3">
          <p className="text-[10px] text-slate-500 font-grotesk font-medium uppercase tracking-wide mb-2">Stress Score</p>
          <div className="flex items-end gap-1">
            {[65,78,58,42,32,22].map((h,i) => (
              <div key={i} className="w-3 rounded-sm" style={{
                height:`${h * 0.43}px`,
                background: i < 3 ? "rgba(239,68,68,.65)" : i < 5 ? "rgba(251,191,36,.75)" : "#3ecfb2",
                transition:"height .3s"
              }} />
            ))}
            <span className="text-xs font-bold text-teal-500 font-grotesk ml-1 self-end">↓22%</span>
          </div>
        </HeroFloatCard>

        {/* ── Floating card 4: Rating (bottom-right) ── */}
        <HeroFloatCard delay={1.25} className="bottom-[100px] right-[-22px] px-3.5 py-2.5 flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_,i) => <FaStar key={i} className="text-yellow-400 text-xs" />)}
          </div>
          <span className="text-xs font-bold text-slate-800 font-grotesk">4.9 · 12k reviews</span>
        </HeroFloatCard>
      </motion.div>
    </div>

    {/* Bottom white fade into next section */}
    <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-white to-transparent z-10" />
  </section>
);

// ✅ SINGLE HomePage COMPONENT
const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeExperience, setActiveExperience] = useState(1);

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="bg-white min-h-screen font-sans text-slate-800 flex flex-col justify-between">
      <StyleTag />
      <div>
        {/* HERO */}
        <HeroSection />

        {/* Stats Bar */}
        <StatBar />

        {/* ✅ EXPERIENCE SECTION - NOW FULLY FUNCTIONAL */}
        <section className="py-24 px-6 bg-white relative overflow-hidden">
          <Orb size={500} color="#3ecfb2" top="-100px" right="-120px" opacity={0.07} slow />

          <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
            <SectionLabel color="teal">Your Journey</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-slate-800 mb-4 mt-4">
              EXPERIENCE A <span className="text-shimmer">CALMER YOU</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Discover a personalized journey designed to reduce stress and improve wellbeing.
            </p>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 h-[500px] relative z-10">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                onMouseEnter={() => setActiveExperience(exp.id)}
                animate={{
                  flex: activeExperience === exp.id ? 4 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`relative overflow-hidden rounded-3xl cursor-pointer flex flex-col ${
                  activeExperience === exp.id ? exp.color : exp.lightColor
                } shadow-lg`}
                style={{ boxShadow: activeExperience === exp.id ? "0 20px 60px -10px rgba(0,0,0,.25)" : undefined }}
              >
                {activeExperience === exp.id && (
                  <div className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
                  />
                )}
                <div className={`p-8 h-full flex ${activeExperience === exp.id ? 'flex-col justify-center' : 'flex-col items-center justify-start mt-10'}`}>
                  <div className={`mb-6 p-4 rounded-2xl ${activeExperience === exp.id ? 'bg-white/20 text-white w-fit shadow-lg' : 'text-slate-400'}`}>
                    {exp.icon}
                  </div>
                  <div className={activeExperience === exp.id ? "block" : "hidden md:block"}>
                    <h3 className={`text-2xl font-bold mb-4 whitespace-nowrap font-display ${
                      activeExperience === exp.id ? "text-white" : "text-slate-800 [writing-mode:vertical-lr] rotate-180"
                    }`}>
                      {exp.title}
                    </h3>
                    {activeExperience === exp.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className="text-white/90 mb-8 max-w-md text-lg leading-relaxed">
                          {exp.desc}
                        </p>
                        <Link to={exp.path}>
                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: .97 }}
                            className="bg-white text-slate-800 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-xl"
                          >
                            Explore {exp.title.split(' ')[1]}
                          </motion.button>
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

{/* THERAPY SERVICES */}
<section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative mesh-bg">
  <Orb size={400} color="#a78bfa" top="5%" left="-100px" opacity={0.10} slow />
  <Orb size={350} color="#3ecfb2" bottom="5%" right="-80px" opacity={0.09} />

  <div className="max-w-7xl mx-auto relative z-10">

    {/* HEADER */}
    <div className="text-center mb-20 relative">
      <SectionLabel color="purple">Professional Support</SectionLabel>

      <h2 className="text-4xl md:text-5xl font-extrabold mt-6 text-slate-800 tracking-tight font-display">
        Our Therapy Services
      </h2>

      <div className="w-28 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-6 rounded-full shadow"></div>

      <p className="text-slate-500 mt-8 max-w-2xl mx-auto text-lg leading-relaxed">
        Scientifically designed therapy methods that help improve emotional balance,
        reduce stress, and support mental wellbeing.
      </p>
    </div>

    {/* CARDS */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

      {[
        {
          title: "Aromatherapy",
          desc: "Uses natural scents to calm the mind, reduce anxiety, and improve restorative sleep quality.",
          icon: <FaSmog className="text-4xl text-pink-600" />,
          accent: "#db2777",
        },
        {
          title: "Nature Therapy",
          desc: "Reduces stress and anxiety by reconnecting the mind with natural environments and outdoors.",
          icon: <FaLeaf className="text-4xl text-green-600" />,
          accent: "#16a34a",
        },
        
        {
          title: "Movement Therapy",
          desc: "Uses physical body movement (such as music or dance) to release emotional tension and improve mental clarity.",
          icon: <FaMusic className="text-4xl text-indigo-600" />,
          accent: "#4338ca",
        },
        
       
      ].map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -12, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 180, damping: 12 }}
          className="group relative bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-7 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden grad-border"
        >

          {/* GRADIENT HOVER EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/0 to-blue-200/20 opacity-0 group-hover:opacity-100 transition duration-300"></div>

          {/* Accent glow */}
          <div
            className="absolute top-4 left-4 w-16 h-16 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
            style={{ background: item.accent }}
          />

          {/* ICON */}
          <div className="mb-5 p-4 rounded-2xl bg-white shadow-sm w-fit group-hover:scale-110 transition">
            {item.icon}
          </div>

          {/* TITLE */}
          <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-blue-600 transition font-display">
            {item.title}
          </h3>

          {/* DESC */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {item.desc}
          </p>

          {/* MICRO LINE */}
          <div className="mt-5 h-[2px] w-0 group-hover:w-16 transition-all duration-300 rounded-full" style={{ background: item.accent }} />

        </motion.div>
      ))}

    </div>
  </div>
</section>

        {/* Wave divider */}
        <div className="wave-divider -mt-1 bg-white">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: 60, width: "100%" }}>
            <path d="M0,0 C360,60 1080,0 1440,60 L1440,0 L0,0 Z" fill="#f0fdf4" />
          </svg>
        </div>

        {/* VIDEO SECTION */}
        <section className="py-24 px-6 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
          <Orb size={400} color="#67e8f9" top="-60px" left="10%" opacity={0.12} />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <SectionLabel color="blue">Soundscapes & Sessions</SectionLabel>
            <h3 className="text-3xl md:text-4xl font-display font-semibold mb-3 mt-4 text-slate-800">
              CALM <span className="text-teal-500">|</span> RELAX <span className="text-blue-500">|</span> LISTEN
            </h3>
            <p className="text-slate-400 mb-12 max-w-xl mx-auto">Curated videos to guide you into deep relaxation, meditation, and peaceful sleep.</p>
            <VideoCarousel />
          </div>
        </section>

        {/* FEATURES */}
        <section id="explore" className="py-24 px-6 relative overflow-hidden">
          <Orb size={380} color="#a78bfa" bottom="0" right="5%" opacity={0.08} slow />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="rounded-3xl p-12 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 50%, #faf5ff 100%)",
                border: "1px solid rgba(99,102,241,.12)",
                boxShadow: "0 25px 80px -20px rgba(37,99,235,.12)",
              }}
            >
              <div className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <SectionLabel color="purple">What We Offer</SectionLabel>
                  <h3 className="text-3xl md:text-4xl font-display font-semibold mt-4 text-slate-800">
                    EXPLORE FEATURES
                  </h3>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <FeatureBox title="ACTIVITIES" path="/activities" img={activitiesImg} />
                  <FeatureBox title="GAMES" path="/games" img={gamesImg} />
                  <FeatureBox title="RELAXING" path="/relaxing" img={relaxingImg} />
                  <FeatureBox title="AI CHAT" path="/chat" img={chatImg} />
                  <FeatureBox title="RESOURCES" path="/resources" img={resourcesImg} />
                  <FeatureBox title="SONGS" path="/songs" img={songsImg} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-24 px-6 bg-white relative overflow-hidden">
          <Orb size={450} color="#3ecfb2" top="0" left="-80px" opacity={0.07} slow />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <SectionLabel color="teal">Who We Are</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-10 mt-4 text-slate-800">
              ABOUT US
            </h2>
            <div
              className="rounded-3xl p-10 border border-gray-100 bg-white shadow-2xl"
              style={{ boxShadow: "0 30px 90px -20px rgba(37,99,235,.10)" }}
            >
              <AboutMindCare />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

/* 🔥 VIDEO CAROUSEL */
const VideoCarousel = () => {
  const videos = [
    { title: "Relaxation", desc: "Let go of stress and feel calm.", id: "lFcSrYw-ARY" },
    { title: "Stress Relief", desc: "Reduce anxiety and refresh mind.", id: "2OEL4P1Rz04" },
    { title: "Meditation", desc: "Deep focus and inner peace.", id: "1ZYbU82GVz4" },
    { title: "Deep Sleep Music", desc: "Helps you fall into deep sleep.", id: "DWcJFNfaw9c" },
    { title: "Ocean Waves Relaxation", desc: "Calm sea sounds for peace.", id: "eKFTSSKCzWA" },
  ];

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const getIndex = (i) => (i + videos.length) % videos.length;

  const getThumbnailUrl = (videoId) => {
    const qualities = [
      `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    ];
    return qualities[0];
  };

  const prev = videos[getIndex(index - 1)];
  const current = videos[index];
  const next = videos[getIndex(index + 1)];

  const handleThumbnailError = (e, videoId) => {
    const fallback1 = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
    const fallback2 = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    if (e.target.src.includes('maxresdefault')) {
      e.target.src = fallback1;
    } else if (e.target.src.includes('mqdefault')) {
      e.target.src = fallback2;
    } else {
      e.target.style.backgroundColor = '#e5e7eb';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-6">
        <img
          src={getThumbnailUrl(prev.id)}
          alt={`${prev.title} preview`}
          onClick={() => { setIndex(getIndex(index - 1)); setPlaying(false); }}
          onError={(e) => handleThumbnailError(e, prev.id)}
          className="w-72 h-44 rounded-xl opacity-50 scale-90 blur-[1px] cursor-pointer hover:opacity-100 hover:scale-100 transition-all duration-300 object-cover bg-gray-200 shadow-lg"
        />
        <div className="rounded-3xl overflow-hidden shadow-2xl bg-gray-200 ring-4 ring-blue-100">
          {!playing ? (
            <div onClick={() => setPlaying(true)} className="relative cursor-pointer group">
              <img
                src={getThumbnailUrl(current.id)}
                alt={current.title}
                onError={(e) => handleThumbnailError(e, current.id)}
                className="w-[650px] h-[380px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center group-hover:bg-black/10 transition">
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  className="relative w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl pulse-ring"
                >
                  <svg 
                    className="w-12 h-12 text-white ml-1 fill-current drop-shadow-lg" 
                    viewBox="0 0 24 24"
                  >
                    <polygon points="5,3 19,12 5,21 5,3" />
                  </svg>
                </motion.div>
              </div>
            </div>
          ) : (
            <iframe
              className="w-[650px] h-[380px]"
              src={`https://www.youtube.com/embed/${current.id}?autoplay=1&loop=1&playlist=${current.id}&modestbranding=1&rel=0`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={current.title}
            />
          )}
        </div>
        <img
          src={getThumbnailUrl(next.id)}
          alt={`${next.title} preview`}
          onClick={() => { setIndex(getIndex(index + 1)); setPlaying(false); }}
          onError={(e) => handleThumbnailError(e, next.id)}
          className="w-72 h-44 rounded-xl opacity-50 scale-90 blur-[1px] cursor-pointer hover:opacity-100 hover:scale-100 transition-all duration-300 object-cover bg-gray-200 shadow-lg"
        />
      </div>
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 text-center"
      >
        <h4 className="text-2xl font-display font-semibold">{current.title}</h4>
        <p className="text-gray-500">{current.desc}</p>
      </motion.div>
      <div className="flex justify-center mt-4 gap-2">
        {videos.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => { setIndex(i); setPlaying(false); }}
            animate={{ width: i === index ? 24 : 8, backgroundColor: i === index ? "#f97316" : "#d1d5db" }}
            className="h-2 rounded-full cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

const FeatureBox = ({ title, path, img }) => (
  <Link to={path}>
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl flex flex-col h-full transition-shadow duration-300 group border border-white/60"
    >
      <div className="w-full aspect-[16/9] overflow-hidden relative">
        <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {/* Overlay shimmer on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4 text-center font-semibold font-display flex-grow flex items-center justify-center tracking-wide text-slate-700 group-hover:text-blue-600 transition-colors">
        {title}
      </div>
    </motion.div>
  </Link>
);

export default HomePage;