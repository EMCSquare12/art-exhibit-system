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
    <nav className="bg-stone-50/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50 transition-all">
      <div className="container mx-auto px-6 max-w-7xl h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          {/* Artistic Logo Text */}
          <span className="text-3xl font-bold font-heading text-stone-900 tracking-tighter group-hover:text-stone-600 transition-colors">
            ArtTix<span className="text-orange-600">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-8 font-medium text-sm tracking-wide">
          <Link to="/" className="text-stone-600 hover:text-stone-900 transition-colors uppercase text-xs font-bold">
            Exhibitions
          </Link>

          {user ? (
            <>
              <Link
                to="/my-tickets"
                className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors uppercase text-xs font-bold"
              >
                <FaTicketAlt />
                <span>Tickets</span>
              </Link>

              <div className="flex items-center gap-4 pl-6 border-l border-stone-300">
                <div className="flex items-center gap-2 text-stone-800">
                   <FaUserCircle className="text-xl text-stone-400"/>
                   <span className="hidden md:inline font-heading italic">{user?.name?.split(' ')[0]}</span> 
                </div>
                <button
                  onClick={handleLogout}
                  className="text-stone-400 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <FaSignOutAlt className="text-lg" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-stone-600 hover:text-stone-900 transition uppercase text-xs font-bold"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-stone-900 hover:bg-stone-800 text-white px-6 py-2.5 rounded-full transition shadow-md text-xs uppercase font-bold tracking-wider"
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