import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Your components / pages
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import NormalDashboard from "./dashboards/NormalDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AppRoutes from "./routes/AppRoutes";
import FloatingMindCareAI from "./components/FloatingMindCareAI";
import Signup from "./pages/auth/Signup";

// Assessment & Info pages (keep these if still used elsewhere)
import AssessmentCategory from "./pages/assessment/AssessmentCategory";
import AssessmentQuestions from "./pages/assessment/AssessmentQuestions";
import GeneralInfo from "./pages/assessment/info/GeneralInfo";
import HealthInfo from "./pages/assessment/info/HealthInfo";
import MoneyInfo from "./pages/assessment/info/MoneyInfo";
import RelationshipInfo from "./pages/assessment/info/RelationshipInfo";
import FocusGrowthInfo from "./pages/assessment/info/FocusGrowthInfo";
import SleepEnergyInfo from "./pages/assessment/info/SleepEnergyInfo";
import EnvironmentInfo from "./pages/assessment/info/EnvironmentInfo";

function App() {
  // ✅ Safe helper to read user from localStorage
  const getUser = () => {
    try {
      const user = localStorage.getItem("mindcareUser");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  };

  // ✅ React state mirrors localStorage
  const [user, setUser] = useState(getUser);

  // 🤖 AI status
  const [aiStatus, setAiStatus] = useState("checking");

  // 🔐 Sync user across tabs & after login
  useEffect(() => {
    const syncUser = () => {
      setUser(getUser());
    };

    window.addEventListener("storage", syncUser);
    window.addEventListener("focus", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("focus", syncUser);
    };
  }, []);

  // 🤖 Check Ollama AI status
  useEffect(() => {
    const checkOllama = async () => {
      try {
        const response = await fetch("http://localhost:11434/api/tags");
        if (response.ok) setAiStatus("online");
        else setAiStatus("offline");
      } catch {
        setAiStatus("offline");
      }
    };

    checkOllama();
    const interval = setInterval(checkOllama, 30000);
    return () => clearInterval(interval);
  }, []);

  // 🚪 LOGOUT
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("mindcareUser");
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      {/* Navbar */}
      <Navbar user={user} aiStatus={aiStatus} handleLogout={handleLogout} />

      {/* Routes */}
      <Routes>
        {/* Public Auth Routes */}
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        <Route path="/signup" element={<Signup />} />

        {/* Assessment */}
        <Route path="/assessment" element={<AssessmentCategory />} />
        <Route path="/assessment/:category" element={<AssessmentQuestions />} />

        {/* Info Pages */}
        <Route path="/assessment/info/general" element={<GeneralInfo />} />
        <Route path="/assessment/info/health" element={<HealthInfo />} />
        <Route path="/assessment/info/money" element={<MoneyInfo />} />
        <Route path="/assessment/info/relationship" element={<RelationshipInfo />} />
        <Route path="/assessment/info/focus-growth" element={<FocusGrowthInfo />} />
        <Route path="/assessment/info/sleep-energy" element={<SleepEnergyInfo />} />
        <Route path="/assessment/info/safe-space" element={<EnvironmentInfo />} />
<Route path="/signup" element={<Signup />} />
        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <NormalDashboard user={user} />
            </ProtectedRoute>
          }
        />

        {/* Catch‑all / landing */}
        <Route
          path="/*"
          element={<AppRoutes user={user} aiStatus={aiStatus} />}
        />
      </Routes>

      {/* Floating AI */}
      <FloatingMindCareAI aiStatus={aiStatus} />
    </BrowserRouter>
  );
}

export default App;