import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ContactModal from '../components/ContactModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useProducts } from '../hooks/useSupabase';
import { Search, Filter, Grid, List, X } from 'lucide-react';

const Products = () => {
  const { products: allProducts, loading, error, refetch } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    category: 'all',
    usage: 'all',
    shape: 'all',
    volume: 'all',
    color: 'all',
    material: 'all'
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // دسته‌بندی‌ها و فیلترها
  const filterOptions = {
    categories: [
      { id: 'all', name: 'همه محصولات' },
      { id: 'bottle', name: 'شیشه و بطری' },
      { id: 'pump', name: 'پمپ و اسپری' },
      { id: 'cap', name: 'درپوش' },
      { id: 'essence', name: 'اسانس' },
      { id: 'sealer', name: 'پلمپر' }
    ],
    usages: [
      { id: 'all', name: 'همه کاربردها' },
      { id: 'perfume', name: 'عطر' },
      { id: 'skincare', name: 'مراقبت پوست' },
      { id: 'devices', name: 'دستگاه‌ها' },
      { id: 'essence', name: 'اسانس و رایحه‌ها' }
    ],
    shapes: [
      { id: 'all', name: 'همه اشکال' },
      { id: 'square', name: 'مربع' },
      { id: 'circle', name: 'دایره' },
      { id: 'oval', name: 'بیضی' },
      { id: 'cylinder', name: 'استوانه' },
      { id: 'triangle', name: 'مثلث' },
      { id: 'drop', name: 'قطره' },
      { id: 'cube', name: 'مکعب' },
      { id: 'diamond', name: 'لوزی' },
      { id: 'heart', name: 'قلب' },
      { id: 'star', name: 'ستاره' },
      { id: 'custom', name: 'سفارشی' }
    ],
    volumes: [
      { id: 'all', name: 'همه حجم‌ها' },
      { id: '18ml', name: '۱۸ میلی‌لیتر' },
      { id: '25ml', name: '۲۵ میلی‌لیتر' },
      { id: '30ml', name: '۳۰ میلی‌لیتر' },
      { id: '40ml', name: '۴۰ میلی‌لیتر' },
      { id: '50ml', name: '۵۰ میلی‌لیتر' },
      { id: '60ml', name: '۶۰ میلی‌لیتر' },
      { id: '75ml', name: '۷۵ میلی‌لیتر' },
      { id: '100ml', name: '۱۰۰ میلی‌لیتر' },
      { id: '200ml', name: '۲۰۰ میلی‌لیتر' },
      { id: '500ml', name: '۵۰۰ میلی‌لیتر' }
    ],
    colors: [
      { id: 'all', name: 'همه رنگ‌ها' },
      { id: 'clear', name: 'شفاف' },
      { id: 'crystal', name: 'کریستالی' },
      { id: 'black', name: 'مشکی' },
      { id: 'white', name: 'سفید' },
      { id: 'gold', name: 'طلایی' },
      { id: 'silver', name: 'نقره‌ای' },
      { id: 'blue', name: 'آبی' },
      { id: 'green', name: 'سبز' },
      { id: 'red', name: 'قرمز' },
      { id: 'pink', name: 'صورتی' },
      { id: 'purple', name: 'بنفش' },
      { id: 'yellow', name: 'زرد' },
      { id: 'brown', name: 'قهوه‌ای' },
      { id: 'orange', name: 'نارنجی' },
      { id: 'gray', name: 'خاکستری' }
    ],
    materials: [
      { id: 'all', name: 'همه جنس‌ها' },
      { id: 'glass', name: 'شیشه' },
      { id: 'crystal', name: 'کریستال' },
      { id: 'pet', name: 'پلاستیک PET' },
      { id: 'acrylic', name: 'آکریلیک' },
      { id: 'wood', name: 'چوب' },
      { id: 'metal', name: 'فلز' },
      { id: 'ceramic', name: 'سرامیک' },
      { id: 'bamboo', name: 'بامبو' },
      { id: 'stone', name: 'سنگ' },
      { id: 'composite', name: 'کامپوزیت' }
    ]
  };

  // فیلتر کردن محصولات
  const filteredProducts = (allProducts || []).filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedFilters.category === 'all' || product.category.includes(selectedFilters.category);
    const matchesUsage = selectedFilters.usage === 'all' || product.usage === selectedFilters.usage;
    const matchesShape = selectedFilters.shape === 'all' || product.shape === selectedFilters.shape;
    const matchesVolume = selectedFilters.volume === 'all' || product.volume === selectedFilters.volume;
    const matchesColor = selectedFilters.color === 'all' || product.color === selectedFilters.color;
    const matchesMaterial = selectedFilters.material === 'all' || product.material === selectedFilters.material;
    
    return matchesSearch && matchesCategory && matchesUsage && matchesShape && matchesVolume && matchesColor && matchesMaterial;
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: value
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      category: 'all',
      usage: 'all',
      shape: 'all',
      volume: 'all',
      color: 'all',
      material: 'all'
    });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-black mb-4">محصولات آترین پک</h1>
            <p className="text-xl text-blue-100">مجموعه کاملی از بهترین محصولات بسته‌بندی لوکس</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* فیلترهای عمودی (سایدبار راست) */}
          {loading ? (
            <div className="lg:col-span-4">
              <LoadingSpinner message="در حال بارگذاری محصولات..." />
            </div>
          ) : error ? (
            <div className="lg:col-span-4">
              <ErrorMessage message={error} onRetry={refetch} />
            </div>
          ) : (
            <>
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-gray-800 flex items-center">
                  <Filter className="w-6 h-6 ml-2 text-blue-500" />
                  فیلترها
                </h3>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-600 hover:text-red-800 font-bold flex items-center space-x-reverse space-x-1"
                >
                  <X className="w-4 h-4" />
                  <span>پاک کردن</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* جستجو */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">جستجو</label>
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="جستجو در محصولات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* نوع محصول */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">نوع محصول</label>
                  <select
                    value={selectedFilters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {filterOptions.categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* کاربرد */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">کاربرد</label>
                  <select
                    value={selectedFilters.usage}
                    onChange={(e) => handleFilterChange('usage', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {filterOptions.usages.map(usage => (
                      <option key={usage.id} value={usage.id}>
                        {usage.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* شکل شیشه */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">شکل شیشه</label>
                  <select
                    value={selectedFilters.shape}
                    onChange={(e) => handleFilterChange('shape', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {filterOptions.shapes.map(shape => (
                      <option key={shape.id} value={shape.id}>
                        {shape.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* حجم */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">حجم</label>
                  <select
                    value={selectedFilters.volume}
                    onChange={(e) => handleFilterChange('volume', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {filterOptions.volumes.map(volume => (
                      <option key={volume.id} value={volume.id}>
                        {volume.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* رنگ */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">رنگ</label>
                  <select
                    value={selectedFilters.color}
                    onChange={(e) => handleFilterChange('color', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {filterOptions.colors.map(color => (
                      <option key={color.id} value={color.id}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* جنس */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">جنس</label>
                  <select
                    value={selectedFilters.material}
                    onChange={(e) => handleFilterChange('material', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {filterOptions.materials.map(material => (
                      <option key={material.id} value={material.id}>
                        {material.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* محصولات */}
          <div className="lg:col-span-3">
            {/* نوار ابزار */}
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8 bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  نمایش {filteredProducts.length} محصول از {(allProducts || []).length} محصول
                </span>
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* گرید محصولات */}
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <div key={product.id} className="group">
                  <ProductCard {...product} />
                  {/* دکمه‌های هاور */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4 flex gap-3">
                    <button 
                      onClick={() => window.location.href = `/product/${product.id}`}
                      className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center space-x-reverse space-x-2"
                    >
                      <span>مشاهده</span>
                    </button>
                    <button 
                      onClick={() => setIsContactModalOpen(true)}
                      className="flex-1 bg-amber-500 text-white py-2 px-4 rounded-xl font-bold hover:bg-amber-600 transition-colors duration-300 flex items-center justify-center space-x-reverse space-x-2"
                    >
                      <span>استعلام قیمت</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">محصولی یافت نشد</h3>
                <p className="text-gray-500 mb-4">لطفاً فیلترها را تغییر دهید یا کلمات کلیدی دیگری امتحان کنید</p>
                <button
                  onClick={clearAllFilters}
                  className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300"
                >
                  پاک کردن فیلترها
                </button>
              </div>
            )}
          </div>
            </>
          )}
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

export default Products;