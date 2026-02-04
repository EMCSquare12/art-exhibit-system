import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-500 text-xs tracking-widest uppercase border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          
          {/* About & Credentials */}
          <div>
            <h3 className="text-stone-300 font-bold mb-4 text-sm">About ArtTix</h3>
            <p className="mb-4 normal-case tracking-normal leading-relaxed">
              We curate immersive experiences connecting contemporary artists with global audiences.
            </p>
            <div className="mb-2">
              <span className="text-stone-400 font-bold">Credentials:</span>
              <ul className="mt-1 space-y-1 normal-case tracking-normal">
                <li>• Global Art Association Certified</li>
                <li>• ISO 9001 Quality Management</li>
                <li>• 2024 Digital Culture Award</li>
              </ul>
            </div>
          </div>

          {/* Artist Submission Section */}
          <div>
            <h3 className="text-stone-300 font-bold mb-4 text-sm">For Artists</h3>
            <p className="mb-4 normal-case tracking-normal">
              Are you an artist looking to showcase your work in our upcoming exhibits?
            </p>
            <Link 
              to="/register-art" 
              className="inline-block bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white px-4 py-3 transition-all duration-300 border border-stone-700"
            >
              Submit Your Art
            </Link>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-stone-300 font-bold mb-4 text-sm">Contact Us</h3>
            <div className="space-y-2 normal-case tracking-normal">
              <p><span className="text-stone-400">Email:</span> hello@arttix.com</p>
              <p><span className="text-stone-400">Phone:</span> +1 (555) 123-4567</p>
              <p><span className="text-stone-400">Loc:</span> 123 Arts District, Metro City</p>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-stone-300 font-bold mb-4 text-sm">Socials</h3>
            <div className="flex flex-col space-y-2">
              <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                <span>Instagram</span>
              </a>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                <span>Twitter / X</span>
              </a>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                <span>LinkedIn</span>
              </a>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                <span>Facebook</span>
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 text-center">
          <div className="mb-2 text-stone-300 font-heading text-xl italic normal-case">ArtTix.</div>
          <p>© {new Date().getFullYear()} Art Exhibit System. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;