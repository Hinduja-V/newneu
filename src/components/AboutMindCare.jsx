import React from "react";
import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.18,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const AboutMindCare = () => {
  const fullText = "MindCare AI";
  const [typedText, setTypedText] = React.useState("");

  React.useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 110);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative py-24 px-6 bg-white overflow-hidden group">

      {/* hover glow (activates when cursor enters section) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-blue-50 via-white to-cyan-50"></div>

      {/* Soft background blur */}
      <div className="absolute top-[-80px] left-[-80px] w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-80 h-80 bg-cyan-100 rounded-full blur-3xl opacity-40"></div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center transition-all duration-500 group-hover:scale-[1.01]">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >

          {/* TITLE */}
          <h2 className="text-5xl md:text-6xl font-bold text-slate-800 transition group-hover:text-blue-600">
            {typedText}
            <span className="text-blue-500 animate-pulse">|</span>
          </h2>

          {/* Paragraphs */}
          <motion.p
            custom={1}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-gray-600 leading-relaxed text-lg transition group-hover:text-gray-700"
          >
            MindCare AI is an intelligent mental wellness platform designed to support students and individuals in managing stress, improving focus, and building a healthier lifestyle.
          </motion.p>

          <motion.p
            custom={2}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-gray-600 leading-relaxed text-lg transition group-hover:text-gray-700"
          >
            It uses AI-driven insights and daily check-ins to understand your emotional state and adapt your experience in real time.
          </motion.p>

          <motion.p
            custom={3}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-gray-600 leading-relaxed text-lg transition group-hover:text-gray-700"
          >
            When you're calm, it enhances productivity. When stress increases, it simplifies your interface and promotes relaxation techniques.
          </motion.p>

          <motion.p
            custom={4}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-gray-600 leading-relaxed text-lg transition group-hover:text-gray-700"
          >
            With therapy tools, calming music, AI guidance, and activities, MindCare AI becomes your personal mental wellness companion.
          </motion.p>

        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="relative group/img">

            {/* glow effect */}
            <div className="absolute -inset-6 bg-gradient-to-r from-blue-200 to-cyan-200 blur-3xl opacity-40 group-hover/img:opacity-70 transition"></div>

            <img
              src="https://i.pinimg.com/1200x/8d/f7/3a/8df73aecad13dd948f872297435d7d52.jpg"
              alt="MindCare AI"
              className="relative rounded-3xl w-full max-w-md h-[440px] object-cover shadow-2xl transition duration-500 group-hover/img:scale-105"
            />

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AboutMindCare;