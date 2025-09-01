import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useNews } from '../hooks/useSupabase';
import { Search, Filter, Calendar } from 'lucide-react';

const News = () => {
  const { news, loading, error, refetch } = useNews();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'همه اخبار' },
    { id: 'production', name: 'اخبار تولید' },
    { id: 'certificates', name: 'گواهینامه‌ها' },
    { id: 'exhibitions', name: 'نمایشگاه‌ها' },
    { id: 'new-products', name: 'محصولات جدید' },
    { id: 'technology', name: 'فناوری' }
  ];

  const newsData = [
    {
      id: 1,
      title: 'راه‌اندازی خط تولید جدید شیشه‌های کریستالی',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
      date: '۱۵ دی ۱۴۰۳',
      category: 'اخبار تولید',
      excerpt: 'آترین پک با راه‌اندازی خط تولید جدید، ظرفیت تولید شیشه‌های کریستالی را دو برابر کرده است.',
      readTime: '۳ دقیقه مطالعه'
    },
    {
      id: 2,
      title: 'دریافت گواهینامه ISO 9001:2015',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      date: '۱۰ دی ۱۴۰۳',
      category: 'گواهینامه‌ها',
      excerpt: 'شرکت آترین پک موفق به دریافت گواهینامه بین‌المللی کیفیت ISO 9001:2015 شده است.',
      readTime: '۲ دقیقه مطالعه'
    },
    {
      id: 3,
      title: 'حضور در نمایشگاه بین‌المللی بسته‌بندی',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      date: '۵ دی ۱۴۰۳',
      category: 'نمایشگاه‌ها',
      excerpt: 'آترین پک در نمایشگاه بین‌المللی بسته‌بندی تهران حضور یافت و محصولات جدید خود را معرفی کرد.',
      readTime: '۴ دقیقه مطالعه'
    },
    {
      id: 4,
      title: 'معرفی سری جدید پمپ‌های اسپری طلایی',
      image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=300&fit=crop',
      date: '۱ دی ۱۴۰۳',
      category: 'محصولات جدید',
      excerpt: 'مجموعه جدید پمپ‌های اسپری با پوشش طلایی و کیفیت بالا به بازار عرضه شد.',
      readTime: '۳ دقیقه مطالعه'
    },
    {
      id: 5,
      title: 'همکاری با برند معتبر فرانسوی',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      date: '۲۵ آذر ۱۴۰۳',
      category: 'اخبار تولید',
      excerpt: 'آترین پک قرارداد همکاری با یکی از برندهای معتبر فرانسوی در زمینه تولید بسته‌بندی لوکس امضا کرد.',
      readTime: '۵ دقیقه مطالعه'
    }
  ];

  const filteredNews = newsData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.excerpt && item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || 
                           item.category === categories.find(cat => cat.id === selectedCategory)?.name;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-black mb-4">اخبار آترین پک</h1>
            <p className="text-xl text-red-100">آخرین اخبار و رویدادهای شرکت</p>
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
                placeholder="جستجو در اخبار..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {loading ? (
        <LoadingSpinner message="در حال بارگذاری اخبار..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : filteredNews.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-gray-800 mb-2">خبر ویژه</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <img 
                  src={filteredNews[0].image}
                  alt={filteredNews[0].title}
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  ویژه
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-reverse space-x-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-bold">{filteredNews[0].date}</span>
                  <span className="text-sm">•</span>
                  <span className="text-sm">{filteredNews[0].category}</span>
                </div>
                
                <h2 className="text-3xl font-black text-gray-800 leading-tight">
                  {filteredNews[0].title}
                </h2>
                
                <p className="text-gray-600 text-lg leading-relaxed">
                  {filteredNews[0].excerpt}
                </p>
                
                <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105">
                  ادامه مطلب
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-800">همه اخبار</h2>
              <p className="text-gray-600">
                نمایش {filteredNews.length} خبر از {newsData.length} خبر
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.slice(1).map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">خبری یافت نشد</h3>
              <p className="text-gray-500">لطفاً کلمات کلیدی دیگری امتحان کنید</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;