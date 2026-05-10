import { useNavigate } from "react-router-dom";

export default function NavigationButtons() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-400 text-white px-6 py-2 rounded-xl"
      >
        Back
      </button>

      <button className="bg-green-500 text-white px-6 py-2 rounded-xl">
        Next
      </button>
      
    </div>
  );
}