import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { uploadImage, deleteImage } from '../utils/imageUpload';
import type { Product, News, GalleryItem, ContactMessage, User } from '../lib/supabase';

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
  create: async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>, imageFile?: File) => {
    let imageUrl = null;
    
    // Upload image if provided
    if (imageFile) {
      imageUrl = await uploadImage(imageFile, 'products');
      if (!imageUrl) {
        return { data: null, error: new Error('خطا در آپلود تصویر') };
      }
    }

    const { data, error } = await supabase
      .from('products')
      .insert([{ ...productData, image_url: imageUrl }])
      .select()
      .single();
    return { data, error };
  },

  update: async (id: string, productData: Partial<Product>, imageFile?: File) => {
    let updateData = { ...productData };
    
    // Upload new image if provided
    if (imageFile) {
      // Get current product to delete old image
      const { data: currentProduct } = await supabase
        .from('products')
        .select('image_url')
        .eq('id', id)
        .single();

      const imageUrl = await uploadImage(imageFile, 'products');
      if (!imageUrl) {
        return { data: null, error: new Error('خطا در آپلود تصویر') };
      }

      // Delete old image if exists
      if (currentProduct?.image_url) {
        await deleteImage(currentProduct.image_url, 'products');
      }

      updateData.image_url = imageUrl;
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
    // Get product to delete associated image
    const { data: product } = await supabase
      .from('products')
      .select('image_url')
      .eq('id', id)
      .single();

    // Delete image from storage if exists
    if (product?.image_url) {
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
  create: async (newsData: Omit<News, 'id' | 'created_at' | 'updated_at'>, imageFile?: File) => {
    let imageUrl = null;
    
    // Upload image if provided
    if (imageFile) {
      imageUrl = await uploadImage(imageFile, 'news');
      if (!imageUrl) {
        return { data: null, error: new Error('خطا در آپلود تصویر') };
      }
    }

    const { data, error } = await supabase
      .from('news')
      .insert([{ ...newsData, image_url: imageUrl }])
      .select()
      .single();
    return { data, error };
  },

  update: async (id: string, newsData: Partial<News>, imageFile?: File) => {
    let updateData = { ...newsData };
    
    // Upload new image if provided
    if (imageFile) {
      // Get current news to delete old image
      const { data: currentNews } = await supabase
        .from('news')
        .select('image_url')
        .eq('id', id)
        .single();

      const imageUrl = await uploadImage(imageFile, 'news');
      if (!imageUrl) {
        return { data: null, error: new Error('خطا در آپلود تصویر') };
      }

      // Delete old image if exists
      if (currentNews?.image_url) {
        await deleteImage(currentNews.image_url, 'news');
      }

      updateData.image_url = imageUrl;
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
    // Get news to delete associated image
    const { data: news } = await supabase
      .from('news')
      .select('image_url')
      .eq('id', id)
      .single();

    // Delete image from storage if exists
    if (news?.image_url) {
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
  create: async (galleryData: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('gallery')
      .insert([galleryData])
      .select()
      .single();
    return { data, error };
  },

  update: async (id: string, galleryData: Partial<GalleryItem>) => {
    const { data, error } = await supabase
      .from('gallery')
      .update(galleryData)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  delete: async (id: string) => {
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

  updateStatus: async (id: string, status: 'new' | 'replied' | 'closed') => {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  }
};