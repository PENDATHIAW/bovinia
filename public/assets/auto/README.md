# Images automatiques BOVINIA

Déposez vos fichiers ici : **ils apparaissent sur le site sans modifier le code**.

Formats acceptés : `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`

## Bandeau défilant (page d'accueil)

```
public/assets/auto/marquee/
  ma-photo-1.jpg
  ma-photo-2.png
```

→ Affichées dans le bandeau lifestyle sous le hero.

## Galerie par rituel (fiche produit)

```
public/assets/auto/gallery/wellness/
  ritual-matin.jpg
public/assets/auto/gallery/bloom/
  grossesse.png
public/assets/auto/gallery/period/
public/assets/auto/gallery/pulse/
public/assets/auto/gallery/calm/
```

→ Ajoutées à la galerie « Rituel en image » de chaque fiche produit.

## Images fixes (logo, pots, hero)

Les visuels **officiels** (logo, photo du pot, hero gamme) restent dans `public/assets/logo/`  
et sont référencés dans `src/lib/data/assetPaths.ts` — à mettre à jour seulement pour ces cas.

## Déploiement

| Environnement | Action |
|---------------|--------|
| **Local** (`npm run dev`) | Copiez l'image dans le bon dossier → rafraîchissez la page |
| **Vercel (production)** | Commit + push Git (les fichiers dans `public/` partent avec le déploiement) |

## Interdit

Ne pas déposer d'images contenant **formules détaillées** (`formulas-chart`, `formule` dans le nom).
