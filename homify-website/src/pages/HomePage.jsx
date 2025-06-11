// src/pages/HomePage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/Herosection';
import ServiceHighlights from '../components/ServiceHighlights';
import WhyChooseUs from '../components/WhyChooseUs';
import Footer from '../components/Footer';

function HomePage() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <ServiceHighlights />
            <WhyChooseUs />
            <Footer />
        </>
    );
}

export default HomePage;
