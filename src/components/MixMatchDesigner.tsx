import React, { useState } from 'react';
import { useProducts } from '../hooks/useSupabase';
import { getImageUrl } from '../utils/imageUpload';
import { Palette, RotateCcw, Download, Phone } from 'lucide-react';

interface BottleOption {
  id: number;
  name: string;
  shape: string;
  volume: string;
  material: string;
  color: string;
  image: string;
}

interface PumpOption {
  id: number;
  name: string;
  type: string;
  color: string;
  material: string;
  image: string;
}

interface CapOption {
  id: number;
  name: string;
  material: string;
  color: string;
  image: string;
}

const MixMatchDesigner = () => {
  const [selectedBottle, setSelectedBottle] = useState<BottleOption | null>(null);
  const [selectedPump, setSelectedPump] = useState<PumpOption | null>(null);
  const [selectedCap, setSelectedCap] = useState<CapOption | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { products } = useProducts();

  // Get bottles from products with show_in_mix_match = true
  const bottles: BottleOption[] = (products || [])
    .filter(p => p.show_in_mix_match && p.category.includes('شیشه'))
    .map(p => ({
      id: parseInt(p.id),
      name: p.name,
      shape: p.shape || 'نامشخص',
      volume: p.volume || 'نامشخص',
      material: p.material || 'نامشخص',
      color: p.color || 'نامشخص',
      image: getImageUrl(p.images, p.image_url)
    }));

  // Get pumps from products
  const pumps: PumpOption[] = (products || [])
    .filter(p => p.show_in_mix_match && p.category.includes('پمپ'))
    .map(p => ({
      id: parseInt(p.id),
      name: p.name,
      type: p.category,
      color: p.color || 'نامشخص',
      material: p.material || 'نامشخص',
      image: getImageUrl(p.images, p.image_url)
    }));

  // Get caps from products
  const caps: CapOption[] = (products || [])
    .filter(p => p.show_in_mix_match && p.category.includes('درپوش'))
    .map(p => ({
      id: parseInt(p.id),
      name: p.name,
      material: p.material || 'نامشخص',
      color: p.color || 'نامشخص',
      image: getImageUrl(p.images, p.image_url)
    }));

  const resetSelection = () => {
    setSelectedBottle(null);
    setSelectedPump(null);
    setSelectedCap(null);
  };

  const isComplete = selectedBottle && selectedPump && selectedCap;

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8" dir="rtl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Palette className="w-12 h-12 text-purple-600 ml-4" />
          <h2 className="text-4xl font-black text-gray-800">طراح Mix & Match</h2>
        </div>
        <p className="text-xl text-gray-600">محصول اختصاصی خود را طراحی کنید</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* انتخاب شیشه */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-gray-800 border-b-2 border-blue-500 pb-2">
            ۱. انتخاب شیشه
          </h3>
          <div className="space-y-3">
            {bottles.map((bottle) => (
              <div
                key={bottle.id}
                onClick={() => setSelectedBottle(bottle)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedBottle?.id === bottle.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                }`}
              >
                <img
                  src={bottle.image}
                  alt={bottle.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-bold text-gray-800 text-sm">{bottle.name}</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>شکل: {bottle.shape}</div>
                  <div>حجم: {bottle.volume}</div>
                  <div>رنگ: {bottle.color}</div>
                </div>
              </div>
            ))}
            {bottles.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>هیچ شیشه‌ای برای Mix & Match موجود نیست</p>
                <p className="text-xs mt-1">ابتدا محصولات را اضافه کنید</p>
              </div>
            )}
          </div>
        </div>

        {/* انتخاب پمپ */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-gray-800 border-b-2 border-green-500 pb-2">
            ۲. انتخاب پمپ
          </h3>
          <div className="space-y-3">
            {pumps.map((pump) => (
              <div
                key={pump.id}
                onClick={() => setSelectedPump(pump)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedPump?.id === pump.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
                }`}
              >
                <img
                  src={pump.image}
                  alt={pump.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-bold text-gray-800 text-sm">{pump.name}</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>نوع: {pump.type}</div>
                  <div>رنگ: {pump.color}</div>
                  <div>جنس: {pump.material}</div>
                </div>
              </div>
            ))}
            {pumps.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>هیچ پمپی برای Mix & Match موجود نیست</p>
                <p className="text-xs mt-1">ابتدا محصولات را اضافه کنید</p>
              </div>
            )}
          </div>
        </div>

        {/* انتخاب درپوش */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-gray-800 border-b-2 border-purple-500 pb-2">
            ۳. انتخاب درپوش
          </h3>
          <div className="space-y-3">
            {caps.map((cap) => (
              <div
                key={cap.id}
                onClick={() => setSelectedCap(cap)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedCap?.id === cap.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                }`}
              >
                <img
                  src={cap.image}
                  alt={cap.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-bold text-gray-800 text-sm">{cap.name}</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>جنس: {cap.material}</div>
                  <div>رنگ: {cap.color}</div>
                </div>
              </div>
            ))}
            {caps.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>هیچ درپوشی برای Mix & Match موجود نیست</p>
                <p className="text-xs mt-1">ابتدا محصولات را اضافه کنید</p>
              </div>
            )}
          </div>
        </div>

        {/* پیش‌نمایش */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-gray-800 border-b-2 border-amber-500 pb-2">
            ۴. پیش‌نمایش
          </h3>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl min-h-96 flex flex-col items-center justify-center">
            {isComplete ? (
              <div className="text-center space-y-4 animate-bounce-in">
                <div className="relative">
                  {/* نمایش ترکیبی محصولات */}
                  <div className="relative w-48 h-48 mx-auto">
                    <img
                      src={selectedBottle.image}
                      alt="شیشه انتخابی"
                      className="absolute inset-0 w-full h-full object-contain z-10"
                    />
                    <img
                      src={selectedPump.image}
                      alt="پمپ انتخابی"
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 object-contain z-20"
                    />
                    <img
                      src={selectedCap.image}
                      alt="درپوش انتخابی"
                      className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-12 object-contain z-30"
                    />
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <h4 className="font-black text-gray-800 mb-3">ترکیب انتخابی شما:</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div><strong>شیشه:</strong> {selectedBottle.name}</div>
                    <div><strong>پمپ:</strong> {selectedPump.name}</div>
                    <div><strong>درپوش:</strong> {selectedCap.name}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span>درخواست قیمت</span>
                  </button>
                  
                  <button
                    onClick={resetSelection}
                    className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all duration-300 flex items-center justify-center space-x-reverse space-x-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>شروع مجدد</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <Palette className="w-24 h-24 mx-auto mb-4 text-gray-300" />
                <h4 className="text-xl font-bold mb-2">طراحی خود را شروع کنید</h4>
                <p>ابتدا شیشه، پمپ و درپوش مورد نظر خود را انتخاب کنید</p>
                <div className="mt-4 text-sm">
                  <div className={`inline-block w-4 h-4 rounded-full ml-2 ${selectedBottle ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                  <span className={selectedBottle ? 'text-blue-600 font-bold' : ''}>شیشه</span>
                  
                  <div className={`inline-block w-4 h-4 rounded-full ml-2 mr-4 ${selectedPump ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className={selectedPump ? 'text-green-600 font-bold' : ''}>پمپ</span>
                  
                  <div className={`inline-block w-4 h-4 rounded-full ml-2 mr-4 ${selectedCap ? 'bg-purple-500' : 'bg-gray-300'}`}></div>
                  <span className={selectedCap ? 'text-purple-600 font-bold' : ''}>درپوش</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* مودال تماس */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-black text-gray-800 mb-4">درخواست قیمت</h3>
            <p className="text-gray-600 mb-6">
              برای دریافت قیمت طراحی اختصاصی خود با ما تماس بگیرید:
            </p>
            
            <div className="space-y-3">
              <a
                href="tel:+982112345678"
                className="flex items-center space-x-reverse space-x-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <Phone className="w-5 h-5 text-blue-600" />
                <span className="font-bold">021-12345678</span>
              </a>
              
              <a
                href="https://wa.me/989123456789"
                className="flex items-center space-x-reverse space-x-3 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
              >
                <Phone className="w-5 h-5 text-green-600" />
                <span className="font-bold">09123456789 (واتساپ)</span>
              </a>
            </div>
            
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="w-full mt-4 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MixMatchDesigner;