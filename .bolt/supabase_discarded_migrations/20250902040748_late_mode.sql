-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create update_settings_updated_at_column trigger function (specific for settings table)
CREATE OR REPLACE FUNCTION update_settings_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 1. User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
    id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name text NOT NULL,
    username text UNIQUE NOT NULL,
    phone text,
    company text,
    role text DEFAULT 'customer' CHECK (role IN ('admin', 'editor', 'viewer', 'customer')),
    status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    last_login timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL UNIQUE, -- Added UNIQUE constraint
    type text NOT NULL CHECK (type IN ('product', 'news')),
    description text,
    created_at timestamptz DEFAULT now()
);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS products (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    category text NOT NULL,
    description text,
    image_url text,
    price text,
    min_order integer DEFAULT 1,
    weight numeric,
    dimensions text,
    color text,
    volume text,
    material text,
    shape text,
    is_new boolean DEFAULT false,
    is_featured boolean DEFAULT false,
    show_in_mix_match boolean DEFAULT false,
    visible boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 4. News Table
CREATE TABLE IF NOT EXISTS news (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    category text NOT NULL,
    content text NOT NULL,
    excerpt text,
    image_url text,
    date date DEFAULT CURRENT_DATE,
    featured boolean DEFAULT false,
    visible boolean DEFAULT true,
    read_time text,
    views integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 5. Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    category text NOT NULL,
    description text,
    image_url text NOT NULL,
    views integer DEFAULT 0,
    downloads integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 6. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    company text,
    subject text NOT NULL,
    message text NOT NULL,
    status text DEFAULT 'new' CHECK (status IN ('new', 'replied', 'closed')),
    created_at timestamptz DEFAULT now()
);

-- 7. Settings Table
CREATE TABLE IF NOT EXISTS settings (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    key text UNIQUE NOT NULL,
    value text,
    description text,
    updated_at timestamptz DEFAULT now()
);

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_news_updated_at ON news;
CREATE TRIGGER update_news_updated_at
    BEFORE UPDATE ON news
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_gallery_updated_at ON gallery;
CREATE TRIGGER update_gallery_updated_at
    BEFORE UPDATE ON gallery
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_settings_updated_at ON settings;
CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW EXECUTE FUNCTION update_settings_updated_at_column();

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
CREATE POLICY "Users can view own profile"
    ON user_profiles FOR SELECT
    TO authenticated
    USING (id = auth.uid());

DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile"
    ON user_profiles FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS "Admin can manage all users" ON user_profiles;
CREATE POLICY "Admin can manage all users"
    ON user_profiles FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles up
            WHERE up.id = auth.uid()
            AND up.role = 'admin'
            AND up.status = 'active'
        )
    );

-- RLS Policies for products
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
CREATE POLICY "Products are viewable by everyone"
    ON products FOR SELECT
    TO public
    USING (visible = true);

DROP POLICY IF EXISTS "Products are manageable by authenticated admin/editor" ON products;
CREATE POLICY "Products are manageable by authenticated admin/editor"
    ON products FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles up
            WHERE up.id = auth.uid()
            AND up.role IN ('admin', 'editor')
            AND up.status = 'active'
        )
    );

-- RLS Policies for news
DROP POLICY IF EXISTS "News are viewable by everyone" ON news;
CREATE POLICY "News are viewable by everyone"
    ON news FOR SELECT
    TO public
    USING (visible = true);

DROP POLICY IF EXISTS "News are manageable by authenticated admin/editor" ON news;
CREATE POLICY "News are manageable by authenticated admin/editor"
    ON news FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles up
            WHERE up.id = auth.uid()
            AND up.role IN ('admin', 'editor')
            AND up.status = 'active'
        )
    );

-- RLS Policies for gallery
DROP POLICY IF EXISTS "Gallery is viewable by everyone" ON gallery;
CREATE POLICY "Gallery is viewable by everyone"
    ON gallery FOR SELECT
    TO public
    USING (true);

DROP POLICY IF EXISTS "Gallery is manageable by authenticated admin/editor" ON gallery;
CREATE POLICY "Gallery is manageable by authenticated admin/editor"
    ON gallery FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles up
            WHERE up.id = auth.uid()
            AND up.role IN ('admin', 'editor')
            AND up.status = 'active'
        )
    );

