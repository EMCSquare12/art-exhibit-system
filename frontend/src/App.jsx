import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Navbar
import Navbar from './components/Navbar';

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ExhibitDetails from './pages/ExhibitDetails';
import MyTickets from './pages/MyTickets';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/exhibit/:id" element={<ExhibitDetails />} />
            {/* We will protect this route later */}
            <Route path="/my-tickets" element={<MyTickets />} />
          </Routes>
        </main>

        <footer className="bg-gray-100 text-center p-6 text-gray-500 text-sm">
           © {new Date().getFullYear()} ArtTix Exhibit System. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;