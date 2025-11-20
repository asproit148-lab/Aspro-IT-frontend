import axios from "axios";

const API = "http://localhost:3000/api/certificate";

const config = {
  withCredentials: true,
};

// Generate Certificate
export const downloadCertificate = async (data) => {
  try {
    const response = await axios.post(
      `${API}/download`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob", // VERY IMPORTANT
      }
    );

    // Convert blob to a download link
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", `${data.name}_certificate.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(fileURL);
  } catch (err) {
    console.error("Certificate download error:", err);
    alert("Failed to download certificate.");
  }
};


// Get Logged-in User Certificates
export const getMyCertificates = async () => {
  const res = await axios.get(`${API}/my-certificates`, config);
  return res.data;
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
