/*
  # Remove Recursive RLS Policies

  This migration removes all RLS policies that cause infinite recursion
  by checking user roles in the user_profiles table. It replaces them
  with simple, non-recursive policies.

  ## Changes Made
  1. Drop all existing policies on all tables
  2. Create simple, non-recursive policies
  3. Allow public access to products, news, gallery, and categories
  4. Restrict user_profiles to authenticated users only
  5. Restrict contact_messages and settings to authenticated users
*/

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admin can manage all users" ON user_profiles;

DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;
DROP POLICY IF EXISTS "Products are manageable by authenticated admin/editor" ON products;

DROP POLICY IF EXISTS "News are viewable by everyone" ON news;
DROP POLICY IF EXISTS "Authenticated users can manage news" ON news;
DROP POLICY IF EXISTS "News are manageable by authenticated admin/editor" ON news;

DROP POLICY IF EXISTS "Gallery is viewable by everyone" ON gallery;
DROP POLICY IF EXISTS "Authenticated users can manage gallery" ON gallery;
DROP POLICY IF EXISTS "Gallery is manageable by authenticated admin/editor" ON gallery;

DROP POLICY IF EXISTS "Contact messages are manageable by authenticated admin" ON contact_messages;
DROP POLICY IF EXISTS "Authenticated users can manage contact messages" ON contact_messages;

DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
DROP POLICY IF EXISTS "Authenticated users can manage categories" ON categories;
DROP POLICY IF EXISTS "Categories are manageable by authenticated admin" ON categories;

DROP POLICY IF EXISTS "Settings are viewable by authenticated users" ON settings;
DROP POLICY IF EXISTS "Authenticated users can view settings" ON settings;
DROP POLICY IF EXISTS "Settings are manageable by authenticated admin" ON settings;
DROP POLICY IF EXISTS "Authenticated users can manage settings" ON settings;

-- Create simple, non-recursive policies

-- User Profiles: Only allow users to see/edit their own profile
CREATE POLICY "Users can view own profile"
    ON user_profiles FOR SELECT
    TO authenticated
    USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
    ON user_profiles FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Products: Public read, authenticated write
CREATE POLICY "Products are viewable by everyone"
    ON products FOR SELECT
    TO public
    USING (visible = true);

CREATE POLICY "Authenticated users can manage products"
    ON products FOR ALL
    TO authenticated
    USING (true);

-- News: Public read, authenticated write
CREATE POLICY "News are viewable by everyone"
    ON news FOR SELECT
    TO public
    USING (visible = true);

CREATE POLICY "Authenticated users can manage news"
    ON news FOR ALL
    TO authenticated
    USING (true);

-- Gallery: Public read, authenticated write
CREATE POLICY "Gallery is viewable by everyone"
    ON gallery FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Authenticated users can manage gallery"
    ON gallery FOR ALL
    TO authenticated
    USING (true);

-- Contact Messages: Authenticated users only
CREATE POLICY "Authenticated users can manage contact messages"
    ON contact_messages FOR ALL
    TO authenticated
    USING (true);

-- Categories: Public read, authenticated write
CREATE POLICY "Categories are viewable by everyone"
    ON categories FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Authenticated users can manage categories"
    ON categories FOR ALL
    TO authenticated
    USING (true);

-- Settings: Authenticated users only
CREATE POLICY "Authenticated users can manage settings"
    ON settings FOR ALL
    TO authenticated
    USING (true);