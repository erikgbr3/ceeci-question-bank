import BackendConfig from "../../database/backend/config";

// auth.js

class User {
  static async newUser( name, lastName, email, password, rol) {
    try {
      const response = await fetch(`${BackendConfig.url}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, lastName, email, password, rol }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error al crear usuario: ' + error.message);
    }
  }

  static async getUsers() {
    try {
      const response = await fetch(`${BackendConfig.url}/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const rooms = await response.json();
      return rooms;
    } catch (error) {
      throw new Error('Error al obtener los Usuarios: ' + error.message);
    }
  }
  
}

export default User;
