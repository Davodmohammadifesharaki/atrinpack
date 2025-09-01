# آترین پک - سایت شرکتی بسته‌بندی لوکس

## 🚀 درباره پروژه

این پروژه یک سایت کامل شرکتی برای آترین پک است که شامل:

- **سایت عمومی** با صفحات محصولات، اخبار، گالری و تماس
- **پنل مدیریت** برای ادمین‌ها و ویرایشگران
- **پنل مشتری** برای مشتریان ثبت‌نام شده
- **سیستم Mix & Match** برای طراحی اختصاصی محصولات

## 🛠 تکنولوژی‌های استفاده شده

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend:** Supabase (PostgreSQL + Authentication + Storage)
- **Deployment:** Netlify
- **Icons:** Lucide React
- **Routing:** React Router DOM

## 📦 نصب و راه‌اندازی

### پیش‌نیازها
- Node.js 18+
- npm یا yarn
- حساب Supabase
- حساب Netlify (برای دیپلوی)

### مراحل نصب

1. **کلون کردن پروژه:**
```bash
git clone <repository-url>
cd atrin-pack-website
```

2. **نصب وابستگی‌ها:**
```bash
npm install
```

3. **تنظیم متغیرهای محیطی:**
```bash
cp .env.example .env
```

سپس فایل `.env` را ویرایش کنید:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **راه‌اندازی دیتابیس:**
- در پنل Supabase، SQL Editor را باز کنید
- محتوای فایل `supabase/migrations/create_initial_schema.sql` را اجرا کنید
- محتوای فایل `supabase/migrations/insert_sample_data.sql` را اجرا کنید

5. **راه‌اندازی Storage:**
در پنل Supabase، بخش Storage:
- یک bucket با نام `images` ایجاد کنید
- آن را Public قرار دهید

6. **اجرای پروژه:**
```bash
npm run dev
```

## 🔐 حساب‌های تست

### ادمین:
- ایمیل: `admin@atrinpack.com`
- رمز عبور: `admin123456`

### ویرایشگر:
- ایمیل: `editor@atrinpack.com`
- رمز عبور: `editor123456`

### مشتری:
- ایمیل: `customer@example.com`
- رمز عبور: `customer123456`

## 📁 ساختار پروژه

```
src/
├── components/          # کامپوننت‌های قابل استفاده مجدد
├── pages/              # صفحات اصلی سایت
│   ├── admin/          # صفحات پنل مدیریت
│   └── customer/       # صفحات پنل مشتری
├── hooks/              # Custom hooks
├── lib/                # کتابخانه‌ها و تنظیمات
├── utils/              # توابع کمکی
└── types/              # تعریف انواع TypeScript
```

## 🌐 دیپلوی روی Netlify

1. **Push کردن کد به Git:**
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

2. **اتصال به Netlify:**
- وارد [Netlify](https://netlify.com) شوید
- "Add new site" → "Import an existing project"
- مخزن Git خود را انتخاب کنید

3. **تنظیم Build Settings:**
- Build command: `npm run build`
- Publish directory: `dist`

4. **تنظیم Environment Variables:**
در تنظیمات سایت Netlify:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🎯 ویژگی‌های کلیدی

### سایت عمومی:
- ✅ صفحه اصلی با اسلایدر Hero
- ✅ کاتالوگ محصولات با فیلترهای پیشرفته
- ✅ سیستم Mix & Match برای طراحی اختصاصی
- ✅ بخش اخبار و مقالات
- ✅ گالری تصاویر
- ✅ صفحه درباره ما
- ✅ فرم تماس

### پنل مدیریت:
- ✅ داشبورد با آمار و نمودارها
- ✅ مدیریت محصولات (CRUD)
- ✅ مدیریت اخبار (CRUD)
- ✅ مدیریت گالری (CRUD)
- ✅ مدیریت کاربران
- ✅ مدیریت پیام‌های تماس
- ✅ تنظیمات سایت
- ✅ سیستم اعلان‌ها

### پنل مشتری:
- ✅ داشبورد شخصی
- ✅ مدیریت سفارشات
- ✅ علاقه‌مندی‌ها
- ✅ تاریخچه خریدها

## 🔒 امنیت

- ✅ Row Level Security (RLS) در Supabase
- ✅ احراز هویت امن
- ✅ محافظت از روت‌های حساس
- ✅ اعتبارسنجی ورودی‌ها
- ✅ آپلود امن فایل‌ها

## 📱 Responsive Design

- ✅ طراحی کاملاً ریسپانسیو
- ✅ بهینه‌سازی برای موبایل
- ✅ تجربه کاربری عالی در تمام دستگاه‌ها

## 🎨 طراحی

- ✅ فونت فارسی وزیری
- ✅ طراحی مدرن و زیبا
- ✅ انیمیشن‌ها و ترانزیشن‌ها
- ✅ رنگ‌بندی حرفه‌ای
- ✅ آیکون‌های مناسب

## 📞 پشتیبانی

برای سوالات و پشتیبانی:
- ایمیل: info@atrinpack.com
- تلفن: 021-12345678

---

**ساخته شده با ❤️ برای آترین پک**