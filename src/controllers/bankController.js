import Bank from "../models/Bank";

const BankController = {
  
  createNewBank: async (name, roomId) => {
    try {
      const newBank = await Bank.newBank(name, roomId);
      return newBank;
    } catch (error) {
      throw new Error('Error al crear el banco: ' + error.message);
    }
  },

  async getAllBanks(roomId) {
    try {
      const banks = await Bank.getBanks(roomId);
      return banks;
    } catch (error) {
      throw new Error('Error al leer los bancos: ' + error.message);
    }
  },

  async getAllBanksUser(roomId, enabled) {
    try {
      const banks = await Bank.getBanksUser(roomId, enabled);
      return banks;
    } catch (error) {
      throw new Error('Error al leer las salas para el usuario: ' + error.message);
    }
  },

  async deleteOneBank(id) {
    try {
      const bank = await Bank.deleteBank(id);
      return bank;
    } catch (error) {
      throw new Error('Error al borrar el banco: ' + error.message);
    }
  },

  updateEnabled: async (id, enabled) => {
    try {
      const updateBank = await Bank.updateEnabledBank(id, enabled);
      return updateBank;
    } catch (error) {
      throw new Error('Error al crear la sala: ' + error.message);
    }
  },

};

export default BankController;
