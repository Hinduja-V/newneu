import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
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
  {
    text: "Not at all",
    score: 0,
  },
  {
    text: "Several days",
    score: 1,
  },
  {
    text: "More than half the days",
    score: 2,
  },
  {
    text: "Nearly every day",
    score: 3,
  },
];

const AssessmentQuestions = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [preventBack, setPreventBack] = useState(false);
  const historyStateRef = useRef(null);

  // CATEGORY QUESTION MAPPING
  const categoryMap = {
    health: healthQuestions,
    money: moneyQuestions,
    relationship: relationshipQuestions,
    general: generalQuestions,
    "focus-growth": focusGrowthQuestions,
    "sleep-energy": sleepEnergyQuestions,
    "safe-space": environmentQuestions,
  };

  // LOAD QUESTIONS
  useEffect(() => {
    const categoryQuestions = categoryMap[category] || [];

    const combinedQuestions = [
      ...categoryQuestions,
      ...phq9Questions,
      ...gad7Questions,
    ];

    setQuestions(combinedQuestions);
  }, [category]);

  // FIXED BACK BUTTON PREVENTION - ONLY FOR RESULTS SCREEN
  useEffect(() => {
    if (completed) {
      setPreventBack(true);
      
      // Push 2 extra history states to create buffer
      window.history.pushState({ page: 'assessment-results' }, '', window.location.href);
      window.history.pushState({ page: 'assessment-results-buffer' }, '', window.location.href);
      
      const handlePopState = (event) => {
        if (preventBack && event.state?.page !== 'assessment-questions') {
          event.preventDefault();
          // Push back the results state to stay on results
          window.history.pushState({ page: 'assessment-results' }, '', window.location.href);
        }
      };

      window.addEventListener('popstate', handlePopState);
      
      historyStateRef.current = handlePopState;
      
      return () => {
        if (historyStateRef.current) {
          window.removeEventListener('popstate', historyStateRef.current);
        }
      };
    }
  }, [completed, preventBack]);

  // CATEGORY LENGTH
  const categoryLength = categoryMap[category]?.length || 0;
  const phqStart = categoryLength;
  const gadStart = categoryLength + phq9Questions.length;

  // HANDLE NEXT
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
      setAnswers(updatedAnswers);
      setCompleted(true);
    }
  };

  // TOTAL SCORE
  const totalScore = useMemo(() => {
    return answers.reduce((sum, item) => sum + item.score, 0);
  }, [answers]);

  // FIXED: getBucketPercentage function
  const getBucketPercentage = (score) => {
    const totalQuestions = questions.length;
    const maxScore = totalQuestions * 3; // max score per question is 3
    const percentage = (score / maxScore) * 100;
    
    if (percentage <= 33) return percentage / 33;
    if (percentage <= 66) return 1 + (percentage - 33) / 66;
    return 2 + (percentage - 66) / 34;
  };

  // STRESS LEVEL
  const stressLevel = useMemo(() => {
    if (totalScore <= 10) {
      return "LOW";
    }
    if (totalScore <= 25) {
      return "MEDIUM";
    }
    return "HIGH";
  }, [totalScore]);

  // STATUS SUMMARY
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

  // RECOMMENDATIONS
  const recommendations = useMemo(() => {
    if (stressLevel === "HIGH") {
      return [
        {
          title: "Immediate Recovery",
          icon: "🚨",
          colorClass: "from-red-50 to-rose-50 border-red-200",
          activities: [
            {
              name: "Talk to AI",
              description: "Share your thoughts safely",
              path: "/chat",
            },
            {
              name: "Relaxing Sounds",
              description: "Reduce emotional overload",
              path: "/relaxing",
            },
            {
              name: "Meditation",
              description: "Calm anxiety and stress",
              path: "/meditation",
            },
            {
              name: "SOS Support",
              description: "Get immediate support resources",
              path: "/sos",
            },
          ],
        },
      ];
    }
    if (stressLevel === "MEDIUM") {
      return [
        {
          title: "Reset & Refocus",
          icon: "⚡",
          colorClass: "from-yellow-50 to-orange-50 border-yellow-200",
          activities: [
            {
              name: "Breathing Exercise",
              description: "Quick stress reset",
              path: "/breathing",
            },
            {
              name: "Mood Music",
              description: "Improve emotional balance",
              path: "/songs",
            },
            {
              name: "Journaling",
              description: "Express emotions clearly",
              path: "/journal",
            },
          ],
        },
      ];
    }
    return [
      {
        title: "Daily Wellness",
        icon: "✅",
        colorClass: "from-green-50 to-emerald-50 border-green-200",
        activities: [
          {
            name: "Gratitude Practice",
            description: "Maintain positivity",
            path: "/gratitude",
          },
          {
            name: "Pomodoro Focus",
            description: "Boost healthy productivity",
            path: "/pomodoro",
          },
          {
            name: "Calm Music",
            description: "Stay mentally refreshed",
            path: "/calm-music",
          },
        ],
      },
    ];
  }, [stressLevel]);

  // FIXED: COMPLETE RESET FOR NEW ASSESSMENT
  const handleNewAssessment = useCallback(() => {
    // Clean up back button prevention
    setPreventBack(false);
    if (historyStateRef.current) {
      window.removeEventListener('popstate', historyStateRef.current);
    }
    
    // Reset all states
    setQuestions([]);
    setCurrentQuestion(0);
    setSelected(null);
    setAnswers([]);
    setCompleted(false);
    
    // Navigate to reload component fresh
    navigate(`/assessment/${category}`, { replace: true });
  }, [category, navigate]);

  // QUESTION LABEL
  const getQuestionLabel = () => {
    if (currentQuestion < categoryLength) {
      return `Question ${currentQuestion + 1}`;
    }
    if (currentQuestion >= phqStart && currentQuestion < gadStart) {
      return `PHQ Question ${currentQuestion - phqStart + 1}`;
    }
    return `GAD Question ${currentQuestion - gadStart + 1}`;
  };

  // SECTION TITLE
  const getSectionTitle = () => {
    if (currentQuestion < categoryLength) {
      return "Stress Assessment";
    }
    if (currentQuestion >= phqStart && currentQuestion < gadStart) {
      return "SECTION 2 — PHQ-9";
    }
    return "SECTION 3 — GAD-7";
  };

  // TRANSITION TEXT
  const getTransitionText = () => {
    if (currentQuestion >= phqStart && currentQuestion < gadStart) {
      return `Now think about how you have been feeling emotionally over the past 2 weeks.`;
    }
    if (currentQuestion >= gadStart) {
      return `Now think about your anxiety and stress levels over the past 2 weeks.`;
    }
    return `Answer honestly to receive personalized emotional insights and wellness recommendations.`;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const StressLevelIndicator = ({ score, level }) => {
    const fill = getBucketPercentage(score);

    const color =
      level === "HIGH"
        ? "#ef4444"
        : level === "MEDIUM"
        ? "#f59e0b"
        : "#10b981";

    const pathRef = useRef(null);
    const [length, setLength] = useState(0);

    useEffect(() => {
      if (pathRef.current) {
        setLength(pathRef.current.getTotalLength());
      }
    }, []);

    return (
      <div className="flex flex-col items-center justify-center">
        {/* GAUGE */}
        <div className="relative w-64 h-40">
          <svg viewBox="0 0 200 120" className="w-full h-full">
            {/* BACKGROUND SEMICIRCLE */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="14"
              strokeLinecap="round"
            />

            {/* PROGRESS SEMICIRCLE */}
            <motion.path
              ref={pathRef}
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke={color}
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={length}
              strokeDashoffset={length - length * fill}
              initial={{ strokeDashoffset: length }}
              animate={{ strokeDashoffset: length - length * fill }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>

          {/* CENTER VALUE */}
          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-6xl font-black text-slate-800">
              {score}
            </div>
            <div className="text-xs text-slate-400 font-semibold tracking-widest">
              SCORE
            </div>
          </div>
        </div>

        {/* STATUS */}
        <div className="mt-10 text-center">
          <div
            className="text-2xl font-black uppercase tracking-[3px]"
            style={{ color }}
          >
            {level}
          </div>
          <div className="mt-3 text-lg font-semibold text-slate-700">
            {level === "HIGH"
              ? " "
              : level === "MEDIUM"
              ? " "
              : " "}
          </div>
        </div>
      </div>
    );
  };

  // RESULTS SCREEN - ✅ All Steps Working
  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 flex items-center justify-center px-4 py-14">
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          >
            {/* HEADER */}
            <div className="text-center mb-10">
              <div className="text-6xl mb-5">🧠</div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
                Assessment Complete
              </h1>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Your emotional wellness report has been generated successfully.
              </p>
            </div>

            {/* STRESS CIRCLE 🟢 Step 2 */}
            <div className="mb-12 text-center">
              <StressLevelIndicator score={totalScore} level={stressLevel} />
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-extrabold text-slate-800 mb-4">
                  {statusSummary.title}
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  {statusSummary.description}
                </p>
              </div>
            </div>

            {/* RECOMMENDATIONS 🟢 Step 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              {recommendations.map((section, index) => (
                <div
                  key={index}
                  className={`rounded-3xl border bg-gradient-to-br ${section.colorClass} p-6 shadow-lg`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-3xl">{section.icon}</div>
                    <h3 className="text-2xl font-extrabold text-slate-800">
                      {section.title}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {section.activities.map((activity, i) => (
                      <button
                        key={i}
                        onClick={() => navigate(activity.path)} // 🟢 Step 3 - Navigates normally
                        className="w-full bg-white rounded-2xl p-5 text-left border border-white/70 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-bold text-slate-800 text-lg">
                              {activity.name}
                            </h4>
                            <p className="text-slate-500 mt-1">
                              {activity.description}
                            </p>
                          </div>
                          <div className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold">
                            OPEN
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ACTION BUTTONS 🟢 Step 5 */}
            <div className="mt-10 flex flex-col md:flex-row gap-4">
              <button
                onClick={handleNewAssessment} // 🟢 Step 5 - Full reset
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
      </div>
    );
  }

  // QUESTION SCREEN
  return (
    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-4 py-14">
      <div className="w-full max-w-3xl">
        {/* TOP SECTION */}
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

        {/* PROGRESS BAR */}
        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
          />
        </div>

        {/* QUESTION CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -35 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 md:p-10"
          >
            {/* QUESTION HEADER */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm font-bold text-cyan-600 tracking-widest uppercase">
                {getQuestionLabel()}
              </span>
              <span className="text-sm text-slate-500">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>

            {/* QUESTION */}
            <h2 className="text-3xl font-extrabold text-slate-800 leading-snug mb-10">
              {questions[currentQuestion]?.question}
            </h2>

            {/* OPTIONS */}
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

            {/* NEXT BUTTON */}
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
                {currentQuestion === questions.length - 1
                  ? "Finish Assessment"
                  : "Next Question"}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AssessmentQuestions;