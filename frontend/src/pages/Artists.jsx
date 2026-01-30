import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import { EXHIBITS_URL } from '../constant';
import PageLoader from '../components/PageLoader';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await axiosInstance.get(EXHIBITS_URL);
        const names = [...new Set(res.data.map(e => e.artist))];
        setArtists(names);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  if (loading) return <PageLoader message="Meeting the visionaries..." />;

  return (
    <div className="bg-stone-50 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-heading mb-12 text-stone-900">Our Artists</h1>
        <div className="space-y-6">
          {artists.map((artist, index) => (
            <Link 
              to={`/artist/${artist}`} 
              key={index}
              className="block p-8 border border-stone-200 hover:border-orange-500 transition-all bg-white shadow-sm"
            >
              <h2 className="text-3xl font-heading text-stone-800">{artist}</h2>
              <p className="text-orange-700 text-xs uppercase tracking-widest mt-2 font-bold">View Portfolio</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artists;