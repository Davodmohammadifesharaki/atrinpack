import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  User,
  Shield,
  Eye,
  UserCheck,
  UserX
} from 'lucide-react';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: '',
    username: '',
    password: '',
    email: '',
    role: 'editor'
  });

  // نمونه داده‌های کاربران
  const users = [
    {
      id: 1,
      fullName: 'امین جعفری',
      username: 'aminjafari',
      email: 'admin@atrinpack.com',
      role: 'admin',
      status: 'فعال',
      lastLogin: '۱۵ دی ۱۴۰۳',
      avatar: null
    },
    {
      id: 2,
      fullName: 'مریم احمدی',
      username: 'maryam.ahmadi',
      email: 'maryam@atrinpack.com',
      role: 'editor',
      status: 'فعال',
      lastLogin: '۱۰ دی ۱۴۰۳',
      avatar: null
    },
    {
      id: 3,
      fullName: 'علی رضایی',
      username: 'ali.rezaei',
      email: 'ali@atrinpack.com',
      role: 'viewer',
      status: 'غیرفعال',
      lastLogin: '۵ دی ۱۴۰۳',
      avatar: null
    }
  ];

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New user added:', newUser);
    alert('کاربر جدید با موفقیت اضافه شد!');
    setNewUser({
      fullName: '',
      username: '',
      password: '',
      email: '',
      role: 'editor'
    });
    setIsAddUserModalOpen(false);
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'مدیر کل';
      case 'editor': return 'ویرایشگر';
      case 'viewer': return 'نمایشگر';
      default: return 'کاربر';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700';
      case 'editor': return 'bg-blue-100 text-blue-700';
      case 'viewer': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-800">مدیریت کاربران</h1>
            <p className="text-gray-600 mt-2">مدیریت کاربران سیستم و سطوح دسترسی</p>
          </div>
          <button 
            onClick={() => setIsAddUserModalOpen(true)}
            className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors duration-300 flex items-center space-x-reverse space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>افزودن کاربر</span>
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="relative max-w-md">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="جستجو در کاربران..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-black text-gray-800">
              لیست کاربران ({filteredUsers.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">کاربر</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">نقش</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">وضعیت</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">آخرین ورود</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-reverse space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{user.fullName}</div>
                          <div className="text-sm text-gray-600">{user.username}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRoleColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold flex items-center w-fit ${
                        user.status === 'فعال' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {user.status === 'فعال' ? <UserCheck className="w-3 h-3 ml-1" /> : <UserX className="w-3 h-3 ml-1" />}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-reverse space-x-2">
                        <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        {user.username !== 'aminjafari' && (
                          <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add User Modal */}
        {isAddUserModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-2xl font-black text-gray-800 mb-6">افزودن کاربر جدید</h3>
              
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    value={newUser.fullName}
                    onChange={(e) => setNewUser({...newUser, fullName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">نام کاربری</label>
                  <input
                    type="text"
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">رمز عبور</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">ایمیل</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">نقش</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="editor">ویرایشگر</option>
                    <option value="viewer">نمایشگر</option>
                  </select>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-colors duration-300"
                  >
                    افزودن کاربر
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddUserModalOpen(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-400 transition-colors duration-300"
                  >
                    انصراف
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;