
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Tag, 
  ArrowLeft,
  Eye,
  Share2
} from 'lucide-react';

interface News {
  id: number;
  title: string;
  image: string;
  date: string;
  category: string;
  excerpt?: string;
  readTime?: string;
}

interface NewsCardProps {
  news: News;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={news.image} 
          alt={news.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
            <Tag className="w-4 h-4 ml-1" />
            {news.category}
          </div>
        </div>

        {/* Read Time */}
        {news.readTime && (
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-bold">
            {news.readTime}
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 right-4">
            <Link
              to={`/news/${news.id}`}
              className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center transform hover:scale-110"
            >
              <Eye className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <div className="flex items-center space-x-reverse space-x-2 mb-3 text-gray-500">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-bold">{news.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-black text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-300">
          <Link to={`/news/${news.id}`}>
            {news.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {news.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {news.excerpt}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Link
            to={`/news/${news.id}`}
            className="flex items-center space-x-reverse space-x-2 text-blue-600 hover:text-blue-800 font-bold transition-colors duration-300 group"
          >
            <span>ادامه مطلب</span>
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" />
          </Link>

          <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:scale-110">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
