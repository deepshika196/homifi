
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
    const location = useLocation();
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Login', path: '/login' },
        { name: 'Sign Up', path: '/register' }
    ];

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <span>FLATIFY</span>
            </div>
            <ul className="navbar-links">
                {navLinks
                    .filter(link => link.path !== location.pathname)
                    .map(link => (
                        <li key={link.name}>
                            <Link to={link.path}>{link.name.toUpperCase()}</Link>
                        </li>
                    ))}
            </ul>
        </nav>
    );
}

export default Navbar;
