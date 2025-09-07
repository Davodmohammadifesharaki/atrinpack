import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { useAllProducts, useAllNews, useGallery, useContactMessages } from '../../hooks/useSupabase';
import { 
  Package, 
  Newspaper, 
  Image, 
  Users, 
  TrendingUp,
  Eye,
  MessageSquare,
  Star,
  Plus,
  Settings,
  FileText,
  Crown,
  Award,
  Shield,
  Clock,
  ArrowLeft,
  Calendar,
  Activity
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Get real data from hooks
  const { products } = useAllProducts();
  const { news } = useAllNews();
  const { gallery } = useGallery();
  const { messages } = useContactMessages();

  const stats = [
    {
      title: 'کل محصولات',
      value: products?.length.toString() || '0',
      change: '+0',
      changeType: 'increase',
      icon: Package,
      color: 'blue',
      description: 'این ماه'
    },
    {
      title: 'اخبار منتشر شده',
      value: news?.filter(n => n.visible).length.toString() || '0',
      change: '+0',
      changeType: 'increase',
      icon: Newspaper,
      color: 'green',
      description: 'این ماه'
    },
    {
      title: 'تصاویر گالری',
      value: gallery?.length.toString() || '0',
      change: '+0',
      changeType: 'increase',
      icon: Image,
      color: 'purple',
      description: 'این ماه'
    },
    {
      title: 'پیام‌های جدید',
      value: messages?.filter(m => m.status === 'new').length.toString() || '0',
      change: '+0',
      changeType: 'increase',
      icon: MessageSquare,
      color: 'amber',
      description: 'این هفته'
    }
  ];

  const quickActions = [
    {
      title: 'افزودن محصول',
      description: 'محصول جدید اضافه کنید',
      icon: Package,
      color: 'blue',
      action: () => navigate('/admin/products/add')
    },
    {
      title: 'انتشار خبر',
      description: 'خبر جدید منتشر کنید',
      icon: Newspaper,
      color: 'green',
      action: () => navigate('/admin/news/add')
    },
    {
      title: 'آپلود تصویر',
      description: 'تصویر به گالری اضافه کنید',
      icon: Image,
      color: 'purple',
      action: () => navigate('/admin/gallery/add')
    },
    {
      title: 'مدیریت کاربران',
      description: 'کاربران سیستم را مدیریت کنید',
      icon: Users,
      color: 'amber',
      action: () => navigate('/admin/users')
    },
    {
      title: 'پیام‌ها',
      description: 'پیام‌های دریافتی را مشاهده کنید',
      icon: MessageSquare,
      color: 'red',
      action: () => navigate('/admin/contact')
    },
    {
      title: 'تنظیمات',
      description: 'تنظیمات سایت را ویرایش کنید',
      icon: Settings,
      color: 'gray',
      action: () => navigate('/admin/settings')
    }
  ];

  // Generate recent activities from real data
  const recentActivities = [
    ...(products?.slice(0, 2).map(product => ({
      id: `product-${product.id}`,
      type: 'product',
      title: 'محصول جدید اضافه شد',
      description: product.name,
      time: new Date(product.created_at).toLocaleDateString('fa-IR'),
      icon: Package,
      color: 'blue',
      user: 'مدیر سیستم'
    })) || []),
    ...(news?.slice(0, 2).map(newsItem => ({
      id: `news-${newsItem.id}`,
      type: 'news',
      title: 'خبر جدید منتشر شد',
      description: newsItem.title,
      time: new Date(newsItem.created_at).toLocaleDateString('fa-IR'),
      icon: Newspaper,
      color: 'green',
      user: 'مدیر سیستم'
    })) || []),
    ...(messages?.slice(0, 1).map(message => ({
      id: `message-${message.id}`,
      type: 'message',
      title: 'پیام جدید دریافت شد',
      description: message.subject,
      time: new Date(message.created_at).toLocaleDateString('fa-IR'),
      icon: MessageSquare,
      color: 'amber',
      user: 'سیستم'
    })) || [])
  ].slice(0, 5);

  const systemStatus = [
    {
      name: 'سرور وب',
      status: 'آنلاین',
      color: 'green',
      icon: Activity,
      details: 'عملکرد عالی'
    },
    {
      name: 'دیتابیس',
      status: 'متصل',
      color: 'green',
      icon: Shield,
      details: 'اتصال پایدار'
    },
    {
      name: 'آخرین بک‌آپ',
      status: '۲ ساعت پیش',
      color: 'blue',
      icon: Clock,
      details: 'موفقیت‌آمیز'
    },
    {
      name: 'فضای ذخیره‌سازی',
      status: '۷۵٪ استفاده',
      color: 'amber',
      icon: Package,
      details: '۲.۳ گیگابایت باقی'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-reverse space-x-3 mb-4">
                <Crown className="w-10 h-10 text-amber-300" />
                <div>
                  <h1 className="text-3xl font-black">خوش آمدید به پنل مدیریت</h1>
                  <p className="text-blue-100 text-lg">عطرین پک - بسته‌بندی لوکس</p>
                </div>
              </div>
              <p className="text-blue-100">مدیریت کامل سایت و محتوا از این پنل</p>
            </div>
            <div className="text-left">
              <div className="text-4xl font-black text-amber-300">{new Date().toLocaleDateString('fa-IR')}</div>
              <div className="text-blue-100">امروز</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs lg:text-sm font-bold">{stat.title}</p>
                  <p className="text-2xl lg:text-3xl font-black text-gray-800 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-bold ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-gray-500 text-xs lg:text-sm mr-1">{stat.description}</span>
                  </div>
                </div>
                <div className={`w-12 h-12 lg:w-16 lg:h-16 bg-${stat.color}-100 rounded-2xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 lg:w-8 lg:h-8 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl lg:text-2xl font-black text-gray-800 flex items-center">
              <Plus className="w-6 h-6 lg:w-8 lg:h-8 ml-2 lg:ml-3 text-blue-500" />
              عملیات سریع
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`p-4 lg:p-6 bg-${action.color}-50 border-2 border-${action.color}-100 rounded-2xl hover:bg-${action.color}-100 hover:border-${action.color}-200 transition-all duration-300 text-center group transform hover:scale-105 hover:shadow-lg`}
              >
                <action.icon className={`w-8 h-8 lg:w-12 lg:h-12 text-${action.color}-600 mx-auto mb-2 lg:mb-4 group-hover:scale-110 transition-transform duration-300`} />
                <h3 className="text-sm lg:text-lg font-black text-gray-800 mb-1 lg:mb-2">{action.title}</h3>
                <p className="text-xs lg:text-sm text-gray-600 hidden lg:block">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl lg:text-2xl font-black text-gray-800 flex items-center">
                <Activity className="w-6 h-6 lg:w-8 lg:h-8 ml-2 lg:ml-3 text-green-500" />
                فعالیت‌های اخیر
              </h2>
              <button 
                onClick={() => navigate('/admin/activities')}
                className="text-blue-600 hover:text-blue-800 font-bold text-xs lg:text-sm flex items-center space-x-reverse space-x-1"
              >
                <span>مشاهده همه</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-reverse space-x-3 lg:space-x-4 p-3 lg:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-${activity.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <activity.icon className={`w-5 h-5 lg:w-6 lg:h-6 text-${activity.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm lg:text-base font-bold text-gray-800">{activity.title}</h3>
                    <p className="text-gray-600 text-xs lg:text-sm line-clamp-2">{activity.description}</p>
                    <div className="flex items-center space-x-reverse space-x-2 mt-1">
                      <span className="text-gray-500 text-xs">{activity.time}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-blue-600 text-xs font-bold">{activity.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl lg:text-2xl font-black text-gray-800 flex items-center">
                <Shield className="w-6 h-6 lg:w-8 lg:h-8 ml-2 lg:ml-3 text-purple-500" />
                وضعیت سیستم
              </h2>
              <div className="flex items-center space-x-reverse space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 font-bold text-xs lg:text-sm">همه چیز عالی</span>
              </div>
            </div>
            <div className="space-y-4">
              {systemStatus.map((item, index) => (
                <div key={index} className={`flex items-center justify-between p-3 lg:p-4 bg-${item.color}-50 rounded-xl border border-${item.color}-100`}>
                  <div className="flex items-center space-x-reverse space-x-3">
                    <div className={`w-8 h-8 lg:w-10 lg:h-10 bg-${item.color}-100 rounded-full flex items-center justify-center`}>
                      <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                    </div>
                    <div>
                      <span className="text-sm lg:text-base font-bold text-gray-800">{item.name}</span>
                      <p className="text-xs text-gray-600 hidden lg:block">{item.details}</p>
                    </div>
                  </div>
                  <span className={`text-${item.color}-600 font-bold text-xs lg:text-sm`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Management Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div 
            onClick={() => navigate('/admin/products')}
            className="bg-white p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Package className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <h3 className="text-base lg:text-lg font-black text-gray-800 mb-2">محصولات</h3>
            <p className="text-gray-600 text-xs lg:text-sm hidden lg:block">مدیریت کامل محصولات</p>
            <div className="mt-2 lg:mt-4 text-xl lg:text-2xl font-black text-blue-600">{products?.length || 0}</div>
          </div>

          <div 
            onClick={() => navigate('/admin/news')}
            className="bg-white p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Newspaper className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
            </div>
            <h3 className="text-base lg:text-lg font-black text-gray-800 mb-2">اخبار</h3>
            <p className="text-gray-600 text-xs lg:text-sm hidden lg:block">مدیریت اخبار و مقالات</p>
            <div className="mt-2 lg:mt-4 text-xl lg:text-2xl font-black text-green-600">{news?.length || 0}</div>
          </div>

          <div 
            onClick={() => navigate('/admin/gallery')}
            className="bg-white p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Image className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <h3 className="text-base lg:text-lg font-black text-gray-800 mb-2">گالری</h3>
            <p className="text-gray-600 text-xs lg:text-sm hidden lg:block">مدیریت تصاویر سایت</p>
            <div className="mt-2 lg:mt-4 text-xl lg:text-2xl font-black text-purple-600">{gallery?.length || 0}</div>
          </div>

          <div 
            onClick={() => navigate('/admin/contact')}
            className="bg-white p-4 lg:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-amber-100 rounded-xl flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6 text-amber-600" />
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-amber-600 transition-colors" />
            </div>
            <h3 className="text-base lg:text-lg font-black text-gray-800 mb-2">پیام‌ها</h3>
            <p className="text-gray-600 text-xs lg:text-sm hidden lg:block">پیام‌های دریافتی</p>
            <div className="mt-2 lg:mt-4 text-xl lg:text-2xl font-black text-amber-600">{messages?.length || 0}</div>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl lg:text-2xl font-black text-gray-800 flex items-center">
              <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 ml-2 lg:ml-3 text-indigo-500" />
              نمودار عملکرد
            </h2>
            <div className="flex items-center space-x-reverse space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600 text-xs lg:text-sm">۳۰ روز گذشته</span>
            </div>
          </div>
          <div className="h-48 lg:h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-500">
              <TrendingUp className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4" />
              <p className="text-base lg:text-lg font-bold">نمودار عملکرد سایت</p>
              <p className="text-xs lg:text-sm">آمار بازدید، فروش و تعاملات</p>
              <p className="text-xs mt-2 text-gray-400">در نسخه‌های بعدی اضافه خواهد شد</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;