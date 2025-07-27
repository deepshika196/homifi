// import { useState } from 'react';
// import '../../styles/admin_styles/UserManagement.css';

// const UserManagement = () => {
//   const [search, setSearch] = useState('');
//   const [residents, setResidents] = useState([
//     {
//       username: 'S_07_10',
//       email: 'Raju2005@gmail.com',
//       password: 'S_07_10@2025Abjn',
//     },
//     // Add more static or dynamic residents
//   ]);

//   const handleDelete = (email) => {
//     setResidents(residents.filter(res => res.email !== email));
//   };

//   const filteredResidents = residents.filter(res =>
//     res.username.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="user-management-container">
//       <h2>RESIDENT MANAGEMENT</h2>

//       <div className="generator-section">
//         <h3>GENERATE NEW RESIDENTS</h3>
//         <div className="generate-block">
//           <label>BLOCK:</label>
//           <select><option>ALPHABET</option></select>
//           <input placeholder="FROM" />
//           <span>→</span>
//           <select><option>ALPHABET</option></select>
//           <input placeholder="TO" />
//           <span>OR</span>
//           <input placeholder="Write Your Block Name" />
//         </div>

//         <div className="generate-floor">
//           <label>FLOOR:</label>
//           <select><option>ALPHABET</option></select>
//           <input placeholder="FROM" />
//           <span>→</span>
//           <select><option>ALPHABET</option></select>
//           <input placeholder="TO" />
//           <span>OR</span>
//           <input placeholder="Write Your FLOOR Name" />
//         </div>

//         <div className="generate-house">
//           <label>HOUSE NO:</label>
//           <select><option>ALPHABET</option></select>
//           <input placeholder="FROM" />
//           <span>→</span>
//           <select><option>ALPHABET</option></select>
//           <input placeholder="TO" />
//           <span>OR</span>
//           <input placeholder="Write Your House Name" />
//         </div>

//         <button className="generate-button">GENERATE USERNAME & PASSWORD</button>
//       </div>

//       <div className="resident-list-section">
//         <h3>RESIDENT DETAILS</h3>
//         <input
//           type="text"
//           className="search-bar"
//           placeholder="SEARCH RESIDENT"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <div className="resident-list">
//           {filteredResidents.map((res, index) => (
//             <div className="resident-card" key={index}>
//               <span>USERNAME: <b>{res.username}</b></span>
//               <span>EMAIL: {res.email}</span>
//               <span>PASSWORD: <b>{res.password}</b></span>
//               <button className="delete-button" onClick={() => handleDelete(res.email)}>DELETE</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;

// import { useState } from 'react';
// import '../../styles/admin_styles/UserManagement.css';

// const generatePassword = () => {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
//   let password = '';
//   for (let i = 0; i < 12; i++) {
//     password += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return password;
// };

// const UserManagement = () => {
//   const [search, setSearch] = useState('');
//   const [residents, setResidents] = useState([
//     {
//       username: 'S_07_10',
//       email: 'Raju2005@gmail.com',
//       password: 'S_07_10@2025Abjn',
//     },
//   ]);

//   const [options, setOptions] = useState({
//     blockName: true,
//     blockType: true,
//     floorNo: true,
//     houseNo: true,
//     numericBlock: false,
//   });

//   const [inputs, setInputs] = useState({
//     blockFrom: '', blockTo: '', blockCustom: '',
//     floorFrom: '', floorTo: '', floorCustom: '',
//     houseFrom: '', houseTo: '', houseCustom: '',
//     numericBlockFrom: '', numericBlockTo: '',
//   });

//   const handleDelete = (email) => {
//     setResidents(residents.filter(res => res.email !== email));
//   };

//   const filteredResidents = residents.filter(res =>
//     res.username.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleCheckboxChange = (key) => {
//     setOptions({ ...options, [key]: !options[key] });
//   };

//   const handleInputChange = (e) => {
//     setInputs({ ...inputs, [e.target.name]: e.target.value });
//   };

//   const generateUsers = () => {
//     const newUsers = [];
//     const blockRange = options.blockName && inputs.blockFrom && inputs.blockTo ?
//       [...Array(inputs.blockTo.charCodeAt(0) - inputs.blockFrom.charCodeAt(0) + 1).keys()].map(i =>
//         String.fromCharCode(inputs.blockFrom.charCodeAt(0) + i)
//       ) :
//       options.blockName && inputs.blockCustom ? [inputs.blockCustom] : [''];

//     const floorRange = options.floorNo && inputs.floorFrom && inputs.floorTo ?
//       Array.from({ length: Number(inputs.floorTo) - Number(inputs.floorFrom) + 1 }, (_, i) => Number(inputs.floorFrom) + i) :
//       options.floorNo && inputs.floorCustom ? [inputs.floorCustom] : [''];

//     const houseRange = options.houseNo && inputs.houseFrom && inputs.houseTo ?
//       Array.from({ length: Number(inputs.houseTo) - Number(inputs.houseFrom) + 1 }, (_, i) => Number(inputs.houseFrom) + i) :
//       options.houseNo && inputs.houseCustom ? [inputs.houseCustom] : [''];

