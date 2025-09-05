import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useSettings, settingsOperations } from '../../hooks/useSupabase';
import { uploadImage } from '../../utils/imageUpload';
import { 
  Save, 
  Upload, 
  FileText, 
  Download, 
  Plus, 
  Trash2, 
  Edit,
  Heart,
  Award,
  Lightbulb,
  TrendingUp,
  Crown,
  Globe,
  Shield,
  Target,
  Users,
  Star,
  CheckCircle,
  Zap,
  Gem,
  Rocket
} from 'lucide-react';

const AboutSettings = () => {
  const { settings: aboutSettings, loading, refetch } = useSettings('about_page_content');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [catalogFile, setCatalogFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    mainText: '',
    storyText: '',
    mission: '',
    vision: '',
    values: [
      { title: 'مشتری‌مداری', description: 'رضایت مشتری اولویت اول ماست', icon: 'Heart' },
      { title: 'کیفیت', description: 'تعهد به بالاترین استانداردهای کیفی', icon: 'Award' },
      { title: 'نوآوری', description: 'پیشرو در ارائه راه‌حل‌های خلاقانه', icon: 'Lightbulb' },
      { title: 'رشد مستمر', description: 'بهبود مداوم فرآیندها و محصولات', icon: 'TrendingUp' }
    ],
    achievements: [
      { number: '۱۵+', title: 'سال تجربه' },
      { number: '۵۰۰+', title: 'مشتری راضی' },
      { number: '۱۰۰+', title: 'نوع محصول' },
      { number: '۱۰', title: 'کشور صادرات' }
    ],
    certifications: [
      { title: 'ISO 9001:2015', description: 'سیستم مدیریت کیفیت', icon: 'Award' },
      { title: 'CE Marking', description: 'استاندارد اروپایی', icon: 'Globe' },
      { title: 'برند برتر', description: 'انتخاب مشتریان ۱۴۰۲', icon: 'Crown' }
    ],
    catalogUrl: ''
  });

  const availableIcons = [
    { name: 'Heart', component: Heart },
    { name: 'Award', component: Award },
    { name: 'Lightbulb', component: Lightbulb },
    { name: 'TrendingUp', component: TrendingUp },
    { name: 'Crown', component: Crown },
    { name: 'Globe', component: Globe },
    { name: 'Shield', component: Shield },
    { name: 'Target', component: Target },
    { name: 'Users', component: Users },
    { name: 'Star', component: Star },
    { name: 'CheckCircle', component: CheckCircle },
    { name: 'Zap', component: Zap },
    { name: 'Gem', component: Gem },
    { name: 'Rocket', component: Rocket }
  ];

  useEffect(() => {
    if (aboutSettings && Object.keys(aboutSettings).length > 0) {
      setFormData({
        mainText: aboutSettings.mainText || '',
        storyText: aboutSettings.storyText || '',
        mission: aboutSettings.mission || '',
        vision: aboutSettings.vision || '',
        values: aboutSettings.values || formData.values,
        achievements: aboutSettings.achievements || formData.achievements,
        certifications: aboutSettings.certifications || formData.certifications,
        catalogUrl: aboutSettings.catalogUrl || ''
      });
    }
  }, [aboutSettings]);

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      let catalogUrl = formData.catalogUrl;
      
      // Upload catalog if new file selected
      if (catalogFile) {
        const uploadedUrl = await uploadImage(catalogFile, 'catalogs');
        if (uploadedUrl) {
          catalogUrl = uploadedUrl;
        }
      }

      const dataToSave = {
        ...formData,
        catalogUrl
      };

      const { error } = await settingsOperations.set('about_page_content', dataToSave);
      if (error) throw error;

      alert('محتوای صفحه درباره ما با موفقیت ذخیره شد!');
      refetch();
    } catch (error) {
      console.error('Error saving about content:', error);
      alert('خطا در ذخیره محتوا');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addValue = () => {
    setFormData({
      ...formData,
      values: [...formData.values, { title: '', description: '', icon: 'Heart' }]
    });
  };

  const removeValue = (index: number) => {
    setFormData({
      ...formData,
      values: formData.values.filter((_, i) => i !== index)
    });
  };

  const updateValue = (index: number, field: string, value: string) => {
    const newValues = [...formData.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setFormData({ ...formData, values: newValues });
  };

  const addAchievement = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, { number: '', title: '' }]
    });
  };

  const removeAchievement = (index: number) => {
    setFormData({
      ...formData,
      achievements: formData.achievements.filter((_, i) => i !== index)
    });
  };

  const updateAchievement = (index: number, field: string, value: string) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = { ...newAchievements[index], [field]: value };
    setFormData({ ...formData, achievements: newAchievements });
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [...formData.certifications, { title: '', description: '', icon: 'Award' }]
    });
  };

  const removeCertification = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index)
    });
  };

  const updateCertification = (index: number, field: string, value: string) => {
    const newCertifications = [...formData.certifications];
    newCertifications[index] = { ...newCertifications[index], [field]: value };
    setFormData({ ...formData, certifications: newCertifications });
  };

  const getIconComponent = (iconName: string) => {
    const icon = availableIcons.find(i => i.name === iconName);
    return icon ? icon.component : Heart;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری تنظیمات...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-800">تنظیمات صفحه درباره ما</h1>
            <p className="text-gray-600 mt-2">مدیریت محتوای صفحه درباره ما</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-reverse space-x-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{isSubmitting ? 'در حال ذخیره...' : 'ذخیره تغییرات'}</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Main Text */}
          <div>
            <label className="block text-gray-700 font-bold mb-4">متن اصلی درباره ما</label>
            <textarea
              value={formData.mainText}
              onChange={(e) => setFormData({...formData, mainText: e.target.value})}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="متن معرفی شرکت را وارد کنید"
            />
          </div>

          {/* Story Text */}
          <div>
            <label className="block text-gray-700 font-bold mb-4">داستان ما</label>
            <textarea
              value={formData.storyText}
              onChange={(e) => setFormData({...formData, storyText: e.target.value})}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="داستان شرکت را وارد کنید"
            />
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-bold mb-4">ماموریت ما</label>
              <textarea
                value={formData.mission}
                onChange={(e) => setFormData({...formData, mission: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="ماموریت شرکت را وارد کنید"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-4">چشم‌انداز ما</label>
              <textarea
                value={formData.vision}
                onChange={(e) => setFormData({...formData, vision: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="چشم‌انداز شرکت را وارد کنید"
              />
            </div>
          </div>

          {/* Values */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-gray-700 font-bold">ارزش‌های ما</label>
              <button
                onClick={addValue}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center space-x-reverse space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>افزودن ارزش</span>
              </button>
            </div>
            <div className="space-y-4">
              {formData.values.map((value, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-600 font-bold mb-2">عنوان</label>
                      <input
                        type="text"
                        value={value.title}
                        onChange={(e) => updateValue(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="عنوان ارزش"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-bold mb-2">توضیحات</label>
                      <input
                        type="text"
                        value={value.description}
                        onChange={(e) => updateValue(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="توضیحات ارزش"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-bold mb-2">آیکون</label>
                      <div className="flex items-center gap-2">
                        <select
                          value={value.icon}
                          onChange={(e) => updateValue(index, 'icon', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {availableIcons.map(icon => (
                            <option key={icon.name} value={icon.name}>{icon.name}</option>
                          ))}
                        </select>
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          {React.createElement(getIconComponent(value.icon), { className: "w-5 h-5 text-blue-600" })}
                        </div>
                        <button
                          onClick={() => removeValue(index)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-gray-700 font-bold">دستاوردهای ما</label>
              <button
                onClick={addAchievement}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center space-x-reverse space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>افزودن دستاورد</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.achievements.map((achievement, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-gray-600 font-bold mb-2">عدد</label>
                      <input
                        type="text"
                        value={achievement.number}
                        onChange={(e) => updateAchievement(index, 'number', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="مثال: ۱۵+"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-600 font-bold mb-2">عنوان</label>
                      <input
                        type="text"
                        value={achievement.title}
                        onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="عنوان دستاورد"
                      />
                    </div>
                    <button
                      onClick={() => removeAchievement(index)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors mt-6"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-gray-700 font-bold">گواهینامه‌ها و افتخارات</label>
              <button
                onClick={addCertification}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center space-x-reverse space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>افزودن گواهینامه</span>
              </button>
            </div>
            <div className="space-y-4">
              {formData.certifications.map((cert, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-600 font-bold mb-2">عنوان</label>
                      <input
                        type="text"
                        value={cert.title}
                        onChange={(e) => updateCertification(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="عنوان گواهینامه"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-bold mb-2">توضیحات</label>
                      <input
                        type="text"
                        value={cert.description}
                        onChange={(e) => updateCertification(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="توضیحات گواهینامه"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-bold mb-2">آیکون</label>
                      <div className="flex items-center gap-2">
                        <select
                          value={cert.icon}
                          onChange={(e) => updateCertification(index, 'icon', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {availableIcons.map(icon => (
                            <option key={icon.name} value={icon.name}>{icon.name}</option>
                          ))}
                        </select>
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          {React.createElement(getIconComponent(cert.icon), { className: "w-5 h-5 text-blue-600" })}
                        </div>
                        <button
                          onClick={() => removeCertification(index)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Catalog Upload */}
          <div>
            <label className="block text-gray-700 font-bold mb-4">کاتالوگ محصولات (PDF)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">فایل PDF کاتالوگ را بکشید و رها کنید</p>
              <p className="text-sm text-gray-500 mb-4">یا کلیک کنید تا فایل انتخاب کنید (PDF، حداکثر ۱۰MB)</p>
              <input 
                type="file" 
                accept="application/pdf" 
                onChange={(e) => setCatalogFile(e.target.files?.[0] || null)}
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

            {catalogFile && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center space-x-reverse space-x-3">
                  <FileText className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-bold text-green-800">{catalogFile.name}</div>
                    <div className="text-sm text-green-600">
                      {(catalogFile.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  </div>
                </div>
              </div>
            )}

            {formData.catalogUrl && !catalogFile && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-reverse space-x-3">
                    <FileText className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="font-bold text-blue-800">کاتالوگ فعلی</div>
                      <div className="text-sm text-blue-600">فایل آپلود شده موجود است</div>
                    </div>
                  </div>
                  <a
                    href={formData.catalogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center space-x-reverse space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>دانلود</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AboutSettings;