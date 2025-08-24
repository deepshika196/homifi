import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/admin_styles/UserManagement.css';

const UserManagement = () => {
  const [search, setSearch] = useState('');
  const [residents, setResidents] = useState([
    {
      username: 'AS_01_01_01',
      email: 'as_01_01_01@flatify.com',
      password: 'SamplePass123!'
    },
    {
      username: 'AS_01_01_02',
      email: 'as_01_01_02@flatify.com',
      password: 'SamplePass456!'
    },
    {
      username: 'AS_01_02_01',
      email: 'as_01_02_01@flatify.com',
      password: 'SamplePass789!'
    }
  ]);
  const navigate = useNavigate();

  const handleDelete = (email) => {
    setResidents(residents.filter((res) => res.email !== email));
  };

  const filteredResidents = residents.filter((res) =>
    res.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleUserGenerationClick = () => {
    navigate('/admin/usergeneration');
  };

  return (
    <div className="user-management-container">
      <h2>RESIDENT MANAGEMENT</h2>

      <div className="user-generation-button-section">
        <button className="user-generation-button" onClick={handleUserGenerationClick}>
          USER GENERATION
        </button>
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

