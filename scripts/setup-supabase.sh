#!/usr/bin/env bash
# Configuration Supabase BOVINIA — à exécuter après création du projet Supabase
set -e

echo "=== BOVINIA — Setup Supabase ==="
echo ""
echo "1. Créez un projet sur https://supabase.com"
echo "2. Copiez .env.example vers .env.local et renseignez les clés"
echo "3. Dans le SQL Editor Supabase, exécutez dans l'ordre :"
echo "   - supabase/migrations/001_initial_schema.sql"
echo "   - supabase/seed.sql"
echo "4. Créez un utilisateur dans Authentication > Users"
echo "5. Mettez à jour le rôle dans la table profiles :"
echo "   UPDATE profiles SET role = 'super_admin' WHERE email = 'votre@email.com';"
echo ""
echo "Variables Vercel à ajouter :"
echo "  NEXT_PUBLIC_SUPABASE_URL"
echo "  NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "  SUPABASE_SERVICE_ROLE_KEY"
echo "  NEXT_PUBLIC_SITE_URL"
echo ""
if [ -f .env.local ]; then
  echo "✓ .env.local trouvé"
else
  cp .env.example .env.local 2>/dev/null || true
  echo "→ .env.local créé depuis .env.example — complétez les valeurs"
fi
