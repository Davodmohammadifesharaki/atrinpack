import React from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import ProductForm from '../../components/ProductForm';

const EditProduct = () => {
  const { id } = useParams();

  return (
    <AdminLayout>
      <ProductForm mode="edit" productId={id} />
    </AdminLayout>
  );
};

export default EditProduct;