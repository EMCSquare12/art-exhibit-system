import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ExhibitDetails from './pages/ExhibitDetails';
import ArtistDetails from './pages/ArtistDetails';
import MyTickets from './pages/MyTickets';

import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Gallery from './pages/Gallery';
import Artists from './pages/Artists';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
            <div className="flex flex-col min-h-screen font-sans text-stone-900 bg-stone-50">
              <Navbar />
              <main className="grow w-full"><Home /></main>
              <footer className="bg-stone-900 text-center p-12 text-stone-500 text-xs tracking-widest uppercase">
                <div className="mb-4 text-stone-300 font-heading text-xl italic">ArtTix.</div>
                © {new Date().getFullYear()} Art Exhibit System. All Rights Reserved.
              </footer>
            </div>
        } />
        <Route path="/gallery" element={<><Navbar /><main className="grow w-full"><Gallery /></main></>} />
        <Route path="/artists" element={<><Navbar /><main className="grow w-full"><Artists /></main></>} />
         <Route path="/login" element={<><Navbar /><main className="container mx-auto px-4 py-8"><Login /></main></>} />
         <Route path="/register" element={<><Navbar /><main className="container mx-auto px-4 py-8"><Register /></main></>} />
         <Route path="/exhibit/:id" element={<><Navbar /><main className="container mx-auto px-4 py-8"><ExhibitDetails /></main></>} />
         <Route path="/artist/:name" element={<><Navbar /><main className="grow w-full"><ArtistDetails /></main></>} /> {/* Added Route */}
         <Route path="/my-tickets" element={<><Navbar /><main className="container mx-auto px-4 py-8"><MyTickets /></main></>} />


        <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;