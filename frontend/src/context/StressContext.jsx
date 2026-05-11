// src/context/StressContext.jsx
import React, { createContext, useState } from "react";

export const StressContext = createContext();

export const StressProvider = ({ children }) => {
  const [stressLevel, setStressLevel] = useState("low"); // low | medium | high

  return (
    <StressContext.Provider value={{ stressLevel, setStressLevel }}>
      {children}
    </StressContext.Provider>
  );
};