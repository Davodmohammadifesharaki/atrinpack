import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Eye,
  Star,
  Grid,
  List
} from 'lucide-react';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // نمونه داده‌های محصولات
  const products = [
    {
      id: 1,
      name: 'بطری عطر کریستالی 50ml',
      category: 'شیشه و بطری',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop',
      price: '25,000 تومان',
      stock: 120,
      status: 'فعال',
      isNew: true,
      isFeatured: true,
      code: 'ATR-001'
    },
    {
      id: 2,
      name: 'پمپ اسپری طلایی',
      category: 'پمپ و اسپری',
      image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=200&h=200&fit=crop',
      price: '15,000 تومان',
      stock: 85,
      status: 'فعال',
      isNew: false,
      isFeatured: true,
      code: 'ATR-002'
    },
    {
      id: 3,
      name: 'درپوش چوبی دست‌ساز',
      category: 'درپوش',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop',
      price: '12,000 تومان',
      stock: 200,
      status: 'غیرفعال',
      isNew: true,
      isFeatured: false,
      code: 'ATR-003'
    },
    {
      id: 4,
      name: 'اسانس گل رز طبیعی',
      category: 'اسانس',
      image: 'https://images.unsplash.com/photo-1588159343745-445ae0b16383?w=200&h=200&fit=crop',
      price: '35,000 تومان',
      stock: 45,
      status: 'فعال',
      isNew: true,
      isFeatured: true,
      code: 'ATR-004'
    }
  ];

  const categories = ['همه', 'شیشه و بطری', 'پمپ و اسپری', 'درپوش', 'اسانس', 'پلمپر'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           product.category === categories.find(cat => cat === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = (id: number) => {
    if (confirm('آیا از حذف این محصول اطمینان دارید؟')) {
      console.log('Product deleted:', id);
      alert('محصول با موفقیت حذف شد!');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-800">مدیریت محصولات</h1>
            <p className="text-gray-600 mt-2">مدیریت و ویرایش محصولات سایت</p>
          </div>
          <button 
            onClick={() => navigate('/admin/products/add')}
            className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors duration-300 flex items-center space-x-reverse space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>افزودن محصول</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="جستجو در محصولات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {categories.map(category => (
                  <option key={category} value={category === 'همه' ? 'all' : category}>
                    {category}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-green-600' : 'text-gray-600'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-green-600' : 'text-gray-600'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-gray-800">
              لیست محصولات ({filteredProducts.length})
            </h2>
          </div>

          {viewMode === 'list' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">محصول</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">دسته‌بندی</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">قیمت</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">موجودی</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">وضعیت</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-reverse space-x-3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <div className="font-bold text-gray-800">{product.name}</div>
                            <div className="text-sm text-gray-600">کد: {product.code}</div>
                            <div className="flex items-center space-x-reverse space-x-2 mt-1">
                              {product.isNew && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">جدید</span>
                              )}
                              {product.isFeatured && (
                                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-bold flex items-center">
                                  <Star className="w-3 h-3 ml-1" />
                                  ویژه
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-bold">
                        {product.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {product.stock} عدد
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          product.status === 'فعال' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-reverse space-x-2">
                          <button 
                            onClick={() => navigate(`/product/${product.id}`)}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                      {product.isNew && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full font-bold">جدید</span>
                      )}
                      {product.isFeatured && (
                        <span className="px-2 py-1 bg-amber-500 text-white text-xs rounded-full font-bold">ویژه</span>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>دسته: {product.category}</div>
                      <div>کد: {product.code}</div>
                      <div>قیمت: {product.price}</div>
                      <div>موجودی: {product.stock} عدد</div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        product.status === 'فعال' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.status}
                      </span>

                      <div className="flex items-center space-x-reverse space-x-1">
                        <button 
                          onClick={() => navigate(`/product/${product.id}`)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">محصولی یافت نشد</h3>
              <p className="text-gray-500">لطفاً فیلترها را تغییر دهید</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;