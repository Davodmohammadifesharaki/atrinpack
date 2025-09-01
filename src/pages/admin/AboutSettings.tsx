import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Save, Upload, FileText, Download } from 'lucide-react';

const AboutSettings = () => {
  const [aboutContent, setAboutContent] = useState({
    mainText: `آترین پک با بیش از ۱۵ سال تجربه در صنعت بسته‌بندی لوکس، تولیدکننده انواع شیشه‌های عطر، پمپ‌های اسپری، درپوش‌های هنری و اسانس‌های طبیعی با کیفیت بین‌المللی است.

ما با تکیه بر تجربه و دانش فنی تیم متخصص خود، توانسته‌ایم جایگاه ویژه‌ای در صنعت بسته‌بندی لوکس کسب کنیم و محصولاتمان در بازارهای داخلی و خارجی مورد استقبال قرار گرفته است.`,
    
    mission: `تولید و ارائه محصولات بسته‌بندی با کیفیت بین‌المللی، طراحی خلاقانه و قیمت مناسب برای تمامی مشتریان در سراسر کشور و منطقه.`,
    
    vision: `تبدیل شدن به برترین تولیدکننده محصولات بسته‌بندی لوکس در منطقه خاورمیانه و ارائه راه‌حل‌های نوآورانه به صنایع مختلف.`,
    
    catalogFile: null as File | null
  });

  const handleSave = () => {
    console.log('About content saved:', aboutContent);
    alert('محتوای صفحه درباره ما با موفقیت ذخیره شد!');
  };

  const handleCatalogUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf' && file.size <= 10 * 1024 * 1024) { // 10MB limit
        setAboutContent({...aboutContent, catalogFile: file});
      } else {
        alert('لطفاً فایل PDF با حجم کمتر از ۱۰ مگابایت انتخاب کنید!');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-800">تنظیمات درباره ما</h1>
            <p className="text-gray-600 mt-2">ویرایش محتوای صفحه درباره ما</p>
          </div>
          <button 
            onClick={handleSave}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-reverse space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>ذخیره تغییرات</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-8">
            <div>
              <label className="block text-gray-700 font-bold mb-4">متن اصلی درباره ما</label>
              <textarea
                value={aboutContent.mainText}
                onChange={(e) => setAboutContent({...aboutContent, mainText: e.target.value})}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="متن معرفی شرکت را وارد کنید"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-4">ماموریت ما</label>
                <textarea
                  value={aboutContent.mission}
                  onChange={(e) => setAboutContent({...aboutContent, mission: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="ماموریت شرکت را وارد کنید"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-4">چشم‌انداز ما</label>
                <textarea
                  value={aboutContent.vision}
                  onChange={(e) => setAboutContent({...aboutContent, vision: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="چشم‌انداز شرکت را وارد کنید"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-4">کاتالوگ محصولات (PDF)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">فایل PDF کاتالوگ را بکشید و رها کنید</p>
                <p className="text-sm text-gray-500 mb-4">یا کلیک کنید تا فایل انتخاب کنید (PDF، حداکثر ۱۰MB)</p>
                <input 
                  type="file" 
                  accept="application/pdf" 
                  onChange={handleCatalogUpload}
                  className="hidden" 
                  id="catalog-upload"
                />
                <label 
                  htmlFor="catalog-upload"
                  className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300 cursor-pointer inline-block"
                >
                  انتخاب کاتالوگ
                </label>
              </div>

              {aboutContent.catalogFile && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center space-x-reverse space-x-3">
                    <FileText className="w-6 h-6 text-green-600" />
                    <div>
                      <div className="font-bold text-green-800">{aboutContent.catalogFile.name}</div>
                      <div className="text-sm text-green-600">
                        {(aboutContent.catalogFile.size / (1024 * 1024)).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AboutSettings;