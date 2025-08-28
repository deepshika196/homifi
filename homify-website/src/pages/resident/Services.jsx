import React, { useState } from 'react';
import '../../styles/resident/Services.css';

function Services() {
  const [serviceType, setServiceType] = useState('');
  const [newServiceType, setNewServiceType] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [availableWorkers, setAvailableWorkers] = useState('');
  const [selectedWorker, setSelectedWorker] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  const [pastFixes, setPastFixes] = useState([
    {
      id: 1,
      serviceName: 'Plumbing Repair',
      date: '2024-06-01',
      time: '19:00',
      assignedWorker: 'Rajesh kumar',
      serviceStatus: 'Completed',
      paymentStatus: 'PAID',
      rating: 1
    },
    {
      id: 2,
      serviceName: 'Electrical Work',
      date: '2024-05-28',
      time: '10:45',
      assignedWorker: 'Sakthi',
      serviceStatus: 'Completed',
      paymentStatus: 'NOT PAID',
      rating: 0
    },
    {
      id: 3,
      serviceName: 'AC Maintenance',
      date: '2024-05-25',
      time: '9:00',
      assignedWorker: 'Mary',
      serviceStatus: 'Completed',
      paymentStatus: 'PAID',
      rating: 3
    },
    {
      id: 4,
      serviceName: 'Cleaning Service',
      date: '2024-05-20',
      time: '8:30',
      assignedWorker: 'Kathick',
      serviceStatus: 'Completed',
      paymentStatus: 'NOT PAID',
      rating: 0
    },
    {
      id: 5,
      serviceName: 'Carpentry Work',
      date: '2024-05-15',
      time: '20:15',
      assignedWorker: 'Sam',
      serviceStatus: 'Completed',
      paymentStatus: 'PAID',
      rating: 0
    }
  ]);

  const [upcomingFixes, setUpcomingFixes] = useState([
    {
      id: 1,
      serviceName: 'Plumbing Repair',
      date: 'Mon, June 3rd',
      time: '10:00 AM',
      assignedWorker: 'Raj Kumar',
      cost: '₹500',
      status: 'Approved',
      icon: '🔧'
    },
    {
      id: 2,
      serviceName: 'Electrical Repair',
      date: 'Mon, June 15th',
      time: '10:15 AM',
      assignedWorker: 'Rajesh',
      cost: '₹700',
      status: 'Approved',
      icon: '⚡'
    }
  ]);

  const [serviceTypes, setServiceTypes] = useState([
    'Plumbing', 'Electrical', 'AC Maintenance', 'Cleaning', 'Carpentry',
    'Painting', 'Pest Control', 'Appliance Repair', 'Locksmith', 'Gardening'
  ]);

  const workers = ['RAJU M', 'KAMAL', 'RADHA'];

  const handleAddServiceType = () => {
    if (newServiceType.trim() && !serviceTypes.includes(newServiceType.trim())) {
      setServiceTypes([...serviceTypes, newServiceType.trim()]);
      setNewServiceType('');
      alert(`New service type "${newServiceType.trim()}" added successfully!`);
    } else if (serviceTypes.includes(newServiceType.trim())) {
      alert('This service type already exists!');
    } else {
      alert('Please enter a valid service type!');
    }
  };

  const handleBookService = () => {
    if (!serviceType || !preferredDate || !preferredTime || !selectedWorker || !serviceDescription) {
      alert('Please fill in all fields');
      return;
    }

    const newService = {
      id: upcomingFixes.length + 1,
      serviceName: serviceType,
      date: preferredDate,
      time: preferredTime,
      assignedWorker: selectedWorker,
      cost: '₹' + Math.floor(Math.random() * 500) + 200,
      status: 'Requested',
      icon: '🔧'
    };

    setUpcomingFixes([...upcomingFixes, newService]);
    
    // Reset form
    setServiceType('');
    setPreferredDate('');
    setPreferredTime('');
    setAvailableWorkers('');
    setSelectedWorker('');
    setServiceDescription('');
    
    alert('Service booked successfully!');
  };

  const handleCancelUpcomingFix = (id) => {
    setUpcomingFixes(upcomingFixes.filter(fix => fix.id !== id));
    alert('Service cancelled successfully!');
  };

  const handleEditUpcomingFix = (id, field, newValue) => {
    if (newValue && newValue.trim()) {
      setUpcomingFixes(upcomingFixes.map(fix =>
        fix.id === id ? { ...fix, [field]: newValue.trim() } : fix
      ));
      alert(`${field === 'date' ? 'Date' : 'Time'} updated successfully!`);
    }
  };

  const handleRating = (id, rating) => {
    setPastFixes(pastFixes.map(fix =>
      fix.id === id ? { ...fix, rating: rating } : fix
    ));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Requested': return '🟡';
      case 'Approved': return '✅';
      case 'In Progress': return '🔧';
      case 'Completed': return '✅';
      case 'Cancelled': return '❌';
      default: return '🟡';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="services-page">
      {/* Section 1: Need Something Fixed? Schedule a Service */}
      <div className="service-scheduling-section">
        <div className="section-header">
          <div className="header-icons">
            <span className="icon">🔧</span>
            <span className="icon">📅</span>
          </div>
          <h2>Need Something Fixed? Schedule a Service</h2>
          <p>Looking for help inside your home? Use this section to request personal home services.</p>
        </div>

        <div className="service-form-container">
          <div className="form-header">
            <span className="checkbox-icon">☑️</span>
            <h3>Fill out our service form</h3>
          </div>
          
          <form className="service-form">
            <div className="form-row">
              <div className="form-group">
                <label>Types of service</label>
                <select 
                  value={serviceType} 
                  onChange={(e) => setServiceType(e.target.value)}
                  required
                >
                  <option value="">Select service type</option>
                  {serviceTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Add New Service Type</label>
                <div className="add-service-type-container">
                  <input 
                    type="text" 
                    value={newServiceType} 
                    onChange={(e) => setNewServiceType(e.target.value)}
                    placeholder="Enter new service type"
                    className="add-service-input"
                  />
                  <button 
                    type="button" 
                    onClick={handleAddServiceType}
                    className="add-service-button"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Preferred date</label>
                <input 
                  type="date" 
                  value={preferredDate} 
                  onChange={(e) => setPreferredDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Preferred Time</label>
                <input 
                  type="time" 
                  value={preferredTime} 
                  onChange={(e) => setPreferredTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Available Workers</label>
                <select 
                  value={availableWorkers} 
                  onChange={(e) => {
                    setAvailableWorkers(e.target.value);
                    setSelectedWorker(e.target.value);
                  }}
                  required
                >
                  <option value="">Select worker</option>
                  {workers.map((worker, index) => (
                    <option key={index} value={worker}>{worker}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Selected Worker</label>
                <input 
                  type="text" 
                  value={selectedWorker} 
                  readOnly 
                  className="selected-worker-display"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label>Service Description</label>
                <textarea 
                  value={serviceDescription} 
                  onChange={(e) => setServiceDescription(e.target.value)}
                  rows="4"
                  placeholder="Describe the service you need..."
                  required
                ></textarea>
              </div>
            </div>

            <button type="button" className="book-button" onClick={handleBookService}>
              BOOK
            </button>
          </form>

          <div className="disclaimer">
            <strong>** Flatify connects you with trusted workers, but payment is to be settled directly with them once the service is complete.</strong>
          </div>
        </div>
      </div>

      {/* Section 2: Your Past Fixes */}
      <div className="past-fixes-section">
        <div className="section-header">
          <span className="icon">🔧</span>
          <h2>Your Past Fixes</h2>
        </div>
        
        <div className="table-container">
          <table className="past-fixes-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Assigned worker</th>
                <th>Service Status</th>
                <th>Payment Status</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {pastFixes.map((fix) => (
                <tr key={fix.id}>
                  <td>{fix.serviceName}</td>
                  <td>{formatDate(fix.date)}</td>
                  <td>{fix.time}</td>
                  <td>{fix.assignedWorker}</td>
                  <td>
                    <span className="status-cell">
                      {getStatusIcon(fix.serviceStatus)} {fix.serviceStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`payment-status ${fix.paymentStatus === 'PAID' ? 'paid' : 'not-paid'}`}>
                      {fix.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <div className="rating-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span 
                          key={star} 
                          className={`star ${star <= fix.rating ? 'filled' : ''}`}
                          onClick={() => handleRating(fix.id, star)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 3: Modify Upcoming Fixes */}
      <div className="upcoming-fixes-section">
        <div className="section-header">
          <span className="icon">🔧</span>
          <h2>Modify Upcoming Fixes</h2>
        </div>
        
        <div className="upcoming-fixes-container">
          <div className="fixes-carousel">
            {upcomingFixes.map((fix) => (
              <div key={fix.id} className="fix-card">
                <div className="card-header">
                  <span className="service-icon">{fix.icon}</span>
                  <span className="service-name">{fix.serviceName}</span>
                </div>
                
                <div className="card-details">
                  <div className="detail-row">
                    <span className="detail-icon">📅</span>
                    <span>Date: {fix.date}</span>
                    <span 
                      className="edit-icon" 
                      title="Edit date"
                      onClick={() => {
                        const newDate = prompt('Enter new date (e.g., Mon, June 3rd):', fix.date);
                        if (newDate) handleEditUpcomingFix(fix.id, 'date', newDate);
                      }}
                    >
                      ✏️
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">🕐</span>
                    <span>Time: {fix.time}</span>
                    <span 
                      className="edit-icon" 
                      title="Edit time"
                      onClick={() => {
                        const newTime = prompt('Enter new time (e.g., 10:00 AM):', fix.time);
                        if (newTime) handleEditUpcomingFix(fix.id, 'time', newTime);
                      }}
                    >
                      ✏️
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">👤</span>
                    <span>Assigned: {fix.assignedWorker}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">💰</span>
                    <span>Cost: {fix.cost}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">✅</span>
                    <span>Status: {fix.status}</span>
                  </div>
                </div>
                
                <button 
                  className="cancel-button"
                  onClick={() => handleCancelUpcomingFix(fix.id)}
                >
                  CANCEL
                </button>
              </div>
            ))}
          </div>
          
          {upcomingFixes.length > 2 && (
            <div className="carousel-nav">
              <span className="nav-arrow">▶️</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Services;
