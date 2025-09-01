
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Linkedin,
  MessageCircle,
  Crown,
  Award,
  Shield,
  Clock
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white" dir="rtl">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-reverse space-x-3">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <div>
                <div className="text-3xl font-black">آترین پک</div>
                <div className="text-amber-400 font-bold">بسته‌بندی لوکس</div>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-lg">
              آترین پک با بیش از 15 سال تجربه در صنعت بسته‌بندی لوکس، 
              تولیدکننده انواع شیشه‌های عطر، پمپ‌های اسپری، درپوش‌های هنری 
              و اسانس‌های طبیعی با کیفیت بین‌المللی است.
            </p>
            
            {/* Certifications */}
            <div className="flex items-center space-x-reverse space-x-6">
              <div className="flex items-center space-x-reverse space-x-2 bg-green-600 px-4 py-2 rounded-full">
                <Award className="w-5 h-5" />
                <span className="text-sm font-bold">ISO 9001</span>
              </div>
              <div className="flex items-center space-x-reverse space-x-2 bg-blue-600 px-4 py-2 rounded-full">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-bold">CE</span>
              </div>
              <div className="flex items-center space-x-reverse space-x-2 bg-purple-600 px-4 py-2 rounded-full">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-bold">24/7</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-amber-400 border-b-2 border-amber-400 pb-3">
              لینک‌های سریع
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Link 
                  to="/products" 
                  className="block text-gray-300 hover:text-amber-400 transition-colors duration-300 hover:translate-x-2 transform text-lg"
                >
                  محصولات
                </Link>
                <Link 
                  to="/mix-match" 
                  className="block text-gray-300 hover:text-purple-400 transition-colors duration-300 hover:translate-x-2 transform text-lg"
                >
                  Mix & Match
                </Link>
                <Link 
                  to="/about" 
                  className="block text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform text-lg"
                >
                  درباره ما
                </Link>
                <Link 
                  to="/news" 
                  className="block text-gray-300 hover:text-red-400 transition-colors duration-300 hover:translate-x-2 transform text-lg"
                >
                  اخبار
                </Link>
              </div>
              <div className="space-y-3">
                <Link 
                  to="/gallery" 
                  className="block text-gray-300 hover:text-pink-400 transition-colors duration-300 hover:translate-x-2 transform text-lg"
                >
                  گالری
                </Link>
                <Link 
                  to="/contact" 
                  className="block text-gray-300 hover:text-green-400 transition-colors duration-300 hover:translate-x-2 transform text-lg"
                >
                  تماس با ما
                </Link>
                <Link 
                  to="/catalog" 
                  className="block text-gray-300 hover:text-indigo-400 transition-colors duration-300 hover:translate-x-2 transform text-lg"
                >
                  کاتالوگ
                </Link>
                <Link 
                  to="/support" 
                  className="block text-gray-300 hover:text-orange-400 transition-colors duration-300 hover:translate-x-2 transform text-lg"
                >
                  پشتیبانی
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-amber-400 border-b-2 border-amber-400 pb-3">
              اطلاعات تماس
            </h3>
            
            <div className="space-y-4">
              <a 
                href="tel:+982112345678" 
                className="flex items-center space-x-reverse space-x-4 text-gray-300 hover:text-green-400 transition-colors duration-300 group"
              >
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold">تلفن تماس</div>
                  <div className="text-lg">021-12345678</div>
                </div>
              </a>
              
              <a 
                href="https://wa.me/989123456789" 
                className="flex items-center space-x-reverse space-x-4 text-gray-300 hover:text-green-400 transition-colors duration-300 group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold">واتساپ</div>
                  <div className="text-lg">09123456789</div>
                </div>
              </a>
              
              <a 
                href="mailto:info@atrinpack.com" 
                className="flex items-center space-x-reverse space-x-4 text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold">ایمیل</div>
                  <div className="text-lg">info@atrinpack.com</div>
                </div>
              </a>
              
              <div className="flex items-center space-x-reverse space-x-4 text-gray-300">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold">آدرس</div>
                  <div className="text-lg">تهران، خیابان کریمخان، پلاک 123</div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-amber-400">شبکه‌های اجتماعی</h4>
              <div className="flex space-x-reverse space-x-4">
                <a 
                  href="https://instagram.com/atrinpack" 
                  className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a 
                  href="https://facebook.com/atrinpack" 
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a 
                  href="https://linkedin.com/company/atrinpack" 
                  className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 py-8">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-black mb-4">برای اطلاعات بیشتر تماس بگیرید</h3>
          <p className="text-amber-100 mb-6 text-lg">مشاوره رایگان و استعلام قیمت</p>
          <Link 
            to="/contact"
            className="inline-flex items-center bg-white text-amber-700 px-8 py-3 rounded-full font-bold hover:bg-amber-50 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <Phone className="w-5 h-5 ml-2" />
            تماس با ما
          </Link>
        </div>
      </div>

      {/* Trust Badges & Copyright */}
      <div className="bg-black py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-reverse space-x-6 mb-4 md:mb-0">
              <div className="flex items-center space-x-reverse space-x-2 text-green-400">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-bold">خرید امن</span>
              </div>
              <div className="flex items-center space-x-reverse space-x-2 text-blue-400">
                <Award className="w-5 h-5" />
                <span className="text-sm font-bold">تضمین کیفیت</span>
              </div>
              <div className="flex items-center space-x-reverse space-x-2 text-purple-400">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-bold">پشتیبانی 24/7</span>
              </div>
            </div>
            
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>&copy; 1403 آترین پک. تمامی حقوق محفوظ است.</p>
              <p className="mt-1">طراحی و توسط تیم آترین پک</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
