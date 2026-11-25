import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { GlobalStructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  metadataBase: new URL('https://majeliconnect.com'),
  applicationName: 'Majeli Connect',
  title: {
    default: 'Majeli Connect | Agence Web, Développement Sur-Mesure & IA à Dakar',
    template: '%s | Majeli Connect',
  },
  description:
    "Agence d'ingénierie digitale à Dakar (Sénégal) : création de sites web et boutiques e-commerce, plateformes SaaS (Next.js, Laravel, Angular), applications mobiles Flutter, assistants IA WhatsApp et maintenance informatique.",
  keywords: [
    'agence web dakar',
    'création site web sénégal',
    'site e-commerce dakar',
    'intégration wave orange money',
    'agence digitale dakar',
    'développement sur-mesure sénégal',
    'développeur laravel dakar',
    'développeur nextjs angular sénégal',
    'application mobile flutter dakar',
    'assistant IA whatsapp sénégal',
    'automatisation IA entreprise dakar',
    'maintenance informatique dakar',
    'installation réseau entreprise sénégal',
    'formation IA entreprise dakar',
    'formation robotique enfants dakar',
    'majeli connect',
  ],
  authors: [{ name: 'Majeli Connect', url: 'https://majeliconnect.com' }],
  creator: 'Majeli Connect',
  publisher: 'Majeli Connect',
  category: 'technology',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: 'Majeli Connect | Ingénierie Logicielle, Web, E-Commerce & IA à Dakar',
    description:
      'Sites vitrines & e-commerce ultra-rapides, plateformes métiers (Next.js, Laravel, Angular), applications mobiles, agents IA WhatsApp 24/7 et maintenance IT au Sénégal.',
    url: 'https://majeliconnect.com',
    siteName: 'Majeli Connect',
    locale: 'fr_SN',
    type: 'website',
    images: [
      {
        url: '/assets/og-majeli.png',
        width: 1200,
        height: 630,
        alt: 'Majeli Connect — Agence Digitale & Ingénierie IA à Dakar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Majeli Connect | Agence Web, E-Commerce & IA à Dakar',
    description:
      'Développement web & mobile sur-mesure (Next.js, Laravel, Angular, Flutter), assistants IA WhatsApp et maintenance informatique à Dakar.',
    images: ['/assets/og-majeli.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'SN-DK',
    'geo.placename': 'Dakar, Liberté 5',
    'geo.position': '14.7225;-17.4589',
    ICBM: '14.7225, -17.4589',
  },
};

export const viewport: Viewport = {
  themeColor: '#0F170A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-[#F8F9F6] text-vert-fonce antialiased flex flex-col min-h-screen selection:bg-ocre/20 selection:text-vert-fonce">
        <GlobalStructuredData />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
