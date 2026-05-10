import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SOSButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <motion.button
        onClick={() => navigate("/sos")}   // REDIRECT ONLY
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 bg-red-600 text-white px-6 py-4 rounded-full shadow-lg font-bold text-lg"
      >
        SOS
      </motion.button>

      <span className="fixed bottom-6 right-6 w-20 h-20 bg-red-500 rounded-full animate-ping opacity-30 z-40"></span>
    </>
  );
};

export default SOSButton;