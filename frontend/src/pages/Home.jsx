import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import ExhibitCard from '../components/ExhibitCard';
import { FaPalette } from 'react-icons/fa';

const Home = () => {
  const [exhibits, setExhibits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExhibits = async () => {
      try {
        const res = await axiosInstance.get('/exhibits');
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
    return <div className="text-center py-24 text-gray-500 animate-pulse">Loading current exhibits...</div>;
  }

  if (error) {
    return (
        <div className="text-center py-24">
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-gray-600">Please make sure your Node.js server is running on port 5000.</p>
        </div>
    )
  }

  return (
    <div>
      <section className="mb-16 text-center py-20 bg-gradient-to-b from-blue-50 to-white rounded-3xl px-6">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6 text-blue-600">
            <FaPalette className="text-2xl" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
          Curating the Future <br/> of Modern Art.
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Explore our rotating selection of contemporary exhibitions and secure your spot today.
        </p>
      </section>

      <section id="exhibits">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Current Exhibitions</h2>
        </div>

        {exhibits.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <p className="text-gray-500 text-lg">No active exhibits at the moment. Please check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* {exhibits?.map((exhibit) => (
              <ExhibitCard key={exhibit._id} exhibit={exhibit} />
            ))} */}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;