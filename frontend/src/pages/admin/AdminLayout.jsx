import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminNavbar from '../../components/AdminNavbar';

const AdminLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
      return <div className="h-screen flex items-center justify-center text-gray-500">Loading admin panel...</div>;
  }


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AdminNavbar />

      <main className="flex-grow container mx-auto p-6">
         <div className="bg-white rounded-xl shadow-sm p-6 min-h-[calc(100vh-120px)]">
            <Outlet />
         </div>
      </main>

      <footer className="text-center p-4 text-gray-500 text-xs">
        Admin Portal System v1.0
      </footer>
    </div>
  );
};

export default AdminLayout;