// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Button from '@mui/material/Button'; // MUI Button import
import Box from '@mui/material/Box';       // MUI Box for layout

export default function Navbar() {
  return (
    <nav className="navbar">
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <ul style={{ display: 'flex', gap: '2rem', margin: 0, padding: 0, listStyle: 'none' }}>
          <li><Link to="/#">Dashboard</Link></li>
          <li><Link to="/#about">About</Link></li>
          <li><Link to="/#location">Location</Link></li>
          <li><Link to="/menu">Menu</Link></li>
        </ul>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="warning" // Use MUI's orange color
          sx={{
            ml: 4,
            mr: 4, // Add right margin so it's not stuck to the edge
            borderRadius: "50px", // Makes the button pill/round
            paddingLeft: "2rem",
            paddingRight: "2rem"
          }}
        >
          Login
        </Button>
      </Box>
    </nav>
  );
}
