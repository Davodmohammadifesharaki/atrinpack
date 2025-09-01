import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Image, Camera } from 'lucide-react';

const Gallery = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Image className="w-12 h-12 ml-4" />
              <h1 className="text-4xl lg:text-5xl font-black">گالری تصاویر</h1>
            </div>
            <p className="text-xl text-pink-100">مجموعه‌ای از بهترین محصولات آترین پک</p>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-16 h-16 text-pink-600" />
              </div>
              <h2 className="text-4xl font-black text-gray-800 mb-4">به زودی...</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                گالری تصاویر آترین پک به زودی با مجموعه کاملی از تصاویر محصولات راه‌اندازی می‌شود.
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-black mb-4">در انتظار بمانید</h3>
              <p className="text-pink-100 mb-6">
                برای مشاهده کاتالوگ کامل محصولات، می‌توانید با ما تماس بگیرید
              </p>
              <button className="bg-white text-pink-600 px-8 py-3 rounded-xl font-bold hover:bg-pink-50 transition-colors duration-300">
                تماس با ما
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;