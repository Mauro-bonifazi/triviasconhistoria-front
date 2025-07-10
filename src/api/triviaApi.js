import axios from "axios";

const API_URL = "https://triviasconhistoria-back.onrender.com/api";

// Creamos una instancia de Axios
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar el token automáticamente a cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Obtener todas las preguntas
export const getQuestions = async () => {
  try {
    const response = await api.get("/questions");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las trivias:", error);
    throw error;
  }
};

// Obtener preguntas por título
export const getQuestionsByTitle = async (title) => {
  try {
    const response = await api.get(`/questions/title/${title}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las trivias por título:", error);
    throw error;
  }
};
// Obtener trivia por ID (e incrementa el contador de visitas)
export const getQuestionById = async (id) => {
  try {
    const response = await api.get(`/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la trivia por ID:", error);
    throw error;
  }
};
// Obtener trivia por slug (con axios y baseURL)
export const getTriviaBySlug = async (slug) => {
  try {
    console.log(`Fetching trivia by slug: ${slug}`);
    const response = await api.get(`/questions/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching trivia by slug:", error);
    throw error;
  }
};

// Actualizar una pregunta
export const updateQuestion = async (questionId, updatedQuestion) => {
  try {
    const response = await api.put(`/questions/${questionId}`, updatedQuestion);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la trivia:", error);
    throw error;
  }
};

// Eliminar una trivia
export const deleteTrivia = async (questionId) => {
  try {
    const response = await api.delete(`/questions/${questionId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la trivia:", error);
    throw error;
  }
};

// Crear una nueva trivia
export const createTrivia = async (newTrivia) => {
  try {
    const response = await api.post("/questions", newTrivia);
    return response.data;
  } catch (error) {
    console.error("Error al crear la trivia:", error);
    throw error;
  }
};

//  Login de usuario
export const login = (loginData) => {
  return axios.post(
    "https://triviasconhistoria-back.onrender.com/auth/login",
    loginData
  );
};

//Trivias Populares
export const getPopularQuestions = async () => {
  try {
    const response = await api.get("/questions/popular");
    return response.data;
  } catch (error) {
    console.error("Error en getPopularQuestions:", error);
    throw error;
  }
};
