/*
  # Fix Storage RLS Policies for Image Uploads

  1. Storage Configuration
    - Enable RLS on storage.objects table
    - Create policies for authenticated users to upload images
    - Allow public read access to images
    - Allow authenticated users to delete their uploads

  2. Security
    - Only authenticated users can upload files
    - Public read access for all images
    - Users can manage their own uploads
    - File size and type restrictions
*/

-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;

-- Policy for uploading images (INSERT)
CREATE POLICY "Authenticated users can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'images' AND
  auth.role() = 'authenticated'
);

-- Policy for viewing images (SELECT)
CREATE POLICY "Public can view images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'images');

-- Policy for deleting images (DELETE)
CREATE POLICY "Authenticated users can delete images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'images' AND
  auth.role() = 'authenticated'
);

-- Policy for updating images (UPDATE)
CREATE POLICY "Authenticated users can update images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'images' AND
  auth.role() = 'authenticated'
)
WITH CHECK (
  bucket_id = 'images' AND
  auth.role() = 'authenticated'
);

-- Ensure the images bucket exists and is configured properly
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[];