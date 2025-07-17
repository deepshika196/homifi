import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import AdminApproval from './admin/adminapproval';
import PaymentManagement from './admin/paymentmanagement';
import RaiseTicket from './admin/raiseticket';
import UserManagement from './admin/usermanagement';
import WorkerManagement from './admin/workermanagement';

const AdminDashboard = () => (
  <div>
    <nav style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
      <Link to="adminapproval">Admin Approval</Link>
      <Link to="usermanagement">User Management</Link>
      <Link to="workermanagement">Worker Management</Link>
      <Link to="paymentmanagement">Payment Management</Link>
      <Link to="raiseticket">Raise Ticket</Link>
    </nav>
    <Routes>
      <Route path="adminapproval" element={<AdminApproval />} />
      <Route path="usermanagement" element={<UserManagement />} />
      <Route path="workermanagement" element={<WorkerManagement />} />
      <Route path="paymentmanagement" element={<PaymentManagement />} />
      <Route path="raiseticket" element={<RaiseTicket />} />
      {/* Optionally add a default route */}
      <Route path="*" element={<div>Select an admin option from above.</div>} />
    </Routes>
  </div>
);

export default AdminDashboard;
