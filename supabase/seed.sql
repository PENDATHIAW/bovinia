-- Seed data for BOVINIA — run after 001_initial_schema.sql

INSERT INTO site_settings (id, hero_title, hero_subtitle, hero_cta_primary, hero_cta_secondary, whatsapp_number, contact_email, contact_address, instagram_url, tiktok_url, site_title, site_description, footer_tagline)
VALUES (
  1,
  'Nourrir votre corps, naturellement.',
  'BOVINIA transforme la puissance naturelle du Bone Broth en cinq rituels gourmands et modernes, conçus pour accompagner le corps au quotidien.',
  'Découvrir la gamme',
  'Précommander',
  '+221771234567',
  'contact@bovinia.sn',
  'Dakar, Sénégal',
  'https://instagram.com/bovinia',
  'https://tiktok.com/@bovinia',
  'BOVINIA — Nutrition fonctionnelle powered by Bone Broth',
  'BOVINIA transforme le Bone Broth en rituels nutritionnels gourmands. 5 formules premium fabriquées au Sénégal.',
  'Nourrir votre corps, naturellement.'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO products (name, slug, mission, short_description, long_description, target_audience, usage_moment, preparation_methods, dominant_flavors, main_ingredients, price, stock, status, category, color_theme, sort_order) VALUES
('WELLNESS', 'wellness', 'Bien-être quotidien', 'Un rituel frais et tropical pensé pour accompagner la digestion, l''énergie quotidienne et le bien-être général.', 'WELLNESS est votre compagnon du quotidien : une formule gourmande à base de Bone Broth premium, enrichie d''ananas, mandarine et menthe.', 'Adultes actifs, personnes cherchant une routine nutritionnelle naturelle.', 'Matin ou journée.', ARRAY['Eau fraîche','Smoothie','Eau tempérée'], ARRAY['Ananas','Mandarine','Menthe'], ARRAY['Poudre de Bone Broth','Baobab','Kinkeliba','Ananas','Mandarine','Menthe'], 15000, 100, 'preorder', 'bien-etre', 'wellness', 1),
('BLOOM', 'bloom', 'Grossesse & post-partum', 'Une formule douce, gourmande et nourrissante, pensée pour accompagner les femmes pendant la grossesse et après l''accouchement.', 'BLOOM accompagne les femmes enceintes et jeunes mamans avec une formule douce à la mangue, coco et vanille.', 'Femmes enceintes et jeunes mamans.', 'Matin, collation ou après-midi.', ARRAY['Lait','Lait végétal','Smoothie','Eau'], ARRAY['Mangue','Coco','Vanille'], ARRAY['Poudre de Bone Broth','Lait de coco','Moringa','Dattes','Mangue','Vanille'], 15000, 100, 'preorder', 'grossesse', 'bloom', 2),
('PERIOD!', 'period', 'Confort du cycle féminin', 'Un rituel féminin conçu pour accompagner les périodes de cycle avec une boisson fruitée, épicée et réconfortante.', 'PERIOD! est le rituel pensé pour les femmes qui souhaitent une routine naturelle autour de leur cycle.', 'Femmes pendant la période prémenstruelle ou menstruelle.', 'Quelques jours avant et pendant les règles.', ARRAY['Eau chaude','Eau fraîche','Boisson tiède'], ARRAY['Bissap','Mandarine','Cannelle'], ARRAY['Poudre de Bone Broth','Bissap rouge','Graines de courge','Gingembre','Mandarine','Cannelle'], 15000, 100, 'preorder', 'cycle-feminin', 'period', 3),
('PULSE', 'pulse', 'Performance & vitalité', 'Une formule dynamique et tropicale pensée pour accompagner l''énergie, le mouvement et la récupération.', 'PULSE est le rituel des adultes actifs et sportifs.', 'Adultes actifs, sportifs, personnes en quête de vitalité.', 'Avant ou après l''effort, matin ou journée.', ARRAY['Eau fraîche','Smoothie'], ARRAY['Mangue','Orange','Gingembre'], ARRAY['Poudre de Bone Broth','Banane','Baobab','Mangue','Orange','Gingembre'], 15000, 100, 'preorder', 'sport', 'pulse', 4),
('CALM', 'calm', 'Sommeil & récupération', 'Un rituel du soir doux et apaisant, pensé pour accompagner la détente et la récupération.', 'CALM est votre rituel du soir aux notes de verveine, camomille et vanille.', 'Adultes, personnes stressées, personnes souhaitant une routine du soir.', 'Soir.', ARRAY['Eau chaude','Lait chaud','Lait végétal'], ARRAY['Verveine','Camomille','Vanille'], ARRAY['Poudre de Bone Broth','Pomme','Citronnelle','Cannelle','Verveine','Camomille','Vanille'], 15000, 100, 'preorder', 'sommeil', 'calm', 5);

INSERT INTO faqs (question, answer, sort_order) VALUES
('Qu''est-ce que le Bone Broth ?', 'Le Bone Broth est un bouillon longuement préparé à partir de tissus conjonctifs sélectionnés, naturellement riches en collagène, gélatine, acides aminés et minéraux.', 1),
('Est-ce que BOVINIA est un médicament ?', 'Non. BOVINIA est un aliment fonctionnel, pas un médicament.', 2),
('Comment consommer les produits ?', 'Mélangez une cuillère doseuse (~10 g) dans 200 ml de liquide.', 3),
('Est-ce adapté aux femmes enceintes ?', 'BLOOM a été conçu pour accompagner les femmes enceintes. Consultez votre professionnel de santé.', 4),
('Combien de fois par jour peut-on en prendre ?', 'Une à deux portions par jour suffisent généralement.', 5),
('Les produits contiennent-ils du sel ou des sucres ajoutés ?', 'Non. Sans sel ajouté, sans sucres ajoutés, sans colorants ni conservateurs artificiels. Riche en collagène, fabriqué au Sénégal.', 6),
('Où acheter BOVINIA ?', 'Inscrivez-vous à la waitlist pour être informé du lancement.', 7),
('Est-ce disponible à l''international ?', 'Notre ambition est exportable. Contactez-nous pour l''export.', 8);

INSERT INTO testimonials (name, city, rating, text, product_name, is_visible) VALUES
('Aminata D.', 'Dakar', 5, 'J''adore le goût tropical de WELLNESS. C''est devenu mon rituel du matin.', 'WELLNESS', true),
('Fatou S.', 'Thiès', 5, 'BLOOM m''accompagne depuis ma grossesse.', 'BLOOM', true),
('Moussa K.', 'Saint-Louis', 4, 'PULSE est parfait après mes séances de sport.', 'PULSE', true);

INSERT INTO blog_posts (title, slug, excerpt, content, category, status, author, published_at) VALUES
('Qu''est-ce que le Bone Broth et pourquoi l''intégrer à sa routine ?', 'quest-ce-que-le-bone-broth', 'Découvrez les bases du Bone Broth revisité par BOVINIA.', '<p>Le Bone Broth est préparé en faisant mijoter longuement des tissus conjonctifs sélectionnés.</p>', 'Bone Broth', 'published', 'Équipe BOVINIA', NOW());
