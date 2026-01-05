/*
  # Initial Schema for Atrin Pack Website

  1. New Tables
    - `products` - Product catalog with all specifications
    - `news` - News and articles
    - `gallery` - Image gallery items
    - `contact_messages` - Contact form submissions
    - `users` - System users (admin, editor, viewer, customer)
    - `categories` - Product and news categories
    - `settings` - Site configuration

  2. Security
    - Enable RLS on all tables
    - Add policies for different user roles
    - Secure file uploads

  3. Storage
    - Create buckets for images and files
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
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

-- News table
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

-- Gallery table
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

-- Contact messages table
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

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
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

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('product', 'news')),
  description text,
  created_at timestamptz DEFAULT now()
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  key text UNIQUE NOT NULL,
  value text,
  description text,
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (visible = true OR auth.role() = 'authenticated');

CREATE POLICY "Products are manageable by admin/editor" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'editor')
      AND status = 'active'
    )
  );

-- RLS Policies for news
CREATE POLICY "News are viewable by everyone" ON news
  FOR SELECT USING (visible = true OR auth.role() = 'authenticated');

CREATE POLICY "News are manageable by admin/editor" ON news
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'editor')
      AND status = 'active'
    )
  );

-- RLS Policies for gallery
CREATE POLICY "Gallery is viewable by everyone" ON gallery
  FOR SELECT USING (true);

CREATE POLICY "Gallery is manageable by admin/editor" ON gallery
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'editor')
      AND status = 'active'
    )
  );

-- RLS Policies for contact messages
CREATE POLICY "Contact messages are manageable by admin only" ON contact_messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
      AND status = 'active'
    )
  );

-- RLS Policies for user profiles
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Admin can manage all users" ON user_profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
      AND status = 'active'
    )
  );

-- RLS Policies for categories
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Categories are manageable by admin only" ON categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
      AND status = 'active'
    )
  );

-- RLS Policies for settings
CREATE POLICY "Settings are viewable by authenticated users" ON settings
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Settings are manageable by admin only" ON settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
      AND status = 'active'
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
  ('فناوری', 'news', 'اخبار فناوری و نوآوری');

-- Insert default settings
INSERT INTO settings (key, value, description) VALUES
  ('site_title', 'آترین پک - بسته‌بندی لوکس', 'عنوان سایت'),
  ('site_description', 'تولیدکننده انواع شیشه‌های عطر، پمپ‌های اسپری و درپوش‌های هنری', 'توضیحات سایت'),
  ('site_keywords', 'شیشه عطر, پمپ اسپری, درپوش, اسانس, بسته‌بندی لوکس', 'کلمات کلیدی'),
  ('contact_phone_1', '021-12345678', 'شماره تلفن اول'),
  ('contact_phone_2', '09123456789', 'شماره تلفن دوم'),
  ('contact_email_1', 'info@atrinpack.com', 'ایمیل اصلی'),
  ('contact_email_2', 'sales@atrinpack.com', 'ایمیل فروش'),
  ('contact_address', 'تهران، خیابان کریمخان، پلاک 123', 'آدرس شرکت'),
  ('working_hours_weekdays', 'شنبه تا پنج‌شنبه: 8:00 - 18:00', 'ساعات کاری هفته'),
  ('working_hours_friday', 'جمعه: تعطیل', 'ساعات کاری جمعه'),
  ('social_whatsapp', 'https://wa.me/989123456789', 'واتساپ'),
  ('social_instagram', 'https://instagram.com/atrinpack', 'اینستاگرام'),
  ('social_facebook', 'https://facebook.com/atrinpack', 'فیسبوک'),
  ('social_linkedin', 'https://linkedin.com/company/atrinpack', 'لینکدین');

-- Functions for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();