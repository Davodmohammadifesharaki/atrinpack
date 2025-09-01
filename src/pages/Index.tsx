import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';
import ProductCard from '../components/ProductCard';
import NewsCard from '../components/NewsCard';
import HeroSlider from '../components/HeroSlider';
import LoadingSpinner from '../components/LoadingSpinner';
import { useProducts, useNews, contactOperations } from '../hooks/useSupabase';
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
  ChevronRight,
  TrendingUp,
  Package,
  Heart,
  Send,
  User,
  Building
} from 'lucide-react';

const Index = () => {
  const { products: allProducts, loading: productsLoading } = useProducts();
  const { news: allNews, loading: newsLoading } = useNews();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [currentNewsSlide, setCurrentNewsSlide] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // محصولات ویژه - فقط محصولات featured
  const featuredProducts = allProducts.filter(product => product.is_featured).slice(0, 9);

  // اخبار برای کاروسل ۴ کارتی
  const latestNews = allNews.slice(0, 4);

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

  // مدیریت فرم تماس سریع
  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitMessage = async () => {
      try {
        const { error } = await contactOperations.create({
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          company: '',
          subject: 'تماس سریع از صفحه اصلی',
          message: contactForm.message,
          status: 'new'
        });

        if (error) throw error;

        alert('پیام شما با موفقیت ارسال شد. در اسرع وقت با شما تماس خواهیم گرفت.');
        setContactForm({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } catch (error) {
        console.error('Error submitting contact form:', error);
        alert('خطا در ارسال پیام. لطفاً مجدداً تلاش کنید.');
      }
    };

    submitMessage();
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
            <div className="flex items-center justify-center mb-6">
              <Crown className="w-12 h-12 text-amber-500 ml-4" />
              <h2 className="text-4xl font-black text-gray-800">محصولات ویژه آترین پک</h2>
            </div>
            <p className="text-xl text-gray-600">برترین محصولات بسته‌بندی لوکس با کیفیت بین‌المللی</p>
          </div>
          
          {productsLoading ? (
            <LoadingSpinner message="در حال بارگذاری محصولات..." />
          ) : (
            <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group">
                <ProductCard 
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  image={product.image_url}
                  price={product.price}
                  isNew={product.is_new}
                  isFeatured={product.is_featured}
                />
                {/* دکمه‌های هاور */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4 flex gap-3">
                  <button 
                    onClick={() => window.location.href = '/mix-match'}
                    className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-xl font-bold hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center space-x-reverse space-x-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>شخصی‌سازی</span>
                  </button>
                  <button 
                    onClick={() => setIsContactModalOpen(true)}
                    className="flex-1 bg-amber-500 text-white py-2 px-4 rounded-xl font-bold hover:bg-amber-600 transition-colors duration-300 flex items-center justify-center space-x-reverse space-x-2"
                  >
                    <Heart className="w-4 h-4" />
                    <span>استعلام قیمت</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => window.location.href = '/products'}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-reverse space-x-2 mx-auto"
            >
              <span>مشاهده سایر محصولات</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
            </>
          )}
        </div>
      </section>

      {/* کاروسل اخبار - ۴ کارتی */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <MessageCircle className="w-12 h-12 text-red-500 ml-4" />
              <h2 className="text-4xl font-black text-gray-800">آخرین اخبار آترین پک</h2>
            </div>
            <p className="text-xl text-gray-600">جدیدترین اخبار و رویدادهای شرکت</p>
          </div>
          
          {newsLoading ? (
            <LoadingSpinner message="در حال بارگذاری اخبار..." />
          ) : latestNews.length > 0 ? (
            <>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(${currentNewsSlide * 100}%)` }}
              >
                {latestNews.map((news, index) => (
                  <div key={news.id} className="w-full flex-shrink-0 px-4">
                    <NewsCard news={{
                      id: news.id,
                      title: news.title,
                      image: news.image_url,
                      date: new Date(news.date).toLocaleDateString('fa-IR'),
                      category: news.category,
                      excerpt: news.excerpt,
                      readTime: news.read_time
                    }} />
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
                      ? 'bg-red-600 scale-125' 
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
              <span>مشاهده همه اخبار</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
            </>
          ) : (
            <div className="text-center py-16">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">خبری موجود نیست</h3>
              <p className="text-gray-500">به زودی اخبار جدید منتشر خواهد شد</p>
            </div>
          )}
        </div>
      </section>

      {/* درباره آترین پک */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <Crown className="w-12 h-12 text-amber-500 ml-4" />
                <h2 className="text-4xl font-black text-gray-800">درباره آترین پک</h2>
              </div>
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
              
              {/* ویژگی‌های کلیدی */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center space-x-reverse space-x-3 p-4 bg-green-50 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <div>
                    <div className="font-bold text-gray-800">ISO 9001:2015</div>
                    <div className="text-sm text-gray-600">گواهینامه کیفیت</div>
                  </div>
                </div>
                <div className="flex items-center space-x-reverse space-x-3 p-4 bg-blue-50 rounded-xl">
                  <Globe className="w-8 h-8 text-blue-500" />
                  <div>
                    <div className="font-bold text-gray-800">صادرات</div>
                    <div className="text-sm text-gray-600">۱۰ کشور</div>
                  </div>
                </div>
              </div>
              
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
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Phone className="w-12 h-12 ml-4" />
                <h2 className="text-4xl font-black">مشاوره رایگان و استعلام قیمت</h2>
              </div>
              <p className="text-xl text-amber-100 mb-8 leading-relaxed">
                برای دریافت مشاوره تخصصی و قیمت دقیق محصولات همین حالا تماس بگیرید
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
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

            {/* فرم تماس سریع */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-2xl font-black mb-6">فرم تماس سریع</h3>
              <form onSubmit={handleContactFormSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-300 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactFormChange}
                    className="w-full pr-10 pl-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-amber-200 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="نام و نام خانوادگی"
                    required
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-300 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactFormChange}
                    className="w-full pr-10 pl-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-amber-200 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="ایمیل"
                    required
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-300 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactFormChange}
                    className="w-full pr-10 pl-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-amber-200 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="شماره تماس"
                    required
                  />
                </div>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactFormChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-amber-200 focus:outline-none focus:ring-2 focus:ring-white resize-none"
                  placeholder="پیام شما"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-white text-amber-600 py-3 rounded-xl font-bold hover:bg-amber-50 transition-colors duration-300 flex items-center justify-center space-x-reverse space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>ارسال پیام</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* آمار و دستاوردها */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <TrendingUp className="w-12 h-12 text-blue-500 ml-4" />
              <h2 className="text-4xl font-black text-gray-800">دستاوردهای آترین پک</h2>
            </div>
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