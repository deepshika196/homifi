import React, { useState } from 'react';
import '../../styles/admin_styles/RaiseTicket.css'; // We will create this CSS file

const RaiseTicket = () => {
  const [issueType, setIssueType] = useState('');
  const [area, setArea] = useState('');
  const [description, setDescription] = useState('');
  const [issueTypes, setIssueTypes] = useState([
    'Broken Light', 'Water Leak', 'Cleaning', 'Plumbing', 'Electrical', 
    'AC Repair', 'Carpentry', 'Painting', 'Pest Control', 'Other'
  ]);
  const [areas, setAreas] = useState([
    'Gym', 'Lobby', 'Hallway', 'Stairwell', 'Garden', 
    'Parking Lot', 'Swimming Pool', 'Clubhouse', 'Terrace', 'Other'
  ]);
  const [newIssueType, setNewIssueType] = useState('');
  const [newArea, setNewArea] = useState('');
  const [ticketHistory, setTicketHistory] = useState([
    { id: 1, date: 'June\n02,2025', title: 'Broken light', location: 'Gym', status: 'Requested', description: 'The light in the gym is broken and needs to be replaced.', showDescription: false, userName: 'User from Dashboard', assignedWorker: 'N/A' },
    { id: 2, date: 'June\n02,2025', title: 'Water Leak', location: 'Lobby', status: 'Assigned', description: 'There is a persistent water leak in the lobby ceiling near the main entrance.', showDescription: false, userName: 'User from Dashboard', assignedWorker: 'Alice' },
    { id: 3, date: 'June\n02,2025', title: 'Cleaning', location: 'Hallway', status: 'In Progress', description: 'The hallway on the 3rd floor needs a deep clean due to a spill.', showDescription: false, userName: 'User from Dashboard', assignedWorker: 'Bob' },
    { id: 4, date: 'June\n02,2025', title: 'Electrical Issue', location: 'Gym', status: 'Done', description: 'A circuit breaker tripped in the gym and needed to be reset by an electrician.', showDescription: false, userName: 'User from Dashboard', assignedWorker: 'Charlie' },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setTicketHistory(ticketHistory.map(ticket => {
      if (ticket.id === id) {
        let updatedTicket = { ...ticket, status: newStatus };
        if (newStatus === 'Assigned' || newStatus === 'In Progress') {
          // For now, prompt for worker name, ideally this would be a selection from a list
          const worker = prompt('Assign a worker for this ticket:', ticket.assignedWorker || '');
          if (worker !== null) {
            updatedTicket.assignedWorker = worker;
          }
        } else if (newStatus === 'Requested' || newStatus === 'Cancelled' || newStatus === 'Done') {
          // Clear assigned worker if status changes to non-assigned states
          updatedTicket.assignedWorker = 'N/A';
        }
        return updatedTicket;
      }
      return ticket;
    }));
  };

  const handleToggleDescription = (id) => {
    setTicketHistory(ticketHistory.map(ticket =>
      ticket.id === id ? { ...ticket, showDescription: !ticket.showDescription } : ticket
    ));
  };

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

  const handleRaiseTicket = () => {
    console.log({ issueType, area, description });
    // In a real application, you would send this to a backend and then update ticketHistory
    const newTicket = {
      id: ticketHistory.length > 0 ? Math.max(...ticketHistory.map(t => t.id)) + 1 : 1,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).replace(' ', '\n'),
      title: issueType || (description ? description.substring(0, 20) + (description.length > 20 ? '...' : '') : 'General Issue'),
      location: area || 'N/A',
      status: 'Requested',
      description: description,
      showDescription: false,
      userName: 'User from Dashboard', // Automatically set user name
      assignedWorker: 'N/A', // Default for new tickets
    };
    setTicketHistory([...ticketHistory, newTicket]);
    alert('Ticket Raised! Check console for details.');
    setIssueType('');
    setArea('');
    setDescription('');
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
            </div>
            <div className="form-fields">
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
              <div className="form-group">
                <label htmlFor="description">ADD DESCRIPTION</label>
                <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
            </div>
            <button className="raise-ticket-button" onClick={handleRaiseTicket}>RAISE A TICKET</button>
          </div>
        </div>

        <div className="ticket-history-section">
          <div className="timeline-content-wrapper">
            <h2>Timeline</h2>
            <p className="history-description">Services will be done in common areas</p>
            <div className="timeline">
              {ticketHistory.map((ticket) => (
                <div className="timeline-item" key={ticket.id}>
                  <div className="date">{ticket.date}</div>
                  <div className="content">
                    <h4>{ticket.title}</h4>
                    <p>By: {ticket.userName}</p> {/* Display user name */}
                    <p>📍 {ticket.location}</p>
                    {ticket.assignedWorker !== 'N/A' && <p>Assigned to: {ticket.assignedWorker}</p>}
                    {ticket.description && (
                      <button onClick={() => handleToggleDescription(ticket.id)} className="read-description-button">
                        {ticket.showDescription ? 'Hide Description' : 'Read Description'}
                      </button>
                    )}
                    {ticket.showDescription && <p className="full-description">{ticket.description}</p>}
                    <div className="status-dropdown">
                      <label htmlFor={`status-${ticket.id}`}>Status: </label>
                      <select
                        id={`status-${ticket.id}`}
                        value={ticket.status}
                        onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                      >
                        <option value="Requested">Requested</option>
                        <option value="Assigned">Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  </div>
);
};

export default RaiseTicket;
