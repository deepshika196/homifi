import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/resident/Payments.css';

const STORAGE_KEY = 'residentPaymentsV1';

function PaymentCheckout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [targetId, setTargetId] = useState(null);
  const [record, setRecord] = useState(null);

  useEffect(() => {
    const id = location.state?.id || null;
    setTargetId(id);
    const raw = localStorage.getItem(STORAGE_KEY);
    if (id && raw) {
      const list = JSON.parse(raw);
      const rec = list.find((r) => r.id === id);
      setRecord(rec || null);
    }
  }, [location.state]);

  const handleConfirm = () => {
    if (!targetId) return navigate('/resident/payments');
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return navigate('/resident/payments');
    const list = JSON.parse(raw);
    const idx = list.findIndex((r) => r.id === targetId);
    if (idx >= 0) {
      const receiptNo = `${list[idx].type}-REC-${Date.now()}`;
      list[idx] = {
        ...list[idx],
        paid: true,
        receipt: { number: receiptNo, ts: new Date().toISOString() },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
    navigate('/resident/payments');
  };

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <div className="checkout-title">Mock Payment</div>
        {record ? (
          <div className="checkout-meta">
            <div><strong>Item:</strong> {record.type}</div>
            <div><strong>Amount:</strong> ₹{record.amount}</div>
          </div>
        ) : (
          <div className="checkout-meta">Loading...</div>
        )}
        <div className="qr-box">QR CODE</div>
        <button className="confirm-btn" onClick={handleConfirm}>I have paid, confirm</button>
      </div>
    </div>
  );
}

export default PaymentCheckout;
