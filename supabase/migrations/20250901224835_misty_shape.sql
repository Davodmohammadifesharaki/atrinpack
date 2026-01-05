/*
  # Create Test Users for Atrin Pack

  1. Admin User
  2. Editor User  
  3. Customer User
*/

-- Insert test admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
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
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Insert test editor user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
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
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Insert test customer user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
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
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Insert corresponding user profiles
INSERT INTO user_profiles (id, full_name, username, role, status)
SELECT 
  id,
  CASE 
    WHEN email = 'admin@atrinpack.com' THEN 'امین جعفری'
    WHEN email = 'editor@atrinpack.com' THEN 'مریم احمدی'
    WHEN email = 'customer@example.com' THEN 'علی احمدی'
  END,
  CASE 
    WHEN email = 'admin@atrinpack.com' THEN 'aminjafari'
    WHEN email = 'editor@atrinpack.com' THEN 'maryam.ahmadi'
    WHEN email = 'customer@example.com' THEN 'ali.ahmadi'
  END,
  CASE 
    WHEN email = 'admin@atrinpack.com' THEN 'admin'
    WHEN email = 'editor@atrinpack.com' THEN 'editor'
    WHEN email = 'customer@example.com' THEN 'customer'
  END,
  'active'
FROM auth.users 
WHERE email IN ('admin@atrinpack.com', 'editor@atrinpack.com', 'customer@example.com');

-- Update user profiles with additional info
UPDATE user_profiles SET 
  phone = '09123456789',
  company = 'آترین پک'
WHERE username = 'aminjafari';

UPDATE user_profiles SET 
  phone = '09987654321',
  company = 'آترین پک'
WHERE username = 'maryam.ahmadi';

UPDATE user_profiles SET 
  phone = '09111222333',
  company = 'شرکت پارس عطر'
WHERE username = 'ali.ahmadi';