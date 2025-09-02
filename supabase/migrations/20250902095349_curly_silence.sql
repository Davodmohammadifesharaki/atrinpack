/*
  # Fix RLS Infinite Recursion and Authentication Issues

  1. Security Functions
    - Create helper functions with SECURITY DEFINER to avoid RLS recursion
    - Functions to check user roles and authentication status

  2. Drop All Existing Policies
    - Remove all existing RLS policies that cause recursion
    - Clean slate approach to avoid conflicts

  3. Recreate RLS Policies
    - Simple, non-recursive policies using helper functions
    - Proper access control for admin, editor, and customer roles

  4. Sample Users
    - Ensure test users exist with proper roles
    - Admin, editor, and customer accounts for testing
*/

-- Drop all existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;
DROP POLICY IF EXISTS "News are viewable by everyone" ON news;
DROP POLICY IF EXISTS "Authenticated users can manage news" ON news;
DROP POLICY IF EXISTS "Gallery is viewable by everyone" ON gallery;
DROP POLICY IF EXISTS "Authenticated users can manage gallery" ON gallery;
DROP POLICY IF EXISTS "Authenticated users can manage contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
DROP POLICY IF EXISTS "Authenticated users can manage categories" ON categories;
DROP POLICY IF EXISTS "Authenticated users can manage settings" ON settings;

-- Create helper functions with SECURITY DEFINER to avoid RLS recursion
CREATE OR REPLACE FUNCTION get_user_role(user_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role text;
BEGIN
  SELECT role INTO user_role
  FROM user_profiles
  WHERE id = user_id AND status = 'active';
  
  RETURN COALESCE(user_role, 'customer');
END;
$$;

CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN get_user_role(user_id) = 'admin';
END;
$$;

CREATE OR REPLACE FUNCTION is_editor_or_admin(user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role text;
BEGIN
  user_role := get_user_role(user_id);
  RETURN user_role IN ('admin', 'editor');
END;
$$;

-- Recreate RLS policies for user_profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can manage all profiles"
  ON user_profiles
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Recreate RLS policies for products
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (visible = true);

CREATE POLICY "Authenticated users can view all products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Editors and admins can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (is_editor_or_admin(auth.uid()))
  WITH CHECK (is_editor_or_admin(auth.uid()));

-- Recreate RLS policies for news
CREATE POLICY "News are viewable by everyone"
  ON news
  FOR SELECT
  TO public
  USING (visible = true);

CREATE POLICY "Authenticated users can view all news"
  ON news
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Editors and admins can manage news"
  ON news
  FOR ALL
  TO authenticated
  USING (is_editor_or_admin(auth.uid()))
  WITH CHECK (is_editor_or_admin(auth.uid()));

-- Recreate RLS policies for gallery
CREATE POLICY "Gallery is viewable by everyone"
  ON gallery
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Editors and admins can manage gallery"
  ON gallery
  FOR ALL
  TO authenticated
  USING (is_editor_or_admin(auth.uid()))
  WITH CHECK (is_editor_or_admin(auth.uid()));

-- Recreate RLS policies for contact_messages
CREATE POLICY "Authenticated users can view contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (is_editor_or_admin(auth.uid()));

CREATE POLICY "Anyone can create contact messages"
  ON contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Editors and admins can manage contact messages"
  ON contact_messages
  FOR ALL
  TO authenticated
  USING (is_editor_or_admin(auth.uid()))
  WITH CHECK (is_editor_or_admin(auth.uid()));

-- Recreate RLS policies for categories
CREATE POLICY "Categories are viewable by everyone"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON categories
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Recreate RLS policies for settings
CREATE POLICY "Admins can manage settings"
  ON settings
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Ensure sample users exist (this will only insert if they don't exist)
DO $$
DECLARE
  admin_user_id uuid;
  editor_user_id uuid;
  customer_user_id uuid;
BEGIN
  -- Check if admin user exists
  SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@atrinpack.com';
  
  IF admin_user_id IS NULL THEN
    -- Create admin user
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@atrinpack.com',
      crypt('admin123456', gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider": "email", "providers": ["email"]}',
      '{}',
      false,
      '',
      '',
      '',
      ''
    ) RETURNING id INTO admin_user_id;
  END IF;

  -- Check if editor user exists
  SELECT id INTO editor_user_id FROM auth.users WHERE email = 'editor@atrinpack.com';
  
  IF editor_user_id IS NULL THEN
    -- Create editor user
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'editor@atrinpack.com',
      crypt('editor123456', gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider": "email", "providers": ["email"]}',
      '{}',
      false,
      '',
      '',
      '',
      ''
    ) RETURNING id INTO editor_user_id;
  END IF;

  -- Check if customer user exists
  SELECT id INTO customer_user_id FROM auth.users WHERE email = 'customer@example.com';
  
  IF customer_user_id IS NULL THEN
    -- Create customer user
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'customer@example.com',
      crypt('customer123456', gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider": "email", "providers": ["email"]}',
      '{}',
      false,
      '',
      '',
      '',
      ''
    ) RETURNING id INTO customer_user_id;
  END IF;

  -- Create user profiles if they don't exist
  INSERT INTO user_profiles (id, full_name, username, role, status)
  VALUES 
    (admin_user_id, 'امین جعفری', 'aminjafari', 'admin', 'active'),
    (editor_user_id, 'مریم احمدی', 'maryam.ahmadi', 'editor', 'active'),
    (customer_user_id, 'علی رضایی', 'ali.rezaei', 'customer', 'active')
  ON CONFLICT (id) DO NOTHING;

END $$;