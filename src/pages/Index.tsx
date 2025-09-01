import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';
import ProductCard from '../components/ProductCard';
import NewsCard from '../components/NewsCard';
import HeroSlider from '../components/HeroSlider';
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
  HeadphonesIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Index = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [currentNewsSlide, setCurrentNewsSlide] = useState(0);

  // نمونه محصولات ویژه (گرید ۳×۳)
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
    },
    {
      id: 5,
      name: 'بطری شیشه‌ای کلاسیک 100ml',
      category: 'شیشه و بطری',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop',
      isNew: true
    },
    {
      id: 6,
      name: 'پمپ مه‌پاش پریمیوم',
      category: 'پمپ و اسپری',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      isFeatured: true
    },
    {
      id: 7,
      name: 'درپوش چوبی دست‌ساز',
      category: 'درپوش',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop',
      isNew: true
    },
    {
      id: 8,
      name: 'دستگاه پلمپر اتوماتیک',
      category: 'پلمپر',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
      isFeatured: true
    },
    {
      id: 9,
      name: 'شیشه ویژه کریستالی',
      category: 'شیشه و بطری',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop',
      isNew: true,
      isFeatured: true
    }
  ];

  // نمونه اخبار برای کاروسل
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
    },
    {
      id: 4,
      title: 'همکاری با برند معتبر فرانسوی',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      date: '۱ دی ۱۴۰۳',
      category: 'همکاری‌ها',
      excerpt: 'آترین پک قرارداد همکاری با یکی از برندهای معتبر فرانسوی در زمینه تولید بسته‌بندی لوکس امضا کرد.',
      readTime: '۵ دقیقه مطالعه'
    }
  ];

  // کاروسل اخبار
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNewsSlide((prev) => (prev + 1) % latestNews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [latestNews.length]);

  const goToNewsSlide = (index: number) => {
    setCurrentNewsSlide(index);
  };

  const goToPreviousNews = () => {
    setCurrentNewsSlide((prev) => (prev - 1 + latestNews.length) % latestNews.length);
  };

  const goToNextNews = () => {
    setCurrentNewsSlide((prev) => (prev + 1) % latestNews.length);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      {/* Hero Slider - تمام صفحه */}
      <HeroSlider />

      {/* محصولات ویژه - گرید ۳×۳ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">محصولات ویژه آترین پک</h2>
            <p className="text-xl text-gray-600">برترین محصولات بسته‌بندی لوکس</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => window.location.href = '/products'}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-reverse space-x-2 mx-auto"
            >
              <span>سایر محصولات</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* کاروسل اخبار - ۴ کارتی */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">آخرین اخبار آترین پک</h2>
            <p className="text-xl text-gray-600">جدیدترین اخبار و رویدادهای شرکت</p>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(${currentNewsSlide * 100}%)` }}
              >
                {latestNews.map((news, index) => (
                  <div key={news.id} className="w-full flex-shrink-0 px-4">
                    <NewsCard news={news} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPreviousNews}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-3 rounded-full transition-all duration-300 shadow-lg z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={goToNextNews}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-3 rounded-full transition-all duration-300 shadow-lg z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {latestNews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToNewsSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentNewsSlide 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => window.location.href = '/news'}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-reverse space-x-2 mx-auto"
            >
              <span>مشاهده اخبار</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* درباره آترین پک */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-black text-gray-800">درباره آترین پک</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                آترین پک با بیش از ۱۵ سال تجربه در صنعت بسته‌بندی لوکس، 
                تولیدکننده انواع شیشه‌های عطر، پمپ‌های اسپری، درپوش‌های هنری 
                و اسانس‌های طبیعی با کیفیت بین‌المللی است.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                ما با تکیه بر تجربه و دانش فنی تیم متخصص خود، توانسته‌ایم جایگاه ویژه‌ای 
                در صنعت بسته‌بندی لوکس کسب کنیم و محصولاتمان در بازارهای داخلی و خارجی 
                مورد استقبال قرار گرفته است.
              </p>
              <button 
                onClick={() => window.location.href = '/about'}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-reverse space-x-2"
              >
                <span>بیشتر بخوانید</span>
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                alt="کارخانه آترین پک"
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-reverse space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">ISO 9001:2015</div>
                    <div className="text-sm text-gray-600">گواهینامه کیفیت</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* تماس سریع */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6">مشاوره رایگان و استعلام قیمت</h2>
          <p className="text-xl text-amber-100 mb-8 leading-relaxed">
            برای دریافت مشاوره تخصصی و قیمت دقیق محصولات همین حالا تماس بگیرید
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="bg-white text-amber-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-reverse space-x-2"
            >
              <Phone className="w-6 h-6" />
              <span>مشاوره رایگان</span>
            </button>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white bg-opacity-10 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2"
            >
              <Mail className="w-6 h-6" />
              <span>تماس با ما</span>
            </button>
          </div>
        </div>
      </section>

      {/* آمار و دستاوردها */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">دستاوردهای آترین پک</h2>
            <p className="text-xl text-gray-600">نتایج ۱۵ سال تلاش مستمر</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl font-black text-blue-600 mb-2">۱۵+</div>
              <div className="text-xl font-bold text-gray-800">سال تجربه</div>
              <div className="text-gray-600 mt-2">در صنعت بسته‌بندی</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl font-black text-green-600 mb-2">۵۰۰+</div>
              <div className="text-xl font-bold text-gray-800">مشتری راضی</div>
              <div className="text-gray-600 mt-2">در سراسر کشور</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl font-black text-purple-600 mb-2">۱۰۰+</div>
              <div className="text-xl font-bold text-gray-800">نوع محصول</div>
              <div className="text-gray-600 mt-2">در کاتالوگ ما</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl font-black text-amber-600 mb-2">۱۰</div>
              <div className="text-xl font-bold text-gray-800">کشور صادرات</div>
              <div className="text-gray-600 mt-2">در منطقه خاورمیانه</div>
            </div>
          </div>
        </div>
      </section>

      {/* مزایای همکاری */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">چرا آترین پک؟</h2>
            <p className="text-xl text-gray-600">مزایای همکاری با ما</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-3">کیفیت بین‌المللی</h3>
              <p className="text-gray-600">تولید با استانداردهای جهانی و گواهینامه‌های معتبر</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-3">تحویل سریع</h3>
              <p className="text-gray-600">ارسال در کمترین زمان ممکن به سراسر کشور</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-3">مشاوره تخصصی</h3>
              <p className="text-gray-600">تیم متخصص برای راهنمایی و مشاوره رایگان</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeadphonesIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-3">پشتیبانی ۲۴/۷</h3>
              <p className="text-gray-600">پاسخگویی در تمام ساعات شبانه‌روز</p>
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