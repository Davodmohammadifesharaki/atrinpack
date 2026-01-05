/*
  # Fix Storage Policies for Image Uploads

  1. Storage Policies
    - Allow authenticated users to upload images to 'images' bucket
    - Allow public read access to images
    - Allow authenticated users to delete their own uploaded images
    - Restrict upload access to admin and editor users only

  2. Security
    - Only admin and editor users can upload images
    - Public users can view images
    - Authenticated users can manage their own uploads
*/

-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow authenticated uploads to images bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete own images" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin and editor uploads to images bucket" ON storage.objects;

-- Policy for allowing admin and editor users to upload images
CREATE POLICY "Allow admin and editor uploads to images bucket"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'images' 
  AND is_editor_or_admin(auth.uid())
);

-- Policy for allowing public read access to images
CREATE POLICY "Allow public read access to images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'images');

-- Policy for allowing authenticated users to delete images (admin/editor only)
CREATE POLICY "Allow admin and editor to delete images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'images' 
  AND is_editor_or_admin(auth.uid())
);

-- Policy for allowing authenticated users to update images (admin/editor only)
CREATE POLICY "Allow admin and editor to update images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'images' 
  AND is_editor_or_admin(auth.uid())
)
WITH CHECK (
  bucket_id = 'images' 
  AND is_editor_or_admin(auth.uid())
);

-- Ensure the images bucket exists and is public for read access
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images', 
  'images', 
  true, 
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];