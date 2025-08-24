import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/admin_styles/UserGeneration.css';

const UserGeneration = () => {
  const [search, setSearch] = useState('');
  const [residents, setResidents] = useState([]);
  const navigate = useNavigate();

  const handleBackToUserManagement = () => {
    navigate('/admin/usermanagement');
  };

  const [blockMode, setBlockMode] = useState('range');
  const [blockFrom, setBlockFrom] = useState('');
  const [blockTo, setBlockTo] = useState('');
  const [customBlock, setCustomBlock] = useState('');

  const [blockNumFrom, setBlockNumFrom] = useState('');
  const [blockNumTo, setBlockNumTo] = useState('');
  const [customBlockNum, setCustomBlockNum] = useState('');

  const [floorMode, setFloorMode] = useState('range');
  const [floorFrom, setFloorFrom] = useState('');
  const [floorTo, setFloorTo] = useState('');
  const [customFloor, setCustomFloor] = useState('');

  const [houseMode, setHouseMode] = useState('range');
  const [houseFrom, setHouseFrom] = useState('');
  const [houseTo, setHouseTo] = useState('');
  const [customHouse, setCustomHouse] = useState('');

  const getAlphabeticRange = (start, end) => {
    const range = [];
    let current = start.toUpperCase();
    while (current <= end.toUpperCase()) {
      range.push(current);
      current = incrementString(current);
    }
    return range;
  };

  const generateStrongPassword = (length = 12) => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    const all = upper + lower + numbers + symbols;

    let password = '';
    // Ensure at least one of each
    password += upper[Math.floor(Math.random() * upper.length)];
    password += lower[Math.floor(Math.random() * lower.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = 4; i < length; i++) {
      password += all[Math.floor(Math.random() * all.length)];
    }

    // Shuffle the password to avoid predictable positions
    return password.split('').sort(() => Math.random() - 0.5).join('');
  };

  const incrementString = (str) => {
    let carry = 1;
    let result = '';
    for (let i = str.length - 1; i >= 0; i--) {
      let code = str.charCodeAt(i) + carry;
      if (code > 90) {
        code = 65;
        carry = 1;
      } else {
        carry = 0;
      }
      result = String.fromCharCode(code) + result;
    }
    if (carry === 1) result = 'A' + result;
    return result;
  };

  const generateUsers = () => {
    const users = [];

    const blocks = blockMode === 'range'
      ? getAlphabeticRange(blockFrom, blockTo)
      : [customBlock.toUpperCase()];

    const blockNums = customBlockNum
      ? [customBlockNum.padStart(2, '0')]
      : Array.from({ length: Number(blockNumTo) - Number(blockNumFrom) + 1 }, (_, i) => (Number(blockNumFrom) + i).toString().padStart(2, '0'));

    const floors = floorMode === 'range'
      ? Array.from({ length: Number(floorTo) - Number(floorFrom) + 1 }, (_, i) => (Number(floorFrom) + i).toString().padStart(2, '0'))
      : [customFloor.padStart(2, '0')];

    const houses = houseMode === 'range'
      ? Array.from({ length: Number(houseTo) - Number(houseFrom) + 1 }, (_, i) => (Number(houseFrom) + i).toString().padStart(2, '0'))
      : [customHouse.padStart(2, '0')];

    blocks.forEach(block => {
      blockNums.forEach(bn => {
        floors.forEach(floor => {
          houses.forEach(house => {
            const username = `${block}_${bn}_${floor}_${house}`;
            const email = `${username.toLowerCase()}@flatify.com`;
            const password = generateStrongPassword();
            users.push({ username, email, password });
          });
        });
      });
    });

    setResidents(prev => [...prev, ...users]);
  };

  const handleDelete = (email) => {
    setResidents(residents.filter((res) => res.email !== email));
  };

  const filteredResidents = residents.filter((res) =>
    res.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="user-generation-container">
      <div className="header-section">
        <button className="back-button" onClick={handleBackToUserManagement}>
          ← Back to User Management
        </button>
        <h2>USER GENERATION</h2>
      </div>

      <div className="generator-section">
        <h3>GENERATE NEW RESIDENTS</h3>

        <div className="generate-block">
          <label>BLOCK NAME:</label>
          <select value={blockMode} onChange={(e) => setBlockMode(e.target.value)}>
            <option value="range">ALPHABET RANGE</option>
            <option value="manual">MANUAL</option>
          </select>
          {blockMode === 'range' ? (
            <>
              <input placeholder="FROM (AS)" value={blockFrom} onChange={(e) => setBlockFrom(e.target.value)} />
              <span>→</span>
              <input placeholder="TO (AZ)" value={blockTo} onChange={(e) => setBlockTo(e.target.value)} />
            </>
          ) : (
            <input placeholder="Block Name (e.g., AS)" value={customBlock} onChange={(e) => setCustomBlock(e.target.value)} />
          )}
        </div>

        <div className="generate-block-number">
          <label>BLOCK NUMBER:</label>
          <input placeholder="FROM (01)" value={blockNumFrom} onChange={(e) => setBlockNumFrom(e.target.value)} />
          <span>→</span>
          <input placeholder="TO (10)" value={blockNumTo} onChange={(e) => setBlockNumTo(e.target.value)} />
          <span>OR</span>
          <input placeholder="Manual Block No (e.g., 01)" value={customBlockNum} onChange={(e) => setCustomBlockNum(e.target.value)} />
        </div>

        <div className="generate-floor">
          <label>FLOOR:</label>
          <select value={floorMode} onChange={(e) => setFloorMode(e.target.value)}>
            <option value="range">NUMERIC RANGE</option>
            <option value="manual">MANUAL</option>
          </select>
          {floorMode === 'range' ? (
            <>
              <input placeholder="FROM (1)" value={floorFrom} onChange={(e) => setFloorFrom(e.target.value)} />
              <span>→</span>
              <input placeholder="TO (10)" value={floorTo} onChange={(e) => setFloorTo(e.target.value)} />
            </>
          ) : (
            <input placeholder="Floor No (e.g., 01)" value={customFloor} onChange={(e) => setCustomFloor(e.target.value)} />
          )}
        </div>

        <div className="generate-house">
          <label>HOUSE NO:</label>
          <select value={houseMode} onChange={(e) => setHouseMode(e.target.value)}>
            <option value="range">NUMERIC RANGE</option>
            <option value="manual">MANUAL</option>
          </select>
          {houseMode === 'range' ? (
            <>
              <input placeholder="FROM (1)" value={houseFrom} onChange={(e) => setHouseFrom(e.target.value)} />
              <span>→</span>
              <input placeholder="TO (10)" value={houseTo} onChange={(e) => setHouseTo(e.target.value)} />
            </>
          ) : (
            <input placeholder="House No (e.g., 01)" value={customHouse} onChange={(e) => setCustomHouse(e.target.value)} />
          )}
        </div>

        <button className="generate-button" onClick={generateUsers}>
          GENERATE USERNAME & PASSWORD
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

export default UserGeneration;
