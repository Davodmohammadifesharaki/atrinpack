import React, { useState } from 'react';
import CustomerLayout from '../../components/CustomerLayout';
import { 
  User, 
  Save, 
  Upload, 
  Eye, 
  EyeOff,
  Mail,
  Lock,
  Camera,
  Phone,
  Building,
  MapPin
} from 'lucide-react';

const CustomerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'علی رضایی',
    username: 'ali.rezaei',
    email: 'customer@example.com',
    phone: '09111222333',
    company: 'شرکت پارس عطر',
    address: 'تهران، خیابان ولیعصر، پلاک 456',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    avatar: null as File | null
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      alert('رمز عبور جدید و تکرار آن مطابقت ندارند!');
      return;
    }

    console.log('Profile updated:', profileData);
    alert('پروفایل با موفقیت بروزرسانی شد!');
    setIsEditing(false);
    setProfileData({
      ...profileData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size <= 2 * 1024 * 1024) { // 2MB limit
        setProfileData({...profileData, avatar: file});
      } else {
        alert('حجم فایل نباید بیشتر از ۲ مگابایت باشد!');
      }
    }
  };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-800">پروفایل من</h1>
            <p className="text-gray-600 mt-2">مدیریت اطلاعات شخصی</p>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-reverse space-x-2"
          >
            <User className="w-5 h-5" />
            <span>{isEditing ? 'لغو ویرایش' : 'ویرایش پروفایل'}</span>
          </button>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSave} className="space-y-8">
            {/* Avatar Section */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {profileData.avatar ? (
                    <img 
                      src={URL.createObjectURL(profileData.avatar)} 
                      alt="آواتار" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User className="w-16 h-16 text-blue-600" />
                  )}
                </div>
                {isEditing && (
                  <div className="absolute bottom-0 right-0">
                    <input 
                      type="file" 
                      accept="image/png,image/jpeg" 
                      onChange={handleAvatarUpload}
                      className="hidden" 
                      id="avatar-upload"
                    />
                    <label 
                      htmlFor="avatar-upload"
                      className="bg-blue-500 text-white p-3 rounded-full cursor-pointer hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
                    >
                      <Camera className="w-5 h-5" />
                    </label>
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-black text-gray-800">{profileData.fullName}</h2>
              <p className="text-gray-600">مشتری آترین پک</p>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">نام و نام خانوادگی</label>
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">نام کاربری</label>
                <input
                  type="text"
                  value={profileData.username}
                  onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">ایمیل</label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    disabled={!isEditing}
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">شماره تماس</label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    disabled={!isEditing}
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">نام شرکت</label>
                <div className="relative">
                  <Building className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={profileData.company}
                    onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                    disabled={!isEditing}
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">آدرس</label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    disabled={!isEditing}
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Password Change */}
            {isEditing && (
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-black text-gray-800 mb-6">تغییر رمز عبور</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">رمز عبور فعلی</label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={profileData.currentPassword}
                        onChange={(e) => setProfileData({...profileData, currentPassword: e.target.value})}
                        className="w-full pr-10 pl-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="رمز فعلی"
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

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">رمز عبور جدید</label>
                    <input
                      type="password"
                      value={profileData.newPassword}
                      onChange={(e) => setProfileData({...profileData, newPassword: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="رمز جدید"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">تکرار رمز جدید</label>
                    <input
                      type="password"
                      value={profileData.confirmPassword}
                      onChange={(e) => setProfileData({...profileData, confirmPassword: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="تکرار رمز جدید"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors duration-300 flex items-center space-x-reverse space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>ذخیره تغییرات</span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default CustomerProfile;