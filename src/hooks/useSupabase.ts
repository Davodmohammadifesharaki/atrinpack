import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { uploadImage, deleteImage, uploadMultipleImages, deleteMultipleImages } from '../utils/imageUpload';
import type { Product, News, GalleryItem, ContactMessage, User, UserProfile } from '../lib/supabase';

// Single product hook
export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در بارگذاری محصول');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error, refetch: fetchProduct };
};

// Single news hook
export const useNewsItem = (id: string) => {
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setNews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در بارگذاری خبر');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchNews();
    }
  }, [id]);

  return { news, loading, error, refetch: fetchNews };
};

// Hook for products
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('visible', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در بارگذاری محصولات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};

// Hook for all products (admin)
export const useAllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در بارگذاری محصولات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};

// Hook for news
export const useNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('visible', true)
        .order('date', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در بارگذاری اخبار');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return { news, loading, error, refetch: fetchNews };
};

// Hook for all news (admin)
export const useAllNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در بارگذاری اخبار');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return { news, loading, error, refetch: fetchNews };
};

// Hook for gallery
export const useGallery = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGallery(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در بارگذاری گالری');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return { gallery, loading, error, refetch: fetchGallery };
};

// Hook for contact messages (admin only)
export const useContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در بارگذاری پیام‌ها');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return { messages, loading, error, refetch: fetchMessages };
};

// Hook for authentication
export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signUp = async (email: string, password: string, metadata: any = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut
  };
};

