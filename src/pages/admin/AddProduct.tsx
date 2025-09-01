import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import ProductForm from '../../components/ProductForm';

const AddProduct = () => {
  return (
    <AdminLayout>
      <ProductForm mode="add" />
    </AdminLayout>
  );
};

export default AddProduct;