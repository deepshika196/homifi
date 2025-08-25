import { useState, useEffect } from 'react';
import '../../styles/admin_styles/WorkerManagement.css';

const WorkerManagement = () => {
  const [workerName, setWorkerName] = useState('');
  const [workerNameError, setWorkerNameError] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [yearsOfExperienceError, setYearsOfExperienceError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [kindOfWork, setKindOfWork] = useState([]); // Changed to array to hold multiple works
  const [phoneNo, setPhoneNo] = useState('');
  const [phoneNoError, setPhoneNoError] = useState('');
  const [workers, setWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddWorkModal, setShowAddWorkModal] = useState(false);
  const [newWork, setNewWork] = useState('');
  const [newWorkError, setNewWorkError] = useState('');

  // Predefined list of maintenance works
  const [predefinedWorks, setPredefinedWorks] = useState([
    'Plumbing', 'Electrical Repair', 'AC Servicing', 'Carpentry', 'Painting',
    'House Cleaning', 'Pest Control', 'Gardening', 'Appliance Repair', 'Computer Repair',
    'Mobile Repair', 'Vehicle Servicing', 'Driver Service', 'Cooking Service', 'Babysitting',
    'Elder Care', 'Pet Care', 'Laundry Service', 'Home Renovation', 'Interior Design',
    'Water Tank Cleaning', 'CCTV Installation', 'Intercom Installation', 'Door Repair', 'Window Repair',
    'Roof Leakage Repair', 'Tiling Work', 'Flooring Work', 'Wall Putty', 'False Ceiling',
    'Furniture Assembly', 'Disinfection Service', 'Sanitization Service', 'Deep Cleaning', 'Sofa Cleaning',
    'Carpet Cleaning', 'Mattress Cleaning', 'Curtain Cleaning', 'Water Purifier Service', 'Geyser Repair',
    'Washing Machine Repair', 'Refrigerator Repair', 'Microwave Repair', 'Dishwasher Repair', 'TV Repair',
    'Home Theatre Installation', 'Network Cabling', 'Data Recovery', 'Software Installation', 'Printer Repair'
  ]);

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return 'Name cannot be empty.';
    if (name.length < 3) return 'Name must be at least 3 characters long.';
    return '';
  };

  const validateYearsOfExperience = (yoe) => {
    if (!yoe.trim()) return 'Years of Experience cannot be empty.';
    if (isNaN(yoe) || parseInt(yoe) < 0) return 'Years of Experience must be a positive number.';
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email cannot be empty.';
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) return 'Invalid email format.';
    return '';
  };

  const validatePhoneNo = (phone) => {
    if (!phone.trim()) return 'Phone number cannot be empty.';
    if (!/^\d{10}$/.test(phone)) return 'Phone number must be 10 digits.';
    return '';
  };

  const handleChangeWorkerName = (e) => {
    const { value } = e.target;
    setWorkerName(value);
    setWorkerNameError(validateName(value));
  };

  const handleChangeYearsOfExperience = (e) => {
    const { value } = e.target;
    setYearsOfExperience(value);
    setYearsOfExperienceError(validateYearsOfExperience(value));
  };

  const handleChangeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handleChangePhoneNo = (e) => {
    const { value } = e.target;
    setPhoneNo(value);
    setPhoneNoError(validatePhoneNo(value));
  };

  const handleAddKindOfWork = () => {
    setShowAddWorkModal(true);
  };

  const handleAddWorkToList = () => {
    if (!newWork.trim()) {
      setNewWorkError('Work cannot be empty.');
      return;
    }
    if (predefinedWorks.includes(newWork.trim())) {
      setNewWorkError('This work already exists.');
      return;
    }
    setPredefinedWorks([...predefinedWorks, newWork.trim()]);
    setKindOfWork([...kindOfWork, newWork.trim()]);
    setNewWork('');
    setNewWorkError('');
    setShowAddWorkModal(false);
  };

  const handleRemoveWork = (workToRemove) => {
    setKindOfWork(kindOfWork.filter(work => work !== workToRemove));
  };

  const generateUniquePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleAddWorkerAndGeneratePassword = () => {
    const nameError = validateName(workerName);
    const yoeError = validateYearsOfExperience(yearsOfExperience);
    const emailFormatError = validateEmail(email);
    const phoneError = validatePhoneNo(phoneNo);

    setWorkerNameError(nameError);
    setYearsOfExperienceError(yoeError);
    setEmailError(emailFormatError);
    setPhoneNoError(phoneError);

    if (nameError || yoeError || emailFormatError || phoneError || kindOfWork.length === 0) {
      alert('Please fill all required fields correctly and select at least one kind of work.');
      return;
    }

    const newWorker = {
      id: workers.length > 0 ? Math.max(...workers.map(w => w.id)) + 1 : 1,
      username: workerName,
      phoneNo: phoneNo,
      password: generateUniquePassword(),
      works: kindOfWork.join(', '),
    };
    setWorkers([...workers, newWorker]);

    setWorkerName('');
    setYearsOfExperience('');
    setEmail('');
    setKindOfWork([]);
    setPhoneNo('');
  };

  const handleDeleteWorker = (workerId) => {
    setWorkers(workers.filter(worker => worker.id !== workerId));
  };

  const handleSearchWorker = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredWorkers = workers.filter(worker =>
    worker.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.phoneNo.includes(searchTerm)
  );

  useEffect(() => {
    setWorkers([
      { id: 1, username: 'Alice Smith', phoneNo: '9876543210', password: generateUniquePassword(), works: 'Plumbing, Electrical Repair' },
      { id: 2, username: 'Bob Johnson', phoneNo: '8765432109', password: generateUniquePassword(), works: 'AC Servicing, Carpentry' },
      { id: 3, username: 'Charlie Brown', phoneNo: '7654321098', password: generateUniquePassword(), works: 'Painting, House Cleaning' },
    ]);
  }, []);

  return (
    <div className="worker-management-container">
      <h1>WORKERS MANAGEMENT</h1>

      <div className="generate-new-workers-section">
        <h2>GENERATE NEW WORKERS</h2>
        <div className="input-group">
          <label>NAME :</label>
          <input type="text" value={workerName} onChange={handleChangeWorkerName} />
          {workerNameError && <span className="error-message">{workerNameError}</span>}
        </div>
        <div className="input-group">
          <label>YEARS OF EXPERIENCE :</label>
          <input type="text" value={yearsOfExperience} onChange={handleChangeYearsOfExperience} />
          {yearsOfExperienceError && <span className="error-message">{yearsOfExperienceError}</span>}
        </div>
        <div className="input-group">
          <label>Email :</label>
          <input type="email" value={email} onChange={handleChangeEmail} />
          {emailError && <span className="error-message">{emailError}</span>}
        </div>
        <div className="input-group">
          <label>KIND OF WORK :</label>
          <div className="kind-of-work-input-container">
            <select onChange={(e) => setKindOfWork([...kindOfWork, e.target.value])} value="" disabled={predefinedWorks.length === 0}>
              <option value="">Select a work</option>
              {predefinedWorks.map((work, index) => (
                <option key={index} value={work} disabled={kindOfWork.includes(work)}>
                  {work}
                </option>
              ))}
            </select>
            <button onClick={handleAddKindOfWork}>+ ADD</button>
          </div>
          <div className="selected-works-container">
            {kindOfWork.map((work, index) => (
              <span key={index} className="selected-work">
                {work} <button onClick={() => handleRemoveWork(work)}>x</button>
              </span>
            ))}
          </div>
        </div>
        <div className="input-group">
          <label>PHONE NO :</label>
          <input type="text" value={phoneNo} onChange={handleChangePhoneNo} />
          {phoneNoError && <span className="error-message">{phoneNoError}</span>}
        </div>
        <button className="add-worker-button" onClick={handleAddWorkerAndGeneratePassword}>ADD WORKERS AND GENERATE PASSWORD</button>
      </div>

      <div className="workers-detail-section">
        <h2>WORKERS DETAIL</h2>
        <div className="search-worker-container">
          <input type="text" placeholder="SEARCH WORKER" onChange={handleSearchWorker} value={searchTerm} />
          <button className="search-icon">🔍</button>
        </div>
        <div className="workers-table">
          {filteredWorkers.map((worker) => (
            <div key={worker.id} className="worker-row">
              <div className="worker-info">
                <span>USERNAME</span>
                <span className="worker-value">{worker.username}</span>
              </div>
              <div className="worker-info">
                <span>PHONE NO</span>
                <span className="worker-value">{worker.phoneNo}</span>
              </div>
              <div className="worker-info">
                <span>PASSWORD</span>
                <span className="worker-value">{worker.password}</span>
              </div>
              <div className="worker-info">
                <span>WORKS</span>
                <span className="worker-value">{worker.works}</span>
              </div>
              <button className="delete-worker-button" onClick={() => handleDeleteWorker(worker.id)}>DELETE WORKER</button>
            </div>
          ))}
          {filteredWorkers.length === 0 && <p>No workers found.</p>}
        </div>
      </div>

      {showAddWorkModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Kind of Work</h3>
            <input
              type="text"
              value={newWork}
              onChange={(e) => setNewWork(e.target.value)}
              placeholder="Enter new work"
            />
            {newWorkError && <span className="error-message">{newWorkError}</span>}
            <div className="modal-buttons">
              <button onClick={handleAddWorkToList}>Add</button>
              <button onClick={() => { setShowAddWorkModal(false); setNewWorkError(''); setNewWork(''); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerManagement;
