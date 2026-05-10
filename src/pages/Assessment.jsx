import React, { useState, useCallback, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import QuestionsFlow from "../data/questions.js";

export default function Assessment() {
  const navigate = useNavigate();

  const loadState = () => {
    try {
      const saved = localStorage.getItem("assessment_state");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load state", e);
    }
    return null;
  };
  
  const savedState = loadState();

  const [currentQuestionId, setCurrentQuestionId] = useState(savedState?.currentQuestionId || "rest_1");
  const [answers, setAnswers] = useState(savedState?.answers || {});
  const [stepCount, setStepCount] = useState(savedState?.stepCount || 1);
  const [completed, setCompleted] = useState(savedState?.completed || false);
  const [logs, setLogs] = useState(savedState?.logs || []);
  const [history, setHistory] = useState(savedState?.history || []);

  useEffect(() => {
    const stateToSave = {
      currentQuestionId,
      answers,
      stepCount,
      completed,
      logs,
      history
    };
    localStorage.setItem("assessment_state", JSON.stringify(stateToSave));
  }, [currentQuestionId, answers, stepCount, completed, logs, history]);

  const totalSteps = 42; 
  const currentQuestion = QuestionsFlow[currentQuestionId] || QuestionsFlow["rest_1"];
  const progress = Math.min(((stepCount - 1) / totalSteps) * 100, 100);

  const stressLevel = useMemo(() => {
    if (logs.some((l) => l.type === "sos")) return "HIGH";

    const negativeKeywords = [
      "low_energy", "tension", "strain", "burnout", "tunneling",
      "overburdening", "avoidance", "fragile", "isolation", "paralysis",
      "neglect", "emergency", "scarcity", "low hope", "blame", "failure",
      "low adaptability", "overwhelm", "deficit", "overstimulation",
      "fatigue", "issue", "weakness", "fog", "anxiety", "stress"
    ];

    const stressMarkers = logs.filter(l => {
      const msg = l.message.toLowerCase();
      
      if (msg.includes("crisis risk") || msg.includes("burnout risk")) return true;

      return negativeKeywords.some(keyword => msg.includes(keyword));
    }).length;

    if (stressMarkers > 3) return "HIGH";
    if (stressMarkers > 0) return "MEDIUM"; 
    
    return "LOW"; 
  }, [logs]);

  const statusSummary = useMemo(() => {
    if (stressLevel === "HIGH") {
      return {
        title: "High Priority",
        description: "Multiple high-risk areas detected. Focus on recovery and support first.",
      };
    }
    if (stressLevel === "MEDIUM") {
      return {
        title: "Moderate Needs",
        description: "You have a few manageable stress points. Small resets will help.",
      };
    }
    return {
      title: "Strong Balance",
      description: "You’re in a good place. Keep the momentum going with light, focused growth.",
    };
  }, [stressLevel]);

  const recommendations = useMemo(() => {
    if (stressLevel === "HIGH") {
      return [
        {
          title: "Immediate Recovery",
          icon: "🚨",
          colorClass: "from-red-50 to-rose-50 border-red-200",
          activities: [
            { name: "Sleep Reminder", description: "Rest away from screens", path: "/sleep" },
            { name: "Relaxing Page", description: "Immersive visuals and nature sounds", path: "/relaxing" },
            { name: "Chat Page", description: "Speak with the AI", path: "/chat" },
            { name: "Counsellor Support", description: "Seek guidance", path: "/counsellor" },
            { name: "Stress Ball Game", description: "Low-stakes tactile relaxation", path: "/games/stress-ball" },
            { name: "Zen Garden Game", description: "Calming interaction", path: "/games/zen-garden" },
            { name: "SOS Page", description: "Immediate support", path: "/sos" },
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
            { name: "Breathing Exercise", description: "Quick calming reset", path: "/breathing" },
            { name: "Meditation", description: "Pause and reset your mind", path: "/meditation" },
            { name: "Mood Songs", description: "Listen to curated tracks", path: "/songs" },
            { name: "Zen Color Tap Game", description: "Break overthinking loops", path: "/games/zen-color-tap" },
            { name: "Bubble Wrap Game", description: "Simple stress release", path: "/games/bubble-wrap" },
            { name: "Self Help Suggestions", description: "Quick actionable wellness tips", path: "/self-help" },
          ],
        },
      ];
    }

    return [
      {
        title: "Daily Maintenance",
        icon: "✅",
        colorClass: "from-emerald-50 to-green-50 border-emerald-200",
        activities: [
          { name: "Gratitude Activity", description: "Stay grounded and balanced", path: "/gratitude" },
          { name: "Pomodoro Timer", description: "Maintain productivity momentum", path: "/pomodoro" },
          { name: "Whiteboard", description: "Free-form doodling and clearing thoughts", path: "/whiteboard" },
          { name: "Calm Music", description: "Enhance your space with calm audio", path: "/calm-music" },
        ],
      },
    ];
  }, [stressLevel]);

  const goBack = useCallback(() => {
    if (history.length === 0) return;
    const prevState = history[history.length - 1];
    setCurrentQuestionId(prevState.currentQuestionId);
    setAnswers(prevState.answers);
    setStepCount(prevState.stepCount);
    setLogs(prevState.logs);
    setHistory((prev) => prev.slice(0, -1));
  }, [history]);

  const handleAnswer = useCallback(
    (optionId) => {
      // Snapshot state for robust undo functionality
      setHistory((prev) => [
        ...prev,
        { currentQuestionId, answers, stepCount, logs }
      ]);
      
      setAnswers((prev) => ({ ...prev, [currentQuestionId]: optionId }));

      // Save persona based on the "Accident" scenario
      if (currentQuestionId === "ind_1") {
        let selectedPersona = "Strategist"; // Default B
        if (optionId === "A") selectedPersona = "Nurturer";
        if (optionId === "C") selectedPersona = "Coach";
        
        localStorage.setItem("userPersona", selectedPersona);
      }

      const selectedOption = currentQuestion.options.find(
        (opt) => opt.id === optionId
      );

      if (selectedOption?.log) {
        setLogs((prev) => [...prev, { type: "log", message: selectedOption.log }]);
      }

      if (selectedOption?.sos) {
        setLogs((prev) => [
          ...prev,
          { type: "sos", message: selectedOption.alert || "High Risk" },
        ]);
      }

      const nextId = selectedOption?.next;

      if (!nextId || nextId === null) {
        setCompleted(true);
        return;
      }

      setCurrentQuestionId(nextId);
      setStepCount((prev) => prev + 1);
    },
    [currentQuestionId, answers, stepCount, logs, currentQuestion]
  );

  const restart = () => {
    setCurrentQuestionId("rest_1");
    setAnswers({});
    setStepCount(1);
    setCompleted(false);
    setLogs([]);
    setHistory([]);
    localStorage.removeItem("assessment_state");
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-5xl rounded-3xl border border-white/60 bg-white/90 backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 md:p-10">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gray-100 text-sm font-semibold text-gray-700 mb-4">
                  🎉 Assessment complete
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900">
                  Wellness Result
                </h1>
                <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl">
                  You completed {Object.keys(answers).length} checks.
                </p>
              </div>

              <div className="w-full lg:w-80 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-700 p-6 text-white shadow-xl">
                <div className="text-sm uppercase tracking-wider text-white/70">
                  Current status
                </div>
                <div className="mt-3 text-2xl font-black">{stressLevel} STRESS ZONE</div>
                <p className="mt-3 text-sm text-white/80 leading-relaxed">
                  {statusSummary.description}
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
              {recommendations.map((section, index) => (
                <div
                  key={index}
                  className={`rounded-3xl border bg-gradient-to-br ${section.colorClass} p-6 shadow-lg`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="text-2xl">{section.icon}</div>
                    <h3 className="text-xl font-black text-gray-900">{section.title}</h3>
                  </div>

                  <div className="space-y-3">
                    {section.activities.map((activity, i) => (
                      <button
                        key={i}
                        onClick={() => navigate(activity.path)}
                        className="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-4 text-left shadow-sm transition hover:shadow-md hover:bg-white"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="font-bold text-gray-900">{activity.name}</div>
                            <div className="mt-1 text-sm text-gray-600">
                              {activity.description}
                            </div>
                          </div>
                          <div className="rounded-full bg-gray-900 px-3 py-1 text-xs font-mono text-white">
                            Open
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={restart}
                className="flex-1 rounded-2xl bg-gray-900 px-6 py-4 font-bold text-white shadow-lg"
              >
                🔄 New Assessment
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => alert("✅ Report saved to your wellness journal!")}
                className="flex-1 rounded-2xl bg-emerald-600 px-6 py-4 font-bold text-white shadow-lg"
              >
                💾 Save & Share Report
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        key={currentQuestionId}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl w-full max-w-lg border border-white/50 relative"
      >
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-xs font-medium rounded-full text-blue-700">
              {currentQuestion?.category || "Wellness Check"}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg"
            />
          </div>
        </div>

        {history.length > 0 && (
          <button 
            onClick={goBack}
            className="mb-6 text-sm text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1 font-medium bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full"
          >
            ← Back
          </button>
        )}

        {currentQuestion?.title && (
          <div className="mb-6 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <h3 className="font-semibold text-blue-800 text-sm uppercase tracking-wide">
              {currentQuestion.title}
            </h3>
          </div>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl md:text-2xl font-bold text-gray-800 mb-8 text-center leading-relaxed"
        >
          {currentQuestion?.question}
        </motion.h2>

        <div className="space-y-3">
          {currentQuestion?.options && currentQuestion.options.map((option, index) => (
            <motion.button
              key={`${currentQuestionId}-${option.id}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(option.id)}
              className="group relative w-full p-5 bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-2xl shadow-sm transition-all duration-200 text-left overflow-hidden"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 leading-relaxed pr-2">
                    {option.text}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
