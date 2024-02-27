import BackendConfig from "../../database/backend/config";

class QuestionArc {
  static async newQuestion(textQuestion, bankId ) {
    try {
      const response = await fetch(`${BackendConfig.url}/api/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ textQuestion, bankId }),
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

  static async getQuestion(bankId) {
    try {
      const response = await fetch(`${BackendConfig.url}/api/questions?bankId=${bankId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const question = await response.json();
      return question;
    } catch (error) {
      throw new Error('Error al obtener las preguntas: ' + error.message);
    }
  }

  static async deleteQuestion(id) {
    try {
      const response = await fetch(`${BackendConfig.url}/api/questions?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const question = await response.json();
      return question;
    } catch (error) {
      throw new Error('Error al borrar la pregunta: ' + error.message);
    }
  }

}

export default QuestionArc;