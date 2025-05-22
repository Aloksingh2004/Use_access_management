import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const NavBar = () => {
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <nav style={{ marginBottom: 20 }}>
      {role === 'Admin' && <Link to="/create-software">Create Software</Link>}
      {role === 'Employee' && <Link to="/request-access">Request Access</Link>}
      {role === 'Manager' && <Link to="/pending-requests">Pending Requests</Link>}
      <button onClick={handleLogout} style={{ marginLeft: 10 }}>Logout</button>
    </nav>
  );
};

export default NavBar; 