// Utility functions for data operations
export const productOperations = {
  create: async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>, imageFiles?: File[]) => {
    let images: string[] = [];
    
    // Upload images if provided
    if (imageFiles && imageFiles.length > 0) {
      images = await uploadMultipleImages(imageFiles, 'products');
      if (images.length === 0) {
        return { data: null, error: new Error('خطا در آپلود تصویر') };
      }
    }

    const { data, error } = await supabase
      .from('products')
      .insert([{ 
        ...productData, 
        images,
        image_url: images.length > 0 ? images[0] : null 
      }])
      .select()
      .single();
    return { data, error };
  },

  update: async (id: string, productData: Partial<Product>, imageFiles?: File[]) => {
    let updateData = { ...productData };
    
    // Upload new images if provided
    if (imageFiles && imageFiles.length > 0) {
      // Get current product to delete old images
      const { data: currentProduct } = await supabase
        .from('products')
        .select('images, image_url')
        .eq('id', id)
        .single();

      const newImages = await uploadMultipleImages(imageFiles, 'products');
      if (newImages.length === 0) {
        return { data: null, error: new Error('خطا در آپلود تصویر') };
      }

      // Delete old images if exist
      if (currentProduct?.images && currentProduct.images.length > 0) {
        await deleteMultipleImages(currentProduct.images, 'products');
      } else if (currentProduct?.image_url) {
        await deleteImage(currentProduct.image_url, 'products');
      }

      updateData.images = newImages;
      updateData.image_url = newImages[0];
    }

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  delete: async (id: string) => {
    // Get product to delete associated images
    const { data: product } = await supabase
      .from('products')
      .select('images, image_url')
      .eq('id', id)
      .single();

    // Delete images from storage if exist
    if (product?.images && product.images.length > 0) {
      await deleteMultipleImages(product.images, 'products');
    } else if (product?.image_url) {
      await deleteImage(product.image_url, 'products');
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    return { error };
  },

  toggleFeatured: async (id: string, isFeatured: boolean) => {
    const { data, error } = await supabase
      .from('products')
      .update({ is_featured: isFeatured })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  toggleVisibility: async (id: string, visible: boolean) => {
    const { data, error } = await supabase
      .from('products')
      .update({ visible })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  }
};

export const newsOperations = {
  create: async (newsData: Omit<News, 'id' | 'created_at' | 'updated_at'>, imageFiles?: File[]) => {
    let images: string[] = [];
    
    // Upload images if provided
    if (imageFiles && imageFiles.length > 0) {
      images = await uploadMultipleImages(imageFiles, 'news');
      if (images.length === 0) {
        return { data: null, error: new Error('خطا در آپلود تصویر') };
      }
    }

    const { data, error } = await supabase
      .from('news')
      .insert([{ 
        ...newsData, 
        images,
        image_url: images.length > 0 ? images[0] : null 
      }])
      .select()
      .single();
    return { data, error };
  },

  update: async (id: string, newsData: Partial<News>, imageFiles?: File[]) => {
    let updateData = { ...newsData };
    
    // Upload new images if provided
    if (imageFiles && imageFiles.length > 0) {
      // Get current news to delete old images
      const { data: currentNews } = await supabase
        .from('news')
        .select('images, image_url')
        .eq('id', id)
        .single();

      const newImages = await uploadMultipleImages(imageFiles, 'news');
      if (newImages.length === 0) {
        return { data: null, error: new Error('خطا در آپلود تصویر') };
      }

      // Delete old images if exist
      if (currentNews?.images && currentNews.images.length > 0) {
        await deleteMultipleImages(currentNews.images, 'news');
      } else if (currentNews?.image_url) {
        await deleteImage(currentNews.image_url, 'news');
      }

      updateData.images = newImages;
      updateData.image_url = newImages[0];
    }

    const { data, error } = await supabase
      .from('news')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  delete: async (id: string) => {
    // Get news to delete associated images
    const { data: news } = await supabase
      .from('news')
      .select('images, image_url')
      .eq('id', id)
      .single();

    // Delete images from storage if exist
    if (news?.images && news.images.length > 0) {
      await deleteMultipleImages(news.images, 'news');
    } else if (news?.image_url) {
      await deleteImage(news.image_url, 'news');
    }

    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id);
    return { error };
  },

  toggleFeatured: async (id: string, featured: boolean) => {
    const { data, error } = await supabase
      .from('news')
      .update({ featured })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  toggleVisibility: async (id: string, visible: boolean) => {
    const { data, error } = await supabase
      .from('news')
      .update({ visible })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  }
};

export const galleryOperations = {
  create: async (galleryData: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>, imageFiles?: File[]) => {
    let images: string[] = [];
    
    // Upload images if provided
    if (imageFiles && imageFiles.length > 0) {
      images = await uploadMultipleImages(imageFiles, 'gallery');
      if (images.length === 0) {
        return { data: null, error: new Error('خطا در آپلود تصویر') };
      }
    }

    const { data, error } = await supabase
      .from('gallery')
      .insert([{ 
        ...galleryData, 
        images,
        image_url: images.length > 0 ? images[0] : null 
      }])
      .select()
      .single();
    return { data, error };
  },

  update: async (id: string, galleryData: Partial<GalleryItem>, imageFiles?: File[]) => {
    let updateData = { ...galleryData };
    
    // Upload new images if provided
    if (imageFiles && imageFiles.length > 0) {
      // Get current gallery item to delete old images
      const { data: currentItem } = await supabase
        .from('gallery')
        .select('images, image_url')
        .eq('id', id)
        .single();

      const newImages = await uploadMultipleImages(imageFiles, 'gallery');
      if (newImages.length === 0) {
        return { data: null, error: new Error('خطا در آپلود تصویر') };
      }

      // Delete old images if exist
      if (currentItem?.images && currentItem.images.length > 0) {
        await deleteMultipleImages(currentItem.images, 'gallery');
      } else if (currentItem?.image_url) {
        await deleteImage(currentItem.image_url, 'gallery');
      }

      updateData.images = newImages;
      updateData.image_url = newImages[0];
    }

    const { data, error } = await supabase
      .from('gallery')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  delete: async (id: string) => {
    // Get gallery item to delete associated images
    const { data: item } = await supabase
      .from('gallery')
      .select('images, image_url')
      .eq('id', id)
      .single();

    // Delete images from storage if exist
    if (item?.images && item.images.length > 0) {
      await deleteMultipleImages(item.images, 'gallery');
    } else if (item?.image_url) {
      await deleteImage(item.image_url, 'gallery');
    }

    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);
    return { error };
  }
};

export const contactOperations = {
  create: async (messageData: Omit<ContactMessage, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([messageData])
      .select()
      .single();
    return { data, error };
  },

  update: async (id: string, messageData: Partial<ContactMessage>) => {
    const { data, error } = await supabase
      .from('contact_messages')
      .update(messageData)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);
    return { error };
  }
};

// Hook for user profiles (admin only)
export const useAllUsers = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در بارگذاری کاربران');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, refetch: fetchUsers };
};

// Hook for settings
export const useSettings = (key?: string) => {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      let query = supabase.from('settings').select('*');
      
      if (key) {
        query = query.eq('key', key);
        const { data, error } = await query.single();
        if (error && error.code !== 'PGRST116') throw error;
        setSettings(data ? JSON.parse(data.value || '{}') : {});
      } else {
        const { data, error } = await query;
        if (error) throw error;
        const settingsObj = {};
        data?.forEach(setting => {
          settingsObj[setting.key] = JSON.parse(setting.value || '{}');
        });
        setSettings(settingsObj);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در بارگذاری تنظیمات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [key]);

  return { settings, loading, error, refetch: fetchSettings };
};

// Settings operations
export const settingsOperations = {
  get: async (key: string) => {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', key)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return { data: data ? JSON.parse(data.value || '{}') : null, error };
  },

  set: async (key: string, value: any) => {
    const stringValue = JSON.stringify(value);
    
    // Check if setting exists
    const { data: existing } = await supabase
      .from('settings')
      .select('id')
      .eq('key', key)
      .single();

    if (existing) {
      // Update existing setting
      const { data, error } = await supabase
        .from('settings')
        .update({ value: stringValue })
        .eq('key', key)
        .select()
        .single();
      return { data, error };
    } else {
      // Insert new setting
      const { data, error } = await supabase
        .from('settings')
        .insert([{ key, value: stringValue }])
        .select()
        .single();
      return { data, error };
    }
  },

  delete: async (key: string) => {
    const { error } = await supabase
      .from('settings')
      .delete()
      .eq('key', key);
    return { error };
  }
};

// Categories operations
export const categoriesOperations = {
  create: async (categoryData: { name: string; type: string; description?: string }) => {
    const { data, error } = await supabase
      .from('categories')
      .insert([categoryData])
      .select()
      .single();
    return { data, error };
  },

  update: async (id: string, categoryData: Partial<{ name: string; type: string; description: string }>) => {
    const { data, error } = await supabase
      .from('categories')
      .update(categoryData)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    return { error };
  }
};

// Hook for categories
export const useCategories = (type?: string) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      let query = supabase.from('categories').select('*');
      
      if (type) {
        query = query.eq('type', type);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در بارگذاری دسته‌بندی‌ها');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [type]);

  return { categories, loading, error, refetch: fetchCategories };
}

// User operations
export const userOperations = {
  create: async (userData: { fullName: string; username: string; email: string; password: string; phone?: string; company?: string; role: string }) => {
    // First create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          full_name: userData.fullName,
          username: userData.username
        }
      }
    });

    if (authError) return { data: null, error: authError };

    // Then create the user profile
    if (authData.user) {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert([{
          id: authData.user.id,
          full_name: userData.fullName,
          username: userData.username,
          phone: userData.phone,
          company: userData.company,
          role: userData.role
        }])
        .select()
        .single();
      return { data, error };
    }

    return { data: null, error: new Error('Failed to create user') };
  },

  update: async (id: string, userData: Partial<UserProfile>) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(userData)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  delete: async (id: string) => {
    // Delete user profile first
    const { error: profileError } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', id);

    if (profileError) return { error: profileError };

    // Then delete auth user (admin only operation)
    const { error: authError } = await supabase.auth.admin.deleteUser(id);
    return { error: authError };
  },

  toggleStatus: async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ status: newStatus })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  }
}