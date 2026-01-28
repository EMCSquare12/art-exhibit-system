import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const ExhibitCard = ({ exhibit }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="group flex flex-col h-full bg-transparent">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden  mb-6 bg-gray-100">
         <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
         <img
           src={exhibit.imageUrl}
           alt={exhibit.title}
           className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
           onError={(e) => {e.target.src = 'https://via.placeholder.com/600x800?text=ArtTix'}}
         />
         <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-stone-900 px-3 py-1 text-xs uppercase font-bold tracking-wider z-20">
            {exhibit.price === 0 ? 'Free' : `$${exhibit.price}`}
         </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
            {/* LINK TO ARTIST SCREEN */}
            <Link 
                to={`/artist/${exhibit.artist}`} 
                className="text-xs font-bold text-orange-700 uppercase tracking-widest hover:underline hover:text-orange-900 transition-colors z-30"
            >
                {exhibit.artist}
            </Link>
            
            <p className="text-xs text-stone-400 font-mono text-right">Until {new Date(exhibit.endDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</p>
        </div>
        
        <h3 className="text-2xl font-medium text-stone-900 mb-3 font-heading leading-tight group-hover:text-stone-600 transition-colors">
            {exhibit.title}
        </h3>

        <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 mb-6 font-light">
            {exhibit.description}
        </p>

        <div className="mt-auto pt-4 border-t border-stone-200">
            <Link
              to={`/exhibit/${exhibit._id}`}
              className="inline-flex items-center gap-2 text-stone-900 text-sm font-bold uppercase tracking-wider hover:gap-4 transition-all duration-300"
            >
              Reserve Ticket <FaArrowRight className="text-xs" />
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ExhibitCard;