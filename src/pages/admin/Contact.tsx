import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { useContactMessages } from '../../hooks/useSupabase';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  Save,
  Edit,
  Eye,
  Trash2
} from 'lucide-react';

const AdminContact = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { messages, loading, error, refetch } = useContactMessages();
  const [contactData, setContactData] = useState({
    phones: ['021-12345678', '09123456789'],
    emails: ['info@atrinpack.com', 'sales@atrinpack.com'],
    address: 'تهران، خیابان کریمخان، پلاک 123',
    workingHours: {
      weekdays: 'شنبه تا پنج‌شنبه: 8:00 - 18:00',
      friday: 'جمعه: تعطیل'
    },
    socialMedia: {
      whatsapp: 'https://wa.me/989123456789',
      instagram: 'https://instagram.com/atrinpack',
      facebook: 'https://facebook.com/atrinpack',
      linkedin: 'https://linkedin.com/company/atrinpack'
    },
    mapLocation: 'https://maps.google.com/?q=35.6892,51.3890'
  });


  const handleSave = () => {
    console.log('Contact data saved:', contactData);
    setIsEditing(false);
    alert('اطلاعات تماس با موفقیت ذخیره شد!');
  };

  const handleChange = (field: string, value: string) => {
    setContactData({
      ...contactData,
      [field]: value
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-800">مدیریت اطلاعات تماس</h1>
            <p className="text-gray-600 mt-2">ویرایش اطلاعات تماس و پیام‌های دریافتی</p>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-reverse space-x-2"
          >
            <Edit className="w-5 h-5" />
            <span>{isEditing ? 'لغو ویرایش' : 'ویرایش اطلاعات'}</span>
          </button>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-black text-gray-800 mb-6">اطلاعات تماس</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">شماره تلفن‌ها</label>
              {isEditing ? (
                <div className="space-y-2">
                  {contactData.phones.map((phone, index) => (
                    <input
                      key={index}
                      type="text"
                      value={phone}
                      onChange={(e) => {
                        const newPhones = [...contactData.phones];
                        newPhones[index] = e.target.value;
                        setContactData({...contactData, phones: newPhones});
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {contactData.phones.map((phone, index) => (
                    <div key={index} className="flex items-center space-x-reverse space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span>{phone}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">ایمیل‌ها</label>
              {isEditing ? (
                <div className="space-y-2">
                  {contactData.emails.map((email, index) => (
                    <input
                      key={index}
                      type="email"
                      value={email}
                      onChange={(e) => {
                        const newEmails = [...contactData.emails];
                        newEmails[index] = e.target.value;
                        setContactData({...contactData, emails: newEmails});
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {contactData.emails.map((email, index) => (
                    <div key={index} className="flex items-center space-x-reverse space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-4 h-4 text-green-600" />
                      <span>{email}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-bold mb-2">آدرس</label>
              {isEditing ? (
                <textarea
                  value={contactData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={2}
                />
              ) : (
                <div className="flex items-center space-x-reverse space-x-2 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>{contactData.address}</span>
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors duration-300 flex items-center space-x-reverse space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>ذخیره تغییرات</span>
              </button>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-black text-gray-800 mb-6">پیام‌های دریافتی</h2>
          
          {loading ? (
            <LoadingSpinner message="در حال بارگذاری پیام‌ها..." />
          ) : error ? (
            <ErrorMessage message={error} onRetry={refetch} />
          ) : (
          <div className="space-y-4">
            {(messages || []).map((message) => (
              <div key={message.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-reverse space-x-4">
                      <h3 className="text-lg font-bold text-gray-800">{message.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        message.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {message.status === 'new' ? 'جدید' : message.status === 'replied' ? 'پاسخ داده شده' : 'بسته شده'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>ایمیل: {message.email}</div>
                      <div>تلفن: {message.phone || 'ندارد'}</div>
                      <div>موضوع: {message.subject}</div>
                      <div>تاریخ: {new Date(message.created_at).toLocaleDateString('fa-IR')}</div>
                    </div>
                    <p className="text-gray-700 mt-3">{message.message}</p>
                  </div>

                  <div className="flex items-center space-x-reverse space-x-2">
                    <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {(!messages || messages.length === 0) && (
              <div className="text-center py-16">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">پیامی دریافت نشده</h3>
                <p className="text-gray-500">هنوز پیامی از طریق فرم تماس دریافت نشده است</p>
              </div>
            )}
          </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminContact;