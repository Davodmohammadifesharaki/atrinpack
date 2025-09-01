import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import MixMatch from './pages/MixMatch';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminNews from './pages/admin/News';
import AdminGallery from './pages/admin/Gallery';
import AdminCategories from './pages/admin/Categories';
import AdminContact from './pages/admin/Contact';
import AdminAboutSettings from './pages/admin/AboutSettings';
import AdminUsers from './pages/admin/Users';
import AdminSettings from './pages/admin/Settings';
import AdminProfile from './pages/admin/Profile';

// New dedicated add/edit pages
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import AddNews from './pages/admin/AddNews';
import EditNews from './pages/admin/EditNews';
import AddGallery from './pages/admin/AddGallery';
import EditGallery from './pages/admin/EditGallery';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/mix-match" element={<MixMatch />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/products/edit/:id" element={<EditProduct />} />
          <Route path="/admin/news" element={<AdminNews />} />
          <Route path="/admin/news/add" element={<AddNews />} />
          <Route path="/admin/news/edit/:id" element={<EditNews />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route path="/admin/gallery/add" element={<AddGallery />} />
          <Route path="/admin/gallery/edit/:id" element={<EditGallery />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/contact" element={<AdminContact />} />
          <Route path="/admin/about" element={<AdminAboutSettings />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;