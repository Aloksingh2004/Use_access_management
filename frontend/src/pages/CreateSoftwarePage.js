import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const CreateSoftwarePage = () => {
  const { token } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [accessLevels, setAccessLevels] = useState('Read,Write,Admin');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('/api/software', {
        name,
        description,
        accessLevels: accessLevels.split(',').map(l => l.trim()),
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Software created!');
      setName('');
      setDescription('');
      setAccessLevels('Read,Write,Admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating software');
    }
  };

  return (
    <div className="container mt-5" style={{maxWidth: 500}}>
      <h2 className="mb-4">Create Software</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Access Levels (comma separated)</label>
          <input className="form-control" value={accessLevels} onChange={e => setAccessLevels(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Create</button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {success && <div className="alert alert-success mt-3">{success}</div>}
    </div>
  );
};

export default CreateSoftwarePage; 