-- ============================================================
-- BOVINIA — Setup SQL complet (Supabase SQL Editor)
-- Exécuter tout ce fichier en une fois, OU en 2 parties :
--   PARTIE A : lignes 1–299  (schéma)
--   PARTIE B : lignes 300+   (données)
-- Puis créer un user dans Auth UI et lancer PARTIE C en bas.
-- ============================================================


-- ============================================================
-- PARTIE A — SCHÉMA
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'editor', 'order_manager');
CREATE TYPE product_status AS ENUM ('draft', 'visible', 'preorder', 'out_of_stock', 'coming_soon');
CREATE TYPE product_category AS ENUM ('bien-etre', 'grossesse', 'cycle-feminin', 'sport', 'sommeil');
CREATE TYPE preorder_status AS ENUM ('new', 'contacted', 'confirmed', 'paid', 'delivered', 'cancelled');
CREATE TYPE order_payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE order_delivery_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE blog_status AS ENUM ('draft', 'published');
CREATE TYPE preferred_channel AS ENUM ('whatsapp', 'call', 'email');

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'editor',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  mission TEXT NOT NULL,
  short_description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  usage_moment TEXT NOT NULL,
  preparation_methods TEXT[] NOT NULL DEFAULT '{}',
  dominant_flavors TEXT[] NOT NULL DEFAULT '{}',
  main_ingredients TEXT[] NOT NULL DEFAULT '{}',
  warnings TEXT NOT NULL DEFAULT 'Ce produit est un aliment fonctionnel et ne remplace pas un avis médical.',
  price NUMERIC(12,2),
  compare_at_price NUMERIC(12,2),
  stock INTEGER NOT NULL DEFAULT 0,
  status product_status NOT NULL DEFAULT 'draft',
  category product_category NOT NULL,
  color_theme TEXT NOT NULL,
  image TEXT,
  gallery TEXT[] NOT NULL DEFAULT '{}',
  seo_title TEXT,
  seo_description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE preorders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  preferred_channel preferred_channel NOT NULL DEFAULT 'whatsapp',
  message TEXT,
  status preorder_status NOT NULL DEFAULT 'new',
  internal_note TEXT,
  marketing_consent BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  total NUMERIC(12,2) NOT NULL DEFAULT 0,
  payment_status order_payment_status NOT NULL DEFAULT 'pending',
  delivery_status order_delivery_status NOT NULL DEFAULT 'pending',
  payment_method TEXT,
  address TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  status blog_status NOT NULL DEFAULT 'draft',
  author TEXT NOT NULL DEFAULT 'Équipe BOVINIA',
  published_at TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  source TEXT NOT NULL DEFAULT 'website',
  marketing_consent BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  hero_title TEXT NOT NULL,
  hero_subtitle TEXT NOT NULL,
  hero_cta_primary TEXT NOT NULL,
  hero_cta_secondary TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_address TEXT NOT NULL,
  instagram_url TEXT,
  tiktok_url TEXT,
  facebook_url TEXT,
  site_title TEXT NOT NULL,
  site_description TEXT NOT NULL,
  footer_tagline TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  folder TEXT NOT NULL DEFAULT 'general',
  alt_text TEXT,
  size_bytes INTEGER,
  mime_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  page_path TEXT,
  product_slug TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_preorders_status ON preorders(status);
CREATE INDEX idx_preorders_city ON preorders(city);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_created_at ON analytics_events(created_at);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER preorders_updated_at BEFORE UPDATE ON preorders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE preorders ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('super_admin', 'admin', 'editor', 'order_manager')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "Public can read visible products" ON products FOR SELECT USING (status IN ('visible', 'preorder', 'coming_soon'));
CREATE POLICY "Public can read active faqs" ON faqs FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can read visible testimonials" ON testimonials FOR SELECT USING (is_visible = TRUE);
CREATE POLICY "Public can read published blog posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public can read site settings" ON site_settings FOR SELECT USING (TRUE);

CREATE POLICY "Anyone can submit preorders" ON preorders FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Anyone can submit contact messages" ON contact_messages FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Anyone can subscribe newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Anyone can log analytics" ON analytics_events FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Admins full access products" ON products FOR ALL USING (is_admin());
CREATE POLICY "Admins full access preorders" ON preorders FOR ALL USING (is_admin());
CREATE POLICY "Admins full access orders" ON orders FOR ALL USING (is_admin());
CREATE POLICY "Admins full access blog" ON blog_posts FOR ALL USING (is_admin());
CREATE POLICY "Admins full access faqs" ON faqs FOR ALL USING (is_admin());
CREATE POLICY "Admins full access testimonials" ON testimonials FOR ALL USING (is_admin());
CREATE POLICY "Admins read contact messages" ON contact_messages FOR SELECT USING (is_admin());
CREATE POLICY "Admins update contact messages" ON contact_messages FOR UPDATE USING (is_admin());
CREATE POLICY "Admins read newsletter" ON newsletter_subscribers FOR SELECT USING (is_admin());
CREATE POLICY "Admins full access site settings" ON site_settings FOR ALL USING (is_admin());
CREATE POLICY "Admins full access media" ON media FOR ALL USING (is_admin());
CREATE POLICY "Admins read analytics" ON analytics_events FOR SELECT USING (is_admin());
CREATE POLICY "Admins read profiles" ON profiles FOR SELECT USING (is_admin());
CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', 'editor');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read media bucket" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Admins upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND is_admin());
CREATE POLICY "Admins delete media" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND is_admin());


