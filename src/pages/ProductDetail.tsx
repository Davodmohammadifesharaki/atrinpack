import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';
import ProductCard from '../components/ProductCard';
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
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('شفاف');
  const [selectedVolume, setSelectedVolume] = useState('50ml');

  // اطلاعات محصول
  const product = {
    id: 1,
    name: 'بطری عطر کریستالی 50ml',
    category: 'شیشه و بطری',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop'
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
      shape: 'استوانه‌ای',
      minOrder: '100 عدد',
      price: 'استعلام قیمت'
    },
    availableColors: [
      { id: 'clear', name: 'شفاف', hex: '#ffffff' },
      { id: 'blue', name: 'آبی', hex: '#3b82f6' },
      { id: 'green', name: 'سبز', hex: '#10b981' },
      { id: 'gold', name: 'طلایی', hex: '#f59e0b' },
      { id: 'silver', name: 'نقره‌ای', hex: '#6b7280' },
      { id: 'black', name: 'مشکی', hex: '#000000' },
      { id: 'red', name: 'قرمز', hex: '#ef4444' },
      { id: 'purple', name: 'بنفش', hex: '#8b5cf6' }
    ],
    availableVolumes: ['18ml', '25ml', '30ml', '50ml', '75ml', '100ml'],
    isNew: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 24
  };

  // محصولات مرتبط - گرید ۴×۴
  const relatedProducts = [
    {
      id: 2,
      name: 'بطری عطر کریستالی 30ml',
      category: 'شیشه و بطری',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop',
      price: 'استعلام قیمت'
    },
    {
      id: 3,
      name: 'بطری عطر کریستالی 75ml',
      category: 'شیشه و بطری',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      price: 'استعلام قیمت'
    },
    {
      id: 4,
      name: 'بطری عطر کریستالی 100ml',
      category: 'شیشه و بطری',
      image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=400&fit=crop',
      price: 'استعلام قیمت'
    },
    {
      id: 5,
      name: 'پمپ اسپری طلایی',
      category: 'پمپ و اسپری',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
      price: 'استعلام قیمت'
    }
  ];

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
            
            <div className="flex gap-4 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
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

            {/* باکس گرافیکی جزئیات */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-amber-200">
              <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center">
                <Eye className="w-6 h-6 ml-2 text-amber-500" />
                جزئیات محصول
              </h3>
              
              {/* انتخاب رنگ */}
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-3">رنگ:</label>
                <div className="flex flex-wrap gap-3">
                  {product.availableColors.map((color) => (
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

              {/* انتخاب حجم */}
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-3">حجم:</label>
                <div className="flex flex-wrap gap-3">
                  {product.availableVolumes.map((volume) => (
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

              {/* مشخصات */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-bold text-gray-700 text-sm">
                      {key === 'material' && 'جنس'}
                      {key === 'volume' && 'حجم'}
                      {key === 'weight' && 'وزن'}
                      {key === 'dimensions' && 'ابعاد'}
                      {key === 'color' && 'رنگ'}
                      {key === 'shape' && 'شکل'}
                      {key === 'minOrder' && 'حداقل سفارش'}
                      {key === 'price' && 'قیمت'}
                    </span>
                    <span className="text-gray-600 text-sm">{value}</span>
                  </div>
                ))}
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
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-800 mb-4">محصولات مرتبط</h2>
            <p className="text-xl text-gray-600">محصولات مشابه که ممکن است علاقه‌مند باشید</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} {...relatedProduct} />
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