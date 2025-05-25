import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Dashboard from './pages/Website/Dashboard';
import About from './pages/Website/About';
import Location from './pages/Website/Location';
import Menu from './pages/Website/Menu';
import Login from './pages/Login';

import AdminMenu from './pages/Admin/AdminMenu';
import Users from './pages/Admin/Users';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container" style={{ paddingTop: '80px' }}>
        <Routes>
          {/* Website pages */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/location" element={<Location />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />

          {/* Admin pages */}
          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route path="/admin/users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
