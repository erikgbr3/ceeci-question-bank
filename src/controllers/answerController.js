import Answer from "../models/Answer";

const AnswerController = {
  createAnswer: async (userId, questionId, optionId, selection) => {
    try {
      const newAnswer = await Answer.newAnswer(userId, questionId, optionId, selection);
      return newAnswer;
    } catch (error) {
      throw new Error('Error al crear la sala: ' + error.message);
    }
  },

  async getAnswer() {
    try {
      const rooms = await Answer.getAnswer();
      return rooms;
    } catch (error) {
      throw new Error('Error al leer las salas para el admin: ' + error.message);
    }
  },
}

export default AnswerController;