import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { 
  Tags, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X
} from 'lucide-react';

const AdminCategories = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    type: 'product',
    description: ''
  });

  // دسته‌بندی‌های موجود
  const categories = [
    { id: 1, name: 'شیشه و بطری', type: 'product', description: 'انواع شیشه‌ها و بطری‌های عطر', count: 45 },
    { id: 2, name: 'پمپ و اسپری', type: 'product', description: 'پمپ‌های اسپری و مه‌پاش', count: 32 },
    { id: 3, name: 'درپوش', type: 'product', description: 'انواع درپوش‌های هنری', count: 28 },
    { id: 4, name: 'اسانس', type: 'product', description: 'اسانس‌های طبیعی و مصنوعی', count: 15 },
    { id: 5, name: 'پلمپر', type: 'product', description: 'دستگاه‌های پلمپر', count: 8 },
    { id: 6, name: 'اخبار تولید', type: 'news', description: 'اخبار مربوط به تولید', count: 12 },
    { id: 7, name: 'گواهینامه‌ها', type: 'news', description: 'اخبار گواهینامه‌ها', count: 5 },
    { id: 8, name: 'نمایشگاه‌ها', type: 'news', description: 'اخبار نمایشگاه‌ها', count: 8 }
  ];

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New category added:', newCategory);
    alert('دسته‌بندی جدید با موفقیت اضافه شد!');
    setNewCategory({ name: '', type: 'product', description: '' });
    setIsAddModalOpen(false);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
  };

  const handleSaveEdit = () => {
    console.log('Category updated:', editingCategory);
    alert('دسته‌بندی با موفقیت بروزرسانی شد!');
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: number) => {
    if (confirm('آیا از حذف این دسته‌بندی اطمینان دارید؟')) {
      console.log('Category deleted:', id);
      alert('دسته‌بندی با موفقیت حذف شد!');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-800">مدیریت دسته‌بندی‌ها</h1>
            <p className="text-gray-600 mt-2">مدیریت دسته‌بندی‌های محصولات و اخبار</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-600 transition-colors duration-300 flex items-center space-x-reverse space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>افزودن دسته‌بندی</span>
          </button>
        </div>

        {/* Categories List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Categories */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center">
              <Tags className="w-6 h-6 ml-2 text-blue-500" />
              دسته‌بندی محصولات
            </h2>
            
            <div className="space-y-4">
              {categories.filter(cat => cat.type === 'product').map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-xl p-4">
                  {editingCategory?.id === category.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editingCategory.name}
                        onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        value={editingCategory.description}
                        onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveEdit}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center space-x-reverse space-x-1"
                        >
                          <Save className="w-4 h-4" />
                          <span>ذخیره</span>
                        </button>
                        <button
                          onClick={() => setEditingCategory(null)}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-400 transition-colors flex items-center space-x-reverse space-x-1"
                        >
                          <X className="w-4 h-4" />
                          <span>لغو</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-800">{category.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                        <span className="text-xs text-blue-600 font-bold">{category.count} محصول</span>
                      </div>
                      <div className="flex items-center space-x-reverse space-x-2">
                        <button 
                          onClick={() => handleEditCategory(category)}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteCategory(category.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* News Categories */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center">
              <Tags className="w-6 h-6 ml-2 text-green-500" />
              دسته‌بندی اخبار
            </h2>
            
            <div className="space-y-4">
              {categories.filter(cat => cat.type === 'news').map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800">{category.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                      <span className="text-xs text-green-600 font-bold">{category.count} خبر</span>
                    </div>
                    <div className="flex items-center space-x-reverse space-x-2">
                      <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Category Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-2xl font-black text-gray-800 mb-6">افزودن دسته‌بندی جدید</h3>
              
              <form onSubmit={handleAddCategory} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">نام دسته‌بندی</label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">نوع</label>
                  <select
                    value={newCategory.type}
                    onChange={(e) => setNewCategory({...newCategory, type: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="product">محصولات</option>
                    <option value="news">اخبار</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">توضیحات</label>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-500 text-white py-3 rounded-xl font-bold hover:bg-purple-600 transition-colors duration-300"
                  >
                    افزودن
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-400 transition-colors duration-300"
                  >
                    انصراف
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;