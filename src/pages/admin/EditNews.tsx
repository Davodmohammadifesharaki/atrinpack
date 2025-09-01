import React from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import NewsForm from '../../components/NewsForm';

const EditNews = () => {
  const { id } = useParams();

  return (
    <AdminLayout>
      <NewsForm mode="edit" newsId={id} />
    </AdminLayout>
  );
};

export default EditNews;