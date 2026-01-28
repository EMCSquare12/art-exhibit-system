import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import { EXHIBITS_URL, USERS_URL } from '../constant';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaCheckCircle, FaTicketAlt } from 'react-icons/fa';

const ExhibitDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const [exhibit, setExhibit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [visitDate, setVisitDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);


  useEffect(() => {
    const fetchExhibitDetails = async () => {
      try {
        const res = await axiosInstance.get(`${EXHIBITS_URL}/${id}`);
        setExhibit(res.data);
        const startDate = new Date(res.data.startDate);
        const today = new Date();
        const defaultDate = startDate > today ? startDate : today;
        setVisitDate(defaultDate.toISOString().split('T')[0]);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load exhibit details.');
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitDetails();
  }, [id]);

  const handleQuantityChange = (increment) => {
    setQuantity((prev) => {
        const newValue = prev + increment;
        return newValue < 1 ? 1 : newValue;
    });
  };

  const handleBookTicket = async (e) => {
    e.preventDefault();

    if (!user) {
        navigate('/login');
        return;
    }

    setBookingError('');
    setBookingLoading(true);

    try {
        const orderData = {
            exhibitId: exhibit._id,
            visitDate,
            timeSlot: selectedSlot,
            quantity
        };

        // Note: Ensure your backend route is correct. Assuming '/orders' based on context.
        await axiosInstance.post('/orders', orderData);

        setBookingSuccess(true);
        setTimeout(() => {
             navigate('/my-tickets');
        }, 2000);

    } catch (err) {
        setBookingError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
        setBookingLoading(false);
    }
  };


  if (loading) return <div className="min-h-screen flex items-center justify-center text-stone-400 font-heading italic text-2xl animate-pulse">Loading masterpiece...</div>;
  if (error || !exhibit) return <div className="min-h-screen flex items-center justify-center text-red-800 font-serif text-xl">{error || 'Exhibit not found'}</div>;


  const formatDateForInput = (dateString) => new Date(dateString).toISOString().split('T')[0];
  const totalPrice = exhibit.price * quantity;


  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      
      {/* Editorial Header Section */}
      <div className="max-w-7xl mx-auto pt-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Image */}
            <div className="lg:col-span-7 relative group">
                <div className="aspect-[4/3] overflow-hidden rounded-sm shadow-xl">
                    <img
                        src={exhibit.imageUrl}
                        alt={exhibit.title}
                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 ease-out"
                        onError={(e) => {e.target.src = 'https://via.placeholder.com/800x600?text=ArtTix'}}
                    />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-stone-900 text-stone-50 px-8 py-4 text-xl font-heading italic z-10 shadow-lg hidden md:block">
                    {exhibit.price === 0 ? 'Free Entry' : `$${exhibit.price}`}
                </div>
            </div>

            {/* Right Column: Title & Info */}
            <div className="lg:col-span-5 flex flex-col justify-center py-4">
                <p className="text-orange-700 font-bold uppercase tracking-[0.2em] text-xs mb-4">
                    {exhibit.artist}
                </p>
                <h1 className="text-5xl md:text-6xl font-heading text-stone-900 mb-8 leading-none">
                    {exhibit.title}
                </h1>
                
                <div className="space-y-4 text-stone-600 font-light border-l-2 border-orange-200 pl-6 mb-10">
                    <div className="flex items-center gap-3">
                        <FaCalendarAlt className="text-orange-800" />
                        <span className="text-sm uppercase tracking-wide font-medium">
                            {new Date(exhibit.startDate).toLocaleDateString()} — {new Date(exhibit.endDate).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-orange-800" />
                        <span className="text-sm uppercase tracking-wide font-medium">Main Gallery Hall</span>
                    </div>
                </div>

                <div className="prose prose-stone prose-lg text-stone-500 font-serif leading-relaxed">
                    <p>{exhibit.description}</p>
                </div>
            </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="max-w-4xl mx-auto mt-24 px-6">
        <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-stone-200 relative overflow-hidden">
             
             {/* Success Overlay */}
             {bookingSuccess && (
                 <div className="absolute inset-0 bg-stone-50/95 z-20 flex flex-col items-center justify-center text-stone-800 transition-opacity duration-500 backdrop-blur-sm">
                     <FaCheckCircle className="text-6xl mb-6 text-green-700"/>
                     <h3 className="text-4xl font-heading mb-2">Reserved.</h3>
                     <p className="font-mono text-sm uppercase tracking-widest">Redirecting to tickets...</p>
                 </div>
             )}

            <div className="flex items-end justify-between mb-8 border-b border-stone-100 pb-4">
                <h3 className="text-3xl font-heading text-stone-900">Acquire Tickets</h3>
                <span className="text-stone-400 text-sm font-mono hidden sm:block">Step 01 / 02</span>
            </div>

            {bookingError && (
                <div className="bg-red-50 text-red-900 p-4 border-l-4 border-red-800 mb-8 text-sm font-medium font-serif italic">
                    {bookingError}
                </div>
            )}

            <form onSubmit={handleBookTicket} className="space-y-10">
              
              {/* Date Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Select Date</label>
                <input
                  type="date"
                  value={visitDate}
                  min={formatDateForInput(exhibit.startDate)}
                  max={formatDateForInput(exhibit.endDate)}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full p-4 bg-stone-50 border-b-2 border-stone-200 focus:border-orange-700 outline-none transition-colors text-stone-800 font-mono"
                  required
                />
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Select Time</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {exhibit.timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 px-2 text-sm font-medium transition-all border
                        ${selectedSlot === slot
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-transparent text-stone-500 border-stone-200 hover:border-stone-400'
                        }`}
                    >
                       <div className="flex flex-col items-center gap-1">
                           <FaClock className={`text-xs ${selectedSlot === slot ? 'text-orange-400' : 'text-stone-300'}`}/>
                           <span>{slot}</span>
                       </div>
                    </button>
                  ))}
                </div>
              </div>

               {/* Footer: Quantity & Price */}
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8 border-t border-stone-100">
                    <div className="flex items-center gap-6">
                        <label className="text-xs font-bold text-stone-400 uppercase tracking-widest">Quantity</label>
                        <div className="flex items-center border border-stone-200 rounded-full">
                            <button type="button" onClick={() => handleQuantityChange(-1)} className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full transition">-</button>
                            <span className="w-10 text-center font-bold text-stone-900 font-heading text-lg">{quantity}</span>
                            <button type="button" onClick={() => handleQuantityChange(1)} className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-full transition">+</button>
                        </div>
                    </div>

                    <div className="text-right flex items-center gap-6 justify-between md:justify-end w-full md:w-auto">
                        <div className="text-right">
                            <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Total</p>
                            <p className="text-3xl font-heading text-stone-900">
                                ${totalPrice}
                            </p>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={bookingLoading || !visitDate || !selectedSlot || bookingSuccess}
                            className={`bg-stone-900 hover:bg-orange-800 text-white px-8 py-4 rounded-sm transition-all duration-300 shadow-md flex items-center gap-3 uppercase text-xs font-bold tracking-widest
                            ${(bookingLoading || bookingSuccess) ? 'opacity-75 cursor-not-allowed' : ''}
                            ${(!visitDate || !selectedSlot) ? 'opacity-50 cursor-not-allowed bg-stone-300' : ''}
                            `}
                        >
                            {bookingSuccess ? 'Confirmed' : bookingLoading ? 'Processing...' : user ? 'Confirm Booking' : 'Login to Book'}
                            {!bookingLoading && !bookingSuccess && <FaTicketAlt />}
                        </button>
                    </div>
               </div>
            </form>
          </div>
      </div>
    </div>
  );
};

export default ExhibitDetails;