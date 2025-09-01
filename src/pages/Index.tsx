import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';
import ProductCard from '../components/ProductCard';
import NewsCard from '../components/NewsCard';
import { 
  Crown, 
  Award, 
  Shield, 
  Users, 
  Star,
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  Sparkles,
  CheckCircle,
  Globe,
  Truck,
  HeadphonesIcon
} from 'lucide-react';

const Index = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // نمونه محصولات
  const featuredProducts = [
    {
      id: 1,
      name: 'بطری عطر کریستالی 50ml',
      category: 'شیشه و بطری',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
      isNew: true,
      isFeatured: true
    },
    {
      id: 2,
      name: 'پمپ اسپری طلایی',
      category: 'پمپ و اسپری',
      image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=400&fit=crop',
      isFeatured: true
    },
    {
      id: 3,
      name: 'درپوش هنری نقره‌ای',
      category: 'درپوش',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
      isNew: true
    },
    {
      id: 4,
      name: 'اسانس گل رز طبیعی',
      category: 'اسانس',
      image: 'https://images.unsplash.com/photo-1588159343745-445ae0b16383?w=400&h=400&fit=crop',
      isFeatured: true
    }
  ];

  // نمونه اخبار
  const latestNews = [
    {
      id: 1,
      title: 'راه‌اندازی خط تولید جدید شیشه‌های کریستالی',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
      date: '۱۵ دی ۱۴۰۳',
      category: 'اخبار تولید',
      excerpt: 'آترین پک با راه‌اندازی خط تولید جدید، ظرفیت تولید شیشه‌های کریستالی را دو برابر کرده است.',
      readTime: '۳ دقیقه مطالعه'
    },
    {
      id: 2,
      title: 'دریافت گواهینامه ISO 9001:2015',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      date: '۱۰ دی ۱۴۰۳',
      category: 'گواهینامه‌ها',
      excerpt: 'شرکت آترین پک موفق به دریافت گواهینامه بین‌المللی کیفیت ISO 9001:2015 شده است.',
      readTime: '۲ دقیقه مطالعه'
    },
    {
      id: 3,
      title: 'حضور در نمایشگاه بین‌المللی بسته‌بندی',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      date: '۵ دی ۱۴۰۳',
      category: 'نمایشگاه‌ها',
      excerpt: 'آترین پک در نمایشگاه بین‌المللی بسته‌بندی تهران حضور یافت و محصولات جدید خود را معرفی کرد.',
      readTime: '۴ دقیقه مطالعه'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-white to-amber-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center space-x-reverse space-x-3">
                <Crown className="w-12 h-12 text-amber-500" />
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold">
                  بیش از ۱۵ سال تجربه
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-black text-gray-800 leading-tight">
                آترین پک
                <span className="block text-amber-600 text-4xl lg:text-5xl mt-2">
                  بسته‌بندی لوکس
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                تولیدکننده انواع شیشه‌های عطر، پمپ‌های اسپری، درپوش‌های هنری 
                و اسانس‌های طبیعی با کیفیت بین‌المللی و طراحی اختصاصی Mix & Match
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-reverse space-x-2"
                >
                  <Phone className="w-6 h-6" />
                  <span>مشاوره رایگان</span>
                </button>
                <button className="bg-white border-2 border-amber-500 text-amber-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2">
                  <Sparkles className="w-6 h-6" />
                  <span>مشاهده محصولات</span>
                </button>
              </div>
            </div>
            
            <div className="relative animate-fade-in animation-delay-300">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop"
                  alt="محصولات آترین پک"
                  className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center space-x-reverse space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">کیفیت تضمینی</div>
                      <div className="text-sm text-gray-600">ISO 9001:2015</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">چرا آترین پک؟</h2>
            <p className="text-xl text-gray-600">مزایای همکاری با ما</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-3">کیفیت بین‌المللی</h3>
              <p className="text-gray-600">تولید با استانداردهای جهانی و گواهینامه‌های معتبر</p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-3">تحویل سریع</h3>
              <p className="text-gray-600">ارسال در کمترین زمان ممکن به سراسر کشور</p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-3">مشاوره تخصصی</h3>
              <p className="text-gray-600">تیم متخصص برای راهنمایی و مشاوره رایگان</p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeadphonesIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-3">پشتیبانی ۲۴/۷</h3>
              <p className="text-gray-600">پاسخگویی در تمام ساعات شبانه‌روز</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">محصولات ویژه</h2>
            <p className="text-xl text-gray-600">برترین محصولات آترین پک</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          
          <div className="text-center">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-reverse space-x-2 mx-auto">
              <span>مشاهده همه محصولات</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <div className="text-5xl font-black">۱۵+</div>
              <div className="text-xl font-bold">سال تجربه</div>
            </div>
            <div className="space-y-3">
              <div className="text-5xl font-black">۵۰۰+</div>
              <div className="text-xl font-bold">مشتری راضی</div>
            </div>
            <div className="space-y-3">
              <div className="text-5xl font-black">۱۰۰+</div>
              <div className="text-xl font-bold">نوع محصول</div>
            </div>
            <div className="space-y-3">
              <div className="text-5xl font-black">۲۴/۷</div>
              <div className="text-xl font-bold">پشتیبانی</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">آخرین اخبار</h2>
            <p className="text-xl text-gray-600">جدیدترین اخبار و رویدادهای آترین پک</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {latestNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
          
          <div className="text-center">
            <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-reverse space-x-2 mx-auto">
              <span>مشاهده همه اخبار</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              آماده همکاری با آترین پک هستید؟
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              برای دریافت مشاوره رایگان، استعلام قیمت و اطلاعات بیشتر درباره محصولات ما همین حالا تماس بگیرید
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-reverse space-x-2"
              >
                <Phone className="w-6 h-6" />
                <span>تماس فوری</span>
              </button>
              <button className="bg-white bg-opacity-10 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2">
                <Mail className="w-6 h-6" />
                <span>ارسال ایمیل</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

export default Index;