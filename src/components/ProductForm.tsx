import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProduct, productOperations } from '../hooks/useSupabase';
import { Save, X, Upload, ImageIcon } from 'lucide-react';

interface ProductFormProps {
  mode: 'add' | 'edit';
  productId?: string;
  onSave?: (data: any) => void;
  onCancel?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ mode, productId, onSave, onCancel }) => {
  const navigate = useNavigate();
  const { product: existingProduct, loading } = useProduct(productId || '');
  
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
    price: '',
    isNew: false,
    isFeatured: false,
    showInMixMatch: false,
    visible: true,
    image: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['شیشه و بطری', 'پمپ و اسپری', 'درپوش', 'اسانس', 'پلمپر'];

  useEffect(() => {
    if (mode === 'edit' && existingProduct) {
      setFormData({
        name: existingProduct.name,
        category: existingProduct.category,
        description: existingProduct.description || '',
        minOrder: existingProduct.min_order?.toString() || '',
        weight: existingProduct.weight?.toString() || '',
        dimensions: existingProduct.dimensions || '',
        color: existingProduct.color || '',
        volume: existingProduct.volume || '',
        material: existingProduct.material || '',
        shape: existingProduct.shape || '',
        price: existingProduct.price || '',
        isNew: existingProduct.is_new,
        isFeatured: existingProduct.is_featured,
        showInMixMatch: existingProduct.show_in_mix_match,
        visible: existingProduct.visible,
        image: null
      });
    }
  }, [mode, existingProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const productData = {
        name: formData.name,
        category: formData.category,
        description: formData.description || null,
        min_order: formData.minOrder ? parseInt(formData.minOrder) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        dimensions: formData.dimensions || null,
        color: formData.color || null,
        volume: formData.volume || null,
        material: formData.material || null,
        shape: formData.shape || null,
        price: formData.price || null,
        is_new: formData.isNew,
        is_featured: formData.isFeatured,
        show_in_mix_match: formData.showInMixMatch,
        visible: formData.visible
      };

      let result;
      if (mode === 'add') {
        result = await productOperations.create(productData, formData.image || undefined);
      } else {
        result = await productOperations.update(productId!, productData, formData.image || undefined);
      }

      if (result.error) {
        throw result.error;
      }

      if (onSave) {
        onSave(result.data);
      }
      
      alert(mode === 'add' ? 'محصول با موفقیت اضافه شد!' : 'محصول با موفقیت ویرایش شد!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('خطا در ذخیره محصول. لطفاً مجدداً تلاش کنید.');
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
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size <= 5 * 1024 * 1024) { // 5MB limit
        setFormData({
          ...formData,
          image: file
        });
      } else {
        alert('حجم فایل نباید بیشتر از ۵ مگابایت باشد!');
      }
    }
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      image: null
    });
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/admin/products');
    }
  };

  if (loading && mode === 'edit') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8" dir="rtl">
        <div className="text-center py-8">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری اطلاعات محصول...</p>
        </div>
      </div>
    );
  }

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
            <label className="block text-gray-700 font-bold mb-2">قیمت</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="قیمت محصول"
              disabled={isSubmitting}
            />
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
            disabled={isSubmitting}
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-4">تصویر محصول</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">تصویر محصول را بکشید و رها کنید</p>
            <p className="text-sm text-gray-500 mb-4">یا کلیک کنید تا فایل انتخاب کنید (PNG/JPG، حداکثر ۵MB)</p>
            <input 
              type="file" 
              accept="image/png,image/jpeg,image/jpg" 
              onChange={handleImageUpload}
              className="hidden" 
              id="product-image-upload"
              disabled={isSubmitting}
            />
            <label 
              htmlFor="product-image-upload"
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300 cursor-pointer inline-block"
            >
              انتخاب تصویر
            </label>
          </div>

          {/* نمایش تصویر فعلی در حالت ویرایش */}
          {mode === 'edit' && existingProduct?.image_url && !formData.image && (
            <div className="mt-6">
              <h4 className="text-lg font-bold text-gray-700 mb-4">تصویر فعلی:</h4>
              <div className="relative inline-block">
                <img 
                  src={existingProduct.image_url} 
                  alt="تصویر فعلی"
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          )}

          {/* نمایش تصویر جدید انتخاب شده */}
          {formData.image && (
            <div className="mt-6">
              <h4 className="text-lg font-bold text-gray-700 mb-4">تصویر جدید:</h4>
              <div className="relative inline-block">
                <img 
                  src={URL.createObjectURL(formData.image)} 
                  alt="تصویر جدید"
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-lg"
                  disabled={isSubmitting}
                >
                  <X className="w-4 h-4" />
                </button>
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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

export default ProductForm;