import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useSupabase';
import { supabase } from '../../lib/supabase';
import { Crown, User, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await signIn(formData.email, formData.password);
      
      if (error) {
        setError('ایمیل یا رمز عبور اشتباه است');
        return;
      }

      if (data.user) {
        // Check user role
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('role, status')
          .eq('id', data.user.id)
          .maybeSingle();

        if (!profile || profile.status !== 'active') {
          setError('حساب کاربری غیرفعال است');
          return;
        }

        if (profile.role !== 'admin') {
          setError('شما دسترسی به پنل مدیریت ندارید');
          return;
        }

        // ذخیره اطلاعات کاربر در localStorage
        localStorage.setItem('adminUser', JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          role: profile.role,
          status: profile.status,
          username: profile.username || 'admin',
          fullName: profile.full_name || 'مدیر آترین پک'
        }));

        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('خطا در ورود. لطفاً مجدداً تلاش کنید.');
    } finally {
      setIsLoading(false);
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
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl animate-bounce-in">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-bold mb-2">ایمیل</label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="ایمیل خود را وارد کنید"
                required
                disabled={isLoading}
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
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-reverse space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>در حال ورود...</span>
              </div>
            ) : (
              'ورود به پنل'
            )}
          </button>
        </form>


        {/* Back to Site */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-amber-600 hover:text-amber-800 font-bold transition-colors flex items-center justify-center space-x-reverse space-x-2 mx-auto"
          >
            <ArrowRight className="w-4 h-4" />
            <span>بازگشت به سایت</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;