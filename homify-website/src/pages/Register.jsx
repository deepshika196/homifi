import { useState, useEffect } from 'react';
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
  const [role, setRole] = useState('admin'); // Default to admin registration
  const [mainAdminExists, setMainAdminExists] = useState(false);
  const [loading, setLoading] = useState(true);

  // On mount, check if main admin exists
  useEffect(() => {
    fetch('http://localhost:5000/users?role=main_admin')
      .then(res => res.json())
      .then(data => {
        setMainAdminExists(data.length > 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Phone number validation (Indian 10-digit)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(form.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Password match check
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // Step 1: Check for duplicate email in users and pendingAdmins
      const checkUser = await fetch(`http://localhost:5000/users?email=${form.email}`);
      const existingUsers = await checkUser.json();

      const checkPending = await fetch(`http://localhost:5000/pendingAdmins?email=${form.email}`);
      const existingPending = await checkPending.json();

      if (existingUsers.length > 0 || existingPending.length > 0) {
        alert("An account with this email already exists or is pending approval.");
        return;
      }

      // Step 2: Register logic based on role
      if (!mainAdminExists && role === "main_admin") {
        // Register Main Admin directly
        const registerResponse = await fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, role: "main_admin", approved: true })
        });

        if (registerResponse.ok) {
          alert('Main Admin registered successfully!');
          setForm({
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
        } else {
          alert('Registration failed. Please try again.');
        }
      } else if (mainAdminExists && role === "admin") {
        // Admin requests access, goes to pendingAdmins
        const registerResponse = await fetch('http://localhost:5000/pendingAdmins', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, role: "admin", approved: false })
        });

        if (registerResponse.ok) {
          alert('Admin access request submitted! Please wait for Main Admin approval.');
          setForm({
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
        } else {
          alert('Request failed. Please try again.');
        }
      } else {
        alert('Registration is not allowed for this role or at this time.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to the server. Please make sure JSON server is running.');
    }
  };

  if (loading) return <div>Loading...</div>;

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
              {mainAdminExists
                ? <>Request Admin Access <span className="register-admin">Admin</span>!</>
                : <>Let’s Get You Onboard, <span className="register-admin">Main Admin</span>!</>
              }
            </h1>

            <form className="register-form" onSubmit={handleSubmit}>
              {/* Role selection: Only show if Main Admin not registered */}
              {!mainAdminExists && (
                <div className="register-form-row">
                  <div className="register-form-group">
                    <label>Registering as</label>
                    <select value={role} onChange={handleRoleChange}>
                      <option value="main_admin">Main Admin</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
              )}

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
                  <label>Password</label>
                  <input type="password" name="password" value={form.password} onChange={handleChange} required />
                </div>
              </div>
              <div className="register-form-row">
                <div className="register-form-group">
                  <label>Confirm Password</label>
                  <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
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
                <button type="submit" className="register-btn">
                  {mainAdminExists ? "REQUEST ADMIN ACCESS" : "SIGN UP"}
                </button>
              </div>
            </form>
            <div className="register-note">
              <span role="img" aria-label="lock">🔒</span>
              <b> Please Note Before Signing Up:</b>
              <ul>
                {mainAdminExists ? (
                  <li>Your admin access request will be reviewed by the Main Admin.</li>
                ) : (
                  <li>This registration will create the Main Admin account for your society.</li>
                )}
                <li>Residents and Service Workers accounts are created by the Main Admin only.</li>
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
