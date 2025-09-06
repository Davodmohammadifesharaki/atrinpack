import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSettings } from '../hooks/useSupabase';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  Crown, 
  Award, 
  Users, 
  Globe, 
  Target,
  Heart,
  Lightbulb,
  TrendingUp,
  Download,
  Eye,
  FileText,
  Shield,
  Star,
  CheckCircle,
  Zap,
  Gem,
  Rocket
} from 'lucide-react';

const About = () => {
  const { settings: aboutSettings, loading } = useSettings('about_page_content');
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);

  const getIconComponent = (iconName: string) => {
    const iconMap = {
      Heart, Award, Users, Globe, Target, Lightbulb, TrendingUp, Crown,
      Shield, Star, CheckCircle, Zap, Gem, Rocket
    };
    return iconMap[iconName] || Heart;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Header />
        <LoadingSpinner message="در حال بارگذاری محتوا..." />
        <Footer />
      </div>
    );
  }

  const content = aboutSettings || {};

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-black mb-6">درباره عطرین پک</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              {content.mainText || 'بیش از ۱۵ سال تجربه در تولید و ارائه بهترین محصولات بسته‌بندی لوکس'}
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      {content.storyText && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-black text-gray-800">داستان ما</h2>
                <div className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                  {content.storyText}
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                  alt="کارخانه عطرین پک"
                  className="w-full h-80 object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mission & Vision */}
      {(content.mission || content.vision) && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {content.mission && (
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center ml-4">
                      <Target className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800">ماموریت ما</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {content.mission}
                  </p>
                </div>
              )}

              {content.vision && (
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center ml-4">
                      <Lightbulb className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800">چشم‌انداز ما</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {content.vision}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Values */}
      {content.values && content.values.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-gray-800 mb-4">ارزش‌های ما</h2>
              <p className="text-xl text-gray-600">اصولی که ما را راهنمایی می‌کند</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.values.map((value, index) => {
                const IconComponent = getIconComponent(value.icon);
                const colors = ['red', 'green', 'blue', 'purple', 'amber', 'pink', 'indigo', 'cyan'];
                const color = colors[index % colors.length];
                
                return (
                  <div key={index} className="text-center p-6">
                    <div className={`w-16 h-16 bg-${color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`w-10 h-10 text-${color}-500`} />
                    </div>
                    <h3 className="text-xl font-black text-gray-800 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Catalog Section */}
      {content.catalogUrl && (
        <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-black mb-6">کاتالوگ محصولات ۲۰۲۵</h2>
                <p className="text-xl text-amber-100 mb-8 leading-relaxed">
                  مجموعه کاملی از تمام محصولات عطرین پک با جزئیات فنی، تصاویر باکیفیت و اطلاعات قیمت
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={content.catalogUrl}
                    download
                    className="bg-white text-amber-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-reverse space-x-2"
                  >
                    <Download className="w-6 h-6" />
                    <span>دانلود کاتالوگ PDF</span>
                  </a>
                  <button 
                    onClick={() => setIsCatalogModalOpen(true)}
                    className="bg-white bg-opacity-10 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2"
                  >
                    <Eye className="w-6 h-6" />
                    <span>مشاهده آنلاین</span>
                  </button>
                </div>
              </div>

              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=500&fit=crop"
                  alt="کاتالوگ عطرین پک"
                  className="w-80 h-96 object-cover rounded-2xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Achievements */}
      {content.achievements && content.achievements.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-gray-800 mb-4">دستاوردهای ما</h2>
              <p className="text-xl text-gray-600">نتایج تلاش‌های مستمر تیم عطرین پک</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.achievements.map((achievement, index) => {
                const colors = ['blue', 'green', 'purple', 'amber', 'red', 'pink', 'indigo', 'cyan'];
                const color = colors[index % colors.length];
                
                return (
                  <div key={index} className="text-center">
                    <div className={`text-5xl font-black mb-2 text-${color}-600`}>{achievement.number}</div>
                    <div className="text-xl font-bold">{achievement.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {content.certifications && content.certifications.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-gray-800 mb-4">گواهینامه‌ها و افتخارات</h2>
              <p className="text-xl text-gray-600">تأیید کیفیت از مراجع معتبر بین‌المللی</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.certifications.map((cert, index) => {
                const IconComponent = getIconComponent(cert.icon);
                const colors = ['green', 'blue', 'purple', 'amber', 'red', 'pink'];
                const color = colors[index % colors.length];
                
                return (
                  <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg">
                    <div className={`w-20 h-20 bg-${color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`w-12 h-12 text-${color}-600`} />
                    </div>
                    <h3 className="text-xl font-black text-gray-800 mb-2">{cert.title}</h3>
                    <p className="text-gray-600">{cert.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Catalog Modal */}
      {isCatalogModalOpen && content.catalogUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-800 flex items-center">
                  <FileText className="w-8 h-8 ml-3 text-amber-500" />
                  کاتالوگ عطرین پک ۲۰۲۵
                </h3>
                <button
                  onClick={() => setIsCatalogModalOpen(false)}
                  className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-300"
                >
                  ×
                </button>
              </div>
              
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=800&fit=crop"
                  alt="کاتالوگ کامل"
                  className="w-full max-w-md mx-auto rounded-xl shadow-lg mb-6"
                />
                <p className="text-gray-600 mb-6">
                  کاتالوگ کامل محصولات عطرین پک شامل تمام شیشه‌ها، پمپ‌ها، درپوش‌ها و اسانس‌ها
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={content.catalogUrl}
                    download
                    className="bg-amber-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-600 transition-colors duration-300 flex items-center justify-center space-x-reverse space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>دانلود PDF</span>
                  </a>
                  <button 
                    onClick={() => window.location.href = '/products'}
                    className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center space-x-reverse space-x-2"
                  >
                    <Eye className="w-5 h-5" />
                    <span>مشاهده محصولات</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default About;