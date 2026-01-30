import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import { EXHIBITS_URL } from '../constant';
import GalleryCard from '../components/GalleryCard'; // New Component
import PageLoader from '../components/PageLoader';

const Gallery = () => {
  const [exhibits, setExhibits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExhibits = async () => {
      try {
        const res = await axiosInstance.get(EXHIBITS_URL); // Fetches all active exhibits
        setExhibits(res.data);
      } catch (err) {
        console.error('Error loading gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchExhibits();
  }, []);

  if (loading) return <PageLoader message="Curating the collection..." />;

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Minimalist Header Section */}
      <section className="pt-20 pb-16 px-6 border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <p className="text-orange-700 uppercase tracking-[0.3em] text-[10px] font-bold mb-4">Permanent & Rotating</p>
          <h1 className="text-6xl md:text-7xl font-medium text-stone-900 font-heading leading-none">
            The <span className="italic font-light text-stone-400">Archive.</span>
          </h1>
        </div>
      </section>

      {/* Redesigned Gallery Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {exhibits.length === 0 ? (
          <div className="text-center py-40">
            <p className="text-stone-400 font-serif italic text-2xl">The archive is currently being updated.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {/* Using Masonry-like 'columns' utility for a different feel than the Home grid */}
            {exhibits.map((exhibit) => (
              <div key={exhibit._id} className="break-inside-avoid">
                <GalleryCard exhibit={exhibit} />
              </div>
            ))}
          </div>
        )}
      </section>
      
      {/* Subtle Footer Info */}
      <section className="max-w-7xl mx-auto px-6 pb-20 text-center">
        <div className="pt-10 border-t border-stone-100">
          <p className="text-stone-400 font-mono text-[10px] uppercase tracking-widest">
            Total Works on Display: {exhibits.length}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Gallery;