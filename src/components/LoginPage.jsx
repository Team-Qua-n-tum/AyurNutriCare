import React, { useState } from 'react';
import { Leaf, Mail, Lock, Users, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Signup from './Signup.jsx';
import Forget from './forget.jsx';
import Logo from '../assets/Logo.svg';

export function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password, selectedRole);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo and Header */}
        <div className="login-header">
          <div className="login-logo" style={{ background: 'none' }}>
            <img src={Logo} alt="Logo" className="rounded-full w-12 h-12 object-cover" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AyurNutriCare</h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Food is medicine—personalized nutrition for lifelong wellness
          </p>
        </div>

        {/* Role Selection */}
        <div className="card">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Role</h2>
            <div className="role-selector">
              <button
                type="button"
                onClick={() => setSelectedRole('patient')}
                className={`role-button ${selectedRole === 'patient' ? 'active' : ''}`}
              >
                <Users className="w-6 h-6" />
                <span className="text-sm font-medium">Patient</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('doctor')}
                className={`role-button ${selectedRole === 'doctor' ? 'active' : ''}`}
              >
                <UserCheck className="w-6 h-6" />
                <span className="text-sm font-medium">Doctor</span>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="input-group">
                <Mail className="input-icon w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-with-icon"
                  placeholder={selectedRole === 'patient' ? 'patient@demo.com' : 'doctor@demo.com'}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <Lock className="input-icon w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-with-icon"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full py-3"
            >
              {isLoading ? 'Signing in...' : `Sign in as ${selectedRole}`}
            </button>
            <p>
              New User?
              <Link to="/signup" className="text-emerald-600 hover:underline"> Sign Up</Link>
            </p>
            <p>
              <Link to="/forget" className="text-emerald-600 hover:underline"> Forget Password?</Link>
            </p>
          </form>
          {/* <div className="demo-credentials">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Demo Credentials:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Patient:</strong> patient@demo.com</p>
              <p><strong>Doctor:</strong> doctor@demo.com</p>
              <p><em>Password: any password</em></p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}