import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import { EXHIBITS_URL, USERS_URL } from '../constant';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';

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
        navigate(`${USERS_URL}/login`);
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

        await axiosInstance.post(`${ORDERS_URL}`, orderData);

        setBookingSuccess(true);
        setTimeout(() => {
             navigate(`${TICKETS_URL}`);
        }, 2000);

    } catch (err) {
        setBookingError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
        setBookingLoading(false);
    }
  };


  if (loading) return <div className="text-center py-20 animate-pulse">Loading details...</div>;
  if (error || !exhibit) return <div className="text-center py-20 text-red-600">{error || 'Exhibit not found'}</div>;


  const formatDateForInput = (dateString) => new Date(dateString).toISOString().split('T')[0];
  const totalPrice = exhibit.price * quantity;


  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2 h-64 md:h-auto relative bg-gray-100">
          <img
            src={exhibit.imageUrl}
            alt={exhibit.title}
            className="w-full h-full object-cover"
             onError={(e) => {e.target.src = 'https://via.placeholder.com/800x600?text=No+Image'}}
          />
             <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl font-bold text-lg shadow-sm text-blue-900">
             {exhibit.price === 0 ? 'Free Entry' : `$${exhibit.price} / person`}
          </div>
        </div>

        <div className="md:w-1/2 p-8 lg:p-12 flex flex-col">

          <div className="mb-8">
            <p className="text-blue-600 font-semibold mb-2">{exhibit.artist}</p>
            <h1 className="text-4xl font-black text-gray-900 mb-6 leading-tight">{exhibit.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-2xl">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-400" />
                <span>{new Date(exhibit.startDate).toLocaleDateString()} — {new Date(exhibit.endDate).toLocaleDateString()}</span>
              </div>
               <div className="flex items-center gap-2">
                 <FaMapMarkerAlt className="text-blue-400"/>
                 <span>Main Gallery Hall</span>
               </div>
            </div>
          </div>

          <div className="mb-10">
             <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                 <FaInfoCircle className="text-gray-400 text-base"/> About the Exhibit
             </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{exhibit.description}</p>
          </div>


          <div className="bg-blue-50 p-6 lg:p-8 rounded-3xl mt-auto border border-blue-100 shadow-sm relative overflow-hidden">
             {bookingSuccess && (
                 <div className="absolute inset-0 bg-green-50 z-20 flex flex-col items-center justify-center text-green-800 transition-opacity duration-300">
                     <FaCheckCircle className="text-5xl mb-4 text-green-500"/>
                     <h3 className="text-2xl font-bold">Booking Confirmed!</h3>
                     <p>Redirecting to your tickets...</p>
                 </div>
             )}

            <h3 className="text-xl font-bold text-gray-900 mb-6">Reserve Your Spot</h3>

            {bookingError && (
                <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4 text-sm font-medium">
                    {bookingError}
                </div>
            )}

            <form onSubmit={handleBookTicket} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Date</label>
                <input
                  type="date"
                  value={visitDate}
                  min={formatDateForInput(exhibit.startDate)}
                  max={formatDateForInput(exhibit.endDate)}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Time Slot</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {exhibit.timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-2
                        ${selectedSlot === slot
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-[1.02]'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                        }`}
                    >
                       <FaClock className={selectedSlot === slot ? 'text-blue-200' : 'text-gray-400'}/>
                      {slot}
                    </button>
                  ))}
                </div>
                 {!selectedSlot && <p className="text-xs text-red-500 mt-2 font-medium">Please select a time.</p>}
              </div>

               <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 p-4 bg-white rounded-xl border border-gray-100">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Quantity</label>
                      <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 w-fit">
                          <button type="button" onClick={() => handleQuantityChange(-1)} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition">-</button>
                          <span className="w-12 text-center font-bold text-gray-800">{quantity}</span>
                          <button type="button" onClick={() => handleQuantityChange(1)} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition">+</button>
                      </div>
                    </div>

                    <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Total Price</p>
                        <p className="text-3xl font-black text-blue-900">
                            ${totalPrice}
                        </p>
                    </div>
               </div>


              <button
                type="submit"
                disabled={bookingLoading || !visitDate || !selectedSlot || bookingSuccess}
                className={`w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 mt-4
                  ${(bookingLoading || bookingSuccess) ? 'opacity-75 cursor-not-allowed' : ''}
                  ${(!visitDate || !selectedSlot) ? 'opacity-50 cursor-not-allowed shadow-none hover:transform-none hover:bg-gray-900' : ''}
                  `}
              >
                 {bookingSuccess ? 'Booked!' : bookingLoading ? 'Processing...' : user ? `Book Now for $${totalPrice}` : 'Login to Book'}
              </button>
                 {!user && (
                     <p className="text-center text-xs text-gray-500 mt-2">You will be redirected to the login page.</p>
                 )}
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExhibitDetails;