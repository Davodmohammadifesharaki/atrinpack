import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useNewsItem, useNews } from '../hooks/useSupabase';
import { Calendar, Tag, Share2, ArrowRight } from 'lucide-react';

const NewsDetail = () => {
  const { id } = useParams();
  const { news, loading, error } = useNewsItem(id || '');
  const { news: allNews } = useNews();

  // اخبار مرتبط - فیلتر بر اساس دسته‌بندی مشابه
  const relatedNews = allNews
    .filter(n => n.id !== id && n.category === news?.category)
    .slice(0, 2);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Header />
        <LoadingSpinner message="در حال بارگذاری خبر..." />
        <Footer />
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Header />
        <div className="container mx-auto px-6 py-12">
          <ErrorMessage message={error || 'خبر یافت نشد'} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      <div className="container mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-reverse space-x-2 text-gray-600 mb-8">
          <span>خانه</span>
          <ArrowRight className="w-4 h-4" />
          <span>اخبار</span>
          <ArrowRight className="w-4 h-4" />
          <span className="text-gray-800 font-bold">جزئیات خبر</span>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <img 
              src={news.image_url || 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=400&fit=crop'}
              alt={news.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <h1 className="text-3xl font-black text-gray-800 mb-4">
                {news.title}
              </h1>
              
              <div className="flex items-center space-x-reverse space-x-6 text-gray-600 mb-6">
                <div className="flex items-center space-x-reverse space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(news.created_at).toLocaleDateString('fa-IR')}</span>
                </div>
                
                {news.category && (
                  <div className="flex items-center space-x-reverse space-x-2">
                    <Tag className="w-5 h-5" />
                    <span>{news.category}</span>
                  </div>
                )}
                
                <button className="flex items-center space-x-reverse space-x-2 hover:text-blue-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>اشتراک‌گذاری</span>
                </button>
              </div>
              
              {news.excerpt && (
                <p className="text-lg text-gray-700 leading-relaxed">
                  {news.excerpt}
                </p>
              )}
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>

          {/* Related News */}
          {relatedNews.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-black text-gray-800 mb-8">اخبار مرتبط</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedNews.map((relatedNewsItem) => (
                  <div key={relatedNewsItem.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <img 
                      src={relatedNewsItem.image_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop'}
                      alt={relatedNewsItem.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-black text-gray-800 mb-2">
                        {relatedNewsItem.title}
                      </h3>
                      {relatedNewsItem.excerpt && (
                        <p className="text-gray-600 text-sm">
                          {relatedNewsItem.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewsDetail;