import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import QRCode from 'react-qr-code';
import { FaTicketAlt, FaCalendarDay, FaClock, FaMapMarkerAlt, FaHashtag, FaCheckCircle, FaHistory } from 'react-icons/fa';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axiosInstance.get('/orders/myorders');
        setTickets(res.data);
      } catch (err) {
        console.error('Error fetching tickets:', err);
        setError('Failed to load your tickets. Please try refreshing.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTickets();
    }
  }, [user]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) return <div className="text-center py-24 text-gray-500 animate-pulse flex flex-col items-center gap-4"><FaTicketAlt className="text-4xl text-blue-200"/>Loading your tickets...</div>;

  if (error) return <div className="text-center py-24 text-red-500">{error}</div>;

  if (tickets.length === 0) {
    return (
      <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
        <FaTicketAlt className="text-6xl text-gray-300 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No tickets yet</h2>
        <p className="text-gray-600 mb-8">You haven't booked any exhibitions yet.</p>
        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition">
          Browse Exhibits
        </Link>
      </div>
    );
  }

  return (
    <div>
      <header className="mb-10 flex items-center gap-4 border-b border-gray-100 pb-6">
         <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <FaTicketAlt className="text-2xl"/>
         </div>
        <div>
            <h1 className="text-3xl font-black text-gray-900">My Tickets</h1>
            <p className="text-gray-600">Manage your upcoming and past visits.</p>
        </div>
      </header>

      <div className="space-y-8">
        {tickets.map((ticket) => {
           const isUsed = ticket.scannedAt !== null;
           const ticketStatusClass = isUsed
             ? "bg-gray-100 border-gray-200 text-gray-500"
             : "bg-white border-blue-100 shadow-sm hover:shadow-md";

           return (
          <div key={ticket._id} className={`rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col md:flex-row ${ticketStatusClass}`}>

            {/* Left Side: Exhibit Image & Basic Info */}
            <div className="md:w-1/3 relative h-48 md:h-auto bg-gray-200">
               <img
                 src={ticket.exhibit.imageUrl}
                 alt={ticket.exhibit.title}
                 className={`w-full h-full object-cover ${isUsed ? 'grayscale opacity-70' : ''}`}
                  onError={(e) => {e.target.src = 'https://via.placeholder.com/400x300?text=ArtTix'}}
               />
                <div className="absolute top-4 left-4">
                    {isUsed ? (
                        <span className="bg-gray-800/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                            <FaHistory /> USED / PAST
                        </span>
                    ) : (
                         <span className="bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                            <FaCheckCircle /> READY FOR ENTRY
                        </span>
                    )}
               </div>
               <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-black px-4 py-2 rounded-lg shadow-sm">
                   {ticket.quantity} {ticket.quantity === 1 ? 'Person' : 'People'}
               </div>
            </div>


            <div className="flex-1 p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-100 relative">
                 <div className="absolute -top-3 -right-3 w-6 h-6 bg-gray-50 rounded-full z-10 border-b border-l border-gray-200 hidden md:block"></div>
                 <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gray-50 rounded-full z-10 border-t border-l border-gray-200 hidden md:block"></div>

              <h3 className={`text-2xl font-black mb-6 leading-tight ${isUsed ? 'text-gray-700' : 'text-gray-900'}`}>{ticket.exhibit.title}</h3>

              <div className={`space-y-4 text-sm ${isUsed ? 'text-gray-500' : 'text-gray-600'}`}>
                <div className="flex items-center gap-3">
                  <FaCalendarDay className={isUsed ? 'text-gray-400' : 'text-blue-500'} />
                  <span className="font-medium text-base">{formatDate(ticket.visitDate)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaClock className={isUsed ? 'text-gray-400' : 'text-blue-500'}  />
                  <span className="font-medium text-base">{ticket.timeSlot}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className={isUsed ? 'text-gray-400' : 'text-gray-400'}  />
                  <span>Main Gallery Hall</span>
                </div>
              </div>
            </div>

            <div className={`md:w-64 p-8 bg-gray-50 flex flex-col items-center justify-center text-center relative ${isUsed ? 'opacity-70' : ''}`}>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Entry Token</p>

                <div className="bg-white p-3 rounded-xl shadow-sm mb-4">
                  <QRCode
                      value={ticket.bookingId}
                      size={120}
                      fgColor={isUsed ? "#9CA3AF" : "#111827"} 
                  />
                </div>

               <div className="flex items-center gap-1 text-gray-500 text-sm font-medium bg-white px-3 py-1 rounded-md border border-gray-200">
                   <FaHashtag className="text-gray-400 text-xs"/>
                   <span className="font-mono tracking-wider select-all">{ticket.bookingId}</span>
               </div>
            </div>

          </div>
        )})}
      </div>
    </div>
  );
};

export default MyTickets;