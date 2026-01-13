import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ExhibitDetails from './pages/ExhibitDetails';
import MyTickets from './pages/MyTickets';

function App() {
  return (
    <Router>
      {/* A temporary navbar placeholder */}
      <nav className="bg-black text-white p-4">
        <div className="container mx-auto font-bold">Art Exhibit System</div>
      </nav>

      {/* Main Content Container */}
      <main className="container mx-auto min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* The ":id" is a dynamic parameter for the specific exhibit */}
          <Route path="/exhibit/:id" element={<ExhibitDetails />} />
          {/* We will protect this route later */}
          <Route path="/my-tickets" element={<MyTickets />} />
        </Routes>
      </main>

      {/* Temporary Footer */}
      <footer className="bg-gray-200 text-center p-4 mt-10">
        © 2026 Art Exhibit System
      </footer>
    </Router>
  );
}

export default App;