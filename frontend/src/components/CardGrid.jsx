import features from "../data/features";
import FeatureCard from "./FeatureCard";

const FeatureGrid = () => {
  return (
    <section className="py-12 bg-orange-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10">
        Features
      </h1>

      <div className="grid gap-6 px-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;