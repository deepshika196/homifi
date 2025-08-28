import { Outlet, Routes, Route } from 'react-router-dom';
import Navbar_Resident from '../components/resident/NavBar_Resident';
import Services from './resident/Services';
import Payments from './resident/Payments';
import RaiseTicket from './resident/RaiseTicket';
import UserProfile from './resident/UserProfile';
import PaymentCheckout from './resident/PaymentCheckout';

function ResidentDashboard() {
  return (
    <div>
      <Navbar_Resident />
      <div className="resident-content">
        <Routes>
          <Route path="/" element={<Services />} />
          <Route path="/services" element={<Services />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/payments/checkout" element={<PaymentCheckout />} />
          <Route path="/raiseticket" element={<RaiseTicket />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      </div>
    </div>
  );
}

export default ResidentDashboard;
