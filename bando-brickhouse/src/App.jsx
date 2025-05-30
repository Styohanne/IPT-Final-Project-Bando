import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import Navbar from './components/Navbar';

import Dashboard from './pages/Website/Dashboard';
import Menu from './pages/Website/Menu';
import Login from './pages/Login';

import AdminMenu from './pages/Admin/AdminMenu';
import Users from './pages/Admin/Users';

import "./styles/Login.css";

// Layout-aware component to use Router hooks
function AppLayout() {
  const location = useLocation();

  // Define paths where Navbar should be hidden
  const hideNavbarPaths = ['/login', '/admin/menu', '/admin/users'];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className="container" style={{ paddingTop: !hideNavbar ? '80px' : '0' }}>
        <Routes>
          {/* Website pages */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />

          {/* Admin pages */}
          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route path="/admin/users" element={<Users />} />
        </Routes>
      </div>
    </>
  );
}

// Root App component
function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
