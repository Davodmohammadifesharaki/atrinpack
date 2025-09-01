import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Crown, 
  Award, 
  Users, 
  Globe, 
  Target,
  Heart,
  Lightbulb,
  TrendingUp
} from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-black mb-6">درباره آترین پک</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              بیش از ۱۵ سال تجربه در تولید و ارائه بهترین محصولات بسته‌بندی لوکس
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-gray-800">داستان ما</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                آترین پک در سال ۱۳۸۸ با هدف تولید محصولات بسته‌بندی با کیفیت بین‌المللی آغاز به کار کرد. 
                ما با تکیه بر تجربه و دانش فنی تیم متخصص خود، توانسته‌ایم جایگاه ویژه‌ای در صنعت بسته‌بندی 
                لوکس کسب کنیم.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                امروزه آترین پک به عنوان یکی از پیشروان صنعت بسته‌بندی در ایران شناخته می‌شود و محصولات 
                ما در بازارهای داخلی و خارجی مورد استقبال قرار گرفته است.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                alt="کارخانه آترین پک"
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center ml-4">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-800">ماموریت ما</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                تولید و ارائه محصولات بسته‌بندی با کیفیت بین‌المللی، طراحی خلاقانه و قیمت مناسب 
                برای تمامی مشتریان در سراسر کشور و منطقه.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center ml-4">
                  <Lightbulb className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-800">چشم‌انداز ما</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                تبدیل شدن به برترین تولیدکننده محصولات بسته‌بندی لوکس در منطقه خاورمیانه 
                و ارائه راه‌حل‌های نوآورانه به صنایع مختلف.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-800 mb-4">ارزش‌های ما</h2>
            <p className="text-xl text-gray-600">اصولی که ما را راهنمایی می‌کند</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-3">مشتری‌مداری</h3>
              <p className="text-gray-600">رضایت مشتری اولویت اول ماست</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-3">کیفیت</h3>
              <p className="text-gray-600">تعهد به بالاترین استانداردهای کیفی</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-3">نوآوری</h3>
              <p className="text-gray-600">پیشرو در ارائه راه‌حل‌های خلاقانه</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-purple-500" />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-3">رشد مستمر</h3>
              <p className="text-gray-600">بهبود مداوم فرآیندها و محصولات</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">دستاوردهای ما</h2>
            <p className="text-xl text-amber-100">نتایج تلاش‌های مستمر تیم آترین پک</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black mb-2">۱۵+</div>
              <div className="text-xl font-bold">سال تجربه</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black mb-2">۵۰۰+</div>
              <div className="text-xl font-bold">مشتری راضی</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black mb-2">۱۰۰+</div>
              <div className="text-xl font-bold">نوع محصول</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black mb-2">۱۰</div>
              <div className="text-xl font-bold">کشور صادرات</div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-800 mb-4">گواهینامه‌ها و افتخارات</h2>
            <p className="text-xl text-gray-600">تأیید کیفیت از مراجع معتبر بین‌المللی</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-2">ISO 9001:2015</h3>
              <p className="text-gray-600">سیستم مدیریت کیفیت</p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-2">CE Marking</h3>
              <p className="text-gray-600">استاندارد اروپایی</p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-2xl">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-2">برند برتر</h3>
              <p className="text-gray-600">انتخاب مشتریان ۱۴۰۲</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;