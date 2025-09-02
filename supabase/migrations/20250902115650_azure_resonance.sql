```sql
-- Drop existing problematic policies first to avoid conflicts
-- Note: Policy names might vary, so dropping by name is safer if known,
-- otherwise, dropping all policies on the table and recreating is an option.
-- Based on the schema, these are the policy names:
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;

DROP POLICY IF EXISTS "Authenticated users can view all products" ON public.products;
DROP POLICY IF EXISTS "Editors and admins can manage products" ON public.products;
DROP POLICY IF EXISTS "Products are viewable by everyone" ON public.products;

DROP POLICY IF EXISTS "Authenticated users can view all news" ON public.news;
DROP POLICY IF EXISTS "Editors and admins can manage news" ON public.news;
DROP POLICY IF EXISTS "News are viewable by everyone" ON public.news;

DROP POLICY IF EXISTS "Editors and admins can manage gallery" ON public.gallery;
DROP POLICY IF EXISTS "Gallery is viewable by everyone" ON public.gallery;

DROP POLICY IF EXISTS "Anyone can create contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated users can view contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Editors and admins can manage contact messages" ON public.contact_messages;

DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON public.categories;

DROP POLICY IF EXISTS "Admins can manage settings" ON public.settings;


-- Drop existing helper functions if they exist to avoid conflicts
DROP FUNCTION IF EXISTS public.is_admin(uuid);
DROP FUNCTION IF EXISTS public.is_editor_or_admin(uuid);
DROP FUNCTION IF EXISTS public.is_admin_role();
DROP FUNCTION IF EXISTS public.is_editor_role();
DROP FUNCTION IF EXISTS public.is_viewer_role();
DROP FUNCTION IF EXISTS public.is_customer_role();
DROP FUNCTION IF EXISTS public.get_user_role(uuid);
DROP FUNCTION IF EXISTS public.get_user_status(uuid);


-- Create helper functions in the public schema
-- These functions will read user_profiles bypassing RLS because of SECURITY DEFINER
-- and then be used in RLS policies.

CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER -- This is crucial: it runs with the privileges of the function owner (usually postgres)
SET search_path = public -- Ensures user_profiles is found in public schema
AS $$
DECLARE
  user_role text;
BEGIN
  SELECT role INTO user_role FROM user_profiles WHERE id = user_id;
  RETURN COALESCE(user_role, 'customer'); -- Default to 'customer' if no profile found
END;
$$;

CREATE OR REPLACE FUNCTION public.get_user_status(user_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_status text;
BEGIN
  SELECT status INTO user_status FROM user_profiles WHERE id = user_id;
  RETURN COALESCE(user_status, 'inactive'); -- Default to 'inactive' if no profile found
END;
$$;

-- Wrapper functions for roles, using the new helper functions
CREATE OR REPLACE FUNCTION public.is_admin_role()
RETURNS boolean
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN public.get_user_role(auth.uid()) = 'admin' AND public.get_user_status(auth.uid()) = 'active';
END;
$$;

CREATE OR REPLACE FUNCTION public.is_editor_role()
RETURNS boolean
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN public.get_user_role(auth.uid()) = 'editor' AND public.get_user_status(auth.uid()) = 'active';
END;
$$;

CREATE OR REPLACE FUNCTION public.is_viewer_role()
RETURNS boolean
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN public.get_user_role(auth.uid()) = 'viewer' AND public.get_user_status(auth.uid()) = 'active';
END;
$$;

CREATE OR REPLACE FUNCTION public.is_customer_role()
RETURNS boolean
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN public.get_user_role(auth.uid()) = 'customer' AND public.get_user_status(auth.uid()) = 'active';
END;
$$;

CREATE OR REPLACE FUNCTION public.is_admin_or_editor_role()
RETURNS boolean
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN public.get_user_role(auth.uid()) IN ('admin', 'editor') AND public.get_user_status(auth.uid()) = 'active';
END;
$$;

-- Grant execute permissions on these functions to the authenticated role
GRANT EXECUTE ON FUNCTION public.get_user_role(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_status(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin_role() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_editor_role() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_viewer_role() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_customer_role() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin_or_editor_role() TO authenticated;


-- Recreate RLS policies using the new helper functions
-- Policies for user_profiles table
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
    ON public.user_profiles FOR SELECT
    TO authenticated
    USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
    ON public.user_profiles FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

CREATE POLICY "Admins can manage all profiles"
    ON public.user_profiles FOR ALL
    TO authenticated
    USING (public.is_admin_role())
    WITH CHECK (public.is_admin_role());


-- Policies for products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
    ON public.products FOR SELECT
    TO public
    USING (visible = true);

CREATE POLICY "Authenticated users can view all products"
    ON public.products FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Editors and admins can manage products"
    ON public.products FOR ALL
    TO authenticated
    USING (public.is_admin_or_editor_role())
    WITH CHECK (public.is_admin_or_editor_role());


-- Policies for news table
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "News are viewable by everyone"
    ON public.news FOR SELECT
    TO public
    USING (visible = true);

CREATE POLICY "Authenticated users can view all news"
    ON public.news FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Editors and admins can manage news"
    ON public.news FOR ALL
    TO authenticated
    USING (public.is_admin_or_editor_role())
    WITH CHECK (public.is_admin_or_editor_role());


-- Policies for gallery table
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery is viewable by everyone"
    ON public.gallery FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Editors and admins can manage gallery"
    ON public.gallery FOR ALL
    TO authenticated
    USING (public.is_admin_or_editor_role())
    WITH CHECK (public.is_admin_or_editor_role());


-- Policies for contact_messages table
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create contact messages"
    ON public.contact_messages FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages"
    ON public.contact_messages FOR SELECT
    TO authenticated
    USING (public.is_admin_or_editor_role()); -- Editors can also view contact messages

CREATE POLICY "Editors and admins can manage contact messages"
    ON public.contact_messages FOR ALL
    TO authenticated
    USING (public.is_admin_or_editor_role())
    WITH CHECK (public.is_admin_or_editor_role());


-- Policies for categories table
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
    ON public.categories FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Admins can manage categories"
    ON public.categories FOR ALL
    TO authenticated
    USING (public.is_admin_role())
    WITH CHECK (public.is_admin_role());


-- Policies for settings table
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage settings"
    ON public.settings FOR ALL
    TO authenticated
    USING (public.is_admin_role())
    WITH CHECK (public.is_admin_role());
```