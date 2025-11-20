import axios from "axios";

const API = "http://localhost:3000/api/certificate";

const config = {
  withCredentials: true,
};

// Generate Certificate
export const generateCertificate = async (data) => {
  const res = await axios.post(`${API}/generate`, data, config);
  return res.data;
};

// Get Logged-in User Certificates
export const getMyCertificates = async () => {
  const res = await axios.get(`${API}/my-certificates`, config);
  return res.data;
};

// Download Certificate (gets file blob)
export const downloadCertificate = async (certificateId) => {
  const res = await axios.get(`${API}/download/${certificateId}`, {
    ...config,
    responseType: "blob",
  });
  return res;
};

// Get Certificate by ID
export const getCertificateById = async (certificateId) => {
  const res = await axios.get(`${API}/${certificateId}`, config);
  return res.data;
};

// Verify Certificate (Public)
export const verifyCertificate = async (certificateNumber) => {
  const res = await axios.get(`${API}/verify/${certificateNumber}`);
  return res.data;
};

// Admin: Get All Certificates
export const getAllCertificates = async () => {
  const res = await axios.get(`${API}/admin/all`, config);
  return res.data;
};
