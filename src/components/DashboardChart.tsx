import React, { useState, useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  BarChart3, 
  PieChart as PieChartIcon,
  Activity,
  Users,
  Package,
  Newspaper,
  Image as ImageIcon,
  MessageSquare
} from 'lucide-react';

interface DashboardChartProps {
  products: any[];
  news: any[];
  gallery: any[];
  messages: any[];
}

const DashboardChart: React.FC<DashboardChartProps> = ({ 
  products, 
  news, 
  gallery, 
  messages 
}) => {
  const [activeChart, setActiveChart] = useState<'line' | 'area' | 'bar' | 'pie'>('area');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Generate mock data based on real data counts
  const generateTimeSeriesData = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Generate realistic data based on actual counts
      const baseProducts = Math.floor(products.length / days);
      const baseNews = Math.floor(news.length / days);
      const baseGallery = Math.floor(gallery.length / days);
      const baseMessages = Math.floor(messages.length / days);
      
      data.push({
        date: date.toLocaleDateString('fa-IR', { month: 'short', day: 'numeric' }),
        fullDate: date.toLocaleDateString('fa-IR'),
        products: Math.max(0, baseProducts + Math.floor(Math.random() * 5)),
        news: Math.max(0, baseNews + Math.floor(Math.random() * 3)),
        gallery: Math.max(0, baseGallery + Math.floor(Math.random() * 4)),
        messages: Math.max(0, baseMessages + Math.floor(Math.random() * 8)),
        visits: Math.floor(Math.random() * 200) + 50,
        sales: Math.floor(Math.random() * 15) + 5
      });
    }
    
    return data;
  };

  const timeSeriesData = useMemo(() => generateTimeSeriesData(), [timeRange, products, news, gallery, messages]);

  // Category distribution data
  const categoryData = useMemo(() => {
    const categories = {};
    products.forEach(product => {
      categories[product.category] = (categories[product.category] || 0) + 1;
    });
    
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    
    return Object.entries(categories).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length]
    }));
  }, [products]);

  const chartTypes = [
    { id: 'area', label: 'نمودار ناحیه‌ای', icon: Activity },
    { id: 'line', label: 'نمودار خطی', icon: TrendingUp },
    { id: 'bar', label: 'نمودار ستونی', icon: BarChart3 },
    { id: 'pie', label: 'نمودار دایره‌ای', icon: PieChartIcon }
  ];

  const timeRanges = [
    { id: '7d', label: '۷ روز گذشته' },
    { id: '30d', label: '۳۰ روز گذشته' },
    { id: '90d', label: '۹۰ روز گذشته' }
  ];

  const renderChart = () => {
    const commonProps = {
      data: timeSeriesData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (activeChart) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
              fontFamily="Vazirmatn"
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              fontFamily="Vazirmatn"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                fontFamily: 'Vazirmatn',
                direction: 'rtl'
              }}
              labelStyle={{ color: '#374151', fontWeight: 'bold' }}
            />
            <Line 
              type="monotone" 
              dataKey="visits" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              name="بازدیدها"
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
              name="فروش"
            />
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
              fontFamily="Vazirmatn"
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              fontFamily="Vazirmatn"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                fontFamily: 'Vazirmatn',
                direction: 'rtl'
              }}
              labelStyle={{ color: '#374151', fontWeight: 'bold' }}
            />
            <Area 
              type="monotone" 
              dataKey="visits" 
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#colorVisits)"
              strokeWidth={2}
              name="بازدیدها"
            />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#10b981" 
              fillOpacity={1} 
              fill="url(#colorSales)"
              strokeWidth={2}
              name="فروش"
            />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
              fontFamily="Vazirmatn"
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              fontFamily="Vazirmatn"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                fontFamily: 'Vazirmatn',
                direction: 'rtl'
              }}
              labelStyle={{ color: '#374151', fontWeight: 'bold' }}
            />
            <Bar dataKey="visits" fill="#3b82f6" radius={[4, 4, 0, 0]} name="بازدیدها" />
            <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} name="فروش" />
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelStyle={{ fontFamily: 'Vazirmatn', fontSize: '12px' }}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                fontFamily: 'Vazirmatn',
                direction: 'rtl'
              }}
            />
          </PieChart>
        );

      default:
        return null;
    }
  };

  // Calculate totals for summary
  const totalVisits = timeSeriesData.reduce((sum, day) => sum + day.visits, 0);
  const totalSales = timeSeriesData.reduce((sum, day) => sum + day.sales, 0);
  const avgVisitsPerDay = Math.round(totalVisits / timeSeriesData.length);
  const avgSalesPerDay = Math.round(totalSales / timeSeriesData.length);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-8">
      {/* Chart Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 lg:mb-8 gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-black text-gray-800 flex items-center mb-2">
            <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 ml-2 lg:ml-3 text-indigo-500" />
            نمودار عملکرد سایت
          </h2>
          <div className="flex items-center space-x-reverse space-x-2 text-gray-600">
            <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="text-xs lg:text-sm">
              {timeRanges.find(range => range.id === timeRange)?.label}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 w-full lg:w-auto">
          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '90d')}
            className="px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm lg:text-base"
          >
            {timeRanges.map(range => (
              <option key={range.id} value={range.id}>{range.label}</option>
            ))}
          </select>

          {/* Chart Type Selector */}
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
            {chartTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveChart(type.id as any)}
                className={`p-2 lg:p-3 rounded-lg transition-all duration-300 flex items-center space-x-reverse space-x-1 lg:space-x-2 ${
                  activeChart === type.id
                    ? 'bg-white shadow-sm text-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
                title={type.label}
              >
                <type.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="hidden lg:inline text-sm font-bold">{type.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-blue-50 p-3 lg:p-4 rounded-xl border border-blue-100">
          <div className="flex items-center space-x-reverse space-x-2 mb-2">
            <Users className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
            <span className="text-xs lg:text-sm font-bold text-blue-800">کل بازدیدها</span>
          </div>
          <div className="text-lg lg:text-2xl font-black text-blue-600">{totalVisits.toLocaleString()}</div>
          <div className="text-xs text-blue-600">میانگین: {avgVisitsPerDay}/روز</div>
        </div>

        <div className="bg-green-50 p-3 lg:p-4 rounded-xl border border-green-100">
          <div className="flex items-center space-x-reverse space-x-2 mb-2">
            <Package className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
            <span className="text-xs lg:text-sm font-bold text-green-800">کل فروش</span>
          </div>
          <div className="text-lg lg:text-2xl font-black text-green-600">{totalSales.toLocaleString()}</div>
          <div className="text-xs text-green-600">میانگین: {avgSalesPerDay}/روز</div>
        </div>

        <div className="bg-purple-50 p-3 lg:p-4 rounded-xl border border-purple-100">
          <div className="flex items-center space-x-reverse space-x-2 mb-2">
            <Newspaper className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600" />
            <span className="text-xs lg:text-sm font-bold text-purple-800">اخبار منتشر شده</span>
          </div>
          <div className="text-lg lg:text-2xl font-black text-purple-600">{news.filter(n => n.visible).length}</div>
          <div className="text-xs text-purple-600">از {news.length} خبر</div>
        </div>

        <div className="bg-amber-50 p-3 lg:p-4 rounded-xl border border-amber-100">
          <div className="flex items-center space-x-reverse space-x-2 mb-2">
            <MessageSquare className="w-4 h-4 lg:w-5 lg:h-5 text-amber-600" />
            <span className="text-xs lg:text-sm font-bold text-amber-800">پیام‌های جدید</span>
          </div>
          <div className="text-lg lg:text-2xl font-black text-amber-600">{messages.filter(m => m.status === 'new').length}</div>
          <div className="text-xs text-amber-600">از {messages.length} پیام</div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-64 lg:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Chart Legend */}
      {activeChart !== 'pie' && (
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-reverse space-x-2">
            <div className="w-3 h-3 lg:w-4 lg:h-4 bg-blue-500 rounded-full"></div>
            <span className="text-xs lg:text-sm font-bold text-gray-700">بازدیدها</span>
          </div>
          <div className="flex items-center space-x-reverse space-x-2">
            <div className="w-3 h-3 lg:w-4 lg:h-4 bg-green-500 rounded-full"></div>
            <span className="text-xs lg:text-sm font-bold text-gray-700">فروش</span>
          </div>
          {activeChart === 'bar' && (
            <>
              <div className="flex items-center space-x-reverse space-x-2">
                <div className="w-3 h-3 lg:w-4 lg:h-4 bg-purple-500 rounded-full"></div>
                <span className="text-xs lg:text-sm font-bold text-gray-700">محصولات</span>
              </div>
              <div className="flex items-center space-x-reverse space-x-2">
                <div className="w-3 h-3 lg:w-4 lg:h-4 bg-amber-500 rounded-full"></div>
                <span className="text-xs lg:text-sm font-bold text-gray-700">پیام‌ها</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Insights */}
      <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200">
        <h3 className="text-base lg:text-lg font-black text-gray-800 mb-3 lg:mb-4">تحلیل سریع</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 lg:p-4 rounded-xl">
            <div className="text-xs lg:text-sm text-blue-800 font-bold">بیشترین بازدید</div>
            <div className="text-sm lg:text-base text-blue-600 mt-1">
              {Math.max(...timeSeriesData.map(d => d.visits))} بازدید در یک روز
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 lg:p-4 rounded-xl">
            <div className="text-xs lg:text-sm text-green-800 font-bold">بهترین فروش</div>
            <div className="text-sm lg:text-base text-green-600 mt-1">
              {Math.max(...timeSeriesData.map(d => d.sales))} فروش در یک روز
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 lg:p-4 rounded-xl sm:col-span-2 lg:col-span-1">
            <div className="text-xs lg:text-sm text-purple-800 font-bold">نرخ تبدیل</div>
            <div className="text-sm lg:text-base text-purple-600 mt-1">
              {((totalSales / totalVisits) * 100).toFixed(1)}% از بازدید به فروش
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;