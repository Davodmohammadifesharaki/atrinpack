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
  List,
  TrendingUp,
  ShoppingCart,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const AdminProducts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
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
      code: 'ATR-001',
      views: 245,
      sales: 89
    },
    {
      id: 2,
      name: 'پمپ اسپری طلایی لوکس',
      category: 'پمپ و اسپری',
      image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=200&h=200&fit=crop',
      price: '15,000 تومان',
      stock: 85,
      status: 'فعال',
      isNew: false,
      isFeatured: true,
      code: 'ATR-002',
      views: 189,
      sales: 67
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
      code: 'ATR-003',
      views: 156,
      sales: 34
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
      code: 'ATR-004',
      views: 312,
      sales: 123
    },
    {
      id: 5,
      name: 'بطری شیشه‌ای کلاسیک 100ml',
      category: 'شیشه و بطری',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=200&h=200&fit=crop',
      price: '18,000 تومان',
      stock: 0,
      status: 'ناموجود',
      isNew: false,
      isFeatured: false,
      code: 'ATR-005',
      views: 98,
      sales: 12
    }
  ];

  const categories = ['همه', 'شیشه و بطری', 'پمپ و اسپری', 'درپوش', 'اسانس', 'پلمپر'];
  const statuses = ['همه', 'فعال', 'غیرفعال', 'ناموجود'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'همه' || selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'همه' || selectedStatus === 'all' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDeleteProduct = (id: number) => {
    if (confirm('آیا از حذف این محصول اطمینان دارید؟')) {
      console.log('Product deleted:', id);
      alert('محصول با موفقیت حذف شد!');
    }
  };

  const toggleFeatured = (id: number) => {
    console.log('Toggle featured for product:', id);
    alert('وضعیت ویژه محصول تغییر کرد!');
  };

  const toggleStatus = (id: number) => {
    console.log('Toggle status for product:', id);
    alert('وضعیت محصول تغییر کرد!');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'فعال': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'غیرفعال': return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'ناموجود': return <AlertCircle className="w-4 h-4 text-amber-600" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'فعال': return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'غیرفعال': return 'bg-red-100 text-red-700 hover:bg-red-200';
      case 'ناموجود': return 'bg-amber-100 text-amber-700 hover:bg-amber-200';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
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
            className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-reverse space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>افزودن محصول جدید</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold">کل محصولات</p>
                <p className="text-3xl font-black text-gray-800 mt-2">{products.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold">محصولات فعال</p>
                <p className="text-3xl font-black text-gray-800 mt-2">{products.filter(p => p.status === 'فعال').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold">محصولات ویژه</p>
                <p className="text-3xl font-black text-gray-800 mt-2">{products.filter(p => p.isFeatured).length}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold">کل فروش</p>
                <p className="text-3xl font-black text-gray-800 mt-2">{products.reduce((sum, p) => sum + p.sales, 0)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
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

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status === 'همه' ? 'all' : status}>
                    {status}
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
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">آمار</th>
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
                            className="w-16 h-16 object-cover rounded-lg"
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
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-bold">
                        {product.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span className={`font-bold ${product.stock === 0 ? 'text-red-600' : product.stock < 50 ? 'text-amber-600' : 'text-green-600'}`}>
                          {product.stock} عدد
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleStatus(product.id)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors flex items-center ${getStatusColor(product.status)}`}
                        >
                          {getStatusIcon(product.status)}
                          <span className="mr-1">{product.status}</span>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-reverse space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{product.views}</span>
                          </div>
                          <div className="flex items-center space-x-reverse space-x-1">
                            <ShoppingCart className="w-3 h-3" />
                            <span>{product.sales}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-reverse space-x-2">
                          <button 
                            onClick={() => window.open(`/product/${product.id}`, '_blank')}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            title="مشاهده محصول"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => toggleFeatured(product.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              product.isFeatured 
                                ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            title="تغییر وضعیت ویژه"
                          >
                            <Star className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                            title="ویرایش محصول"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="حذف محصول"
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
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                    <div className="text-sm text-gray-600 space-y-1 mb-3">
                      <div>دسته: {product.category}</div>
                      <div>کد: {product.code}</div>
                      <div>قیمت: {product.price}</div>
                      <div className={`font-bold ${product.stock === 0 ? 'text-red-600' : product.stock < 50 ? 'text-amber-600' : 'text-green-600'}`}>
                        موجودی: {product.stock} عدد
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold flex items-center ${getStatusColor(product.status)}`}>
                        {getStatusIcon(product.status)}
                        <span className="mr-1">{product.status}</span>
                      </span>
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>{product.views} بازدید</div>
                        <div>{product.sales} فروش</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-reverse space-x-1">
                        <button 
                          onClick={() => window.open(`/product/${product.id}`, '_blank')}
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
              <p className="text-gray-500 mb-4">لطفاً فیلترها را تغییر دهید یا محصول جدید اضافه کنید</p>
              <button 
                onClick={() => navigate('/admin/products/add')}
                className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors duration-300"
              >
                افزودن اولین محصول
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;