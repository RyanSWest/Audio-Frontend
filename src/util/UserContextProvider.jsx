import React, { createContext, useContext, useState, useEffect } from 'react';
const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const API_URL = 'https://squi-d-lite-production.up.railway.app'
  // const API_URL = window.location.origin  // Gets https://maybeart.io automatically
  // const API_URL = 'https://3.147.102.4:3001'
  const API_URL ='http://localhost:3002'
  // const API_URL ='https://app.maybeart.io'
  // Check if user is already logged in on mount
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        console.log('Token found:', token);
        
        if (token) {
          const response = await fetch(`${API_URL}/api/auth/verify`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          console.log('Verify response:', response.status);
          
          if (response.ok) {
            const data = await response.json();
            console.log('User verified:', data.user);
            setUser(data.user);
          } else {
            sessionStorage.removeItem('authToken');
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Session check failed:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const register = async (email, password, name) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Registration failed');
      }

      // Store token and set user
      sessionStorage.setItem('authToken', data.token);
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and set user
      sessionStorage.setItem('authToken', data.token);
      setUser(data.user);

      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (token) {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }); 
      }
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      sessionStorage.removeItem('authToken');
      setUser(null);
    }
  };

  const updateUser = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateUser,
    setError
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};

// Custom hook to use user context
export const useUser = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUser must be used within UserAuthProvider');
  }
  return context;
};