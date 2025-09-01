import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import ProductForm from '../../components/ProductForm';

const AddProduct = () => {
  const navigate = useNavigate();

  const handleSave = (data: any) => {
    console.log('Product saved:', data);
    alert('محصول با موفقیت اضافه شد!');
    navigate('/admin/products');
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  return (
    <AdminLayout>
      <ProductForm 
        mode="add" 
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </AdminLayout>
  );
};

export default AddProduct;