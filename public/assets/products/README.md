# Dossier products — toutes vos images BOVINIA

## Structure

```
products/
├── brand/          → logo.png, hero-gamme.png
├── pots/           → wellness.png, bloom.png… (photo du pot)
├── lifestyle/      → un dossier par rituel, plusieurs visuels OK
│   ├── wellness/   → 01-bureau.png, 02-cuisine.png, 03-….
│   ├── bloom/
│   ├── period/
│   ├── pulse/
│   └── calm/
└── inbox/          → déposez ici, puis: npm run organize:images
```

Guide illustrations : [`lifestyle/README.md`](./lifestyle/README.md)

## Ajouter des illustrations (plusieurs par produit)

1. Copiez dans `lifestyle/wellness/` (ou bloom, pulse…)  
   Nommez `03-plage.jpg`, `04-bureau.png` — le **01, 02** fixe l'ordre.
2. **Ou** déposez dans `inbox/` avec le nom du rituel et lancez :
   ```bash
   npm run organize:images
   ```
3. **Commit + push** pour Vercel.

## Où sur le site

| Type | Emplacement |
|------|-------------|
| Pot | Fiche produit (haut), cartes boutique |
| Illustrations | Section « Rituel en image » sur chaque fiche |
| 1ère illustration | Aperçu fond des cartes boutique + bandeau accueil |

Slugs : `wellness`, `bloom`, `period`, `pulse`, `calm`
