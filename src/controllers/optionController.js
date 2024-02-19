import OptionArc from "../models/Option";

const OptionController = {
  
  createNewOption: async (option1, option2, option3, correctA, questionId) => {
    try {
      const newOption = await OptionArc.newOption(option1, option2, option3, correctA, questionId);
      return newOption;
    } catch (error) {
      throw new Error('Error al crear la opcion: ' + error.message);
    }
  },

  async getAllOptions(questionId) {
    try {
      const options = await OptionArc.getOption(questionId);
      return options;
    } catch (error) {
      throw new Error('Error al leer las opciones: ' + error.message);
    }
  },

};

export default OptionController;
