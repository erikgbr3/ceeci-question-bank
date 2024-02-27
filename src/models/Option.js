import BackendConfig from "../../database/backend/config";

class OptionArc {
  static async newOption(option1, option2, option3, correctA, questionId ) {
    try {
      const response = await fetch(`${BackendConfig.url}/api/options`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ option1, option2, option3, correctA, questionId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error al crear las opciones: ' + error.message);
    }
  }

  static async getOption(questionId) {
    try {
      const response = await fetch(`${BackendConfig.url}/api/options?questionId=${questionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const options = await response.json();
      return options;
    } catch (error) {
      throw new Error('Error al obtener las opciones: ' + error.message);
    }
  }

  static async updateOption(id, option1, option2, option3, correctA) {
    try {
      const response = await fetch(`${BackendConfig.url}/api/options?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ option1, option2, option3, correctA }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const updatedOption = await response.json();
      return updatedOption;
    } catch (error) {
      throw new Error('Error al actualizar la opción: ' + error.message);
    }
  }
  

}

export default OptionArc;