import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerLayout from '../../components/CustomerLayout';
import { 
  ShoppingBag, 
  Heart, 
  Package, 
  User,
  TrendingUp,
  Calendar,
  Star,
  Eye,
  Clock,
  CheckCircle,
  Truck,
  Award,
  ArrowRight
} from 'lucide-react';

const CustomerDashboard = () => {
  const navigate = useNavigate();

  // نمونه داده‌های مشتری
  const customerStats = [
    {
      title: 'سفارشات من',
      value: '12',
      change: '+2',
      changeType: 'increase',
      icon: ShoppingBag,
      color: 'blue',
      description: 'این ماه'
    },
    {
      title: 'علاقه‌مندی‌ها',
      value: '8',
      change: '+1',
      changeType: 'increase',
      icon: Heart,
      color: 'red',
      description: 'محصول'
    },
    {
      title: 'محصولات بازدید شده',
      value: '45',
      change: '+12',
      changeType: 'increase',
      icon: Eye,
      color: 'green',
      description: 'این هفته'
    },
    {
      title: 'امتیاز وفاداری',
      value: '1,250',
      change: '+150',
      changeType: 'increase',
      icon: Star,
      color: 'amber',
      description: 'امتیاز'
    }
  ];

  const recentOrders = [
    {
      id: 1,
      orderNumber: 'ORD-001',
      date: '۱۵ دی ۱۴۰۳',
      status: 'تحویل شده',
      total: '2,500,000 تومان',
      items: 3,
      statusColor: 'green'
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      date: '۱۰ دی ۱۴۰۳',
      status: 'در حال ارسال',
      total: '1,800,000 تومان',
      items: 2,
      statusColor: 'blue'
    },
    {
      id: 3,
      orderNumber: 'ORD-003',
      date: '۵ دی ۱۴۰۳',
      status: 'در انتظار تایید',
      total: '950,000 تومان',
      items: 1,
      statusColor: 'amber'
    }
  ];

  const favoriteProducts = [
    {
      id: 1,
      name: 'بطری عطر کریستالی 50ml',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop',
      price: 'استعلام قیمت',
      category: 'شیشه و بطری'
    },
    {
      id: 2,
      name: 'پمپ اسپری طلایی',
      image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=200&h=200&fit=crop',
      price: 'استعلام قیمت',
      category: 'پمپ و اسپری'
    },
    {
      id: 3,
      name: 'درپوش چوبی دست‌ساز',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop',
      price: 'استعلام قیمت',
      category: 'درپوش'
    }
  ];

  return (
    <CustomerLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-reverse space-x-3 mb-4">
                <ShoppingBag className="w-10 h-10 text-blue-300" />
                <div>
                  <h1 className="text-3xl font-black">خوش آمدید به پنل مشتری</h1>
                  <p className="text-blue-100 text-lg">آترین پک - بسته‌بندی لوکس</p>
                </div>
              </div>
              <p className="text-blue-100">مدیریت سفارشات و علاقه‌مندی‌های خود</p>
            </div>
            <div className="text-left">
              <div className="text-4xl font-black text-blue-300">{new Date().toLocaleDateString('fa-IR')}</div>
              <div className="text-blue-100">امروز</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {customerStats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-bold">{stat.title}</p>
                  <p className="text-3xl font-black text-gray-800 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-bold ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-gray-500 text-sm mr-1">{stat.description}</span>
                  </div>
                </div>
                <div className={`w-16 h-16 bg-${stat.color}-100 rounded-2xl flex items-center justify-center`}>
                  <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-gray-800 flex items-center">
                <Package className="w-8 h-8 ml-3 text-blue-500" />
                سفارشات اخیر
              </h2>
              <button 
                onClick={() => navigate('/customer/orders')}
                className="text-blue-600 hover:text-blue-800 font-bold text-sm flex items-center space-x-reverse space-x-1"
              >
                <span>مشاهده همه</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                  <div className="flex items-center space-x-reverse space-x-4">
                    <div className={`w-12 h-12 bg-${order.statusColor}-100 rounded-full flex items-center justify-center`}>
                      <Package className={`w-6 h-6 text-${order.statusColor}-600`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{order.orderNumber}</h3>
                      <p className="text-gray-600 text-sm">{order.date}</p>
                      <p className="text-gray-500 text-xs">{order.items} محصول</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${order.statusColor}-100 text-${order.statusColor}-700`}>
                      {order.status}
                    </span>
                    <p className="text-gray-800 font-bold mt-1">{order.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Products */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-gray-800 flex items-center">
                <Heart className="w-8 h-8 ml-3 text-red-500" />
                محصولات مورد علاقه
              </h2>
              <button 
                onClick={() => navigate('/customer/wishlist')}
                className="text-red-600 hover:text-red-800 font-bold text-sm flex items-center space-x-reverse space-x-1"
              >
                <span>مشاهده همه</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {favoriteProducts.map((product) => (
                <div key={product.id} className="flex items-center space-x-reverse space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 text-sm">{product.category}</p>
                    <p className="text-blue-600 font-bold text-sm">{product.price}</p>
                  </div>
                  <button 
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-black text-gray-800 mb-8 flex items-center">
            <TrendingUp className="w-8 h-8 ml-3 text-purple-500" />
            عملیات سریع
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button
              onClick={() => navigate('/products')}
              className="p-6 bg-blue-50 border-2 border-blue-100 rounded-2xl hover:bg-blue-100 hover:border-blue-200 transition-all duration-300 text-center group transform hover:scale-105"
            >
              <Package className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-black text-gray-800 mb-2">مشاهده محصولات</h3>
              <p className="text-sm text-gray-600">کاتالوگ کامل محصولات</p>
            </button>

            <button
              onClick={() => navigate('/mix-match')}
              className="p-6 bg-purple-50 border-2 border-purple-100 rounded-2xl hover:bg-purple-100 hover:border-purple-200 transition-all duration-300 text-center group transform hover:scale-105"
            >
              <Star className="w-12 h-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-black text-gray-800 mb-2">طراحی اختصاصی</h3>
              <p className="text-sm text-gray-600">Mix & Match</p>
            </button>

            <button
              onClick={() => navigate('/customer/orders')}
              className="p-6 bg-green-50 border-2 border-green-100 rounded-2xl hover:bg-green-100 hover:border-green-200 transition-all duration-300 text-center group transform hover:scale-105"
            >
              <Truck className="w-12 h-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-black text-gray-800 mb-2">پیگیری سفارش</h3>
              <p className="text-sm text-gray-600">وضعیت سفارشات</p>
            </button>

            <button
              onClick={() => navigate('/customer/profile')}
              className="p-6 bg-amber-50 border-2 border-amber-100 rounded-2xl hover:bg-amber-100 hover:border-amber-200 transition-all duration-300 text-center group transform hover:scale-105"
            >
              <User className="w-12 h-12 text-amber-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-black text-gray-800 mb-2">پروفایل من</h3>
              <p className="text-sm text-gray-600">ویرایش اطلاعات</p>
            </button>
          </div>
        </div>

        {/* Customer Benefits */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-black mb-6">مزایای عضویت در آترین پک</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black mb-3">تخفیف ویژه</h3>
              <p className="text-amber-100">تخفیف‌های اختصاصی برای اعضا</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black mb-3">ارسال رایگان</h3>
              <p className="text-amber-100">ارسال رایگان برای سفارشات بالای ۱ میلیون تومان</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black mb-3">امتیاز وفاداری</h3>
              <p className="text-amber-100">کسب امتیاز با هر خرید</p>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerDashboard;