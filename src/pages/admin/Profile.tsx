import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useAuth } from '../../hooks/useSupabase';
import { uploadImage, deleteImage } from '../../utils/imageUpload';
import { supabase } from '../../lib/supabase';
import { 
  User, 
  Save, 
  Upload, 
  Eye, 
  EyeOff,
  Mail,
  Lock,
  Camera,
  X
} from 'lucide-react';

const AdminProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    company: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    avatarUrl: '',
    avatar: null as File | null
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profile) {
          setProfileData({
            fullName: profile.full_name || '',
            username: profile.username || '',
            email: user.email || '',
            phone: profile.phone || '',
            company: profile.company || '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            avatarUrl: profile.avatar_url || '',
            avatar: null
          });
        }
      }
    };

    fetchProfile();
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      alert('رمز عبور جدید و تکرار آن مطابقت ندارند!');
      return;
    }

    setIsSubmitting(true);
    
    try {
      let avatarUrl = profileData.avatarUrl;

      // Upload new avatar if selected
      if (profileData.avatar) {
        // Delete old avatar if exists
        if (profileData.avatarUrl) {
          await deleteImage(profileData.avatarUrl, 'avatars');
        }

        const uploadedUrl = await uploadImage(profileData.avatar, 'avatars');
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        }
      }

      // Update profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({
          full_name: profileData.fullName,
          username: profileData.username,
          phone: profileData.phone,
          company: profileData.company,
          avatar_url: avatarUrl
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Update password if provided
      if (profileData.newPassword) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: profileData.newPassword
        });

        if (passwordError) throw passwordError;
      }

      // Update localStorage
      const userData = JSON.parse(localStorage.getItem('adminUser') || '{}');
      localStorage.setItem('adminUser', JSON.stringify({
        ...userData,
        fullName: profileData.fullName,
        username: profileData.username,
        avatarUrl: avatarUrl
      }));

      alert('پروفایل با موفقیت بروزرسانی شد!');
      setIsEditing(false);
      setProfileData({
        ...profileData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        avatarUrl: avatarUrl,
        avatar: null
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('خطا در بروزرسانی پروفایل');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]; justify-between mb-4">
              <label className="block text-gray-700 font-bold">دستاوردهای ما</label>
              <button
                onClick={addAchievement}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center space-x-reverse space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>افزودن دستاورد</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.achievements.map((achievement, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-gray-600 font-bold mb-2">عدد</label>
                      <input
                        type="text"
                        value={achievement.number}
                        onChange={(e) => updateAchievement(index, 'number', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="مثال: ۱۵+"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-600 font-bold mb-2">عنوان</label>
                      <input
                        type="text"
                        value={achievement.title}
                        onChange={(e) => updateAchievement(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="عنوان دستاورد"
                      />
                    </div>
                    <button
                      onClick={() => removeAchievement(index)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors mt-6"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-gray-700 font-bold">گواهینامه‌ها و افتخارات</label>
              <button
                onClick={addCertification}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center space-x-reverse space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>افزودن گواهینامه</span>
              </button>
            </div>
            <div className="space-y-4">
              {formData.certifications.map((cert, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-600 font-bold mb-2">عنوان</label>
                      <input
                        type="text"
                        value={cert.title}
                        onChange={(e) => updateCertification(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="عنوان گواهینامه"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-bold mb-2">توضیحات</label>
                      <input
                        type="text"
                        value={cert.description}
                        onChange={(e) => updateCertification(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="توضیحات گواهینامه"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 font-bold mb-2">آیکون</label>
                      <div className="flex items-center gap-2">
                        <select
                          value={cert.icon}
                          onChange={(e) => updateCertification(index, 'icon', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {availableIcons.map(icon => (
                            <option key={icon.name} value={icon.name}>{icon.name}</option>
                          ))}
                        </select>
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          {React.createElement(getIconComponent(cert.icon), { className: "w-5 h-5 text-blue-600" })}
                        </div>
                        <button
                          onClick={() => removeCertification(index)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Catalog Upload */}
          <div>
            <label className="block text-gray-700 font-bold mb-4">کاتالوگ محصولات (PDF)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">فایل PDF کاتالوگ را بکشید و رها کنید</p>
              <p className="text-sm text-gray-500 mb-4">یا کلیک کنید تا فایل انتخاب کنید (PDF، حداکثر ۱۰MB)</p>
              <input 
                type="file" 
                accept="application/pdf" 
                onChange={(e) => setCatalogFile(e.target.files?.[0] || null)}
                className="hidden" 
                id="catalog-upload"
              />
              <label 
                htmlFor="catalog-upload"
                className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300 cursor-pointer inline-block"
              >
                انتخاب کاتالوگ
              </label>
            </div>

            {catalogFile && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center space-x-reverse space-x-3">
                  <FileText className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-bold text-green-800">{catalogFile.name}</div>
                    <div className="text-sm text-green-600">
                      {(catalogFile.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  </div>
                </div>
              </div>
            )}

            {formData.catalogUrl && !catalogFile && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-reverse space-x-3">
                    <FileText className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="font-bold text-blue-800">کاتالوگ فعلی</div>
                      <div className="text-sm text-blue-600">فایل آپلود شده موجود است</div>
                    </div>
                  </div>
                  <a
                    href={formData.catalogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center space-x-reverse space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>دانلود</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AboutSettings;