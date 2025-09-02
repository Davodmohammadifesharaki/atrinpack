import React, { useState } from 'react';
import CustomerLayout from '../../components/CustomerLayout';
import { 
  Package, 
  Search, 
  Filter,
  Eye,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  CreditCard
} from 'lucide-react';

const CustomerOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const orders = [
    {
      id: 1,
      orderNumber: 'ORD-001',
      date: '۱۵ دی ۱۴۰۳',
      status: 'تحویل شده',
      total: '2,500,000 تومان',
      items: [
        { name: 'بطری عطر کریستالی 50ml', quantity: 2, price: '1,200,000' },
        { name: 'پمپ اسپری طلایی', quantity: 1, price: '1,300,000' }
      ],
      statusColor: 'green',
      trackingCode: 'TRK123456789'
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      date: '۱۰ دی ۱۴۰۳',
      status: 'در حال ارسال',
      total: '1,800,000 تومان',
      items: [
        { name: 'درپوش چوبی دست‌ساز', quantity: 3, price: '1,800,000' }
      ],
      statusColor: 'blue',
      trackingCode: 'TRK987654321'
    },
    {
      id: 3,
      orderNumber: 'ORD-003',
      date: '۵ دی ۱۴۰۳',
      status: 'در انتظار تایید',
      total: '950,000 تومان',
      items: [
        { name: 'اسانس گل رز طبیعی', quantity: 1, price: '950,000' }
      ],
      statusColor: 'amber',
      trackingCode: null
    }
  ];

  const statuses = ['همه', 'در انتظار تایید', 'در حال آماده‌سازی', 'در حال ارسال', 'تحویل شده', 'لغو شده'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'همه' || selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'تحویل شده': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'در حال ارسال': return <Truck className="w-5 h-5 text-blue-600" />;
      case 'در انتظار تایید': return <Clock className="w-5 h-5 text-amber-600" />;
      default: return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-800">سفارشات من</h1>
            <p className="text-gray-600 mt-2">مشاهده و پیگیری سفارشات</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="جستجو در سفارشات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status === 'همه' ? 'all' : status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-reverse space-x-4">
                  <div className={`w-12 h-12 bg-${order.statusColor}-100 rounded-full flex items-center justify-center`}>
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-800">{order.orderNumber}</h3>
                    <div className="flex items-center space-x-reverse space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{order.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold bg-${order.statusColor}-100 text-${order.statusColor}-700`}>
                    {order.status}
                  </span>
                  <p className="text-2xl font-black text-gray-800 mt-2">{order.total}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-bold text-gray-700 mb-3">محصولات سفارش:</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-bold text-gray-800">{item.name}</span>
                        <span className="text-gray-600 text-sm mr-2">× {item.quantity}</span>
                      </div>
                      <span className="font-bold text-gray-800">{item.price} تومان</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tracking */}
              {order.trackingCode && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-reverse space-x-2">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <span className="font-bold text-gray-700">کد پیگیری:</span>
                      <span className="font-bold text-blue-600">{order.trackingCode}</span>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors duration-300">
                      پیگیری مرسوله
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">سفارشی یافت نشد</h3>
            <p className="text-gray-500 mb-6">هنوز سفارشی ثبت نکرده‌اید یا فیلتر اعمال شده نتیجه‌ای ندارد</p>
            <button 
              onClick={() => navigate('/products')}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors duration-300"
            >
              مشاهده محصولات
            </button>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default CustomerOrders;