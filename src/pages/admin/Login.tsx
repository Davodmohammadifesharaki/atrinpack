import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, User, Lock, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // نمونه احراز هویت ساده
    const users = [
      { username: 'admin', password: 'admin123', role: 'admin' },
      { username: 'editor', password: 'editor123', role: 'editor' },
      { username: 'viewer', password: 'viewer123', role: 'viewer' }
    ];

    const user = users.find(u => u.username === formData.username && u.password === formData.password);
    
    if (user) {
      localStorage.setItem('adminUser', JSON.stringify(user));
      navigate('/admin/dashboard');
    } else {
      setError('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-black text-gray-800 mb-2">پنل مدیریت</h1>
          <p className="text-gray-600">آترین پک</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-bold mb-2">نام کاربری</label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="نام کاربری خود را وارد کنید"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">رمز عبور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pr-10 pl-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="رمز عبور خود را وارد کنید"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            ورود به پنل
          </button>
        </form>

        {/* Demo Accounts */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <h3 className="text-sm font-bold text-gray-700 mb-3">حساب‌های نمونه:</h3>
          <div className="space-y-2 text-xs text-gray-600">
            <div>مدیر کل: admin / admin123</div>
            <div>ویرایشگر: editor / editor123</div>
            <div>نمایشگر: viewer / viewer123</div>
          </div>
        </div>

        {/* Back to Site */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-amber-600 hover:text-amber-800 font-bold transition-colors"
          >
            بازگشت به سایت
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;