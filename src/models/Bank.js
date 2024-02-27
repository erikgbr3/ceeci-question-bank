import BackendConfig from "../../database/backend/config";

// auth.js

class Bank {
  static async newBank( name, roomId ) {
    try {
      const response = await fetch(`${BackendConfig.url}/api/banks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, roomId }),
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

  static async getBanks(roomId) {
    try {
      const response = await fetch(`${BackendConfig.url}/api/banks?roomId=${roomId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const banks = await response.json();
      return banks;
    } catch (error) {
      throw new Error('Error al obtener las habitaciones: ' + error.message);
    }
  }

  static async deleteBank(id) {
    try {
      const response = await fetch(`${BackendConfig.url}/api/banks?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const banks = await response.json();
      return banks;
    } catch (error) {
      throw new Error('Error al borrar la sala: ' + error.message);
    }
  }
  
}

export default Bank;
