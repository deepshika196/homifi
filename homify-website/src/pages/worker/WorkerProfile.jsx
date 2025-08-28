import React, { useEffect, useMemo, useState } from 'react';
import '../../styles/worker/WorkerProfile.css';

function WorkerProfile() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const storageKey = useMemo(() => `workerProfile_${currentUser.id || 'anon'}`,[currentUser.id]);

  const defaultProfile = {
    name: currentUser.name || 'RAJU M',
    email: currentUser.email || '',
    phone: currentUser.phone || '',
    yearsOfExperience: 3,
    rating: 4,
    works: [
      { id: 1, name: 'Tap Repair', est: '₹200 - ₹350' },
      { id: 2, name: 'Shower Fitting', est: '₹500 - ₹700' },
      { id: 3, name: 'Drain Unclogging', est: '₹400 - ₹600' }
    ]
  };

  const [profile, setProfile] = useState(defaultProfile);
  const [edit, setEdit] = useState(false);
  const [newWork, setNewWork] = useState({ name: '', est: '' });

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try { setProfile(JSON.parse(saved)); } catch {}
    }
  }, [storageKey]);

  const saveProfile = () => {
    localStorage.setItem(storageKey, JSON.stringify(profile));
    setEdit(false);
  };

  const cancelEdit = () => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setProfile(JSON.parse(saved)); else setProfile(defaultProfile);
    setEdit(false);
  };

  const updateField = (field, value) => setProfile(prev => ({ ...prev, [field]: value }));

  const addWork = () => {
    if (!newWork.name.trim() || !newWork.est.trim()) return;
    setProfile(prev => ({ ...prev, works: [...prev.works, { id: Date.now(), name: newWork.name.trim(), est: newWork.est.trim() }] }));
    setNewWork({ name: '', est: '' });
  };

  const removeWork = (id) => setProfile(prev => ({ ...prev, works: prev.works.filter(w => w.id !== id) }));

  const setRating = (v) => setProfile(prev => ({ ...prev, rating: v }));

  return (
    <div className="worker-page">
      <div className="worker-profile-card">
        <div className="worker-profile-title">YOUR PROFILE</div>

        <div className="wp-row">
          <label>NAME :</label>
          {edit ? (
            <input className="wp-input" value={profile.name} onChange={(e)=>updateField('name', e.target.value)} />
          ) : (
            <div className="wp-display">{profile.name}</div>
          )}
        </div>
        <div className="wp-row">
          <label>EMAIL :</label>
          {edit ? (
            <input className="wp-input" value={profile.email} onChange={(e)=>updateField('email', e.target.value)} />
          ) : (
            <div className="wp-display">{profile.email || '----'}</div>
          )}
        </div>
        <div className="wp-row">
          <label>PHONE .NO :</label>
          {edit ? (
            <input className="wp-input" value={profile.phone} onChange={(e)=>updateField('phone', e.target.value)} />
          ) : (
            <div className="wp-display">{profile.phone || '----'}</div>
          )}
        </div>

        <div className="wp-works-box">
          <div className="wp-works-title">KIND OF WORKS & PRICE DETAILS</div>
          <ul className="wp-works-list">
            {profile.works.map(w => (
              <li key={w.id} className="wp-work-item">
                <span className="wp-work-name">{w.name}</span>
                <span className="wp-work-est">{w.est}</span>
                {edit && <button className="wp-remove" onClick={()=>removeWork(w.id)}>✕</button>}
              </li>
            ))}
          </ul>
          {edit && (
            <div className="wp-add-row">
              <input className="wp-input" placeholder="Work name" value={newWork.name} onChange={(e)=>setNewWork({...newWork, name:e.target.value})} />
              <input className="wp-input" placeholder="Est. cost (e.g., ₹200 - ₹350)" value={newWork.est} onChange={(e)=>setNewWork({...newWork, est:e.target.value})} />
              <button className="worker-btn" onClick={addWork}>ADD</button>
            </div>
          )}
        </div>

        <div className="wp-row">
          <label>YEARS OF EXPERIENCE</label>
          {edit ? (
            <input className="wp-input" type="number" min="0" value={profile.yearsOfExperience} onChange={(e)=>updateField('yearsOfExperience', Number(e.target.value))} />
          ) : (
            <div className="wp-display">{profile.yearsOfExperience}</div>
          )}
        </div>

        <div className="wp-row">
          <label>RATING</label>
          <div className="wp-stars">
            {[1,2,3,4,5].map(s => (
              <span key={s} onClick={()=> edit && setRating(s)} className={`wp-star ${s <= profile.rating ? 'filled' : ''}`}>★</span>
            ))}
            <span className="wp-rating-value">{profile.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="wp-actions">
          {!edit ? (
            <button className="worker-btn" onClick={()=>setEdit(true)}>EDIT</button>
          ) : (
            <>
              <button className="worker-btn" onClick={saveProfile}>SAVE</button>
              <button className="worker-btn light" onClick={cancelEdit}>CANCEL</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkerProfile;
