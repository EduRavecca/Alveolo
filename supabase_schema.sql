-- ==========================================================================
-- SCRIPT SQL SUPABASE - ALVEOLO PIZZERÍA MASA MADRE
-- Copia y pega todo este código en el "SQL Editor" de tu proyecto en Supabase
-- ==========================================================================

-- 1. Tabla de Productos (Pizzas, Combos, Bebidas)
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  image TEXT,
  badge TEXT,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabla de Gustos (Ingredientes opcionales para personalizar)
CREATE TABLE IF NOT EXISTS public.flavors (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabla de Pedidos (Ventas & Pantalla de Cocina)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  customer_name TEXT NOT NULL,
  delivery_mode TEXT NOT NULL, -- 'delivery' o 'retiro'
  address TEXT,
  notes TEXT,
  items JSONB NOT NULL, -- [{title, qty, price, options}]
  subtotal NUMERIC NOT NULL,
  total NUMERIC NOT NULL,
  status TEXT DEFAULT 'pendiente' NOT NULL -- 'pendiente', 'en_horno', 'listo', 'entregado'
);

-- 4. Configuración del Local (Abierto/Cerrado & Mensajes)
CREATE TABLE IF NOT EXISTS public.store_settings (
  id INT PRIMARY KEY DEFAULT 1,
  is_open BOOLEAN DEFAULT true,
  announcement TEXT DEFAULT '¡Masa Madre con 48hs de Fermentación!',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar permisos de lectura/escritura públicos (Row Level Security)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flavors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura publica a products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Permitir escritura publica a products" ON public.products FOR ALL USING (true);

CREATE POLICY "Permitir lectura publica a flavors" ON public.flavors FOR SELECT USING (true);
CREATE POLICY "Permitir escritura publica a flavors" ON public.flavors FOR ALL USING (true);

CREATE POLICY "Permitir lectura publica a orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Permitir escritura publica a orders" ON public.orders FOR ALL USING (true);

CREATE POLICY "Permitir lectura publica a store_settings" ON public.store_settings FOR SELECT USING (true);
CREATE POLICY "Permitir escritura publica a store_settings" ON public.store_settings FOR ALL USING (true);

-- Habilitar Tiempo Real (Realtime) en la tabla de Pedidos para la pantalla de cocina
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.store_settings;

-- INSERT DE PRODUCTOS INICIALES (Menú Alveolo)
INSERT INTO public.products (id, title, category, price, description, image, badge, in_stock) VALUES
('mm-pesto', 'Pizza Masa Madre (32 cm) - Pesto', 'masa-madre', 500, 'Masa fermentada 48hs, salsa de tomate casera, muzzarella y remolino de pesto de la casa (perejil, ajo, albahaca).', 'assets/pizza_masa_madre_pesto.jpg', '⭐ Recomendada', true),
('mm-peperoni', 'Pizza Masa Madre (32 cm) - Peperoni', 'masa-madre', 500, 'Masa madre de 32cm con muzzarella derretida y abundantes rodajas de peperoni tostado a la piedra.', 'assets/hero_pizza.png', 'Popular', true),
('mm-capresse', 'Pizza Masa Madre (32 cm) - Capresse', 'masa-madre', 500, 'Salsa de tomate, muzzarella fundida, rodajas de tomates frescos y hojas de albahaca recién cortadas.', 'assets/pizza_burrata.png', 'Fresco', true),
('mm-bondiola', 'Pizza Masa Madre (32 cm) - Bondiola', 'masa-madre', 500, 'Masa suave y esponjosa con muzzarella premium y fetas de bondiola artesanal horneada.', 'assets/hero_pizza.png', 'Gourmet', true),
('mm-cebolla', 'Pizza Masa Madre (32 cm) - Cebolla Caramelizada', 'masa-madre', 500, 'Cebollas suavemente caramelizadas al horno sobre una base de muzzarella cremosísima.', 'assets/pizza_masa_madre_pesto.jpg', 'Especial', true),
('mm-panceta', 'Pizza Masa Madre (32 cm) - Panceta Crocante', 'masa-madre', 500, 'Masa alveolada coronada con trozos generosos de panceta crocante dorada en el horno de piedra.', 'assets/pizza_metro_panceta_aceitunas.jpg', 'Favorito', true),

('metro-half-muzza', '1/2 Metro de Muzza Tradicional', 'por-metro', 450, 'Medio metro de pizza a la piedra con salsa de tomate especial y generosa muzzarella dorada.', 'assets/pizza_medio_metro_coca.jpg', 'Rinde 2 personas', true),
('metro-half-2gustos', '1/2 Metro de Muzza + 2 Gustos', 'por-metro', 600, 'Medio metro de muzzarella tradicional a la piedra combinando 2 gustos a tu elección.', 'assets/pizza_metro_panceta_aceitunas.jpg', 'Personalizable', true),
('metro-full-muzza', '1 Metro de Muzza Tradicional', 'por-metro', 770, 'Un metro entero de nuestra clásica muzzarella a la piedra. La mejor opción para reuniones.', 'assets/pizza_medio_metro_coca.jpg', 'Para Grupos (4 pers)', true),
('metro-full-2gustos', '1 Metro de Muzza + 2 Gustos', 'por-metro', 970, 'Un metro completo de muzzarella a la piedra combinando tus 2 gustos favoritos.', 'assets/pizza_metro_panceta_aceitunas.jpg', 'El Gigante', true),

('faina-slice', 'Porción de Fainá Tradicional', 'gustos', 120, 'Fainá de garbanzos dorado a la piedra con pimienta negra recién molida.', 'assets/faina.png', 'Acompañamiento', true),
('extra-gusto', 'Gusto Adicional para Pizza', 'gustos', 150, 'Agrega Bondiola, Capresse, Cebolla Caramelizada, Pesto, Panceta, Aceitunas o Peperoni.', 'assets/logo.jpg', 'Extra', true),

('coca-15l', 'Coca-Cola / Coca-Cola Zero 1.5L', 'bebidas', 180, 'Botella familiar de 1.5 Litros bien helada.', 'assets/pizza_medio_metro_coca.jpg', 'Bebida', true),
('cerveza-art', 'Cerveza Artesanal 500ml', 'bebidas', 220, 'Cerveza helada de cebada seleccionada ideal para maridar con pizza de masa madre.', 'assets/hero_pizza.png', 'Fría', true)
ON CONFLICT (id) DO NOTHING;

-- INSERT DE GUSTOS INICIALES
INSERT INTO public.flavors (name, in_stock) VALUES
('Bondiola', true),
('Capresse (tomate, albahaca, queso)', true),
('Cebolla caramelizada', true),
('Pesto (perejil, ajo, albahaca)', true),
('Panceta crocante', true),
('Aceitunas', true),
('Peperoni', true)
ON CONFLICT (name) DO NOTHING;

-- INSERT DE CONFIGURACIÓN INICIAL
INSERT INTO public.store_settings (id, is_open, announcement) VALUES
(1, true, '¡Masa Madre con 48hs de Fermentación!')
ON CONFLICT (id) DO NOTHING;
