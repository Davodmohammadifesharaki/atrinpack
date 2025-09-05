import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Product {
  id: string;
  name: string;
  category: string;
  description?: string;
  image_url?: string;
  price?: string;
  min_order?: number;
  weight?: number;
  dimensions?: string;
  color?: string;
  volume?: string;
  material?: string;
  shape?: string;
  is_new?: boolean;
  is_featured?: boolean;
  show_in_mix_match?: boolean;
  visible?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface News {
  id: string;
  title: string;
  category: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  date?: string;
  featured?: boolean;
  visible?: boolean;
  read_time?: string;
  views?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Gallery {
  id: string;
  title: string;
  category: string;
  description?: string;
  image_url: string;
  views?: number;
  downloads?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status?: string;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  type: string;
  description?: string;
  created_at?: string;
}

export interface UserProfile {
  id: string;
  full_name: string;
  username: string;
  phone?: string;
  company?: string;
  role?: string;
  status?: string;
  last_login?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Settings {
  id: string;
  key: string;
  value?: string;
  description?: string;
  updated_at?: string;
}