import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import ExhibitCard from '../components/ExhibitCard';
import { EXHIBITS_URL } from '../constant';
import { FaQuoteLeft, FaInstagram, FaTwitter, FaGlobe, FaFacebookF } from 'react-icons/fa';

const ArtistDetails = () => {
  const { name } = useParams();
  const [artistExhibits, setArtistExhibits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Expanded MOCK_DATA with Socials
  const MOCK_ARTIST_DATA = {
    [name]: {
      bio: "An avant-garde visionary exploring the intersection of digital landscapes and classical emotivity. Their work challenges the viewer to reconsider the permanence of memory.",
      quote: "Art is not what you see, but what you make others see.",
      founded: "2018",
      studio: "Berlin, Germany",
      socials: {
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        website: "https://example.com"
      }
    },
    "default": {
      bio: "A celebrated contemporary artist whose works have been featured in major galleries across Europe and North America. Known for bold textures and thematic depth.",
      quote: "Creation is the only way to silence the noise of existence.",
      founded: "2020",
      studio: "New York, USA",
      socials: {
        instagram: "#",
        facebook: "#",
        website: "#"
      }
    }
  };

  const artistInfo = MOCK_ARTIST_DATA[name] || MOCK_ARTIST_DATA["default"];

  useEffect(() => {
    const fetchArtistWork = async () => {
      try {
        const res = await axiosInstance.get(`${EXHIBITS_URL}`);
        const works = res.data.filter(
            exhibit => exhibit.artist.toLowerCase() === name.toLowerCase()
        );
        setArtistExhibits(works);
      } catch (err) {
        console.error('Error loading artist works:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtistWork();
  }, [name]);

  if (isLoading) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-stone-400 font-heading italic text-2xl animate-pulse">Loading portfolio...</div>
        </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen pb-24">
      
      {/* Artist Hero / Profile */}
      <section className="bg-stone-900 text-stone-50 pt-20 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
                <div>
                    <p className="text-orange-500 uppercase tracking-[0.25em] text-xs font-bold mb-4">Featured Artist</p>
                    <h1 className="text-6xl md:text-8xl font-heading">{name}</h1>
                </div>
                
                {/* Social Links */}
                <div className="flex gap-6 mt-4 md:mt-0">
                    {artistInfo.socials.website && (
                        <a href={artistInfo.socials.website} target="_blank" rel="noreferrer" className="text-stone-500 hover:text-orange-500 transition-colors p-2 border border-stone-800 rounded-full hover:border-orange-500">
                            <FaGlobe />
                        </a>
                    )}
                    {artistInfo.socials.instagram && (
                        <a href={artistInfo.socials.instagram} target="_blank" rel="noreferrer" className="text-stone-500 hover:text-orange-500 transition-colors p-2 border border-stone-800 rounded-full hover:border-orange-500">
                            <FaInstagram />
                        </a>
                    )}
                    {artistInfo.socials.twitter && (
                        <a href={artistInfo.socials.twitter} target="_blank" rel="noreferrer" className="text-stone-500 hover:text-orange-500 transition-colors p-2 border border-stone-800 rounded-full hover:border-orange-500">
                            <FaTwitter />
                        </a>
                    )}
                     {artistInfo.socials.facebook && (
                        <a href={artistInfo.socials.facebook} target="_blank" rel="noreferrer" className="text-stone-500 hover:text-orange-500 transition-colors p-2 border border-stone-800 rounded-full hover:border-orange-500">
                            <FaFacebookF />
                        </a>
                    )}
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-stone-800 pt-12">
                <div>
                    <h3 className="text-xl font-heading mb-4 text-stone-300 italic">About the Artist</h3>
                    <p className="text-stone-400 font-light leading-relaxed text-lg">
                        {artistInfo.bio}
                    </p>
                    <div className="mt-8 flex gap-8 text-xs font-mono text-stone-500 uppercase tracking-widest">
                        <div>
                            <span className="block text-stone-700">Studio</span>
                            {artistInfo.studio}
                        </div>
                        <div>
                            <span className="block text-stone-700">Est.</span>
                            {artistInfo.founded}
                        </div>
                    </div>
                </div>

                <div className="relative pl-8 md:pl-12 border-l border-stone-800">
                    <FaQuoteLeft className="absolute top-0 left-4 md:left-6 text-stone-800 text-4xl -translate-x-1/2 -translate-y-1/2" />
                    <blockquote className="font-heading text-2xl md:text-3xl leading-snug text-stone-200">
                        "{artistInfo.quote}"
                    </blockquote>
                </div>
            </div>
        </div>
      </section>

      {/* List of Arts (Exhibits) */}
      <section className="max-w-7xl mx-auto px-6 -mt-10">
        <div className="bg-white p-8 md:p-12  shadow-xl border border-stone-100">
            <div className="flex items-end justify-between mb-10 border-b border-stone-100 pb-4">
                <h2 className="text-3xl font-heading text-stone-900">Curated Collections</h2>
                <span className="font-mono text-xs text-stone-400">{artistExhibits.length} WORKS ON DISPLAY</span>
            </div>

            {artistExhibits.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-stone-500 italic">No current exhibitions found for this artist.</p>
                    <Link to="/" className="text-stone-900 font-bold underline mt-4 inline-block text-sm">Return to Main Gallery</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {artistExhibits.map((exhibit) => (
                        <ExhibitCard key={exhibit._id} exhibit={exhibit} />
                    ))}
                </div>
            )}
        </div>
      </section>
    </div>
  );
};

export default ArtistDetails;