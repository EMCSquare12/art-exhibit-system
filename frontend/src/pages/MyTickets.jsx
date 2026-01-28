import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import QRCode from 'react-qr-code';
import { FaTicketAlt, FaCalendarDay, FaClock, FaMapMarkerAlt, FaHashtag, FaCheckCircle, FaHistory } from 'react-icons/fa';
import { ORDERS_URL } from '../constant';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axiosInstance.get(`${ORDERS_URL}/my-orders`);
        setTickets(res.data);
      } catch (err) {
        console.error('Error fetching tickets:', err);
        setError('Unable to retrieve your collection.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTickets();
    }
  }, [user]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <div className="text-stone-300 animate-pulse text-6xl font-heading">ArtTix.</div>
        <div className="text-stone-400 font-mono text-xs uppercase tracking-widest">Retrieving passes...</div>
    </div>
  );

  if (error) return (
      <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-red-900 font-serif italic text-xl border-b border-red-200 pb-2">{error}</div>
      </div>
  );

  if (tickets.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="border border-stone-200 p-12 rounded-sm max-w-lg w-full bg-white shadow-sm">
            <h2 className="text-3xl font-heading text-stone-900 mb-4">Your collection is empty.</h2>
            <p className="text-stone-500 mb-8 font-light leading-relaxed">You have not reserved entry to any exhibitions yet. Curate your experience today.</p>
            <Link to="/" className="inline-block bg-stone-900 hover:bg-orange-800 text-white font-bold uppercase tracking-widest text-xs py-4 px-8 transition-colors">
            View Exhibitions
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen pb-24">
      <div className="max-w-5xl mx-auto pt-16 px-6">
        
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
            <div>
                <p className="text-xs font-bold text-orange-700 uppercase tracking-widest mb-2">Member Access</p>
                <h1 className="text-5xl font-heading text-stone-900">Gallery Passes</h1>
            </div>
            <p className="text-stone-400 font-mono text-xs text-right">
                {tickets.length} {tickets.length === 1 ? 'ENTRY' : 'ENTRIES'} FOUND
            </p>
        </header>

        <div className="space-y-12">
            {tickets?.map((ticket) => {
            const isUsed = ticket.scannedAt !== null;
            
            return (
                <div key={ticket._id} className={`group flex flex-col md:flex-row bg-white shadow-xl ${isUsed ? 'opacity-60 grayscale' : ''}`}>
                    
                    {/* Image Section */}
                    <div className="md:w-1/3 relative h-64 md:h-auto overflow-hidden">
                        <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                        <img
                            src={ticket.exhibit.imageUrl}
                            alt={ticket.exhibit.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {e.target.src = 'https://via.placeholder.com/400x300?text=ArtTix'}}
                        />
                        <div className="absolute top-0 left-0 bg-white px-4 py-2 z-20">
                            <span className={`text-xs font-bold uppercase tracking-widest ${isUsed ? 'text-stone-400' : 'text-stone-900'}`}>
                                {isUsed ? 'Archived' : 'Admit One'}
                            </span>
                        </div>
                    </div>

                    {/* Ticket Details (Tear-off effect) */}
                    <div className="flex-1 p-8 md:p-10 flex flex-col justify-between border-r border-stone-100 border-dashed relative">
                        {/* Perforation circles for visual effect */}
                        <div className="absolute -right-3 top-0 bottom-0 w-6 flex flex-col justify-between overflow-hidden pointer-events-none">
                             {[...Array(12)].map((_, i) => (
                                 <div key={i} className="w-6 h-6 rounded-full bg-stone-50 -my-3"></div>
                             ))}
                        </div>

                        <div>
                            <h3 className="text-3xl font-heading text-stone-900 mb-6 leading-tight">{ticket.exhibit.title}</h3>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                <div>
                                    <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Date</p>
                                    <div className="flex items-center gap-2 text-stone-800 font-medium">
                                        <FaCalendarDay className="text-stone-400" />
                                        <span>{formatDate(ticket.visitDate)}</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Time</p>
                                    <div className="flex items-center gap-2 text-stone-800 font-medium">
                                        <FaClock className="text-stone-400" />
                                        <span>{ticket.timeSlot}</span>
                                    </div>
                                </div>
                                <div className="sm:col-span-2 mt-2">
                                    <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Venue</p>
                                    <div className="flex items-center gap-2 text-stone-800 font-medium">
                                        <FaMapMarkerAlt className="text-stone-400" />
                                        <span>Main Gallery Hall • Wing A</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-stone-100 flex justify-between items-end">
                             <div className="text-xs font-mono text-stone-400">
                                QTY: 0{ticket.quantity}
                             </div>
                             {isUsed ? (
                                <div className="flex items-center gap-2 text-stone-400 font-serif italic">
                                    <FaHistory /> Visited
                                </div>
                             ) : (
                                <div className="flex items-center gap-2 text-green-700 font-bold text-xs uppercase tracking-widest">
                                    <FaCheckCircle /> Valid Entry
                                </div>
                             )}
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="md:w-64 bg-stone-100 p-8 flex flex-col items-center justify-center border-l-2 border-dashed border-stone-300 relative">
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6 rotate-0 md:rotate-90 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 whitespace-nowrap">
                            Scan for Entry
                        </p>

                        <div className="bg-white p-4 shadow-sm mb-6 mix-blend-multiply">
                            <QRCode
                                value={ticket.bookingId}
                                size={100}
                                fgColor="#1c1917" // stone-900
                                bgColor="#ffffff"
                            />
                        </div>

                        <div className="text-center">
                            <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1">Ref ID</p>
                            <p className="font-mono text-stone-900 text-sm tracking-wider">{ticket.bookingId.slice(-6).toUpperCase()}</p>
                        </div>
                    </div>

                </div>
            )})}
        </div>
      </div>
    </div>
  );
};

export default MyTickets;