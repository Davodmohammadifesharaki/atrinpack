import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';
import ProductCard from '../components/ProductCard';
import ImageGallery from '../components/ImageGallery';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useProduct, useProducts } from '../hooks/useSupabase';
import { getImageUrl, getAllImages } from '../utils/imageUpload';
import { 
  Star, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  MessageCircle,
  CheckCircle,
  Truck,
  Shield,
  Award,
  ArrowRight,
  Eye,
  Palette
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id || '');
  const { products: allProducts } = useProducts();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('شفاف');
  const [selectedVolume, setSelectedVolume] = useState('50ml');

  // محصولات مرتبط - فیلتر بر اساس دسته‌بندی مشابه
  const relatedProducts = allProducts
    .filter(p => p.id !== id && p.category === product?.category)
    .slice(0, 4);

  // رنگ‌های موجود (می‌تواند از دیتابیس یا تنظیمات آمده باشد)
  const availableColors = [
    { id: 'clear', name: 'شفاف', hex: '#ffffff' },
    { id: 'blue', name: 'آبی', hex: '#3b82f6' },
    { id: 'green', name: 'سبز', hex: '#10b981' },
    { id: 'gold', name: 'طلایی', hex: '#f59e0b' },
    { id: 'silver', name: 'نقره‌ای', hex: '#6b7280' },
    { id: 'black', name: 'مشکی', hex: '#000000' },
    { id: 'red', name: 'قرمز', hex: '#ef4444' },
    { id: 'purple', name: 'بنفش', hex: '#8b5cf6' }
  ];

  const availableVolumes = ['18ml', '25ml', '30ml', '50ml', '75ml', '100ml'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Header />
        <LoadingSpinner message="در حال بارگذاری محصول..." />
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Header />
        <div className="container mx-auto px-6 py-12">
          <ErrorMessage message={error || 'محصول یافت نشد'} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-reverse space-x-2 text-gray-600">
            <Link to="/" className="hover:text-blue-600">خانه</Link>
            <ArrowRight className="w-4 h-4" />
            <Link to="/products" className="hover:text-blue-600">محصولات</Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-gray-800 font-bold">{product.name}</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <ImageGallery
                images={getAllImages(product.images, product.image_url)}
                title={product.name}
                className="h-96"
                showThumbnails={true}
                allowDownload={false}
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {product.is_new && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    جدید
                  </span>
                )}
                {product.is_featured && (
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ویژه
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-600 font-bold">{product.category}</span>
              </div>
              <h1 className="text-3xl font-black text-gray-800 mb-4">{product.name}</h1>
              {product.description && (
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              )}
            </div>

            {/* باکس گرافیکی جزئیات */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-amber-200">
              <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center">
                <Eye className="w-6 h-6 ml-2 text-amber-500" />
                جزئیات محصول
              </h3>
              
              {/* انتخاب رنگ */}
              {product.color && (
                <div className="mb-6">
                  <label className="block text-gray-700 font-bold mb-3">رنگ:</label>
                  <div className="flex flex-wrap gap-3">
                    {availableColors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.name)}
                        className={`flex items-center space-x-reverse space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                          selectedColor === color.name
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200 hover:border-amber-300'
                        }`}
                      >
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <span className="text-sm font-bold">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* انتخاب حجم */}
              {product.volume && (
                <div className="mb-6">
                  <label className="block text-gray-700 font-bold mb-3">حجم:</label>
                  <div className="flex flex-wrap gap-3">
                    {availableVolumes.map((volume) => (
                      <button
                        key={volume}
                        onClick={() => setSelectedVolume(volume)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                          selectedVolume === volume
                            ? 'border-amber-500 bg-amber-50 text-amber-700'
                            : 'border-gray-200 hover:border-amber-300'
                        }`}
                      >
                        <span className="text-sm font-bold">{volume}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* مشخصات */}
              <div className="grid grid-cols-2 gap-4">
                {product.material && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-bold text-gray-700 text-sm">جنس</span>
                    <span className="text-gray-600 text-sm">{product.material}</span>
                  </div>
                )}
                {product.volume && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-bold text-gray-700 text-sm">حجم</span>
                    <span className="text-gray-600 text-sm">{product.volume}</span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-bold text-gray-700 text-sm">وزن</span>
                    <span className="text-gray-600 text-sm">{product.weight}g</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-bold text-gray-700 text-sm">ابعاد</span>
                    <span className="text-gray-600 text-sm">{product.dimensions}</span>
                  </div>
                )}
                {product.color && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-bold text-gray-700 text-sm">رنگ</span>
                    <span className="text-gray-600 text-sm">{product.color}</span>
                  </div>
                )}
                {product.shape && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-bold text-gray-700 text-sm">شکل</span>
                    <span className="text-gray-600 text-sm">{product.shape}</span>
                  </div>
                )}
                {product.min_order && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-bold text-gray-700 text-sm">حداقل سفارش</span>
                    <span className="text-gray-600 text-sm">{product.min_order} عدد</span>
                  </div>
                )}
                {product.price && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-bold text-gray-700 text-sm">قیمت</span>
                    <span className="text-gray-600 text-sm">{product.price}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-reverse space-x-2"
              >
                <Phone className="w-6 h-6" />
                <span>برای اطلاعات بیشتر تماس بگیرید</span>
              </button>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => window.location.href = '/mix-match'}
                  className="flex-1 bg-purple-500 text-white py-3 rounded-xl font-bold hover:bg-purple-600 transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2"
                >
                  <Palette className="w-5 h-5" />
                  <span>شخصی‌سازی</span>
                </button>
                <button className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>علاقه‌مندی‌ها</span>
                </button>
                <button className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2">
                  <Share2 className="w-5 h-5" />
                  <span>اشتراک‌گذاری</span>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <Truck className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-sm font-bold text-gray-800">ارسال سریع</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-sm font-bold text-gray-800">تضمین کیفیت</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-sm font-bold text-gray-800">گواهینامه ISO</div>
              </div>
            </div>
          </div>
        </div>

        {/* محصولات مرتبط - گرید ۴×۴ */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-gray-800 mb-4">محصولات مرتبط</h2>
              <p className="text-xl text-gray-600">محصولات مشابه که ممکن است علاقه‌مند باشید</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard 
                  key={relatedProduct.id} 
                  id={relatedProduct.id}
                  name={relatedProduct.name}
                  category={relatedProduct.category}
                  image={relatedProduct.image_url}
                  images={relatedProduct.images}
                  price={relatedProduct.price}
                  isNew={relatedProduct.is_new}
                  isFeatured={relatedProduct.is_featured}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

export default ProductDetail;