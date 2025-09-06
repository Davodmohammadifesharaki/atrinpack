import React, { useState } from 'react';
import { Upload, X, ImageIcon, Eye, Download } from 'lucide-react';

interface SingleImageUploadProps {
  image: File | null;
  onImageChange: (image: File | null) => void;
  maxSizeInMB?: number;
  existingImageUrl?: string;
  onExistingImageRemove?: () => void;
  disabled?: boolean;
  title?: string;
  description?: string;
  acceptedFormats?: string;
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  image,
  onImageChange,
  maxSizeInMB = 5,
  existingImageUrl,
  onExistingImageRemove,
  disabled = false,
  title = "آپلود تصویر",
  description = "تصویر را بکشید و رها کنید یا کلیک کنید",
  acceptedFormats = "image/png,image/jpeg,image/jpg,image/webp"
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      alert(`فایل ${file.name} یک تصویر نیست!`);
      return;
    }
    
    // Check file size
    if (file.size > maxSizeInMB * 1024 * 1024) {
      alert(`فایل ${file.name} بیشتر از ${maxSizeInMB} مگابایت است!`);
      return;
    }
    
    onImageChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeImage = () => {
    onImageChange(null);
  };

  const removeExistingImage = () => {
    if (onExistingImageRemove) {
      onExistingImageRemove();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const getCurrentImageUrl = () => {
    if (image) {
      return URL.createObjectURL(image);
    }
    return existingImageUrl || '';
  };

  const downloadImage = (imageUrl: string) => {
    if (!imageUrl) return;
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasImage = image || existingImageUrl;

  return (
    <>
      <div className="space-y-4">
        {/* Upload Area */}
        {!hasImage && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              dragOver 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">{description}</p>
            <p className="text-sm text-gray-500 mb-4">
              (PNG/JPG/WebP، حداکثر {maxSizeInMB}MB)
            </p>
            
            <input 
              type="file" 
              accept={acceptedFormats}
              onChange={handleFileSelect}
              className="hidden" 
              id="single-image-upload"
              disabled={disabled}
            />
            <label 
              htmlFor="single-image-upload"
              className={`inline-flex items-center space-x-reverse space-x-2 px-6 py-3 rounded-xl font-bold transition-colors duration-300 ${
                disabled 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
              }`}
            >
              <Upload className="w-5 h-5" />
              <span>انتخاب تصویر</span>
            </label>
          </div>
        )}

        {/* Image Preview */}
        {hasImage && (
          <div className="relative group">
            <img 
              src={getCurrentImageUrl()} 
              alt={title}
              className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer"
              onClick={openModal}
            />
            
            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                type="button"
                onClick={openModal}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
              
              {!disabled && (
                <button
                  type="button"
                  onClick={image ? removeImage : removeExistingImage}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Image Type Badge */}
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              {image ? 'جدید' : 'فعلی'}
            </div>

            {/* Replace Button */}
            {!disabled && (
              <div className="absolute bottom-2 right-2">
                <input 
                  type="file" 
                  accept={acceptedFormats}
                  onChange={handleFileSelect}
                  className="hidden" 
                  id="replace-image-upload"
                />
                <label 
                  htmlFor="replace-image-upload"
                  className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  تغییر
                </label>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Full Screen Modal */}
      {isModalOpen && hasImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <img
              src={getCurrentImageUrl()}
              alt={title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Download Button */}
            <button
              onClick={() => downloadImage(getCurrentImageUrl())}
              className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all duration-300"
            >
              <Download className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleImageUpload;