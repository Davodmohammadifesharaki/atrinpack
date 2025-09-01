import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { 
  Settings, 
  Save, 
  Upload, 
  Download,
  FileText,
  Globe,
  Shield,
  Database,
  Clock
} from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [settings, setSettings] = useState({
    aboutText: 'آترین پک با بیش از ۱۵ سال تجربه در صنعت بسته‌بندی لوکس...',
    siteTitle: 'آترین پک - بسته‌بندی لوکس',
    siteDescription: 'تولیدکننده انواع شیشه‌های عطر، پمپ‌های اسپری و درپوش‌های هنری',
    keywords: 'شیشه عطر, پمپ اسپری, درپوش, اسانس, بسته‌بندی لوکس'
  });

  const handleSave = () => {
    console.log('Settings saved:', settings);
    alert('تنظیمات با موفقیت ذخیره شد!');
  };

  const tabs = [
    { id: 'content', label: 'محتوای صفحات', icon: FileText },
    { id: 'seo', label: 'تنظیمات سئو', icon: Globe },
    { id: 'security', label: 'امنیت', icon: Shield },
    { id: 'backup', label: 'بک‌آپ', icon: Database }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-800">تنظیمات سایت</h1>
            <p className="text-gray-600 mt-2">مدیریت تنظیمات کلی سایت</p>
          </div>
          <button 
            onClick={handleSave}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-reverse space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>ذخیره تغییرات</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-reverse space-x-2 px-6 py-4 font-bold transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Content Tab */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">متن درباره ما</label>
                  <textarea
                    value={settings.aboutText}
                    onChange={(e) => setSettings({...settings, aboutText: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">آپلود کاتالوگ (PDF)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">فایل PDF کاتالوگ را بکشید و رها کنید</p>
                    <input type="file" accept=".pdf" className="hidden" id="catalog-upload" />
                    <label 
                      htmlFor="catalog-upload"
                      className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300 cursor-pointer inline-block"
                    >
                      انتخاب فایل
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* SEO Tab */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">عنوان سایت</label>
                  <input
                    type="text"
                    value={settings.siteTitle}
                    onChange={(e) => setSettings({...settings, siteTitle: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">توضیحات سایت</label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">کلمات کلیدی</label>
                  <input
                    type="text"
                    value={settings.keywords}
                    onChange={(e) => setSettings({...settings, keywords: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="کلمات را با کاما جدا کنید"
                  />
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <Shield className="w-5 h-5 ml-2 text-red-500" />
                      تنظیمات رمز عبور
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">حداقل طول رمز عبور</span>
                        <input 
                          type="number" 
                          defaultValue="8" 
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">اجبار استفاده از حروف بزرگ</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">اجبار استفاده از اعداد</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">اجبار استفاده از کاراکترهای خاص</span>
                        <input type="checkbox" className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <Clock className="w-5 h-5 ml-2 text-blue-500" />
                      تنظیمات نشست
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">مدت زمان نشست (دقیقه)</span>
                        <input 
                          type="number" 
                          defaultValue="120" 
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">خروج خودکار</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">ورود همزمان چندگانه</span>
                        <input type="checkbox" className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <Globe className="w-5 h-5 ml-2 text-green-500" />
                      تنظیمات IP
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">IP های مجاز</label>
                        <textarea
                          placeholder="192.168.1.1&#10;10.0.0.1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
                          rows={3}
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">محدودیت IP فعال</span>
                        <input type="checkbox" className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <Database className="w-5 h-5 ml-2 text-purple-500" />
                      لاگ امنیتی
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="text-sm text-red-800 font-bold">تلاش ورود ناموفق</div>
                        <div className="text-xs text-red-600">IP: 192.168.1.100 - ۱۰ دقیقه پیش</div>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="text-sm text-green-800 font-bold">ورود موفق</div>
                        <div className="text-xs text-green-600">امین جعفری - ۱ ساعت پیش</div>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="text-sm text-blue-800 font-bold">تغییر رمز عبور</div>
                        <div className="text-xs text-blue-600">امین جعفری - ۲ روز پیش</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Backup Tab */}
            {activeTab === 'backup' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <Download className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-green-800 mb-2">دانلود بک‌آپ</h3>
                    <p className="text-green-700 mb-4">دانلود فایل بک‌آپ کامل سایت</p>
                    <button className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors duration-300">
                      دانلود بک‌آپ
                    </button>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                    <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-blue-800 mb-2">بازیابی بک‌آپ</h3>
                    <p className="text-blue-700 mb-4">بازیابی سایت از فایل بک‌آپ</p>
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300">
                      انتخاب فایل
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;