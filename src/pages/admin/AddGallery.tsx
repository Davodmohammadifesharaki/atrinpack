import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { Save, X, ImageIcon } from 'lucide-react';

const AddGallery = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    images: [] as File[]
  });

  const categories = ['شیشه و بطری', 'پمپ و اسپری', 'درپوش', 'اسانس', 'پلمپر'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Gallery item saved:', formData);
    alert('تصویر با موفقیت اضافه شد!');
    navigate('/admin/gallery');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setFormData({
        ...formData,
        images: [...formData.images, ...newImages].slice(0, 5)
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
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
            <label className="block text-gray-700 font-bold mb-4">تصاویر (حداکثر 5 تصویر)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">تصاویر را بکشید و رها کنید</p>
              <p className="text-sm text-gray-500 mb-4">یا کلیک کنید تا فایل انتخاب کنید (PNG/JPG، حداکثر ۵MB)</p>
              <input 
                type="file" 
                accept="image/png,image/jpeg,image/jpg" 
                multiple
                onChange={handleImageUpload}
                className="hidden" 
                id="gallery-image-upload"
              />
              <label 
                htmlFor="gallery-image-upload"
                className="bg-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-600 transition-colors duration-300 cursor-pointer inline-block"
              >
                انتخاب تصاویر
              </label>
            </div>

            {formData.images.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-bold text-gray-700 mb-4">تصاویر انتخاب شده:</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-reverse space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/gallery')}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-400 transition-colors duration-300"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-colors duration-300 flex items-center space-x-reverse space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>ذخیره</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddGallery;