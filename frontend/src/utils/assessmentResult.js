export const analyzeAnswers = (answers) => {
  const text = Object.values(answers).join(" ").toLowerCase();

  let stress = 0;
  let loneliness = 0;
  let exhaustion = 0;

  if (text.includes("stress") || text.includes("anxiety")) stress += 2;
  if (text.includes("overwhelmed") || text.includes("pressure")) stress += 2;

  if (text.includes("sad") || text.includes("down")) stress += 1;

  if (text.includes("lonely") || text.includes("isolated")) loneliness += 2;

  if (
    text.includes("exhaustion") ||
    text.includes("tired") ||
    text.includes("mental fog")
  )
    exhaustion += 2;

  const score = stress + loneliness + exhaustion;

  if (score >= 5) return "high";
  if (score >= 3) return "medium";
  return "low";
};

export const getSuggestion = (level) => {
  if (level === "high") {
    return {
      title: "You may be experiencing high stress ⚠️",
      message:
        "You are going through emotional pressure. You don’t have to handle everything alone.",
      tips: [
        "Talk to friends or family 🤝",
        "Practice breathing exercises 🌿",
        "Avoid isolating yourself",
        "Consult a psychologist if needed ⚠️"
      ],
      emoji: "⚠️",
      color: "red"
    };
  }

  if (level === "medium") {
    return {
      title: "You have moderate stress 🌿",
      message:
        "You are managing, but some pressure is present. Small self-care steps will help.",
      tips: [
        "Listen to calm music 🎧",
        "Take short breaks",
        "Go for a walk",
        "Write your thoughts"
      ],
      emoji: "🌿",
      color: "blue"
    };
  }

  return {
    title: "You are emotionally balanced 😊",
    message:
      "Great! You are maintaining a healthy mindset. Keep going!",
    tips: [
      "Stay connected socially",
      "Maintain routines",
      "Do things you enjoy"
    ],
    emoji: "😊",
    color: "green"
  };
};