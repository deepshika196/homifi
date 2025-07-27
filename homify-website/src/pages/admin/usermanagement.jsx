import { useState } from 'react';
import '../../styles/admin_styles/UserManagement.css';

const UserManagement = () => {
  const [search, setSearch] = useState('');
  const [residents, setResidents] = useState([
    {
      username: 'S_07_10',
      email: 'Raju2005@gmail.com',
      password: 'S_07_10@2025Abjn',
    },
    // Add more static or dynamic residents
  ]);

  const handleDelete = (email) => {
    setResidents(residents.filter(res => res.email !== email));
  };

  const filteredResidents = residents.filter(res =>
    res.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="user-management-container">
      <h2>RESIDENT MANAGEMENT</h2>

      <div className="generator-section">
        <h3>GENERATE NEW RESIDENTS</h3>
        <div className="generate-block">
          <label>BLOCK:</label>
          <select><option>ALPHABET</option></select>
          <input placeholder="FROM" />
          <span>→</span>
          <select><option>ALPHABET</option></select>
          <input placeholder="TO" />
          <span>OR</span>
          <input placeholder="Write Your Block Name" />
        </div>

        <div className="generate-floor">
          <label>FLOOR:</label>
          <select><option>ALPHABET</option></select>
          <input placeholder="FROM" />
          <span>→</span>
          <select><option>ALPHABET</option></select>
          <input placeholder="TO" />
          <span>OR</span>
          <input placeholder="Write Your FLOOR Name" />
        </div>

        <div className="generate-house">
          <label>HOUSE NO:</label>
          <select><option>ALPHABET</option></select>
          <input placeholder="FROM" />
          <span>→</span>
          <select><option>ALPHABET</option></select>
          <input placeholder="TO" />
          <span>OR</span>
          <input placeholder="Write Your House Name" />
        </div>

        <button className="generate-button">GENERATE USERNAME & PASSWORD</button>
      </div>

      <div className="resident-list-section">
        <h3>RESIDENT DETAILS</h3>
        <input
          type="text"
          className="search-bar"
          placeholder="SEARCH RESIDENT"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="resident-list">
          {filteredResidents.map((res, index) => (
            <div className="resident-card" key={index}>
              <span>USERNAME: <b>{res.username}</b></span>
              <span>EMAIL: {res.email}</span>
              <span>PASSWORD: <b>{res.password}</b></span>
              <button className="delete-button" onClick={() => handleDelete(res.email)}>DELETE</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

