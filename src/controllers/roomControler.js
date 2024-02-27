// RoomController.js

import Room from '../models/Room';

const RoomController = {
  
  createRoom: async (name, roomId) => {
    try {
      const newRoom = await Room.newRoom(name, roomId);
      return newRoom;
    } catch (error) {
      throw new Error('Error al crear la sala: ' + error.message);
    }
  },

  async getAllRooms(name, roomId) {
    try {
      const rooms = await Room.getRooms(name, roomId);
      return rooms;
    } catch (error) {
      throw new Error('Error al leer las salas: ' + error.message);
    }
  },

  async deleteOneRoom(id) {
    try {
      const rooms = await Room.deleteRooms(id);
      return rooms;
    } catch (error) {
      throw new Error('Error al borrar una sala: ' + error.message);
    }
  },

};



export default RoomController;
