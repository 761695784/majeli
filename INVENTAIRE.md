# Majeli Connect — Inventaire de l'export Horizons

Date : 12 octobre 2026 · Source : `C:\Users\HP\Downloads\Majeli Connect Site`. Tout est vérifié dans le code, sauf mention [H].

## 1. Structure et outillage

| Élément | Valeur |
|---|---|
| Racine | Monorepo npm workspaces (`apps/*`), `package.json` nommé `monorepo` |
| Gestionnaire de paquets | npm (`package-lock.json`) ; Node `22` (`.nvmrc`) ; `.version` = 55 (version Horizons) [H] |
| Front | `apps/web` : Vite 7.3.1, React 18.3.1, React Router 7.13.2, Tailwind 3.4.19, Framer Motion 11.18.2, react-helmet 6.1.0, shadcn/ui (Radix), lucide-react 0.469, sonner 2.0.7 |
| Backend | `apps/pocketbase` : PocketBase **0.40.4** (`.pocketbase-version`), SDK JS 0.25.2 ; **binaire absent de l'export** |
| URL de l'API côté client | `/hcgi/platform` (`src/lib/pocketbaseClient.js`) : chemin servi par Horizons ; aucun proxy Vite en local |
| Scripts racine | `dev` (Vite + PocketBase, `--kill-others`) · `build` (web) · `start` (PocketBase) · `lint` |
| Scripts web | `dev` : `vite --port 3000` · `build` : `generate-llms.js` + `vite build` → `dist/apps/web` · `start` : `vite preview` |
| Build vérifié | `index.html` 8,2 Ko · `index-*.js` 478 Ko (152 Ko gzip) · `index-*.css` 79 Ko (13,6 Ko gzip) · `llms.txt` · `.htaccess` |
| Hébergement actuel | Statique Apache/LiteSpeed (`public/.htaccess` : réécriture SPA + en-tête `X-Powered-By: Hostinger Horizons`), PocketBase hébergé par Horizons [H] |
| Spécifique Horizons, non réutilisable | `plugins/` (éditeur visuel, journal de session, site-pages, auth PocketBase pour l'iframe), scripts injectés par `vite.config.js`, `tools/install-missing-components.js`, hooks `builder-mailer`, `external-dashboard`, `logs-forwarder`, `custom-migrations-cmd` |

## 2. Routes

| Route | Composant | Titre (`react-helmet`) | Description | Devenir |
|---|---|---|---|---|
| `/` | `pages/HomePage.jsx` | Majeli Connect - L'agence qui donne vie à votre marque | Majeli Connect vous accompagne dans votre transformation digitale, création de sites web, branding et stratégie sur mesure. | Conservée |
| `/services` | `pages/ServicesPage.jsx` | Nos Services - Majeli Connect | Découvrez l'ensemble de nos services : Branding, … Applications Mobiles. | Conservée |
| `/about` | `pages/AboutPage.jsx` | À propos - Majeli Connect | Découvrez Majeli Connect, votre partenaire de confiance… | **301 → `/agence`** |
| `/contact` | `pages/ContactPage.jsx` | Contact - Majeli Connect | Contactez Majeli Connect pour discuter de votre projet… | Conservée |
| `*` | aucune | – | – | Aujourd'hui : 200 + page vide. À remplacer par une vraie 404 |

Sitemap de production (lu en ligne) : 4 URL (`/`, `/services`, `/about`, `/contact`), datées du 10 avril 2026. `robots.txt` : `Allow: /` avec le sitemap. Ces deux fichiers ne sont pas dans l'export.

[À FAIRE] Avant d'écrire la table de redirections définitive : exporter de Google Search Console la liste des URL connues de Google. D'éventuelles anciennes URL antérieures à Horizons peuvent exister [H].

## 3. Composants

| Fichier | Utilisé | Rôle / remarque |
|---|---|---|
| `components/Header.jsx` | oui | Logo (CDN), navigation, WhatsApp, CTA, menu mobile (Sheet) ; fond `#FFFBE3` codé en dur |
| `components/Footer.jsx` | oui | Texte, liens rapides, coordonnées, **3 liens sociaux `#`** |
| `components/ContactForm.jsx` | oui | Formulaire nom/email/message → PocketBase `contacts` ; WhatsApp **221782634338 (faux)** |
| `components/FloatingWhatsAppButton.jsx` | oui | Bouton flottant, `wa.me/221782643438` |
| `components/ScrollToTop.jsx` | oui | Remonte en haut à chaque changement de route |
| `components/ServiceCard.jsx`, `StatCard.jsx`, `TeamMemberCard.jsx`, `TestimonialCard.jsx` | **non** | Code mort (knip) |
| `components/ui/*` (55 fichiers shadcn) | 7 utilisés directement | button, card, input, label, textarea, sheet, sonner ; les autres ne servent qu'entre eux ou à rien |
| `hooks/use-mobile.jsx`, `hooks/use-toast.js` | non vérifié | Gabarit shadcn |

## 4. Contenus textuels (à reprendre ou réécrire)

### Accueil
- **H1** : « Propulsez votre marque dans l'ère digitale ». Sous-titre : « Des solutions innovantes et sur mesure pour transformer votre vision en réalité. » CTA : « Démarrer un projet ». → Réécrire (voir le brief, §3).
- **Nos Services Clés** (4) :
  - Branding et Identité Visuelle
  - Développement de site et Plateforme Web
  - Transformation et stratégie digitale
  - Création d'API

  → Remplacer par les 5 pôles.
- **L'agence qui donne vie à votre marque** : « Notre conviction : chaque projet est unique » + 2 paragraphes. → Réécrire, puis reprendre l'idée sur la page L'agence.
- **Valeurs** (4) : Stratégie, Créativité, Technologie, Croissance. → À fusionner avec la méthode, ou à supprimer.
- **CTA final** : « Travaillons ensemble ». → Garder l'intention.

### Services
- **H1** « Notre Expertise ». Six cartes, avec leurs listes de livrables :
  - Branding : logo, charte, identité, supports
  - Community Management : animation, contenu, modération, reporting
  - Design UI/UX : maquettes Figma, prototypage, tests utilisateurs, design system
  - Développement Web : React/Next.js, Laravel/Angular, Django/Vue.js, WordPress/SEO
  - Création d'API : REST, intégrations, base de données, maintenance
  - Applications Mobile : React Native, UI/UX, publication sur les stores, maintenance

  → Réécrire les cartes en fiches orientées besoin. « Tests utilisateurs » ne sera publié que si la prestation est réellement fournie.

### À propos
- **H1** « À propos de nous ».
- **Mission** : 3 paragraphes.
- **Valeurs** (4) : Innovation, Excellence, Partenariat, Résultats. « Résultats concrets et mesurables » ne doit pas être publié sans chiffre à l'appui.
- CTA.

→ Réécrire en `/agence` avec l'équipe (4 membres, photos seulement si elles sont validées).

### Contact
- **H1** « Contactez-nous ». Formulaire, puis cartes Email, Téléphone/WhatsApp et Adresse.
- **Coordonnées affichées** :
  - email : `contact@majeliconnect.com`
  - téléphone et WhatsApp : `+221 78 264 34 38`
  - adresse : « Dakar, Liberté 5 »

  → Garder, adresse à confirmer.

### Footer
- Accroche : « Votre partenaire de confiance pour la transformation digitale… »
- © 2026 en dur.

## 5. Médias

Aucune image ni aucun logo n'est stocké dans l'export : `public/` ne contient que `.htaccess`. Tous les médias sont appelés à distance. Leurs poids n'ont pas pu être mesurés (réseau bloqué depuis l'espace de travail).

