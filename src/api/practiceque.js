import axios from "axios";

const isProduction = process.env.NODE_ENV === "production"; 

const API = isProduction
  ? "https://aspro-it-backend.onrender.com/api/questions" // Live/Production URL
  : "http://localhost:3000/api/questions";

const config = {
  withCredentials: true,
};

// Add
export const addQuestion = async (formData) => {
  // POST request sends the FormData payload, including the file.
  const res = await axios.post(`${API}/add-question`, formData, config);
  return res.data;
};

// Get All
export const getAllQuestions = async () => {
  const res = await axios.get(`${API}/all-questions`, config);
  // Returns the array of questions directly
  return res.data.questions;
};

// Get by category
export const getQuestionsByCourseId = async (courseId) => {
  const res = await axios.get(`${API}/questions-by-course/${courseId}`, config);
  return res.data.questions;
};

//Get Single
export const getQuestion = async (questionId) => {
  const res = await axios.get(`${API}/question-info/${questionId}`, config);
  return res.data.question;
};

//Delete
export const deleteQuestion = async (questionId) => {
  const res = await axios.delete(`${API}/delete-question/${questionId}`, config);
  return res.data;
};

//Download
export const downloadQuestion = async (questionId) => {
  const res = await axios.get(`${API}/download-question/${questionId}`, {
    ...config,
    responseType: "blob",
  });
  return res.data;
};