import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [error, setError] = useState('');
  const [logintoken, setLogintoken] = useState(localStorage.getItem('cespl_admin_token'));
  const [userData, setUserData] = useState(null);
  const [verifiedToken, setVerifiedToken] = useState(null);

  const storeTokenToLocal = (token) => {
    localStorage.setItem('cespl_admin_token', token);
    setLogintoken(token); // Update state when token is stored
  };

  const logoutUser = () => {
    setLogintoken('');
    localStorage.removeItem('cespl_admin_token');
    setUserData(null); // Clear user data on logout
  };

  const userAuthentication = async () => {
    try {
      const token = localStorage.getItem('cespl_admin_token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data.msg);
      setVerifiedToken(response.data.token);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to authenticate user.');
      }
      setUserData(null); // Clear user data on authentication failure
    }
  };

  const updateUserData = (newUserData) => {
    setUserData(newUserData);
  };

  useEffect(() => {
    if (logintoken) {
      userAuthentication();
    } else {
      setUserData(null);
    }
  }, [logintoken]);

  return (
    <AuthContext.Provider value={{ storeTokenToLocal, logoutUser, userData, verifiedToken, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const AuthContextValue = useContext(AuthContext);
  if (!AuthContextValue) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return AuthContextValue;
};

export default AuthProvider;
