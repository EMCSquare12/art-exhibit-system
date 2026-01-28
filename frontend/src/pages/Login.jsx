import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaArrowRight } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-stone-50 p-4 md:p-8">
      <div className="w-full max-w-6xl bg-white shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left: Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Member Access</p>
            <h2 className="text-4xl md:text-5xl font-heading text-stone-900 mb-12">Sign In.</h2>

            {error && (
              <div className="bg-red-50 border-l-2 border-red-800 text-red-900 p-4 mb-8 text-sm font-serif italic">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full py-3 px-0 text-stone-900 bg-transparent border-b-2 border-stone-200 appearance-none focus:outline-none focus:ring-0 focus:border-stone-900 peer transition-colors font-mono text-sm"
                  required
                />
                <label className="absolute text-sm text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-stone-900 peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider">
                  Email Address
                </label>
              </div>

              <div className="relative group">
                <input
                  type="password"
                  name="password"
                  placeholder=" "
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full py-3 px-0 text-stone-900 bg-transparent border-b-2 border-stone-200 appearance-none focus:outline-none focus:ring-0 focus:border-stone-900 peer transition-colors font-mono text-sm"
                  required
                />
                <label className="absolute text-sm text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-stone-900 peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider">
                  Password
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-stone-900 text-white font-bold uppercase tracking-widest text-xs py-5 px-8 hover:bg-orange-800 transition-all duration-300 flex items-center justify-between group"
              >
                <span>Enter Gallery</span>
                <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-12 text-center border-t border-stone-100 pt-8">
              <p className="text-stone-500 text-sm font-light">
                Not a patron yet?{' '}
                <Link to="/register" className="text-stone-900 font-bold underline decoration-stone-300 hover:decoration-orange-700 transition-all">
                  Apply for membership
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Artistic Image */}
        <div className="w-full md:w-1/2 bg-stone-200 relative hidden md:block">
           <div className="absolute inset-0 bg-stone-900/10"></div>
           <img 
             src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070&auto=format&fit=crop" 
             alt="Abstract Art" 
             className="w-full h-full object-cover grayscale contrast-125"
           />
           <div className="absolute bottom-8 right-8 text-white text-right max-w-xs">
              <p className="font-heading text-2xl italic leading-tight">"Art enables us to find ourselves and lose ourselves at the same time."</p>
              <p className="text-xs uppercase tracking-widest mt-2 opacity-80">— Thomas Merton</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Login;