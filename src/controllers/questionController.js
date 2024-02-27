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

  async deleteOneQuestion(id) {
    try {
      const question = await QuestionArc.deleteQuestion(id);
      return question;
    } catch (error) {
      throw new Error('Error al borrar una sala: ' + error.message);
    }
  },
};

export default QuestionController;
