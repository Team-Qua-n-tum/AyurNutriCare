import React, { useState } from 'react';
import { Home, LayoutDashboard, User, LogOut } from 'lucide-react';
import DocProfile from './DoctorSettings';
import PatientProfile from './PatientSettings';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.svg';

export function Header() {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('consultation');

  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/login");
  };

  const handleLogout = () => {
    logout(); // Ensure actual logout
    setIsLoggedIn(false);
    setIsOpen(false);
  };
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon" style={{ background: 'none' }}>
            <img src={Logo} alt="Logo" className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AyurNutriCare</h1>
          </div>
        </div>
        {user ? (
          <nav className="flex items-center gap-6">
            <div
              onClick={() => {
                setActiveTab('home');
                navigate('/');
              }}
              className={`flex items-center gap-1 cursor-pointer text-sm font-medium border-b-2 pb-1 transition-colors ${activeTab === 'home'
                ? 'text-emerald-600 border-emerald-600'
                : 'text-gray-500 border-transparent hover:text-emerald-600'
                }`}
            >
              <Home className="w-4 h-4" />
              Home
            </div>

            <div
              onClick={() => {
                setActiveTab('dashboard');
                navigate('/dashboard');
              }}
              className={`flex items-center gap-1 cursor-pointer text-sm font-medium border-b-2 pb-1 transition-colors ${activeTab === 'dashboard'
                ? 'text-emerald-600 border-emerald-600'
                : 'text-gray-500 border-transparent hover:text-emerald-600'
                }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </div>
          </nav>

        ) : null}

        {user ? (
          <div className="user-menu">
            <div className="user-info">
              <div className="user-avatar">
                <button
                  type="button"
                  onClick={() => setShowProfile(prev => !prev)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setShowProfile(prev => !prev);
                    }
                  }}
                  className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                  aria-haspopup="dialog"
                  aria-expanded={showProfile}
                  title={user.role === 'doctor' ? 'Doctor Profile' : 'Patient Profile'}
                >
                  <User className="w-5 h-5 text-emerald-600" />
                </button>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="p-2 text-emerald-600 hover:text-white hover:bg-emerald-600 rounded-lg transition-colors"
          >
            Login
          </button>
        )}
      </div>

      {showProfile && (
        <>
          {user.role === 'doctor' ? (
            <DocProfile onClose={() => setShowProfile(false)} />
          ) : (
            <PatientProfile onClose={() => setShowProfile(false)} />
          )}
        </>
      )}

      {/* Optional dropdown example */}
      {isOpen && (
        <div className="dropdown-menu absolute right-4 top-16 bg-white shadow-lg rounded-md p-4">
          <p className="text-sm text-gray-700">Dropdown content here</p>
        </div>
      )}
    </header>
  );
}