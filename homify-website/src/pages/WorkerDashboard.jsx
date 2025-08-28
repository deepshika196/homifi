import { Routes, Route } from 'react-router-dom';
import NavBar_Worker from '../components/worker/NavBar_Worker';
import WorkerProfile from './worker/WorkerProfile';
import WorkerServices from './worker/WorkerServices';
import WorkerTickets from './worker/WorkerTickets';

function WorkerDashboard(){
  return (
    <div>
      <NavBar_Worker />
      <div className="worker-content">
        <Routes>
          <Route path="/" element={<WorkerProfile />} />
          <Route path="/profile" element={<WorkerProfile />} />
          <Route path="/services" element={<WorkerServices />} />
          <Route path="/tickets" element={<WorkerTickets />} />
        </Routes>
      </div>
    </div>
  );
}

export default WorkerDashboard;
