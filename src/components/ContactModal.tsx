
import React from 'react';
import { useSettings } from '../hooks/useSupabase';
import { useSettings } from '../hooks/useSupabase';
import { X, Phone, Mail, MessageCircle, Instagram, Facebook, Linkedin } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { settings: contactSettings } = useSettings('contact_info');
  
  const contactInfo = contactSettings || {
    phones: ['021-12345678', '09123456789'],
    emails: ['info@atrinpack.com'],
    socialMedia: {
      whatsapp: '',
      instagram: '',
      facebook: '',
      linkedin: ''
    }
  };

  const { settings: contactSettings } = useSettings('contact_info');
  
  const contactInfo = contactSettings || {
    phones: ['021-12345678', '09123456789'],
    emails: ['info@atrinpack.com'],
    socialMedia: {
      whatsapp: '',
      instagram: '',
      facebook: '',
      linkedin: ''
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-2xl font-black text-gray-800">برای استعلام قیمت تماس بگیرید</h3>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-300"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Contact Methods */}
        <div className="p-6 space-y-4">
          <p className="text-gray-600 text-center mb-6">
            برای دریافت قیمت دقیق و مشاوره رایگان از راه‌های زیر استفاده کنید:
          </p>

          {/* Phone */}
          <a
            href={`tel:${contactInfo.phones?.[0]?.replace(/\s/g, '') || '+982112345678'}`}
            className="flex items-center space-x-reverse space-x-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-800">تماس تلفنی</div>
              <div className="text-blue-600 font-bold">{contactInfo.phones?.[0] || '021-12345678'}</div>
              <div className="text-sm text-gray-600">شنبه تا پنج‌شنبه، 8 تا 18</div>
            </div>
          </a>

          {/* Mobile */}
          <a
            href={`tel:${contactInfo.phones?.[1]?.replace(/\s/g, '') || '+989123456789'}`}
            className="flex items-center space-x-reverse space-x-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-800">تماس همراه</div>
              <div className="text-green-600 font-bold">{contactInfo.phones?.[1] || '09123456789'}</div>
              <div className="text-sm text-gray-600">پاسخگویی 24 ساعته</div>
            </div>
          </a>

          {/* WhatsApp */}
          {contactInfo.socialMedia?.whatsapp && (
            <a
              href={contactInfo.socialMedia.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-reverse space-x-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-800">واتساپ</div>
                <div className="text-green-600 font-bold">پاسخگویی سریع</div>
                <div className="text-sm text-gray-600">24 ساعته</div>
              </div>
            </a>
          )}
            </a>
          )}

          {/* Email */}
          <a
            href={`mailto:${contactInfo.emails?.[0] || 'info@atrinpack.com'}`}
            className="flex items-center space-x-reverse space-x-4 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-800">ایمیل</div>
              <div className="text-purple-600 font-bold">{contactInfo.emails?.[0] || 'info@atrinpack.com'}</div>
              <div className="text-sm text-gray-600">پاسخ در کمتر از 2 ساعت</div>
            </div>
          </a>

          {/* Social Media */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-center mb-4">شبکه‌های اجتماعی:</p>
            <div className="flex justify-center space-x-reverse space-x-4">
              {contactInfo.socialMedia?.instagram && (
                <a
                  href={contactInfo.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  <Instagram className="w-6 h-6 text-white" />
                </a>
              )}
              {contactInfo.socialMedia?.facebook && (
                <a
                  href={contactInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  <Facebook className="w-6 h-6 text-white" />
                </a>
              )}
              {contactInfo.socialMedia?.linkedin && (
                <a
                  href={contactInfo.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  <Linkedin className="w-6 h-6 text-white" />
                </a>
              )}
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  <Linkedin className="w-6 h-6 text-white" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
