'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import { CONTACT_INFO, getWhatsAppUrl } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services & Tarifs' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/formations', label: 'Formations' },
  { href: '/agence', label: "L'Agence" },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-sm border-b border-vert-fonce/10 py-3'
          : 'bg-white/90 backdrop-blur-md border-b border-vert-fonce/[0.06] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo officiel intact */}
          <Link
            href="/"
            className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-ocre rounded-lg p-1"
            aria-label="Majeli Connect - Retour à l'accueil"
          >
            <div className="relative h-10 w-44 sm:h-11 sm:w-48">
              <Image
                src="/assets/logo-majeli.png"
                alt="Majeli Connect"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Navigation Bureau */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-vert-fonce font-bold bg-olive/10'
                      : 'text-vert-fonce/85 hover:text-vert-fonce hover:bg-olive/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Liens rapides Bureau */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 text-xs text-vert-fonce font-semibold hover:text-ocre transition-colors px-2 py-1.5"
              title="Nous appeler directement"
            >
              <Phone className="w-3.5 h-3.5 text-olive" />
              <span>{CONTACT_INFO.phone}</span>
            </a>

            <Link
              href="/contact?type=projet"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-vert-fonce text-white text-sm font-semibold hover:bg-[#1A2612] transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ocre group"
            >
              <span>Demander un devis</span>
              <ArrowRight className="w-4 h-4 text-ocre-vif group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Bouton Hamburger Mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={getWhatsAppUrl("Bonjour, je souhaite échanger avec Majeli Connect.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contacter sur WhatsApp"
              className="p-2 text-[#25D366] hover:text-[#1da851]"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-vert-fonce hover:bg-olive/10 focus:outline-none focus:ring-2 focus:ring-ocre"
              aria-expanded={mobileMenuOpen}
              aria-label="Ouvrir le menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Tiroir Mobile */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-x-0 top-[65px] bg-white border-b border-vert-fonce/10 shadow-xl px-4 pt-3 pb-6 animate-fade-in max-h-[calc(100vh-70px)] overflow-y-auto"
          aria-label="Menu mobile"
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
                    isActive
                      ? 'bg-[#EFF2EC] text-vert-fonce font-bold'
                      : 'text-vert-fonce hover:bg-[#F8F9F6]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-ocre" />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-vert-fonce/10 flex flex-col gap-3">
            <Link
              href="/contact?type=projet"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-vert-fonce text-white font-semibold text-center hover:bg-olive transition-colors"
            >
              <span>Demander un devis gratuit</span>
              <ArrowRight className="w-4 h-4 text-ocre" />
            </Link>

            <div className="flex items-center justify-around pt-2 text-xs text-vert-fonce/80">
              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="flex items-center gap-1.5 hover:text-vert-fonce font-semibold py-2"
              >
                <Phone className="w-4 h-4 text-olive" />
                <span>{CONTACT_INFO.phone}</span>
              </a>
              <span className="text-olive/40">•</span>
              <span className="text-olive">{CONTACT_INFO.city}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
export default Header;
