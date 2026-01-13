import { Link } from 'react-router-dom';

const ExhibitCard = ({ exhibit }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="h-52 overflow-hidden relative bg-gray-100 group">
         <img
           src={exhibit.imageUrl}
           alt={exhibit.title}
           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
           onError={(e) => {e.target.src = 'https://via.placeholder.com/600x400?text=No+Image'}}
         />
         <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold shadow-sm text-gray-800">
            {exhibit.price === 0 ? 'Free Entry' : `$${exhibit.price}`}
         </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
            <p className="text-sm font-semibold text-blue-600 mb-1">{exhibit.artist}</p>
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">{exhibit.title}</h3>
        </div>

        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
            {exhibit.description}
        </p>


        <div className="border-t border-gray-100 pt-4 mt-auto">
            <p className="text-sm text-gray-500 mb-4">
              <span className="block text-xs uppercase tracking-wide text-gray-400 font-semibold">Open Until</span>
               {formatDate(exhibit.endDate)}
            </p>

            <Link
              to={`/exhibit/${exhibit._id}`}
              className="block w-full text-center bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-gray-800 transition-colors"
            >
              View Details & Book
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ExhibitCard;