// src/components/HeroSection.jsx
import React, { useEffect, useState } from 'react';
import '../styles/HeroSection.css';
import heroBackground1 from '../assets/Ac_Mechanic.jpg';
import heroBackground2 from '../assets/Cleaning.jpeg';
import heroBackground3 from '../assets/Electrician.jpg';

function HeroSection() {
    const images = [heroBackground1, heroBackground2, heroBackground3];
    const [currentImage, setCurrentImage] = useState(0);
    const [animateText, setAnimateText] = useState(false);

    // Background image slideshow effect
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000); // Change background every 5 seconds

        setAnimateText(true); // Trigger text animation

        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }, []);

    return (
        <header
            className="hero-section"
            style={{
                backgroundImage: `url(${images[currentImage]})`,
            }}
        >
            <div className="overlay"></div>
            <div className="hero-content">
                <h1 className={`animated-text ${animateText ? 'fade-in' : ''}`}>Homifi</h1>
                <h2 className={`animated-subtext ${animateText ? 'slide-up' : ''}`}>Your Home, Our Priority</h2>
                <div className="hero-buttons">
                    <a href="services" className="primary-btn animated-btn">Book a Service</a>
                    <a href="about" className="secondary-btn animated-btn">Learn More</a>
                </div>
            </div>
        </header>
    );
}

export default HeroSection;
