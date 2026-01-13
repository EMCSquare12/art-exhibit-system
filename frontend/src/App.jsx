import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ExhibitDetails from './pages/ExhibitDetails';
import MyTickets from './pages/MyTickets';

import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow container mx-auto max-w-6xl px-4 py-8"><Home /></main>
              <footer className="bg-gray-100 text-center p-6 text-gray-500 text-sm">© ArtTix Public Footer</footer>
            </div>
        } />
         <Route path="/login" element={<><Navbar /><main className="container mx-auto px-4 py-8"><Login /></main></>} />
         <Route path="/register" element={<><Navbar /><main className="container mx-auto px-4 py-8"><Register /></main></>} />
         <Route path="/exhibit/:id" element={<><Navbar /><main className="container mx-auto px-4 py-8"><ExhibitDetails /></main></>} />
         <Route path="/my-tickets" element={<><Navbar /><main className="container mx-auto px-4 py-8"><MyTickets /></main></>} />


        <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;