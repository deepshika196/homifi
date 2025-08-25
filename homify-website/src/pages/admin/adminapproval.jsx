import { useState } from 'react';
import '../../styles/admin_styles/AdminApproval.css';

// Mock data for pending admin requests. In a real application, you would fetch this from an API.
const initialRequests = [
  { id: 1, name: 'M.RAJU', email: 'Raju2005@gmail.com', controls: { user: false, admin: false, payment: false, ticket: false } },
  { id: 2, name: 'PETER', email: 'Peter13k@gnail.com', controls: { user: false, admin: false, payment: false, ticket: false } },
];

// Mock data for existing admins
const initialExistingAdmins = [
  { id: 101, name: 'GINNY', email: 'ginn4590i32@gmail.com', controls: { user: true, admin: true, payment: true, ticket: false } },
  { id: 102, name: 'JOHN DOE', email: 'john.doe@example.com', controls: { user: false, admin: true, payment: true, ticket: true } },
  { id: 103, name: 'JANE SMITH', email: 'jane.smith@example.com', controls: { user: true, admin: false, payment: false, ticket: true } },
];

const AdminApproval = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [existingAdmins, setExistingAdmins] = useState(initialExistingAdmins);
  const [searchTerm, setSearchTerm] = useState('');

  const handleApprove = (id) => {
    // In a real app, you would send a request to your backend here with the selected controls.
    console.log(`Approving request with ID: ${id}`);
    const approvedAdmin = requests.find(req => req.id === id);
    if (approvedAdmin) {
      setExistingAdmins(prevAdmins => [...prevAdmins, { ...approvedAdmin, id: Date.now() }]); // Add to existing, assign new ID
    }
    setRequests(currentRequests => currentRequests.filter(req => req.id !== id));
  };

  const handleReject = (id) => {
    console.log(`Rejecting request with ID: ${id}`);
    setRequests(currentRequests => currentRequests.filter(req => req.id !== id));
  };

  const handleControlChange = (id, controlType) => {
    setRequests(currentRequests =>
      currentRequests.map(req =>
        req.id === id
          ? { ...req, controls: { ...req.controls, [controlType]: !req.controls[controlType] } }
          : req
      )
    );
  };

  const handleRemoveAdmin = (id) => {
    console.log(`Removing admin with ID: ${id}`);
    setExistingAdmins(currentAdmins => currentAdmins.filter(admin => admin.id !== id));
  };

  const handleToggleExistingAdminControl = (id, controlType) => {
    setExistingAdmins(currentAdmins =>
      currentAdmins.map(admin =>
        admin.id === id
          ? { ...admin, controls: { ...admin.controls, [controlType]: !admin.controls[controlType] } }
          : admin
      )
    );
  };

  const filteredAdmins = existingAdmins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-approval-container">
      <h2 className="admin-approval-header">APPROVE AND MANAGE STAFF CONTROLS</h2>

      <div className="section new-admins-approval">
        <h3>NEW ADMINS APPROVAL</h3>
        {requests.length > 0 ? (
          requests.map(request => (
            <div key={request.id} className="admin-request-card">
              <div className="admin-info">
                <p className="admin-name">{request.name}</p>
                <p className="admin-email">{request.email}</p>
              </div>
              <div className="admin-actions">
                <button
                  onClick={() => handleApprove(request.id)}
                  className="btn submit-btn"
                >
                  SUBMIT
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  className="btn reject-admin-btn"
                >
                  REJECT ADMIN
                </button>
                <div className="control-group">
                  <div
                    className={`control-box ${request.controls.user ? 'active' : ''}`}
                    onClick={() => handleControlChange(request.id, 'user')}
                  >
                    <svg className="control-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
                    <p>USER CONTROL</p>
                  </div>
                  <div
                    className={`control-box ${request.controls.admin ? 'active' : ''}`}
                    onClick={() => handleControlChange(request.id, 'admin')}
                  >
                    <svg className="control-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
                    <p>ADMIN CONTROL</p>
                  </div>
                  <div
                    className={`control-box ${request.controls.payment ? 'active' : ''}`}
                    onClick={() => handleControlChange(request.id, 'payment')}
                  >
                    <svg className="control-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 4H3c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h18c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H3V6h18v12zM5 10h2v2H5zm4 0h7v2H9z"></path></svg>
                    <p>PAYMENT</p>
                  </div>
                  <div
                    className={`control-box ${request.controls.ticket ? 'active' : ''}`}
                    onClick={() => handleControlChange(request.id, 'ticket')}
                  >
                    <svg className="control-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v10c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6-2h-4v2h4V4zM4 18V8h16l.002 10H4z"></path></svg>
                    <p>TICKET</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-requests-message">No new admin requests.</p>
        )}
      </div>

      <div className="section modify-past-admins-controls">
        <h3>MODIFY PAST ADMINS CONTROLS</h3>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="SEARCH ADMIN"
            className="admin-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.96 6.96 0 0 0 17 10c0-3.87-3.13-7-7-7S3 6.13 3 10s3.13 7 7 7c1.74 0 3.34-.64 4.58-1.71l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 10s2.01-4 4-4 4 2.01 4 4-2.01 4-4 4z"></path></svg>
        </div>

        {filteredAdmins.length > 0 ? (
          filteredAdmins.map(admin => (
            <div key={admin.id} className="admin-request-card">
              <div className="admin-info">
                <p className="admin-name">{admin.name}</p>
                <p className="admin-email">{admin.email}</p>
              </div>
              <div className="admin-actions">
                <button
                  onClick={() => handleRemoveAdmin(admin.id)}
                  className="btn remove-admin-btn"
                >
                  REMOVE ADMIN
                </button>
                <div className="control-group">
                  <div
                    className={`control-box ${admin.controls.user ? 'active' : ''}`}
                    onClick={() => handleToggleExistingAdminControl(admin.id, 'user')}
                  >
                    <svg className="control-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
                    <p>USER CONTROL</p>
                  </div>
                  <div
                    className={`control-box ${admin.controls.admin ? 'active' : ''}`}
                    onClick={() => handleToggleExistingAdminControl(admin.id, 'admin')}
                  >
                    <svg className="control-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
                    <p>ADMIN CONTROL</p>
                  </div>
                  <div
                    className={`control-box ${admin.controls.payment ? 'active' : ''}`}
                    onClick={() => handleToggleExistingAdminControl(admin.id, 'payment')}
                  >
                    <svg className="control-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 4H3c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h18c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H3V6h18v12zM5 10h2v2H5zm4 0h7v2H9z"></path></svg>
                    <p>PAYMENT</p>
                  </div>
                  <div
                    className={`control-box ${admin.controls.ticket ? 'active' : ''}`}
                    onClick={() => handleToggleExistingAdminControl(admin.id, 'ticket')}
                  >
                    <svg className="control-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v10c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6-2h-4v2h4V4zM4 18V8h16l.002 10H4z"></path></svg>
                    <p>TICKET</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-requests-message">No existing admins.</p>
        )}
      </div>

    </div>
  );
};

export default AdminApproval;
