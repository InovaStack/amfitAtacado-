"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { getWhatsAppLink } from "@/config/store";
import { useAdmin } from "@/context/AdminContext";

export const FloatingWhatsApp: React.FC = () => {
  const { storeConfig } = useAdmin();
  const [showTooltip, setShowTooltip] = useState(true);

  if (storeConfig.channelsStatus?.whatsappActive === false) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Mini popup tooltip */}
      {showTooltip && (
        <div className="bg-white text-am-black px-4 py-2.5 rounded-2xl shadow-xl border border-am-gray-200 text-xs font-medium max-w-xs animate-bounce relative flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>
            Olá! Dúvidas sobre <strong>Atacado ou Varejo</strong>? Fale conosco!
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-zinc-400 hover:text-zinc-700 ml-1"
            aria-label="Fechar mensagem"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={getWhatsAppLink("Olá! Gostaria de tirar dúvidas sobre as peças da AM FIT.", storeConfig.contact.whatsappNumber)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 group relative"
        aria-label="Conversar no WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
        </span>
        <MessageCircle size={30} className="fill-white" />
      </a>
    </div>
  );
};