| Usage | URL | Statut |
|---|---|---|
| Logo (header) | `horizons-cdn.hostinger.com/643fe87e-…/2de5c91482ef30998934b1fb9e47f01e.png` | **Fichier original à fournir** (SVG ou PNG haute définition) ; ne pas réutiliser une copie recompressée |
| Hero Accueil (alt « Équipe Majeli Connect en réunion ») | `…/72a25d2054122f3dd4cf5f50e489cd16.png` | Origine à confirmer ; probablement pas l'équipe réelle [H] |
| Hero À propos (alt « Équipe Majeli Connect ») | `…/31b30863d141f7bd88c1526628becdcd.png` | Idem |
| Hero Contact (alt « Bureau moderne Majeli Connect ») | `…/efbbcd56489ae34ecb8574dec7f829c2.png` | Idem |
| Hero Services | `images.unsplash.com/photo-1607615896122-6c919f897e55` | Photo de banque Unsplash ; à remplacer par des captures de projets |
| Favicon | `/vite.svg` | **Absent** |
| Polices | Google Fonts : Poppins (400 à 800) + Inter (300 à 600) | À auto-héberger (`next/font`) si on les garde |

## 6. Backend PocketBase

### Collections (base locale `pb_data/data.db`)

| Collection | Type | Lignes en local | list / view | create | update / delete |
|---|---|---|---|---|---|
| `contacts` | base | 0 | `@request.auth.id != ''` | `""` (public) | `@request.auth.id != ''` |
| `users` | auth | 0 | `id = @request.auth.id` | **`""` (inscription publique)** | `id = @request.auth.id` |
| `_superusers` | auth système | 1 | – | – | – |
| `_mfas`, `_otps`, `_externalAuths`, `_authOrigins` | système | 0 | propriétaire | – | – |

