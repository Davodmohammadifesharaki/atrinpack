
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Upload, ImageIcon } from 'lucide-react';

interface ProductFormProps {
  mode: 'add' | 'edit';
  productId?: string;
  onSave?: (data: any) => void;
  onCancel?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ mode, productId, onSave, onCancel }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    minOrder: '',
    weight: '',
    dimensions: '',
    color: '',
    volume: '',
    material: '',
    shape: '',
    isNew: false,
    isFeatured: false,
    showInMixMatch: false,
    visible: true,
    images: [] as File[]
  });

  const categories = ['شیشه و بطری', 'پمپ و اسپری', 'درپوش', 'اسانس', 'پلمپر'];

  useEffect(() => {
    if (mode === 'edit' && productId) {
      // در اینجا باید داده‌های محصول از API یا state بارگذاری شود
      // فعلاً از داده‌های نمونه استفاده می‌کنم
      setFormData({
        name: 'بطری عطر کریستالی 50ml',
        category: 'شیشه و بطری',
        description: 'بطری زیبا و شیک برای عطر',
        minOrder: '100',
        weight: '200',
        dimensions: '5x5x10',
        color: 'شفاف',
        volume: '50ml',
        material: 'شیشه',
        shape: 'استوانه‌ای',
        isNew: true,
        isFeatured: false,
        showInMixMatch: true,
        visible: true,
        images: []
      });
    }
  }, [mode, productId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Product saved:', formData);
    
    if (onSave) {
      onSave(formData);
    }
    
    alert(mode === 'add' ? 'محصول با موفقیت اضافه شد!' : 'محصول با موفقیت ویرایش شد!');
    navigate('/admin/products');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
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

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/admin/products');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8" dir="rtl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-gray-800">
          {mode === 'add' ? 'افزودن محصول جدید' : 'ویرایش محصول'}
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
            <label className="block text-gray-700 font-bold mb-2">نام محصول</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="نام محصول را وارد کنید"
              required
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
            >
              <option value="">انتخاب کنید</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">حداقل سفارش</label>
            <input
              type="number"
              name="minOrder"
              value={formData.minOrder}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="حداقل تعداد سفارش"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">وزن (گرم)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="وزن محصول"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">ابعاد</label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="مثال: 5x5x10 سانتی‌متر"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">رنگ</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="رنگ محصول"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">حجم</label>
            <input
              type="text"
              name="volume"
              value={formData.volume}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="مثال: 50ml"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">جنس</label>
            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="جنس محصول"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">شکل</label>
            <input
              type="text"
              name="shape"
              value={formData.shape}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="شکل محصول"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">توضیحات محصول</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="توضیحات محصول را وارد کنید"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-4">تصاویر محصول (حداکثر 5 تصویر)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">تصاویر محصول را بکشید و رها کنید</p>
            <p className="text-sm text-gray-500 mb-4">یا کلیک کنید تا فایل انتخاب کنید (PNG/JPG، حداکثر ۵MB)</p>
            <input 
              type="file" 
              accept="image/png,image/jpeg,image/jpg" 
              multiple
              onChange={handleImageUpload}
              className="hidden" 
              id="product-image-upload"
            />
            <label 
              htmlFor="product-image-upload"
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300 cursor-pointer inline-block"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isNew"
              checked={formData.isNew}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <label className="mr-3 text-gray-700 font-bold">محصول جدید</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <label className="mr-3 text-gray-700 font-bold">محصول ویژه</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="showInMixMatch"
              checked={formData.showInMixMatch}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <label className="mr-3 text-gray-700 font-bold">نمایش در Mix & Match</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="visible"
              checked={formData.visible}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <label className="mr-3 text-gray-700 font-bold">نمایش در سایت</label>
          </div>
        </div>

        <div className="flex justify-end space-x-reverse space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-400 transition-colors duration-300"
          >
            انصراف
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-reverse space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>ذخیره</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
