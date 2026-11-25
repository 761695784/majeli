import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Majeli Connect — Agence Digitale, Développement Sur-Mesure & IA à Dakar',
    short_name: 'Majeli Connect',
    description:
      "Conception de sites web, boutiques e-commerce, plateformes SaaS (Next.js, Laravel, Angular), applications mobiles Flutter, assistants IA WhatsApp et maintenance informatique à Dakar.",
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F9F6',
    theme_color: '#0F170A',
    lang: 'fr-SN',
    icons: [
      {
        src: '/icon-48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/icon-96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
