import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const RequestAccessPage = () => {
  const { token } = useAuth();
  const [softwareList, setSoftwareList] = useState([]);
  const [softwareId, setSoftwareId] = useState('');
  const [accessType, setAccessType] = useState('Read');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [accessOptions, setAccessOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchSoftware = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/software', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSoftwareList(res.data);
        if (res.data.length > 0) {
          setSoftwareId(res.data[0].id);
          setAccessOptions(res.data[0].accessLevels);
          setAccessType(res.data[0].accessLevels[0] || 'Read');
        }
      } catch (err) {
        setError('Failed to load software list');
      }
      setLoading(false);
    };
    fetchSoftware();
  }, [token]);

  const handleSoftwareChange = (e) => {
    const selected = softwareList.find(s => s.id === parseInt(e.target.value));
    setSoftwareId(e.target.value);
    setAccessOptions(selected ? selected.accessLevels : []);
    setAccessType(selected && selected.accessLevels.length > 0 ? selected.accessLevels[0] : 'Read');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);
    try {
      await axios.post('/api/requests', {
        softwareId: parseInt(softwareId),
        accessType,
        reason,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Request submitted!');
      setReason('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting request');
    }
    setSubmitting(false);
  };

  return (
    <div className="container mt-5" style={{maxWidth: 500}}>
      <h2 className="mb-4">Request Software Access</h2>
      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : softwareList.length === 0 ? (
        <div className="alert alert-info">No software available to request.</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Software</label>
            <select className="form-select" value={softwareId} onChange={handleSoftwareChange} required>
              {softwareList.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Access Type</label>
            <select className="form-select" value={accessType} onChange={e => setAccessType(e.target.value)} required>
              {accessOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Reason</label>
            <textarea className="form-control" value={reason} onChange={e => setReason(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Request'}</button>
        </form>
      )}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {success && <div className="alert alert-success mt-3">{success}</div>}
    </div>
  );
};

export default RequestAccessPage; 