//     const numericBlockRange = options.numericBlock && inputs.numericBlockFrom && inputs.numericBlockTo ?
//       Array.from({ length: Number(inputs.numericBlockTo) - Number(inputs.numericBlockFrom) + 1 }, (_, i) => Number(inputs.numericBlockFrom) + i) :
//       options.numericBlock ? [''] : [''];

//     blockRange.forEach(block => {
//       numericBlockRange.forEach(nblock => {
//         floorRange.forEach(floor => {
//           houseRange.forEach(house => {
//             const username = `${block}${nblock !== '' ? '_' + nblock : ''}_${floor}_${house}`;
//             const email = `${username.toLowerCase()}@flatify.com`;
//             const password = generatePassword();
//             newUsers.push({ username, email, password });
//           });
//         });
//       });
//     });

//     setResidents([...residents, ...newUsers]);
//   };

//   return (
//     <div className="user-management-container">
//       <h2>RESIDENT MANAGEMENT</h2>

//       <div className="generator-section">
//         <h3>GENERATE NEW RESIDENTS</h3>

//         <div className="checkbox-group">
//           <label><input type="checkbox" checked={options.blockName} onChange={() => handleCheckboxChange('blockName')} /> Block Name</label>
//           <label><input type="checkbox" checked={options.blockType} onChange={() => handleCheckboxChange('blockType')} /> Block Type</label>
//           <label><input type="checkbox" checked={options.floorNo} onChange={() => handleCheckboxChange('floorNo')} /> Floor No</label>
//           <label><input type="checkbox" checked={options.houseNo} onChange={() => handleCheckboxChange('houseNo')} /> House No</label>
//           <label><input type="checkbox" checked={options.numericBlock} onChange={() => handleCheckboxChange('numericBlock')} /> Block No (Numeric)</label>
//         </div>

//         {options.blockName && (
//           <div className="generate-block">
//             <label>BLOCK:</label>
//             <input name="blockFrom" placeholder="FROM" value={inputs.blockFrom} onChange={handleInputChange} />
//             <span>→</span>
//             <input name="blockTo" placeholder="TO" value={inputs.blockTo} onChange={handleInputChange} />
//             <span>OR</span>
//             <input name="blockCustom" placeholder="Write Your Block Name" value={inputs.blockCustom} onChange={handleInputChange} />
//           </div>
//         )}

//         {options.floorNo && (
//           <div className="generate-floor">
//             <label>FLOOR:</label>
//             <input name="floorFrom" placeholder="FROM" value={inputs.floorFrom} onChange={handleInputChange} />
//             <span>→</span>
//             <input name="floorTo" placeholder="TO" value={inputs.floorTo} onChange={handleInputChange} />
//             <span>OR</span>
//             <input name="floorCustom" placeholder="Write Your FLOOR Name" value={inputs.floorCustom} onChange={handleInputChange} />
//           </div>
//         )}

//         {options.houseNo && (
//           <div className="generate-house">
//             <label>HOUSE NO:</label>
//             <input name="houseFrom" placeholder="FROM" value={inputs.houseFrom} onChange={handleInputChange} />
//             <span>→</span>
//             <input name="houseTo" placeholder="TO" value={inputs.houseTo} onChange={handleInputChange} />
//             <span>OR</span>
//             <input name="houseCustom" placeholder="Write Your House Name" value={inputs.houseCustom} onChange={handleInputChange} />
//           </div>
//         )}

//         {options.numericBlock && (
//           <div className="generate-numeric-block">
//             <label>BLOCK NO (NUMERIC):</label>
//             <input name="numericBlockFrom" placeholder="FROM" value={inputs.numericBlockFrom} onChange={handleInputChange} />
//             <span>→</span>
//             <input name="numericBlockTo" placeholder="TO" value={inputs.numericBlockTo} onChange={handleInputChange} />
//           </div>
//         )}

//         <button className="generate-button" onClick={generateUsers}>GENERATE USERNAME & PASSWORD</button>
//       </div>

//       <div className="resident-list-section">
//         <h3>RESIDENT DETAILS</h3>
//         <input
//           type="text"
//           className="search-bar"
//           placeholder="SEARCH RESIDENT"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <div className="resident-list">
//           {filteredResidents.map((res, index) => (
//             <div className="resident-card" key={index}>
//               <span>USERNAME: <b>{res.username}</b></span>
//               <span>EMAIL: {res.email}</span>
//               <span>PASSWORD: <b>{res.password}</b></span>
//               <button className="delete-button" onClick={() => handleDelete(res.email)}>DELETE</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;
import { useState } from 'react';
import '../../styles/admin_styles/UserManagement.css';

const UserManagement = () => {
  const [search, setSearch] = useState('');
  const [residents, setResidents] = useState([]);

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
            const password = `${username}@${new Date().getFullYear()}Abcd`;
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
    <div className="user-management-container">
      <h2>RESIDENT MANAGEMENT</h2>

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

export default UserManagement;

