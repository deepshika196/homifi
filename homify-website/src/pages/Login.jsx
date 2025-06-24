import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import flatifyImage from '../assets/flatify-image.png'; 
import '../styles/Login.css';

const Login = () => {
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className="login-bg">
      <Navbar />
      <main className="login-main">
        <section className="login-card">
          <div className="login-left">
            <h1 className="login-title">FLATIFY LOGIN</h1>
            <p className="login-subtitle">
              Enter <span className="brand">Flatify</span> – Your Digital Community
            </p>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="userType">USER TYPE</label>
                <select
                  id="userType"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="resident">Resident</option>
                  <option value="admin">Admin</option>
                  <option value="admin">workers
            
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="username">USERNAME</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">PASSWORD</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-row">
                <label className="remember-label">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                  />
                  REMEMBER ME
                </label>
                <a href="/forgot-password" className="forgot-link">
                  FORGOT PASSWORD?
                </a>
              </div>
              <button type="submit" className="login-btn">
                LOGIN
              </button>
              <div className="signup-link">
                No account? <a href="Register">Sign Up</a>
              </div>
            </form>
          </div>
          <div className="login-right">
            <img src={flatifyImage} alt="Flatify Community" className="login-illustration" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
