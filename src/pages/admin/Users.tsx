import React, { useState } from 'react';
import { useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { supabase } from '../../lib/supabase';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
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
  UserX,
  Save,
  X,
  Mail,
  Phone,
  Building,
  Calendar
} from 'lucide-react';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({
    fullName: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    company: '',
    role: 'editor'
  });
  const [editUser, setEditUser] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    company: '',
    role: 'editor'
  });

  // Get real users from Supabase
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setUsers(data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
      phone: '',
      company: '',
      role: 'editor'
    });
    setIsAddUserModalOpen(false);
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleEditUser = (user: any) => {
    setEditUser({
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      phone: user.phone,
      company: user.company,
      role: user.role
    });
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('User updated:', editUser);
    alert(`کاربر ${selectedUser.fullName} با موفقیت ویرایش شد!`);
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (user: any) => {
    if (confirm(`آیا از حذف کاربر ${user.full_name} اطمینان دارید؟`)) {
      console.log('User deleted:', user.id);
      alert(`کاربر ${user.full_name} با موفقیت حذف شد!`);
    }
  };

  const toggleUserStatus = (user: any) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    console.log(`User ${user.id} status changed to:`, newStatus);
    alert(`وضعیت کاربر ${user.full_name} تغییر کرد!`);
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

          {loading ? (
            <LoadingSpinner message="در حال بارگذاری کاربران..." />
          ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">کاربر</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">اطلاعات تماس</th>
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
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{user.full_name}</div>
                          <div className="text-sm text-gray-600">@{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-800 flex items-center">
                          <Mail className="w-4 h-4 ml-1 text-gray-400" />
                          {user.email}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <Phone className="w-4 h-4 ml-1 text-gray-400" />
                          {user.phone}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <Building className="w-4 h-4 ml-1 text-gray-400" />
                          {user.company}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRoleColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleUserStatus(user)}
                        className={`px-3 py-1 rounded-full text-sm font-bold flex items-center transition-colors ${
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        {user.status === 'active' ? <UserCheck className="w-3 h-3 ml-1" /> : <UserX className="w-3 h-3 ml-1" />}
                        {user.status === 'active' ? 'فعال' : 'غیرفعال'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 ml-1 text-gray-400" />
                        {user.last_login ? new Date(user.last_login).toLocaleDateString('fa-IR') : 'هرگز'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-reverse space-x-2">
                        <button 
                          onClick={() => handleViewUser(user)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="مشاهده جزئیات"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEditUser(user)}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                          title="ویرایش کاربر"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                          <button 
                            onClick={() => handleDeleteUser(user)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="حذف کاربر"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}

          {filteredUsers.length === 0 && (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">کاربری یافت نشد</h3>
              <p className="text-gray-500">لطفاً عبارت جستجو را تغییر دهید</p>
            </div>
          )}
        </div>

        {/* Add User Modal */}
        {isAddUserModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-800">افزودن کاربر جدید</h3>
                <button
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    value={newUser.fullName}
                    onChange={(e) => setNewUser({...newUser, fullName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="نام کامل"
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
                    placeholder="نام کاربری"
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
                    placeholder="رمز عبور"
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
                    placeholder="ایمیل"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">شماره تماس</label>
                  <input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="09123456789"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">شرکت</label>
                  <input
                    type="text"
                    value={newUser.company}
                    onChange={(e) => setNewUser({...newUser, company: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="نام شرکت"
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

        {/* View User Modal */}
        {isViewModalOpen && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-800">جزئیات کاربر</h3>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-blue-600" />
                </div>
                <h4 className="text-xl font-black text-gray-800">{selectedUser.fullName}</h4>
                <p className="text-gray-600">@{selectedUser.username}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold mt-2 ${getRoleColor(selectedUser.role)}`}>
                  {getRoleLabel(selectedUser.role)}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-reverse space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">ایمیل</div>
                    <div className="font-bold text-gray-800">{selectedUser.email}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-reverse space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">تلفن</div>
                    <div className="font-bold text-gray-800">{selectedUser.phone}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-reverse space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Building className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">شرکت</div>
                    <div className="font-bold text-gray-800">{selectedUser.company}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-reverse space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">تاریخ عضویت</div>
                    <div className="font-bold text-gray-800">{selectedUser.joinDate}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-reverse space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">آخرین ورود</div>
                    <div className="font-bold text-gray-800">{selectedUser.lastLogin}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleEditUser(selectedUser);
                  }}
                  className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-colors duration-300 flex items-center justify-center space-x-reverse space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>ویرایش</span>
                </button>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-400 transition-colors duration-300"
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {isEditModalOpen && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-800">ویرایش کاربر</h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    value={editUser.fullName}
                    onChange={(e) => setEditUser({...editUser, fullName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">نام کاربری</label>
                  <input
                    type="text"
                    value={editUser.username}
                    onChange={(e) => setEditUser({...editUser, username: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={selectedUser.username === 'aminjafari'}
                    required
                  />
                  {selectedUser.username === 'aminjafari' && (
                    <p className="text-xs text-amber-600 mt-1">نام کاربری ادمین اصلی قابل تغییر نیست</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">ایمیل</label>
                  <input
                    type="email"
                    value={editUser.email}
                    onChange={(e) => setEditUser({...editUser, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">شماره تماس</label>
                  <input
                    type="tel"
                    value={editUser.phone}
                    onChange={(e) => setEditUser({...editUser, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="09123456789"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">شرکت</label>
                  <input
                    type="text"
                    value={editUser.company}
                    onChange={(e) => setEditUser({...editUser, company: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="نام شرکت"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">نقش</label>
                  <select
                    value={editUser.role}
                    onChange={(e) => setEditUser({...editUser, role: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={selectedUser.username === 'aminjafari'}
                  >
                    <option value="admin">مدیر کل</option>
                    <option value="editor">ویرایشگر</option>
                    <option value="viewer">نمایشگر</option>
                  </select>
                  {selectedUser.username === 'aminjafari' && (
                    <p className="text-xs text-amber-600 mt-1">نقش ادمین اصلی قابل تغییر نیست</p>
                  )}
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-colors duration-300 flex items-center justify-center space-x-reverse space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>ذخیره تغییرات</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
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