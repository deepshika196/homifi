import React, { useEffect, useMemo, useState } from 'react';
import '../../styles/resident/UserProfile.css';

function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    apartment: '',
    id: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Service request status (home services) - MOCK VIEW-ONLY DATA
  const [serviceRequests] = useState([
    { id: 1, service: 'Tap Repair', status: 'In Progress', person: 'Ramesh Kumar' },
    { id: 2, service: 'AC Cleaning', status: 'Completed', person: 'Priya Singh' },
    { id: 3, service: 'Plumbing', status: 'Scheduled', person: '-' }
  ]);

  // Common area ticket status - MOCK VIEW-ONLY DATA
  const [ticketStatus] = useState([
    { id: 1, issue: 'Lift not working', status: 'Resolved', action: 'Technician fixed' },
    { id: 2, issue: 'Water leakage - Lobby', status: 'Pending', action: 'Scheduled' }
  ]);

  // Monthly payment status (anchor dueDate sets the day-of-month)
  const [payments] = useState([
    { id: 1, item: 'Rent / Monthly Payment', amount: '₹ XXXX', dueDate: '2025-06-01' },
    { id: 2, item: 'Maintenance Fee', amount: '₹ XXXX', dueDate: '2025-06-15' }
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setUser({
        name: u.name || 'USER',
        email: u.email || 'user@example.com',
        apartment: u.apartment || 'ABC apartments',
        id: u.id || 'S_07'
      });
    } else {
      setUser({ name: 'USER', email: 'user@example.com', apartment: 'ABC apartments', id: 'S_07' });
    }
  }, []);

  // Utilities to compute month-specific due dates and statuses
  const clampToMonthDay = (year, monthIndex, day) => {
    const lastDay = new Date(year, monthIndex + 1, 0).getDate();
    return new Date(year, monthIndex, Math.min(day, lastDay));
  };

  const getCurrentMonthDue = (anchor) => {
    const base = new Date(anchor);
    const today = new Date();
    const day = base.getDate();
    return clampToMonthDay(today.getFullYear(), today.getMonth(), day);
  };

  const getNextMonthDue = (anchor) => {
    const base = new Date(anchor);
    const today = new Date();
    const day = base.getDate();
    return clampToMonthDay(today.getFullYear(), today.getMonth() + 1, day);
  };

  const getStatusForCurrentMonth = (anchor) => {
    const curr = getCurrentMonthDue(anchor);
    const today = new Date();
    return today >= curr ? 'Due' : 'Upcoming';
  };

  // NOTE logic: include both this month's due date and next month's due date
  const rentNote = useMemo(() => {
    const rent = payments.find(p => p.item.toLowerCase().includes('rent'));
    if (!rent) return '';
    const curr = getCurrentMonthDue(rent.dueDate);
    const next = getNextMonthDue(rent.dueDate);
    const today = new Date();
    const currFmt = curr.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
    const nextFmt = next.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
    if (today >= curr) {
      return `Your rent payment is due on ${currFmt}. Next month's due is on ${nextFmt}.`;
    }
    return `Your next rent payment is due on ${currFmt}. Following month due is on ${nextFmt}.`;
  }, [payments]);

  const handleSaveProfile = () => {
    setIsEditing(false);
    const updated = { ...user };
    localStorage.setItem('currentUser', JSON.stringify({ ...JSON.parse(localStorage.getItem('currentUser') || '{}'), ...updated }));
  };

  return (
    <div className="profile-page">
      {/* Top grid: Left - statuses (view-only), Right - profile card (editable) */}
      <div className="top-grid">
        <div className="status-column">
          <div className="panel">
            <div className="panel-title">Service Request Status (for home services)</div>
            <table className="table compact">
              <thead>
                <tr>
                  <th>SERVICE</th>
                  <th>STATUS</th>
                  <th>ASSIGNED PERSON</th>
                </tr>
              </thead>
              <tbody>
                {serviceRequests.map(row => (
                  <tr key={row.id}>
                    <td>{row.service}</td>
                    <td><span className={`chip ${row.status.replace(/\s/g, '').toLowerCase()}`}>{row.status}</span></td>
                    <td>{row.person}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel">
            <div className="panel-title">Common Area Ticket Status</div>
            <table className="table compact">
              <thead>
                <tr>
                  <th>ISSUE REPORTED</th>
                  <th>STATUS</th>
                  <th>Action Taken</th>
                </tr>
              </thead>
              <tbody>
                {ticketStatus.map(row => (
                  <tr key={row.id}>
                    <td>{row.issue}</td>
                    <td><span className={`chip ${row.status.toLowerCase()}`}>{row.status}</span></td>
                    <td>{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="profile-card panel">
          <div className="brand">My <span className="highlight">Flatify</span> Profile</div>
          <div className="avatar">{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</div>
          <div className="avatar-label">USER</div>

          <div className="field">
            <label>USER NAME</label>
            {!isEditing ? (
              <div className="value-box">{user.id}</div>
            ) : (
              <input className="value-input" value={user.id} onChange={(e) => setUser({ ...user, id: e.target.value })} />
            )}
          </div>

          <div className="field">
            <label>EMAIL ID</label>
            {!isEditing ? (
              <div className="value-box">{user.email}</div>
            ) : (
              <input className="value-input" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            )}
          </div>

          <div className="field">
            <label>Apartment Name</label>
            {!isEditing ? (
              <div className="value-box">{user.apartment}</div>
            ) : (
              <input className="value-input" value={user.apartment} onChange={(e) => setUser({ ...user, apartment: e.target.value })} />
            )}
          </div>

          <div className="edit-actions">
            {!isEditing ? (
              <button className="btn primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
            ) : (
              <>
                <button className="btn" onClick={() => setIsEditing(false)}>Cancel</button>
                <button className="btn primary" onClick={handleSaveProfile}>Save</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="panel payments">
        <div className="panel-title">Monthly Payment Status For Current Month</div>
        <table className="table">
          <thead>
            <tr>
              <th>ITEM</th>
              <th>STATUS (THIS MONTH)</th>
              <th>THIS MONTH DUE DATE</th>
              <th>NEXT MONTH DUE DATE</th>
              <th>NEXT STATUS</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(row => {
              const currDue = getCurrentMonthDue(row.dueDate);
              const nextDue = getNextMonthDue(row.dueDate);
              const currStatus = getStatusForCurrentMonth(row.dueDate);
              const nextStatus = 'Upcoming';
              return (
                <tr key={row.id}>
                  <td>{row.item}</td>
                  <td>
                    <span className={`chip ${currStatus === 'Due' ? 'due' : 'paid'}`}>{currStatus}</span>
                  </td>
                  <td>{currDue.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                  <td>{nextDue.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                  <td><span className="chip paid">{nextStatus}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="note">
        <div className="note-title">NOTE</div>
        <div className="note-text">{rentNote}</div>
      </div>
    </div>
  );
}

export default UserProfile;
