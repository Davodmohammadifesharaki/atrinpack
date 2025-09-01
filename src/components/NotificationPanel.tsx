
import React, { useState } from 'react';
import { 
  Bell, 
  Package, 
  Users, 
  Newspaper, 
  Phone, 
  Settings,
  X,
  Circle
} from 'lucide-react';

const NotificationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      type: 'product',
      title: 'محصول جدید اضافه شد',
      message: 'شیشه کریستالی لوکس 75ml به محصولات اضافه شد',
      time: '۵ دقیقه پیش',
      icon: Package,
      color: 'blue',
      isRead: false
    },
    {
      id: 2,
      type: 'user',
      title: 'کاربر جدید ثبت‌نام کرد',
      message: 'احمد محمدی به سیستم اضافه شد',
      time: '۱۰ دقیقه پیش',
      icon: Users,
      color: 'green',
      isRead: false
    },
    {
      id: 3,
      type: 'news',
      title: 'خبر منتشر شد',
      message: 'خبر همکاری با برند فرانسوی منتشر شد',
      time: '۱۵ دقیقه پیش',
      icon: Newspaper,
      color: 'purple',
      isRead: true
    },
    {
      id: 4,
      type: 'contact',
      title: 'درخواست تماس جدید',
      message: 'مشتری جدید درخواست مشاوره کرده است',
      time: '۲۰ دقیقه پیش',
      icon: Phone,
      color: 'amber',
      isRead: true
    },
    {
      id: 5,
      type: 'system',
      title: 'بروزرسانی سیستم',
      message: 'سیستم با موفقیت بروزرسانی شد',
      time: '۱ ساعت پیش',
      icon: Settings,
      color: 'gray',
      isRead: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">اعلان‌ها</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-reverse space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300 ${
                  !notification.isRead ? 'bg-blue-50' : ''
                }`}
              >
                <div className={`p-2 rounded-full bg-${notification.color}-100`}>
                  <notification.icon className={`w-5 h-5 text-${notification.color}-600`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-reverse space-x-2">
                    <p className="text-sm font-bold text-gray-800 truncate">
                      {notification.title}
                    </p>
                    {!notification.isRead && (
                      <Circle className="w-2 h-2 text-blue-500 fill-current" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <button className="w-full text-center text-blue-600 hover:text-blue-800 font-bold text-sm">
              مشاهده همه اعلان‌ها
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
