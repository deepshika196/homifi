// src/pages/ServicesPage.jsx

import Navbar from '../components/Navbar'
import ServiceCard from '../components/ServiceCard';
import '../styles/ServicesPage.css';
import plumbingIcon from '../assets/plumbing-icon.png';
import electricianIcon from '../assets/electrician-icon.png';
import Footer from '../components/Footer';

const services = [
    {
        icon: plumbingIcon,
        title: 'Plumbing',
        description: 'Expert plumbing services for your home.',
    },
    {
        icon: electricianIcon,
        title: 'Electrical',
        description: 'Reliable electrical repairs and installations.',
    },
    {
        icon: electricianIcon,
        title: 'Electrical',
        description: 'Reliable electrical repairs and installations.',
    },
    {
        icon: electricianIcon,
        title: 'Electrical',
        description: 'Reliable electrical repairs and installations.',
    },
    // Add more services here
];

function ServicesPage() {
    return (
        <>
        <Navbar />
        <main>
        <div className="services-container">
            <h2 className="services-heading">Our Services</h2>
            <div className="services-grid">
                {services.map((service, index) => (
                    <ServiceCard
                        key={index}
                        icon={service.icon}
                        title={service.title}
                        description={service.description}
                    />
                ))}
            </div>
        </div>
        </main>
        <Footer />
        </>
    );
}

export default ServicesPage;
