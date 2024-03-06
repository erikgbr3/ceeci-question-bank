import Result from "../models/Result";


const ResultController = {
  async getResult(roomId) {
    try {
      const result = await Result.getResult(roomId);
      return result;
    } catch (error) {
      throw new Error('Error al leer los usuarios: ' + error.message);
    }
  }

};



export default ResultController;
