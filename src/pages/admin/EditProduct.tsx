import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import ProductForm from '../../components/ProductForm';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSave = (data: any) => {
    console.log('Product updated:', data);
    alert('محصول با موفقیت ویرایش شد!');
    navigate('/admin/products');
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  return (
    <AdminLayout>
      <ProductForm 
        mode="edit" 
        productId={id}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </AdminLayout>
  );
};

export default EditProduct;