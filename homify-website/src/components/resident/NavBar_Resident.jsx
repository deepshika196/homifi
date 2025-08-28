import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/resident/Navbar.css';

function Navbar_Resident() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    const navCenterLinks = [
        { name: 'Services', path: '/resident/services' },
        { name: 'Payments', path: '/resident/payments' },
        { name: 'Raise Ticket', path: '/resident/raiseticket' },
        { name: 'User Profile', path: '/resident/userprofile' }
    ];

    const navRightLinks = [
        { name: 'Homepage', path: '/' },
        { name: 'Contact Us', path: '/contact' }
    ];

    // Get user info from localStorage or use default values
    const getUserInfo = () => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                return {
                    name: user.name || 'Resident Name',
                    apartment: user.apartment || 'Resident Apartment',
                    city: user.city || 'Resident City'
                };
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
        return {
            name: 'Resident Name',
            apartment: 'Resident Apartment',
            city: 'Resident City'
        };
    };

    const userInfo = getUserInfo();

    return (
        <nav className="navbar-container">
            <div className="navbar-left">
                <span className="brand">FLATIFY</span>
            </div>

            <div className="navbar-center">
                {navCenterLinks.map(link => (
                    <Link
                        key={link.name}
                        to={link.path}
                        className={`center-link ${location.pathname === link.path ? 'active' : ''}`}
                    >
                        {link.name.toUpperCase()}
                    </Link>
                ))}
            </div>

            <div className="navbar-right">
                <div className="top-links">
                    {navRightLinks.map(link => (
                        <Link key={link.name} to={link.path} className="right-link">
                            {link.name.toUpperCase()}
                        </Link>
                    ))}
                </div>
                <div className="user-info">
                    <span>You are logged in as a (Resident)</span><br />
                    <span>NAME: {userInfo.name}</span><br />
                    <span>APARTMENT NAME: {userInfo.apartment.toUpperCase()}</span><br />
                    <span>CITY: {userInfo.city.toUpperCase()}</span>
                    <button onClick={handleLogout} className="logout-btn">
                        LOGOUT
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar_Resident;




