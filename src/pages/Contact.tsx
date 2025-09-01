import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageCircle,
  Send,
  User,
  Building,
  Instagram,
  Facebook,
  Linkedin
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('پیام شما با موفقیت ارسال شد. در اسرع وقت با شما تماس خواهیم گرفت.');
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  // اطلاعات تماس (قابل تنظیم توسط ادمین)
  const contactInfo = {
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
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-black mb-4">تماس با ما</h1>
            <p className="text-xl text-green-100">ما آماده پاسخگویی به سوالات شما هستیم</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-black text-gray-800 mb-6">اطلاعات تماس</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-reverse space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">تلفن تماس</h3>
                    {contactInfo.phones.map((phone, index) => (
                      <p key={index} className="text-gray-600">
                        <a href={`tel:${phone}`} className="hover:text-blue-600">{phone}</a>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-start space-x-reverse space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">ایمیل</h3>
                    {contactInfo.emails.map((email, index) => (
                      <p key={index} className="text-gray-600">
                        <a href={`mailto:${email}`} className="hover:text-green-600">{email}</a>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-start space-x-reverse space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">آدرس</h3>
                    <p className="text-gray-600">{contactInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-reverse space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">ساعات کاری</h3>
                    <p className="text-gray-600">{contactInfo.workingHours.weekdays}</p>
                    <p className="text-gray-600">{contactInfo.workingHours.friday}</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-bold text-gray-800 mb-4">شبکه‌های اجتماعی</h4>
                <div className="flex space-x-reverse space-x-4">
                  <a 
                    href={contactInfo.socialMedia.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  >
                    <MessageCircle className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href={contactInfo.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href={contactInfo.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  >
                    <Facebook className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href={contactInfo.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* دکمه مشاوره رایگان */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-8 rounded-2xl text-white">
              <h3 className="text-xl font-black mb-4">مشاوره رایگان</h3>
              <p className="mb-6 text-amber-100">برای مشاوره رایگان و استعلام قیمت</p>
              
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="w-full bg-white text-amber-600 py-3 rounded-xl font-bold hover:bg-amber-50 transition-colors duration-300 flex items-center justify-center space-x-reverse space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>مشاوره رایگان</span>
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-black text-gray-800 mb-6">فرم تماس</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      نام و نام خانوادگی *
                    </label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="نام خود را وارد کنید"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      نام شرکت
                    </label>
                    <div className="relative">
                      <Building className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="نام شرکت (اختیاری)"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      شماره تماس *
                    </label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="09123456789"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      ایمیل *
                    </label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    موضوع *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="price-inquiry">استعلام قیمت</option>
                    <option value="product-info">اطلاعات محصول</option>
                    <option value="consultation">مشاوره</option>
                    <option value="complaint">شکایت</option>
                    <option value="suggestion">پیشنهاد</option>
                    <option value="other">سایر</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    پیام *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    placeholder="پیام خود را اینجا بنویسید..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-reverse space-x-2"
                >
                  <Send className="w-6 h-6" />
                  <span>ارسال پیام</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* نقشه تعاملی */}
        <div className="mt-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-black text-gray-800 mb-6">موقعیت ما روی نقشه</h2>
            <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="text-center text-gray-500">
                <MapPin className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg font-bold">نقشه تعاملی</p>
                <p className="text-sm mb-4">{contactInfo.address}</p>
                <a
                  href={contactInfo.mapLocation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300 inline-flex items-center space-x-reverse space-x-2"
                >
                  <MapPin className="w-5 h-5" />
                  <span>مشاهده در نقشه</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

export default Contact;