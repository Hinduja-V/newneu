import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";

export default function FeaturesPage() {
  const navigate = useNavigate();

  const features = [
    { name: "Activities", path: "/activities" },
    { name: "Games", path: "/games" },
    { name: "Relaxing", path: "/relaxing" },
    { name: "AI Chat", path: "/chat" },
    { name: "Resources", path: "/resources" },
    { name: "Mood Songs", path: "/songs" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-200 to-orange-400 p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-white">
        Features
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f) => (
          <FeatureCard
            key={f.name}
            title={f.name}
            onClick={() => navigate(f.path)}
          />
        ))}
      </div>
    </div>
  );
}