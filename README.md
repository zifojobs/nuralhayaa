# NAID — Site vitrine premium

Site web statique pour **Nur Alhayaa Interior Design** (Rokhaya Cissé).

---

## Structure du projet

```
naid-website/
├── index.html                       # Accueil
├── a-propos.html                    # À propos
├── services.html                    # Services
├── processus.html                   # Processus
├── realisations.html                # Portfolio avec filtres + lightbox
├── devis-rapide.html                # Mini-quiz devis (6 étapes)
├── contact.html                     # Contact + Calendly + FAQ
├── pitch.html                       # Proposition commerciale (interne)
├── 404.html                         # Page introuvable
├── realisations/
│   ├── projet-villa-dakar.html      # Étude de cas 1
│   └── projet-appartement-paris.html # Étude de cas 2
├── assets/
│   ├── css/styles.css               # Design system complet
│   ├── js/main.js                   # Header, menu, scroll reveal
│   ├── js/gallery.js                # Lightbox + filtres portfolio
│   ├── js/quiz.js                   # Logique du mini-quiz devis
│   └── images/                      # Dossier à remplir (voir prompts-images.md)
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── prompts-images.md                # Prompts IA pour générer les visuels
└── README.md                        # Ce fichier
```

---

## Mise en ligne

### Option 1 — Netlify (recommandé, gratuit)

1. Créer un compte sur [netlify.com](https://www.netlify.com)
2. Glisser-déposer le dossier `naid-website` sur l'écran d'accueil Netlify
3. Le site est en ligne sous une URL type `xyz123.netlify.app`
4. Pour un domaine personnalisé (ex : `nuralhayaa.com`) : **Domain settings → Add custom domain**

### Option 2 — Vercel

1. Créer un compte sur [vercel.com](https://vercel.com)
2. Importer le projet (via GitHub ou upload ZIP)
3. Vercel détecte automatiquement un site statique, aucune config nécessaire

### Option 3 — Hébergement classique (OVH, Hostinger, etc.)

Uploader tout le contenu du dossier `naid-website/` dans le dossier `public_html/` (ou `www/`) via FTP.

---

## Configurations à faire avant mise en ligne

### 1. Formspree (formulaires de contact)

Le site utilise [Formspree](https://formspree.io) pour recevoir les messages des formulaires sans backend.

1. Créer un compte Formspree (gratuit jusqu'à 50 messages/mois)
2. Créer un nouveau formulaire, copier l'ID (ex : `abcd1234`)
3. Remplacer `YOUR_FORM_ID` dans les fichiers suivants :
   - `contact.html`
   - `devis-rapide.html`

Commande rapide (macOS / Linux) :
```bash
grep -rl "YOUR_FORM_ID" . | xargs sed -i '' 's/YOUR_FORM_ID/abcd1234/g'
```

### 2. Calendly (prise de rendez-vous)

1. Créer un compte [Calendly](https://calendly.com)
2. Créer un type d'événement (ex : "Appel découverte — 30min")
3. Récupérer l'URL (format : `calendly.com/nom-utilisateur/appel-decouverte`)
4. Dans `contact.html`, remplacer `YOUR_CALENDLY` par l'identifiant
5. Décommenter le bloc iframe Calendly et retirer le bloc "placeholder"

### 3. Coordonnées de contact

Dans chaque page, mettre à jour :
- Téléphone (actuel : `+221 77 000 00 00`)
- Email (actuel : `naid.deco.contact@gmail.com`)
- Liens sociaux (`#` → vrais liens Instagram / Pinterest / LinkedIn)

### 4. Images

Le site référence des images dans `assets/images/` qui ne sont pas encore créées. Voir **`prompts-images.md`** pour la liste complète des prompts IA et des spécifications.

En attendant, les sections hero utilisent des URL Unsplash de démonstration.

### 5. Domaine dans le sitemap

Dans `sitemap.xml` et `robots.txt`, remplacer `https://www.nuralhayaa.com/` par ton vrai domaine.

---

## Maintenance — ajouter un nouveau projet

1. Dupliquer `realisations/projet-villa-dakar.html` et renommer (ex : `projet-bureau-dubai.html`)
2. Modifier les textes, images, témoignage
3. Ajouter une vignette dans `realisations.html` (copier un bloc `.portfolio-item`)
4. Ajouter la nouvelle page dans `sitemap.xml`

---

## Maintenance — modifier un texte

Ouvrir le fichier HTML concerné avec un éditeur (VS Code, Notepad++, même le bloc-notes fonctionne). Chercher le texte à modifier, le remplacer, sauvegarder, re-uploader le fichier sur l'hébergeur.

---

## Technologies

- **HTML5 / CSS3 / JavaScript vanilla** — pas de framework, pas de build
- **Typographies** : Cormorant Garamond + Inter (Google Fonts)
- **Lightbox** : GLightbox (CDN)
- **Formulaires** : Formspree
- **Rendez-vous** : Calendly

Aucune dépendance npm, aucun serveur requis. Le site peut tourner sur n'importe quel hébergement statique.

---

## Palette & typographie

| Nom | Variable CSS | Hex |
|---|---|---|
| Vert forêt | `--c-green-800` | `#1C4A2D` |
| Or | `--c-gold-500` | `#C9A961` |
| Crème | `--c-cream-100` | `#FAF7F2` |
| Noir profond | `--c-black` | `#0E0E0E` |

Typographie :
- Display : Cormorant Garamond (italiques pour l'emphase éditoriale)
- Corps : Inter (300, 400, 500, 600)

---

## Support

Pour toute question technique ou ajout de fonctionnalité :

**Saïbo Danfakha** · zifo1819@gmail.com

---

*Livré en avril 2026.*
