import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Register.css';
// import your image, e.g.:
import flatifySignupImage from '../assets/signup.png';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    pincode: '',
    city: '',
    apartment: '',
    address: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Registration logic here
    console.log(form);
  };

  return (
    <div className="register-bg">
      <Navbar />
      <div className="register-main">
        <div className="register-card">
          {/* Left Side: Image and Info */}
          <div className="register-left">
              <img src={flatifySignupImage} alt="Create your Flatify Account" className="register-image" />
          </div>
          {/* Right Side: Form */}
          <div className="register-right">
            <h1 className="register-title">
              Let’s Get You Onboard, <span className="register-admin">Admin</span>!
            </h1>
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="register-form-row">
                <div className="register-form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="register-form-group">
                  <label>Pincode</label>
                  <input type="text" name="pincode" value={form.pincode} onChange={handleChange} required />
                </div>
              </div>
              <div className="register-form-row">
                <div className="register-form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="register-form-group">
                  <label>Full Address</label>
                  <input type="text" name="address" value={form.address} onChange={handleChange} required />
                </div>
              </div>
              <div className="register-form-row">
                <div className="register-form-group">
                  <label>Phone Number</label>
                  <input type="text" name="phone" value={form.phone} onChange={handleChange} required />
                </div>
                <div className="register-form-group">
                  <label>Confirm Password</label>
                  <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
                </div>
              </div>
              <div className="register-form-row">
                <div className="register-form-group">
                  <label>Password</label>
                  <input type="password" name="password" value={form.password} onChange={handleChange} required />
                </div>
                <div className="register-form-group">
                  <label>City/Town</label>
                  <input type="text" name="city" value={form.city} onChange={handleChange} required />
                </div>
              </div>
              <div className="register-form-row">
                <div className="register-form-group">
                  <label>Apartment Name</label>
                  <input type="text" name="apartment" value={form.apartment} onChange={handleChange} required />
                </div>
              </div>
              <div className="register-form-footer">
                <span>Already have an account? <a href="/login">Login</a></span>
                <button type="submit" className="register-btn">SIGN UP</button>
              </div>
            </form>
            <div className="register-note">
              <span role="img" aria-label="lock">🔒</span>
              <b> Please Note Before Signing Up:</b>
              <ul>
                <li>After signing up, your account must be verified by the Main Admin of your flat/society.</li>
                <li>If you are not verified within 24 hours, please contact your Main Admin for assistance.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
