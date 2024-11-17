export const items = [
  "Configuration Management",
  "Estimation",
  "Requirement",
  "Testing",
  "Engineering Management",
  "Process Improvement",
  "Tools",
  "Peer Reviews",
];

export const quizMap: any = {
  "Configuration Management": {
    combo: "Estimation",
    color: "#e57373",
    border: "#e53935",
  },
  Estimation: {
    combo: "Configuration Management",
    color: "#e57373",
    border: "#e53935",
  },

  Tools: { combo: "Peer Reviews", color: "#9575cd", border: "#5e35b1" },
  "Peer Reviews": { combo: "Tools", color: "#9575cd", border: "#5e35b1" },

  Requirement: { combo: "Testing", color: "#64b5f6", border: "#1e88e5" },
  Testing: { combo: "Requirement", color: "#64b5f6", border: "#1e88e5" },

  "Engineering Management": {
    combo: "Process Improvement",
    color: "#4db6ac",
    border: "#00897b",
  },
  "Process Improvement": {
    combo: "Engineering Management",
    color: "#4db6ac",
    border: "#00897b",
  },
};