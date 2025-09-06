import React, { useState } from 'react';
import { Upload, X, ImageIcon, Plus, Download, ChevronLeft, ChevronRight } from 'lucide-react';

interface MultipleImageUploadProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
  maxSizePerImage?: number; // in MB
  existingImages?: string[];
  onExistingImageRemove?: (index: number) => void;
  disabled?: boolean;
  title?: string;
  allowDownload?: boolean;
}

const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  images,
  onImagesChange,
  maxImages = 5,
  maxSizePerImage = 5,
  existingImages = [],
  onExistingImageRemove,
  disabled = false,
  title,
  allowDownload = false
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert(`فایل ${file.name} یک تصویر نیست!`);
        return false;
      }
      
      // Check file size
      if (file.size > maxSizePerImage * 1024 * 1024) {
        alert(`فایل ${file.name} بیشتر از ${maxSizePerImage} مگابایت است!`);
        return false;
      }
      
      return true;
    });

    const totalImages = images.length + existingImages.length;
    const remainingSlots = maxImages - totalImages;
    const filesToAdd = validFiles.slice(0, remainingSlots);

    if (filesToAdd.length < validFiles.length) {
      alert(`فقط ${filesToAdd.length} تصویر اضافه شد. حداکثر ${maxImages} تصویر مجاز است.`);
    }

    onImagesChange([...images, ...filesToAdd]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
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

  const removeNewImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const goToNext = () => {
    const totalImages = existingImages.length + images.length;
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  };

  const goToPrevious = () => {
    const totalImages = existingImages.length + images.length;
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
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

  const getCurrentImageUrl = () => {
    const totalExisting = existingImages.length;
    
    if (currentIndex < totalExisting) {
      return existingImages[currentIndex] || '';
    } else {
      const newImageIndex = currentIndex - totalExisting;
      const newImage = images[newImageIndex];
      return newImage ? URL.createObjectURL(newImage) : '';
    }
  };

  const totalImages = images.length + existingImages.length;
  const canAddMore = totalImages < maxImages && !disabled;

  return (
    <>
      <div className="space-y-6">
        {/* Upload Area */}
        {canAddMore && (
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
            <p className="text-gray-600 mb-2">تصاویر را بکشید و رها کنید</p>
            <p className="text-sm text-gray-500 mb-4">
              یا کلیک کنید تا فایل انتخاب کنید (PNG/JPG، حداکثر {maxSizePerImage}MB)
            </p>
            <p className="text-xs text-gray-400 mb-4">
              {totalImages} از {maxImages} تصویر انتخاب شده
            </p>
            
            <input 
              type="file" 
              accept="image/png,image/jpeg,image/jpg,image/webp" 
              multiple
              onChange={handleFileSelect}
              className="hidden" 
              id="multiple-image-upload"
              disabled={disabled}
            />
            <label 
              htmlFor="multiple-image-upload"
              className={`inline-flex items-center space-x-reverse space-x-2 px-6 py-3 rounded-xl font-bold transition-colors duration-300 ${
                disabled 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
              }`}
            >
              <Plus className="w-5 h-5" />
              <span>انتخاب تصاویر</span>
            </label>
          </div>
        )}

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div>
            <h4 className="text-lg font-bold text-gray-700 mb-4">تصاویر فعلی:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {existingImages.map((image, index) => (
                <div key={`existing-${index}`} className="relative group">
                  <img 
                    src={image} 
                    alt={`تصویر فعلی ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow-md cursor-pointer"
                    onClick={() => openModal(index)}
                  />
                  {onExistingImageRemove && !disabled && (
                    <button
                      type="button"
                      onClick={() => onExistingImageRemove(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-lg opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    فعلی {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Images */}
        {images.length > 0 && (
          <div>
            <h4 className="text-lg font-bold text-gray-700 mb-4">تصاویر جدید:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {images.map((image, index) => (
                <div key={`new-${index}`} className="relative group">
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt={`تصویر جدید ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow-md cursor-pointer"
                    onClick={() => openModal(existingImages.length + index)}
                  />
                  {!disabled && (
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                    جدید {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <img
              src={getCurrentImageUrl()}
              alt={title || `تصویر ${currentIndex + 1}`}
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
            {allowDownload && (
              <button
                onClick={() => downloadImage(getCurrentImageUrl())}
                className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all duration-300"
              >
                <Download className="w-6 h-6" />
              </button>
            )}

            {/* Navigation in Modal */}
            {totalImages > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Image Counter in Modal */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full font-bold">
                  {currentIndex + 1} / {totalImages}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MultipleImageUpload;