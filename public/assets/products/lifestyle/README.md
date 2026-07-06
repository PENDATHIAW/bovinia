# Illustrations lifestyle — plusieurs visuels par rituel

Chaque rituel a son dossier. **Ajoutez autant d'images que vous voulez.**

```
lifestyle/
├── wellness/
│   ├── 01-bureau.png      ← affiché en 1er (préfixe 01, 02, 03…)
│   ├── 02-cuisine.png
│   └── 03-matin.jpg       ← vos nouveaux visuels ici
├── bloom/
│   └── 01-grossesse.png
├── period/
├── pulse/
└── calm/
```

## Ordre d'affichage

Numérotez vos fichiers : `01-`, `02-`, `03-`…  
Le site trie automatiquement et adapte la mise en page :

| Nombre | Mise en page fiche produit |
|--------|---------------------------|
| 1 | Pleine largeur |
| 2 | Côte à côte |
| 3 | Grande image + 2 à droite |
| 4 | Grille bento |
| 5+ | Hero + grille |

## Méthode rapide — dossier inbox/

1. Déposez vos images dans `products/inbox/`
2. Nommez avec le rituel : `wellness-plage.jpg`, `pulse-gym.png`
3. Lancez :
   ```bash
   node scripts/organize-product-images.mjs
   ```
4. Commit + push

## Où ça apparaît sur le site

- **Fiche produit** → section « Rituel en image » (toute la galerie)
- **Carte boutique** → pot + aperçu du 1er visuel + badge « +N visuels »
- **Bandeau accueil** → rotation des illustrations

Le **pot** (`pots/wellness.png`) reste séparé — ce ne sont pas des illustrations.
