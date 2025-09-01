import React from 'react';
import { Crown } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'در حال بارگذاری...', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8" dir="rtl">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin`}></div>
        <Crown className={`absolute inset-0 m-auto ${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'} text-amber-600`} />
      </div>
      <p className="text-gray-600 mt-4 font-bold">{message}</p>
    </div>
  );
};

export default LoadingSpinner;