import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { LoginPage } from './components/LoginPage';
import { PatientDashboard } from './components/PatientDashboard';
import { DoctorDashboard } from './components/DoctorDashboard';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import Forget from './components/forget.jsx';
import Profie from './components/ProfileForm.jsx';
import { Routes, Route } from 'react-router-dom';

function AppContent() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forget" element={<Forget />} />
      <Route path="/profile" element={<Profie />} />
      <Route path="/login" element={!user ? <LoginPage /> : (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            {user && user.role === 'patient' ? <PatientDashboard /> : <DoctorDashboard />}
          </main>
        </div>
      )} />
      <Route path="/dashboard" element={!user ? <LoginPage /> :
        (user && user.role === 'patient' ? (
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <PatientDashboard />
            </main>
          </div>
        ) : (
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <DoctorDashboard />
            </main>
          </div>
        ))} />

    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;