import BackendConfig from "../../database/backend/config";

class Result {
  static async getResult(roomId) {
  try {
    const response = await fetch(`${BackendConfig.url}/api/bankResult?roomId=${roomId}`, {
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
    throw new Error('Error al obtener los bancos: ' + error.message);
  }
}
}

export default Result
