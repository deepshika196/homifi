// src/pages/HomePage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/Herosection';

import Footer from '../components/Footer';

function HomePage() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <Footer />
        </>
    );
}

export default HomePage;
