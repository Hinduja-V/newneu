// services/stressService.js
export const getStressLevel = (score) => {
  if (score < 30) return "low";
  if (score < 70) return "medium";
  return "high";
};