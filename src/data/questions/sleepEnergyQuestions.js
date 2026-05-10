const sleepEnergyQuestions = [
  {
    id: 1,
    question:
      "How often have you experienced difficulty sleeping, poor sleep quality, or irregular sleep patterns?",
    type: "main",
  },

  {
    id: 2,
    question:
      "How often have you felt physically or emotionally tired even after resting?",
    type: "main",
  },

  {
    id: 3,
    question:
      "How often has low energy affected your focus, motivation, or daily productivity?",
    type: "main",
  },

  // BRANCH QUESTION 1
  {
    id: 4,
    question:
      "How often do stress, overthinking, or emotional worries make it difficult for you to sleep peacefully?",
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
      "How often do you feel mentally exhausted or emotionally drained during the day?",
    type: "branch",
    dependsOn: 2,
    showIf: [
      "More than half the days",
      "Nearly every day",
    ],
  },
];

export default sleepEnergyQuestions;