import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import { USERS_URL } from '../constant';
import { FaArrowRight } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axiosInstance.post(`${USERS_URL}`, formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-stone-50 p-4 md:p-8">
      <div className="w-full max-w-6xl bg-white shadow-xl overflow-hidden flex flex-col md:flex-row-reverse min-h-[600px]">
        
        {/* Right (Form Side on Desktop) */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white z-10">
          <div className="max-w-md mx-auto w-full">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Membership Application</p>
            <h2 className="text-4xl md:text-5xl font-heading text-stone-900 mb-12">Become a Patron.</h2>

            {error && (
              <div className="bg-red-50 border-l-2 border-red-800 text-red-900 p-4 mb-8 text-sm font-serif italic">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
              
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full py-3 px-0 text-stone-900 bg-transparent border-b-2 border-stone-200 appearance-none focus:outline-none focus:ring-0 focus:border-stone-900 peer transition-colors font-mono text-sm"
                  required
                />
                <label className="absolute text-sm text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-stone-900 peer-focus:font-bold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider">
                  Full Name
                </label>
              </div>

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
                  Create Password
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-stone-900 text-white font-bold uppercase tracking-widest text-xs py-5 px-8 hover:bg-orange-800 transition-all duration-300 flex items-center justify-between group ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <span>{isLoading ? 'Processing...' : 'Complete Registration'}</span>
                {!isLoading && <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="mt-12 text-center border-t border-stone-100 pt-8">
              <p className="text-stone-500 text-sm font-light">
                Already have a membership?{' '}
                <Link to="/login" className="text-stone-900 font-bold underline decoration-stone-300 hover:decoration-orange-700 transition-all">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Left (Image Side on Desktop) - Reverse Order */}
        <div className="w-full md:w-1/2 bg-stone-800 relative hidden md:block">
           <img 
             src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop" 
             alt="Modern Architecture" 
             className="w-full h-full object-cover opacity-60 grayscale mix-blend-overlay"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 to-transparent"></div>
           <div className="absolute bottom-12 left-12 text-stone-100 max-w-sm">
              <h3 className="font-heading text-3xl mb-4">Curated Experiences.</h3>
              <p className="font-light leading-relaxed text-sm opacity-90">Join our community of art enthusiasts and get exclusive access to exhibitions, artist talks, and private viewings.</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Register;