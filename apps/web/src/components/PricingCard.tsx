import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Clock } from 'lucide-react';
import { PricingPlan } from '@/lib/services-data';
import { getWhatsAppUrl } from '@/lib/contact';

interface PricingCardProps {
  plan: PricingPlan;
  featuredOverride?: boolean;
}

export function PricingCard({ plan, featuredOverride }: PricingCardProps) {
  const isHighlighted = featuredOverride !== undefined ? featuredOverride : plan.highlighted;

  return (
    <div
      className={`rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${
        isHighlighted
          ? 'bg-[#0F170A] text-white border border-ocre/50 shadow-[0_24px_60px_-12px_rgba(15,23,10,0.35)] lg:-translate-y-3'
          : 'bg-white border border-vert-fonce/10 shadow-[0_8px_30px_rgba(15,23,10,0.04)] hover:shadow-[0_20px_40px_rgba(15,23,10,0.09)] hover:-translate-y-1'
      }`}
    >
      {/* Badge promotionnel ou recommandé */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-6">
          <span
            className={`px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
              isHighlighted
                ? 'bg-ocre text-white shadow-md shadow-ocre/30'
                : 'bg-[#EFF2EC] text-vert-fonce border border-vert-fonce/10'
            }`}
          >
            {plan.badge}
          </span>
        </div>
      )}

      <div className="p-6 sm:p-8">
        <h3
          className={`text-xl font-bold mb-2 ${
            isHighlighted ? 'text-white' : 'text-vert-fonce'
          }`}
        >
          {plan.name}
        </h3>
        <p
          className={`text-sm min-h-[40px] mb-6 leading-relaxed ${
            isHighlighted ? 'text-white/75' : 'text-vert-fonce/70'
          }`}
        >
          {plan.description}
        </p>

        {/* Prix */}
        <div
          className={`mb-5 pb-5 border-b ${
            isHighlighted ? 'border-white/10' : 'border-vert-fonce/10'
          }`}
        >
          <div className="flex items-baseline gap-1">
            <span
              className={`text-2xl sm:text-3xl font-extrabold font-heading tracking-tight ${
                isHighlighted ? 'text-white' : 'text-vert-fonce'
              }`}
            >
              {plan.priceDisplay}
            </span>
          </div>
          <div
            className={`flex items-center gap-1.5 text-xs font-medium mt-2 ${
              isHighlighted ? 'text-olive-vif' : 'text-olive'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-ocre-vif shrink-0" />
            <span>Livraison : {plan.deliveryTime}</span>
          </div>
        </div>

        {/* Liste des fonctionnalités */}
        <div className="space-y-3 mb-8">
          <p
            className={`text-[11px] font-mono font-semibold uppercase tracking-wider ${
              isHighlighted ? 'text-white/50' : 'text-vert-fonce/55'
            }`}
          >
            Inclus dans ce forfait
          </p>
          <ul className="space-y-2.5">
            {plan.features.map((feature, idx) => (
              <li
                key={idx}
                className={`flex items-start gap-2.5 text-sm ${
                  isHighlighted ? 'text-white/85' : 'text-vert-fonce/85'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    isHighlighted
                      ? 'bg-olive-vif/20 text-olive-vif'
                      : 'bg-[#EFF2EC] text-olive'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA bas de carte */}
      <div className="p-6 sm:p-8 pt-0 flex flex-col gap-2.5">
        <Link
          href={`/contact?type=projet&plan=${plan.id}`}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 transition-all duration-200 group ${
            isHighlighted
              ? 'bg-ocre text-white hover:bg-ocre-vif shadow-lg shadow-ocre/25'
              : 'bg-vert-fonce text-white hover:bg-[#1A2612]'
          }`}
        >
          <span>{plan.ctaLabel}</span>
          <ArrowRight
            className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
              isHighlighted ? 'text-white' : 'text-ocre-vif'
            }`}
          />
        </Link>

        <a
          href={getWhatsAppUrl(`Bonjour Majeli Connect, je souhaite commander ou échanger sur l'offre : ${plan.name} (${plan.priceDisplay}).`)}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-center text-xs font-medium py-1 transition-colors ${
            isHighlighted
              ? 'text-white/65 hover:text-white'
              : 'text-olive hover:text-vert-fonce'
          }`}
        >
          Poser une question directe sur WhatsApp
        </a>
      </div>
    </div>
  );
}
export default PricingCard;