-- ============================================================
-- PARTIE B — DONNÉES INITIALES (SEED)
-- ============================================================

INSERT INTO site_settings (id, hero_title, hero_subtitle, hero_cta_primary, hero_cta_secondary, whatsapp_number, contact_email, contact_address, instagram_url, tiktok_url, site_title, site_description, footer_tagline)
VALUES (
  1,
  'Nourrir votre corps, naturellement.',
  'BOVINIA transforme la puissance naturelle du Bone Broth en cinq rituels gourmands et modernes, conçus pour accompagner le corps au quotidien.',
  'Découvrir la boutique',
  'Commander',
  '+221 78 589 01 53',
  'contact@bovinia.sn',
  'Dakar, Sénégal',
  'https://instagram.com/bovinia',
  'https://tiktok.com/@bovinia',
  'BOVINIA — Nutrition fonctionnelle powered by Bone Broth',
  'BOVINIA transforme le Bone Broth en rituels nutritionnels gourmands. 5 formules premium fabriquées au Sénégal.',
  'Nourrir votre corps, naturellement.'
) ON CONFLICT (id) DO NOTHING;

-- Mettre à jour les textes boutique si déjà seedé
UPDATE site_settings SET
  hero_cta_primary = 'Découvrir la boutique',
  hero_cta_secondary = 'Commander',
  hero_title = 'Cinq rituels. Une base : le Bone Broth.',
  hero_subtitle = 'BOVINIA transforme la puissance du bouillon d''os en boissons gourmandes et modernes — enrichies de fruits et plantes africains, fabriquées au Sénégal, prêtes à commander.'
WHERE id = 1;

INSERT INTO products (name, slug, mission, short_description, long_description, target_audience, usage_moment, preparation_methods, dominant_flavors, main_ingredients, price, stock, status, category, color_theme, sort_order) VALUES
('WELLNESS', 'wellness', 'Bien-être quotidien', 'Un rituel frais et tropical pensé pour accompagner la digestion, l''énergie quotidienne et le bien-être général.', 'WELLNESS est votre compagnon du quotidien : une formule gourmande à base de Bone Broth premium, enrichie d''ananas, mandarine et menthe.', 'Adultes actifs, personnes cherchant une routine nutritionnelle naturelle.', 'Matin ou journée.', ARRAY['Eau fraîche','Smoothie','Eau tempérée'], ARRAY['Ananas','Mandarine','Menthe'], ARRAY['Poudre de Bone Broth','Baobab','Kinkeliba','Ananas','Mandarine','Menthe'], 15000, 100, 'visible', 'bien-etre', 'wellness', 1),
('BLOOM', 'bloom', 'Grossesse & post-partum', 'Une formule douce, gourmande et nourrissante, pensée pour accompagner les femmes pendant la grossesse et après l''accouchement.', 'BLOOM accompagne les femmes enceintes et jeunes mamans avec une formule douce à la mangue, coco et vanille.', 'Femmes enceintes et jeunes mamans.', 'Matin, collation ou après-midi.', ARRAY['Lait','Lait végétal','Smoothie','Eau'], ARRAY['Mangue','Coco','Vanille'], ARRAY['Poudre de Bone Broth','Lait de coco','Moringa','Dattes','Mangue','Vanille'], 15000, 100, 'visible', 'grossesse', 'bloom', 2),
('PERIOD!', 'period', 'Confort du cycle féminin', 'Un rituel féminin conçu pour accompagner les périodes de cycle avec une boisson fruitée, épicée et réconfortante.', 'PERIOD! est le rituel pensé pour les femmes qui souhaitent une routine naturelle autour de leur cycle.', 'Femmes pendant la période prémenstruelle ou menstruelle.', 'Quelques jours avant et pendant les règles.', ARRAY['Eau chaude','Eau fraîche','Boisson tiède'], ARRAY['Bissap','Mandarine','Cannelle'], ARRAY['Poudre de Bone Broth','Bissap rouge','Graines de courge','Gingembre','Mandarine','Cannelle'], 15000, 100, 'visible', 'cycle-feminin', 'period', 3),
('PULSE', 'pulse', 'Performance & vitalité', 'Une formule dynamique et tropicale pensée pour accompagner l''énergie, le mouvement et la récupération.', 'PULSE est le rituel des adultes actifs et sportifs.', 'Adultes actifs, sportifs, personnes en quête de vitalité.', 'Avant ou après l''effort, matin ou journée.', ARRAY['Eau fraîche','Smoothie'], ARRAY['Mangue','Orange','Gingembre'], ARRAY['Poudre de Bone Broth','Banane','Baobab','Mangue','Orange','Gingembre'], 15000, 100, 'visible', 'sport', 'pulse', 4),
('CALM', 'calm', 'Sommeil & récupération', 'Un rituel du soir doux et apaisant, pensé pour accompagner la détente et la récupération.', 'CALM est votre rituel du soir aux notes de verveine, camomille et vanille.', 'Adultes, personnes stressées, personnes souhaitant une routine du soir.', 'Soir.', ARRAY['Eau chaude','Lait chaud','Lait végétal'], ARRAY['Verveine','Camomille','Vanille'], ARRAY['Poudre de Bone Broth','Pomme','Citronnelle','Cannelle','Verveine','Camomille','Vanille'], 15000, 100, 'visible', 'sommeil', 'calm', 5);

