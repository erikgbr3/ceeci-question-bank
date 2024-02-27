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

  async getAllRoomsAdmin(name, roomId) {
    try {
      const rooms = await Room.getRoomsAdmin(name, roomId);
      return rooms;
    } catch (error) {
      throw new Error('Error al leer las salas para el admin: ' + error.message);
    }
  },

  async getAllRooms(userId) {
    try {
      const rooms = await Room.getRooms(userId);
      return rooms;
    } catch (error) {
      throw new Error('Error al leer las salas del maestro: ' + error.message);
    }
  },

  async getAllRoomsUser(name, roomId) {
    try {
      const rooms = await Room.getRoomsUser(name, roomId);
      return rooms;
    } catch (error) {
      throw new Error('Error al leer las salas para el usuario: ' + error.message);
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

  updateEnabled: async (id, enabled) => {
    try {
      const newRoom = await Room.updateEnabledRoom(id, enabled);
      return newRoom;
    } catch (error) {
      throw new Error('Error al crear la sala: ' + error.message);
    }
  },

};



export default RoomController;
