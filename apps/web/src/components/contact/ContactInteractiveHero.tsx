'use client';

import React, { useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';
import { Phone, MapPin, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { CONTACT_INFO, getWhatsAppUrl } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

export function ContactInteractiveHero() {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(200);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 25 });
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${smoothX}px ${smoothY}px, rgba(188, 108, 37, 0.16), rgba(96, 108, 56, 0.08) 45%, transparent 75%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY, prefersReducedMotion]
  );

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-[#0D1508] text-white pt-12 sm:pt-16 pb-16 sm:pb-20 border-b border-white/10"
    >
      <div className="absolute inset-0 bg-tech-grid-dark opacity-90 pointer-events-none" />
      <motion.div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ background: spotlight }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/15"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-white/90 font-semibold">
              Équipe Technique Disponible · Réponse &lt; 2h Ouvrées
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-heading leading-tight"
          >
            Parlons concrètement de{' '}
            <span className="bg-gradient-to-r from-[#FEFAE0] via-ocre-vif to-[#f3a65a] bg-clip-text text-transparent">
              votre projet
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="text-base sm:text-lg text-white/75 leading-relaxed font-body"
          >
            Sélectionnez votre besoin dans le simulateur ci-dessous ou contactez-nous en direct. Un ingénieur vous répond personnellement depuis Dakar.
          </motion.p>
        </div>

        {/* 3 Cartes de contact direct animées */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <motion.a
            href={`tel:${CONTACT_INFO.phoneRaw}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="rounded-2xl bg-[#131D0C]/90 hover:bg-[#192610] border border-white/15 p-6 flex items-start gap-4 transition-all hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 text-ocre-vif flex items-center justify-center shrink-0 group-hover:bg-ocre group-hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-white/55">
                Ligne Directe Dakar
              </p>
              <p className="text-base font-bold text-white mt-0.5 group-hover:text-ocre-vif transition-colors">
                {CONTACT_INFO.phone}
              </p>
              <p className="text-xs text-olive-vif mt-1">Lun – Sam aux heures ouvrées</p>
            </div>
          </motion.a>

          <motion.a
            href={getWhatsAppUrl('Bonjour Majeli Connect, je souhaite échanger directement sur mon projet.')}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="rounded-2xl bg-[#131D0C]/90 hover:bg-[#192610] border border-[#25D366]/35 p-6 flex items-start gap-4 transition-all hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
              <WhatsAppIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-white/55">
                WhatsApp Business
              </p>
              <p className="text-base font-bold text-white mt-0.5 group-hover:text-[#25D366] transition-colors">
                +221 78 264 34 38
              </p>
              <p className="text-xs text-ocre-vif font-semibold mt-1">
                Canal le plus rapide (&lt; 2h)
              </p>
            </div>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="rounded-2xl bg-[#131D0C]/90 border border-white/15 p-6 flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 text-olive-vif flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-white/55">
                Siège Opérationnel
              </p>
              <p className="text-base font-bold text-white mt-0.5">{CONTACT_INFO.address}</p>
              <p className="text-xs text-white/65 mt-1">
                {CONTACT_INFO.city}, {CONTACT_INFO.country}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactInteractiveHero;
