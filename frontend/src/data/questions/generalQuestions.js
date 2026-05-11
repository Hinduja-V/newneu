const generalQuestions = [
  {
    id: 1,
    question:
      "How often have you felt emotionally overwhelmed or mentally stressed in your daily life?",
    type: "main",
  },

  {
    id: 2,
    question:
      "How often have your emotions affected your concentration, motivation, or productivity?",
    type: "main",
  },

  {
    id: 3,
    question:
      "How often have you struggled to feel emotionally calm, balanced, or mentally relaxed?",
    type: "main",
  },

  // BRANCH QUESTION 1
  {
    id: 4,
    question:
      "How often do stress or emotional worries affect your sleep, energy, or daily routine?",
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
      "How often do you feel mentally exhausted, emotionally drained, or unable to relax properly?",
    type: "branch",
    dependsOn: 3,
    showIf: [
      "More than half the days",
      "Nearly every day",
    ],
  },
];

export default generalQuestions;