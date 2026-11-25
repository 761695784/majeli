import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const PROJECTS_SEED = [
  {
    slug: "teranga-box",
    titre: "Teranga Box Dakar",
    client: "Teranga Box",
    categorie: "E-Commerce & Intelligence Artificielle",
    accroche: "Boutique en ligne de coffrets cadeaux raffinés avec assistant IA de recommandation personnalisée.",
    description: "Teranga Box réinvente l'art d'offrir au Sénégal à travers des coffrets cadeaux thématiques mettant en valeur les artisans locaux et les produits du terroir sénégalais.",
    image_url: "/assets/teranga-box.png",
    en_vedette: true,
    ordre: 2,
    tags: ["E-Commerce", "Assistant IA", "Wave", "Orange Money", "Dakar"],
    livrables: [
      "Boutique e-commerce moderne au design soigné",
      "Configurateur interactif de coffrets personnalisés",
      "Assistant conversationnel IA pour conseiller le cadeau idéal selon l'occasion et le budget",
      "Passerelle de paiement local multi-opérateurs (Wave, Orange Money, CB)",
    ],
    resultats: [
      "Taux de conversion supérieur à 4,2%",
      "Paiements validés instantanément via les canaux mobiles locaux",
    ],
    contexte: "Développement full-stack et intégration de modèles LLM adaptés à la culture locale de la Teranga.",
  },
  {
    slug: "residence-good-house",
    titre: "Résidence Good House",
    client: "Good House Ngor Almadies",
    categorie: "Site Vitrine & Tourisme",
    accroche: "Portail vitrine immersif et système de réservation directe pour appartements meublés de standing.",
    description: "Située aux Almadies, la Résidence Good House dispose d'une vitrine digitale élégante pour capter des réservations directes sans commissions d'intermédiaires.",
    image_url: "/assets/good-house.png",
    live_url: "https://residencegoodhouse.com",
    en_vedette: true,
    ordre: 3,
    tags: ["Site Vitrine", "Tourisme & Hôtellerie", "Almadies", "SEO Local"],
    livrables: [
      "Identité visuelle digitale sobre et raffinée",
      "Galerie photos haute résolution avec chargement progressif",
      "Module de demande de réservation directe sans commission intermédiaire",
      "Intégration d'une conciergerie WhatsApp directe",
    ],
    resultats: [
      "Site en ligne sur residencegoodhouse.com",
      "Hausse notable des réservations directes via WhatsApp",
    ],
    contexte: "Création du site web, rédaction des contenus en français et mise en ligne.",
  },
  {
    slug: "casa-impact",
    titre: "Casa Impact",
    client: "Casa Impact Casamance",
    categorie: "Portail Communautaire & Jeunesse",
    accroche: "Plateforme d'engagement territorial, d'initiatives citoyennes et d'insertion professionnelle.",
    description: "Casa Impact est une initiative associative fédératrice qui mobilise les énergies citoyennes et valorise les talents de la Casamance.",
    image_url: "/assets/casa-impact.png",
    live_url: "https://casaimpact.org",
    en_vedette: true,
    ordre: 4,
    tags: ["Portail Citoyen", "Communauté", "Casamance", "Impact Social"],
    livrables: [
      "Portail d'actualités et d'annonces de projets territoriaux",
      "Formulaire d'adhésion en ligne et base des bénévoles",
      "Agenda interactif des ateliers et formations",
    ],
    resultats: [
      "Plateforme en ligne sur casaimpact.org",
      "Plusieurs centaines de membres et sympathisants mobilisés",
    ],
    contexte: "Accompagnement pro bono & technique pour doter une initiative régionale d'un outil digital.",
  },
  {
    slug: "ampa-boutique",
    titre: "AMPA Boutique",
    client: "Maison d'Élégance AMPA · Dakar",
    categorie: "E-Commerce Mode & Tailleur",
    accroche: "Boutique e-commerce de costumes et smokings à Dakar avec assistant morphologique en 30s et essayage virtuel.",
    description: "Boutique en ligne haut de gamme de costumes coupe droite, smokings et pièces sur-mesure à Dakar intégrant essayage virtuel et recommandation de taille.",
    image_url: "/assets/ampa-boutique.jpg",
    en_vedette: false,
    ordre: 5,
    tags: ["E-Commerce", "Costumes & Luxe", "Assistant Taille IA", "Dakar"],
    livrables: [
      "Catalogue e-commerce par collections (Costumes, Smokings, Safari & Manteaux)",
      "Module interactif Ma taille 30s et essayage virtuel",
      "Panier et réservation retouche atelier Dakar",
    ],
    resultats: [
      "Parcours d'achat fluide et réduction des retours sur les tailles",
    ],
    contexte: "Direction artistique UI/UX et développement e-commerce sur-mesure.",
  },
  {
    slug: "ameg-international",
    titre: "AMEG International",
    client: "AMEG International",
    categorie: "E-Commerce B2B & Cuisine Pro",
    accroche: "Site e-commerce de vente et d'installation d'équipements de cuisine professionnelle en Afrique de l'Ouest.",
    description: "AMEG International conçoit, fournit et installe des équipements de cuisine professionnelle pour les restaurants, hôtels, collectivités et boulangeries.",
    image_url: "/assets/ameg-international.jpg",
    en_vedette: false,
    ordre: 6,
    tags: ["E-Commerce B2B", "Catalogue Pro", "Laravel / MySQL", "Afrique de l'Ouest"],
    livrables: [
      "Catalogue e-commerce d'équipements de cuisine professionnelle",
      "Tunnel de commande et demande d'étude de projet gratuite",
    ],
    resultats: [
      "Génération continue de demandes de devis qualifiées CHR",
    ],
    contexte: "Conception full-stack du portail e-commerce B2B/B2C.",
  },
  {
    slug: "sinai-securite",
    titre: "Sinaï Sécurité",
    client: "Sinaï Sécurité Privée",
    categorie: "Site Corporate & B2B",
    accroche: "Site institutionnel pour société de gardiennage et sécurité électronique.",
    description: "Développement d'une vitrine professionnelle mettant en avant les agréments ministériels et les solutions de sécurité.",
    en_vedette: false,
    ordre: 7,
    tags: ["Site Vitrine", "B2B", "Sécurité", "Devis en ligne"],
    livrables: [
      "Site vitrine corporate inspirant confiance et rigueur",
      "Formulaire d'appel d'offres",
    ],
    resultats: [
      "Crédibilité renforcée auprès des grands comptes",
    ],
    contexte: "Refonte de présence web et tunnel de devis B2B.",
  },
];

