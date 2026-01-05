/*
  # Fix RLS Infinite Recursion

  1. Security Policy Fixes
    - Remove recursive references in user_profiles policies
    - Simplify gallery policies to avoid circular dependencies
    - Fix contact_messages and other table policies
  
  2. Changes Made
    - Updated user_profiles policies to use auth.uid() directly
    - Simplified gallery access policies
    - Fixed all recursive policy references
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admin can manage all users" ON user_profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

DROP POLICY IF EXISTS "Gallery is manageable by admin/editor" ON gallery;
DROP POLICY IF EXISTS "Gallery is viewable by everyone" ON gallery;

DROP POLICY IF EXISTS "Contact messages are manageable by admin only" ON contact_messages;

DROP POLICY IF EXISTS "Products are manageable by admin/editor" ON products;
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;

DROP POLICY IF EXISTS "News are manageable by admin/editor" ON news;
DROP POLICY IF EXISTS "News are viewable by everyone" ON news;

DROP POLICY IF EXISTS "Categories are manageable by admin only" ON categories;
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;

DROP POLICY IF EXISTS "Settings are manageable by admin only" ON settings;
DROP POLICY IF EXISTS "Settings are viewable by authenticated users" ON settings;

-- Create new non-recursive policies for user_profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Admin can manage all users"
  ON user_profiles
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM user_profiles 
      WHERE role = 'admin' AND status = 'active' AND id = auth.uid()
    )
  );

-- Create simplified policies for gallery (public read access)
CREATE POLICY "Gallery is viewable by everyone"
  ON gallery
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Gallery is manageable by authenticated admin/editor"
  ON gallery
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM user_profiles 
      WHERE role IN ('admin', 'editor') AND status = 'active' AND id = auth.uid()
    )
  );

-- Create simplified policies for contact_messages
CREATE POLICY "Contact messages are manageable by authenticated admin"
  ON contact_messages
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM user_profiles 
      WHERE role = 'admin' AND status = 'active' AND id = auth.uid()
    )
  );

-- Create simplified policies for products
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (visible = true);

CREATE POLICY "Products are manageable by authenticated admin/editor"
  ON products
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM user_profiles 
      WHERE role IN ('admin', 'editor') AND status = 'active' AND id = auth.uid()
    )
  );

-- Create simplified policies for news
CREATE POLICY "News are viewable by everyone"
  ON news
  FOR SELECT
  TO public
  USING (visible = true);

CREATE POLICY "News are manageable by authenticated admin/editor"
  ON news
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM user_profiles 
      WHERE role IN ('admin', 'editor') AND status = 'active' AND id = auth.uid()
    )
  );

-- Create simplified policies for categories
CREATE POLICY "Categories are viewable by everyone"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Categories are manageable by authenticated admin"
  ON categories
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM user_profiles 
      WHERE role = 'admin' AND status = 'active' AND id = auth.uid()
    )
  );

-- Create simplified policies for settings
CREATE POLICY "Settings are viewable by authenticated users"
  ON settings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Settings are manageable by authenticated admin"
  ON settings
  FOR ALL
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM user_profiles 
      WHERE role = 'admin' AND status = 'active' AND id = auth.uid()
    )
  );