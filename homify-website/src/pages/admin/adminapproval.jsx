import React, { useState } from 'react';
import '../../styles/admin_styles/AdminApproval.css';
import Navbar_Admin from '../../components/Admin/NavBar_Admin.jsx' // Import the dedicated CSS file

// Mock data for pending admin requests. In a real application, you would fetch this from an API.
const initialRequests = [
  { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', requestedDate: '2025-07-20' },
  { id: 2, name: 'Bob Williams', email: 'bob.w@example.com', requestedDate: '2025-07-19' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', requestedDate: '2025-07-18' },
];

const AdminApproval = () => {
  const [requests, setRequests] = useState(initialRequests);

  // Handler to approve a request
  const handleApprove = (id) => {
    console.log(`Approving request with ID: ${id}`);
    // In a real app, you would send a request to your backend here.
    setRequests(currentRequests => currentRequests.filter(req => req.id !== id));
  };

  // Handler to decline a request
  const handleDecline = (id) => {
    console.log(`Declining request with ID: ${id}`);
    // In a real app, you would send a request to your backend here.
    setRequests(currentRequests => currentRequests.filter(req => req.id !== id));
  };

  return (
    <div className="admin-approval-container">
      <h2 className="admin-approval-header">Admin Approval</h2>
      <p className="admin-approval-subheader">Review and approve pending admin requests here.</p>
      
      <div className="table-container">
        {requests.length > 0 ? (
          <table className="admin-approval-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date Requested</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(request => (
                <tr key={request.id}>
                  <td>{request.name}</td>
                  <td>{request.email}</td>
                  <td>{request.requestedDate}</td>
                  <td className="actions-cell">
                    <button 
                      onClick={() => handleApprove(request.id)}
                      className="btn btn-approve"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleDecline(request.id)}
                      className="btn btn-decline"
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-requests-message">No pending requests.</p>
        )}
      </div>
    </div>
  );
};

export default AdminApproval;
