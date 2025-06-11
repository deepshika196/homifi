// src/components/ServiceHighlights.jsx
import React from 'react';
import '../styles/ServiceHighlights.css';

function ServiceHighlights() {
    const services = [
        { title: 'Plumbing', description: 'Reliable plumbing services.', icon: '🔧' },
        { title: 'Electrical', description: 'Safe electrical repairs.', icon: '💡' },
        { title: 'Beautician', description: 'Expert beauty services.', icon: '💇' },
        { title: 'Furniture', description: 'Quality furniture repair.', icon: '🪑' },
    ];

    return (
        <section className="service-highlights">
            {services.map((service, index) => (
                <div key={index} className="service-card">
                    <div className="service-icon">{service.icon}</div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                </div>
            ))}
        </section>
    );
}

export default ServiceHighlights;
