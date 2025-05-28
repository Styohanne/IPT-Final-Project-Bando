import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setError("Invalid credentials");
        return;
      }
      // Optionally store user info/token here
      navigate("/admin/menu");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="pizza-login-container">
      <div className="pizza-background"></div>
      <div className="login-card">
        <div className="pizza-header">
          <div className="pizza-emoji">🍕</div>
          <h1 className="restaurant-name">Brick Pizza House</h1>
          <p className="tagline">Wood-Fired Excellence Since 1952</p>
        </div>
        
        <div className="login-form-container">
          <h2 className="login-title">Welcome Back!</h2>
          <p className="login-subtitle">Sign in to your account</p>
          
          <form onSubmit={handleSubmit} className="pizza-form">
            <div className="input-group">
              <label className="input-label">Email</label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  type="text" // <-- change from "email" to "text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pizza-input"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pizza-input"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
            
            <button 
              type="submit" 
              className={`pizza-button ${isHovered ? 'hovered' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="button-text">Login to Manage 🍕</span>
            </button>
          </form>
          
          <div className="login-footer">

            <div className="divider">•</div>

          </div>
        </div>
      </div>
    </div>
  );
}