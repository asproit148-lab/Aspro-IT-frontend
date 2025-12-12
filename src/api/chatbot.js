import axios from "axios";

const isProduction = process.env.NODE_ENV === "production"; 

const API = isProduction
  ? "https://aspro-it-backend.onrender.com/api/chatbot" // Live/Production URL
  : "http://localhost:3000/api/chatbot";

const config = {
  withCredentials: true,
};

// Ask Chatbot
export const askChatbot = async (data) => {
  const res = await axios.post(`${API}/ask`, data, config);
  return res.data;
};
