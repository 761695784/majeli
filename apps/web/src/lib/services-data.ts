export interface PricingPlan {
  id: string;
  name: string;
  priceDisplay: string;
  priceAmount?: number;
  currency: string;
  period?: string;
  badge?: string;
  highlighted?: boolean;
  description: string;
  deliveryTime: string;
  features: string[];
  ctaLabel: string;
  serviceCategory: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  shortTitle: string;
  iconName: string;
  summary: string;
  fullDescription: string;
  colorTheme: string;
  deliverables: string[];
  technologies: string[];
  processSteps: { title: string; description: string }[];
  plans?: PricingPlan[];
  customQuoteNotes?: string;
}

export const SERVICES_LIST: ServiceDetail[] = [
  {
    slug: "developpement-web-mobile",
    title: "Développement Web & Mobile Sur-Mesure",
    shortTitle: "Web & Mobile",
    iconName: "Code2",
    summary: "Sites vitrines percutants, plateformes SaaS MVP et applications mobiles performantes pour propulser votre entreprise en Afrique et à l'international.",
    fullDescription: "Nous créons des solutions logicielles rapides, sécurisées et orientées conversion. Pas de templates impersonnels : chaque produit est pensé pour votre cible, adapté aux spécificités de connectivité locale et optimisé pour le référencement naturel.",
    colorTheme: "olive",
    deliverables: [
      "Architecture sur-mesure (Next.js, Angular, Laravel) pour une vitesse et une fiabilité optimales",
      "Bases de données relationnelles robustes (MySQL, PostgreSQL) et API sécurisées",
      "Expérience mobile-first fluide et applications natives iOS & Android (Flutter)",
      "Intégration des paiements locaux (Wave, Orange Money, carte bancaire)",
      "Back-office sur-mesure pour piloter vos activités en totale autonomie",
    ],
    technologies: [
      "Next.js",
      "React",
      "Angular",
      "Laravel",
      "TypeScript",
      "Flutter",
      "MySQL",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    processSteps: [
      { title: "1. Cadrage & Cahier des charges", description: "Définition précise des objectifs d'affaires, des parcours utilisateurs et des fonctionnalités clés." },
      { title: "2. Prototypage & Design UI/UX", description: "Maquettes interactives fidèles à votre identité de marque, validées ensemble avant tout développement." },
      { title: "3. Développement & Tests rigoureux", description: "Codage en composants réutilisables, tests de charge, compatibilité multi-appareils et sécurité." },
      { title: "4. Mise en production & Formation", description: "Déploiement sur infrastructure performante, raccordement domaine et formation de votre équipe." },
    ],
    plans: [
      {
        id: "site-vitrine",
        name: "Site Vitrine Professionnel",
        priceDisplay: "450 000 FCFA",
        priceAmount: 450000,
        currency: "FCFA",
        badge: "Idéal Lancement",
        description: "Présentez vos services avec élégance, crédibilité et une vitesse d'affichage irréprochable.",
        deliveryTime: "2 à 3 semaines",
        features: [
          "Jusqu'à 5 pages sur-mesure (Accueil, Services, Réalisations, À propos, Contact)",
          "Design responsive adapté aux smartphones, tablettes et ordinateurs",
          "Bouton WhatsApp direct + Formulaire de devis qualifié",
          "Optimisation SEO local (Google My Business, métadonnées, Open Graph)",
          "Nom de domaine (.com ou .sn) et hébergement haute vitesse 1 an offerts",
          "Certificat SSL gratuit et sécurité renforcée",
          "Session de prise en main de 2h incluse",
        ],
        ctaLabel: "Commander mon site vitrine",
        serviceCategory: "developpement-web-mobile",
      },
      {
        id: "plateforme-mvp",
        name: "Plateforme Web MVP / Portail Métier",
        priceDisplay: "À partir de 800 000 FCFA",
        priceAmount: 800000,
        currency: "FCFA",
        highlighted: true,
        badge: "Recommandé Pro",
        description: "Validez votre produit digital ou digitalisez vos opérations avec un back-office sur-mesure.",
        deliveryTime: "4 à 6 semaines",
        features: [
          "Architecture moderne Next.js / TypeScript avec API sécurisée",
          "Gestion des utilisateurs, rôles et authentification sécurisée",
          "Espace d'administration personnalisé Majeli Admin",
          "Intégration paiements locaux (Wave, Orange Money via PayTech / Moneroo)",
          "Génération de documents PDF (factures, reçus, attestations)",
          "Export de données Excel / CSV et statistiques en temps réel",
          "Garantie corrective de 3 mois post-lancement",
        ],
        ctaLabel: "Lancer mon projet MVP",
        serviceCategory: "developpement-web-mobile",
      },
      {
        id: "application-mobile",
        name: "Application Mobile (iOS & Android)",
        priceDisplay: "À partir de 1 100 000 FCFA",
        priceAmount: 1100000,
        currency: "FCFA",
        badge: "Haute Performance",
        description: "Application native multiplateforme Flutter avec synchronisation backend temps réel.",
        deliveryTime: "6 à 10 semaines",
        features: [
          "Base de code unique Flutter pour App Store (iOS) et Google Play (Android)",
          "Backend complet avec gestion de base de données PocketBase / PostgreSQL",
          "Notifications push ciblées et engagement utilisateur",
          "Mode hors-ligne avec synchronisation automatique à la reconnexion",
          "Authentification par SMS OTP / Numéro de téléphone / Email",
          "Accompagnement à la publication sur Google Play Store et Apple App Store",
        ],
        ctaLabel: "Développer mon application",
        serviceCategory: "developpement-web-mobile",
      },
    ],
  },
  {
    slug: "ia-automatisation",
    title: "Intelligence Artificielle & Automatisation",
    shortTitle: "IA & Automatisation",
    iconName: "Cpu",
    summary: "Assistants intelligents WhatsApp et automatisations sur-mesure pour qualifier vos prospects 24/7 et réduire vos tâches répétitives.",
    fullDescription: "Gagnez des heures précieuses et ne perdez plus jamais un prospect. Nous connectons l'intelligence artificielle générative à vos outils quotidiens pour qualifier les demandes, répondre instantanément aux questions fréquentes et automatiser le suivi commercial.",
    colorTheme: "ocre",
    deliverables: [
      "Agent IA de qualification pré-paramétré avec la base documentaire de votre société",
      "Connexion directe à votre numéro WhatsApp Business officiel",
      "Transfert transparent vers un conseiller humain en cas de demande complexe",
      "Tableau de bord de suivi des conversations et des prospects qualifiés",
      "Automatisation des relances par email ou SMS",
    ],
    technologies: ["WhatsApp Business API", "OpenAI / Claude API", "Make / n8n", "PocketBase", "Webhooks"],
    processSteps: [
      { title: "1. Audit de vos échanges clients", description: "Cartographie des 20 questions récurrentes et du scénario idéal de qualification commerciale." },
      { title: "2. Entraînement & Personnalisation", description: "Injection de vos offres, vos tarifs, vos contraintes et du ton de marque souhaité." },
      { title: "3. Raccordement WhatsApp / Web", description: "Mise en place de l'infrastructure sécurisée et des règles de bascule conseiller." },
      { title: "4. Ajustements & Suivi", description: "Analyse des premières conversations réelles et affinage de la précision des réponses." },
    ],
    plans: [
      {
        id: "assistant-ia-qualification",
        name: "Assistant IA de Qualification (WhatsApp & Web)",
        priceDisplay: "À partir de 500 000 FCFA",
        priceAmount: 500000,
        currency: "FCFA",
        badge: "Productivité x5",
        highlighted: true,
        description: "Votre premier commercial virtuel opérationnel 24h/24 et 7j/7 sur votre canal WhatsApp officiel.",
        deliveryTime: "2 à 3 semaines",
        features: [
          "Intégration officielle WhatsApp Cloud API ou Widget web conversationnel",
          "Entraînement sur vos documents d'entreprise, FAQ, catalogues et tarifs",
          "Capture automatique du nom, besoin, budget et coordonnées du prospect",
          "Notification instantanée de votre équipe commerciale dès qu'un prospect est chaud",
          "Passage de relais immédiat vers un conseiller humain en 1 clic",
          "Tableau de bord de consultation des historiques d'échanges",
          "1 mois d'ajustements et de suivi inclus",
        ],
        ctaLabel: "Installer mon assistant IA",
        serviceCategory: "ia-automatisation",
      },
    ],
    customQuoteNotes: "Pour des besoins d'automatisation de processus internes complexes (connexion ERP, scraping de données réglementaires, pipelines de facturation automatique), nous réalisons un chiffrage personnalisé sur devis.",
  },
  {
    slug: "branding-marketing",
    title: "Identité Visuelle & Marketing Digital",
    shortTitle: "Branding & Marketing",
    iconName: "Palette",
    summary: "Donnez à votre marque une crédibilité immédiate avec une identité visuelle marquante et une présence sociale active et cohérente.",
    fullDescription: "Une marque forte inspire confiance dès le premier regard. Nous concevons votre univers visuel de A à Z et prenons en main votre présence sur les réseaux sociaux pour bâtir une communauté engagée autour de vos solutions.",
    colorTheme: "olive",
    deliverables: [
      "Logo vectoriel haute résolution avec toutes ses déclinaisons",
      "Guide complet de charte graphique (typographies, palettes, règles d'usage)",
      "Templates réseaux sociaux réutilisables (Canva ou Figma)",
      "Supports d'impression prêts (cartes de visite, papier en-tête, signatures)",
      "Stratégie de contenu et calendrier éditorial mensuel",
    ],
    technologies: ["Figma", "Adobe Illustrator", "Photoshop", "Meta Business Suite", "LinkedIn"],
    processSteps: [
      { title: "1. Diagnostic & Positionnement", description: "Étude de votre marché, de vos concurrents et clarification de votre promesse de valeur unique." },
      { title: "2. Pistes créatives & Moodboard", description: "Présentation de 3 concepts visuels distincts argumentés selon vos objectifs." },
      { title: "3. Finalisation & Déclinaisons", description: "Déclinaison de l'option retenue sur tous les formats digitaux et print." },
      { title: "4. Lancement & Animation", description: "Mise en ligne des nouveaux visuels et exécution du calendrier de publication." },
    ],
    plans: [
      {
        id: "identite-visuelle",
        name: "Identité Visuelle Professionnelle",
        priceDisplay: "350 000 FCFA",
        priceAmount: 350000,
        currency: "FCFA",
        badge: "Fondations de Marque",
        description: "Une image de marque solide, mémorable et cohérente sur tous vos supports de communication.",
        deliveryTime: "2 à 3 semaines",
        features: [
          "Création de logo original (3 propositions uniques, retouches illimitées dans le cadrage)",
          "Fichiers vectoriels livrés : AI, SVG, PNG transparent haute définition, PDF",
          "Charte graphique complète (palette chromatique, règles typographiques, espacements)",
          "Gabarit de carte de visite professionnelle prêt à l'impression",
          "Template papier en-tête officiel et signature email corporate",
          "Kit de démarrage réseaux sociaux (bannières LinkedIn / Facebook, avatars)",
        ],
        ctaLabel: "Créer mon identité de marque",
        serviceCategory: "branding-marketing",
      },
      {
        id: "community-management",
        name: "Community Management (Formule Croissance)",
        priceDisplay: "200 000 FCFA / mois",
        priceAmount: 200000,
        currency: "FCFA",
        period: "mois",
        badge: "Régularité & Ventes",
        highlighted: true,
        description: "Déléguez l'animation de vos réseaux sociaux à une équipe qui comprend votre audience locale.",
        deliveryTime: "Engagement trimestriel recommandé",
        features: [
          "12 publications soignées par mois (visuels haute qualité + textes captivants)",
          "Calendrier éditorial partagé et validé 1 semaine à l'avance",
          "Gestion active de LinkedIn, Facebook et Instagram",
          "Modération réactive des commentaires et messages privés du lundi au samedi",
          "Veille sectorielle et adaptation aux tendances du marché sénégalais",
          "Rapport mensuel détaillé : portée, interactions, conversion en prospects",
        ],
        ctaLabel: "Déléguer mes réseaux sociaux",
        serviceCategory: "branding-marketing",
      },
    ],
  },
  {
    slug: "maintenance-it-reseaux",
    title: "Maintenance Informatique & Réseaux d'Entreprise",
    shortTitle: "Maintenance & Réseaux",
    iconName: "Wrench",
    summary: "Sécurisez et pérennisez vos outils de travail : dépannage physique de votre parc PC, infogérance logicielle et câblage réseau d'entreprise.",
    fullDescription: "Un parc informatique défaillant ou un réseau Wi-Fi instable coûtent des heures de travail à vos équipes. Majeli Connect intervient sur site à Dakar ou à distance pour maintenir votre matériel en parfait état de fonctionnement et garantir votre continuité d'activité.",
    colorTheme: "olive",
    deliverables: [
      "Maintenance matérielle préventive et curative (dépoussiérage, diagnostics composants, réparations)",
      "Maintenance logicielle et infogérance (mises à jour OS, antivirus centralisé, sauvegardes)",
      "Installation et restructuration de réseaux câblés (RJ45, baies de brassage) et Wi-Fi professionnel",
      "Audit de sécurité informatique et plan de reprise d'activité",
      "Contrat de support avec intervention sur site garantie sous 4h ouvrées",
    ],
    technologies: ["Windows Server", "Linux", "MikroTik", "Ubiquiti UniFi", "Veeam Backup", "Cisco"],
    processSteps: [
      { title: "1. Audit initial sur site", description: "Inventaire complet du parc d'ordinateurs, test de l'état des disques et analyse du réseau actuel." },
      { title: "2. Remise à niveau prioritaire", description: "Résolution des pannes bloquantes, nettoyage physique et sécurisation des accès." },
      { title: "3. Proposition de contrat ou forfait", description: "Établissement d'une tarification claire adaptée au nombre de postes et d'équipements." },
      { title: "4. Suivi préventif régulier", description: "Passages programmés mensuels et téléassistance immédiate en cas d'urgence." },
    ],
    customQuoteNotes: "Toutes nos prestations de maintenance informatique (hardware PC et software) et d'installation réseau sont réalisées sur devis après diagnostic gratuit de votre parc.",
  },
  {
    slug: "formations-pratiques",
    title: "Formations Pratiques & Renforcement de Compétences",
    shortTitle: "Formations Pratiques",
    iconName: "GraduationCap",
    summary: "Ateliers intensifs en Intelligence Artificielle appliquée, initiation Robotique pour jeunes et perfectionnement bureautique pour entreprises.",
    fullDescription: "Nous transmettons des compétences concrètes, directement applicables dans le milieu professionnel ou pour éveiller les vocations technologiques dès le plus jeune âge. Formations en présentiel à Dakar ou en entreprise.",
    colorTheme: "ocre",
    deliverables: [
      "Supports pédagogiques complets remis aux participants",
      "Mise en pratique sur cas réels et projets concrets tout au long de la formation",
      "Attestation de formation certifiée par Majeli Connect",
      "Accompagnement post-formation pendant 30 jours (groupe d'entraide)",
    ],
    technologies: ["ChatGPT & Claude Pro", "Midjourney & Canva IA", "Arduino & Micro:bit", "Scratch & Python", "Google Workspace & Microsoft 365"],
    processSteps: [
      { title: "1. Évaluation des besoins", description: "Identification du niveau actuel des apprenants et des cas d'usage métiers prioritaires." },
      { title: "2. Programme sur-mesure", description: "Conception des exercices pratiques adaptés à votre secteur d'activité." },
      { title: "3. Animation interactive", description: "Sessions rythmées alternant 30% d'explications et 70% d'ateliers pratiques guidés." },
      { title: "4. Bilan et certification", description: "Évaluation finale, remise des attestations et plan d'application en entreprise." },
    ],
    customQuoteNotes: "Les sessions de formation sont proposées en formules intra-entreprise (sur-mesure pour vos équipes) ou en sessions collectives. Tarification sur devis selon l'effectif et le format souhaité.",
  },
];

export const ALL_PRICING_PLANS: PricingPlan[] = SERVICES_LIST.flatMap(
  (s) => s.plans || []
);

export const SUR_DEVIS_SERVICES = [
  {
    title: "Maintenance Parc Informatique (Hardware & Dépannage PC)",
    description: "Nettoyage physique, diagnostic carte mère, remplacement d'écrans, batteries, disques SSD, mémoire RAM et remise en état d'ordinateurs portables et fixes d'entreprise.",
    category: "Matériel & Infrastructure",
    icon: "Laptop",
  },
  {
    title: "Infogérance & Maintenance Logicielle (Software)",
    description: "Mises à jour applicatives, monitoring serveurs, sauvegardes automatiques dans le cloud, gestion des licences et téléassistance illimitée pour vos collaborateurs.",
    category: "Logiciel & Cloud",
    icon: "ShieldCheck",
  },
  {
    title: "Câblage & Installation Réseaux d'Entreprise",
    description: "Pose de goulottes, tirage de câbles RJ45 catégorie 6, brassage d'armoires réseau, déploiement de bornes Wi-Fi longue portée maillées et sécurisation pare-feu.",
    category: "Réseaux & Télécoms",
    icon: "Network",
  },
  {
    title: "Formations Professionnelles en Entreprise",
    description: "Formations d'équipes à l'utilisation des outils IA pour le marketing et la rédaction, gestion de projets numériques et bureautique collaborative sur-mesure.",
    category: "Formation Continue",
    icon: "Users",
  },
  {
    title: "Initiation Robotique & Codage pour Écoles & Jeunes",
    description: "Ateliers ludiques avec microcontrôleurs (Arduino, Micro:bit), capteurs, moteurs et programmation visuelle pour développer la pensée logique des 8-18 ans.",
    category: "Éducation & Jeunesse",
    icon: "Bot",
  },
];
