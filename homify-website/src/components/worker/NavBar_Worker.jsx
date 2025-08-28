import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/worker/Navbar.css';

function NavBar_Worker() {
  const location = useLocation();
  const navigate = useNavigate();

  const navCenterLinks = [
    { name: 'Profile', path: '/worker/profile' },
    { name: 'New Services', path: '/worker/services' },
    { name: 'Tickets', path: '/worker/tickets' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <span className="brand">FLATIFY</span>
      </div>
      <div className="navbar-center">
        {navCenterLinks.map(link => (
          <Link key={link.name} to={link.path} className={`center-link ${location.pathname === link.path ? 'active' : ''}`}>
            {link.name.toUpperCase()}
          </Link>
        ))}
      </div>
      <div className="navbar-right">
        <div className="top-links">
          <Link to="/" className="right-link">HOMEPAGE</Link>
          <Link to="/contact" className="right-link">CONTACT US</Link>
        </div>
        <button onClick={handleLogout} className="logout-btn">LOGOUT</button>
      </div>
    </nav>
  );
}

export default NavBar_Worker;
