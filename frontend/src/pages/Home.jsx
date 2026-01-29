import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import ExhibitCard from '../components/ExhibitCard';
import { EXHIBITS_URL } from '../constant';
import PageLoader from '../components/PageLoader';
import ErrorMessage from '../components/ErrorMessage';

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

 if (isLoading) {
    return <PageLoader message="Curating artwork..." />;
  }

  if (error) {
    return <ErrorMessage message={error} subtitle="Server status: Offline" />;
  }

  return (
    <div id='#home' className="bg-stone-50 min-h-screen">
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-100/50 rounded-full blur-3xl -z-0 opacity-60 pointer-events-none"></div>
      </section>

      {/* Exhibits Grid */}
      <section id="exhibits" className="max-w-7xl mx-auto px-6 pb-24">
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
    </div>
  );
};

export default Home;