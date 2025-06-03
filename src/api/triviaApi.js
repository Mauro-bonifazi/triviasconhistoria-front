import axios from "axios";
const API_URL = "http://localhost:3001/api";
const accessToken = localStorage.getItem("token");

export const getQuestions = async () => {
  try {
    const response = await axios.get(`${API_URL}/questions`);
    // Depuración
    return response.data;
  } catch (error) {
    console.error("Error al obtener las preguntas:", error);
    throw error;
  }
};
export const getQuestionsByTitle = async (title) => {
  try {
    const response = await axios.get(`${API_URL}/questions/title/${title}`);
    console.log("Datos recibidos del backend:", response.data); // Depuración
    return response.data;
  } catch (error) {
    console.error("Error al obtener las preguntas por titulo:", error);
    throw error;
  }
};
//Actulizar Trivia

export const updateQuestion = async (questionId, updatedQuestion) => {
  try {
    const response = await axios.put(
      `${API_URL}/questions/${questionId}`,
      updatedQuestion,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Pregunta actualizada:", response.data); // Depuración
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la pregunta:", error);
    throw error;
  }
};
//Eliminar Trivia
export const deleteTrivia = async (questionId) => {
  try {
    const response = await axios.delete(`${API_URL}/questions/${questionId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("Pregunta eliminada:", response.data); // Depuración
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la pregunta:", error);
    throw error;
  }
};
//Crear Trivia
export const createTrivia = async (newTrivia) => {
  try {
    const response = await axios.post(`${API_URL}/questions`, newTrivia, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("Trivia creada:", response.data); // Depuración
    return response.data;
  } catch (error) {
    console.error("Error al crear la trivia:", error);
    throw error;
  }
};
//login
export const login = (loginData) => {
  return axios.post("http://localhost:3001/auth/login", loginData);
};
