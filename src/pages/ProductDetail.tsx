import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';
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
  Award
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // نمونه اطلاعات محصول
  const product = {
    id: 1,
    name: 'بطری عطر کریستالی 50ml',
    category: 'شیشه و بطری',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop'
    ],
    description: 'بطری عطر کریستالی با کیفیت بالا و طراحی زیبا، مناسب برای انواع عطر و ادکلن. این محصول با استفاده از بهترین مواد اولیه و تکنولوژی روز دنیا تولید شده است.',
    features: [
      'جنس: شیشه کریستالی درجه یک',
      'حجم: 50 میلی‌لیتر',
      'رنگ: شفاف',
      'شکل: استوانه‌ای',
      'وزن: 200 گرم',
      'ابعاد: 5×5×10 سانتی‌متر'
    ],
    specifications: {
      material: 'شیشه کریستالی',
      volume: '50ml',
      weight: '200g',
      dimensions: '5×5×10 cm',
      color: 'شفاف',
      shape: 'استوانه‌ای'
    },
    isNew: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 24
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              {product.isNew && (
                <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  جدید
                </span>
              )}
              {product.isFeatured && (
                <span className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  ویژه
                </span>
              )}
            </div>
            
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-600 font-bold">{product.category}</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="text-sm text-gray-600 mr-2">
                    ({product.reviewCount} نظر)
                  </span>
                </div>
              </div>
              <h1 className="text-3xl font-black text-gray-800 mb-4">{product.name}</h1>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-black text-gray-800 mb-4">ویژگی‌های محصول</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-reverse space-x-2"
              >
                <Phone className="w-6 h-6" />
                <span>استعلام قیمت و سفارش</span>
              </button>
              
              <div className="flex gap-4">
                <button className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>افزودن به علاقه‌مندی‌ها</span>
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

        {/* Specifications Table */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-black text-gray-800 mb-6">مشخصات فنی</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-bold text-gray-700">
                  {key === 'material' && 'جنس'}
                  {key === 'volume' && 'حجم'}
                  {key === 'weight' && 'وزن'}
                  {key === 'dimensions' && 'ابعاد'}
                  {key === 'color' && 'رنگ'}
                  {key === 'shape' && 'شکل'}
                </span>
                <span className="text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </div>
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