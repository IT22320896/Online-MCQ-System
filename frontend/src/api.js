import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getExams = () => axios.get(`${BASE_URL}/exams`);
export const getQuestions = (examId) =>
  axios.get(`${BASE_URL}/exams/${examId}`);
export const submitAnswers = (examId, payload) =>
  axios.post(`${BASE_URL}/results/submit/${examId}`, payload);
export const getResults = (userId) =>
  axios.get(`${BASE_URL}/results/${userId}`);
export const login = (email) => axios.post(`${BASE_URL}/login`, { email });
