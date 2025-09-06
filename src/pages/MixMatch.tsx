import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MixMatchDesigner from '../components/MixMatchDesigner';
import { Palette, Sparkles, Crown, ArrowLeft } from 'lucide-react';

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
            <p className="text-xl text-purple-100">طراحی اختصاصی محصولات بسته‌بندی عطرین پک با پیش‌نمایش زنده</p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-800 mb-4">چگونه کار می‌کند؟</h2>
            <p className="text-xl text-gray-600">در ۳ مرحله ساده محصول اختصاصی خود را طراحی کنید</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-black text-blue-600">۱</span>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-3">انتخاب شیشه</h3>
              <p className="text-gray-600">شکل، حجم، جنس و رنگ مورد نظر خود را انتخاب کنید</p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-black text-green-600">۲</span>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-3">انتخاب پمپ</h3>
              <p className="text-gray-600">نوع پمپ (اسپری، مه‌پاش، قطره‌چکان) و رنگ آن را تعیین کنید</p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-black text-purple-600">۳</span>
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-3">انتخاب درپوش</h3>
              <p className="text-gray-600">جنس (فلز، پلاستیک، چوب) و رنگ درپوش را مشخص کنید</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mix & Match Designer */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <MixMatchDesigner />
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">مزایای طراحی اختصاصی</h2>
            <p className="text-xl text-amber-100">چرا Mix & Match عطرین پک؟</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black mb-3">طراحی منحصر به فرد</h3>
              <p className="text-amber-100">محصولی کاملاً متناسب با سلیقه شما</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black mb-3">کیفیت پریمیوم</h3>
              <p className="text-amber-100">بهترین مواد اولیه و ساخت دقیق</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black mb-3">انعطاف‌پذیری کامل</h3>
              <p className="text-amber-100">هزاران ترکیب ممکن برای انتخاب</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowLeft className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black mb-3">پیش‌نمایش فوری</h3>
              <p className="text-amber-100">مشاهده نتیجه نهایی قبل از سفارش</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MixMatch;