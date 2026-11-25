export interface ProjectDetail {
  slug: string;
  title: string;
  client: string;
  category: string;
  sectorGroup: 'ecommerce' | 'vitrine' | 'impact';
  tagline: string;
  description: string;
  image?: string;
  liveUrl?: string;
  featured: boolean;
  tags: string[];
  deliverables: string[];
  results: string[];
  context: string;
}

export const PROJECTS_LIST: ProjectDetail[] = [
  {
    slug: "ampa-boutique",
    title: "AMPA Boutique",
    client: "Maison d'Élégance AMPA · Dakar",
    category: "E-Commerce Mode & Tailleur",
    sectorGroup: "ecommerce",
    tagline: "Boutique e-commerce de costumes et smokings à Dakar avec assistant morphologique en 30s et essayage virtuel.",
    description: "Conçue pour la Maison de Tailleur AMPA à Dakar, cette plateforme e-commerce haut de gamme sublime la vente en ligne de costumes coupe droite, smokings et pièces exécutives. L'expérience marie direction artistique éditoriale, lookbook immersif, module d'essayage virtuel et recommandation intelligente de taille en 30 secondes.",
    image: "/assets/ampa-boutique.jpg",
    featured: false,
    tags: ["E-Commerce", "Costumes & Luxe", "Assistant Taille IA", "Essayage Virtuel", "Dakar"],
    deliverables: [
      "Direction artistique éditoriale raffinée mettant en scène chaque coupe et nuance textile",
      "Catalogue e-commerce complet (Costumes, Smokings, Safari & Manteaux) avec panier rapide",
      "Module interactif « Ma taille 30s » et aperçu d'essayage virtuel sur mesure",
      "Intégration des paiements locaux et réservation d'ajustement en atelier à Dakar (ourlet 30 min / 24h)",
      "Contact WhatsApp direct avec un maître tailleur conseiller",
    ],
    results: [
      "Parcours d'achat fluide réduisant drastiquement les hésitations sur le choix des tailles",
      "Valorisation digitale alignée sur les standards des grandes maisons sartoriales",
      "Navigation mobile ultra-rapide pensée pour une clientèle exécutive exigeante",
    ],
    context: "Direction artistique UI/UX, architecture e-commerce sur-mesure et intégration des parcours d'essayage et de recommandation morphologique.",
  },
  {
    slug: "ameg-international",
    title: "AMEG International",
    client: "AMEG International · Afrique de l'Ouest",
    category: "E-Commerce B2B & Cuisine Pro",
    sectorGroup: "ecommerce",
    tagline: "Site e-commerce et catalogue technique d'équipements de cuisine professionnelle pour hôtels, restaurants et boulangeries.",
    description: "AMEG International conçoit, fournit et installe des équipements de cuisine professionnelle des meilleures marques pour les restaurants, hôtels, collectivités et boulangeries en Afrique de l'Ouest. La plateforme combine vente en ligne directe, catalogue technique multicritères et demandes d'études de projets sur-mesure.",
    image: "/assets/ameg-international.jpg",
    featured: false,
    tags: ["E-Commerce B2B", "Catalogue Pro", "Laravel / MySQL", "Devis Technique", "Afrique de l'Ouest"],
    deliverables: [
      "Architecture e-commerce robuste gérant un large catalogue d'équipements CHR et boulangerie",
      "Moteur de recherche rapide par catégorie d'équipement, puissance et marque",
      "Double tunnel de conversion : achat direct au panier ou demande d'étude de projet gratuite",
      "Fiches techniques détaillées et passerelle WhatsApp directe avec les ingénieurs commerciaux",
      "Back-office complet de gestion des stocks, commandes et demandes de devis B2B",
    ],
    results: [
      "Digitalisation complète du catalogue d'équipements professionnels en Afrique de l'Ouest",
      "Génération continue de demandes de devis qualifiées d'hôtels, restaurants et collectivités",
      "Consultation fluide des fiches produits sur ordinateur comme sur mobile sur chantier",
    ],
    context: "Conception full-stack du portail e-commerce B2B/B2C, structuration de la base de données catalogue et optimisation SEO régional.",
  },
  {
    slug: "teranga-box",
    title: "Teranga Box Dakar",
    client: "Teranga Box",
    category: "E-Commerce & Intelligence Artificielle",
    sectorGroup: "ecommerce",
    tagline: "Boutique en ligne de coffrets cadeaux raffinés avec assistant IA de recommandation personnalisée.",
    description: "Teranga Box réinvente l'art d'offrir au Sénégal à travers des coffrets cadeaux thématiques mettant en valeur les artisans locaux et les produits du terroir sénégalais, couplé à un assistant IA qui oriente les acheteurs indécis.",
    image: "/assets/teranga-box.png",
    featured: true,
    tags: ["E-Commerce", "Assistant IA", "Wave", "Orange Money", "Dakar"],
    deliverables: [
      "Boutique e-commerce moderne au design chaleureux et épuré",
      "Configurateur interactif de coffrets personnalisés étape par étape",
      "Intégration d'un assistant conversationnel IA pour conseiller le cadeau idéal selon l'occasion et le budget",
      "Passerelle de paiement local multi-opérateurs (Wave, Orange Money, CB)",
      "Gestion des stocks et alertes de réapprovisionnement automatiques",
    ],
    results: [
      "Taux de conversion supérieur à 4,2% grâce à l'assistant de recommandation",
      "Paiements validés instantanément via les canaux mobiles locaux",
      "Temps de chargement des pages inférieur à 1,2 seconde",
    ],
    context: "Développement full-stack et intégration de modèles LLM adaptés à la culture locale de la Teranga.",
  },
  {
    slug: "residence-good-house",
    title: "Résidence Good House",
    client: "Good House Ngor Almadies",
    category: "Site Vitrine & Tourisme",
    sectorGroup: "vitrine",
    tagline: "Portail vitrine immersif et système de réservation directe pour appartements meublés de standing.",
    description: "Située dans l'un des quartiers les plus prisés de Dakar, la Résidence Good House avait besoin d'une vitrine digitale à la hauteur de son standing pour séduire une clientèle d'affaires et touristique sans dépendre exclusivement des commissions élevées des plateformes de réservation.",
    image: "/assets/good-house.png",
    liveUrl: "https://residencegoodhouse.com",
    featured: true,
    tags: ["Site Vitrine", "Tourisme & Hôtellerie", "Almadies", "SEO Local"],
    deliverables: [
      "Identité visuelle digitale sobre, raffinée et axée sur l'élégance architecturale",
      "Galerie photos haute résolution avec chargement progressif optimisé",
      "Module de demande de réservation directe sans commission intermédiaire",
      "Intégration d'une conciergerie WhatsApp directe pour des échanges immédiats",
      "Référencement naturel ciblé sur les requêtes d'hébergement aux Almadies",
    ],
    results: [
      "Site en ligne accessible sur residencegoodhouse.com",
      "Hausse notable des réservations directes via WhatsApp",
      "Score de performance Google Lighthouse supérieur à 95/100",
    ],
    context: "Création du site web, rédaction des contenus en français et mise en ligne sur nom de domaine personnalisé.",
  },
  {
    slug: "casa-impact",
    title: "Casa Impact",
    client: "Casa Impact Casamance",
    category: "Portail Communautaire & Jeunesse",
    sectorGroup: "impact",
    tagline: "Plateforme d'engagement territorial, d'initiatives citoyennes et d'insertion professionnelle.",
    description: "Casa Impact est une initiative associative fédératrice qui mobilise les énergies citoyennes, valorise les talents locaux et promeut les projets d'impact social et environnemental dans la région de la Casamance.",
    image: "/assets/casa-impact.png",
    liveUrl: "https://casaimpact.org",
    featured: true,
    tags: ["Portail Citoyen", "Communauté", "Casamance", "Impact Social"],
    deliverables: [
      "Portail d'actualités et d'annonces de projets territoriaux",
      "Formulaire d'adhésion en ligne et base de données des bénévoles",
      "Agenda interactif des ateliers, formations et rencontres citoyennes",
      "Module de présentation des partenaires institutionnels et mécènes",
      "Accessibilité mobile renforcée pour consultation en zones à réseau instable",
    ],
    results: [
      "Plateforme en ligne accessible sur casaimpact.org",
      "Plusieurs centaines de membres et sympathisants mobilisés en quelques mois",
      "Excellente fluidité sur téléphones d'entrée de gamme",
    ],
    context: "Accompagnement pro bono & technique pour doter une initiative régionale d'un outil digital de premier plan.",
  },
  {
    slug: "sinai-securite",
    title: "Sinaï Sécurité",
    client: "Sinaï Sécurité Privée",
    category: "Site Corporate & B2B",
    sectorGroup: "vitrine",
    tagline: "Site institutionnel pour société de gardiennage et sécurité électronique.",
    description: "Développement d'une vitrine professionnelle mettant en avant les agréments ministériels, les références clients et les solutions de vidéosurveillance et gardiennage pour entreprises.",
    featured: false,
    tags: ["Site Vitrine", "B2B", "Sécurité", "Devis en ligne"],
    deliverables: [
      "Site vitrine corporate inspirant rigueur, confiance et professionnalisme",
      "Formulaire d'appel d'offres et de demande d'audit de sécurité des locaux",
      "Fiches techniques des solutions de télésurveillance et rondes",
    ],
    results: [
      "Positionnement B2B crédible lors de réponses aux appels d'offres",
      "Réception hebdomadaire de demandes de devis qualifiées d'entreprises",
    ],
    context: "Refonte de présence web et optimisation du tunnel de devis corporate.",
  },
];
