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
      throw new Error('Error al crear la Pregunta: ' + error.message);
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

      const banks = await response.json();
      return banks;
    } catch (error) {
      throw new Error('Error al obtener las habitaciones: ' + error.message);
    }
  }

}

export default OptionArc;