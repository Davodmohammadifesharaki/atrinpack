import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import MultipleImageUpload from '../../components/MultipleImageUpload';
import { galleryOperations } from '../../hooks/useSupabase';
import { Save, X, ImageIcon } from 'lucide-react';

const AddGallery = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    images: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['شیشه و بطری', 'پمپ و اسپری', 'درپوش', 'اسانس', 'پلمپر'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.images.length === 0) {
      alert('لطفاً حداقل یک تصویر انتخاب کنید!');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const galleryData = {
        title: formData.title,
        category: formData.category,
        description: formData.description || null,
        views: 0,
        downloads: 0
      };

      const result = await galleryOperations.create(galleryData, formData.images);
      
      if (result.error) {
        throw result.error;
      }
      
      alert('تصاویر با موفقیت اضافه شدند!');
      navigate('/admin/gallery');
    } catch (error) {
      console.error('Error saving gallery item:', error);
      alert('خطا در ذخیره تصاویر. لطفاً مجدداً تلاش کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This function is now handled by MultipleImageUpload component
  };

  const handleImagesChange = (newImages: File[]) => {
    setFormData({
      ...formData,
      images: newImages
    });
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-2xl shadow-xl p-8" dir="rtl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-gray-800">افزودن تصویر جدید</h1>
          <button
            onClick={() => navigate('/admin/gallery')}
            className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-300"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">عنوان تصویر</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="عنوان تصویر را وارد کنید"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">دسته‌بندی</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">انتخاب کنید</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">توضیحات</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="توضیحات تصویر را وارد کنید"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-4">تصاویر گالری (حداکثر 10 تصویر)</label>
            <MultipleImageUpload
              images={formData.images}
              onImagesChange={handleImagesChange}
              maxImages={10}
              maxSizePerImage={5}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end space-x-reverse space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/gallery')}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-400 transition-colors duration-300"
              disabled={isSubmitting}
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-colors duration-300 flex items-center space-x-reverse space-x-2 disabled:opacity-50"
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
    </AdminLayout>
  );
};

export default AddGallery;