// src/components/WhyChooseUs.jsx
import React from 'react';
import '../styles/WhyChooseUs.css';

function WhyChooseUs() {
    const reasons = [
        { title: 'Expert Technicians', description: 'Highly skilled professionals.' },
        { title: 'Reliable Services', description: 'On-time and dependable.' },
        { title: 'Affordable Pricing', description: 'Great value for money.' },
    ];

    return (
        <section className="why-choose-us">
            {reasons.map((reason, index) => (
                <div key={index} className="reason-card">
                    <h3>{reason.title}</h3>
                    <p>{reason.description}</p>
                </div>
            ))}
        </section>
    );
}

export default WhyChooseUs;
