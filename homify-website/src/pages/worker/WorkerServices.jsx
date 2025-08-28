import React, { useEffect, useMemo, useState } from 'react';
import '../../styles/worker/WorkerServices.css';

function WorkerServices() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const storeKey = useMemo(() => `workerServices_${currentUser.id || 'anon'}`,[currentUser.id]);

  const seedRequests = [
    { id: 11, title: 'Plumbing Repair', area: 'Block A - 2nd floor', time: '10:00 AM', description: 'Leak under sink', quote: 500 },
    { id: 12, title: 'AC Maintenance', area: 'Block C - 5th floor', time: '11:30 AM', description: 'General maintenance', quote: 700 },
    { id: 13, title: 'Electrical Fix', area: 'Block B - Gym', time: '02:15 PM', description: 'Light not working', quote: 450 },
    { id: 14, title: 'Carpentry', area: 'Block A - 1st floor', time: '04:00 PM', description: 'Loose door handle', quote: 300 }
  ];

  const [requests, setRequests] = useState(seedRequests);
  const [accepted, setAccepted] = useState([]);
  const [past, setPast] = useState([
    { id: 1001, originalId: 1001, title: 'Tap Repair', area: 'Block D', date: '2025-06-01', rating: 4, amount: 350, status: 'completed', paid: true },
    { id: 1002, originalId: 1002, title: 'AC Cleaning', area: 'Block B', date: '2025-05-18', rating: 5, amount: 700, status: 'completed', paid: true },
    { id: 1003, originalId: 1003, title: 'Drain Unclogging', area: 'Block A', date: '2025-05-10', rating: 3, amount: 400, status: 'completed', paid: false }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem(storeKey);
    if (saved) {
      try {
        const obj = JSON.parse(saved);
        if (obj.requests) setRequests(obj.requests);
        if (obj.accepted) setAccepted(obj.accepted);
        if (obj.past) setPast(obj.past);
      } catch {}
    }
  }, [storeKey]);

  useEffect(() => {
    localStorage.setItem(storeKey, JSON.stringify({ requests, accepted, past }));
  }, [storeKey, requests, accepted, past]);

  const upsertPast = (originalId, patch) => {
    setPast(prev => {
      const idx = prev.findIndex(p => p.originalId === originalId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...patch };
        return next;
      }
      return [
        ...prev,
        {
          id: Date.now(),
          originalId,
          title: patch.title || '',
          area: patch.area || '',
          date: patch.date || new Date().toISOString().slice(0,10),
          rating: 0,
          amount: patch.amount ?? patch.quote ?? 0,
          status: patch.status || 'accepted',
          paid: patch.paid ?? false
        }
      ];
    });
  };

  const acceptService = (req) => {
    setAccepted(prev => [...prev, { ...req, acceptedAt: new Date().toISOString(), completed: false, paid: false }]);
    setRequests(prev => prev.filter(r => r.id !== req.id));
    upsertPast(req.id, { title: req.title, area: req.area, amount: req.quote, status: 'accepted', paid: false });
  };

  const rejectService = (req) => {
    setRequests(prev => prev.filter(r => r.id !== req.id));
    upsertPast(req.id, { title: req.title, area: req.area, amount: req.quote, status: 'rejected', paid: false });
  };

  const deleteAccepted = (id) => {
    const rec = accepted.find(a => a.id === id);
    if (rec) upsertPast(id, { status: 'deleted', paid: false });
    setAccepted(prev => prev.filter(r => r.id !== id));
  };

  const markCompleted = (id) => {
    const rec = accepted.find(a => a.id === id);
    if (rec) {
      upsertPast(id, { status: 'completed', title: rec.title, area: rec.area, amount: rec.quote });
    }
    // Remove from accepted once completed
    setAccepted(prev => prev.filter(a => a.id !== id));
  };

  const togglePaid = (id) => {
    const a = accepted.find(x => x.id === id);
    const nextPaid = !(a && a.paid);
    setAccepted(prev => prev.map(x => x.id === id ? { ...x, paid: nextPaid } : x));
    upsertPast(id, { paid: nextPaid });
  };

  const togglePastPaid = (originalId) => {
    setPast(prev => prev.map(p => p.originalId === originalId ? { ...p, paid: !p.paid } : p));
  };

  const setPastRating = (id, rating) => {
    setPast(prev => prev.map(p => p.id === id ? { ...p, rating } : p));
  };

  const fmt = (iso) => new Date(iso).toLocaleDateString('en-GB', { day:'2-digit', month:'long', year:'numeric' });

  return (
    <div className="worker-page">
      <div className="worker-panel">
        <div className="worker-title">New Services</div>
        <ul className="worker-list">
          {requests.map(j => (
            <li key={j.id} className="worker-item">
              <div className="worker-item-title">{j.title}</div>
              <div className="worker-item-meta">{j.area} • {j.time}</div>
              <div className="worker-item-meta">Quote: ₹{j.quote}</div>
              <div className="worker-item-meta">{j.description}</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="worker-btn" onClick={()=>acceptService(j)}>ACCEPT</button>
                <button className="worker-btn light" onClick={()=>rejectService(j)}>REJECT</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="worker-panel" style={{ marginTop: 16 }}>
        <div className="worker-title">Currently Accepted</div>
        {accepted.length === 0 ? (
          <div className="worker-item-meta">No accepted services yet.</div>
        ) : (
          <ul className="worker-list">
            {accepted.map(a => (
              <li key={a.id} className="worker-item">
                <div className="worker-item-title">{a.title}</div>
                <div className="worker-item-meta">{a.area} • {a.time}</div>
                <div className="worker-item-meta">Quote: ₹{a.quote}</div>
                <div className="worker-item-meta">Status: accepted • {a.paid ? 'paid' : 'unpaid'}</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap:'wrap' }}>
                  <button className="worker-btn" onClick={()=>markCompleted(a.id)}>MARK COMPLETED</button>
                  <button className="worker-btn" onClick={()=>togglePaid(a.id)}>{a.paid ? 'MARK UNPAID' : 'MARK PAID'}</button>
                  <button className="worker-btn light" onClick={()=>deleteAccepted(a.id)}>DELETE</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="worker-panel" style={{ marginTop: 16 }}>
        <div className="worker-title">Past Fixes</div>
        <div className="table-card">
          <table className="pay-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Area</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Paid</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {past.map(p => (
                <tr key={p.id}>
                  <td>{p.title}</td>
                  <td>{p.area}</td>
                  <td>{fmt(p.date)}</td>
                  <td>₹{p.amount}</td>
                  <td>{p.status}</td>
                  <td>
                    {p.paid ? (
                      <button className="worker-btn light" onClick={()=>togglePastPaid(p.originalId)}>MARK UNPAID</button>
                    ) : (
                      <button className="worker-btn" onClick={()=>togglePastPaid(p.originalId)}>MARK PAID</button>
                    )}
                  </td>
                  <td>
                    {[1,2,3,4,5].map(s => (
                      <span key={s} style={{ cursor:'pointer', color: s<=p.rating ? '#FFD700':'#ccc', fontSize: 18 }} onClick={()=>setPastRating(p.id, s)}>★</span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WorkerServices;
