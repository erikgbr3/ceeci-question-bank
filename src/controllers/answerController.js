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
}

export default AnswerController;