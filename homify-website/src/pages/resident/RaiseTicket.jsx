import React, { useState } from 'react';
import '../../styles/resident/RaiseTicket.css'; // We will create this CSS file

const RaiseTicket = () => {
  const [issueType, setIssueType] = useState('');
  const [area, setArea] = useState('');
  const [description, setDescription] = useState('');
  const [issueTypes, setIssueTypes] = useState([
    'Broken Light', 'Water Leak', 'Cleaning', 'Plumbing', 'Electrical', 
    'AC Repair', 'Carpentry', 'Painting', 'Pest Control', 'Other', 'HVAC', 'Appliance Repair', 'Locksmith', 'Gardening', 'Pest Control', 'Internet/Cable', 'Security Systems'
  ]);
  const [areas, setAreas] = useState([
    'Gym', 'Lobby', 'Hallway', 'Stairwell', 'Garden', 
    'Parking Lot', 'Swimming Pool', 'Clubhouse', 'Terrace', 'Other', 'Basement', 'Roof Top', 'Play Area', 'Elevator', 'Common Bathroom'
  ]);
  const [newIssueType, setNewIssueType] = useState('');
  const [newArea, setNewArea] = useState('');
  const [ticketHistory, setTicketHistory] = useState([
    { id: 1, date: 'June\n02,2025', title: 'Broken light', location: 'Gym', status: 'Requested', description: 'The light in the gym is broken and needs to be replaced.', showDescription: false },
    { id: 2, date: 'May\n18,2025', title: 'Broken light', location: 'Lobby', status: 'In Progress', description: 'There is a persistent water leak in the lobby ceiling near the main entrance.', showDescription: false },
    { id: 3, date: 'April\n05,2025', title: 'Leaky pipe', location: 'Basement', status: 'Cancelled', description: 'The hallway on the 3rd floor needs a deep clean due to a spill.', showDescription: false },
    { id: 4, date: 'April\n05,2025', title: 'Ac not working', location: 'Gym', status: 'Completed', description: 'A circuit breaker tripped in the gym and needed to be reset by an electrician.', showDescription: false, rating: 4 },
  ]);

  const [upcomingFixes, setUpcomingFixes] = useState([]);
  const [pastFixes, setPastFixes] = useState(ticketHistory.filter(ticket => ticket.status === 'Completed' || ticket.status === 'Cancelled').map(ticket => ({
    ...ticket,
    rating: ticket.rating || 0
  })));

  const handleAddIssueType = () => {
    if (newIssueType && !issueTypes.includes(newIssueType)) {
      setIssueTypes([...issueTypes, newIssueType]);
      setNewIssueType('');
    }
  };

  const handleAddArea = () => {
    if (newArea && !areas.includes(newArea)) {
      setAreas([...areas, newArea]);
      setNewArea('');
    }
  };

  const handleToggleDescription = (id, section) => {
    if (section === 'upcoming') {
      setUpcomingFixes(upcomingFixes.map(fix =>
        fix.id === id ? { ...fix, showDescription: !fix.showDescription } : fix
      ));
    } else if (section === 'past') {
      setPastFixes(pastFixes.map(fix =>
        fix.id === id ? { ...fix, showDescription: !fix.showDescription } : fix
      ));
    }
    // Also update the main ticket history for consistency
    setTicketHistory(ticketHistory.map(ticket =>
      ticket.id === id ? { ...ticket, showDescription: !ticket.showDescription } : ticket
    ));
  };

  const handleRaiseTicket = () => {
    console.log({ issueType, area, description });
    const newTicket = {
      id: ticketHistory.length > 0 ? Math.max(...ticketHistory.map(t => t.id)) + 1 : 1,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).replace(' ', '\n'),
      title: issueType || (description ? description.substring(0, 20) + (description.length > 20 ? '...' : '') : 'General Issue'),
      location: area || 'N/A',
      status: 'Requested',
      description: description,
      showDescription: false,
      rating: 0,
    };
    setUpcomingFixes([...upcomingFixes, newTicket]);
    // Also add to main ticket history for consistency
    setTicketHistory([...ticketHistory, newTicket]);
    alert('Ticket Raised! Check console for details.');
    setIssueType('');
    setArea('');
    setDescription('');
  };

  const handleCancelUpcomingFix = (id) => {
    setUpcomingFixes(upcomingFixes.filter(fix => fix.id !== id));
    alert('Upcoming fix cancelled!');
  };

  const handleRatingSubmit = (id, rating) => {
    setPastFixes(pastFixes.map(ticket =>
      ticket.id === id ? { ...ticket, rating: rating } : ticket
    ));
    // Also update the main ticket history
    setTicketHistory(ticketHistory.map(ticket =>
      ticket.id === id ? { ...ticket, rating: rating } : ticket
    ));
  };

  return (
    <div className="raise-ticket-page">
      <div className="raise-ticket-container">
        <div className="ticket-form-section">
          <h1>TICKETS</h1>
          <p className="slogan">Spotted a Common Area Issue? 🚨 Raise It - We'll Fix It</p>
          <p className="description">Need something fixed in a shared space? Raise a ticket here for common area concerns.<br />Our team will take care of it promptly.</p>

          <div className="form-box">
            <h3>Fill This To Raise A Ticket 🎟️</h3>
            <div className="form-fields">
              <div className="form-group">
                <label htmlFor="issueType">Issue Type</label>
                <select id="issueType" value={issueType} onChange={(e) => setIssueType(e.target.value)}>
                  <option value="">Select Issue Type</option>
                  {issueTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
                <div className="add-new-option">
                  <input
                    type="text"
                    placeholder="Add new issue type"
                    value={newIssueType}
                    onChange={(e) => setNewIssueType(e.target.value)}
                  />
                  <button onClick={handleAddIssueType}>Add</button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="area">Area</label>
                <select id="area" value={area} onChange={(e) => setArea(e.target.value)}>
                  <option value="">Select Area</option>
                  {areas.map((ar, index) => (
                    <option key={index} value={ar}>{ar}</option>
                  ))}
                </select>
                <div className="add-new-option">
                  <input
                    type="text"
                    placeholder="Add new area"
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                  />
                  <button onClick={handleAddArea}>Add</button>
                </div>
              </div>
            </div>
            <div className="form-group">
                <label htmlFor="description">ADD DESCRIPTION</label>
                <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <button className="raise-ticket-button" onClick={handleRaiseTicket}>RAISE A TICKET</button>
          </div>
        </div>

        <div className="ticket-history-section">
          <div className="timeline-content-wrapper">
            <h2>Your Ticket History Timeline</h2>
            <p className="history-description">Services will be done in common areas</p>
            
            {upcomingFixes.length > 0 && (
              <div className="upcoming-fixes-section">
                <h3>Upcoming Fixes</h3>
                {upcomingFixes.map((fix) => (
                  <div className="upcoming-fix-card" key={fix.id}>
                    <h4>{fix.title}</h4>
                    <p>📍 {fix.location}</p>
                    <p>🗓️ Date: {fix.date}</p>
                    <p>🔵 Status: {fix.status}</p>
                    {fix.description && (
                      <button onClick={() => handleToggleDescription(fix.id, 'upcoming')} className="read-description-button">
                        {fix.showDescription ? 'Hide Description' : 'Read Description'}
                      </button>
                    )}
                    {fix.showDescription && <p className="full-description">{fix.description}</p>}
                    <button className="cancel-button" onClick={() => handleCancelUpcomingFix(fix.id)}>CANCEL</button>
                  </div>
                ))}
              </div>
            )}

            {pastFixes.length > 0 && (
              <div className="past-fixes-section">
                <h3>Past Fixes</h3>
                <div className="past-fixes-scroll-container">
                  {pastFixes.map((fix) => (
                    <div className="past-fix-card" key={fix.id}>
                      <h4>{fix.title}</h4>
                      <p>📍 {fix.location}</p>
                      <p>🗓️ Date: {fix.date}</p>
                      <p>🔵 Status: {fix.status}</p>
                      {fix.description && (
                        <button onClick={() => handleToggleDescription(fix.id, 'past')} className="read-description-button">
                          {fix.showDescription ? 'Hide Description' : 'Read Description'}
                        </button>
                      )}
                      {fix.showDescription && <p className="full-description">{fix.description}</p>}
                      <div className="rating-section">
                        <p className="rating-label">Rate this service:</p>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span 
                            key={star} 
                            className={`star ${star <= fix.rating ? 'filled' : ''}`} 
                            onClick={() => handleRatingSubmit(fix.id, star)}
                            style={{ 
                              cursor: 'pointer',
                              fontSize: '24px',
                              color: star <= fix.rating ? '#FFD700' : '#ccc'
                            }}
                          >
                            ★
                          </span>
                        ))}
                        {fix.rating > 0 && <span className="rating-text">({fix.rating}/5)</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  </div>
);
};

export default RaiseTicket;
