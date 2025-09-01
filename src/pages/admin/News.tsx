import React, { useState } from 'react';
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
  Tag
} from 'lucide-react';

const AdminNews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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
      views: 245
    },
    {
      id: 2,
      title: 'دریافت گواهینامه ISO 9001:2015',
      category: 'گواهینامه‌ها',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
      status: 'منتشر شده',
      featured: false,
      date: '۱۰ دی ۱۴۰۳',
      views: 189
    },
    {
      id: 3,
      title: 'حضور در نمایشگاه بین‌المللی بسته‌بندی',
      category: 'نمایشگاه‌ها',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&h=200&fit=crop',
      status: 'پیش‌نویس',
      featured: false,
      date: '۵ دی ۱۴۰۳',
      views: 0
    }
  ];

  const categories = ['همه', 'اخبار تولید', 'گواهینامه‌ها', 'نمایشگاه‌ها', 'محصولات جدید', 'فناوری'];

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-800">مدیریت اخبار</h1>
            <p className="text-gray-600 mt-2">مدیریت و ویرایش اخبار سایت</p>
          </div>
          <button className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors duration-300 flex items-center space-x-reverse space-x-2">
            <Plus className="w-5 h-5" />
            <span>افزودن خبر</span>
          </button>
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

          <div className="space-y-4">
            {filteredNews.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                        <div className="flex items-center space-x-reverse space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-reverse space-x-1">
                            <Tag className="w-4 h-4" />
                            <span>{item.category}</span>
                          </div>
                          <div className="flex items-center space-x-reverse space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{item.date}</span>
                          </div>
                          <div className="flex items-center space-x-reverse space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{item.views} بازدید</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-reverse space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.status === 'منتشر شده' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {item.status}
                          </span>
                          {item.featured && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 flex items-center">
                              <Star className="w-3 h-3 ml-1" />
                              ویژه
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-reverse space-x-2">
                        <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-16">
              <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">خبری یافت نشد</h3>
              <p className="text-gray-500">لطفاً فیلترها را تغییر دهید</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNews;