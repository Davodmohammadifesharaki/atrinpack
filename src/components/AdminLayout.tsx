import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import NotificationPanel from './NotificationPanel';
import { 
  Home, 
  Package, 
  Newspaper, 
  Image, 
  Users, 
  Settings, 
  LogOut,
  User,
  Menu,
  X,
  Tags,
  MessageSquare,
  FileText,
  ArrowLeft,
  Crown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState<'admin'>('admin');
  const [userInfo, setUserInfo] = useState({
    username: '',
    fullName: '',
    email: ''
  });

  useEffect(() => {
    // بررسی ورود کاربر
    const userData = localStorage.getItem('adminUser');
    if (!userData) {
      navigate('/admin/login');
      return;
    }

    const user = JSON.parse(userData);
    setUserRole(user.role || 'admin');
    setUserInfo({
      username: user.username || 'admin',
      fullName: user.fullName || 'مدیر آترین پک',
      email: user.email || 'admin@atrinpack.com'
    });
  }, [navigate]);

  const handleLogout = () => {
    if (confirm('آیا از خروج اطمینان دارید؟')) {
      localStorage.removeItem('adminUser');
      navigate('/admin/login');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { 
      icon: Home, 
      label: 'داشبورد', 
      path: '/admin/dashboard',
      roles: ['admin']
    },
    { 
      icon: Package, 
      label: 'مدیریت محصولات', 
      path: '/admin/products',
      roles: ['admin']
    },
    { 
      icon: Newspaper, 
      label: 'مدیریت اخبار', 
      path: '/admin/news',
      roles: ['admin']
    },
    { 
      icon: Image, 
      label: 'مدیریت گالری', 
      path: '/admin/gallery',
      roles: ['admin']
    },
    { 
      icon: Tags, 
      label: 'مدیریت دسته‌بندی‌ها', 
      path: '/admin/categories',
      roles: ['admin']
    },
    { 
      icon: MessageSquare, 
      label: 'مدیریت اطلاعات تماس', 
      path: '/admin/contact',
      roles: ['admin']
    },
    { 
      icon: Users, 
      label: 'مدیریت کاربران', 
      path: '/admin/users',
      roles: ['admin']
    },
    { 
      icon: Settings, 
      label: 'تنظیمات', 
      path: '/admin/settings',
      roles: ['admin']
    },
    { 
      icon: User, 
      label: 'پروفایل', 
      path: '/admin/profile',
      roles: ['admin']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'مدیر کل';
      default: return 'مدیر';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      default: return 'bg-red-500';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-72' : 'w-20'} bg-white shadow-xl transition-all duration-300 flex-shrink-0 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className={`${isSidebarOpen ? 'block' : 'hidden'} transition-all duration-300`}>
              <div className="flex items-center space-x-reverse space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-black text-gray-800">پنل مدیریت</h1>
                  <p className="text-sm text-amber-600 font-bold">آترین پک</p>
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
              <span className={`inline-block px-2 py-1 rounded-full text-xs text-white ${getRoleColor(userRole)} mt-1`}>
                {getRoleLabel(userRole)}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {filteredMenuItems.map((item) => (
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
              {filteredMenuItems.find(item => item.path === location.pathname)?.label || 'پنل مدیریت'}
            </h2>
          </div>
          <div className="flex items-center space-x-reverse space-x-4">
            <NotificationPanel />
            <div className="flex items-center space-x-reverse space-x-3">
              <div className="text-left">
                <p className="text-sm font-bold text-gray-800">{userInfo.fullName}</p>
                <p className="text-xs text-gray-600">{getRoleLabel(userRole)}</p>
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

export default AdminLayout;