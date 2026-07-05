# Dossier products — toutes vos images BOVINIA

Déposez vos visuels ici. Le site les place automatiquement.

## Structure (déjà remplie)

```
products/
├── brand/
│   ├── logo.png          → Logo site (header, footer)
│   └── hero-gamme.png    → Hero accueil (5 pots)
├── pots/
│   ├── wellness.png      → Photo pot WELLNESS (boutique, fiche)
│   ├── bloom.png         → Photo pot BLOOM
│   ├── period.png        → Photo pot PERIOD!
│   ├── pulse.png         → Photo pot PULSE
│   └── calm.png          → Photo pot CALM
├── lifestyle/
│   ├── wellness-bureau.png    → Galerie WELLNESS + bandeau
│   ├── wellness-cuisine.png   → Galerie WELLNESS
│   ├── bloom-grossesse.png    → Galerie BLOOM
│   ├── period-rituel.png      → Galerie PERIOD!
│   ├── pulse-sport.png        → Galerie PULSE
│   └── calm-soir.png          → Galerie CALM
└── inbox/                → Nouvelles images : on devine le rituel via le nom
```

## Ajouter une nouvelle image

### Option simple — dossier `inbox/`

Nommez le fichier avec le **nom du rituel** :

| Nom du fichier | Où ça va |
|----------------|----------|
| `wellness-matin.jpg` | Galerie WELLNESS |
| `pulse-salle-sport.png` | Galerie PULSE |
| `calm-chambre.png` | Galerie CALM |
| `bloom-pot.jpg` | Photo pot BLOOM |

### Option précise — bon sous-dossier

| Dossier | Usage |
|---------|--------|
| `pots/{slug}.png` | Remplace la photo du pot |
| `lifestyle/{slug}-description.png` | Ajoute à la galerie du rituel |
| `brand/logo.png` | Remplace le logo |
| `brand/hero-gamme.png` | Remplace le hero gamme |

Slugs : `wellness`, `bloom`, `period`, `pulse`, `calm`

## Déploiement

- **Local** : copiez → rafraîchissez la page
- **Vercel** : commit + push Git

Formats : `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`
