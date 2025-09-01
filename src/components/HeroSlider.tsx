import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920&h=1080&fit=crop',
      title: 'شیشه‌های عطر کریستالی',
      subtitle: 'کیفیت بین‌المللی',
      description: 'مجموعه‌ای از زیباترین شیشه‌های عطر با کیفیت کریستالی و طراحی لوکس'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=1920&h=1080&fit=crop',
      title: 'پمپ‌های اسپری طلایی',
      subtitle: 'طراحی منحصر به فرد',
      description: 'پمپ‌های اسپری با پوشش طلایی و مکانیزم دقیق برای بهترین تجربه استفاده'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&h=1080&fit=crop',
      title: 'درپوش‌های هنری',
      subtitle: 'ساخت دست',
      description: 'درپوش‌های هنری با طراحی اختصاصی و ساخت دستی برای محصولات لوکس'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center text-white text-center" dir="rtl">
              <div className="max-w-4xl px-6">
                <h1 className="text-5xl lg:text-7xl font-black mb-4 text-shadow-lg animate-fade-in">
                  {slide.title}
                </h1>
                <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-amber-300 animate-fade-in animation-delay-300">
                  {slide.subtitle}
                </h2>
                <p className="text-xl lg:text-2xl leading-relaxed animate-fade-in animation-delay-600">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;