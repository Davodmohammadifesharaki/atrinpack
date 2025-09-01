
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  FileText
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState<'admin' | 'editor' | 'viewer'>('admin');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // بررسی ورود کاربر
    const userData = localStorage.getItem('adminUser');
    if (!userData) {
      navigate('/admin/login');
      return;
    }

    const user = JSON.parse(userData);
    setUserRole(user.role);
    setUsername(user.username);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { 
      icon: Home, 
      label: 'داشبورد', 
      path: '/admin/dashboard',
      roles: ['admin', 'editor', 'viewer']
    },
    { 
      icon: Package, 
      label: 'مدیریت محصولات', 
      path: '/admin/products',
      roles: ['admin', 'editor']
    },
    { 
      icon: Newspaper, 
      label: 'مدیریت اخبار', 
      path: '/admin/news',
      roles: ['admin', 'editor']
    },
    { 
      icon: Image, 
      label: 'مدیریت گالری', 
      path: '/admin/gallery',
      roles: ['admin', 'editor']
    },
    { 
      icon: Tags, 
      label: 'مدیریت دسته‌بندی‌ها', 
      path: '/admin/categories',
      roles: ['admin']
    },
    { 
      icon: MessageSquare, 
      label: 'پیام‌های تماس', 
      path: '/admin/contact',
      roles: ['admin']
    },
    { 
      icon: FileText, 
      label: 'تنظیمات درباره ما', 
      path: '/admin/about',
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
      label: 'تنظیمات سایت', 
      path: '/admin/settings',
      roles: ['admin']
    },
    { 
      icon: User, 
      label: 'پروفایل کاربری', 
      path: '/admin/profile',
      roles: ['admin', 'editor', 'viewer']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'مدیر کل';
      case 'editor': return 'ویرایشگر';
      case 'viewer': return 'نمایشگر';
      default: return 'کاربر';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'editor': return 'bg-blue-500';
      case 'viewer': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 overflow-hidden`}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className={`${isSidebarOpen ? 'block' : 'hidden'} transition-all duration-300`}>
              <h1 className="text-xl font-black text-gray-800">پنل مدیریت</h1>
              <p className="text-sm text-gray-600">آترین پک</p>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className={`px-4 py-3 border-b ${isSidebarOpen ? 'block' : 'hidden'}`}>
          <div className="flex items-center space-x-reverse space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-800">{username}</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs text-white ${getRoleColor(userRole)}`}>
                {getRoleLabel(userRole)}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-2">
          {filteredMenuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-reverse space-x-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                location.pathname === item.path 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className={`${isSidebarOpen ? 'block' : 'hidden'} transition-all duration-300`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-2 right-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-reverse space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className={`${isSidebarOpen ? 'block' : 'hidden'} transition-all duration-300`}>
              خروج
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-reverse space-x-4">
            <h2 className="text-xl font-bold text-gray-800">
              {filteredMenuItems.find(item => item.path === location.pathname)?.label || 'پنل مدیریت'}
            </h2>
          </div>
          <div className="flex items-center space-x-reverse space-x-4">
            <div className="flex items-center space-x-reverse space-x-2">
              <span className="text-sm text-gray-600">خوش آمدید</span>
              <span className="font-bold text-gray-800">{username}</span>
              <span className={`px-2 py-1 rounded-full text-xs text-white ${getRoleColor(userRole)}`}>
                {getRoleLabel(userRole)}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
