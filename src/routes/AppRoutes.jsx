import { Routes, Route, Navigate } from "react-router-dom";

/* MAIN PAGES */
import HomePage from "../pages/HomePage";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import SOSPage from "../pages/SOSPage";

/* FEATURE PAGES */
import FeaturesPage from "../pages/FeaturesPage";
import ActivitiesPage from "../pages/ActivitiesPage";
import GamesPage from "../pages/GamesPage";
import RelaxingPage from "../pages/RelaxingPage";
import ChatPage from "../pages/ChatPage";
import ResourcesPage from "../pages/ResourcesPage";
import MoodSongsPage from "../pages/MoodSongsPage";

/* TOOLS */
import Whiteboard from "../pages/Whiteboard";
import GratitudeActivity from "../pages/GratitudeActivity";
import SleepReminder from "../pages/SleepReminder";
import BreathingExercise from "../pages/BreathingExercise";
import PomodoroTimer from "../pages/PomodoroTimer";

/* GAMES */
import BreathingGame from "../pages/BreathingGame";
import StressBallGame from "../pages/StressBallGame";
import BubbleWrapGame from "../pages/BubbleWrapGame";
import ZenColorTapGame from "../pages/ZenColorTapGame";
import ZenGardenGame from "../pages/ZenGardenGame";
import CubeGame from "../pages/CubeGame";

/* WELLNESS */
import Meditation from "../pages/Meditation";
import CounsellorSupport from "../pages/CounsellorSupport";
import SelfHelpSuggestions from "../pages/SelfHelpSuggestions";
import MentalHealthSupport from "../pages/MentalHealthSupport";
import CalmMusic from "../pages/CalmMusic";
import AIVideos from "../pages/AIVideos";
import AIMotivation from "../pages/AIMotivation";

/* ASSESSMENT */
import AssessmentPage from "../pages/Assessment";

/* RESULT FLOW */
import ResultPage from "../pages/ResultPage";
import Profile from "../pages/Profile";

/* DASHBOARDS */
import StressDashboard from "../dashboards/StressDashboard";
import DepressionDashboard from "../dashboards/DepressionDashboard";
import NormalDashboard from "../dashboards/NormalDashboard";

function AppRoutes({ user, aiStatus }) {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/sos" element={<SOSPage />} />

      {/* DASHBOARD BASE (FIXED - NO DashboardPage) */}
      <Route path="/dashboard" element={<Navigate to="/dashboard/normal" />} />

      <Route
        path="/dashboard/stress"
        element={user ? <StressDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/dashboard/depression"
        element={user ? <DepressionDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/dashboard/normal"
        element={user ? <NormalDashboard /> : <Navigate to="/login" />}
      />

      {/* FEATURES */}
      <Route path="/features" element={user ? <FeaturesPage /> : <Navigate to="/login" />} />
      <Route path="/activities" element={user ? <ActivitiesPage /> : <Navigate to="/login" />} />

      {/* TOOLS */}
      <Route path="/whiteboard" element={user ? <Whiteboard /> : <Navigate to="/login" />} />
      <Route path="/gratitude" element={user ? <GratitudeActivity /> : <Navigate to="/login" />} />
      <Route path="/sleep" element={<SleepReminder />} />
      <Route path="/breathing" element={<BreathingExercise />} />
      <Route path="/meditation" element={user ? <Meditation /> : <Navigate to="/login" />} />
      <Route path="/pomodoro" element={user ? <PomodoroTimer /> : <Navigate to="/login" />} />

      {/* GAMES */}
      <Route path="/games" element={user ? <GamesPage /> : <Navigate to="/login" />} />
      <Route path="/games/breathing" element={user ? <BreathingGame /> : <Navigate to="/login" />} />
      <Route path="/games/stress-ball" element={user ? <StressBallGame /> : <Navigate to="/login" />} />
      <Route path="/games/bubble-wrap" element={user ? <BubbleWrapGame /> : <Navigate to="/login" />} />
      <Route path="/games/zen-color-tap" element={user ? <ZenColorTapGame /> : <Navigate to="/login" />} />
      <Route path="/games/zen-garden" element={user ? <ZenGardenGame /> : <Navigate to="/login" />} />
      <Route path="/games/cube" element={user ? <CubeGame /> : <Navigate to="/login" />} />

      {/* RELAX */}
      <Route path="/relaxing" element={user ? <RelaxingPage /> : <Navigate to="/login" />} />
      <Route path="/calm-music" element={user ? <CalmMusic /> : <Navigate to="/login" />} />
      <Route path="/ai-videos" element={user ? <AIVideos /> : <Navigate to="/login" />} />
      <Route path="/ai-motivation" element={user ? <AIMotivation /> : <Navigate to="/login" />} />
      <Route path="/songs" element={user ? <MoodSongsPage /> : <Navigate to="/login" />} />

      {/* CHAT */}
      <Route path="/chat" element={user ? <ChatPage aiStatus={aiStatus} /> : <Navigate to="/login" />} />

      {/* SUPPORT */}
      <Route path="/resources" element={user ? <ResourcesPage /> : <Navigate to="/login" />} />
      <Route path="/counsellor" element={user ? <CounsellorSupport /> : <Navigate to="/login" />} />
      <Route path="/self-help" element={user ? <SelfHelpSuggestions /> : <Navigate to="/login" />} />
      <Route path="/mental-health" element={user ? <MentalHealthSupport /> : <Navigate to="/login" />} />

      {/* ASSESSMENT */}
      <Route path="/assessment" element={user ? <AssessmentPage /> : <Navigate to="/login" />} />

      {/* RESULT */}
      <Route path="/result" element={user ? <ResultPage /> : <Navigate to="/login" />} />

      {/* PROFILE */}
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default AppRoutes;