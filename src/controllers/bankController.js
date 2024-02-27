import Bank from "../models/Bank";

const BankController = {
  
  createNewBank: async (name, roomId) => {
    try {
      const newBank = await Bank.newBank(name, roomId);
      return newBank;
    } catch (error) {
      throw new Error('Error al crear la sala: ' + error.message);
    }
  },

  async getAllBanks(roomId) {
    try {
      const banks = await Bank.getBanks(roomId);
      return banks;
    } catch (error) {
      throw new Error('Error al leer las salas: ' + error.message);
    }
  },

  async deleteOneBank(id) {
    try {
      const bank = await Bank.deleteBank(id);
      return bank;
    } catch (error) {
      throw new Error('Error al borrar una sala: ' + error.message);
    }
  },

};

export default BankController;
