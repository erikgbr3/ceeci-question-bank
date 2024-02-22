import BackendConfig from "../../database/backend/config";

// auth.js

class Room {
  static async newRoom( name, userId) {
    try {
      const response = await fetch(`${BackendConfig.url}/api/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, userId }),
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

  static async getRoomsAdmin() {
    try {
      const response = await fetch(`${BackendConfig.url}/api/rooms`, {
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
      throw new Error('Error al obtener las habitaciones: ' + error.message);
    }
  }

  static async getRooms(userId) {
    try {
      const response = await fetch(`${BackendConfig.url}/api/rooms?userId=${userId}`, {
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
      throw new Error('Error al obtener las habitaciones: ' + error.message);
    }
  }

  static async getRoomsUser() {
    try {
      const response = await fetch(`${BackendConfig.url}/api/roomUser`, {
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
      throw new Error('Error al obtener las habitaciones: ' + error.message);
    }
  }

  static async deleteRooms(id) {
    try {
      const response = await fetch(`${BackendConfig.url}/api/rooms?id=${id}`, {
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

  static async updateEnabledRoom( id, enabled ) {
    try {
      const response = await fetch(`${BackendConfig.url}/api/rooms?id=${id}`, {
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

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error al iniciar sesión: ' + error.message);
    }
  }
  
}

export default Room;