const TEMOIGNAGES_SEED = [
  {
    nom: "Fourmose Corréa",
    role: "Gérant",
    entreprise: "Résidence Good House",
    contenu: "Depuis la mise en ligne de notre site officiel residencegoodhouse.com, nous recevons des demandes de séjours directes sans passer systématiquement par les commissions exorbitantes des intermédiaires. Le design reflète parfaitement le confort de nos meublés aux Almadies.",
    note: 5,
    projet_slug: "residence-good-house",
    localisation: "Ngor Almadies, Dakar",
    actif: true,
  },
  {
    nom: "Toumany Badiane",
    role: "Président Fondateur",
    entreprise: "Casa Impact",
    contenu: "L'équipe de Majeli Connect a fait preuve d'une écoute remarquable face à nos contraintes associatives territoriales. Notre portail casaimpact.org est moderne, accessible même sur les téléphones modestes et fédère aujourd'hui nos bénévoles.",
    note: 5,
    projet_slug: "casa-impact",
    localisation: "Ziguinchor & Dakar",
    actif: true,
  },
  {
    nom: "Aïssatou Leye",
    role: "CEO",
    entreprise: "Teranga Box Dakar",
    contenu: "L'assistant IA de suggestion de coffrets cadeaux et le configurateur sur-mesure ont métamorphosé notre tunnel de vente. Nos clients choisissent rapidement et règlent avec Wave ou Orange Money en quelques clics sans friction.",
    note: 5,
    projet_slug: "teranga-box",
    localisation: "Dakar",
    actif: true,
  },
];

async function runSeed() {
  try {
    console.log('Connexion à PocketBase...');
    await pb.collection('_superusers').authWithPassword('admin@majeliconnect.com', 'Majeli2026Admin!');
    console.log('Authentifié en tant que superuser !');

    // Seeding Projets
    console.log('Seeding projets...');
    for (const proj of PROJECTS_SEED) {
      try {
        const existing = await pb.collection('projets').getFirstListItem(`slug="${proj.slug}"`);
        await pb.collection('projets').update(existing.id, proj);
        console.log(`  Projet mis à jour : ${proj.titre}`);
      } catch {
        await pb.collection('projets').create(proj);
        console.log(`  Projet créé : ${proj.titre}`);
      }
    }

    // Seeding Témoignages
    console.log('Seeding témoignages...');
    for (const tem of TEMOIGNAGES_SEED) {
      try {
        const existing = await pb.collection('temoignages').getFirstListItem(`nom="${tem.nom}"`);
        await pb.collection('temoignages').update(existing.id, tem);
        console.log(`  Témoignage mis à jour : ${tem.nom}`);
      } catch {
        await pb.collection('temoignages').create(tem);
        console.log(`  Témoignage créé : ${tem.nom}`);
      }
    }

    console.log('Seeding terminé avec succès !');
  } catch (err) {
    console.error('Erreur durant le seeding :', err);
    process.exit(1);
  }
}

runSeed();
