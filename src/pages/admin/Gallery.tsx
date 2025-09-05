import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { useGallery } from '../../hooks/useSupabase';
import { 
  Image, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Eye,
  Grid,
  List,
  Tag,
  Calendar,
  Download,
  Package
} from 'lucide-react';

const AdminGallery = () => {
  const navigate = useNavigate();
  const { gallery, loading, error, refetch } = useGallery();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');


  const categories = ['همه', 'شیشه و بطری', 'پمپ و اسپری', 'درپوش', 'اسانس', 'پلمپر'];

  const filteredItems = (gallery || []).filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'همه' || selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteImage = (id: number) => {
    if (confirm('آیا از حذف این تصویر اطمینان دارید؟')) {
      console.log('Image deleted:', id);
      alert('تصویر با موفقیت حذف شد!');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-800">مدیریت گالری</h1>
            <p className="text-gray-600 mt-2">مدیریت تصاویر و گالری سایت</p>
          </div>
          <button 
            onClick={() => navigate('/admin/gallery/add')}
            className="bg-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-reverse space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>افزودن تصویر جدید</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold">کل تصاویر</p>
                <p className="text-3xl font-black text-gray-800 mt-2">{gallery?.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Image className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold">کل بازدیدها</p>
                <p className="text-3xl font-black text-gray-800 mt-2">{gallery?.reduce((sum, item) => sum + (item.views || 0), 0) || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold">کل دانلودها</p>
                <p className="text-3xl font-black text-gray-800 mt-2">{gallery?.reduce((sum, item) => sum + (item.downloads || 0), 0) || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Download className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold">حجم کل</p>
                <p className="text-3xl font-black text-gray-800 mt-2">0</p>
                <p className="text-xs text-gray-500">مگابایت</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-amber-600" />
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
                placeholder="جستجو در تصاویر..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                    viewMode === 'grid' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-600'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-600'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-gray-800">
              گالری تصاویر ({filteredItems.length})
            </h2>
          </div>

          {loading ? (
            <LoadingSpinner message="در حال بارگذاری گالری..." />
          ) : error ? (
            <ErrorMessage message={error} onRetry={refetch} />
          ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={item.image_url || 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop'}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
                  <div className="flex items-center space-x-reverse space-x-2 text-sm text-gray-600 mb-3">
                    <Tag className="w-4 h-4" />
                    <span>{item.category}</span>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1 mb-4">
                    <div className="flex items-center space-x-reverse space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>آپلود: {new Date(item.created_at).toLocaleDateString('fa-IR')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-reverse space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{item.views || 0} بازدید</span>
                      </div>
                      <div className="flex items-center space-x-reverse space-x-1">
                        <Download className="w-3 h-3" />
                        <span>{item.downloads || 0} دانلود</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-reverse space-x-2">
                      <button 
                        onClick={() => window.open(item.image_url, '_blank')}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        title="مشاهده تصویر"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => navigate(`/admin/gallery/edit/${item.id}`)}
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                        title="ویرایش تصویر"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteImage(item.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="حذف تصویر"
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

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">تصویری یافت نشد</h3>
              <p className="text-gray-500 mb-4">لطفاً فیلترها را تغییر دهید یا تصویر جدید اضافه کنید</p>
              <button 
                onClick={() => navigate('/admin/gallery/add')}
                className="bg-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-600 transition-colors duration-300"
              >
                افزودن اولین تصویر
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminGallery;