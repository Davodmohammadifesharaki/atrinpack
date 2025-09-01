import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import NotificationPanel from '../../components/NotificationPanel';
import { 
  Package, 
  Newspaper, 
  Image, 
  Users, 
  TrendingUp,
  Eye,
  MessageSquare,
  Star
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'کل محصولات',
      value: '156',
      change: '+12',
      changeType: 'increase',
      icon: Package,
      color: 'blue'
    },
    {
      title: 'اخبار منتشر شده',
      value: '43',
      change: '+5',
      changeType: 'increase',
      icon: Newspaper,
      color: 'green'
    },
    {
      title: 'تصاویر گالری',
      value: '89',
      change: '+8',
      changeType: 'increase',
      icon: Image,
      color: 'purple'
    },
    {
      title: 'پیام‌های جدید',
      value: '24',
      change: '+3',
      changeType: 'increase',
      icon: MessageSquare,
      color: 'amber'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'product',
      title: 'محصول جدید اضافه شد',
      description: 'بطری عطر کریستالی 75ml',
      time: '۵ دقیقه پیش',
      icon: Package,
      color: 'blue'
    },
    {
      id: 2,
      type: 'news',
      title: 'خبر جدید منتشر شد',
      description: 'راه‌اندازی خط تولید جدید',
      time: '۱۰ دقیقه پیش',
      icon: Newspaper,
      color: 'green'
    },
    {
      id: 3,
      type: 'message',
      title: 'پیام جدید دریافت شد',
      description: 'درخواست مشاوره از مشتری',
      time: '۱۵ دقیقه پیش',
      icon: MessageSquare,
      color: 'amber'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-800">داشبورد</h1>
            <p className="text-gray-600 mt-2">خلاصه‌ای از وضعیت سایت</p>
          </div>
          <NotificationPanel />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
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
                    <span className="text-gray-500 text-sm mr-1">این ماه</span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-black text-gray-800 mb-6">فعالیت‌های اخیر</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-reverse space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className={`w-10 h-10 bg-${activity.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <activity.icon className={`w-5 h-5 text-${activity.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{activity.title}</h3>
                    <p className="text-gray-600 text-sm">{activity.description}</p>
                    <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-black text-gray-800 mb-6">عملیات سریع</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors text-center">
                <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-bold text-gray-800">افزودن محصول</span>
              </button>
              
              <button className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-center">
                <Newspaper className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <span className="text-sm font-bold text-gray-800">انتشار خبر</span>
              </button>
              
              <button className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors text-center">
                <Image className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <span className="text-sm font-bold text-gray-800">آپلود تصویر</span>
              </button>
              
              <button className="p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors text-center">
                <MessageSquare className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <span className="text-sm font-bold text-gray-800">پیام‌ها</span>
              </button>
            </div>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-black text-gray-800 mb-6">نمودار عملکرد</h2>
          <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
            <div className="text-center text-gray-500">
              <TrendingUp className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg font-bold">نمودار عملکرد</p>
              <p className="text-sm">در نسخه‌های بعدی اضافه خواهد شد</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;