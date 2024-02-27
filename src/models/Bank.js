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
      throw new Error('Error al crear el banco: ' + error.message);
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
      throw new Error('Error al obtener los bancos: ' + error.message);
    }
  }

  static async getBanksUser(roomId, enabled) {
    try {
      let url = `${BackendConfig.url}/api/banks?roomId=${roomId}`;

      if (enabled !== undefined) {
        url += `&enabled=${enabled}`;
      }

      const response = await fetch(url, {
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
      throw new Error('Error al obtener los bancos: ' + error.message);
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
      throw new Error('Error al borrar el banco: ' + error.message);
    }
  }

  static async updateEnabledBank( id, enabled ) {
    try {
      const response = await fetch(`${BackendConfig.url}/api/banks?id=${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enabled }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const room = await response.json();
      return room;
    } catch (error) {
      throw new Error('Error al iniciar sesión: ' + error.message);
    }
  }
  
}

export default Bank;
