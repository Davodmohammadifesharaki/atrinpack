import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useSettings, settingsOperations } from '../../hooks/useSupabase';
import SingleImageUpload from '../../components/SingleImageUpload';
import { uploadImage, deleteImage } from '../../utils/imageUpload';
import { 
  Settings, 
  Save, 
  Upload, 
  Download,
  FileText,
  Globe,
  Shield,
  Database,
  Clock,
  Search,
  Image as ImageIcon,
  Link as LinkIcon
} from 'lucide-react';

const AdminSettings = () => {
  const { settings: seoSettings, loading: seoLoading, refetch: refetchSeo } = useSettings('seo_settings');
  const [activeTab, setActiveTab] = useState('seo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [seoData, setSeoData] = useState({
    siteTitle: '',
    siteDescription: '',
    keywords: '',
    ogImage: '',
    ogImageFile: null as File | null,
    twitterCard: 'summary_large_image',
    robotsTxt: '',
    sitemapUrl: '',
    googleAnalyticsId: '',
    googleSearchConsoleId: '',
    facebookPixelId: '',
    canonicalUrl: '',
    alternateLanguages: '',
    structuredData: ''
  });

  useEffect(() => {
    if (seoSettings && Object.keys(seoSettings).length > 0) {
      setSeoData({
        siteTitle: seoSettings.siteTitle || '',
        siteDescription: seoSettings.siteDescription || '',
        keywords: seoSettings.keywords || '',
        ogImage: seoSettings.ogImage || '',
        twitterCard: seoSettings.twitterCard || 'summary_large_image',
        robotsTxt: seoSettings.robotsTxt || '',
        sitemapUrl: seoSettings.sitemapUrl || '',
        googleAnalyticsId: seoSettings.googleAnalyticsId || '',
        googleSearchConsoleId: seoSettings.googleSearchConsoleId || '',
        facebookPixelId: seoSettings.facebookPixelId || '',
        canonicalUrl: seoSettings.canonicalUrl || '',
        alternateLanguages: seoSettings.alternateLanguages || '',
        structuredData: seoSettings.structuredData || ''
      });
    }
  }, [seoSettings]);

  const handleSaveSeo = async () => {
    setIsSubmitting(true);
    try {
      let ogImageUrl = seoData.ogImage;
      
      // Upload new OG image if selected
      if (seoData.ogImageFile) {
        // Delete old image if exists
        if (seoData.ogImage) {
          await deleteImage(seoData.ogImage, 'images');
        }
        
        const uploadedUrl = await uploadImage(seoData.ogImageFile, 'images');
        if (uploadedUrl) {
          ogImageUrl = uploadedUrl;
        } else {
          throw new Error('خطا در آپلود تصویر');
        }
      }
      
      const dataToSave = {
        ...seoData,
        ogImage: ogImageUrl
      };
      delete dataToSave.ogImageFile; // Remove file object before saving
      
      const { error } = await settingsOperations.set('seo_settings', dataToSave);
      if (error) throw error;

      alert('تنظیمات سئو با موفقیت ذخیره شد!');
      
      // Update local state with new URL
      setSeoData({
        ...seoData,
        ogImage: ogImageUrl,
        ogImageFile: null
      });
      
      refetchSeo();
    } catch (error) {
      console.error('Error saving SEO settings:', error);
      alert('خطا در ذخیره تنظیمات سئو');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOgImageChange = (file: File | null) => {
    setSeoData({
      ...seoData,
      ogImageFile: file
    });
  };

  const handleRemoveExistingOgImage = () => {
    setSeoData({
      ...seoData,
      ogImage: '',
      ogImageFile: null
    });
  };

  const tabs = [
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
          {activeTab === 'seo' && (
            <button 
              onClick={handleSaveSeo}
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-reverse space-x-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{isSubmitting ? 'در حال ذخیره...' : 'ذخیره تغییرات'}</span>
            </button>
          )}
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
            {/* SEO Tab */}
            {activeTab === 'seo' && (
              <div className="space-y-8">
                {/* Basic SEO */}
                <div>
                  <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center">
                    <Search className="w-6 h-6 ml-2 text-blue-500" />
                    تنظیمات پایه سئو
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">عنوان سایت</label>
                      <input
                        type="text"
                        value={seoData.siteTitle}
                        onChange={(e) => setSeoData({...seoData, siteTitle: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="عنوان اصلی سایت"
                      />
                      <p className="text-xs text-gray-500 mt-1">حداکثر ۶۰ کاراکتر</p>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-2">URL کانونیکال</label>
                      <input
                        type="url"
                        value={seoData.canonicalUrl}
                        onChange={(e) => setSeoData({...seoData, canonicalUrl: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-bold mb-2">توضیحات سایت</label>
                      <textarea
                        value={seoData.siteDescription}
                        onChange={(e) => setSeoData({...seoData, siteDescription: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="توضیحات کوتاه و جذاب از سایت"
                      />
                      <p className="text-xs text-gray-500 mt-1">حداکثر ۱۶۰ کاراکتر</p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-bold mb-2">کلمات کلیدی</label>
                      <input
                        type="text"
                        value={seoData.keywords}
                        onChange={(e) => setSeoData({...seoData, keywords: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="کلمات را با کاما جدا کنید"
                      />
                    </div>
                  </div>
                </div>

                {/* Social Media SEO */}
                <div>
                  <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center">
                    <ImageIcon className="w-6 h-6 ml-2 text-green-500" />
                    تنظیمات شبکه‌های اجتماعی
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">تصویر Open Graph</label>
                      <SingleImageUpload
                        image={seoData.ogImageFile}
                        onImageChange={handleOgImageChange}
                        maxSizeInMB={5}
                        existingImageUrl={seoData.ogImage}
                        onExistingImageRemove={handleRemoveExistingOgImage}
                        disabled={isSubmitting}
                        title="تصویر Open Graph"
                        description="تصویر برای نمایش در شبکه‌های اجتماعی"
                        acceptedFormats="image/png,image/jpeg,image/jpg,image/webp"
                      />
                      <p className="text-xs text-gray-500 mt-1">ابعاد توصیه شده: ۱۲۰۰×۶۳۰ پیکسل</p>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-2">نوع کارت توییتر</label>
                      <select
                        value={seoData.twitterCard}
                        onChange={(e) => setSeoData({...seoData, twitterCard: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="summary">خلاصه</option>
                        <option value="summary_large_image">خلاصه با تصویر بزرگ</option>
                        <option value="app">اپلیکیشن</option>
                        <option value="player">پلیر</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-bold mb-2">عنوان صفحه اصلی</label>
                      <input
                        type="text"
                        value={seoData.homePageTitle || ''}
                        onChange={(e) => setSeoData({...seoData, homePageTitle: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="عنوان صفحه اصلی برای موتورهای جستجو"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-bold mb-2">توضیحات صفحه اصلی</label>
                      <textarea
                        value={seoData.homePageDescription || ''}
                        onChange={(e) => setSeoData({...seoData, homePageDescription: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="توضیحات صفحه اصلی برای موتورهای جستجو"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-bold mb-2">عنوان صفحه اصلی</label>
                      <input
                        type="text"
                        value={seoData.homePageTitle || ''}
                        onChange={(e) => setSeoData({...seoData, homePageTitle: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="عنوان صفحه اصلی برای موتورهای جستجو"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-bold mb-2">توضیحات صفحه اصلی</label>
                      <textarea
                        value={seoData.homePageDescription || ''}
                        onChange={(e) => setSeoData({...seoData, homePageDescription: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="توضیحات صفحه اصلی برای موتورهای جستجو"
                      />
                    </div>
                  </div>
                </div>

                {/* Technical SEO */}
                <div>
                  <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center">
                    <LinkIcon className="w-6 h-6 ml-2 text-purple-500" />
                    تنظیمات فنی سئو
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">URL نقشه سایت</label>
                      <input
                        type="url"
                        value={seoData.sitemapUrl}
                        onChange={(e) => setSeoData({...seoData, sitemapUrl: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/sitemap.xml"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-2">زبان‌های جایگزین</label>
                      <input
                        type="text"
                        value={seoData.alternateLanguages}
                        onChange={(e) => setSeoData({...seoData, alternateLanguages: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="en,ar,tr"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-bold mb-2">محتوای robots.txt</label>
                      <textarea
                        value={seoData.robotsTxt}
                        onChange={(e) => setSeoData({...seoData, robotsTxt: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
                        placeholder="User-agent: *&#10;Allow: /"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-bold mb-2">داده‌های ساختاریافته (JSON-LD)</label>
                      <textarea
                        value={seoData.structuredData}
                        onChange={(e) => setSeoData({...seoData, structuredData: e.target.value})}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
                        placeholder='{"@context": "https://schema.org", "@type": "Organization", ...}'
                      />
                    </div>
                  </div>
                </div>

                {/* Analytics & Tracking */}
                <div>
                  <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center">
                    <Database className="w-6 h-6 ml-2 text-amber-500" />
                    آنالیتیکس و ردیابی
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Google Analytics ID</label>
                      <input
                        type="text"
                        value={seoData.googleAnalyticsId}
                        onChange={(e) => setSeoData({...seoData, googleAnalyticsId: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="G-XXXXXXXXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Google Search Console</label>
                      <input
                        type="text"
                        value={seoData.googleSearchConsoleId}
                        onChange={(e) => setSeoData({...seoData, googleSearchConsoleId: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="کد تأیید"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-2">Facebook Pixel ID</label>
                      <input
                        type="text"
                        value={seoData.facebookPixelId}
                        onChange={(e) => setSeoData({...seoData, facebookPixelId: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="123456789"
                      />
                    </div>
                  </div>
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

export { AdminSettings as default };