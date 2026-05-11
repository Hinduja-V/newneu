import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import healthQuestions from "../../data/questions/healthQuestions";
import moneyQuestions from "../../data/questions/moneyQuestions";
import relationshipQuestions from "../../data/questions/relationshipQuestions";
import generalQuestions from "../../data/questions/generalQuestions";
import focusGrowthQuestions from "../../data/questions/focusGrowthQuestions";
import sleepEnergyQuestions from "../../data/questions/sleepEnergyQuestions";
import environmentQuestions from "../../data/questions/environmentQuestions";

import phq9Questions from "../../data/questions/phq9Questions";
import gad7Questions from "../../data/questions/gad7Questions";

const options = [
  { text: "Not at all", score: 0 },
  { text: "Several days", score: 1 },
  { text: "More than half the days", score: 2 },
  { text: "Nearly every day", score: 3 },
];

const moodOptions = [
  { text: "Happy", icon: "😊" },
  { text: "Sad", icon: "😢" },
  { text: "Anxious", icon: "😰" },
  { text: "Angry", icon: "😡" },
  { text: "Tired", icon: "😴" },
];

// ─── Recommendations ──────────────────────────────────────────────────────────

const highRecommendations = [
  {
    title: "Emotional Stabilization",
    icon: "💬",
    colorClass: "from-red-50 to-rose-50 border-red-200",
    activities: [
      { name: "Talk to AI", description: "Share your thoughts safely", path: "/chat" },
      { name: "Mental Health Support", description: "Understand your mental state", path: "/mental-health" },
      { name: "Counsellor Support", description: "Connect with a professional", path: "/counsellor" },
      { name: "SOS Support", description: "Get immediate emergency support", path: "/sos" },
    ],
  },
  {
    title: "Calming Reset Tools",
    icon: "🧘",
    colorClass: "from-orange-50 to-amber-50 border-orange-200",
    activities: [
      { name: "Meditation", description: "Find inner peace and calm", path: "/meditation" },
      { name: "Breathing Exercise", description: "Control panic in minutes", path: "/breathing" },
      { name: "Sleep Reminder", description: "Recover through rest", path: "/sleep" },
      { name: "Calm Music", description: "Soothe emotional overload", path: "/calm-music" },
    ],
  },
];

const mediumRecommendations = [
  {
    title: "Emotional Reset",
    icon: "⚡",
    colorClass: "from-yellow-50 to-orange-50 border-yellow-200",
    activities: [
      { name: "Breathing Exercise", description: "Quick stress reset", path: "/breathing" },
      { name: "Meditation", description: "Restore inner balance", path: "/meditation" },
      { name: "Mood Songs", description: "Improve emotional balance", path: "/songs" },
    ],
  },
  {
    title: "Focus Improvement",
    icon: "🎯",
    colorClass: "from-sky-50 to-cyan-50 border-sky-200",
    activities: [
      { name: "Pomodoro Timer", description: "Work with intention", path: "/pomodoro" },
      { name: "AI Motivation", description: "Get a motivational boost", path: "/ai-motivation" },
      { name: "AI Videos", description: "Learning & inspiration", path: "/ai-videos" },
    ],
  },
  {
    title: "Expression & Wellness",
    icon: "🧠",
    colorClass: "from-indigo-50 to-violet-50 border-indigo-200",
    activities: [
      { name: "Whiteboard", description: "Free-form expression", path: "/whiteboard" },
      { name: "Self-Help Suggestions", description: "Personalized guidance", path: "/self-help" },
    ],
  },
  {
    title: "Light Relaxation Games",
    icon: "🎮",
    colorClass: "from-rose-50 to-pink-50 border-rose-200",
    activities: [
      { name: "Zen Color Tap", description: "Focus + calm", path: "/games/zen-color-tap" },
      { name: "Bubble Wrap", description: "Quick tension relief", path: "/games/bubble-wrap" },
    ],
  },
];

const lowRecommendations = [
  {
    title: "Wellness Growth",
    icon: "🌱",
    colorClass: "from-green-50 to-emerald-50 border-green-200",
    activities: [
      { name: "Gratitude Activity", description: "Maintain positivity", path: "/gratitude" },
      { name: "Pomodoro Timer", description: "Boost healthy productivity", path: "/pomodoro" },
      { name: "Calm Music", description: "Stay mentally refreshed", path: "/calm-music" },
      { name: "Meditation", description: "Deepen mindfulness", path: "/meditation" },
    ],
  },
  {
    title: "Productivity & Learning",
    icon: "🎯",
    colorClass: "from-teal-50 to-cyan-50 border-teal-200",
    activities: [
      { name: "AI Motivation", description: "Stay inspired daily", path: "/ai-motivation" },
      { name: "AI Videos", description: "Learning & inspiration", path: "/ai-videos" },
      { name: "Self-Help Suggestions", description: "Personalized guidance", path: "/self-help" },
    ],
  },
  {
    title: "Relaxed Games",
    icon: "🎮",
    colorClass: "from-lime-50 to-green-50 border-lime-200",
    activities: [
      { name: "Zen Garden", description: "Mindful relaxation", path: "/games/zen-garden" },
      { name: "Zen Color Tap", description: "Focus & calm", path: "/games/zen-color-tap" },
      { name: "Cube Game", description: "Light distraction", path: "/games/cube" },
    ],
  },
];

