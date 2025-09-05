
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNewsItem, newsOperations } from '../hooks/useSupabase';
import { Save, X, ImageIcon } from 'lucide-react';

interface NewsFormProps {
  mode: 'add' | 'edit';
  newsId?: string;
  onSave?: (data: any) => void;
  onCancel?: () => void;
}

const NewsForm: React.FC<NewsFormProps> = ({ mode, newsId, onSave, onCancel }) => {
  const navigate = useNavigate();
  const { news: existingNews, loading } = useNewsItem(newsId || '');
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    excerpt: '',
    date: new Date().toISOString().split('T')[0],
    featured: false,
    visible: true,
    image: null as File | null,
    images: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['اخبار تولید', 'گواهینامه‌ها', 'نمایشگاه‌ها', 'محصولات جدید', 'فناوری'];

  useEffect(() => {
    if (mode === 'edit' && existingNews) {
      setFormData({
        title: existingNews.title,
        category: existingNews.category,
        content: existingNews.content,
        excerpt: existingNews.excerpt || '',
        date: existingNews.date,
        featured: existingNews.featured,
        visible: existingNews.visible,
        image: null,
        images: []
      });
    }
  }, [mode, existingNews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const newsData = {
        title: formData.title,
        category: formData.category,
        content: formData.content,
        excerpt: formData.excerpt || null,
        date: formData.date,
        featured: formData.featured,
        visible: formData.visible,
        read_time: `${Math.ceil(formData.content.length / 200)} دقیقه مطالعه`,
        views: mode === 'add' ? 0 : existingNews?.views || 0
      };

      let result;
      if (mode === 'add') {
        result = await newsOperations.create(newsData, formData.image || undefined);
      } else {
        result = await newsOperations.update(newsId!, newsData, formData.image || undefined);
      }

      if (result.error) {
        throw result.error;
      }

      if (onSave) {
        onSave(result.data);
      }
      
      alert(mode === 'add' ? 'خبر با موفقیت اضافه شد!' : 'خبر با موفقیت ویرایش شد!');
      navigate('/admin/news');
    } catch (error) {
      console.error('Error saving news:', error);
      alert('خطا در ذخیره خبر. لطفاً مجدداً تلاش کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024); // 5MB limit
      
      if (validFiles.length !== files.length) {
        alert('برخی فایل‌ها حجم بیشتر از ۵ مگابایت داشتند و حذف شدند!');
      }
      
      const newImages = validFiles.slice(0, 3 - formData.images.length);
      setFormData({
        ...formData,
        images: [...formData.images, ...newImages].slice(0, 3)
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/admin/news');
    }
  };

  if (loading && mode === 'edit') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8" dir="rtl">
        <div className="text-center py-8">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری اطلاعات خبر...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8" dir="rtl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-gray-800">
          {mode === 'add' ? 'افزودن خبر جدید' : 'ویرایش خبر'}
        </h1>
        <button
          onClick={handleCancel}
          className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-300"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-bold mb-2">عنوان خبر</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="عنوان خبر را وارد کنید"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">دسته‌بندی</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isSubmitting}
            >
              <option value="">انتخاب کنید</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">تاریخ</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">خلاصه خبر</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="خلاصه‌ای از خبر را وارد کنید"
            disabled={isSubmitting}
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">متن خبر</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="متن کامل خبر را وارد کنید"
            required
            disabled={isSubmitting}
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-4">تصاویر خبر (حداکثر 3 تصویر)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">تصاویر خبر را بکشید و رها کنید</p>
            <p className="text-sm text-gray-500 mb-4">یا کلیک کنید تا فایل انتخاب کنید (PNG/JPG، حداکثر ۵MB)</p>
            <input 
              type="file" 
              accept="image/png,image/jpeg,image/jpg" 
              multiple
              onChange={handleImageUpload}
              className="hidden" 
              id="news-image-upload"
              disabled={isSubmitting}
            />
            <label 
              htmlFor="news-image-upload"
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300 cursor-pointer inline-block"
            >
              انتخاب تصاویر
            </label>
          </div>

          {/* نمایش تصویر فعلی در حالت ویرایش */}
          {mode === 'edit' && existingNews?.image_url && !formData.image && (
            <div className="mt-6">
              <h4 className="text-lg font-bold text-gray-700 mb-4">تصویر فعلی:</h4>
              <div className="relative inline-block">
                <img 
                  src={existingNews.image_url} 
                  alt="تصویر فعلی"
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          )}

          {formData.images.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-bold text-gray-700 mb-4">تصاویر انتخاب شده:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={URL.createObjectURL(image)} 
                      alt={`تصویر ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-lg"
                      disabled={isSubmitting}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-reverse space-x-4 p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              disabled={isSubmitting}
            />
            <label className="mr-3 text-gray-700 font-bold">خبر ویژه</label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="visible"
              checked={formData.visible}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              disabled={isSubmitting}
            />
            <label className="mr-3 text-gray-700 font-bold">نمایش در سایت</label>
          </div>
        </div>

        <div className="flex justify-end space-x-reverse space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-400 transition-colors duration-300"
            disabled={isSubmitting}
          >
            انصراف
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-reverse space-x-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>در حال ذخیره...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>ذخیره</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsForm;
