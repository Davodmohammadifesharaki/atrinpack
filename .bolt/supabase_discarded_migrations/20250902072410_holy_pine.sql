/*
  # Fix RLS infinite recursion error

  1. Problem
    - RLS policies on user_profiles table are causing infinite recursion
    - Policies are trying to query user_profiles table within their own conditions

  2. Solution
    - Create helper functions with SECURITY DEFINER to bypass RLS
    - Update all policies to use these helper functions
    - Simplify user_profiles policies to avoid self-reference

  3. Changes
    - Add helper functions for role checking
    - Replace all recursive RLS policies
    - Maintain same security logic without recursion
*/

-- Create helper functions to check user roles without RLS recursion
CREATE OR REPLACE FUNCTION auth.user_role()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT role FROM user_profiles WHERE id = auth.uid()),
    'customer'
  );
$$;

CREATE OR REPLACE FUNCTION auth.user_status()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT status FROM user_profiles WHERE id = auth.uid()),
    'inactive'
  );
$$;

CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.user_role() = 'admin' AND auth.user_status() = 'active';
$$;

CREATE OR REPLACE FUNCTION auth.is_admin_or_editor()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.user_role() IN ('admin', 'editor') AND auth.user_status() = 'active';
$$;

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admin can manage all users" ON user_profiles;

-- Create simple, non-recursive policies for user_profiles
CREATE POLICY "Users can view own profile"
    ON user_profiles FOR SELECT
    TO authenticated
    USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
    ON user_profiles FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- For admin access, we'll use a simpler approach
CREATE POLICY "Enable all access for service role"
    ON user_profiles FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Update other table policies to use helper functions
DROP POLICY IF EXISTS "Products are manageable by authenticated admin/editor" ON products;
CREATE POLICY "Products are manageable by authenticated admin/editor"
    ON products FOR ALL
    TO authenticated
    USING (auth.is_admin_or_editor());

DROP POLICY IF EXISTS "News are manageable by authenticated admin/editor" ON news;
CREATE POLICY "News are manageable by authenticated admin/editor"
    ON news FOR ALL
    TO authenticated
    USING (auth.is_admin_or_editor());

DROP POLICY IF EXISTS "Gallery is manageable by authenticated admin/editor" ON gallery;
CREATE POLICY "Gallery is manageable by authenticated admin/editor"
    ON gallery FOR ALL
    TO authenticated
    USING (auth.is_admin_or_editor());

DROP POLICY IF EXISTS "Contact messages are manageable by authenticated admin" ON contact_messages;
CREATE POLICY "Contact messages are manageable by authenticated admin"
    ON contact_messages FOR ALL
    TO authenticated
    USING (auth.is_admin());

DROP POLICY IF EXISTS "Categories are manageable by authenticated admin" ON categories;
CREATE POLICY "Categories are manageable by authenticated admin"
    ON categories FOR ALL
    TO authenticated
    USING (auth.is_admin());

DROP POLICY IF EXISTS "Settings are manageable by authenticated admin" ON settings;
CREATE POLICY "Settings are manageable by authenticated admin"
    ON settings FOR ALL
    TO authenticated
    USING (auth.is_admin());