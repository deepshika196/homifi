import { Link, useLocation } from 'react-router-dom';
import '../../styles/admin_styles/Navbar.css';

function Navbar_Admin() {
    const location = useLocation();

    const navCenterLinks = [
        { name: 'Admin Approvals', path: '/admin/adminapproval' },
        { name: 'Payments', path: '/admin/paymentmanagement' },
        { name: 'User Management', path: '/admin/usermanagement' },
        { name: 'Workers Management', path: '/admin/workermanagement' },
        { name: 'Tickets', path: '/admin/raiseticket' }
    ];

    const navRightLinks = [
        { name: 'Homepage', path: '/' },
        { name: 'Contact Us', path: '/contact' }
    ];

    const userInfo = {
        name: 'BRUKE',
        apartment: 'ABC Apartments',
        city: 'Chennai'
    };

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
                    <span>You are logged in as the (Main Admin)</span><br />
                    <span>NAME: {userInfo.name}</span><br />
                    <span>APARTMENT NAME: {userInfo.apartment.toUpperCase()}</span><br />
                    <span>CITY: {userInfo.city.toUpperCase()}</span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar_Admin;
