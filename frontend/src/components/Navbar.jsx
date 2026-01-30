import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaTicketAlt, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Scroll to top when Logo is clicked
  const handleScrollToTop = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generic handler for scrolling to a section
  const handleScrollToSection = (e, sectionId) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Reusable Artistic Link Component
  const NavLink = ({ to, children, onClick }) => (
    <Link 
        to={to} 
        onClick={onClick}
        className="relative group font-heading text-lg font-medium text-stone-600 hover:text-stone-900 transition-colors duration-300"
    >
        <span>{children}</span>
        {/* Artistic Underline Effect */}
        <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-orange-700 transition-all duration-300 ease-out group-hover:w-full"></span>
    </Link>
  );

  return (
    <nav className="bg-stone-50/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50 transition-all">
      <div className="container mx-auto px-6 max-w-7xl h-20 flex items-center justify-between relative">
        
        {/* LEFT: Logo */}
        <Link 
          to="/" 
          onClick={handleScrollToTop}
          className="flex items-center gap-2 group z-20"
        >
          <span className="text-3xl font-bold font-heading text-stone-900 tracking-tighter group-hover:text-stone-600 transition-colors">
            ArtTix<span className="text-orange-600">.</span>
          </span>
        </Link>

        {/* CENTER: Navigation Links (Absolute Centered) */}
        <div className="hidden md:flex items-center gap-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <NavLink 
            to="/#exhibits" 
            onClick={(e) => handleScrollToSection(e, 'exhibits')}
          >
            Exhibitions
          </NavLink>
          <NavLink 
            to="/#artists" 
            onClick={(e) => handleScrollToSection(e, 'artists')}
          >
            Artists
          </NavLink>
           <NavLink 
            to="/#gallery" 
            onClick={(e) => handleScrollToSection(e, 'gallery')}
          >
            Gallery
          </NavLink>
        </div>

        {/* RIGHT: User Actions */}
        <div className="flex items-center gap-6 z-20">
          {user ? (
            <>
              <Link
                to="/my-tickets"
                className="flex items-center gap-2 font-heading text-lg font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                <FaTicketAlt className="text-sm" />
                <span className="hidden sm:inline">Tickets</span>
              </Link>

              <div className="flex items-center gap-4 pl-6 border-l border-stone-300">
                <div className="flex items-center gap-2 text-stone-800">
                   <FaUserCircle className="text-xl text-stone-400"/>
                   <span className="hidden md:inline font-heading text-lg font-medium">{user?.name?.split(' ')[0]}</span> 
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
                className="font-heading text-lg font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-stone-900 hover:bg-stone-800 text-white px-6 py-2.5 rounded-full transition shadow-md text-xs uppercase font-bold tracking-widest"
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