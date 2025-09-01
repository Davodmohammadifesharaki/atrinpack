import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, Tag, Share2, ArrowRight } from 'lucide-react';

const NewsDetail = () => {
  const { id } = useParams();

  // نمونه اطلاعات خبر
  const news = {
    id: 1,
    title: 'راه‌اندازی خط تولید جدید شیشه‌های کریستالی',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=400&fit=crop',
    date: '۱۵ دی ۱۴۰۳',
    category: 'اخبار تولید',
    readTime: '۳ دقیقه مطالعه',
    content: `
      <p>شرکت آترین پک با هدف افزایش ظرفیت تولید و بهبود کیفیت محصولات، خط تولید جدید شیشه‌های کریستالی را راه‌اندازی کرد.</p>
      
      <p>این خط تولید با استفاده از جدیدترین تکنولوژی‌های روز دنیا و با سرمایه‌گذاری بالغ بر ۵ میلیارد تومان راه‌اندازی شده است.</p>
      
      <h3>ویژگی‌های خط تولید جدید:</h3>
      <ul>
        <li>ظرفیت تولید روزانه ۱۰۰۰ قطعه</li>
        <li>کیفیت بالای محصولات با استاندارد اروپایی</li>
        <li>کاهش ۳۰ درصدی زمان تولید</li>
        <li>صرفه‌جویی ۲۰ درصدی در مصرف انرژی</li>
      </ul>
      
      <p>مدیرعامل شرکت آترین پک در این خصوص گفت: "با راه‌اندازی این خط تولید، قادر خواهیم بود تا تقاضای روزافزون مشتریان داخلی و خارجی را پاسخ دهیم."</p>
    `
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      <div className="container mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-reverse space-x-2 text-gray-600 mb-8">
          <span>خانه</span>
          <ArrowRight className="w-4 h-4" />
          <span>اخبار</span>
          <ArrowRight className="w-4 h-4" />
          <span className="text-gray-800 font-bold">جزئیات خبر</span>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <img 
              src={news.image}
              alt={news.title}
              className="w-full h-80 object-cover"
            />
            
            <div className="p-8">
              <div className="flex items-center space-x-reverse space-x-4 mb-4">
                <div className="flex items-center space-x-reverse space-x-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-bold">{news.date}</span>
                </div>
                
                <div className="flex items-center space-x-reverse space-x-2">
                  <Tag className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-bold text-blue-600">{news.category}</span>
                </div>
                
                <span className="text-sm text-gray-500">{news.readTime}</span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-black text-gray-800 mb-6 leading-tight">
                {news.title}
              </h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-reverse space-x-4">
                  <button className="flex items-center space-x-reverse space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>اشتراک‌گذاری</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>

          {/* Related News */}
          <div className="mt-16">
            <h2 className="text-2xl font-black text-gray-800 mb-8">اخبار مرتبط</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop"
                  alt="خبر مرتبط"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-black text-gray-800 mb-2">
                    دریافت گواهینامه ISO 9001:2015
                  </h3>
                  <p className="text-gray-600 text-sm">
                    شرکت آترین پک موفق به دریافت گواهینامه بین‌المللی کیفیت شده است.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop"
                  alt="خبر مرتبط"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-black text-gray-800 mb-2">
                    حضور در نمایشگاه بین‌المللی بسته‌بندی
                  </h3>
                  <p className="text-gray-600 text-sm">
                    آترین پک در نمایشگاه بین‌المللی بسته‌بندی تهران حضور یافت.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewsDetail;