import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import CreateSoftwarePage from './pages/CreateSoftwarePage';
import RequestAccessPage from './pages/RequestAccessPage';
import PendingRequestsPage from './pages/PendingRequestsPage';
import { AuthProvider, useAuth } from './AuthContext';
import NavBar from './components/NavBar';

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/login" />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-software" element={<ProtectedRoute allowedRoles={['Admin']}><CreateSoftwarePage /></ProtectedRoute>} />
          <Route path="/request-access" element={<ProtectedRoute allowedRoles={['Employee']}><RequestAccessPage /></ProtectedRoute>} />
          <Route path="/pending-requests" element={<ProtectedRoute allowedRoles={['Manager']}><PendingRequestsPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; 