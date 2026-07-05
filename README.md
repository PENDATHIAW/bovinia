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
- Pages : Notre histoire, Horizon Farm, Blog, Contact, Boutique (`/produits`), Commander (`/commander`)
- FAQ, témoignages dynamiques
- Formulaires : contact, commande, newsletter
- SEO : metadata, sitemap, robots.txt
- Architecture i18n prête (FR par défaut, EN à venir)

### Interface admin (`/admin`)
- Authentification Supabase (email + mot de passe)
- Dashboard avec statistiques
- Gestion produits, commandes clients
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

### 4. Visualiser sans base de données (mode démo)

Aucune configuration Supabase requise. Lancez simplement :

```bash
npm install
npm run dev
```

- Site client : http://localhost:3000
- Aperçu admin : http://localhost:3000/admin (sans connexion en mode démo)

Le site affiche les produits, pages et contenus intégrés au code. Les formulaires affichent un message de succès mais ne sont pas enregistrés.

### 5. Lancer en développement (avec Supabase)

```bash
npm run dev
```

- Site client : http://localhost:3000
- Admin : http://localhost:3000/admin

> **Note** : Sans Supabase configuré, le site fonctionne en **mode démo** (données seed locales).

### 6. Déployer sur Vercel sans base de données

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

## Déploiement Vercel (5 minutes)

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter et déployer
vercel login
vercel --prod
```

Ou connectez le repo GitHub à [vercel.com/new](https://vercel.com/new) — déploiement automatique à chaque push.

**Région recommandée :** Paris (`cdg1`) — déjà configurée dans `vercel.json`.

Le site fonctionne **sans Supabase** en mode démo (données seed). Ajoutez les variables d'environnement Supabase dans Vercel pour activer les formulaires et l'admin sécurisé.

## Rôles admin

| Rôle | Permissions |
|------|-------------|
| super_admin | Accès complet |
| admin | Gestion contenu + commandes |
| editor | Contenu (blog, FAQ, témoignages) |
| order_manager | Commandes clients |

## Checkout e-commerce

Le parcours commande se déroule entièrement sur le site :

1. **Panier** — rituels et packs
2. **Livraison** — coordonnées et adresse
3. **Paiement** — Wave, Orange Money ou à la livraison
4. **Confirmation** — numéro de commande affiché sur le site + email (Resend)

### Configuration Supabase

Exécuter dans l'ordre :

1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_checkout_orders.sql`

Puis configurer Resend dans Supabase SQL Editor :

```sql
UPDATE private.app_config SET value = 're_VOTRE_CLE' WHERE key = 'resend_api_key';
UPDATE private.app_config SET value = 'votre@email.com' WHERE key = 'shop_email';
UPDATE private.app_config SET value = 'BOVINIA <noreply@votredomaine.sn>' WHERE key = 'from_email';
```

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