Champs de `contacts` : `id`, `name` (texte, requis, 255 caractères max), `email` (email, requis), `message` (texte, requis, sans limite), `created`, `updated`.

**Les vraies demandes sont en production** (dossier `/data` chez Horizons, d'après le script `start`). La base locale est vide. Le nombre de demandes réellement reçues est inconnu.

### Hooks (`pb_hooks/`)

| Fichier | Effet | Utile pour la refonte |
|---|---|---|
| `contact-confirmation.pb.js` | Après création d'un contact : email en anglais au visiteur avec son message (HTML non échappé) | Non : à remplacer |
| `builder-mailer.pb.js` | Si SMTP désactivé : envoi via l'API mail interne de Horizons (`BUILDER_MAILER_*`) | Non : spécifique à Horizons |
| `external-dashboard.pb.js` | Sert l'interface d'administration depuis le CDN Horizons | Non |
| `logs-forwarder.pb.js` | Journaux vers stdout ou le journal de session | Non |
| `custom-migrations-cmd.pb.js` | Commande `horizons migrations:revert` | Non |

### Migrations (`pb_migrations/`)
Six migrations :
- réglages initiaux (appURL `*.app-preview.com/hcgi/platform`, journaux 7 jours, IP journalisées) ;
- création du superuser depuis l'environnement ;
- alertes d'authentification désactivées (×2) ;
- limites de requêtes (200 requêtes / 5 min sur `/api`, règles d'authentification) ;
- création de `contacts`.

### Variables d'environnement référencées (noms seulement, aucune valeur lue)
`PB_ENCRYPTION_KEY`, `PB_SUPERUSER_EMAIL`, `PB_SUPERUSER_PASSWORD`, `BUILDER_MAILER_SENDER_ADDRESS`, `BUILDER_MAILER_API_URL`, `BUILDER_MAILER_API_KEY`, `NODE_ENV`, `TEMPLATE_BANNER_SCRIPT_URL`, `TEMPLATE_REDIRECT_URL`, `TEMPLATE_BANNER_MAIN_TEXT`, `TEMPLATE_BANNER_CTA_TEXT`, `TEMPLATE_BANNER_THEME`. Les réglages PocketBase (SMTP, expéditeur) sont **chiffrés** dans `_params` : leur contenu n'est pas lisible sans la clé, et il n'a pas été cherché.

## 7. Intégrations externes

| Intégration | Où | Remarque |
|---|---|---|
| WhatsApp `wa.me` | header, bouton flottant, formulaire | Un lien faux (formulaire) |
| `tel:` / `mailto:` | footer, contact | Un `tel:` faux (page Contact) |
| Google Fonts | `index.css` (`@import`) + `preconnect` | Requête tierce bloquante |
| CDN Horizons | logo et visuels | Dépendance à l'abonnement Horizons |
| Unsplash | hero Services | Image tierce non optimisée |
| Analytics, pixels, CRM | aucun | Aucune mesure d'audience dans le code |
