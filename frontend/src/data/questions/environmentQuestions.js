const environmentQuestions = [
  {
    id: 1,
    question:
      "How often have your surroundings or environment affected your emotional peace or mental comfort?",
    type: "main",
  },

  {
    id: 2,
    question:
      "How often have noise, pressure, negativity, or an uncomfortable atmosphere caused you stress?",
    type: "main",
  },

  {
    id: 3,
    question:
      "How often do you feel emotionally unsafe, mentally disturbed, or unable to relax in your environment?",
    type: "main",
  },

  // BRANCH QUESTION 1
  {
    id: 4,
    question:
      "How often does your environment affect your sleep, concentration, or emotional balance?",
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
      "How often do you avoid certain places or situations because they increase your emotional stress?",
    type: "branch",
    dependsOn: 3,
    showIf: [
      "More than half the days",
      "Nearly every day",
    ],
  },
];

export default environmentQuestions;