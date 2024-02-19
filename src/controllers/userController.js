import User from "../models/User";

const UserController = {
  
  createUser: async (name, lastName, email, password, rol) => {
    try {
      const newUser = await User.newUser(name, lastName, email, password, rol);
      return newUser;
    } catch (error) {
      throw new Error('Error al crear la sala: ' + error.message);
    }
  },

  async getAllUsers() {
    try {
      const users = await User.getUsers();
      return users;
    } catch (error) {
      throw new Error('Error al leer las salas: ' + error.message);
    }
  },

};



export default UserController;
