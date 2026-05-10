const moneyQuestions = [
  {
    id: 1,
    question:
      "How often have financial problems or money-related worries caused you emotional stress?",
    type: "main",
  },

  {
    id: 2,
    question:
      "How often have you felt pressure about expenses, savings, education costs, or future financial stability?",
    type: "main",
  },

  {
    id: 3,
    question:
      "How often do money concerns affect your focus, sleep, confidence, or daily peace of mind?",
    type: "main",
  },

  // BRANCH QUESTION 1
  {
    id: 4,
    question:
      "How often do you overthink about your financial future or fear unexpected financial problems?",
    type: "branch",
    dependsOn: 2,
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
      "How often do financial worries make you feel emotionally exhausted, stressed, or mentally overwhelmed?",
    type: "branch",
    dependsOn: 1,
    showIf: [
      "More than half the days",
      "Nearly every day",
    ],
  },
];

export default moneyQuestions;