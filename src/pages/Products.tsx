import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Search, Filter, Grid, List } from 'lucide-react';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: 'all', name: 'همه محصولات' },
    { id: 'perfume', name: 'شیشه و بطری' },
    { id: 'pump', name: 'پمپ و اسپری' },
    { id: 'cap', name: 'درپوش' },
    { id: 'essence', name: 'اسانس' },
    { id: 'sealer', name: 'پلمپر' }
  ];

  const products = [
    {
      id: 1,
      name: 'بطری عطر کریستالی 50ml',
      category: 'شیشه و بطری',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
      price: 'استعلام قیمت',
      isNew: true,
      isFeatured: true
    },
    {
      id: 2,
      name: 'پمپ اسپری طلایی',
      category: 'پمپ و اسپری',
      image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=400&fit=crop',
      price: 'استعلام قیمت',
      isFeatured: true
    },
    {
      id: 3,
      name: 'درپوش هنری نقره‌ای',
      category: 'درپوش',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
      price: 'استعلام قیمت',
      isNew: true
    },
    {
      id: 4,
      name: 'اسانس گل رز طبیعی',
      category: 'اسانس',
      image: 'https://images.unsplash.com/photo-1588159343745-445ae0b16383?w=400&h=400&fit=crop',
      price: 'استعلام قیمت',
      isFeatured: true
    },
    {
      id: 5,
      name: 'بطری شیشه‌ای 100ml',
      category: 'شیشه و بطری',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop',
      price: 'استعلام قیمت'
    },
    {
      id: 6,
      name: 'پمپ اسپری نقره‌ای',
      category: 'پمپ و اسپری',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      price: 'استعلام قیمت'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === categories.find(cat => cat.id === selectedCategory)?.name;
    return matchesSearch && matchesCategory;
  });

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

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="جستجو در محصولات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
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
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <p className="text-gray-600">
              نمایش {filteredProducts.length} محصول از {products.length} محصول
            </p>
          </div>

          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">محصولی یافت نشد</h3>
              <p className="text-gray-500">لطفاً کلمات کلیدی دیگری امتحان کنید</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;