import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO, getWhatsAppUrl } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F170A] text-white/90 pt-16 pb-12 border-t border-white/10" aria-label="Pied de page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Colonne 1: Marque & Mission */}
          <div className="space-y-4">
            <div className="relative h-10 w-48">
              <Image
                src="/assets/logo-majeli-white.png"
                alt="Majeli Connect"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Agence d'ingénierie digitale et d'IA appliquée basée à Dakar. Nous accompagnons les entreprises, institutions et porteurs de projets dans la création de solutions logicielles sur-mesure, fiables et orientées résultats.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/65 pt-2">
              <span className="w-2 h-2 rounded-full bg-ocre-vif animate-pulse" />
              <span>Engagement : réponse sous 2h ouvrées</span>
            </div>
          </div>

          {/* Colonne 2: Solutions & Tarifs Clés */}
          <div>
            <h3 className="text-base font-bold text-[#FEFAE0] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-ocre rounded-full" />
              <span>Services & Tarifs</span>
            </h3>
            <ul className="space-y-2.5 text-sm text-[#FEFAE0]/85">
              <li>
                <Link
                  href="/services#site-vitrine"
                  className="hover:text-ocre transition-colors flex items-center justify-between group"
                >
                  <span>Site Vitrine Pro</span>
                  <span className="text-xs text-ocre font-medium">450 000 FCFA</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services#plateforme-mvp"
                  className="hover:text-ocre transition-colors flex items-center justify-between group"
                >
                  <span>Plateforme Web MVP</span>
                  <span className="text-xs text-ocre font-medium">Dès 800 000 FCFA</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services#application-mobile"
                  className="hover:text-ocre transition-colors flex items-center justify-between group"
                >
                  <span>Application Mobile</span>
                  <span className="text-xs text-ocre font-medium">Dès 1 100 000 FCFA</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services#assistant-ia"
                  className="hover:text-ocre transition-colors flex items-center justify-between group"
                >
                  <span>Assistant IA WhatsApp</span>
                  <span className="text-xs text-ocre font-medium">Dès 500 000 FCFA</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services#community-management"
                  className="hover:text-ocre transition-colors flex items-center justify-between group"
                >
                  <span>Community Management</span>
                  <span className="text-xs text-ocre font-medium">200 000 F/mois</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services#sur-devis"
                  className="hover:text-ocre transition-colors flex items-center justify-between group"
                >
                  <span>Maintenance PC & Réseaux</span>
                  <span className="text-xs text-[#FEFAE0]/60">Sur devis</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3: Réalisations & Formations */}
          <div>
            <h3 className="text-base font-bold text-[#FEFAE0] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-ocre rounded-full" />
              <span>Navigation Directe</span>
            </h3>
            <ul className="space-y-2.5 text-sm text-[#FEFAE0]/85">
              <li>
                <Link href="/realisations" className="hover:text-ocre-vif transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-ocre-vif" />
                  <span>Réalisations (AMPA, AMEG, Teranga Box...)</span>
                </Link>
              </li>
              <li>
                <Link href="/formations" className="hover:text-ocre transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-ocre" />
                  <span>Ateliers IA & Robotique Jeunes</span>
                </Link>
              </li>
              <li>
                <Link href="/agence" className="hover:text-ocre transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-ocre" />
                  <span>Notre Équipe & Méthode de Travail</span>
                </Link>
              </li>
              <li>
                <Link href="/contact?type=devis" className="hover:text-ocre transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-ocre" />
                  <span>Demande de Devis Détaillé</span>
                </Link>
              </li>
              <li>
                <Link href="/contact?type=intervention" className="hover:text-ocre transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-ocre" />
                  <span>Intervention Maintenance Express</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4: Contact & Bureau Dakar */}
          <div>
            <h3 className="text-base font-bold text-[#FEFAE0] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-ocre rounded-full" />
              <span>Contact Dakar</span>
            </h3>
            {/* <address> : coordonnées lisibles par les moteurs et les agents IA */}
            <address className="not-italic">
            <ul className="space-y-3 text-sm text-[#FEFAE0]/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-ocre shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.address}, {CONTACT_INFO.city}, {CONTACT_INFO.country}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-ocre shrink-0" />
                <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="hover:text-ocre transition-colors font-medium">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-ocre shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-ocre transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-ocre shrink-0 mt-0.5" />
                <span className="text-xs text-[#FEFAE0]/75">{CONTACT_INFO.operatingHours}</span>
              </li>
            </ul>
            </address>

            <div className="mt-5">
              <a
                href={getWhatsAppUrl("Bonjour Majeli Connect, je souhaite échanger directement avec vous.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba59] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Échanger sur WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Barre inférieure */}
        <div className="pt-8 border-t border-olive/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FEFAE0]/70">
          <p>© {currentYear} {CONTACT_INFO.name}. Tous droits réservés.</p>
          <nav aria-label="Informations légales" className="flex items-center gap-4">
            <Link href="/agence" className="hover:text-ocre transition-colors">À propos</Link>
            <Link href="/contact" className="hover:text-ocre transition-colors">Contact</Link>
            <Link href="/mentions-legales" className="hover:text-ocre transition-colors">Mentions légales</Link>
          </nav>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#FEFAE0]/80">
              <ShieldCheck className="w-4 h-4 text-ocre" />
              <span>Code source propriétaire</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
