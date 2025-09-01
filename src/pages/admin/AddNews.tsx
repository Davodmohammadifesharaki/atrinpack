import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import NewsForm from '../../components/NewsForm';

const AddNews = () => {
  return (
    <AdminLayout>
      <NewsForm mode="add" />
    </AdminLayout>
  );
};

export default AddNews;