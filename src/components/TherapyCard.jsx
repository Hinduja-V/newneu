import React from "react";
import { motion } from "framer-motion";

const TherapyCard = ({ title, desc, IconComponent }) => (
  <motion.div 
    whileHover={{ y: -8, scale: 1.01 }}
    className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center group h-full"
  >
    <div className="w-24 h-24 mb-8 bg-blue-50 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:bg-blue-100/70 shadow-inner group-hover:scale-105">
      {IconComponent}
    </div>

    <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-4 tracking-tight">
      {title}
    </h3>

    <p className="text-gray-500 text-sm leading-relaxed mb-6">
      {desc}
    </p>

    <div className="h-1.5 w-16 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full mt-auto transition-all duration-300 group-hover:w-20 group-hover:from-blue-500 group-hover:to-cyan-400"></div>
  </motion.div>
);

export default TherapyCard;