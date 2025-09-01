
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  ChevronDown, 
  ShoppingBag, 
  Palette, 
  Newspaper, 
  Image, 
  Phone, 
  Info,
  Download,
  Eye,
  Sparkles,
  Crown
} from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProductsMenu = () => {
    setIsProductsMenuOpen(!isProductsMenuOpen);
  };

  return (
    <header className="bg-white shadow-xl sticky top-0 z-50" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-reverse space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-800">آترین پک</div>
              <div className="text-sm text-amber-600 font-bold">بسته‌بندی لوکس</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-reverse space-x-8">
            {/* Products Mega Menu */}
            <div className="relative">
              <button
                onClick={toggleProductsMenu}
                className="flex items-center space-x-reverse space-x-2 text-gray-700 hover:text-amber-600 font-bold text-lg transition-colors duration-300"
              >
                <span>محصولات</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isProductsMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isProductsMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-[800px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 z-50">
                  <div className="grid grid-cols-3 gap-8">
                    {/* Column 1: Special Products */}
                    <div>
                      <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center">
                        <Sparkles className="w-6 h-6 ml-2 text-amber-500" />
                        محصولات ویژه
                      </h3>
                      <ul className="space-y-4">
                        <li>
                          <Link 
                            to="/products?category=perfume" 
                            className="flex items-center space-x-reverse space-x-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50 p-3 rounded-lg transition-all duration-300"
                            onClick={() => setIsProductsMenuOpen(false)}
                          >
                            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                            <span>عطر و اسانس‌ها</span>
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/products?category=sealer" 
                            className="flex items-center space-x-reverse space-x-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50 p-3 rounded-lg transition-all duration-300"
                            onClick={() => setIsProductsMenuOpen(false)}
                          >
                            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                            <span>دستگاه‌های پلمپر</span>
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/products?category=premium" 
                            className="flex items-center space-x-reverse space-x-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50 p-3 rounded-lg transition-all duration-300"
                            onClick={() => setIsProductsMenuOpen(false)}
                          >
                            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                            <span>شیشه و ظروف ویژه</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Column 2: All Products */}
                    <div>
                      <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center">
                        <ShoppingBag className="w-6 h-6 ml-2 text-blue-500" />
                        کلیه محصولات
                      </h3>
                      <ul className="space-y-4">
                        <li>
                          <Link 
                            to="/products?category=pump" 
                            className="flex items-center space-x-reverse space-x-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-all duration-300"
                            onClick={() => setIsProductsMenuOpen(false)}
                          >
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span>پمپ و اسپری</span>
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/products?category=cap" 
                            className="flex items-center space-x-reverse space-x-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-all duration-300"
                            onClick={() => setIsProductsMenuOpen(false)}
                          >
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span>درپوش‌ها</span>
                          </Link>
                        </li>
                        <li>
                          <Link 
                            to="/products" 
                            className="flex items-center space-x-reverse space-x-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-3 rounded-lg transition-all duration-300 font-bold"
                            onClick={() => setIsProductsMenuOpen(false)}
                          >
                            <Eye className="w-5 h-5" />
                            <span>مشاهده کلیه محصولات</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Column 3: Catalog */}
                    <div>
                      <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center">
                        <Download className="w-6 h-6 ml-2 text-green-500" />
                        کاتالوگ
                      </h3>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                        <div className="text-center mb-4">
                          <img 
                            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&h=250&fit=crop"
                            alt="کاتالوگ"
                            className="w-24 h-30 object-cover rounded-lg mx-auto mb-3 shadow-lg"
                          />
                          <div className="text-lg font-bold text-gray-800">کاتالوگ کامل 2024</div>
                        </div>
                        <div className="space-y-3">
                          <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center space-x-reverse space-x-2">
                            <Download className="w-4 h-4" />
                            <span>دانلود PDF</span>
                          </button>
                          <button className="w-full bg-white text-green-600 py-2 rounded-lg hover:bg-green-50 transition-colors duration-300 flex items-center justify-center space-x-reverse space-x-2 border border-green-200">
                            <Eye className="w-4 h-4" />
                            <span>مشاهده آنلاین</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Close overlay */}
                  <div 
                    className="fixed inset-0 -z-10"
                    onClick={() => setIsProductsMenuOpen(false)}
                  ></div>
                </div>
              )}
            </div>

            <Link 
              to="/mix-match" 
              className="flex items-center space-x-reverse space-x-2 text-gray-700 hover:text-purple-600 font-bold text-lg transition-colors duration-300"
            >
              <Palette className="w-5 h-5" />
              <span>Mix & Match</span>
            </Link>

            <Link 
              to="/about" 
              className="flex items-center space-x-reverse space-x-2 text-gray-700 hover:text-blue-600 font-bold text-lg transition-colors duration-300"
            >
              <Info className="w-5 h-5" />
              <span>درباره آترین پک</span>
            </Link>

            <Link 
              to="/news" 
              className="flex items-center space-x-reverse space-x-2 text-gray-700 hover:text-red-600 font-bold text-lg transition-colors duration-300"
            >
              <Newspaper className="w-5 h-5" />
              <span>اخبار</span>
            </Link>

            <Link 
              to="/gallery" 
              className="flex items-center space-x-reverse space-x-2 text-gray-700 hover:text-pink-600 font-bold text-lg transition-colors duration-300"
            >
              <Image className="w-5 h-5" />
              <span>گالری</span>
            </Link>

            <Link 
              to="/contact" 
              className="flex items-center space-x-reverse space-x-2 text-gray-700 hover:text-green-600 font-bold text-lg transition-colors duration-300"
            >
              <Phone className="w-5 h-5" />
              <span>تماس با ما</span>
            </Link>
          </nav>

          {/* User Icon */}
          <div className="flex items-center space-x-reverse space-x-4">
            <Link 
              to="/admin/login"
              className="p-3 rounded-full bg-gray-100 hover:bg-amber-100 transition-colors duration-300 group"
            >
              <User className="w-6 h-6 text-gray-600 group-hover:text-amber-600" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-100">
            <nav className="space-y-4">
              <Link 
                to="/products" 
                className="block py-3 px-4 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all duration-300 font-bold"
                onClick={toggleMobileMenu}
              >
                محصولات
              </Link>
              <Link 
                to="/mix-match" 
                className="block py-3 px-4 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300 font-bold"
                onClick={toggleMobileMenu}
              >
                Mix & Match
              </Link>
              <Link 
                to="/about" 
                className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-bold"
                onClick={toggleMobileMenu}
              >
                درباره آترین پک
              </Link>
              <Link 
                to="/news" 
                className="block py-3 px-4 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 font-bold"
                onClick={toggleMobileMenu}
              >
                اخبار
              </Link>
              <Link 
                to="/gallery" 
                className="block py-3 px-4 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-300 font-bold"
                onClick={toggleMobileMenu}
              >
                گالری
              </Link>
              <Link 
                to="/contact" 
                className="block py-3 px-4 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300 font-bold"
                onClick={toggleMobileMenu}
              >
                تماس با ما
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