-- RLS Policies for contact_messages
DROP POLICY IF EXISTS "Contact messages are manageable by authenticated admin" ON contact_messages;
CREATE POLICY "Contact messages are manageable by authenticated admin"
    ON contact_messages FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles up
            WHERE up.id = auth.uid()
            AND up.role = 'admin'
            AND up.status = 'active'
        )
    );

-- RLS Policies for categories
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
CREATE POLICY "Categories are viewable by everyone"
    ON categories FOR SELECT
    TO public
    USING (true);

DROP POLICY IF EXISTS "Categories are manageable by authenticated admin" ON categories;
CREATE POLICY "Categories are manageable by authenticated admin"
    ON categories FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles up
            WHERE up.id = auth.uid()
            AND up.role = 'admin'
            AND up.status = 'active'
        )
    );

-- RLS Policies for settings
DROP POLICY IF EXISTS "Settings are viewable by authenticated users" ON settings;
CREATE POLICY "Settings are viewable by authenticated users"
    ON settings FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Settings are manageable by authenticated admin" ON settings;
CREATE POLICY "Settings are manageable by authenticated admin"
    ON settings FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles up
            WHERE up.id = auth.uid()
            AND up.role = 'admin'
            AND up.status = 'active'
        )
    );

-- Insert default categories
INSERT INTO categories (name, type, description) VALUES
('شیشه و بطری', 'product', 'انواع شیشه‌ها و بطری‌های عطر'),
('پمپ و اسپری', 'product', 'پمپ‌های اسپری و مه‌پاش'),
('درپوش', 'product', 'انواع درپوش‌های هنری'),
('اسانس', 'product', 'اسانس‌های طبیعی و مصنوعی'),
('پلمپر', 'product', 'دستگاه‌های پلمپر'),
('اخبار تولید', 'news', 'اخبار مربوط به تولید'),
('گواهینامه‌ها', 'news', 'اخبار گواهینامه‌ها'),
('نمایشگاه‌ها', 'news', 'اخبار نمایشگاه‌ها'),
('محصولات جدید', 'news', 'معرفی محصولات جدید'),
('فناوری', 'news', 'اخبار فناوری و نوآوری')
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, category, description, image_url, price, min_order, weight, dimensions, color, volume, material, shape, is_new, is_featured, show_in_mix_match, visible) VALUES
('بطری عطر کریستالی 50ml', 'شیشه و بطری', 'بطری عطر کریستالی با کیفیت بالا و طراحی زیبا', 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop', 'استعلام قیمت', 100, 200, '5×5×10 سانتی‌متر', 'شفاف', '50ml', 'شیشه کریستالی', 'استوانه‌ای', true, true, true, true),
('پمپ اسپری طلایی لوکس', 'پمپ و اسپری', 'پمپ اسپری با پوشش طلایی و کیفیت بالا', 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=400&fit=crop', 'استعلام قیمت', 50, 50, '2×2×5 سانتی‌متر', 'طلایی', '-', 'فلز', 'استوانه‌ای', false, true, true, true),
('درپوش چوبی دست‌ساز', 'درپوش', 'درپوش چوبی با طراحی منحصر به فرد', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop', 'استعلام قیمت', 200, 30, '3×3×2 سانتی‌متر', 'قهوه‌ای', '-', 'چوب', 'گرد', true, false, true, true),
('اسانس گل رز طبیعی', 'اسانس', 'اسانس طبیعی گل رز با ماندگاری بالا', 'https://images.unsplash.com/photo-1588159343745-445ae0b16383?w=400&h=400&fit=crop', 'استعلام قیمت', 10, 10, '-', 'شفاف', '10ml', 'مایع', '-', false, true, false, true),
('بطری شیشه‌ای کلاسیک 100ml', 'شیشه و بطری', 'بطری شیشه‌ای کلاسیک مناسب برای انواع مایعات', 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop', 'استعلام قیمت', 100, 250, '6×6×12 سانتی‌متر', 'شفاف', '100ml', 'شیشه', 'استوانه‌ای', false, false, true, true);

-- Insert sample news
INSERT INTO news (title, category, content, excerpt, image_url, date, featured, visible, read_time, views) VALUES
('راه‌اندازی خط تولید جدید شیشه‌های کریستالی', 'اخبار تولید', 'شرکت آترین پک با هدف افزایش ظرفیت تولید و بهبود کیفیت محصولات، خط تولید جدید شیشه‌های کریستالی را راه‌اندازی کرد. این خط تولید با استفاده از جدیدترین تکنولوژی‌های روز دنیا و با سرمایه‌گذاری بالغ بر ۵ میلیارد تومان راه‌اندازی شده است.', 'آترین پک با راه‌اندازی خط تولید جدید، ظرفیت تولید شیشه‌های کریستالی را دو برابر کرده است.', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=400&fit=crop', '2024-01-15', true, true, '۳ دقیقه مطالعه', 245),
('دریافت گواهینامه ISO 9001:2015', 'گواهینامه‌ها', 'شرکت آترین پک موفق به دریافت گواهینامه بین‌المللی کیفیت ISO 9001:2015 شده است. این گواهینامه نشان‌دهنده تعهد ما به بالاترین استانداردهای کیفی در تمامی فرآیندهای تولید و خدمات است.', 'شرکت آترین پک موفق به دریافت گواهینامه بین‌المللی کیفیت ISO 9001:2015 شده است.', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop', '2024-01-10', false, true, '۲ دقیقه مطالعه', 189),
('حضور در نمایشگاه بین‌المللی بسته‌بندی', 'نمایشگاه‌ها', 'آترین پک در نمایشگاه بین‌المللی بسته‌بندی تهران حضور یافت و محصولات جدید خود را معرفی کرد. غرفه ما مورد استقبال بی‌نظیر بازدیدکنندگان و متخصصان صنعت قرار گرفت.', 'آترین پک در نمایشگاه بین‌المللی بسته‌بندی تهران حضور یافت و محصولات جدید خود را معرفی کرد.', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop', '2024-01-05', false, true, '۴ دقیقه مطالعه', 156),
('معرفی سری جدید پمپ‌های اسپری طلایی', 'محصولات جدید', 'مجموعه جدید پمپ‌های اسپری با پوشش طلایی و کیفیت بالا به بازار عرضه شد. این پمپ‌ها با طراحی ارگونومیک و عملکرد بی‌نقص، تجربه کاربری بی‌نظیری را ارائه می‌دهند.', 'مجموعه جدید پمپ‌های اسپری با پوشش طلایی و کیفیت بالا به بازار عرضه شد.', 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&h=400&fit=crop', '2024-01-01', true, true, '۳ دقیقه مطالعه', 312);

-- Insert sample gallery items
INSERT INTO gallery (title, category, description, image_url, views, downloads) VALUES
('بطری عطر کریستالی طلایی', 'شیشه و بطری', 'تصویری زیبا از بطری عطر کریستالی با جزئیات طلایی.', 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop', 156, 23),
('پمپ اسپری لوکس نقره‌ای', 'پمپ و اسپری', 'پمپ اسپری با طراحی لوکس و رنگ نقره‌ای، مناسب برای عطرهای خاص.', 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&h=600&fit=crop', 134, 18),
('درپوش هنری نقره‌ای', 'درپوش', 'درپوش دست‌ساز با جزئیات هنری و رنگ نقره‌ای.', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop', 98, 12),
('اسانس گل رز طبیعی', 'اسانس', 'تصویری از اسانس خالص گل رز، با رایحه‌ای دلنشین و ماندگار.', 'https://images.unsplash.com/photo-1588159343745-445ae0b16383?w=600&h=600&fit=crop', 201, 34),
('بطری شیشه‌ای کلاسیک', 'شیشه و بطری', 'بطری شیشه‌ای با طراحی کلاسیک و ساده، مناسب برای استفاده روزمره.', 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=600&fit=crop', 87, 9);

-- Insert test users (for auth.users table, these users need to be created via Supabase Auth UI or API first)
-- These inserts assume the users with these emails already exist in auth.users table.
-- You need to manually create these users in Supabase Authentication section first.
-- Then, you can run these inserts to link them to user_profiles table.

-- Example for admin user (replace with actual auth.users.id after creating user in Auth)
-- INSERT INTO user_profiles (id, full_name, username, email, phone, company, role, status, last_login, created_at, updated_at) VALUES
-- ('<UUID_OF_ADMIN_USER_FROM_AUTH_USERS>', 'امین جعفری', 'aminjafari', 'admin@atrinpack.com', '09123456789', 'آترین پک', 'admin', 'active', now(), now(), now());

-- Example for editor user
-- INSERT INTO user_profiles (id, full_name, username, email, phone, company, role, status, last_login, created_at, updated_at) VALUES
-- ('<UUID_OF_EDITOR_USER_FROM_AUTH_USERS>', 'مریم احمدی', 'maryam.ahmadi', 'editor@atrinpack.com', '09987654321', 'آترین پک', 'editor', 'active', now(), now(), now());

-- Example for customer user
-- INSERT INTO user_profiles (id, full_name, username, email, phone, company, role, status, last_login, created_at, updated_at) VALUES
-- ('<UUID_OF_CUSTOMER_USER_FROM_AUTH_USERS>', 'علی رضایی', 'ali.rezaei', 'customer@example.com', '09111222333', 'شرکت پارس عطر', 'customer', 'active', now(), now(), now());

-- Insert sample settings
INSERT INTO settings (key, value, description) VALUES
('site_title', 'آترین پک - بسته‌بندی لوکس', 'عنوان اصلی سایت'),
('site_description', 'تولیدکننده انواع شیشه‌های عطر، پمپ‌های اسپری، درپوش‌های هنری و اسانس‌های طبیعی با کیفیت بین‌المللی.', 'توضیحات متا برای سئو'),
('contact_phone_main', '021-12345678', 'شماره تلفن اصلی شرکت'),
('contact_phone_mobile', '09123456789', 'شماره موبایل برای واتساپ و تماس اضطراری'),
('contact_email_info', 'info@atrinpack.com', 'ایمیل عمومی برای اطلاعات'),
('contact_email_sales', 'sales@atrinpack.com', 'ایمیل برای بخش فروش'),
('contact_address', 'تهران، خیابان کریمخان، پلاک 123', 'آدرس فیزیکی شرکت'),
('working_hours_weekdays', 'شنبه تا پنج‌شنبه: 8:00 - 18:00', 'ساعات کاری در روزهای هفته'),
('working_hours_friday', 'جمعه: تعطیل', 'ساعات کاری در روز جمعه'),
('social_whatsapp', 'https://wa.me/989123456789', 'لینک واتساپ'),
('social_instagram', 'https://instagram.com/atrinpack', 'لینک اینستاگرام'),
('social_facebook', 'https://facebook.com/atrinpack', 'لینک فیسبوک'),
('social_linkedin', 'https://linkedin.com/company/atrinpack', 'لینک لینکدین'),
('map_location_url', 'https://maps.google.com/?q=35.6892,51.3890', 'لینک موقعیت مکانی در نقشه'),
('about_main_text', 'آترین پک با بیش از ۱۵ سال تجربه در صنعت بسته‌بندی لوکس، تولیدکننده انواع شیشه‌های عطر، پمپ‌های اسپری، درپوش‌های هنری و اسانس‌های طبیعی با کیفیت بین‌المللی است. ما با تکیه بر تجربه و دانش فنی تیم متخصص خود، توانسته‌ایم جایگاه ویژه‌ای در صنعت بسته‌بندی لوکس کسب کنیم و محصولاتمان در بازارهای داخلی و خارجی مورد استقبال قرار گرفته است.', 'متن اصلی صفحه درباره ما'),
('about_mission', 'تولید و ارائه محصولات بسته‌بندی با کیفیت بین‌المللی، طراحی خلاقانه و قیمت مناسب برای تمامی مشتریان در سراسر کشور و منطقه.', 'متن ماموریت شرکت'),
('about_vision', 'تبدیل شدن به برترین تولیدکننده محصولات بسته‌بندی لوکس در منطقه خاورمیانه و ارائه راه‌حل‌های نوآورانه به صنایع مختلف.', 'متن چشم‌انداز شرکت')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, description = EXCLUDED.description;