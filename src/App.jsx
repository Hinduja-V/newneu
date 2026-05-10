import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { auth, googleProvider } from "./firebase/config";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import FloatingMindCareAI from "./components/FloatingMindCareAI";
import Navbar from "./components/Navbar";

import AppRoutes from "./routes/AppRoutes";

// Assessment Pages
import AssessmentCategory from "./pages/assessment/AssessmentCategory";
import AssessmentQuestions from "./pages/assessment/AssessmentQuestions";

// Info Pages
import GeneralInfo from "./pages/assessment/info/GeneralInfo";
import HealthInfo from "./pages/assessment/info/HealthInfo";
import MoneyInfo from "./pages/assessment/info/MoneyInfo";
import RelationshipInfo from "./pages/assessment/info/RelationshipInfo";
import FocusGrowthInfo from "./pages/assessment/info/FocusGrowthInfo";
import SleepEnergyInfo from "./pages/assessment/info/SleepEnergyInfo";
import EnvironmentInfo from "./pages/assessment/info/EnvironmentInfo";

function App() {
  const [user, setUser] = useState(null);

  // 🤖 Track Ollama Connection
  const [aiStatus, setAiStatus] = useState("checking");

  // 🔐 Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // 🤖 AI Status Listener
  useEffect(() => {
    const checkOllama = async () => {
      try {
        const response = await fetch("http://localhost:11434/api/tags");

        if (response.ok) {
          setAiStatus("online");
        } else {
          setAiStatus("offline");
        }
      } catch (error) {
        setAiStatus("offline");
      }
    };

    // Initial check
    checkOllama();

    // Check every 30 seconds
    const interval = setInterval(checkOllama, 30000);

    return () => clearInterval(interval);
  }, []);

  // 🔑 Login
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log("Login Error:", error);
    }
  };

  // 🚪 Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  return (
    <BrowserRouter>
      {/* Navbar */}
      <Navbar
        user={user}
        aiStatus={aiStatus}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />

      {/* Routes */}
      <Routes>
        {/* Assessment Home */}
        <Route
          path="/assessment"
          element={<AssessmentCategory />}
        />

        {/* Assessment Info Pages */}
        <Route
          path="/assessment/info/general"
          element={<GeneralInfo />}
        />

        <Route
          path="/assessment/info/health"
          element={<HealthInfo />}
        />

        <Route
          path="/assessment/info/money"
          element={<MoneyInfo />}
        />

        <Route
          path="/assessment/info/relationship"
          element={<RelationshipInfo />}
        />

        <Route
          path="/assessment/info/focus-growth"
          element={<FocusGrowthInfo />}
        />

        <Route
          path="/assessment/info/sleep-energy"
          element={<SleepEnergyInfo />}
        />

        <Route
          path="/assessment/info/safe-space"
          element={<EnvironmentInfo />}
        />

        {/* Dynamic Assessment Questions */}
        <Route
          path="/assessment/:category"
          element={<AssessmentQuestions />}
        />

        {/* Main App Routes */}
        <Route
          path="/*"
          element={
            <AppRoutes
              user={user}
              aiStatus={aiStatus}
            />
          }
        />
      </Routes>

      {/* Floating AI Assistant */}
      <FloatingMindCareAI />
    </BrowserRouter>
  );
}

export default App;