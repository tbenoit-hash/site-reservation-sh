# Site de réservation en direct — SH Développement

Site statique généré depuis tes données **Hostaway** (122 logements réels).

## Ouvrir le site
Double-clique sur `index.html`, ou pour un rendu parfait lance un petit serveur :
```bash
cd ~/Downloads/site
python3 -m http.server 8000
# puis ouvre http://localhost:8000
```

## Mettre à jour les logements (nouvelles annonces, photos, prix…)
```bash
cd ~/Downloads
set -a && source .env && set +a
python3 build_site.py
```
Le site se régénère entièrement depuis Hostaway. (Ajoute `USE_CACHE=1` devant la commande pour réutiliser le dernier export sans rappeler l'API.)

## Personnaliser
Tout est en haut de `build_site.py`, section **CONFIG MARQUE** :
- `BRAND_NAME`, `BRAND_TAGLINE` — nom et accroche
- `CONTACT_EMAIL` — email qui reçoit les demandes de réservation
- `BOOKING_PHONE` — ex `+33612345678` → active un bouton **Réserver par WhatsApp**
- Couleurs : dictionnaire `COLORS`

Ces 3 derniers peuvent aussi être passés en variables d'environnement :
```bash
BOOKING_PHONE="+33612345678" BOOKING_EMAIL="resa@sh-developpement.fr" python3 build_site.py
```

## Paiement en ligne (moteur Hostaway)
Aujourd'hui, le bouton envoie une **demande de réservation** (email pré-rempli + WhatsApp).
Pour activer le **paiement en ligne immédiat** :
1. Dans Hostaway : *Channel Manager → Booking Engine* → active-le et publie-le.
2. Récupère l'URL de ton moteur (ex. `https://reservation.sh-developpement.fr`).
3. Régénère le site avec :
   ```bash
   BOOKING_ENGINE_BASE="https://reservation.sh-developpement.fr" python3 build_site.py
   ```
   Les boutons basculeront automatiquement vers le checkout Hostaway (calendrier, prix réel, paiement).

## Héberger en ligne (gratuit / simple)
- **Netlify / Vercel** : glisse-dépose le dossier `site/` → ton site est en ligne en 30 s.
- **OVH / hébergement classique** : envoie le contenu de `site/` par FTP dans `www/`.
- Branche ensuite ton nom de domaine (ex. `reservation.sh-developpement.fr`).

## Structure
- `index.html` — accueil (hero, recherche, filtres, grille)
- `logement/<id>.html` — une page par logement (galerie, équipements, carte, réservation)
- `assets/style.css`, `assets/app.js` — design & interactions
- `data/listings.json` — données utilisées par la recherche
