import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import ExhibitCard from '../components/ExhibitCard';
import { EXHIBITS_URL } from '../constant';
import PageLoader from '../components/PageLoader';
import ErrorMessage from '../components/ErrorMessage';
import { FaArrowRight, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Home = () => {
  const [exhibits, setExhibits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExhibits = async () => {
      try {
        const res = await axiosInstance.get(`${EXHIBITS_URL}`);
        setExhibits(res.data);
      } catch (err) {
        console.error('Error fetching exhibits:', err);
        setError('Failed to load exhibits. Is the backend running?');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExhibits();
  }, []); 

  // Extract unique artists for the section
  const uniqueArtists = [...new Set(exhibits.map(e => e.artist))].slice(0, 5);

  if (isLoading) {
    return <PageLoader message="Curating artwork..." />;
  }

  if (error) {
    return <ErrorMessage message={error} subtitle="Server status: Offline" />;
  }

  return (
    <div id='home' className="bg-stone-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
            <p className="text-orange-700 uppercase tracking-[0.2em] text-xs font-bold mb-6">
                Established 2026
            </p>
            <h1 className="text-6xl md:text-8xl font-medium text-stone-900 mb-8 leading-[0.9] tracking-tight font-heading">
              The Art of <br/> <span className="italic font-light text-stone-500">Perspective.</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
              Immerse yourself in a rotating selection of contemporary exhibitions. 
              <br className="hidden md:block" /> Culture, curated for the modern mind.
            </p>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-orange-100/50 rounded-full blur-3xl z-0 opacity-60 pointer-events-none"></div>
      </section>

      {/* Exhibits Grid */}
      <section id="exhibits" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-16 border-b border-stone-200 pb-4">
          <h2 className="text-4xl font-normal text-stone-900 font-heading">Current Viewings</h2>
          <span className="text-stone-400 font-mono text-xs hidden md:block">SCROLL DOWN ↓</span>
        </div>

        {exhibits.length === 0 ? (
          <div className="text-center py-24 bg-stone-100 rounded-lg border border-stone-200 border-dashed">
            <p className="text-stone-500 font-serif italic text-2xl">The gallery is currently preparing new works.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {exhibits?.map((exhibit) => (
              <ExhibitCard key={exhibit._id} exhibit={exhibit} />
            ))}
          </div>
        )}
      </section>

      {/* Featured Artists Section (Dark Theme) */}
      <section id="artists" className="bg-stone-900 text-stone-50 py-24 px-6 overflow-hidden relative">
         {/* Background Decor */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>

         <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
                <div>
                    <p className="text-orange-500 uppercase tracking-[0.2em] text-xs font-bold mb-4">Visionaries</p>
                    <h2 className="text-5xl md:text-6xl font-heading leading-tight">Featured <br/> <span className="italic text-stone-500">Artists.</span></h2>
                </div>
                <Link to="/artists" className="hidden md:inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:gap-6 transition-all duration-300">
                    View All Artists <FaArrowRight />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {uniqueArtists.length > 0 ? uniqueArtists.map((artist, index) => (
                    <Link to={`/artist/${artist}`} key={index} className="group block border-t border-stone-800 pt-6 hover:border-orange-500 transition-colors">
                        <span className="block text-xs font-mono text-stone-500 mb-2">0{index + 1}</span>
                        <h3 className="text-2xl font-heading text-stone-300 group-hover:text-white transition-colors">{artist}</h3>
                    </Link>
                )) : (
                    <div className="col-span-4 text-stone-500 italic font-serif">Artist roster announcing soon.</div>
                )}
            </div>
            
            <div className="mt-12 md:hidden">
                <Link to="/artists" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-orange-500 transition-colors">
                    View All <FaArrowRight />
                </Link>
            </div>
         </div>
      </section>

      {/* The Gallery / Info Section */}
<section id="gallery" className="py-24 px-6 bg-orange-50/50">
    <div className="max-w-7xl mx-auto">
        {/* Added Header with Button matching Artist section style */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 border-b border-stone-200 pb-8">
            <div>
                <p className="text-orange-700 uppercase tracking-[0.2em] text-xs font-bold mb-4">The Space</p>
                <h2 className="text-5xl font-heading text-stone-900 leading-tight">Architecture <br/> for the Soul.</h2>
            </div>
            <Link to="/gallery" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-stone-900 hover:gap-6 transition-all duration-300">
                Explore Full Gallery <FaArrowRight className="text-orange-600" />
            </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div>
                <div className="space-y-6 text-stone-600 font-serif text-lg leading-relaxed">
                    <p>
                        Nestled in the heart of the cultural district, ArtTix Gallery serves as a sanctuary for modern expression. 
                        Our space is designed not just to house art, but to amplify its voice.
                    </p>
                    <p>
                        With over 12,000 square feet of exhibition space, light-flooded atriums, and acoustic isolation chambers, 
                        every exhibit is an immersive journey.
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t border-stone-200">
                    <div>
                        <div className="flex items-center gap-2 text-stone-900 font-bold uppercase text-xs tracking-widest mb-2">
                            <FaClock className="text-orange-600"/> Opening Hours
                        </div>
                        <p className="text-sm text-stone-600 font-mono">Daily: 10:00 AM — 08:00 PM</p>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 text-stone-900 font-bold uppercase text-xs tracking-widest mb-2">
                            <FaMapMarkerAlt className="text-orange-600"/> Location
                        </div>
                        <p className="text-sm text-stone-600 font-mono">123 Innovation Dr, Creative City</p>
                    </div>
                </div>
            </div>

            {/* Image */}
            <div className="relative h-[600px] w-full rounded-sm overflow-hidden group shadow-2xl">
                <img 
                    src="https://images.unsplash.com/photo-1577724618750-936688cb62cc?q=80&w=2070&auto=format&fit=crop" 
                    alt="Gallery Interior" 
                    className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                <div className="absolute bottom-0 left-0 bg-white p-6 max-w-xs shadow-lg">
                    <p className="font-heading text-xl italic text-stone-900">"A masterpiece of minimalism."</p>
                    <p className="text-xs uppercase tracking-widest text-stone-400 mt-2">— Architectural Digest</p>
                </div>
            </div>
        </div>
    </div>
</section>

    </div>
  );
};

export default Home;