import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import NewsForm from '../../components/NewsForm';

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSave = (data: any) => {
    console.log('News updated:', data);
    alert('خبر با موفقیت ویرایش شد!');
    navigate('/admin/news');
  };

  const handleCancel = () => {
    navigate('/admin/news');
  };

  return (
    <AdminLayout>
      <NewsForm 
        mode="edit" 
        newsId={id}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </AdminLayout>
  );
};

export default EditNews;