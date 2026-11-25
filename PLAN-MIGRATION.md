# Majeli Connect — Plan de migration vers Next.js

Date : 12 octobre 2026. S'appuie sur AUDIT.md et INVENTAIRE.md. Légende : [V] vérifié · [H] hypothèse · [R] recommandation.

## 0. À faire avant la refonte (dans Horizons, sur le site actuel)

1. **Verrouiller les règles PocketBase** (AUDIT C1). Collection `contacts` : list, view, update et delete en « superusers uniquement ». Collection `users` : create verrouillé. Une règle vide `""` veut dire « public », ce n'est pas un verrou.
2. **Corriger les deux liens de /contact** vers `221782643438` (AUDIT C2, diff prêt).
3. **Retirer les 3 icônes sociales `#`** du footer, ou leur donner les vraies URL.
4. **Ouvrir les demandes déjà reçues** dans le tableau de bord PocketBase de Horizons : sans notification, il peut y en avoir en attente [H].

Ces corrections ne dépendent pas de la refonte. Elles suppriment un risque sur les données et une perte de prospects.

## 1. Ce qu'on réutilise, reconstruit, migre, vérifie

| Élément | Décision | Pourquoi |
|---|---|---|
| Textes des 4 pages | **Réutiliser comme matière**, réécrire | Fond juste mais générique ; voir INVENTAIRE §4 |
| Coordonnées (email, numéro, adresse) | **Réutiliser** après confirmation, dans un seul fichier `lib/contact.ts` | Mettre fin aux divergences de numéro |
| Palette | **Reconstruire** depuis les hex officiels `#283618 #606C38 #FEFAE0 #BC6C25` | Les jetons HSL actuels dérivent (AUDIT M5) |
| Logo | **Fichier original à fournir** | Seule une copie CDN existe ; on ne la redessine pas |
| Visuels hero (CDN, Unsplash) | **Ne pas réutiliser** sans vérifier leur origine | Images génériques présentées comme l'équipe (AUDIT M9) |
| Composants React/shadcn | **Reconstruire** | Faible valeur, accessibilité à revoir ; sur Next.js, shadcn s'installe proprement composant par composant |
| Animations Framer Motion | **Reconstruire** avec `motion` + mouvement réduit | Aucune gestion du mouvement réduit (AUDIT M6) |
| Plugins, scripts et hooks Horizons | **Abandonner** | Liés à l'éditeur Horizons ; scripts de débogage en production (AUDIT M7) |
| Formulaire et backend PocketBase | **Reconstruire** le flux ; **migrer** les demandes existantes si elles comptent | Voir §4 |
| URL | **Conserver** `/`, `/services`, `/contact` ; **rediriger** `/about` → `/agence` (301) | Sitemap actuel : 4 URL |
| sitemap / robots | **Reconstruire** dans Next.js (`app/sitemap.ts`, `app/robots.ts`) | Aujourd'hui générés par Hostinger, absents du code |

## 2. Structure Next.js proposée

Nouveau dossier, **distinct de l'export** (par exemple `majeli-connect-next/`). Next.js App Router, TypeScript, Tailwind. Versions stables à choisir et vérifier au moment de l'installation.

```
majeli-connect-next/
  app/
    layout.tsx                  polices next/font, header, footer, métadonnées par défaut
    page.tsx                    Accueil
    services/page.tsx
    services/[slug]/page.tsx    5 pôles (+ réseaux si la matière suffit)
    realisations/page.tsx
    realisations/[slug]/page.tsx
    formations/page.tsx
    formations/[slug]/page.tsx
    agence/page.tsx
    contact/page.tsx
    demarrer-un-projet/page.tsx
    demande-intervention/page.tsx
    mentions-legales/page.tsx   brouillon, à compléter
    confidentialite/page.tsx    brouillon, à aligner sur le flux réel
    not-found.tsx               vraie 404
    sitemap.ts · robots.ts
    api/demandes/route.ts       seulement si la cible exécute Node (voir §3)
  components/ui/ · components/layout/ · components/sections/
  content/                      services.ts · realisations.ts · formations.ts (données typées)
  lib/contact.ts                coordonnées uniques
  lib/validation.ts             schémas partagés client/serveur
  lib/mailer.ts                 envoi email côté serveur
  public/                       logo officiel, médias optimisés, favicon
  docs/                         AUDIT · INVENTAIRE · PLAN-MIGRATION · suite
  _studio/                      fiche client et livrables du studio
  next.config.ts                redirection /about → /agence
  .env.example                  noms des variables, sans valeur
```

Principes :
- Pages en composants serveur ; seuls le formulaire, le menu mobile et les scènes animées sont des composants client.
- Contenu dans `content/`, sans CMS pour cette première version.
- Pas de base de données tant qu'un besoin réel n'est pas démontré.

## 3. Déploiement : contraintes à lever

Ce que dit la documentation officielle Hostinger (consultée le 12/10/2026) :
- Les **Node.js Web Apps** sont disponibles sur les offres **Business Web Hosting** et **Cloud** (Startup, Professional, Enterprise, Enterprise Plus).
- Next.js y figure, avec Node 18, 20, 22 et 24.
- Déploiement par GitHub ou par fichier ZIP.
- Un site Node.js doit être créé **comme un nouveau site web**. Pour un domaine existant, il faut d'abord retirer le site en place.
- Les offres VPS demandent une configuration manuelle.

