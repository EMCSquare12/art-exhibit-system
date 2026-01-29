const PageLoader = ({ message = "Curating artwork..." }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-stone-400 font-heading italic text-2xl animate-pulse">
        {message}
      </div>
    </div>
  );
};

export default PageLoader;