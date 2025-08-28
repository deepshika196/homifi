import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/resident/Payments.css';

function Payments() {
  const navigate = useNavigate();

  const STORAGE_KEY = 'residentPaymentsV1';

  const anchors = [
    { type: 'Rent', anchorDay: 1, amount: 12000 },
    { type: 'Maintenance', anchorDay: 15, amount: 2500 }
  ];

  const getMonthKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

  const generateRecord = (year, monthIndex, anchorDay, type, amount, paid = false, receipt = null) => {
    const last = new Date(year, monthIndex + 1, 0).getDate();
    const day = Math.min(anchorDay, last);
    const dueDate = new Date(year, monthIndex, day);
    return {
      id: `${type}-${year}-${monthIndex + 1}`,
      type,
      amount,
      dueDate: dueDate.toISOString(),
      monthKey: getMonthKey(dueDate),
      paid,
      receipt
    };
  };

  const loadOrSeed = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    // Seed with last month (maintenance due, rent paid), current month (unpaid), next month (upcoming)
    const seed = [];
    anchors.forEach((a) => {
      const isMaintenance = a.type.toLowerCase() === 'maintenance';
      // Previous month: Maintenance should be DUE (unpaid), Rent paid
      const prevPaid = isMaintenance ? false : true;
      const prevReceipt = prevPaid ? { number: `${a.type}-REC-${y}${m}`, ts: new Date().toISOString() } : null;
      seed.push(generateRecord(y, m - 1, a.anchorDay, a.type, a.amount, prevPaid, prevReceipt));
      // Current month: unpaid
      seed.push(generateRecord(y, m, a.anchorDay, a.type, a.amount, false));
      // Next month: unpaid (upcoming)
      seed.push(generateRecord(y, m + 1, a.anchorDay, a.type, a.amount, false));
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed;
  };

  const [records, setRecords] = useState(loadOrSeed());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const today = new Date();
  const currentKey = getMonthKey(today);
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const nextKey = getMonthKey(nextMonth);

  // Ensure required current/next records exist (idempotent)
  useEffect(() => {
    const needed = [];
    anchors.forEach((a) => {
      const hasCurr = records.some(r => r.type === a.type && r.monthKey === currentKey);
      const hasNext = records.some(r => r.type === a.type && r.monthKey === nextKey);
      if (!hasCurr) needed.push(generateRecord(today.getFullYear(), today.getMonth(), a.anchorDay, a.type, a.amount));
      if (!hasNext) needed.push(generateRecord(nextMonth.getFullYear(), nextMonth.getMonth(), a.anchorDay, a.type, a.amount));
    });
    if (needed.length) setRecords(prev => [...prev, ...needed]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const past = useMemo(() => records.filter(r => r.monthKey < currentKey), [records, currentKey]);
  const current = useMemo(() => records.filter(r => r.monthKey === currentKey), [records, currentKey]);
  const upcoming = useMemo(() => records.filter(r => r.monthKey === nextKey), [records, nextKey]);

  const formatDate = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const statusFor = (rec) => {
    const due = new Date(rec.dueDate);
    if (rec.paid) return 'PAID';
    return new Date() >= new Date(due.getFullYear(), due.getMonth(), due.getDate()) ? 'DUE' : 'NOT DUE';
  };

  const downloadReceipt = (rec) => {
    const payload = `Receipt\n\nType: ${rec.type}\nAmount: ₹${rec.amount}\nDue Date: ${formatDate(rec.dueDate)}\nStatus: ${statusFor(rec)}\nReceipt#: ${rec.receipt?.number || 'N/A'}\nDate: ${new Date().toLocaleString()}`;
    const blob = new Blob([payload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${rec.type}-${rec.monthKey}-receipt.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const goToPay = (rec) => {
    navigate('/resident/payments/checkout', { state: { id: rec.id } });
  };

  const statusChip = (rec) => {
    const s = statusFor(rec);
    if (s === 'PAID') return <span className="status-chip status-paid">PAID</span>;
    if (s === 'DUE') return <span className="status-chip status-due">DUE</span>;
    return <span className="status-chip status-upcoming">NOT DUE</span>;
  };

  return (
    <div className="payments-page">
      <div className="section-title">Current Payments</div>
      <div className="table-card">
        <table className="pay-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {current.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.type}</td>
                <td>{formatDate(rec.dueDate)}</td>
                <td>₹{rec.amount}</td>
                <td>{statusChip(rec)}</td>
                <td className="table-actions">
                  {rec.paid ? (
                    <button className="secondary" onClick={() => downloadReceipt(rec)}>Download Receipt</button>
                  ) : (
                    <button onClick={() => goToPay(rec)}>Pay Now</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-title">Next Month Preview</div>
      <div className="table-card">
        <table className="pay-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {upcoming.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.type}</td>
                <td>{formatDate(rec.dueDate)}</td>
                <td>₹{rec.amount}</td>
                <td><span className="status-chip status-upcoming">UPCOMING</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-title">Previously Paid / Past</div>
      <div className="table-card">
        <table className="pay-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Month</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {past.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.type}</td>
                <td>{rec.monthKey}</td>
                <td>{formatDate(rec.dueDate)}</td>
                <td>₹{rec.amount}</td>
                <td>{statusChip(rec)}</td>
                <td className="table-actions">
                  {rec.paid ? (
                    <button className="secondary" onClick={() => downloadReceipt(rec)}>Download Receipt</button>
                  ) : (
                    <button onClick={() => goToPay(rec)}>Pay Now</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payments;
