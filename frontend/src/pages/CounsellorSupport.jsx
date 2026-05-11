import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CounsellorSupport() {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [location, setLocation] = useState(null);

  const counsellors = {
    Chennai: [
      { name: "Mind & Brain Clinic", phone: "9876543210" },
      { name: "SCARF Mental Health Centre", phone: "9123456780" },
    ],
    Coimbatore: [
      { name: "Mind Care Psychology Centre", phone: "9988776655" },
      { name: "Ramakrishna Mental Wellness", phone: "9112233445" },
    ],
    Madurai: [
      { name: "Aravind Mental Health Unit", phone: "9001122334" },
    ],
    Salem: [
      { name: "Salem Mind Care Clinic", phone: "9123400011" },
    ],
    "Tiruchirappalli (Trichy)": [
      { name: "Trichy Mental Wellness Centre", phone: "9345601122" },
    ],
    Vellore: [
      { name: "CMC Psychiatry Department", phone: "9443300112" },
    ],
    Hosur: [
      { name: "Hosur Psychological Care", phone: "9080706050" },
    ],
    Erode: [
      { name: "RANM Mind Care", phone: "8122586208" },
      { name: "Gratia Counselling Centre", phone: "8015288123" },
    ],
    Tirunelveli: [
      { name: "Tirunelveli Mental Health Clinic", phone: "9003344556" },
    ],
    Dindigul: [
      { name: "Dindigul Wellness Centre", phone: "9090909090" },
    ],
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef6ff] via-white to-[#f6fbff] px-4 py-8">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800">
          🧠 Counsellor Support System
        </h1>
        <p className="text-slate-500 mt-2">
          Find trusted mental health professionals across Tamil Nadu
        </p>
      </div>

      {/* TOP ACTIONS CARD */}
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-xl border shadow-lg rounded-3xl p-6">

        {/* LOCATION BUTTON */}
        <div className="flex justify-center mb-5">
          <button
            onClick={getLocation}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-2xl shadow-md transition"
          >
            📍 Use My Current Location
          </button>
        </div>

        {/* CITY SELECT */}
        <div className="flex justify-center">
          <select
            className="w-full md:w-96 p-3 rounded-2xl border border-slate-200 shadow-sm outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Select City</option>
            {Object.keys(counsellors).map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>
        </div>

        {/* LOCATION INFO */}
        {location && (
          <div className="text-center text-xs text-slate-500 mt-4">
            📍 Lat: {location.lat.toFixed(2)} | Lng: {location.lng.toFixed(2)}
          </div>
        )}
      </div>

      {/* COUNSELLOR RESULTS */}
      {city && (
        <div className="max-w-6xl mx-auto mt-10">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Counsellors in {city}
            </h2>

            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
              {counsellors[city]?.length} Available
            </span>
          </div>

          {/* CARDS GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {counsellors[city]?.map((c, i) => (
              <div
                key={i}
                className="bg-white shadow-lg rounded-3xl p-6 border hover:shadow-2xl transition"
              >

                {/* NAME */}
                <h3 className="text-lg font-bold text-slate-800">
                  {c.name}
                </h3>

                {/* SUBTEXT */}
                <p className="text-slate-500 text-sm mt-1">
                  Mental Health Support Centre
                </p>

                {/* BUTTONS */}
                <div className="flex gap-3 mt-5">

                  <a
                    href={`tel:${c.phone}`}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white text-center py-2 rounded-xl transition"
                  >
                    📞 Call
                  </a>

                  <a
                    href={`https://www.google.com/maps/search/${c.name}`}
                    target="_blank"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-xl transition"
                  >
                    🗺️ Map
                  </a>

                </div>

                {/* CHAT BUTTON */}
                <button className="w-full mt-3 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-xl transition">
                  💬 Chat Support
                </button>

              </div>
            ))}

          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!city && (
        <div className="text-center text-slate-400 mt-10">
          Select a city to view counsellors 🌿
        </div>
      )}

      {/* TIP SECTION */}
      <div className="max-w-md mx-auto text-center mt-12 text-sm text-slate-500">
        🧠 Tip: Deep breathing can reduce anxiety before contacting a counsellor.
      </div>

      {/* NAVIGATION */}
      <div className="flex justify-center gap-4 mt-10">

        <button
          onClick={() => navigate("/resources")}
          className="px-6 py-3 bg-slate-200 hover:bg-slate-300 rounded-xl transition"
        >
          ← Back
        </button>

        <button
          onClick={() => navigate("/sos")}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg hover:scale-105 transition"
        >
          Next →
        </button>

      </div>

    </div>
  );
}