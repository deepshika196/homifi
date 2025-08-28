import React, { useEffect, useMemo, useState } from 'react';
import '../../styles/worker/WorkerTickets.css';

function WorkerTickets() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const storeKey = useMemo(() => `workerTickets_${currentUser.id || 'anon'}`,[currentUser.id]);

  const seedUpcoming = [
    { id: 201, title: 'Plumbing Repair', date: 'Mon, June 3rd', time: '10:00 AM', area: 'GYM', quote: '', description: '' },
    { id: 202, title: 'Electrical Check', date: 'Tue, June 4th', time: '11:15 AM', area: 'Lobby', quote: '', description: '' },
    { id: 203, title: 'AC Cleaning', date: 'Wed, June 5th', time: '03:00 PM', area: 'Block A - 3rd', quote: '', description: '' }
  ];

  const [upcoming, setUpcoming] = useState(seedUpcoming);
  const [accepted, setAccepted] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(storeKey);
    if (saved) {
      try {
        const obj = JSON.parse(saved);
        if (obj.upcoming) setUpcoming(obj.upcoming);
        if (obj.accepted) setAccepted(obj.accepted);
        if (obj.past) setPast(obj.past);
      } catch {}
    }
  }, [storeKey]);

  useEffect(() => {
    localStorage.setItem(storeKey, JSON.stringify({ upcoming, accepted, past }));
  }, [storeKey, upcoming, accepted, past]);

  const updateUpcomingField = (id, field, value) => {
    setUpcoming(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const acceptTicket = (t) => {
    if (!t.quote || !String(t.quote).trim()) {
      alert('Please add a quote cost before accepting.');
      return;
    }
    setAccepted(prev => [
      ...prev,
      { ...t, paid: false, completed: false, acceptedAt: new Date().toISOString() }
    ]);
    setUpcoming(prev => prev.filter(x => x.id !== t.id));
    upsertPast(t.id, { title: t.title, area: t.area, amount: Number(t.quote) || 0, status: 'accepted', paid: false, date: new Date().toISOString().slice(0,10) });
  };

  const cancelTicket = (t) => {
    setUpcoming(prev => prev.filter(x => x.id !== t.id));
    upsertPast(t.id, { title: t.title, area: t.area, amount: Number(t.quote) || 0, status: 'rejected', paid: false, date: new Date().toISOString().slice(0,10) });
  };

  const deleteAccepted = (id) => {
    const rec = accepted.find(a => a.id === id);
    if (rec) upsertPast(id, { status: 'deleted', paid: false });
    setAccepted(prev => prev.filter(a => a.id !== id));
  };

  const markCompleted = (id) => {
    const rec = accepted.find(a => a.id === id);
    if (rec) {
      upsertPast(id, { status: 'completed', title: rec.title, area: rec.area, amount: Number(rec.quote) || 0 });
    }
    setAccepted(prev => prev.filter(a => a.id !== id));
  };

  const togglePaidAccepted = (id) => {
    const a = accepted.find(x => x.id === id);
    const nextPaid = !(a && a.paid);
    setAccepted(prev => prev.map(x => x.id === id ? { ...x, paid: nextPaid } : x));
    upsertPast(id, { paid: nextPaid });
  };

  const togglePaidPast = (originalId) => {
    setPast(prev => prev.map(p => p.originalId === originalId ? { ...p, paid: !p.paid } : p));
  };

  const setPastRating = (id, rating) => setPast(prev => prev.map(p => p.id === id ? { ...p, rating } : p));

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
          amount: patch.amount ?? 0,
          status: patch.status || 'accepted',
          paid: patch.paid ?? false
        }
      ];
    });
  };

  const fmt = (human) => human; // human-friendly strings already provided for upcoming
  const fmtIso = (iso) => new Date(iso).toLocaleDateString('en-GB', { day:'2-digit', month:'long', year:'numeric' });

  return (
    <div className="worker-page">
      <div className="ticket-panel">
        <div className="worker-title">UPCOMING TICKETS</div>
        <div className="ticket-grid">
          {upcoming.map(t => (
            <div key={t.id} className="ticket-card">
              <div className="ticket-title">[🔧 {t.title}]</div>
              <div className="ticket-meta">📅 Date: {fmt(t.date)}</div>
              <div className="ticket-meta">⏰ Time: {t.time}</div>
              <div className="ticket-meta">AREA: {t.area}</div>

              <div className="ticket-form-row">
                <label>QUOTE COST :</label>
                <input className="ticket-input" value={t.quote} onChange={(e)=>updateUpcomingField(t.id,'quote',e.target.value)} />
              </div>

              <div className="ticket-form-block">
                <div className="ticket-desc-title">DESCRIPTION</div>
                <textarea className="ticket-textarea" rows="5" value={t.description} onChange={(e)=>updateUpcomingField(t.id,'description',e.target.value)} />
              </div>

              <div className="ticket-actions">
                <button className="worker-btn" onClick={()=>acceptTicket(t)}>ACCEPT</button>
                <button className="worker-btn light" onClick={()=>cancelTicket(t)}>CANCEL</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="worker-panel" style={{ marginTop: 16 }}>
        <div className="worker-title">CURRENTLY ACCEPTED</div>
        {accepted.length === 0 ? (
          <div className="worker-item-meta">No accepted tickets.</div>
        ) : (
          <div className="ticket-grid">
            {accepted.map(a => (
              <div key={a.id} className="ticket-card">
                <div className="ticket-title">[🔧 {a.title}]</div>
                <div className="ticket-meta">📅 Date: {a.date}</div>
                <div className="ticket-meta">⏰ Time: {a.time}</div>
                <div className="ticket-meta">AREA: {a.area}</div>
                <div className="ticket-meta">QUOTE: ₹{a.quote || 0}</div>
                <div className="ticket-meta">STATUS: accepted • {a.paid ? 'paid' : 'unpaid'}</div>
                <div className="ticket-actions">
                  <button className="worker-btn" onClick={()=>markCompleted(a.id)}>MARK COMPLETED</button>
                  <button className="worker-btn" onClick={()=>togglePaidAccepted(a.id)}>{a.paid ? 'MARK UNPAID' : 'MARK PAID'}</button>
                  <button className="worker-btn light" onClick={()=>deleteAccepted(a.id)}>DELETE</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="worker-panel" style={{ marginTop: 16 }}>
        <div className="worker-title">PAST FIXES</div>
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
                  <td>{fmtIso(p.date)}</td>
                  <td>₹{p.amount}</td>
                  <td>{p.status}</td>
                  <td>
                    {p.paid ? (
                      <button className="worker-btn light" onClick={()=>togglePaidPast(p.originalId)}>MARK UNPAID</button>
                    ) : (
                      <button className="worker-btn" onClick={()=>togglePaidPast(p.originalId)}>MARK PAID</button>
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

export default WorkerTickets;
