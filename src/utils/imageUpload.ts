import { supabase } from '../lib/supabase';

export const uploadImage = async (file: File, bucket: string = 'images'): Promise<string | null> => {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${bucket}/${fileName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    return null;
  }
};

export const deleteImage = async (url: string, bucket: string = 'images'): Promise<boolean> => {
  try {
    // Extract file path from URL
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const filePath = `${bucket}/${fileName}`;

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteImage:', error);
    return false;
  }
};

export const uploadMultipleImages = async (files: File[], bucket: string = 'images'): Promise<string[]> => {
  const uploadPromises = files.map(file => uploadImage(file, bucket));
  const results = await Promise.all(uploadPromises);
  return results.filter((url): url is string => url !== null);
};

export const deleteMultipleImages = async (urls: string[], bucket: string = 'images'): Promise<boolean[]> => {
  const deletePromises = urls.map(url => deleteImage(url, bucket));
  const results = await Promise.all(deletePromises);
  return results;
};

export const getImageUrl = (images: string[] | undefined, fallback?: string): string => {
  if (images && images.length > 0) {
    return images[0];
  }
  return fallback || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop';
};

export const getAllImages = (images: string[] | undefined, imageUrl?: string): string[] => {
  if (images && images.length > 0) {
    return images;
  }
  if (imageUrl) {
    return [imageUrl];
  }
  return [];
}