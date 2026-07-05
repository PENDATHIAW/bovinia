-- BOVINIA — Checkout e-commerce (orders + order_items + emails Resend)
-- Exécuter dans Supabase → SQL Editor après 001_initial_schema.sql

CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- order_items (lignes de commande)
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_slug TEXT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- Colonnes checkout sur orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_number TEXT UNIQUE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS subtotal NUMERIC(12,2) NOT NULL DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_fee NUMERIC(12,2) NOT NULL DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS city TEXT;

CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Numéro de commande BOV-YYYYMMDD-XXXX
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  today TEXT := to_char(NOW(), 'YYYYMMDD');
  seq_val INTEGER;
BEGIN
  seq_val := nextval('order_number_seq');
  RETURN 'BOV-' || today || '-' || lpad(seq_val::text, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Config privée (clés à renseigner dans Supabase SQL Editor)
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM public;

CREATE TABLE IF NOT EXISTS private.app_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

REVOKE ALL ON private.app_config FROM public;

INSERT INTO private.app_config (key, value) VALUES
  ('resend_api_key', ''),
  ('shop_email', 'contact@bovinia.sn'),
  ('from_email', 'BOVINIA <onboarding@resend.dev>')
ON CONFLICT (key) DO NOTHING;

-- Email confirmation commande
CREATE OR REPLACE FUNCTION public.send_order_confirmation_email(p_order JSONB, p_locale TEXT DEFAULT 'fr')
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, private, extensions
AS $$
DECLARE
  resend_key TEXT;
  shop_email TEXT;
  from_email TEXT;
  body TEXT;
  shop_body TEXT;
  customer_email TEXT;
  customer_phone TEXT;
  order_number TEXT;
  email_sent BOOLEAN := false;
  shop_notified BOOLEAN := false;
  sandbox_mode BOOLEAN := false;
  can_send_to_customer BOOLEAN := false;
  item RECORD;
  item_lines TEXT := '';
  payment_label TEXT;
BEGIN
  SELECT value INTO resend_key FROM private.app_config WHERE key = 'resend_api_key';
  SELECT value INTO shop_email FROM private.app_config WHERE key = 'shop_email';
  SELECT value INTO from_email FROM private.app_config WHERE key = 'from_email';

  IF resend_key IS NULL OR resend_key = '' THEN
    RETURN jsonb_build_object('ok', false, 'emailSent', false, 'shopNotified', false, 'reason', 'not_configured');
  END IF;

  sandbox_mode := coalesce(from_email, '') ILIKE '%resend.dev%';
  customer_email := nullif(trim(p_order #>> '{customer,email}'), '');
  customer_phone := coalesce(p_order #>> '{customer,phone}', '');
  order_number := coalesce(p_order #>> '{orderNumber}', '');

  can_send_to_customer := customer_email IS NOT NULL
    AND (NOT sandbox_mode OR lower(customer_email) = lower(shop_email));

  payment_label := coalesce(p_order #>> '{paymentMethod}', '');

  FOR item IN
    SELECT * FROM jsonb_to_recordset(coalesce(p_order #> '{items}', '[]'::jsonb))
      AS x(name TEXT, quantity INT, "unitPrice" INT)
  LOOP
    item_lines := item_lines || E'\n• ' || item.name || ' × ' || item.quantity
      || ' — ' || to_char(item."unitPrice" * item.quantity, 'FM999G999G999') || ' F';
  END LOOP;

  body := case WHEN p_locale = 'fr' THEN 'Commande BOVINIA' ELSE 'BOVINIA order' END
    || E'\n\n' || case WHEN p_locale = 'fr' THEN 'N° commande' ELSE 'Order no.' END || ' : ' || order_number
    || E'\n' || (p_order #>> '{customer,name}') || ' · ' || customer_phone
    || case WHEN customer_email IS NOT NULL THEN E'\n' || customer_email ELSE '' END
    || E'\n' || coalesce(p_order #>> '{customer,city}', '')
    || E'\n' || coalesce(p_order #>> '{customer,address}', '')
    || item_lines
    || E'\n\n' || case WHEN p_locale = 'fr' THEN 'Sous-total' ELSE 'Subtotal' END
    || ' : ' || to_char((p_order #>> '{subtotal}')::int, 'FM999G999G999') || ' F'
    || E'\n' || case WHEN p_locale = 'fr' THEN 'Livraison' ELSE 'Shipping' END
    || ' : ' || to_char((p_order #>> '{shippingFee}')::int, 'FM999G999G999') || ' F'
    || E'\n' || case WHEN p_locale = 'fr' THEN 'Total' ELSE 'Total' END
    || ' : ' || to_char((p_order #>> '{total}')::int, 'FM999G999G999') || ' F'
    || E'\n' || case WHEN p_locale = 'fr' THEN 'Paiement' ELSE 'Payment' END || ' : ' || payment_label;

  shop_body := body;

  IF customer_email IS NULL THEN
    shop_body := shop_body || E'\n\n⚠️ Pas d''email client — joindre au ' || customer_phone;
  ELSIF sandbox_mode AND lower(customer_email) <> lower(shop_email) THEN
    shop_body := shop_body
      || E'\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      || E'\n📩 RÉCAP À TRANSMETTRE AU CLIENT'
      || E'\nEmail client : ' || customer_email
      || E'\n(Tant que le domaine Resend n''est pas vérifié, transférez ce récap au client.)'
      || E'\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      || E'\n' || body;
  END IF;

  IF can_send_to_customer THEN
    PERFORM net.http_post(
      url := 'https://api.resend.com/emails',
      headers := jsonb_build_object(
        'Authorization', 'Bearer ' || resend_key,
        'Content-Type', 'application/json'
      ),
      body := jsonb_build_object(
        'from', from_email,
        'to', jsonb_build_array(customer_email),
        'subject', case WHEN p_locale = 'fr'
          THEN 'Commande ' || order_number || ' — BOVINIA'
          ELSE 'Order ' || order_number || ' — BOVINIA'
        END,
        'text', body
      )
    );
    email_sent := true;
  END IF;

  PERFORM net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || resend_key,
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
      'from', from_email,
      'to', jsonb_build_array(shop_email),
      'subject', case
        WHEN customer_email IS NOT NULL AND sandbox_mode AND lower(customer_email) <> lower(shop_email)
          THEN 'Nouvelle commande ' || order_number || ' — client ' || customer_email
        ELSE 'Nouvelle commande ' || order_number
      END,
      'text', shop_body
    )
  );
  shop_notified := true;

  RETURN jsonb_build_object(
    'ok', true,
    'emailSent', email_sent,
    'shopNotified', shop_notified,
    'customerRecapInShopEmail', customer_email IS NOT NULL AND sandbox_mode AND lower(customer_email) <> lower(shop_email),
    'reason', case WHEN sandbox_mode THEN 'resend_sandbox' ELSE 'production' END
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.send_order_confirmation_email(JSONB, TEXT) TO anon, authenticated;

-- RLS order_items
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Création commande publique" ON public.orders;
CREATE POLICY "Création commande publique"
  ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Création lignes commande publique" ON public.order_items;
CREATE POLICY "Création lignes commande publique"
  ON public.order_items FOR INSERT TO anon, authenticated WITH CHECK (true);

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON public.orders TO anon, authenticated;
GRANT INSERT ON public.order_items TO anon, authenticated;

-- RPC : créer commande + lignes + email (recommandé depuis le site)
CREATE OR REPLACE FUNCTION public.place_order(
  p_customer JSONB,
  p_items JSONB,
  p_payment_method TEXT,
  p_subtotal NUMERIC,
  p_shipping_fee NUMERIC,
  p_total NUMERIC,
  p_note TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, private, extensions
AS $$
DECLARE
  v_order_id UUID;
  v_order_number TEXT;
  v_item RECORD;
  v_email_payload JSONB;
  v_email_result JSONB;
BEGIN
  v_order_number := generate_order_number();

  INSERT INTO orders (
    order_number,
    customer_name,
    customer_email,
    customer_phone,
    city,
    address,
    subtotal,
    shipping_fee,
    total,
    payment_method,
    payment_status,
    delivery_status,
    note,
    items
  ) VALUES (
    v_order_number,
    p_customer #>> '{name}',
    p_customer #>> '{email}',
    p_customer #>> '{phone}',
    p_customer #>> '{city}',
    coalesce(p_customer #>> '{address}', ''),
    p_subtotal,
    p_shipping_fee,
    p_total,
    p_payment_method,
    'pending',
    'pending',
    p_note,
    p_items
  )
  RETURNING id INTO v_order_id;

  FOR v_item IN
    SELECT * FROM jsonb_to_recordset(p_items)
      AS x("productId" TEXT, slug TEXT, name TEXT, quantity INT, "unitPrice" NUMERIC)
  LOOP
    INSERT INTO order_items (order_id, product_id, product_name, product_slug, quantity, unit_price)
    VALUES (
      v_order_id,
      CASE WHEN v_item."productId" ~ '^[0-9a-f-]{36}$' THEN v_item."productId"::uuid ELSE NULL END,
      v_item.name,
      v_item.slug,
      v_item.quantity,
      v_item."unitPrice"
    );
  END LOOP;

  v_email_payload := jsonb_build_object(
    'orderNumber', v_order_number,
    'customer', p_customer,
    'items', (
      SELECT jsonb_agg(jsonb_build_object(
        'name', x.name,
        'quantity', x.quantity,
        'unitPrice', x."unitPrice"::int
      ))
      FROM jsonb_to_recordset(p_items)
        AS x(name TEXT, quantity INT, "unitPrice" NUMERIC)
    ),
    'subtotal', p_subtotal::int,
    'shippingFee', p_shipping_fee::int,
    'total', p_total::int,
    'paymentMethod', p_payment_method
  );

  v_email_result := send_order_confirmation_email(v_email_payload, 'fr');

  RETURN jsonb_build_object(
    'ok', true,
    'orderId', v_order_id,
    'orderNumber', v_order_number,
    'email', v_email_result
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.place_order(JSONB, JSONB, TEXT, NUMERIC, NUMERIC, NUMERIC, TEXT) TO anon, authenticated;
