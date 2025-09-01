
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  image: string;
  price?: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  category, 
  image, 
  price,
  isNew = false,
  isFeatured = false
}) => {
  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {isNew && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              جدید
            </span>
          )}
          {isFeatured && (
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              ویژه
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleViewProduct}
              className="bg-white text-gray-800 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-reverse space-x-2"
            >
              <span>مشاهده</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2">
          <span className="text-amber-600 text-sm font-bold">{category}</span>
        </div>
        <h3 className="text-lg font-black text-gray-800 mb-3 line-clamp-2">{name}</h3>
        {price && (
          <div className="text-xl font-black text-gray-800">{price}</div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
