import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Home, ArrowRight } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-9xl font-black text-gray-300 mb-4">404</h1>
            <h2 className="text-3xl font-black text-gray-800 mb-4">صفحه یافت نشد</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/"
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-reverse space-x-2"
            >
              <Home className="w-6 h-6" />
              <span>بازگشت به صفحه اصلی</span>
            </Link>
            
            <Link 
              to="/products"
              className="bg-white border-2 border-amber-500 text-amber-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2"
            >
              <span>مشاهده محصولات</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;