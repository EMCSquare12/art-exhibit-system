import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTachometerAlt, FaImages, FaQrcode, FaSignOutAlt, FaUserShield } from 'react-icons/fa';

const AdminNavbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <FaUserShield className="text-xl text-blue-400" />
            <span className="text-xl font-bold tracking-wider">AdminPortal</span>
        </div>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/admin" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FaTachometerAlt /> Dashboard
          </Link>
          <Link to="/admin/exhibits" className="flex items-center gap-2 hover:text-blue-400 transition opacity-50 cursor-not-allowed" title="Coming Soon">
            <FaImages /> Exhibits
          </Link>
           <Link to="/admin/scanner" className="flex items-center gap-2 hover:text-blue-400 transition opacity-50 cursor-not-allowed" title="Coming Soon">
            <FaQrcode /> Scanner
          </Link>
        </nav>

        <div className="flex items-center gap-4 pl-6 border-l border-gray-700">
            <span className="text-gray-400 text-sm">Signed in as <span className="font-semibold text-white">{user?.name}</span></span>
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-sm transition"
            >
                <FaSignOutAlt /> Logout
            </button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;