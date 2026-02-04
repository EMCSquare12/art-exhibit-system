import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import PageLoader from '../components/PageLoader';
import ErrorMessage from '../components/ErrorMessage';
import { FaArrowLeft, FaPalette } from 'react-icons/fa';

const RegisterArt = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    descroption: '', // Matches backend model field name
    imageUrl: '',
    startDate: '',
    endDate: '',
    price: 0,
    capacityPerSlot: 50,
    timeSlots: '09:00-12:00, 13:00-16:00'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
        ...formData,
        timeSlots: formData.timeSlots.split(',').map(slot => slot.trim())
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
          setError("Authentication required. Please log in.");
          setLoading(false);
          return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await api.post('/exhibits', payload, config);
      // alert('Art submitted successfully!'); // Replaced with immediate navigation for smoother feel
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit exhibition.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <PageLoader message="Cataloging new work..." />;

  // Reusable Input Component for consistency
  const FormInput = ({ label, type = "text", name, value, onChange, placeholder, required = false, min }) => (
    <div className="group">
        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2 group-focus-within:text-orange-700 transition-colors">
            {label}
        </label>
        <input 
            type={type} 
            name={name} 
            value={value} 
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            min={min}
            className="w-full p-4 bg-stone-50 border border-stone-200 text-stone-900 font-serif placeholder-stone-300 focus:outline-none focus:border-stone-900 focus:bg-white transition-all duration-300 rounded-sm"
        />
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center relative">
            <Link to="/" className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-2 text-xs uppercase font-bold tracking-widest">
                <FaArrowLeft /> <span className="hidden sm:inline">Return</span>
            </Link>
            <div className="inline-block p-4 rounded-full bg-stone-100 text-stone-400 mb-6">
                <FaPalette className="text-xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading text-stone-900 mb-4">New Exhibition.</h1>
            <p className="text-stone-500 font-light italic">Submit a new piece to the gallery collection.</p>
        </div>

        {error && <ErrorMessage message={error} subtitle="Please verify your inputs" />}

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 shadow-xl border-t-4 border-stone-900 space-y-8">
            
            {/* Main Details */}
            <div className="space-y-6">
                <FormInput 
                    label="Exhibition Title" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    required 
                    placeholder="e.g. The Modern Renaissance"
                />

                <FormInput 
                    label="Image URL" 
                    type="url"
                    name="imageUrl" 
                    value={formData.imageUrl} 
                    onChange={handleChange} 
                    required 
                    placeholder="https://"
                />

                <div className="group">
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2 group-focus-within:text-orange-700 transition-colors">
                        Description
                    </label>
                    <textarea 
                        name="descroption" 
                        value={formData.descroption} 
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full p-4 bg-stone-50 border border-stone-200 text-stone-900 font-serif placeholder-stone-300 focus:outline-none focus:border-stone-900 focus:bg-white transition-all duration-300 rounded-sm resize-none"
                        placeholder="Describe the artistic vision..."
                    ></textarea>
                </div>
            </div>

            {/* Logistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-stone-100">
                <FormInput 
                    label="Opening Date" 
                    type="date"
                    name="startDate" 
                    value={formData.startDate} 
                    onChange={handleChange} 
                    required 
                />
                <FormInput 
                    label="Closing Date" 
                    type="date"
                    name="endDate" 
                    value={formData.endDate} 
                    onChange={handleChange} 
                    required 
                />
                <FormInput 
                    label="Entry Price ($)" 
                    type="number"
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    min="0"
                />
                <FormInput 
                    label="Daily Capacity" 
                    type="number"
                    name="capacityPerSlot" 
                    value={formData.capacityPerSlot} 
                    onChange={handleChange} 
                    min="1"
                />
            </div>

            {/* Time Slots */}
            <div className="pt-2">
                <FormInput 
                    label="Time Slots (Comma Separated)" 
                    name="timeSlots" 
                    value={formData.timeSlots} 
                    onChange={handleChange} 
                    required 
                    placeholder="09:00-12:00, 13:00-16:00"
                />
                <p className="text-[10px] text-stone-400 mt-2 uppercase tracking-wide text-right">
                    Format: HH:MM-HH:MM (24h)
                </p>
            </div>

            {/* Submit Action */}
            <div className="pt-8 mt-8 border-t border-stone-100 flex items-center justify-end">
                <button 
                    type="submit" 
                    className="bg-stone-900 hover:bg-orange-800 text-white font-bold py-4 px-10 rounded-sm transition-all duration-300 shadow-lg uppercase text-xs tracking-widest hover:-translate-y-1"
                >
                    Curate Exhibit
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterArt;