import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-gray-200 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            MindCare AI
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Your personal mental wellness companion for stress-free and mindful living.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer transition">Home</li>
            <li className="hover:text-white cursor-pointer transition">Explore</li>
            <li className="hover:text-white cursor-pointer transition">About</li>
            <li className="hover:text-white cursor-pointer transition">Dashboard</li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-white font-semibold mb-3">Features</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer transition">AI Chat</li>
            <li className="hover:text-white cursor-pointer transition">Relaxation</li>
            <li className="hover:text-white cursor-pointer transition">Music Therapy</li>
            <li className="hover:text-white cursor-pointer transition">Activities</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p className="text-sm">support@mindcareai.com</p>
          <p className="text-sm mb-3">+91 98765 43210</p>

          <div className="flex gap-4 text-xl mt-3">
            <FaFacebook className="hover:text-white cursor-pointer transition" />
            <FaTwitter className="hover:text-white cursor-pointer transition" />
            <FaInstagram className="hover:text-white cursor-pointer transition" />
            <FaLinkedin className="hover:text-white cursor-pointer transition" />
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 text-center text-sm py-4 text-gray-300">
        © 2026 MindCare AI | All Rights Reserved
      </div>

    </footer>
  );
}