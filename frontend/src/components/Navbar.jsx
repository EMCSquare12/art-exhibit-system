import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaTicketAlt, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-blue-600 tracking-tight">ArtTix</span>
        </Link>

        <div className="flex items-center gap-6 font-medium text-sm">
          <Link to="/" className="text-gray-600 hover:text-blue-600 transition">
            Exhibits
          </Link>

          {user ? (
            <>
              <Link
                to="/my-tickets"
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition"
              >
                <FaTicketAlt />
                <span>My Tickets</span>
              </Link>

              <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                <div className="flex items-center gap-2 text-gray-700">
                   <FaUserCircle className="text-lg text-gray-400"/>
                   <span className="hidden md:inline">{user?.name?.split(' ')[0]}</span> 
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-gray-500 hover:text-red-600 transition"
                  title="Logout"
                >
                  <FaSignOutAlt />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;