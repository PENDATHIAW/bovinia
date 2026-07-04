# BOVINIA — Site web & CMS

Marque sénégalaise de nutrition fonctionnelle **powered by Bone Broth**.

Site complet comprenant une interface client premium et un CMS admin sécurisé.

## Stack technique

- **Frontend** : Next.js 16 (App Router) + TypeScript
- **Style** : Tailwind CSS v4
- **Backend / CMS** : Supabase (PostgreSQL, Auth, Storage)
- **Déploiement** : Vercel

## Fonctionnalités

### Site client (public)
- Page d'accueil premium avec toutes les sections demandées
- Catalogue produits avec filtres
- Fiches produit détaillées (5 rituels : WELLNESS, BLOOM, PERIOD!, PULSE, CALM)
- Pages : Notre histoire, Horizon Farm, Blog, Contact, Précommande
- FAQ, témoignages dynamiques
- Formulaires : contact, précommande/waitlist
- SEO : metadata, sitemap, robots.txt
- Architecture i18n prête (FR par défaut, EN à venir)

### Interface admin (`/admin`)
- Authentification Supabase (email + mot de passe)
- Dashboard avec statistiques
- Gestion produits, précommandes, commandes
- Blog, FAQ, témoignages
- Messages contact, newsletter
- Paramètres du site (hero, contact, SEO, réseaux)
- Médiathèque (Supabase Storage)
- Statistiques et analytics

## Installation

### 1. Cloner et installer

```bash
git clone <repo-url>
cd bovinia
npm install
```

### 2. Configurer Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Exécuter la migration SQL : `supabase/migrations/001_initial_schema.sql`
3. Exécuter le seed : `supabase/seed.sql`
4. Créer un utilisateur admin dans Authentication > Users
5. Mettre à jour le rôle dans `profiles` : `super_admin`

### 3. Variables d'environnement

```bash
cp .env.example .env.local
```

Renseigner :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

### 4. Lancer en développement

```bash
npm run dev
```

- Site client : http://localhost:3000
- Admin : http://localhost:3000/admin

> **Note** : Sans Supabase configuré, le site fonctionne avec des données seed locales (fallback).

## Logo

Le logo officiel BOVINIA est inclus dans le projet :

```
public/assets/logo/bovinia-logo.png      # Logo complet (header, footer, admin)
public/assets/logo/bovinia-logo-icon.png # Variante compacte (favicon)
src/app/icon.png                         # Icône application Next.js
```

## Structure du projet

```
src/
├── app/
│   ├── (public)/          # Pages client
│   ├── admin/             # CMS admin
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── public/            # Composants site client
│   └── admin/             # Composants admin
├── lib/
│   ├── supabase/          # Clients Supabase
│   ├── data/              # Queries & seed data
│   ├── actions/           # Server actions
│   └── i18n/              # Config i18n
├── types/
supabase/
├── migrations/            # Schéma PostgreSQL
└── seed.sql               # Données initiales
public/
└── assets/
    └── logo/              # Logo BOVINIA
```

## Déploiement Vercel

1. Connecter le repo à Vercel
2. Ajouter les variables d'environnement
3. Déployer

## Rôles admin

| Rôle | Permissions |
|------|-------------|
| super_admin | Accès complet |
| admin | Gestion contenu + commandes |
| editor | Contenu (blog, FAQ, témoignages) |
| order_manager | Précommandes et commandes |

## Paiement (à venir)

Structure prête pour :
- Wave
- Orange Money
- Carte bancaire
- Paiement à la livraison

## Avertissement légal

Les produits BOVINIA sont des **aliments fonctionnels**. Ils ne remplacent pas un avis médical et ne sont pas des médicaments.

## Licence

Propriétaire — BOVINIA © 2026
