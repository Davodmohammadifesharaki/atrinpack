import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageGallery from '../components/ImageGallery';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useGallery } from '../hooks/useSupabase';
import { getImageUrl, getAllImages } from '../utils/imageUpload';
import { Image, Camera, Filter, Grid, List, Eye, X } from 'lucide-react';

const Gallery = () => {
  const { gallery: galleryItems, loading, error, refetch } = useGallery();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const categories = [
    { id: 'all', name: 'همه تصاویر' },
    { id: 'bottle', name: 'شیشه و بطری' },
    { id: 'pump', name: 'پمپ و اسپری' },
    { id: 'cap', name: 'درپوش' },
    { id: 'essence', name: 'اسانس' },
    { id: 'sealer', name: 'پلمپر' }
  ];

  const filteredItems = (galleryItems || []).filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Image className="w-12 h-12 ml-4" />
              <h1 className="text-4xl lg:text-5xl font-black">گالری تصاویر</h1>
            </div>
            <p className="text-xl text-pink-100">مجموعه‌ای از بهترین محصولات آترین پک</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Filter */}
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm text-pink-600' : 'text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm text-pink-600' : 'text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {loading ? (
            <LoadingSpinner message="در حال بارگذاری گالری..." />
          ) : error ? (
            <ErrorMessage message={error} onRetry={refetch} />
          ) : (
            <>
          <div className="mb-8">
            <p className="text-gray-600">
              نمایش {filteredItems.length} تصویر از {galleryItems.length} تصویر
            </p>
          </div>

          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 md:grid-cols-2'
          }`}>
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={getImageUrl(item.images, item.image_url)} 
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <Eye className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  {/* Image Count Badge */}
                  {getAllImages(item.images, item.image_url).length > 1 && (
                    <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {getAllImages(item.images, item.image_url).length} تصویر
                    </div>
                  )}
                  </div>

                <div className="p-6">
                  <h3 className="text-lg font-black text-gray-800 mb-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Camera className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">تصویری یافت نشد</h3>
              <p className="text-gray-500">لطفاً دسته‌بندی دیگری انتخاب کنید</p>
            </div>
          )}
            </>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative p-4">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 left-6 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <ImageGallery
                images={getAllImages(selectedImage.images, selectedImage.image_url)}
                title={selectedImage.title}
                className="mb-4"
                showThumbnails={true}
                allowDownload={true}
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-black text-gray-800 mb-2">{selectedImage.title}</h2>
              {selectedImage.description && (
                <p className="text-gray-600">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;