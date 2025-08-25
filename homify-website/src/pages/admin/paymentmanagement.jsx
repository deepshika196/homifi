import React, { useState } from 'react';
import '../../styles/admin_styles/AdminApproval.css';

const PaymentManagement = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [block, setBlock] = useState('');
  const [floor, setFloor] = useState('');
  const [searchUsername, setSearchUsername] = useState('');

  // Mock user data
  const mockUsers = [
    {
      id: 'S_7_01',
      email: 'rajeshkuma@gmail.com',
      rentStatus: 'PAID',
      datePaidRent: '20.01.225',
      lastDateRentPayment: '18.01.225',
      delayRent: '0 DAYS',
      maintenanceStatus: 'PAID',
      datePaidMaintenance: '20.01.225',
      lastDateMaintenancePayment: '18.01.225',
      delayMaintenance: '0 DAYS',
    },
    {
      id: 'S_7_02',
      email: 'john.doe@example.com',
      rentStatus: 'UNPAID',
      datePaidRent: '---',
      lastDateRentPayment: '18.01.225',
      delayRent: '10 DAYS',
      maintenanceStatus: 'UNPAID',
      datePaidMaintenance: '---',
      lastDateMaintenancePayment: '18.01.225',
      delayMaintenance: '10 DAYS',
    },
    {
      id: 'S_7_03',
      email: 'jane.smith@example.com',
      rentStatus: 'PAID',
      datePaidRent: '22.01.225',
      lastDateRentPayment: '20.01.225',
      delayRent: '0 DAYS',
      maintenanceStatus: 'UNPAID',
      datePaidMaintenance: '---',
      lastDateMaintenancePayment: '20.01.225',
      delayMaintenance: '5 DAYS',
    },
    {
      id: 'S_7_04',
      email: 'mike.brown@example.com',
      rentStatus: 'UNPAID',
      datePaidRent: '---',
      lastDateRentPayment: '19.01.225',
      delayRent: '15 DAYS',
      maintenanceStatus: 'PAID',
      datePaidMaintenance: '19.01.225',
      lastDateMaintenancePayment: '17.01.225',
      delayMaintenance: '0 DAYS',
    },
  ];

  const [filteredUsers, setFilteredUsers] = useState(mockUsers);

  const handleSearch = () => {
    const lowerCaseSearch = searchUsername.toLowerCase();
    const filtered = mockUsers.filter(
      (user) =>
        user.email.toLowerCase().includes(lowerCaseSearch) ||
        user.id.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredUsers(filtered);
    console.log('Searching with:', { month, year, block, floor, searchUsername });
  };

  return (
    <div className="admin-payment-management">
      <h1>RESIDENT'S PAYMENT STATUS</h1>
      <p className="note">Note: If you don't select a Floor or Block from the dropdown, the system will display results for all floors and blocks by default.</p>

      <div className="filters">
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">MONTH **</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
              {new Date(0, i).toLocaleString('en-US', { month: 'long' })}
            </option>
          ))}
        </select>
        <input
          type="text"
          list="year-options"
          placeholder="YEAR **"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <datalist id="year-options">
          {Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => {
            const yearOption = 1900 + i;
            return <option key={yearOption} value={yearOption} />;
          })}
        </datalist>
        <input
          type="text"
          list="block-options"
          placeholder="BLOCK"
          value={block}
          onChange={(e) => setBlock(e.target.value)}
        />
        <datalist id="block-options">
          {Array.from({ length: 26 }, (_, i) => {
            const blockOption = String.fromCharCode(65 + i);
            return <option key={blockOption} value={blockOption} />;
          })}
        </datalist>
        <input
          type="text"
          list="floor-options"
          placeholder="FLOOR"
          value={floor}
          onChange={(e) => setFloor(e.target.value)}
        />
        <datalist id="floor-options">
          {Array.from({ length: 100 }, (_, i) => (
            <option key={i + 1} value={i + 1} />
          ))}
        </datalist>
        <div className="search-bar">
          <input
            type="text"
            placeholder="SEARCH USERNAME"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
          />
          <button onClick={handleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="20px" height="20px">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="payment-status-list">
        {filteredUsers.map((user) => (
          <div key={user.id} className={`payment-card ${user.rentStatus.toLowerCase()}`}>
            <div className="user-info">
              <span>{user.id}</span>
              <span>{user.email}</span>
            </div>
            <div className="status-details">
              <div className="status-item">
                <span>RENT STATUS:</span>
                <span className={`status-${user.rentStatus.toLowerCase()}`}>{user.rentStatus}</span>
              </div>
              <div className="status-item">
                <span>DATE USER PAID RENT:</span>
                <span>{user.datePaidRent}</span>
              </div>
              <div className="status-item">
                <span>LAST DATE OF RENT PAYMENT</span>
                <span>{user.lastDateRentPayment}</span>
              </div>
              <div className="status-item">
                <span>DELAY OF RENT PAYMENT</span>
                <span className="delay-days">{user.delayRent}</span>
              </div>
            </div>
            <div className="status-details">
              <div className="status-item">
                <span>MAINTENANCE STATUS:</span>
                <span className={`status-${user.maintenanceStatus.toLowerCase()}`}>{user.maintenanceStatus}</span>
              </div>
              <div className="status-item">
                <span>DATE USER PAID MAINTENANCE :</span>
                <span>{user.datePaidMaintenance}</span>
              </div>
              <div className="status-item">
                <span>LAST DATE OF MAINTENANCE PAYMENT</span>
                <span>{user.lastDateMaintenancePayment}</span>
              </div>
              <div className="status-item">
                <span>DELAY OF M.PAYMENT</span>
                <span className="delay-days">{user.delayMaintenance}</span>
              </div>
              {user.rentStatus === 'UNPAID' || user.maintenanceStatus === 'UNPAID' ? (
                <button className="send-email-button" onClick={() => alert(`Send Email & Notifications to ${user.email}`)}>SEND EMAIL & NOTIFICATIONS</button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentManagement;
