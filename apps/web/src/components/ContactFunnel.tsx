'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Send, Loader2 } from 'lucide-react';
import { getWhatsAppUrl, CONTACT_INFO } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { ALL_PRICING_PLANS } from '@/lib/services-data';

type FunnelType = 'projet' | 'intervention' | 'formation';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  funnelType: FunnelType;
  selectedPlan: string;
  selectedService: string;
  budgetRange: string;
  urgency: string;
  equipmentCount: string;
  message: string;
  /** Champ piège anti-robots : doit rester vide */
  website: string;
}

export function ContactFunnel() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get('type') as FunnelType) || 'projet';
  const initialPlan = searchParams.get('plan') || '';

  const [activeTab, setActiveTab] = useState<FunnelType>(
    ['projet', 'intervention', 'formation'].includes(initialType) ? initialType : 'projet'
  );

  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    funnelType: activeTab,
    selectedPlan: initialPlan,
    selectedService: 'developpement-web-mobile',
    budgetRange: '450k-800k',
    urgency: 'normale',
    equipmentCount: '1-5',
    message: '',
    website: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setForm((prev) => ({ ...prev, funnelType: activeTab }));
  }, [activeTab]);

  useEffect(() => {
    if (initialPlan) {
      setForm((prev) => ({ ...prev, selectedPlan: initialPlan }));
    }
  }, [initialPlan]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const payload = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        throw new Error(
          payload.error ||
            "Votre demande n'a pas pu être envoyée. Réessayez dans un instant ou écrivez-nous sur WhatsApp."
        );
      }

      setSubmitSuccess(true);
    } catch (err: unknown) {
      // L'écran de succès n'est affiché QUE si le serveur a réellement enregistré la demande.
      setErrorMessage(
        // fetch() lève une TypeError quand le réseau est coupé
        err instanceof Error && !(err instanceof TypeError)
          ? err.message
          : "Connexion impossible avec notre serveur. Vérifiez votre connexion ou écrivez-nous sur WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    const waText = `Bonjour Majeli Connect, je viens de remplir le formulaire sur votre site :
Nom : ${form.fullName}
Type : ${form.funnelType}
Message : ${form.message || 'Demande de devis'}`;

    return (
      <div className="bg-white rounded-2xl p-8 sm:p-12 border border-olive/20 shadow-xl text-center max-w-xl mx-auto animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-olive/15 text-olive flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-olive" />
        </div>
        <h3 className="text-2xl font-bold text-vert-fonce mb-3">Demande bien reçue !</h3>
        <p className="text-sm text-vert-fonce/80 mb-6 leading-relaxed">
          Merci {form.fullName}. Notre équipe commerciale basée à Dakar examine votre cahier des charges. Nous vous répondrons par email ou téléphone sous <strong>2 heures ouvrées</strong>.
        </p>

        <div className="p-4 rounded-xl bg-[#EFF2EC] border border-vert-fonce/10 mb-8 text-left text-xs text-vert-fonce/85 space-y-1">
          <p><strong>Récapitulatif :</strong> {form.email} • {form.phone}</p>
          <p><strong>Type de demande :</strong> {form.funnelType.toUpperCase()}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getWhatsAppUrl(waText)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-colors shadow-md"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Accélérer par WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setSubmitSuccess(false);
              setForm({
                fullName: '',
                email: '',
                phone: '',
                company: '',
                funnelType: activeTab,
                selectedPlan: '',
                selectedService: 'developpement-web-mobile',
                budgetRange: '450k-800k',
                urgency: 'normale',
                equipmentCount: '1-5',
                message: '',
                website: '',
              });
            }}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-olive/10 text-vert-fonce font-semibold text-sm hover:bg-olive/20 transition-colors"
          >
            Envoyer une autre demande
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-vert-fonce/10 shadow-[0_20px_60px_-15px_rgba(15,23,10,0.08)] overflow-hidden max-w-3xl mx-auto">
      {/* Sélecteur de parcours animé */}
      <div className="grid grid-cols-3 bg-[#EFF2EC]/90 border-b border-vert-fonce/10 p-1.5 sm:p-2 gap-1 sm:gap-2">
        {(
          [
            { id: 'projet', label: '1. Projet Web, Mobile & IA' },
            { id: 'intervention', label: '2. Maintenance PC & Réseaux' },
            { id: 'formation', label: '3. Formations Pratiques' },
          ] as { id: FunnelType; label: string }[]
        ).map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-colors text-center ${
                isActive ? 'text-white' : 'text-vert-fonce/75 hover:text-vert-fonce'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="contactFunnelPill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 rounded-xl bg-vert-fonce shadow-sm"
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
        {/* Champ piège anti-spam : invisible pour les visiteurs, ignoré par les lecteurs d'écran */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
          <label htmlFor="website">Ne pas remplir ce champ</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={handleChange}
          />
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="p-4 rounded-xl bg-ocre/10 border border-ocre/30 text-vert-fonce text-xs flex items-start gap-2.5"
          >
            <AlertCircle className="w-4 h-4 text-ocre shrink-0 mt-0.5" />
            <div className="space-y-2">
              <span className="block">{errorMessage}</span>
              <a
                href={getWhatsAppUrl(
                  `Bonjour Majeli Connect, je n'ai pas pu envoyer le formulaire du site.\nNom : ${form.fullName}\nType : ${form.funnelType}\nMessage : ${form.message}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366] text-white font-bold hover:bg-[#20ba59] transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>Envoyer ma demande sur WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* Champs d'identité communs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-vert-fonce mb-1.5">
              Nom complet <span className="text-ocre">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={form.fullName}
              onChange={handleChange}
              placeholder="Ex: Cheikh Diop"
              className="w-full px-4 py-3 rounded-xl border border-olive/25 bg-[#F8F9F6] text-vert-fonce text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocre transition-all"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-xs font-bold uppercase tracking-wider text-vert-fonce mb-1.5">
              Entreprise ou Projet
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={form.company}
              onChange={handleChange}
              placeholder="Ex: Diop & Associés SARL"
              className="w-full px-4 py-3 rounded-xl border border-olive/25 bg-[#F8F9F6] text-vert-fonce text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocre transition-all"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-vert-fonce mb-1.5">
              Adresse email professionnelle <span className="text-ocre">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="cheikh@entreprise.sn"
              className="w-full px-4 py-3 rounded-xl border border-olive/25 bg-[#F8F9F6] text-vert-fonce text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocre transition-all"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-vert-fonce mb-1.5">
              Téléphone / WhatsApp <span className="text-ocre">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="+221 77 000 00 00"
              className="w-full px-4 py-3 rounded-xl border border-olive/25 bg-[#F8F9F6] text-vert-fonce text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocre transition-all"
            />
          </div>
        </div>

        {/* Spécifique Parcours 1: Projet & Devis Web / IA */}
        {activeTab === 'projet' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-olive/15">
            <div>
              <label htmlFor="selectedPlan" className="block text-xs font-bold uppercase tracking-wider text-vert-fonce mb-1.5">
                Forfait ou service ciblé
              </label>
              <select
                id="selectedPlan"
                name="selectedPlan"
                value={form.selectedPlan}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-olive/25 bg-[#F8F9F6] text-vert-fonce text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocre transition-all"
              >
                <option value="">Sélectionner une option...</option>
                <option value="site-vitrine">Site Vitrine Pro (450 000 FCFA)</option>
                <option value="plateforme-mvp">Plateforme Web MVP (Dès 800 000 FCFA)</option>
                <option value="application-mobile">Application Mobile (Dès 1 100 000 FCFA)</option>
                <option value="assistant-ia">Assistant IA WhatsApp (Dès 500 000 FCFA)</option>
                <option value="identite-visuelle">Identité Visuelle Pro (350 000 FCFA)</option>
                <option value="community-management">Community Management (200 000 FCFA/mois)</option>
                <option value="sur-mesure">Autre développement sur-mesure</option>
              </select>
            </div>

            <div>
              <label htmlFor="budgetRange" className="block text-xs font-bold uppercase tracking-wider text-vert-fonce mb-1.5">
                Fourchette budgétaire estimée
              </label>
              <select
                id="budgetRange"
                name="budgetRange"
                value={form.budgetRange}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-olive/25 bg-[#F8F9F6] text-vert-fonce text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocre transition-all"
              >
                <option value="350k-500k">350 000 à 500 000 FCFA</option>
                <option value="500k-1M">500 000 à 1 000 000 FCFA</option>
                <option value="1M-2M">1 000 000 à 2 000 000 FCFA</option>
                <option value="plus-2M">Plus de 2 000 000 FCFA</option>
                <option value="non-defini">À définir ensemble</option>
              </select>
            </div>
          </div>
        )}

        {/* Spécifique Parcours 2: Maintenance Informatique & Réseaux */}
        {activeTab === 'intervention' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-olive/15">
            <div>
              <label htmlFor="equipmentCount" className="block text-xs font-bold uppercase tracking-wider text-vert-fonce mb-1.5">
                Nombre de postes concernés
              </label>
              <select
                id="equipmentCount"
                name="equipmentCount"
                value={form.equipmentCount}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-olive/25 bg-[#F8F9F6] text-vert-fonce text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocre transition-all"
              >
                <option value="1-3">1 à 3 ordinateurs</option>
                <option value="4-10">4 à 10 ordinateurs</option>
                <option value="11-30">11 à 30 ordinateurs</option>
                <option value="30+">Plus de 30 ordinateurs / Parc complet</option>
                <option value="reseau">Problème réseau / Wi-Fi d'entreprise</option>
              </select>
            </div>

            <div>
              <label htmlFor="urgency" className="block text-xs font-bold uppercase tracking-wider text-vert-fonce mb-1.5">
                Niveau d'urgence
              </label>
              <select
                id="urgency"
                name="urgency"
                value={form.urgency}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-olive/25 bg-[#F8F9F6] text-vert-fonce text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocre transition-all"
              >
                <option value="normale">Diagnostic planifié cette semaine</option>
                <option value="urgente">Urgent (blocage opérationnel &lt; 24h)</option>
                <option value="contrat">Demande de contrat de maintenance annuel</option>
              </select>
            </div>
          </div>
        )}

        {/* Spécifique Parcours 3: Formations */}
        {activeTab === 'formation' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-olive/15">
            <div>
              <label htmlFor="selectedService" className="block text-xs font-bold uppercase tracking-wider text-vert-fonce mb-1.5">
                Thématique de formation
              </label>
              <select
                id="selectedService"
                name="selectedService"
                value={form.selectedService}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-olive/25 bg-[#F8F9F6] text-vert-fonce text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocre transition-all"
              >
                <option value="ia-entreprise">Intelligence Artificielle en Entreprise</option>
                <option value="robotique-jeunes">Initiation Robotique & Codage (Jeunes 8-18 ans)</option>
                <option value="bureautique-pro">Bureautique Avancée & Outils Collaboratifs</option>
                <option value="sur-mesure-equipe">Programme sur-mesure intra-entreprise</option>
              </select>
            </div>

            <div>
              <label htmlFor="equipmentCount" className="block text-xs font-bold uppercase tracking-wider text-vert-fonce mb-1.5">
                Effectif prévisionnel
              </label>
              <select
                id="equipmentCount"
                name="equipmentCount"
                value={form.equipmentCount}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-olive/25 bg-[#F8F9F6] text-vert-fonce text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocre transition-all"
              >
                <option value="1">1 participant (Individuel)</option>
                <option value="2-5">2 à 5 collaborateurs</option>
                <option value="6-15">6 à 15 collaborateurs (Équipe complète)</option>
                <option value="classe">Classe scolaire ou groupe d'étudiants</option>
              </select>
            </div>
          </div>
        )}

        {/* Message / Description du besoin */}
        <div>
          <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-vert-fonce mb-1.5">
            Description de votre besoin ou cahier des charges <span className="text-ocre">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={form.message}
            onChange={handleChange}
            placeholder="Détaillez votre projet, vos objectifs, les fonctionnalités souhaitées ou la nature de votre panne..."
            className="w-full px-4 py-3 rounded-xl border border-olive/25 bg-[#F8F9F6] text-vert-fonce text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocre transition-all"
          />
        </div>

        {/* Bouton de soumission */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-olive font-medium">
            🔒 Vos informations restent strictement confidentielles. Réponse sous 2h ouvrées.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-vert-fonce text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#1A2612] transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-ocre" />
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <span>Transmettre ma demande</span>
                <Send className="w-4 h-4 text-ocre" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
export default ContactFunnel;
