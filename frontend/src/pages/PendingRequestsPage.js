import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const API = process.env.REACT_APP_API_URL || '';

const PendingRequestsPage = () => {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [actionMsg, setActionMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchRequests = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/requests/pending`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(res.data);
    } catch (err) {
      setError('Failed to load requests');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line
  }, []);

  const handleAction = async (id, status) => {
    setError('');
    setActionMsg('');
    setActionLoading(id);
    try {
      await axios.patch(`${API}/api/requests/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setActionMsg(`Request ${status.toLowerCase()}!`);
      setRequests(requests.filter(r => r.id !== id));
    } catch (err) {
      setError('Action failed');
    }
    setActionLoading(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Pending Access Requests</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {actionMsg && <div className="alert alert-success">{actionMsg}</div>}
      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : requests.length === 0 ? (
        <div className="alert alert-info">No pending requests.</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>User</th>
              <th>Software</th>
              <th>Access Type</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id}>
                <td>{r.user?.username}</td>
                <td>{r.software?.name}</td>
                <td>{r.accessType}</td>
                <td>{r.reason}</td>
                <td>
                  <button className="btn btn-success btn-sm me-2" onClick={() => handleAction(r.id, 'Approved')} disabled={actionLoading === r.id}>
                    {actionLoading === r.id ? 'Processing...' : 'Approve'}
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleAction(r.id, 'Rejected')} disabled={actionLoading === r.id}>
                    {actionLoading === r.id ? 'Processing...' : 'Reject'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingRequestsPage; 