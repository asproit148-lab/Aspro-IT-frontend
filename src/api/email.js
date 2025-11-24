import axios from "axios";

const API = "http://localhost:3000/api/email";
// const API = "https://aspro-it-backend.onrender.com/api/email";

const config = {
  withCredentials: true,
};

// Submit Enquiry Form
export const sendEnquiry = async (data) => {
  const res = await axios.post(`${API}/enquiry`, data, config);
  return res.data;
};

// Submit Contact Form
export const sendContact = async (data) => {
  const res = await axios.post(`${API}/contact`, data, config);
  return res.data;
};

// Submit Enrollment Form
export const sendEnrollment = async (data) => {
  const res = await axios.post(`${API}/enrollment`, data, config);
  return res.data;
};
