import axios from "axios";

const isProduction = process.env.NODE_ENV === "production"; 

const API = isProduction
  ? "https://aspro-it-backend.onrender.com/api/email" // Live/Production URL
  : "http://localhost:3000/api/email";

const config = {
  withCredentials: true,
};

// Submit Enquiry Form
export const sendEnquiry = async (data) => {
  const res = await axios.post(`${API}/enquiry`, data, config);
  return res; // return the full response
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

// Request OTP
export const requestPasswordOtp = async (email) => {
  const res = await axios.post(`${API}/request-email-otp`, { email }, config);
  return res.data;
};

// Verify OTP
export const verifyPasswordOtp = async (email, otp) => {
  const res = await axios.post(`${API}/verify-email-otp`, { email, otp }, config);
  return res.data;
};
