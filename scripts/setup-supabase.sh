#!/usr/bin/env bash
# Configuration Supabase BOVINIA — à exécuter après création du projet Supabase
set -e

echo "=== BOVINIA — Setup Supabase ==="
echo ""
echo "1. Créez un projet sur https://supabase.com"
echo "2. Copiez .env.example vers .env.local et renseignez les clés"
echo "3. Dans le SQL Editor Supabase, exécutez dans l'ordre :"
echo "   a) supabase/BOVINIA_setup_complet.sql  (schéma + données)"
echo "   b) supabase/migrations/002_checkout_orders.sql  (checkout + emails)"
echo "4. Configurez Resend dans SQL Editor :"
echo "   UPDATE private.app_config SET value = 're_VOTRE_CLE' WHERE key = 'resend_api_key';"
echo "   UPDATE private.app_config SET value = 'votre@email.com' WHERE key = 'shop_email';"
echo "5. Créez un utilisateur dans Authentication > Users"
echo "6. Admin : UPDATE profiles SET role = 'super_admin' WHERE email = 'votre@email.com';"
echo ""
echo "Variables Vercel (Settings > Environment Variables) :"
echo "  NEXT_PUBLIC_SUPABASE_URL"
echo "  NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "  SUPABASE_SERVICE_ROLE_KEY"
echo "  NEXT_PUBLIC_SITE_URL=https://votre-domaine.sn"
echo ""
if [ -f .env.local ]; then
  echo "✓ .env.local trouvé"
else
  cp .env.example .env.local 2>/dev/null || true
  echo "→ .env.local créé depuis .env.example — complétez les valeurs"
fi
