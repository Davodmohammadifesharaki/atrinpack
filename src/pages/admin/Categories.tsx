import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { useCategories, categoryOperations } from '../../hooks/useSupabase';
import { 
  Tags, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Package,
  Newspaper
} from 'lucide-react';

const AdminCategories = () => {
  const { categories, loading, error, refetch } = useCategories();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    type: 'product',
    description: ''
  });

  const productCategories = categories.filter(cat => cat.type === 'product');
  const newsCategories = categories.filter(cat => cat.type === 'news');

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await categoryOperations.create(newCategory);
      if (error) throw error;

      alert('دسته‌بندی جدید با موفقیت اضافه شد!');
      setNewCategory({ name: '', type: 'product', description: '' });
      setIsAddModalOpen(false);
      refetch();
    } catch (error) {
      console.error('Error adding category:', error);
      alert('خطا در افزودن دسته‌بندی');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory({ ...category });
  };

  const handleSaveEdit = async () => {
    setIsSubmitting(true);
    
    try {
      const { error } = await categoryOperations.update(editingCategory.id, {
        name: editingCategory.name,
        description: editingCategory.description
      });
      
      if (error) throw error;

      alert('دسته‌بندی با موفقیت بروزرسانی شد!');
      setEditingCategory(null);
      refetch();
    } catch (error) {
      console.error('Error updating category:', error);
      alert('خطا در بروزرسانی دسته‌بندی');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`آیا از حذف دسته‌بندی "${name}" اطمینان دارید؟`)) return;
    
    try {
      const { error } = await categoryOperations.delete(id);
      if (error) throw error;

      alert('دسته‌بندی با موفقیت حذف شد!');
      refetch();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('خطا در حذف دسته‌بندی');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <LoadingSpinner message="در حال بارگذاری دسته‌بندی‌ها..." />
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <ErrorMessage message={error} onRetry={refetch} />
      </AdminLayout>
    );
  }

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
              <Package className="w-6 h-6 ml-2 text-blue-500" />
              دسته‌بندی محصولات ({productCategories.length})
            </h2>
            
            <div className="space-y-4">
              {productCategories.map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-xl p-4">
                  {editingCategory?.id === category.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editingCategory.name}
                        onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                      />
                      <textarea
                        value={editingCategory.description || ''}
                        onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={2}
                        disabled={isSubmitting}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveEdit}
                          disabled={isSubmitting}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center space-x-reverse space-x-1 disabled:opacity-50"
                        >
                          <Save className="w-4 h-4" />
                          <span>{isSubmitting ? 'ذخیره...' : 'ذخیره'}</span>
                        </button>
                        <button
                          onClick={() => setEditingCategory(null)}
                          disabled={isSubmitting}
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
                        {category.description && (
                          <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-reverse space-x-2">
                        <button 
                          onClick={() => handleEditCategory(category)}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteCategory(category.id, category.name)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {productCategories.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>هیچ دسته‌بندی محصولی موجود نیست</p>
                </div>
              )}
            </div>
          </div>

          {/* News Categories */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center">
              <Newspaper className="w-6 h-6 ml-2 text-green-500" />
              دسته‌بندی اخبار ({newsCategories.length})
            </h2>
            
            <div className="space-y-4">
              {newsCategories.map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-xl p-4">
                  {editingCategory?.id === category.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editingCategory.name}
                        onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                      />
                      <textarea
                        value={editingCategory.description || ''}
                        onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={2}
                        disabled={isSubmitting}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveEdit}
                          disabled={isSubmitting}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center space-x-reverse space-x-1 disabled:opacity-50"
                        >
                          <Save className="w-4 h-4" />
                          <span>{isSubmitting ? 'ذخیره...' : 'ذخیره'}</span>
                        </button>
                        <button
                          onClick={() => setEditingCategory(null)}
                          disabled={isSubmitting}
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
                        {category.description && (
                          <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-reverse space-x-2">
                        <button 
                          onClick={() => handleEditCategory(category)}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteCategory(category.id, category.name)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {newsCategories.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Newspaper className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>هیچ دسته‌بندی خبری موجود نیست</p>
                </div>
              )}
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
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">نوع</label>
                  <select
                    value={newCategory.type}
                    onChange={(e) => setNewCategory({...newCategory, type: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-purple-500 text-white py-3 rounded-xl font-bold hover:bg-purple-600 transition-colors duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? 'در حال افزودن...' : 'افزودن'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    disabled={isSubmitting}
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