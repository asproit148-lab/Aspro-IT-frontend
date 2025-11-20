import axios from "axios";

const API = "http://localhost:3000/api/chatbot";

const config = {
  withCredentials: true,
};

// Ask Chatbot
export const askChatbot = async (data) => {
  const res = await axios.post(`${API}/ask`, data, config);
  return res.data;
};
