import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import NewsForm from '../../components/NewsForm';

const AddNews = () => {
  const navigate = useNavigate();

  const handleSave = (data: any) => {
    console.log('News saved:', data);
    alert('خبر با موفقیت اضافه شد!');
    navigate('/admin/news');
  };

  const handleCancel = () => {
    navigate('/admin/news');
  };

  return (
    <AdminLayout>
      <NewsForm 
        mode="add" 
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </AdminLayout>
  );
};

export default AddNews;