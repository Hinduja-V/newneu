const relationshipQuestions = [
  {
    id: 1,
    question:
      "How often have relationship problems or emotional conflicts affected your peace of mind?",
    type: "main",
  },

  {
    id: 2,
    question:
      "How often have you felt emotionally hurt, ignored, or unsupported by someone close to you?",
    type: "main",
  },

  {
    id: 3,
    question:
      "How often do misunderstandings or overthinking about relationships affect your mood?",
    type: "main",
  },

  // BRANCH QUESTION 1
  {
    id: 4,
    question:
      "How often do these relationship concerns affect your sleep, concentration, or daily activities?",
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
      "How often do you avoid conversations or social interactions because of emotional stress in relationships?",
    type: "branch",
    dependsOn: 2,
    showIf: [
      "More than half the days",
      "Nearly every day",
    ],
  },
];

export default relationshipQuestions;