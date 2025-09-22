import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext(undefined);

// Mock users for demo purposes
const mockUsers = [
  {
    id: '1',
    email: 'patient@demo.com',
    name: 'Mukesh',
    role: 'patient',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=400'
  },
  {
    id: '2',
    email: 'doctor@demo.com',
    name: 'Dr. Rajesh Kumar',
    role: 'doctor',
    avatar: 'https://images.pexels.com/photos/582750/pexels-photo-582750.jpeg?w=400'
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password, role) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find(u => u.email === email && u.role === role);
    if (foundUser) {
      setUser(foundUser);
    } else {
      throw new Error('Invalid credentials');
    }

    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}