import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Product {
  id: number;
  name: string;
  category: string;
  description?: string;
  image_url: string;
  price?: string;
  min_order?: number;
  weight?: number;
  dimensions?: string;
  color?: string;
  volume?: string;
  material?: string;
  shape?: string;
  is_new: boolean;
  is_featured: boolean;
  show_in_mix_match: boolean;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface News {
  id: number;
  title: string;
  category: string;
  content: string;
  excerpt?: string;
  image_url: string;
  date: string;
  featured: boolean;
  visible: boolean;
  read_time?: string;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description?: string;
  image_url: string;
  views: number;
  downloads: number;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: 'new' | 'replied' | 'closed';
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  username: string;
  phone?: string;
  company?: string;
  role: 'admin' | 'editor' | 'viewer' | 'customer';
  status: 'active' | 'inactive';
  last_login?: string;
  created_at: string;
  updated_at: string;
}