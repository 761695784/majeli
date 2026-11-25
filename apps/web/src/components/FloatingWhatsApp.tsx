'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { getWhatsAppUrl } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

export function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  // Personnalisation du message pré-rempli selon la page visitée
  let prefill = 'Bonjour Majeli Connect, je souhaite échanger sur vos services.';
  if (pathname.includes('/services')) {
    prefill = "Bonjour Majeli Connect, j'ai vu vos offres et tarifs sur votre site et je souhaite des détails.";
  } else if (pathname.includes('/realisations')) {
    prefill = "Bonjour Majeli Connect, j'ai vu vos réalisations et j'aimerais réaliser un projet similaire.";
  } else if (pathname.includes('/formations')) {
    prefill = 'Bonjour Majeli Connect, je souhaite des informations sur vos sessions de formation.';
  } else if (pathname.includes('/contact')) {
    prefill = 'Bonjour Majeli Connect, je vous contacte pour un projet en direct.';
  }

  const whatsappHref = getWhatsAppUrl(prefill);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip discret au survol ou focus */}
      <span
        className={`hidden sm:inline-block px-3.5 py-2 rounded-xl bg-[#0F170A] text-white text-xs font-semibold shadow-xl transition-all duration-200 pointer-events-none border border-white/15 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
        aria-hidden="true"
      >
        Discuter sur WhatsApp (réponse &lt; 2h)
      </span>

      {/* Bouton WhatsApp officiel avec cible tactile de 56px */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-[0_10px_28px_rgba(37,211,102,0.45)] hover:shadow-[0_14px_34px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Contacter Majeli Connect directement sur WhatsApp"
        title="Ouvrir WhatsApp (+221 78 264 34 38)"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>
    </div>
  );
}
export default FloatingWhatsApp;
