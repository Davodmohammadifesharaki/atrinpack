import React, { useState } from 'react';
import CustomerLayout from '../../components/CustomerLayout';
import { 
  Heart, 
  Search, 
  Filter,
  Eye,
  ShoppingCart,
  Trash2,
  Package
} from 'lucide-react';

const CustomerWishlist = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const wishlistItems = [
    {
      id: 1,
      name: 'بطری عطر کریستالی 50ml',
      category: 'شیشه و بطری',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop',
      price: 'استعلام قیمت',
      addedDate: '۱۰ دی ۱۴۰۳',
      inStock: true
    },
    {
      id: 2,
      name: 'پمپ اسپری طلایی لوکس',
      category: 'پمپ و اسپری',
      image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=300&h=300&fit=crop',
      price: 'استعلام قیمت',
      addedDate: '۵ دی ۱۴۰۳',
      inStock: true
    },
    {
      id: 3,
      name: 'درپوش چوبی دست‌ساز',
      category: 'درپوش',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
      price: 'استعلام قیمت',
      addedDate: '۱ دی ۱۴۰۳',
      inStock: false
    }
  ];

  const categories = ['همه', 'شیشه و بطری', 'پمپ و اسپری', 'درپوش', 'اسانس', 'پلمپر'];

  const filteredItems = wishlistItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'همه' || selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRemoveFromWishlist = (id: number) => {
    if (confirm('آیا از حذف این محصول از علاقه‌مندی‌ها اطمینان دارید؟')) {
      console.log('Removed from wishlist:', id);
      alert('محصول از علاقه‌مندی‌ها حذف شد!');
    }
  };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-800">علاقه‌مندی‌ها</h1>
            <p className="text-gray-600 mt-2">محصولات مورد علاقه شما</p>
          </div>
          <div className="text-left">
            <p className="text-3xl font-black text-red-600">{wishlistItems.length}</p>
            <p className="text-gray-600">محصول</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="جستجو در علاقه‌مندی‌ها..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {categories.map(category => (
                  <option key={category} value={category === 'همه' ? 'all' : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">ناموجود</span>
                  </div>
                )}
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="absolute top-4 left-4 bg-white bg-opacity-90 text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors duration-300"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-2">
                  <span className="text-blue-600 text-sm font-bold">{item.category}</span>
                </div>
                <h3 className="text-lg font-black text-gray-800 mb-3 line-clamp-2">{item.name}</h3>
                <div className="text-xl font-black text-gray-800 mb-4">{item.price}</div>
                
                <div className="text-sm text-gray-500 mb-4">
                  اضافه شده در {item.addedDate}
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => window.location.href = `/product/${item.id}`}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center space-x-reverse space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>مشاهده</span>
                  </button>
                  <button 
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">علاقه‌مندی یافت نشد</h3>
            <p className="text-gray-500 mb-6">هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید</p>
            <button 
              onClick={() => window.location.href = '/products'}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300"
            >
              مشاهده محصولات
            </button>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default CustomerWishlist;