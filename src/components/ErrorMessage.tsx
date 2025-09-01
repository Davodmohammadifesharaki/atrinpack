import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-2xl" dir="rtl">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h3 className="text-xl font-black text-red-800 mb-2">خطا در بارگذاری</h3>
      <p className="text-red-600 text-center mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 transition-colors duration-300 flex items-center space-x-reverse space-x-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span>تلاش مجدد</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;