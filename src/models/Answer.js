import BackendConfig from "../../database/backend/config";

class Answer {
  static async newAnswer( userId, questionId, optionId, selection ) {
    try {
      const response = await fetch(`${BackendConfig.url}/api/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, questionId, optionId, selection }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error al crear respuesta: ' + error.message);
    }
  }
}

export default Answer;