import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Home, 
  ShoppingBag, 
  Heart, 
  User, 
  LogOut,
  Menu,
  X,
  Package,
  Star,
  ArrowLeft,
  Crown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface CustomerLayoutProps {
  children: React.ReactNode;
}

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userInfo, setUserInfo] = useState({
    username: '',
    fullName: '',
    email: ''
  });

  useEffect(() => {
    // بررسی ورود کاربر
    const userData = localStorage.getItem('customerUser');
    if (!userData) {
      navigate('/customer/login');
      return;
    }

    const user = JSON.parse(userData);
    setUserInfo({
      username: user.username || 'customer',
      fullName: user.fullName || 'مشتری گرامی',
      email: user.email || 'customer@example.com'
    });
  }, [navigate]);

  const handleLogout = () => {
    if (confirm('آیا از خروج اطمینان دارید؟')) {
      localStorage.removeItem('customerUser');
      navigate('/customer/login');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { 
      icon: Home, 
      label: 'داشبورد', 
      path: '/customer/dashboard'
    },
    { 
      icon: ShoppingBag, 
      label: 'سفارشات من', 
      path: '/customer/orders'
    },
    { 
      icon: Heart, 
      label: 'علاقه‌مندی‌ها', 
      path: '/customer/wishlist'
    },
    { 
      icon: User, 
      label: 'پروفایل من', 
      path: '/customer/profile'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-72' : 'w-20'} bg-white shadow-xl transition-all duration-300 flex-shrink-0 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className={`${isSidebarOpen ? 'block' : 'hidden'} transition-all duration-300`}>
              <div className="flex items-center space-x-reverse space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-black text-gray-800">پنل مشتری</h1>
                  <p className="text-sm text-blue-600 font-bold">آترین پک</p>
                </div>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              {isSidebarOpen ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className={`px-6 py-4 border-b border-gray-200 ${isSidebarOpen ? 'block' : 'hidden'}`}>
          <div className="flex items-center space-x-reverse space-x-3">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-800">{userInfo.fullName}</p>
              <p className="text-sm text-gray-600">@{userInfo.username}</p>
              <span className="inline-block px-2 py-1 rounded-full text-xs text-white bg-blue-500 mt-1">
                مشتری
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`w-full flex items-center space-x-reverse space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                location.pathname === item.path 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-white' : 'group-hover:text-blue-600'}`} />
              <span className={`${isSidebarOpen ? 'block' : 'hidden'} transition-all duration-300 font-bold`}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center space-x-reverse space-x-3 px-4 py-3 rounded-xl text-blue-600 hover:bg-blue-50 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className={`${isSidebarOpen ? 'block' : 'hidden'} transition-all duration-300 font-bold`}>
              بازگشت به سایت
            </span>
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-reverse space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 group"
          >
            <LogOut className="w-5 h-5" />
            <span className={`${isSidebarOpen ? 'block' : 'hidden'} transition-all duration-300 font-bold`}>
              خروج
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-reverse space-x-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {menuItems.find(item => item.path === location.pathname)?.label || 'پنل مشتری'}
            </h2>
          </div>
          <div className="flex items-center space-x-reverse space-x-4">
            <div className="flex items-center space-x-reverse space-x-3">
              <div className="text-left">
                <p className="text-sm font-bold text-gray-800">{userInfo.fullName}</p>
                <p className="text-xs text-gray-600">مشتری</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;