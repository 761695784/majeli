import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, MessageSquare } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/contact';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 border border-olive/20 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-olive/15 text-ocre font-black text-2xl flex items-center justify-center mx-auto">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-vert-fonce font-heading">
            Page introuvable
          </h1>
          <p className="text-sm text-vert-fonce/75 font-body leading-relaxed">
            La page que vous recherchez a été déplacée ou n'existe plus.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Link
            href="/"
            className="w-full py-3.5 px-4 rounded-xl bg-vert-fonce text-[#FEFAE0] font-bold text-sm flex items-center justify-center gap-2 hover:bg-olive transition-colors shadow-sm"
          >
            <Home className="w-4 h-4 text-ocre" />
            <span>Retourner à l'accueil</span>
          </Link>

          <Link
            href="/services"
            className="w-full py-3 px-4 rounded-xl bg-olive/10 text-vert-fonce font-semibold text-xs hover:bg-olive/20 transition-colors"
          >
            Consulter nos services & tarifs
          </Link>

          <a
            href={getWhatsAppUrl("Bonjour Majeli Connect, je cherche une information sur votre site.")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-olive hover:text-vert-fonce font-medium py-1"
          >
            Besoin d'aide ? Écrivez-nous sur WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
