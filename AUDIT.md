# Majeli Connect — Audit du code exporté (Hostinger Horizons)

Date : 12 octobre 2026 · Source : `C:\Users\HP\Downloads\Majeli Connect Site` (export Horizons, lu sans modification) · Méthode : `majeli-web-studio`, phase 1.

## Légende et conditions

- **[V] Vérifié** : constaté dans le code, la base locale, le build ou un test exécuté dans cette session (fichier et ligne cités).
- **[H] Hypothèse** : probable, mais non prouvé ici (en général : l'état de la production).
- **[R] Recommandation**.

Ce qui a été exécuté, sur une **copie** de l'export dans l'espace de travail de Claude :

| Contrôle | Résultat |
|---|---|
| `npm ci` (Node 22.22, npm 10.9) | 538 paquets installés, sans erreur |
| `npm run build` (Vite 7.3.1) | réussi : JS 478 Ko (152 Ko gzip), CSS 79 Ko (13,6 Ko gzip), un seul bundle |
| `npm run lint` | aucune erreur |
| `npm run dev` à la racine | **échoue** : `pocketbase: not found`, puis `--kill-others` arrête aussi Vite |
| Prévisualisation du build + Playwright/Chromium | captures à 360, 390, 768, 1024, 1440 px ; mouvement réduit ; parcours clavier ; JavaScript coupé |
| `contrast_check.py`, `preflight.py`, `knip` | résultats repris ci-dessous |
| Base `apps/pocketbase/pb_data/data.db` | schéma et règles lus ; **aucun contenu personnel affiché** (la base locale contient 0 demande) |

Limites :
- L'espace de travail ne peut pas joindre majeliconnect.com, horizons-cdn.hostinger.com, Unsplash ni Google Fonts. Les captures ont donc été faites **sans images ni polices**. Les seules erreurs console relevées viennent de ces blocages (`ERR_TUNNEL_CONNECTION_FAILED`) : ce n'est pas un défaut du site.
- **Lighthouse : non mesuré.** Pour obtenir la mesure : PageSpeed Insights, profil mobile, 3 passes sur `/` et `/contact`, en notant la médiane.
- Aucune demande n'a été soumise, ni en local ni en production. Les règles d'accès de la **production** n'ont pas été testées.

## 1. Besoin

| | |
|---|---|
| Objectif business | Obtenir des demandes qualifiées (projet, intervention, formation) d'entreprises et d'organisations au Sénégal |
| Cible principale | Dirigeants de PME, d'ONG, d'institutions et du secteur de l'hôtellerie, majoritairement sur mobile |
| Action attendue | Envoyer une demande qualifiée ou ouvrir WhatsApp vers le bon numéro |
| Objections | 1. « Avez-vous déjà fait ce genre de projet ? » (aucune réalisation n'est montrée) · 2. « Qui êtes-vous ? » (aucune équipe présentée) · 3. « Que proposez-vous exactement, et à quel coût ? » |
| Preuves disponibles | Projets du brief (Casa Impact, AMEG, Good House, Akoya Hair, DocTrack, Teranga Box, Sinai Security) ; médias à fournir |
| Contraintes | Hébergement Hostinger (offre à confirmer), site en français, mise à jour du contenu par l'agence |

## 2. Grille de notation (0 à 4)

| Axe | Note | Observation factuelle | Preuve |
|---|---|---|---|
| Message | 1 | Le hero « Propulsez votre marque dans l'ère digitale » pourrait appartenir à n'importe quelle agence ; aucune réalisation | `HomePage.jsx:93` |
| Parcours | 2 | Le CTA mène au formulaire en 1 clic, mais le formulaire ne qualifie rien et le WhatsApp de /contact vise un mauvais numéro | `ContactForm.jsx:139` |
| Design | 2 | Base cohérente mais composition de gabarit (cartes shadcn, photos d'illustration) | captures `accueil-*.png` |
| Mobile | 2 | Pas de débordement à 360/390 px ; débordement à 768 px ; nombreuses zones tactiles sous 44 px | `visual_check` |
| Performance | – | Non mesuré (voir limites). JS initial 152 Ko gzip, sous le budget de 200 Ko | build |
| SEO | 1 | HTML vide sans JavaScript : ni titre, ni description, ni h1 ; pas de canonical, d'Open Graph ni de JSON-LD | `dist/index.html`, test JS coupé |
| Accessibilité | 2 | `lang="fr"` et attributs alt présents, focus visible ; contrastes des CTA insuffisants, bouton menu sans nom | contrastes, sonde clavier |
| Technique | 1 | Règles d'accès PocketBase dangereuses, scripts de l'éditeur Horizons en production, aucune 404 | ci-dessous |
| **Total** | **11/28** | Performance non notée | |

## 3. Constats

### Critique

**C1 — Toute personne peut créer un compte puis lire, modifier ou supprimer les demandes de contact.** [V] dans le schéma exporté, [H] pour la production.
- `pb_migrations/1775755925_001_created_contacts.js` : `listRule`, `viewRule`, `updateRule` et `deleteRule` valent `"@request.auth.id != ''"`. Autrement dit, **n'importe quel utilisateur authentifié** y a accès.
- La base exportée contient une collection d'authentification `users` avec `createRule: ""` (inscription publique), l'authentification par mot de passe activée et `authRule: ""` (aucune vérification d'email exigée).
- Conséquence : un visiteur peut s'inscrire via l'API `/hcgi/platform/api/collections/users/records`, s'authentifier, puis lister, modifier ou supprimer les noms, emails et messages des prospects. C'est un risque de fuite de données personnelles.
- [R] **À corriger dès maintenant, sans attendre la refonte**, dans le tableau de bord PocketBase de Horizons : verrouiller (cadenas fermé = superusers uniquement, valeur `null`) les règles list, view, update et delete de `contacts`, ainsi que la règle create de `users` (le site n'a besoin d'aucune inscription). Attention : dans PocketBase, une règle **vide** `""` signifie « public ». Ce n'est pas la même chose qu'une règle verrouillée. Ne pas tester cette faille sur la production avec de vraies données : vérifier seulement les règles affichées dans le tableau de bord.

**C2 — Le bouton WhatsApp et le lien téléphone de la page Contact visent un mauvais numéro.** [V]
- `src/components/ContactForm.jsx:139` → `https://wa.me/221782634338`
- `src/pages/ContactPage.jsx:22` → `tel:+221782634338`
- Partout ailleurs, le numéro est `221782643438` : `Header.jsx:56` et `:89`, `FloatingWhatsAppButton.jsx:8`, `Footer.jsx:62`. Le texte affiché est `+221 78 264 34 38`.
- Correction préparée (deux lignes, à appliquer dans Horizons) :

```diff
--- src/components/ContactForm.jsx
-        <a href="https://wa.me/221782634338" target="_blank" rel="noopener noreferrer">
+        <a href="https://wa.me/221782643438" target="_blank" rel="noopener noreferrer">
--- src/pages/ContactPage.jsx
-      link: 'tel:+221782634338',
+      link: 'tel:+221782643438',
```

[R] Dans la refonte, un seul fichier `lib/contact.ts` alimentera tous les liens.

### Haute

**H1 — L'agence n'est prévenue d'aucune demande ; un email de confirmation exploitable est envoyé à l'adresse saisie.** [V] code, [H] comportement en production.
- `ContactForm.jsx:51` enregistre la demande dans la collection `contacts`. Le toast « Message envoyé avec succès » s'affiche après la réponse du serveur : la demande est donc réellement **stockée**.
- Le seul hook (`pb_hooks/contact-confirmation.pb.js`) envoie un email **à l'adresse saisie par le visiteur**, en anglais (« We received your message »). Il y insère `name` et `message` **sans échappement HTML**. Aucun email n'est adressé à contact@majeliconnect.com.
- Conséquences : des demandes peuvent rester inaperçues si personne ne consulte le tableau de bord ; un tiers peut se servir du formulaire pour envoyer des emails, avec du HTML injecté, à n'importe quelle adresse. La seule limite est la règle générale de 200 requêtes par 5 minutes (`1769164585_set_rate_limits.js`), et il n'y a ni pot de miel ni captcha.
- [H] Si l'envoi de l'email échoue, l'exception du hook peut faire répondre une erreur au visiteur alors que la demande est déjà enregistrée, ce qui l'incite à renvoyer un doublon. À tester sur un environnement de test.
- [R] Dans la refonte : notifier l'agence, ne pas renvoyer le message tel quel au visiteur, échapper les champs, ajouter un pot de miel et une limite par IP.

**H2 — Pour Google et les aperçus de partage, le site est vide sans JavaScript.** [V]
- `apps/web/index.html` et `dist/apps/web/index.html` ne contiennent ni `<title>` ni description. Les titres arrivent par `react-helmet`, après exécution du JavaScript.
- Avec JavaScript coupé, la page `/contact` affiche 0 caractère et aucun h1 (test Playwright). La page d'accueil en production renvoie le même HTML vide (lecture de `https://majeliconnect.com/`).
- Absents : canonical, Open Graph, JSON-LD.
- `sitemap.xml` et `robots.txt` existent en production (4 URL, `Allow: /`) mais **pas dans l'export** : Hostinger les génère au déploiement.
- [R] La refonte Next.js doit rendre le HTML côté serveur ou statiquement.

**H3 — Aucune page 404 : toute URL renvoie 200 et une page vide.** [V]
- `public/.htaccess` réécrit toute URL inconnue vers `index.html`, et `App.jsx` n'a pas de route `*`.
- `/page-inexistante` affiche une page crème vide, avec le seul bouton WhatsApp, sans h1 ni titre (capture `page-inexistante-390.png`). Cela crée des « soft 404 » pour Google et une impasse pour le visiteur.

**H4 — Trois liens sociaux factices.** [V] `Footer.jsx:72`, `:75` et `:78` : `href="#"`, icônes Facebook, LinkedIn et Twitter sans texte ni `aria-label`. Le clavier les atteint et ils ne mènent nulle part.

**H5 — Contrastes insuffisants sur les actions principales.** [V] (`contrast_check.py`)

| Paire | Rapport | Seuil |
|---|---|---|
| Blanc sur l'ocre codé `#BD7328` (tous les boutons « Démarrer un projet ») | 3,72:1 | 4,5:1 |
| Blanc sur l'ocre officiel `#BC6C25` | 4,0:1 | 4,5:1 |
| Vert WhatsApp `#25D366` sur le header `#FFFBE3` (bouton « WhatsApp ») | 1,90:1 | 4,5:1 |
| Icône blanche sur `#25D366` (bouton flottant) | 1,98:1 | 3:1 |

[R] Dans la charte officielle, aucune paire n'atteint 4,5:1 entre l'ocre et le blanc ou le vert. L'ocre doit servir aux accents, aux textes très grands et aux fonds avec texte vert foncé en gros caractères. Les CTA en texte courant seront vert foncé `#283618` sur crème (12,2:1) ou crème sur vert foncé. Une teinte d'ocre plus sombre pourra être proposée comme « extension » à valider.

### Moyenne

**M1 — Débordement horizontal à 768 px.** [V] Largeur du document : 802 px. En cause : `div.hidden.md:flex` du header (WhatsApp + « Démarrer un projet »). Le menu complet s'affiche dès `md` et « À propos » passe sur deux lignes (capture `accueil-768.png`).

**M2 — Zones tactiles trop petites sur mobile.** [V] 10 à 14 par page sous 44 px à 360 et 390 px : bouton menu 32×36, champs et bouton d'envoi hauts de 36 px, liens du footer hauts de 17 px.

**M3 — Le menu mobile n'est pas accessible.** [V] Le bouton menu n'a aucun nom accessible (`Header.jsx:68`, `aria-label` absent, texte vide). Le panneau n'a pas de titre et son bouton de fermeture s'annonce « Close » en anglais (`components/ui/sheet.jsx:54`).

**M4 — Formulaire peu accessible et non qualifiant.** [V]
- Les champs n'ont ni `required`, ni `aria-invalid`, ni `aria-describedby`, ni `autocomplete` (sonde Playwright). Les erreurs ne sont pas annoncées aux lecteurs d'écran.
- Après un succès, la page renvoie vers l'accueil au bout de 1,5 s (`ContactForm.jsx:54`).
- Seuls trois champs existent : nom, email, message.

**M5 — Les couleurs codées s'écartent de la charte officielle.** [V] Les jetons HSL de `src/index.css` donnent :

| Jeton | Couleur obtenue | Couleur officielle |
|---|---|---|
| fond | `#FAF6EB` | `#FEFAE0` |
| vert | `#263715` | `#283618` |
| olive | `#647043` | `#606C38` |
| ocre | `#BD7328` | `#BC6C25` |

S'y ajoutent un fond de header codé en dur `#FFFBE3` (`Header.jsx:21`) et un gris neutre `#F5F5F5` pour les sections « muted », qui n'appartient pas à la charte.

**M6 — Pas de gestion du mouvement réduit.** [V] Framer Motion est utilisé dans 9 fichiers sans `MotionConfig`, `useReducedMotion` ni media query, et `html { scroll-behavior: smooth }` s'applique sans condition (`index.css`). Le contenu reste toutefois visible après l'animation, y compris en mode réduit (vérifié).

**M7 — Le code de l'éditeur Horizons part en production.** [V]
- `vite.config.js` injecte 5 scripts dans `index.html`, **build compris** (`addTransformIndexHtml`). Ils réécrivent `window.onerror`, `console.error`, `console.warn` et `window.fetch`, et envoient `postMessage(..., '*')` à la fenêtre parente.
- Les polices passent par `@import` CSS (Poppins 5 graisses + Inter 4 graisses), chaîne bloquante.
- [H] Effet sur les performances à mesurer.

**M8 — Favicon absent.** [V] `index.html` référence `/vite.svg`, qui n'existe pas dans `public/`. En prévisualisation, l'URL renvoie du HTML.

**M9 — Visuels présentés comme l'équipe.** [V] Les attributs alt annoncent « Équipe Majeli Connect en réunion » (`HomePage.jsx:80`) et « Équipe Majeli Connect » (`AboutPage.jsx:53`). [H] Il s'agit probablement d'images générées ou de banque d'images. À confirmer avant de les réutiliser. L'image Unsplash de /services est appelée sans paramètre de taille (`ServicesPage.jsx:68`) ; son poids n'a pas pu être mesuré ici.

**M10 — `llms.txt` incomplet.** [V] Le générateur (`tools/generate-llms.js`) coupe la description de /services à l'apostrophe (« Découvrez l ») et ne liste que 2 pages sur 4.

### Basse

- **B1 — Dépôt Git local à nettoyer avant tout push.** [V] L'index (`.git/index`) contient 33 903 fichiers, dont 33 723 sous `node_modules/` et les bases `pb_data/` (avec le compte superuser haché). Aucun commit n'existe encore (`refs/heads` vide). [R] Ne rien pousser en l'état ; ignorer `node_modules/` et `apps/pocketbase/pb_data/` avant le premier commit.
- **B2 — Code mort.** [V] (`knip`) : `ServiceCard`, `StatCard`, `TeamMemberCard` et `TestimonialCard` ne sont pas utilisés ; les dépendances `zod`, `@hookform/resolvers` et `date-fns` non plus ; sur les 55 composants `ui/`, les pages n'en utilisent directement que 7.
- **B3** [V] — L'année du footer « © 2026 » est écrite en dur.
- **B4** [V] — Sur l'accueil, la section valeurs et le CTA final ont le même fond `bg-muted` : rythme plat.
- **B5** [V] — À 360 px, le document de /contact mesure 373 px (décalage `x: 30` de l'animation). `overflow-x: clip` le masque.

## 4. Inventaire des contenus (verdicts)

| URL | Titre actuel | Verdict | Remarque |
|---|---|---|---|
| `/` | Majeli Connect - L'agence qui donne vie à votre marque | Réécrire | Hero générique ; 4 services ; 4 valeurs sans preuve |
| `/services` | Nos Services - Majeli Connect | Réécrire | 6 cartes centrées sur les technologies ; manquent l'IA, la maintenance, les réseaux et les formations |
| `/about` | À propos - Majeli Connect | Réécrire → `/agence` | Mission et valeurs génériques ; pas d'équipe |
| `/contact` | Contact - Majeli Connect | Réécrire | Coordonnées à garder, formulaire à refaire |

Le détail des textes et des médias se trouve dans INVENTAIRE.md.

## 5. Synthèse

**Forces à conserver** : 1. navigation courte et claire ; 2. CTA et WhatsApp toujours accessibles ; 3. palette crème, vert et ocre déjà associée à la marque.

| # | Problème | Correction | Effort | Gain mesurable |
|---|---|---|---|---|
| 1 | C1 : règles d'accès aux demandes | Règles superuser seulement, inscription fermée | S (Horizons) | 0 accès public aux données des prospects |
| 2 | C2 : mauvais numéro WhatsApp et téléphone | 2 lignes, puis fichier de contact unique | S | 100 % des liens vers 221782643438 |
| 3 | H1 : aucune notification de l'agence | Email à l'agence + anti-abus | M | Chaque demande reçue par email |
| 4 | H2/H3 : SEO vide, pas de 404 | Rendu serveur Next.js + `not-found` | L (refonte) | Titre, description et h1 dans le HTML ; vraie 404 |
| 5 | Message sans preuve | Réalisations et offre en 5 pôles | L (refonte) | Au moins 2 cas clients publiés |

**Périmètre recommandé** : C1 et C2 se corrigent tout de suite dans Horizons. Pour le reste, la refonte complète en Next.js, déjà décidée, est justifiée : les problèmes SEO, 404 et backend tiennent à l'architecture du site, pas seulement au message.
