import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-section footer-copyright">
                © 2025 Flatify. All rights reserved.
            </div>
            <div className="footer-section footer-links">
                <Link to="/faq">Need help?</Link>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms & Conditions</Link>
            </div>
        </footer>
    );
}

export default Footer;
