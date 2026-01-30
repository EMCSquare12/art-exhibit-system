import { Link } from 'react-router-dom';

const GalleryCard = ({ exhibit }) => {
  return (
    <Link to={`/exhibit/${exhibit._id}`} className="group relative block overflow-hidden rounded-sm bg-stone-200">
      <img
        src={exhibit.imageUrl}
        alt={exhibit.title}
        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
      />
      {/* Visual Overlay on Hover */}
      <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
        <p className="text-orange-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-1">
          {exhibit.artist}
        </p>
        <h3 className="text-white text-xl font-heading italic leading-tight">
          {exhibit.title}
        </h3>
      </div>
    </Link>
  );
};

export default GalleryCard;