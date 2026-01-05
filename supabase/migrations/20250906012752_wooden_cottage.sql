/*
  # Add Multiple Images Support

  1. Schema Changes
    - Add `images` column to products, news, and gallery tables
    - Keep existing `image_url` for backward compatibility
    - Add indexes for better performance

  2. Migration Strategy
    - Add new columns without breaking existing data
    - Migrate existing single images to array format
    - Update triggers and policies as needed
*/

-- Add images array column to products table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'images'
  ) THEN
    ALTER TABLE products ADD COLUMN images text[] DEFAULT '{}';
  END IF;
END $$;

-- Add images array column to news table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'news' AND column_name = 'images'
  ) THEN
    ALTER TABLE news ADD COLUMN images text[] DEFAULT '{}';
  END IF;
END $$;

-- Add images array column to gallery table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'gallery' AND column_name = 'images'
  ) THEN
    ALTER TABLE gallery ADD COLUMN images text[] DEFAULT '{}';
  END IF;
END $$;

-- Migrate existing single images to array format for products
UPDATE products 
SET images = CASE 
  WHEN image_url IS NOT NULL AND image_url != '' THEN ARRAY[image_url]
  ELSE '{}'
END
WHERE images = '{}' OR images IS NULL;

-- Migrate existing single images to array format for news
UPDATE news 
SET images = CASE 
  WHEN image_url IS NOT NULL AND image_url != '' THEN ARRAY[image_url]
  ELSE '{}'
END
WHERE images = '{}' OR images IS NULL;

-- Migrate existing single images to array format for gallery
UPDATE gallery 
SET images = CASE 
  WHEN image_url IS NOT NULL AND image_url != '' THEN ARRAY[image_url]
  ELSE '{}'
END
WHERE images = '{}' OR images IS NULL;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_images ON products USING GIN (images);
CREATE INDEX IF NOT EXISTS idx_news_images ON news USING GIN (images);
CREATE INDEX IF NOT EXISTS idx_gallery_images ON gallery USING GIN (images);

-- Add helper function to get primary image
CREATE OR REPLACE FUNCTION get_primary_image(images text[], fallback_url text DEFAULT NULL)
RETURNS text AS $$
BEGIN
  IF array_length(images, 1) > 0 THEN
    RETURN images[1];
  ELSE
    RETURN fallback_url;
  END IF;
END;
$$ LANGUAGE plpgsql;