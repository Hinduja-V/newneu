const healthQuestions = [
  {
    id: 1,
    question:
      "How often have health concerns or physical symptoms affected your peace of mind?",
    type: "main",
  },

  {
    id: 2,
    question:
      "How often have you felt physically exhausted or low on energy even after resting?",
    type: "main",
  },

  {
    id: 3,
    question:
      "How often do you overthink about illnesses, medical problems, or future health issues?",
    type: "main",
  },

  // BRANCH QUESTION 1
  {
    id: 4,
    question:
      "How often do these health worries affect your concentration, sleep, or daily routine?",
    type: "branch",
    dependsOn: 3,
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
      "How often do you feel emotionally stressed after checking symptoms, reports, or health information?",
    type: "branch",
    dependsOn: 1,
    showIf: [
      "More than half the days",
      "Nearly every day",
    ],
  },
];

export default healthQuestions;