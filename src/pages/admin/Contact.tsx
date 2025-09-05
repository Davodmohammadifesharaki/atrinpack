import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { useContactMessages, useSettings, settingsOperations } from '../../hooks/useSupabase';
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
  Trash2,
  Plus,
  X,
  MessageCircle,
  Building
} from 'lucide-react';

const AdminContact = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { messages, loading, error, refetch } = useContactMessages();
  const { settings: contactSettings, loading: settingsLoading, refetch: refetchSettings } = useSettings('contact_info');
  
  const [contactData, setContactData] = useState({
    phones: [''],
    emails: [''],
    addresses: [{ name: '', address: '', mapUrl: '' }],
    workingHours: {
      weekdays: 'شنبه تا پنج‌شنبه: 8:00 - 18:00',
      friday: 'جمعه: تعطیل'
    },
    socialMedia: {
      whatsapp: '',
      instagram: '',
      facebook: '',
      linkedin: ''
    }
  });

  useEffect(() => {
    if (contactSettings && Object.keys(contactSettings).length > 0) {
      setContactData({
        phones: contactSettings.phones || [''],
        emails: contactSettings.emails || [''],
        addresses: contactSettings.addresses || [{ name: '', address: '', mapUrl: '' }],
        workingHours: contactSettings.workingHours || {
          weekdays: 'شنبه تا پنج‌شنبه: 8:00 - 18:00',
          friday: 'جمعه: تعطیل'
        },
        socialMedia: contactSettings.socialMedia || {
          whatsapp: '',
          instagram: '',
          facebook: '',
          linkedin: ''
        }
      });
    }
  }, [contactSettings]);

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await settingsOperations.set('contact_info', contactData);
      if (error) throw error;

      alert('اطلاعات تماس با موفقیت ذخیره شد!');
      setIsEditing(false);
      refetchSettings();
    } catch (error) {
      console.error('Error saving contact info:', error);
      alert('خطا در ذخیره اطلاعات تماس');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addPhone = () => {
    setContactData({
      ...contactData,
      phones: [...contactData.phones, '']
    });
  };

  const removePhone = (index: number) => {
    setContactData({
      ...contactData,
      phones: contactData.phones.filter((_, i) => i !== index)
    });
  };

  const updatePhone = (index: number, value: string) => {
    const newPhones = [...contactData.phones];
    newPhones[index] = value;
    setContactData({...contactData, phones: newPhones});
  };

  const addEmail = () => {
    setContactData({
      ...contactData,
      emails: [...contactData.emails, '']
    });
  };

  const removeEmail = (index: number) => {
    setContactData({
      ...contactData,
      emails: contactData.emails.filter((_, i) => i !== index)
    });
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...contactData.emails];
    newEmails[index] = value;
    setContactData({...contactData, emails: newEmails});
  };

  const addAddress = () => {
    setContactData({
      ...contactData,
      addresses: [...contactData.addresses, { name: '', address: '', mapUrl: '' }]
    });
  };

  const removeAddress = (index: number) => {
    setContactData({
      ...contactData,
      addresses: contactData.addresses.filter((_, i) => i !== index)
    });
  };

  const updateAddress = (index: number, field: string, value: string) => {
    const newAddresses = [...contactData.addresses];
    newAddresses[index] = { ...newAddresses[index], [field]: value };
    setContactData({...contactData, addresses: newAddresses});
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('آیا از حذف این پیام اطمینان دارید؟')) return;
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      alert('پیام با موفقیت حذف شد!');
      refetch();
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('خطا در حذف پیام');
    }
  };

  const updateMessageStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      alert('وضعیت پیام تغییر کرد!');
      refetch();
    } catch (error) {
      console.error('Error updating message status:', error);
      alert('خطا در تغییر وضعیت پیام');
    }
  };

  if (settingsLoading) {
    return (
      <AdminLayout>
        <LoadingSpinner message="در حال بارگذاری تنظیمات..." />
      </AdminLayout>
    );
  }

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
          
          <div className="space-y-8">
            {/* Phone Numbers */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-gray-700 font-bold">شماره تلفن‌ها</label>
                {isEditing && (
                  <button
                    onClick={addPhone}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center space-x-reverse space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>افزودن</span>
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {contactData.phones.map((phone, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {isEditing ? (
                      <>
                        <div className="relative flex-1">
                          <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => updatePhone(index, e.target.value)}
                            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="شماره تلفن"
                          />
                        </div>
                        {contactData.phones.length > 1 && (
                          <button
                            onClick={() => removePhone(index)}
                            className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center space-x-reverse space-x-2 p-3 bg-gray-50 rounded-lg w-full">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <span>{phone}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Email Addresses */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-gray-700 font-bold">ایمیل‌ها</label>
                {isEditing && (
                  <button
                    onClick={addEmail}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center space-x-reverse space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>افزودن</span>
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {contactData.emails.map((email, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {isEditing ? (
                      <>
                        <div className="relative flex-1">
                          <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => updateEmail(index, e.target.value)}
                            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="آدرس ایمیل"
                          />
                        </div>
                        {contactData.emails.length > 1 && (
                          <button
                            onClick={() => removeEmail(index)}
                            className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center space-x-reverse space-x-2 p-3 bg-gray-50 rounded-lg w-full">
                        <Mail className="w-4 h-4 text-green-600" />
                        <span>{email}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Addresses */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-gray-700 font-bold">آدرس‌ها و شعب</label>
                {isEditing && (
                  <button
                    onClick={addAddress}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center space-x-reverse space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>افزودن شعبه</span>
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {contactData.addresses.map((address, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4">
                    {isEditing ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-gray-600 font-bold mb-2">نام شعبه</label>
                            <div className="relative">
                              <Building className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <input
                                type="text"
                                value={address.name}
                                onChange={(e) => updateAddress(index, 'name', e.target.value)}
                                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="نام شعبه (مثال: دفتر مرکزی)"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-gray-600 font-bold mb-2">لینک نقشه</label>
                            <input
                              type="url"
                              value={address.mapUrl}
                              onChange={(e) => updateAddress(index, 'mapUrl', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="https://maps.google.com/..."
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-600 font-bold mb-2">آدرس کامل</label>
                          <div className="flex items-center gap-3">
                            <div className="relative flex-1">
                              <MapPin className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                              <textarea
                                value={address.address}
                                onChange={(e) => updateAddress(index, 'address', e.target.value)}
                                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                rows={2}
                                placeholder="آدرس کامل شعبه"
                              />
                            </div>
                            {contactData.addresses.length > 1 && (
                              <button
                                onClick={() => removeAddress(index)}
                                className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {address.name && (
                          <div className="font-bold text-gray-800 flex items-center">
                            <Building className="w-4 h-4 ml-2 text-blue-600" />
                            {address.name}
                          </div>
                        )}
                        <div className="flex items-start space-x-reverse space-x-2 text-gray-600">
                          <MapPin className="w-4 h-4 mt-1 text-red-600" />
                          <span>{address.address}</span>
                        </div>
                        {address.mapUrl && (
                          <a
                            href={address.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm font-bold"
                          >
                            مشاهده در نقشه
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Working Hours */}
            <div>
              <label className="block text-gray-700 font-bold mb-4">ساعات کاری</label>
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 font-bold mb-2">روزهای کاری</label>
                    <input
                      type="text"
                      value={contactData.workingHours.weekdays}
                      onChange={(e) => setContactData({
                        ...contactData,
                        workingHours: { ...contactData.workingHours, weekdays: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-bold mb-2">جمعه</label>
                    <input
                      type="text"
                      value={contactData.workingHours.friday}
                      onChange={(e) => setContactData({
                        ...contactData,
                        workingHours: { ...contactData.workingHours, friday: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center space-x-reverse space-x-2 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>{contactData.workingHours.weekdays}</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-2 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>{contactData.workingHours.friday}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Social Media */}
            <div>
              <label className="block text-gray-700 font-bold mb-4">شبکه‌های اجتماعی</label>
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 font-bold mb-2">واتساپ</label>
                    <div className="relative">
                      <MessageCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="url"
                        value={contactData.socialMedia.whatsapp}
                        onChange={(e) => setContactData({
                          ...contactData,
                          socialMedia: { ...contactData.socialMedia, whatsapp: e.target.value }
                        })}
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://wa.me/989123456789"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-600 font-bold mb-2">اینستاگرام</label>
                    <div className="relative">
                      <Instagram className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="url"
                        value={contactData.socialMedia.instagram}
                        onChange={(e) => setContactData({
                          ...contactData,
                          socialMedia: { ...contactData.socialMedia, instagram: e.target.value }
                        })}
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://instagram.com/username"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-600 font-bold mb-2">فیسبوک</label>
                    <div className="relative">
                      <Facebook className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="url"
                        value={contactData.socialMedia.facebook}
                        onChange={(e) => setContactData({
                          ...contactData,
                          socialMedia: { ...contactData.socialMedia, facebook: e.target.value }
                        })}
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://facebook.com/page"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-600 font-bold mb-2">لینکدین</label>
                    <div className="relative">
                      <Linkedin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="url"
                        value={contactData.socialMedia.linkedin}
                        onChange={(e) => setContactData({
                          ...contactData,
                          socialMedia: { ...contactData.socialMedia, linkedin: e.target.value }
                        })}
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://linkedin.com/company/name"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-reverse space-x-4">
                  {contactData.socialMedia.whatsapp && (
                    <a
                      href={contactData.socialMedia.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    >
                      <MessageCircle className="w-6 h-6 text-white" />
                    </a>
                  )}
                  {contactData.socialMedia.instagram && (
                    <a
                      href={contactData.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    >
                      <Instagram className="w-6 h-6 text-white" />
                    </a>
                  )}
                  {contactData.socialMedia.facebook && (
                    <a
                      href={contactData.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    >
                      <Facebook className="w-6 h-6 text-white" />
                    </a>
                  )}
                  {contactData.socialMedia.linkedin && (
                    <a
                      href={contactData.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    >
                      <Linkedin className="w-6 h-6 text-white" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                disabled={isSubmitting}
                className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors duration-300 flex items-center space-x-reverse space-x-2 disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                <span>{isSubmitting ? 'در حال ذخیره...' : 'ذخیره تغییرات'}</span>
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
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-reverse space-x-4">
                      <h3 className="text-lg font-bold text-gray-800">{message.name}</h3>
                      <select
                        value={message.status}
                        onChange={(e) => updateMessageStatus(message.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-bold border-0 ${
                          message.status === 'new' ? 'bg-blue-100 text-blue-700' : 
                          message.status === 'replied' ? 'bg-green-100 text-green-700' : 
                          'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <option value="new">جدید</option>
                        <option value="replied">پاسخ داده شده</option>
                        <option value="closed">بسته شده</option>
                      </select>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center space-x-reverse space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>ایمیل: {message.email}</span>
                      </div>
                      {message.phone && (
                        <div className="flex items-center space-x-reverse space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>تلفن: {message.phone}</span>
                        </div>
                      )}
                      {message.company && (
                        <div className="flex items-center space-x-reverse space-x-2">
                          <Building className="w-4 h-4" />
                          <span>شرکت: {message.company}</span>
                        </div>
                      )}
                      <div>موضوع: {message.subject}</div>
                      <div>تاریخ: {new Date(message.created_at).toLocaleDateString('fa-IR')}</div>
                    </div>
                    <p className="text-gray-700 mt-3 bg-gray-50 p-3 rounded-lg">{message.message}</p>
                  </div>

                  <div className="flex items-center space-x-reverse space-x-2">
                    <button 
                      onClick={() => handleDeleteMessage(message.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
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