// ─── Storage Key ──────────────────────────────────────────────────────────────
const STORAGE_KEY = "assessmentResult";

// ─── Component ────────────────────────────────────────────────────────────────
const AssessmentQuestions = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const categoryMap = {
    health: healthQuestions,
    money: moneyQuestions,
    relationship: relationshipQuestions,
    general: generalQuestions,
    "focus-growth": focusGrowthQuestions,
    "sleep-energy": sleepEnergyQuestions,
    "safe-space": environmentQuestions,
  };

  const buildQuestions = useCallback(
    () => [...(categoryMap[category] || []), ...phq9Questions, ...gad7Questions],
    [category]
  );

  const [questions, setQuestions] = useState(() => buildQuestions());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [showMoodGate, setShowMoodGate] = useState(false);

  // ── STEP 2: Restore result from sessionStorage on mount ──────────────────
  useEffect(() => {
    const savedResult = sessionStorage.getItem(STORAGE_KEY);
    if (savedResult) {
      try {
        const parsed = JSON.parse(savedResult);
        if (parsed.completed) {
          setAnswers(parsed.answers || []);
          setCompleted(true);
        }
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Re-load questions when category changes
  useEffect(() => {
    setQuestions(buildQuestions());
  }, [category, buildQuestions]);

  const categoryLength = categoryMap[category]?.length || 0;
  const phqStart = categoryLength;
  const gadStart = categoryLength + phq9Questions.length;

  const handleNext = () => {
    if (!selected) return;

    const updatedAnswers = [
      ...answers,
      {
        question: questions[currentQuestion]?.question,
        answer: selected.text,
        score: selected.score,
      },
    ];

    setAnswers(updatedAnswers);
    setSelected(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // ── STEP 1: Persist result to sessionStorage ──────────────────────────
      const totalScore = updatedAnswers.reduce((sum, item) => sum + item.score, 0);
      const maxScore = questions.length * 3;
      const percentageScore = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

      const resultData = {
        completed: true,
        percentageScore,
        answers: updatedAnswers,
      };

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(resultData));
      setCompleted(true);
    }
  };

  const totalScore = useMemo(() => answers.reduce((sum, item) => sum + item.score, 0), [answers]);
  const maxScore = questions.length * 3;
  const percentageScore = useMemo(
    () => (maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0),
    [totalScore, maxScore]
  );

  // If result was restored from sessionStorage, recalculate percentageScore from answers
  const resolvedPercentage = useMemo(() => {
    const savedResult = sessionStorage.getItem(STORAGE_KEY);
    if (savedResult && completed) {
      try {
        const parsed = JSON.parse(savedResult);
        return parsed.percentageScore ?? percentageScore;
      } catch {
        return percentageScore;
      }
    }
    return percentageScore;
  }, [completed, percentageScore]);

  const stressLevel = useMemo(() => {
    if (resolvedPercentage <= 33) return "LOW";
    if (resolvedPercentage <= 66) return "MEDIUM";
    return "HIGH";
  }, [resolvedPercentage]);

  const statusSummary = useMemo(() => {
    if (stressLevel === "HIGH") {
      return {
        title: "High Stress Detected",
        description:
          "You may be emotionally overwhelmed and mentally exhausted. Focus on rest, support, and recovery.",
      };
    }
    if (stressLevel === "MEDIUM") {
      return {
        title: "Moderate Stress Detected",
        description:
          "You have some emotional pressure and stress points. Small daily resets can help significantly.",
      };
    }
    return {
      title: "Low Stress Detected",
      description:
        "Your emotional wellness appears balanced. Continue maintaining healthy routines and self-care.",
    };
  }, [stressLevel]);

  const recommendations = useMemo(() => {
    if (stressLevel === "HIGH") return highRecommendations;
    if (stressLevel === "MEDIUM") return mediumRecommendations;
    return lowRecommendations;
  }, [stressLevel]);

  // New Assessment: show mood gate → on mood select, clear storage and reset
  const handleNewAssessment = useCallback(() => {
    setShowMoodGate(true);
  }, []);

  const handleMoodSelect = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setShowMoodGate(false);
    setCompleted(false);
    setAnswers([]);
    setCurrentQuestion(0);
    setSelected(null);
    setQuestions(buildQuestions());
  }, [buildQuestions]);

  // Navigate to activity — no history hacks needed; browser back naturally returns to result
  const handleActivityNavigate = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  const getQuestionLabel = () => {
    if (currentQuestion < categoryLength) return `Question ${currentQuestion + 1}`;
    if (currentQuestion >= phqStart && currentQuestion < gadStart)
      return `PHQ Question ${currentQuestion - phqStart + 1}`;
    return `GAD Question ${currentQuestion - gadStart + 1}`;
  };

  const getSectionTitle = () => {
    if (currentQuestion < categoryLength) return "Stress Assessment";
    if (currentQuestion >= phqStart && currentQuestion < gadStart) return "SECTION 2 — PHQ-9";
    return "SECTION 3 — GAD-7";
  };

  const getTransitionText = () => {
    if (currentQuestion >= phqStart && currentQuestion < gadStart)
      return "Now think about how you have been feeling emotionally over the past 2 weeks.";
    if (currentQuestion >= gadStart)
      return "Now think about your anxiety and stress levels over the past 2 weeks.";
    return "Answer honestly to receive personalized emotional insights and wellness recommendations.";
  };

  const circumference = 2 * Math.PI * 100;
  const strokeDashoffset = circumference - (resolvedPercentage / 100) * circumference;
  const gaugeColor =
    resolvedPercentage <= 33 ? "#10b981" : resolvedPercentage <= 66 ? "#f59e0b" : "#ef4444";

  const StressGauge = () => (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-72 h-72">
        <svg viewBox="0 0 240 240" className="w-full h-full transform -rotate-90">
          <circle cx="120" cy="120" r="100" fill="none" stroke="#e5e7eb" strokeWidth="18" />
          <motion.circle
            cx="120"
            cy="120"
            r="100"
            fill="none"
            stroke={gaugeColor}
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-7xl font-black text-slate-900 leading-none">{resolvedPercentage}</div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <div
          className="text-2xl font-black uppercase tracking-[3px]"
          style={{ color: gaugeColor }}
        >
          {stressLevel}
        </div>
      </div>
    </div>
  );

  // ── Result Screen ──────────────────────────────────────────────────────────
  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 flex items-center justify-center px-4 py-14">
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          >
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
                Assessment Completed
              </h1>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Your emotional wellness report has been generated successfully.
              </p>
            </div>

            {/* Gauge */}
            <div className="mb-12 text-center">
              <StressGauge />
              <div className="max-w-2xl mx-auto mt-6">
                <h2 className="text-3xl font-extrabold text-slate-800 mb-4">
                  {statusSummary.title}
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  {statusSummary.description}
                </p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              {recommendations.map((section, index) => (
                <div
                  key={index}
                  className={`rounded-3xl border bg-gradient-to-br ${section.colorClass} p-6 shadow-lg`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-3xl">{section.icon}</div>
                    <h3 className="text-2xl font-extrabold text-slate-800">{section.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {section.activities.map((activity, i) => (
                      <button
                        key={i}
                        onClick={() => handleActivityNavigate(activity.path)}
                        className="w-full bg-white rounded-2xl p-5 text-left border border-white/70 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-bold text-slate-800 text-lg">{activity.name}</h4>
                            <p className="text-slate-500 mt-1">{activity.description}</p>
                          </div>
                          <div className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold shrink-0">
                            OPEN
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col md:flex-row gap-4">
              <button
                onClick={handleNewAssessment}
                className="flex-1 py-5 rounded-2xl bg-slate-900 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                🔄 New Assessment
              </button>
              <button
                onClick={() => alert("Report saved successfully!")}
                className="flex-1 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                💾 Save Report
              </button>
            </div>
          </motion.div>
        </div>

        {/* Mood Gate Modal */}
        <AnimatePresence>
          {showMoodGate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl"
              >
                <h2 className="text-3xl font-extrabold text-slate-800 text-center mb-3">
                  How are you feeling right now?
                </h2>
                <p className="text-slate-500 text-center mb-8">
                  Choose one mood to start a new assessment.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {moodOptions.map((m) => (
                    <button
                      key={m.text}
                      onClick={handleMoodSelect}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center hover:bg-cyan-50 hover:border-cyan-300 transition-all"
                    >
                      <div className="text-4xl mb-2">{m.icon}</div>
                      <div className="font-bold text-slate-800">{m.text}</div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowMoodGate(false)}
                    className="text-slate-500 hover:text-slate-800 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── Question Screen ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-4 py-14">
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <p className="uppercase tracking-[4px] text-cyan-600 font-bold mb-4">
            {getSectionTitle()}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight">
            Emotional Wellness Assessment
          </h1>
          <p className="text-slate-500 mt-5 text-lg max-w-2xl mx-auto whitespace-pre-line leading-relaxed">
            {getTransitionText()}
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
          />
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -35 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 md:p-10"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm font-bold text-cyan-600 tracking-widest uppercase">
                {getQuestionLabel()}
              </span>
              <span className="text-sm text-slate-500">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>

            <h2 className="text-3xl font-extrabold text-slate-800 leading-snug mb-10">
              {questions[currentQuestion]?.question}
            </h2>

            <div className="space-y-4">
              {options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelected(option)}
                  className={`w-full text-left px-6 py-5 rounded-2xl border transition-all duration-300 text-lg font-medium ${
                    selected?.text === option.text
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-lg"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:border-cyan-400 hover:bg-cyan-50"
                  }`}
                >
                  {option.text}
                </motion.button>
              ))}
            </div>

            <div className="mt-10 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleNext}
                disabled={!selected}
                className={`px-10 py-4 rounded-2xl text-lg font-bold shadow-xl transition-all duration-300 ${
                  selected
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                {currentQuestion === questions.length - 1 ? "Finish Assessment" : "Next Question"}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AssessmentQuestions;
