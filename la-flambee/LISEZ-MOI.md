# La Flambée — nouveau site & plan d'amélioration

Refonte complète du site du restaurant **La Flambée** (Tournus), pensée pour être
offerte clé en main au restaurateur : une seule page moderne, rapide, lisible sur
téléphone, et optimisée pour le référencement local.

## Contenu du dossier

- `index.html` — le site complet (une page, autonome : tout le style est inclus)
- `robots.txt` + `sitemap.xml` — fichiers pour les moteurs de recherche
- `LISEZ-MOI.md` — ce guide

## Voir le site

Double-cliquer sur `index.html`, ou pour un rendu parfait :

```bash
cd la-flambee
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Mettre en ligne

Le plus simple est de **remplacer le contenu de l'hébergement actuel** (le domaine
`restaurant-laflambee-tournus.com` existe déjà et a de l'ancienneté — il faut le
garder, c'est un atout SEO). Déposer par FTP les 3 fichiers à la racine du site.
Sinon : Netlify / Vercel (glisser-déposer le dossier), puis pointer le domaine.

⚠️ Si l'ancien site est remplacé, penser aux **redirections 301** des anciennes
adresses (`/carte-menus-...`, `/contact-...php`, etc.) vers la nouvelle page,
via un fichier `.htaccess` :

```apache
RedirectMatch 301 ^/carte-menus.*$ /#carte
RedirectMatch 301 ^/contact.*$ /#infos
RedirectMatch 301 ^/village-motel.*$ /#groupes
RedirectMatch 301 ^/.*\.php$ /
```

## Charte graphique & contenu

- La **charte reprend celle de la carte 2026** du restaurant (le PDF publié sur
  leur site) : fond blanc/vert sauge, bleu ardoise, typographies épurées, et le
  **logo écusson recréé en SVG** (« Brasserie · La Flambée · Grill · Pizzéria »),
  avec la mention **Maître Restaurateur**.
- **La carte et les prix sont ceux de la carte 2026** (menus 28 € et 38 €,
  formules du midi 17–22 €, menu enfants 9 €, entrées, plats, grill, pizzas).
- **Règle de service affichée** (encadré de la carte + horaires + réservation) :
  menus et formules servis jusqu'à **13h30** le midi et **21h30** le soir ;
  au-delà, service **à la carte uniquement**.

## À vérifier / personnaliser avant mise en ligne

1. **Les horaires** (mardi–samedi, 12h-14h / 19h-22h, repris de la carte) —
   en cas de changement, corriger **à deux endroits** dans `index.html` :
   le tableau des horaires ET le bloc JSON-LD `openingHoursSpecification`.
   Penser aussi à corriger les annuaires qui affichent encore « 7j/7 ».
2. **Les photos** — le site fonctionne sans, mais 4-5 vraies photos (cheminée,
   côte de bœuf, terrasse, salle) le transformeront. Prévoir aussi une photo
   `photos/facade.jpg` : elle sert d'aperçu quand on partage le lien sur
   WhatsApp/Facebook (balise `og:image` déjà en place).
3. L'**adresse email** du restaurant si l'on veut ajouter un contact email.

## Ce que cette refonte améliore (vs l'ancien site)

| | Ancien site | Nouveau site |
|---|---|---|
| Mobile | peu adapté | conçu d'abord pour le téléphone |
| Carte | PDF à télécharger | en HTML, lisible et indexable par Google |
| Réservation | numéro caché dans une page contact | bouton « Appeler » partout (1 clic sur mobile) |
| Titres SEO | identiques sur toutes les pages, suroptimisés | titre unique et naturel |
| Charte | — | alignée sur la carte 2026 (sauge, bleu ardoise, logo écusson) |
| Données structurées | aucune | `schema.org/Restaurant` complet (horaires, adresse, cuisine) |
| Partage WhatsApp/Facebook | lien nu | aperçu riche (balises Open Graph) |
| Sitemap / robots | absents | inclus |
| Poids / vitesse | lourdeur PHP d'époque | 1 page statique, chargement quasi instantané |

## Idées d'amélioration pour aller plus loin (par ordre d'impact)

1. **Fiche Google Business Profile** — c'est LE référencement local d'un
   restaurant (avant même le site). Revendiquer/mettre à jour la fiche :
   horaires exacts, photos récentes, lien vers le site, catégorie « Grill /
   Restaurant français ». Activer le bouton **« Réserver »** de Google
   (gratuit) ou y mettre le numéro en évidence.
2. **Collecter les avis Google** — un petit QR code sur l'addition ou un mot
   sur la table (« Un bon moment ? Dites-le sur Google »). La note et le volume
   d'avis pèsent plus dans le choix des clients que tout le reste du site.
3. **Réservation en ligne** — quand le téléphone déborde le samedi :
   Guestonline, Zenchef ou TheFork Manager (attention aux commissions TheFork).
   Le bouton « Réserver » du site pointera alors vers le module.
4. **Photos professionnelles** — une demi-journée de shooting (feu, plats,
   terrasse) réutilisable partout : site, Google, réseaux sociaux.
5. **Cohérence NAP** (Nom-Adresse-Téléphone) — vérifier que Pages Jaunes,
   Tripadvisor, Justacote, etc. affichent tous les mêmes horaires et le même
   téléphone. Les incohérences actuelles (7j/7 vs mardi-samedi) nuisent à la
   confiance et au classement local.
6. **Une actu par saison** — carte d'automne, menu de la Saint-Valentin,
   ouverture de la terrasse… À publier sur la fiche Google (post) et en une
   ligne sur le site : cela montre que l'établissement est vivant.
7. **Page « menu du jour » partageable** — si la formule du midi change souvent,
   une simple photo du tableau postée sur la fiche Google/Facebook chaque matin
   suffit — inutile de toucher au site.
8. **Passerelle avec le Village Motel et les hébergements locaux** — échanges de
   liens (le motel, les gîtes et locations de Tournus) : bon pour les clients
   comme pour le SEO des deux côtés.
