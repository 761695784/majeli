export interface ContactInfo {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  phone: string;
  phoneRaw: string;
  whatsappRaw: string;
  whatsappUrl: string;
  email: string;
  address: string;
  city: string;
  country: string;
  operatingHours: string;
  responseTimeCommitment: string;
}

export const CONTACT_INFO: ContactInfo = {
  name: "Majeli Connect",
  legalName: "Majeli Connect SARL",
  tagline: "Agence Digitale & Solutions Technologiques à Dakar",
  description: "Conception de sites web modernes, applications web & mobiles, intégration d'assistants IA et maintenance informatique professionnelle au Sénégal et en Afrique de l'Ouest.",
  phone: "+221 78 264 34 38",
  phoneRaw: "+221782643438",
  whatsappRaw: "221782643438",
  whatsappUrl: "https://wa.me/221782643438",
  email: "contact@majeliconnect.com",
  address: "Liberté 5, Dakar",
  city: "Dakar",
  country: "Sénégal",
  operatingHours: "Lundi au Vendredi : 08h30 – 18h30 | Samedi : 09h00 – 14h00",
  responseTimeCommitment: "Réponse sous 2 heures ouvrées",
};

export function getWhatsAppUrl(prefillMessage?: string): string {
  const defaultText = "Bonjour Majeli Connect, je souhaite échanger sur un projet digital.";
  const text = encodeURIComponent(prefillMessage || defaultText);
  return `https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${text}`;
}