Ce qui reste inconnu [H] : l'offre exacte de Majeli Connect. Le site actuel tourne sur Horizons, qui n'est pas forcément l'une de ces offres. Le fait d'avoir un domaine chez Hostinger ne prouve pas que Node.js est disponible.

| Cas | Mode Next.js | Formulaire | Conséquence |
|---|---|---|---|
| A. Offre Business ou Cloud confirmée | Serveur Node (`next start`) | `app/api/demandes/route.ts` + SMTP de la boîte Hostinger | Recommandé. Bascule à préparer : il faut retirer le site Horizons du domaine, donc prévoir une fenêtre et un retour arrière |
| B. Hébergement statique seulement | `output: 'export'` | **Backend externe obligatoire** (fonction serverless ou service de formulaires) ; pas de route `/api` locale | Pas d'en-têtes ni de redirections côté serveur ; `/about` → `/agence` via `.htaccess` |
| C. VPS | Node + reverse proxy, configuration manuelle | Route API + SMTP | Plus de maintenance |

[R] Confirmer d'abord l'offre (hPanel → Hébergement → détails du plan) et l'existence d'une boîte email `contact@majeliconnect.com` utilisable en SMTP. Le code doit être écrit pour la cible réelle : pas de route serveur si la cible est statique.

## 4. PocketBase : flux utiles et sauvegarde

Flux réellement utilisé [V] : **un seul**. Création publique d'un enregistrement `contacts` (nom, email, message) depuis `/contact`, puis email de confirmation au visiteur. Aucune autre collection n'est lue ni écrite par le site. Ni comptes ni authentification ne sont utilisés côté front.

[R] **Ne pas reconduire PocketBase dans la refonte.** Pour un formulaire de demande, il ajoute un serveur à maintenir, et sa version actuelle dépend de Horizons (chemin `/hcgi/platform`, mailer interne, tableau de bord sur CDN). Le flux cible :
1. validation serveur ;
2. pot de miel et limite par IP ;
3. email à l'agence (et accusé de réception court, sans recopier le message) ;
4. journal minimal ;
5. réponse « reçu » **uniquement après l'envoi effectif** ;
6. en cas d'échec : message conservé dans le formulaire et proposition WhatsApp.

Un stockage (base MySQL Hostinger, Google Sheet, CRM) ne s'ajoute que si l'agence en a besoin pour le suivi.

Sauvegarde avant migration, **avant toute bascule du domaine** :
1. Dans le tableau de bord PocketBase de Horizons, exporter les enregistrements de `contacts` (CSV/JSON) ou créer une sauvegarde complète (Settings → Backups). [H] Il faut vérifier que Horizons expose ces fonctions : la migration initiale active `hideControls`.
2. Conserver une copie de l'export Horizons actuel (ce dossier) en archive ZIP datée.
3. Noter les règles et réglages actuels (captures d'écran) pour garder une trace.
4. Ne pas réimporter les demandes dans le nouveau site : les traiter, puis les archiver hors du site. Ce sont des données personnelles ; on n'en garde que ce qui est utile.

## 5. Ordre des travaux

1. Corrections immédiates (§0), dans Horizons.
2. Décision d'hébergement (§3) et réception des éléments manquants (§6).
3. Conception (prompt 2) : sitemap, contenus, design system, plan de mouvement, aperçu.
4. Développement Next.js (prompt 3) dans `majeli-connect-next/`.
5. Recette (prompt 5), puis bascule avec sauvegarde, redirection `/about` et retour arrière prêts.

## 6. Données et fichiers réellement manquants

| Élément | Pour quoi | Bloquant pour |
|---|---|---|
| Logo officiel (SVG, ou PNG ≥ 1000 px de large, fond transparent) + favicon | Header, partage, favicon | Conception |
| Offre Hostinger exacte et accès hPanel (pas de mot de passe dans le chat) | Choisir le mode de rendu | Développement |
| Boîte email d'envoi (SMTP) et adresse de réception des demandes | Flux de demandes | Développement |
| Captures et médias des projets (Casa Impact, AMEG, Good House, Akoya Hair, DocTrack sans données personnelles, Teranga Box, Sinai Security) + statut et lien de chacun | Page Réalisations, cas clients | Conception |
| Fonctionnalités réellement livrées pour Casa Impact et AMEG | Cas clients | Conception |
| Périmètres maintenance, réseaux et formations (zone, délais, matériels, modalités, publics) | Fiches services et formations | Contenus |
| Équipe : noms, rôles, photos validées (facultatif) | Page L'agence | Contenus |
| URL des réseaux sociaux | Footer | Contenus |
| Adresse confirmée (« Dakar, Liberté 5 ») | Contact, données structurées | Publication |
| Mentions légales : raison sociale, RCCM, NINEA, responsable de publication | Pages juridiques | Publication |
| Export des demandes PocketBase existantes | Sauvegarde | Bascule |
| Liste des URL indexées (Search Console) | Redirections | Bascule |
| Accès Google Search Console / outil d'audience souhaité | Mesure après refonte | Publication |
