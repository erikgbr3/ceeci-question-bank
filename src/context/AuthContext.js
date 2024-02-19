// AuthProvider.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Auth from '../models/Auth'; // Si es necesario

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    };
  
    loadToken();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await Auth.login(email, password);
      console.log('Usuario Autenticado:', response.user);
      console.log('token:', response.token);
      if (response.token) {
        setUser(response.user);
        setToken(response.token);
        AsyncStorage.setItem('token', response.token);
        return { success: true, token: response.token }; // Devuelve el token de autenticación
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      return { success: false, error: error.message };
    }
  };
  

  const handleLogout = async () => {
    try {
      await Auth.logout(); 
      setUser(null);
      setToken(null);
      AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