INSERT INTO faqs (question, answer, sort_order) VALUES
('Qu''est-ce que le Bone Broth ?', 'Le Bone Broth est un bouillon longuement préparé à partir de tissus conjonctifs sélectionnés, naturellement riches en collagène, gélatine, acides aminés et minéraux.', 1),
('Est-ce que BOVINIA est un médicament ?', 'Non. BOVINIA est un aliment fonctionnel, pas un médicament.', 2),
('Comment consommer les produits ?', 'Mélangez 15 à 17 g dans 200 ml de liquide. Environ 30 portions par pot.', 3),
('Est-ce adapté aux femmes enceintes ?', 'BLOOM a été conçu pour accompagner les femmes enceintes. Consultez votre professionnel de santé.', 4),
('Combien de fois par jour peut-on en prendre ?', 'Une à deux portions par jour suffisent généralement.', 5),
('Les produits contiennent-ils du sel ou des sucres ajoutés ?', 'Non. Sans sel ajouté, sans sucres ajoutés, sans colorants ni conservateurs artificiels. Riche en collagène, fabriqué au Sénégal.', 6),
('Où acheter BOVINIA ?', 'Commandez sur bovinia.sn/commander : panier, livraison, paiement — confirmation immédiate sur le site + email récapitulatif.', 7),
('Est-ce disponible à l''international ?', 'Notre ambition est exportable. Contactez-nous pour l''export.', 8);

INSERT INTO testimonials (name, city, rating, text, product_name, is_visible) VALUES
('Aminata D.', 'Dakar', 5, 'J''adore le goût tropical de WELLNESS. C''est devenu mon rituel du matin.', 'WELLNESS', true),
('Fatou S.', 'Thiès', 5, 'BLOOM m''accompagne depuis ma grossesse.', 'BLOOM', true),
('Moussa K.', 'Saint-Louis', 4, 'PULSE est parfait après mes séances de sport.', 'PULSE', true);

INSERT INTO blog_posts (title, slug, excerpt, content, category, status, author, published_at) VALUES
('Qu''est-ce que le Bone Broth et pourquoi l''intégrer à sa routine ?', 'quest-ce-que-le-bone-broth', 'Découvrez les bases du Bone Broth revisité par BOVINIA.', '<p>Le Bone Broth est préparé en faisant mijoter longuement des tissus conjonctifs sélectionnés.</p>', 'Bone Broth', 'published', 'Équipe BOVINIA', NOW());


-- ============================================================
-- PARTIE C — ADMIN (après création user dans Auth UI)
-- Remplacez l'email ci-dessous, puis Run :
-- ============================================================

-- UPDATE profiles SET role = 'super_admin' WHERE email = 'votre@email.com';
-- SELECT id, email, role FROM profiles;

-- ============================================================
-- PARTIE D — CHECKOUT + EMAILS (exécuter après A+B, ou voir 002_checkout_orders.sql)
-- ============================================================
-- Copier-coller le contenu de supabase/migrations/002_checkout_orders.sql
-- Puis configurer Resend :
-- UPDATE private.app_config SET value = 're_VOTRE_CLE' WHERE key = 'resend_api_key';
-- UPDATE private.app_config SET value = 'votre@email.com' WHERE key = 'shop_email';
-- UPDATE private.app_config SET value = 'BOVINIA <onboarding@resend.dev>' WHERE key = 'from_email';
