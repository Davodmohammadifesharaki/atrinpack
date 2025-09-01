import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { 
  Newspaper, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Eye,
  Calendar,
  Tag,
  Star,
  Grid,
  List,
  TrendingUp
} from 'lucide-react';

const AdminNews = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // نمونه داده‌های اخبار
  const news = [
    {
      id: 1,
      title: 'راه‌اندازی خط تولید جدید شیشه‌های کریستالی',
      category: 'اخبار تولید',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&h=200&fit=crop',
      status: 'منتشر شده',
      featured: true,
      date: '۱۵ دی ۱۴۰۳',
      views: 245,
      excerpt: 'آترین پک با راه‌اندازی خط تولید جدید، ظرفیت تولید شیشه‌های کریستالی را دو برابر کرده است.'
    },
    {
      id: 2,
      title: 'دریافت گواهینامه ISO 9001:2015',
      category: 'گواهینامه‌ها',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
      status: 'منتشر شده',
      featured: false,
      date: '۱۰ دی ۱۴۰۳',
      views: 189,
      excerpt: 'شرکت آترین پک موفق به دریافت گواهینامه بین‌المللی کیفیت ISO 9001:2015 شده است.'
    },
    {
      id: 3,
      title: 'حضور در نمایشگاه بین‌المللی بسته‌بندی',
      category: 'نمایشگاه‌ها',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&h=200&fit=crop',
      status: 'پیش‌نویس',
      featured: false,
      date: '۵ دی ۱۴۰۳',
      views: 0,
      excerpt: 'آترین پک در نمایشگاه بین‌المللی بسته‌بندی تهران حضور یافت و محصولات جدید خود را معرفی کرد.'
    },
    {
      id: 4,
      title: 'معرفی سری جدید پمپ‌های اسپری طلایی',
      category: 'محصولات جدید',
      image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=200&h=200&fit=crop',
      status: 'منتشر شده',
      featured: true,
      date: '۱ دی ۱۴۰۳',
      views: 312,
      excerpt: 'مجموعه جدید پمپ‌های اسپری با پوشش طلایی و کیفیت بالا به بازار عرضه شد.'
    },
    {
      id: 5,
      title: 'همکاری با برند معتبر فرانسوی',
      category: 'اخبار تولید',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop',
      status: 'منتشر شده',
      featured: false,
      date: '۲۵ آذر ۱۴۰۳',
      views: 156,
      excerpt: 'آترین پک قرارداد همکاری با یکی از برندهای معتبر فرانسوی در زمینه تولید بسته‌بندی لوکس امضا کرد.'
    }
  ];

  const categories = ['همه', 'اخبار تولید', 'گواهینامه‌ها', 'نمایشگاه‌ها', 'محصولات جدید', 'فناوری'];

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'همه' || selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteNews = (id: number) => {
    if (confirm('آیا از حذف این خبر اطمینان دارید؟')) {
      console.log('News deleted:', id);
      alert('خبر با موفقیت حذف شد!');
    }
  };

  const toggleFeatured = (id: number) => {
    console.log('Toggle featured for news:', id);
    alert('وضعیت ویژه خبر تغییر کرد!');
  };

  const toggleStatus = (id: number) => {
    console.log('Toggle status for news:', id);
    alert('وضعیت انتشار خبر تغییر کرد!');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-800">مدیریت اخبار</h1>
            <p className="text-gray-600 mt-2">مدیریت و ویرایش اخبار سایت</p>
          </div>
          <button 
            onClick={() => navigate('/admin/news/add')}
            className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-reverse space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>افزودن خبر جدید</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold">کل اخبار</p>
                <p className="text-3xl font-black text-gray-800 mt-2">{news.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold">منتشر شده</p>
                <p className="text-3xl font-black text-gray-800 mt-2">{news.filter(n => n.status === 'منتشر شده').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold">اخبار ویژه</p>
                <p className="text-3xl font-black text-gray-800 mt-2">{news.filter(n => n.featured).length}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bold">کل بازدیدها</p>
                <p className="text-3xl font-black text-gray-800 mt-2">{news.reduce((sum, n) => sum + n.views, 0)}</p>
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
                placeholder="جستجو در اخبار..."
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

        {/* News List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-gray-800">
              لیست اخبار ({filteredNews.length})
            </h2>
          </div>

          {viewMode === 'list' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">خبر</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">دسته‌بندی</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">وضعیت</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">بازدید</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">تاریخ</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredNews.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-reverse space-x-3">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <div className="font-bold text-gray-800">{item.title}</div>
                            <div className="text-sm text-gray-600 line-clamp-2">{item.excerpt}</div>
                            {item.featured && (
                              <span className="inline-flex items-center px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-bold mt-1">
                                <Star className="w-3 h-3 ml-1" />
                                ویژه
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleStatus(item.id)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                            item.status === 'منتشر شده' 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          }`}
                        >
                          {item.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-bold">
                        {item.views.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.date}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-reverse space-x-2">
                          <button 
                            onClick={() => window.open(`/news/${item.id}`, '_blank')}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            title="مشاهده خبر"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => toggleFeatured(item.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              item.featured 
                                ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            title="تغییر وضعیت ویژه"
                          >
                            <Star className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => navigate(`/admin/news/edit/${item.id}`)}
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                            title="ویرایش خبر"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteNews(item.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="حذف خبر"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        item.status === 'منتشر شده' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                      }`}>
                        {item.status}
                      </span>
                      {item.featured && (
                        <span className="px-2 py-1 bg-amber-500 text-white text-xs rounded-full font-bold">ویژه</span>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{item.title}</h3>
                    <div className="text-sm text-gray-600 space-y-1 mb-3">
                      <div>دسته: {item.category}</div>
                      <div>تاریخ: {item.date}</div>
                      <div>بازدید: {item.views}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-reverse space-x-1">
                        <button 
                          onClick={() => window.open(`/news/${item.id}`, '_blank')}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => navigate(`/admin/news/edit/${item.id}`)}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteNews(item.id)}
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

          {filteredNews.length === 0 && (
            <div className="text-center py-16">
              <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">خبری یافت نشد</h3>
              <p className="text-gray-500">لطفاً فیلترها را تغییر دهید یا خبر جدید اضافه کنید</p>
              <button 
                onClick={() => navigate('/admin/news/add')}
                className="mt-4 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors duration-300"
              >
                افزودن اولین خبر
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNews;