// src/components/ServiceCard.jsx
import React from 'react';
import '../styles/ServiceCard.css';
import { motion } from 'framer-motion';

function ServiceCard({ icon, title, description }) {
    return (
        
        <motion.div 
            className="service-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="service-icon">
                <img src={icon} alt={title} />
            </div>
            <h3 className="service-title">{title}</h3>
            <p className="service-description">{description}</p>
        </motion.div>
    );
}



export default ServiceCard;
