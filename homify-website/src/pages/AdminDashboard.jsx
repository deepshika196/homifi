
import { Routes, Route } from 'react-router-dom';
import AdminApproval from './admin/adminapproval';
import PaymentManagement from './admin/paymentmanagement';
import RaiseTicket from './admin/raiseticket';
import UserManagement from './admin/usermanagement';
import WorkerManagement from './admin/workermanagement';
import Navbar_Admin from '../components/Admin/NavBar_Admin';

const AdminDashboard = () => (
  <div>
    <Navbar_Admin />

    <div className="admin-content">
      <Routes>
        <Route path="adminapproval" element={<AdminApproval />} />
        <Route path="usermanagement" element={<UserManagement />} />
        <Route path="workermanagement" element={<WorkerManagement />} />
        <Route path="paymentmanagement" element={<PaymentManagement />} />
        <Route path="raiseticket" element={<RaiseTicket />} />
        <Route path="*" element={<div>Select an admin option from above.</div>} />
      </Routes>
    </div>
  </div>
);

export default AdminDashboard;

