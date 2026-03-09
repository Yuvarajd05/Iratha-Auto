"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloating() {
  return (
    <a
      href="https://wa.me/917500408090"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50
      flex items-center justify-center
      w-14 h-14 rounded-full
      bg-black border border-[#C6A75E]/40
      text-[#C6A75E]
      shadow-[0_0_15px_rgba(198,167,94,0.35)]
      hover:bg-[#C6A75E]/10
      hover:scale-110
      transition-all duration-300"
    >
      <FaWhatsapp size={26} />
    </a>
  );
}