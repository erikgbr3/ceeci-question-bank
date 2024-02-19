import BackendConfig from "../../database/backend/config";
import AsyncStorage from '@react-native-async-storage/async-storage';

// auth.js

class Auth {
  static async login(email, password) {
    try {
      const response = await fetch(`${BackendConfig.url}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error al iniciar sesión: ' + error.message);
    }
  }

  static async logout() {
    try {
      // Eliminar el token de autenticación
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      // Manejar errores si es necesario
      console.error('Error al cerrar sesión:', error);
      throw error; // Opcional: relanzar el error para que pueda ser manejado en otra parte
    }
  }

  // Agregar más métodos relacionados con la autenticación, como registro, recuperación de contraseña, etc.
}

export default Auth;
