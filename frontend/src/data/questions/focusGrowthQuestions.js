const focusGrowthQuestions = [
  {
    id: 1,
    question:
      "How often have stress or emotional pressure affected your focus, learning, or productivity?",
    type: "main",
  },

  {
    id: 2,
    question:
      "How often have you felt unmotivated or unable to achieve your personal or academic goals?",
    type: "main",
  },

  {
    id: 3,
    question:
      "How often do overthinking, distractions, or emotional stress reduce your confidence or growth?",
    type: "main",
  },

  // BRANCH QUESTION 1
  {
    id: 4,
    question:
      "How often do these focus or productivity problems affect your daily performance or future goals?",
    type: "branch",
    dependsOn: 1,
    showIf: [
      "Several days",
      "More than half the days",
      "Nearly every day",
    ],
  },

  // BRANCH QUESTION 2
  {
    id: 5,
    question:
      "How often do you feel mentally blocked, emotionally stuck, or unable to stay consistent in your growth journey?",
    type: "branch",
    dependsOn: 2,
    showIf: [
      "More than half the days",
      "Nearly every day",
    ],
  },
];

export default focusGrowthQuestions;