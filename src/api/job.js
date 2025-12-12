import axios from "axios";

const isProduction = process.env.NODE_ENV === "production"; 

const API = isProduction
  ? "https://aspro-it-backend.onrender.com/api/opportunities" // Live/Production URL
  : "http://localhost:3000/api/opportunities";

const config = {
  withCredentials: true,
};

// Add Opportunity (Job/Internship)
export const addOpportunity = async (data) => {
  const res = await axios.post(`${API}/add`, data, config);
  return res.data;
};

// Delete Opportunity
export const deleteOpportunity = async (id) => {
  const res = await axios.delete(`${API}/delete/${id}`, config);
  return res.data;
};

// Get All Opportunities
export const getAllOpportunities = async () => {
  const res = await axios.get(`${API}/all`, config);
  return res.data;
};

// Get Only Jobs
export const getJobs = async () => {
  const res = await axios.get(`${API}/jobs`, config);
  return res.data.data; 
};

// Get Only Internships
export const getInternships = async () => {
  const res = await axios.get(`${API}/internships`, config);
 return res.data.data; 
};
