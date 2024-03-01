// QuestionController.js

import QuestionArc from "../models/question";

const QuestionController = {
  
  createNewQuestion: async (textQuestion, bankId) => {
    try {
      const newQuestion = await QuestionArc.newQuestion( textQuestion, bankId );
      return newQuestion;
    } catch (error) {
      throw new Error('Error al crear la pregunta: ' + error.message);
    }
  },

  async getAllQuestion(bankId) {
    try {
      const question = await QuestionArc.getQuestion(bankId );
      return question;
    } catch (error) {
      throw new Error('Error al leer las preguntas: ' + error.message);
    }
  },

  async getAllQuestionsUser(bankId, enabled) {
    try {
      const question = await QuestionArc.getQuestionUser(bankId, enabled);
      return question;
    } catch (error) {
      throw new Error('Error al leer las preguntas: ' + error.message);
    }
  },

  async deleteOneQuestion(id) {
    try {
      const question = await QuestionArc.deleteQuestion(id);
      return question;
    } catch (error) {
      throw new Error('Error al borrar la pregunta: ' + error.message);
    }
  },

  updateEnabled: async (id, enabled) => {
    try {
      const updateBank = await QuestionArc.updateEnabledQuestion(id, enabled);
      return updateBank;
    } catch (error) {
      throw new Error('Error al crear la sala: ' + error.message);
    }
  },
};

export default QuestionController;
