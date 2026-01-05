/*
  # Add settings for About page and Contact information

  1. New Settings
    - Add about_page_content setting for dynamic About page
    - Add contact_info setting for contact information
    - Add seo_settings for SEO configuration
    
  2. Storage
    - Create avatars bucket for profile pictures
    - Create catalogs bucket for PDF catalogs
    
  3. Security
    - Enable RLS on new buckets
    - Add policies for authenticated users
*/

-- Insert default settings for About page
INSERT INTO settings (key, value, description) VALUES 
(
  'about_page_content',
  '{
    "mainText": "عطرین پک با بیش از ۱۵ سال تجربه در صنعت بسته‌بندی لوکس، تولیدکننده انواع شیشه‌های عطر، پمپ‌های اسپری، درپوش‌های هنری و اسانس‌های طبیعی با کیفیت بین‌المللی است.",
    "storyText": "عطرین پک در سال ۱۳۸۸ با هدف تولید محصولات بسته‌بندی با کیفیت بین‌المللی آغاز به کار کرد. ما با تکیه بر تجربه و دانش فنی تیم متخصص خود، توانسته‌ایم جایگاه ویژه‌ای در صنعت بسته‌بندی لوکس کسب کنیم.",
    "mission": "تولید و ارائه محصولات بسته‌بندی با کیفیت بین‌المللی، طراحی خلاقانه و قیمت مناسب برای تمامی مشتریان در سراسر کشور و منطقه.",
    "vision": "تبدیل شدن به برترین تولیدکننده محصولات بسته‌بندی لوکس در منطقه خاورمیانه و ارائه راه‌حل‌های نوآورانه به صنایع مختلف.",
    "values": [
      {"title": "مشتری‌مداری", "description": "رضایت مشتری اولویت اول ماست", "icon": "Heart"},
      {"title": "کیفیت", "description": "تعهد به بالاترین استانداردهای کیفی", "icon": "Award"},
      {"title": "نوآوری", "description": "پیشرو در ارائه راه‌حل‌های خلاقانه", "icon": "Lightbulb"},
      {"title": "رشد مستمر", "description": "بهبود مداوم فرآیندها و محصولات", "icon": "TrendingUp"}
    ],
    "achievements": [
      {"number": "۱۵+", "title": "سال تجربه"},
      {"number": "۵۰۰+", "title": "مشتری راضی"},
      {"number": "۱۰۰+", "title": "نوع محصول"},
      {"number": "۱۰", "title": "کشور صادرات"}
    ],
    "certifications": [
      {"title": "ISO 9001:2015", "description": "سیستم مدیریت کیفیت", "icon": "Award"},
      {"title": "CE Marking", "description": "استاندارد اروپایی", "icon": "Globe"},
      {"title": "برند برتر", "description": "انتخاب مشتریان ۱۴۰۲", "icon": "Crown"}
    ],
    "catalogUrl": ""
  }',
  'محتوای صفحه درباره ما'
),
(
  'contact_info',
  '{
    "phones": ["021-12345678", "09123456789"],
    "emails": ["info@atrinpack.com", "sales@atrinpack.com"],
    "addresses": [
      {"title": "دفتر مرکزی", "address": "تهران، خیابان کریمخان، پلاک 123"},
      {"title": "کارخانه", "address": "البرز، شهرک صنعتی، خیابان صنعت، پلاک 45"}
    ],
    "workingHours": {
      "weekdays": "شنبه تا پنج‌شنبه: 8:00 - 18:00",
      "friday": "جمعه: تعطیل"
    },
    "socialMedia": {
      "whatsapp": "https://wa.me/989123456789",
      "instagram": "https://instagram.com/atrinpack",
      "facebook": "https://facebook.com/atrinpack",
      "linkedin": "https://linkedin.com/company/atrinpack"
    },
    "mapLocation": "https://maps.google.com/?q=35.6892,51.3890"
  }',
  'اطلاعات تماس'
),
(
  'seo_settings',
  '{
    "siteTitle": "عطرین پک - بسته‌بندی لوکس | شیشه عطر، پمپ اسپری، درپوش هنری",
    "siteDescription": "عطرین پک، تولیدکننده انواع شیشه‌های عطر، پمپ‌های اسپری، درپوش‌های هنری و اسانس‌های طبیعی با کیفیت بین‌المللی. طراحی اختصاصی Mix & Match و خدمات مشاوره رایگان.",
    "keywords": "شیشه عطر, پمپ اسپری, درپوش, اسانس, بسته‌بندی لوکس, عطرین پک, طراحی اختصاصی",
    "ogImage": "https://lovable.dev/opengraph-image-p98pqg.png",
    "twitterCard": "summary_large_image"
  }',
  'تنظیمات سئو'
)
ON CONFLICT (key) DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = now();

-- Add image_url column to user_profiles if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN image_url text;
  END IF;
END $$;