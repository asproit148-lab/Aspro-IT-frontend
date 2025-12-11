import axios from "axios";

// const API = "http://localhost:3000/api/resources";
const API = "https://aspro-it-backend.onrender.com/api/resources";

const config = {
  withCredentials: true,
};

// Add Resource
export const addResource = async (data) => {
  const res = await axios.post(`${API}/add-resource`, data, config);
  return res.data;
};

// Get All Resources
export const getAllResources = async () => {
  const res = await axios.get(`${API}/all-resources`, config);
  return res.data.resources;
};

// Get Single Resource
export const getResource = async (resourceId) => {
  const res = await axios.get(`${API}/resource-info/${resourceId}`, config);
  return res.data.resource;
};

// Delete Resource
export const deleteResource = async (resourceId) => {
  const res = await axios.delete(`${API}/delete-resource/${resourceId}`, config);
  return res.data;
};

//Download Resourse
export const downloadResource = async (resourceId) => {
  const res = await axios.get(`${API}/download-resource/${resourceId}`, {
    ...config,
    responseType: 'blob', 
  });
  return res.data;
};
