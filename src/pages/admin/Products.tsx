import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Palette, Sparkles, Crown } from 'lucide-react';

const MixMatch = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Palette className="w-12 h-12 ml-4" />
              <h1 className="text-4xl lg:text-5xl font-black">Mix & Match</h1>
            </div>
            <p className="text-xl text-purple-100">طراحی اختصاصی محصولات بسته‌بندی</p>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-16 h-16 text-purple-600" />
              </div>
              <h2 className="text-4xl font-black text-gray-800 mb-4">به زودی...</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                سیستم Mix & Match آترین پک به زودی راه‌اندازی می‌شود. با این سیستم می‌توانید:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-3">طراحی اختصاصی</h3>
                <p className="text-gray-600">محصولات خود را با ترکیب‌های مختلف طراحی کنید</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-3">کیفیت پریمیوم</h3>
                <p className="text-gray-600">بهترین مواد اولیه برای محصولات اختصاصی شما</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-3">نتیجه فوری</h3>
                <p className="text-gray-600">مشاهده فوری نتیجه طراحی و دریافت قیمت</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-black mb-4">اطلاع از راه‌اندازی</h3>
              <p className="text-purple-100 mb-6">
                برای اطلاع از زمان راه‌اندازی سیستم Mix & Match، شماره تماس خود را وارد کنید
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="tel"
                  placeholder="شماره تماس شما"
                  className="flex-1 px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-purple-50 transition-colors duration-300">
                  ثبت
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MixMatch;