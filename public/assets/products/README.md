# Images BOVINIA — zéro configuration

## Une seule action

Déposez **tous vos visuels** dans :

```
public/assets/products/drop/
```

Pas de sous-dossiers. Pas de renommage obligatoire pour les fichiers officiels BOVINIA.

Puis (optionnel si vous voulez ranger) :

```bash
npm run organize:images
git add public/assets/products/
git commit -m "Nouveaux visuels"
git push
```

**Le site scanne aussi automatiquement** tout ce qui est déjà dans `products/`, `assets/lifestyle/` et les fichiers UUID — vous n'avez rien d'autre à faire côté code.

## Ce que le site fait tout seul

- Reconnaît chaque visuel officiel (pot WELLNESS, scène BLOOM grossesse, PULSE sport…)
- Assigne au bon rituel
- Affiche **plusieurs illustrations** par fiche produit
- Adapte la mise en page (grille intelligente)

## Pots vs illustrations

| Type | Exemple | Où ça va |
|------|---------|----------|
| Pot seul (fond neutre) | `2F591EDD-….png` | Photo produit boutique |
| Scène lifestyle | `FCE578D3-….png`, `wellness-office.jpg` | Galerie « Rituel en image » |
