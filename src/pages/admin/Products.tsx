        alert('خطا در حذف محصول');
      }
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const { error } = await productOperations.toggleFeatured(id, !currentFeatured);
      if (error) throw error;
      alert('وضعیت ویژه محصول تغییر کرد!');
      refetch();
    } catch (error) {
      console.error('Error toggling featured:', error);
      alert('خطا در تغییر وضعیت ویژه');
    }
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
  const toggleStatus = async (id: string, currentVisible: boolean) => {
    try {
      const { error } = await productOperations.toggleVisibility(id, !currentVisible);
      if (error) throw error;
      alert('وضعیت محصول تغییر کرد!');
      refetch();
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('خطا در تغییر وضعیت محصول');
    }
  Plus, 
  Edit, 
  const getStatusIcon = (visible: boolean) => {
    return visible ? <CheckCircle className="w-4 h-4 text-green-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />;
  TrendingUp,
  ShoppingCart,
  const getStatusColor = (visible: boolean) => {
    return visible ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200';
  };

  const getStatusText = (visible: boolean) => {
    return visible ? 'فعال' : 'غیرفعال';
  const { products, loading, error, refetch } = useAllProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

            className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-reverse space-x-2"
  const statuses = ['همه', 'فعال', 'غیرفعال'];
            <Plus className="w-5 h-5" />
            <span>افزودن محصول جدید</span>
          </button>
        </div>

        {loading ? (
          <LoadingSpinner message="در حال بارگذاری محصولات..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : (
          <>
        {loading ? (
          <LoadingSpinner message="در حال بارگذاری محصولات..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : (
          <>
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
                <p className="text-3xl font-black text-gray-800 mt-2">{products.filter(p => p.visible).length}</p>
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
                <p className="text-3xl font-black text-gray-800 mt-2">{products.filter(p => p.is_featured).length}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold">محصولات جدید</p>
                <p className="text-3xl font-black text-gray-800 mt-2">{products.filter(p => p.is_new).length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
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
                            src={product.image_url || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop'} 
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <div className="font-bold text-gray-800">{product.name}</div>
                            <div className="text-sm text-gray-600">کد: {product.id}</div>
                            <div className="flex items-center space-x-reverse space-x-2 mt-1">
                              {product.is_new && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">جدید</span>
                              )}
                              {product.is_featured && (
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
                        {product.price || 'استعلام قیمت'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span className="font-bold text-blue-600">
                          {product.min_order || 1} عدد
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleStatus(product.id, product.visible)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors flex items-center ${getStatusColor(product.visible)}`}
                        >
                          {getStatusIcon(product.visible)}
                          <span className="mr-1">{getStatusText(product.visible)}</span>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="text-sm text-gray-600">
                          {new Date(product.created_at).toLocaleDateString('fa-IR')}
                        </div>
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => toggleFeatured(product.id, product.is_featured)}
                            className={`p-2 rounded-lg transition-colors ${
                              product.is_featured 
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
                            onClick={() => toggleFeatured(product.id, product.is_featured)}
                      src={product.image_url || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop'}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                      {product.is_new && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full font-bold">جدید</span>
                      )}
                      {product.is_featured && (
                        <span className="px-2 py-1 bg-amber-500 text-white text-xs rounded-full font-bold">ویژه</span>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                    <div className="text-sm text-gray-600 space-y-1 mb-3">
                      <div>دسته: {product.category}</div>
                      <div>کد: {product.id}</div>
                      <div>قیمت: {product.price || 'استعلام قیمت'}</div>
                      <div>حداقل سفارش: {product.min_order || 1} عدد</div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold flex items-center ${getStatusColor(product.visible)}`}>
                        {getStatusIcon(product.visible)}
                        <span className="mr-1">{getStatusText(product.visible)}</span>
                      </span>
                      <div className="text-xs text-gray-500">
                        {new Date(product.created_at).toLocaleDateString('fa-IR')}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold flex items-center ${getStatusColor(product.visible)}`}>
                        {getStatusIcon(product.visible)}
                        <span className="mr-1">{getStatusText(product.visible)}</span>
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
                      <div className="text-xs text-gray-500">
                        {new Date(product.created_at).toLocaleDateString('fa-IR')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
  const filteredProducts = (products || []).filter(product => {
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                         product.id.toLowerCase().includes(searchTerm.toLowerCase());
              <p className="text-gray-500 mb-4">لطفاً فیلترها را تغییر دهید یا محصول جدید اضافه کنید</p>
    const matchesStatus = selectedStatus === 'همه' || selectedStatus === 'all' || 
                onClick={() => navigate('/admin/products/add')}
                         (selectedStatus === 'فعال' && product.visible) ||
              >
                         (selectedStatus === 'غیرفعال' && !product.visible);
                افزودن اولین محصول
              </button>
            </div>
  const handleDeleteProduct = async (id: string) => {
      try {
          )}
        const { error } = await productOperations.delete(id);
      </div>
        if (error) throw error;
    </AdminLayout>
        alert('محصول با موفقیت حذف شد!');
  );
        refetch();
};
      } catch (error) {

        console.error('Error deleting product:', error);
export default AdminProducts;
          </>
        )}