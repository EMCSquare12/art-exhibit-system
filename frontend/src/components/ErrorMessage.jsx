const ErrorMessage = ({ message, subtitle }) => {
  return (
    <div className="text-center py-32">
      <p className="text-red-800 font-serif text-2xl mb-4 italic">
        {message || "An unexpected error occurred."}
      </p>
      <p className="text-stone-500 font-mono text-sm">
        {subtitle || "Server status: Check console for details"}
      </p>
    </div>
  );
};

export default ErrorMessage;