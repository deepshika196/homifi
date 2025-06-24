import React from 'react';
import '../styles/HeroSection.css';
import heroImage from '../assets/Electrician.jpg';
import serviceImage from '../assets/Ac_Mechanic.jpg'; // Replace with actual image

function HeroSection() {
    return (
        <>
            <header className="hero-section">
                <div className="hero-left">
                    <h1>Flatify</h1>
                    <h2>Your Flat, Our Priority</h2>
                    <div className="hero-buttons">
                        <a href="register" className="primary-btn">Register Flat</a>
                        <a href="about" className="secondary-btn">Learn More</a>
                    </div>
                </div>
                <div className="hero-right">
                    <img src={heroImage} alt="Hero" />
                </div>
            </header>

            <section className="maintenance-section">
                <div className="maintenance-left">
                    <img src={serviceImage} alt="Service" />
                </div>
                <div className="maintenance-right">
                    <h2>Maintenance Regulation</h2>
                    <p>
                        The Flatify Maintenance Regulation is designed to ensure that the maintenance of your flat is handled efficiently and effectively. Our team of experts is dedicated to providing top-notch services, ensuring that your living space remains in optimal condition.
                    </p>
                </div>
            </section>

            <section className='community-section'>
                <div className="community-left">
                    <h2>Community Announcements</h2>
                    <p>
                        The latest updates and announcements from your community. Stay informed about upcoming events, maintenance schedules, and important notices that affect your living environment.
                    </p>
                </div>
                <div className="community-right">
                    <img src={serviceImage} alt="Community" />
                </div>
            </section>

            <section className="complaint-section">
                <div className="complaint-left">
                    <img src={serviceImage} alt="Complaint" />
                </div>
                <div className="complaint-right">
                    <h2>Complaint Registration</h2>
                    <p>
                        If you have any issues or complaints regarding your flat, our complaint registration system allows you to report them easily. Our team will address your concerns promptly to ensure a comfortable living experience.
                    </p>
                </div>
            </section>
        </>
    );
}

export default HeroSection;